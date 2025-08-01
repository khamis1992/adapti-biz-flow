import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, Download, FileSpreadsheet, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";

interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  errors: { row: number; error: string; data: any }[];
}

const ImportCustomers = () => {
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setSelectedFile(file);
        setImportResult(null);
      } else {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يرجى اختيار ملف CSV أو Excel",
          variant: "destructive"
        });
      }
    }
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = "full_name,email,phone,civil_id,customer_type,address,city,notes\n" +
                      "أحمد محمد الكندري,ahmed@example.com,+965 1234 5678,123456789012,individual,الجابرية - قطعة 1,الكويت,عميل مميز\n" +
                      "شركة الخليج للتجارة,gulf@company.com,+965 9876 5432,987654321098,company,الشرق - برج التجارة,الكويت,شركة كبيرة";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'customers_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const customers = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= 2 && values[0] && values[2]) { // At least name and phone
        customers.push({
          full_name: values[0],
          email: values[1] || null,
          phone: values[2],
          civil_id: values[3] || null,
          customer_type: values[4] === 'company' ? 'company' : 'individual',
          address: values[5] || null,
          city: values[6] || null,
          notes: values[7] || null,
          tenant_id: tenant?.id,
          is_blacklisted: false
        });
      }
    }
    
    return customers;
  };

  const handleImport = async () => {
    if (!selectedFile || !tenant?.id) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف والتأكد من تسجيل الدخول",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    try {
      const text = await selectedFile.text();
      const customers = parseCSV(text);
      
      if (customers.length === 0) {
        throw new Error('لم يتم العثور على بيانات صحيحة في الملف');
      }

      setImportProgress(25);

      const errors: { row: number; error: string; data: any }[] = [];
      let successCount = 0;

      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        
        setImportProgress(25 + (i / customers.length) * 50);

        try {
          const { error } = await supabase
            .from('customers')
            .insert([customer]);

          if (error) {
            errors.push({ 
              row: i + 2, 
              error: error.message, 
              data: customer 
            });
          } else {
            successCount++;
          }
        } catch (error: any) {
          errors.push({ 
            row: i + 2, 
            error: error.message, 
            data: customer 
          });
        }
      }

      setImportProgress(100);

      setImportResult({
        total: customers.length,
        successful: successCount,
        failed: errors.length,
        errors
      });

      if (successCount > 0) {
        toast({
          title: "تم الاستيراد بنجاح",
          description: `تم إضافة ${successCount} عميل من أصل ${customers.length}`,
        });
      }

    } catch (error: any) {
      console.error('Import error:', error);
      toast({
        title: "خطأ في الاستيراد",
        description: error.message || "حدث خطأ أثناء استيراد البيانات",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate('/customers')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">استيراد العملاء</h1>
          <p className="text-muted-foreground">استيراد بيانات العملاء من ملف CSV أو Excel</p>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              تحميل النموذج
            </CardTitle>
            <CardDescription>
              قم بتحميل ملف النموذج لمعرفة التنسيق المطلوب لبيانات العملاء
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadTemplate} variant="outline">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              تحميل نموذج CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              رفع ملف العملاء
            </CardTitle>
            <CardDescription>
              اختر ملف CSV أو Excel يحتوي على بيانات العملاء
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">اختيار الملف</Label>
              <Input
                id="file"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                disabled={isImporting}
              />
            </div>

            {selectedFile && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              </div>
            )}

            {isImporting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>جاري الاستيراد...</span>
                  <span>{importProgress}%</span>
                </div>
                <Progress value={importProgress} />
              </div>
            )}

            <div className="flex gap-4">
            <Button
              onClick={handleImport}
              disabled={!selectedFile || isImporting}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isImporting ? "جاري الاستيراد..." : "بدء الاستيراد"}
            </Button>
              
              {selectedFile && !isImporting && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedFile(null)}
                >
                  إلغاء اختيار الملف
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {importResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                نتائج الاستيراد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{importResult.successful}</div>
                  <div className="text-sm text-green-600">نجح</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{importResult.failed}</div>
                  <div className="text-sm text-red-600">فشل</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{importResult.total}</div>
                  <div className="text-sm text-blue-600">الإجمالي</div>
                </div>
              </div>

              {importResult.errors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    الأخطاء ({importResult.errors.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {importResult.errors.map((error, index) => (
                      <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-red-700">
                            الصف {error.row}: {error.error}
                          </span>
                        </div>
                        <div className="text-sm text-red-600">
                          البيانات: {JSON.stringify(error.data, null, 2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={() => navigate('/customers')}>
                  العودة إلى قائمة العملاء
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setImportResult(null);
                    setSelectedFile(null);
                  }}
                >
                  استيراد ملف آخر
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>إرشادات الاستيراد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>يجب أن يحتوي الملف على الأعمدة التالية: full_name, phone (مطلوب)</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>الأعمدة الاختيارية: email, civil_id, customer_type, address, city, notes</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>نوع العميل (customer_type): individual أو company</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>يجب أن يكون الملف بصيغة CSV أو Excel</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>سيتم تجاهل الصفوف التي تحتوي على أخطاء</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportCustomers;