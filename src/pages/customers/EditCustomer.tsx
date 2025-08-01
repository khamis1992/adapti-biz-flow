import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, User, Building2, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Customer {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  civil_id?: string;
  customer_type: 'individual' | 'company';
  address?: string;
  city?: string;
  notes?: string;
  is_blacklisted: boolean;
  blacklist_reason?: string;
}

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const [formData, setFormData] = useState<Customer>({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    civil_id: "",
    customer_type: "individual",
    address: "",
    city: "",
    notes: "",
    is_blacklisted: false,
    blacklist_reason: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      } else {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل بيانات العميل",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('customers')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم تحديث البيانات بنجاح",
        description: "تم حفظ تعديلات العميل"
      });

      navigate(`/customers/${id}`);
    } catch (error) {
      console.error('Error updating customer:', error);
      toast({
        title: "خطأ في تحديث البيانات",
        description: "حدث خطأ أثناء حفظ التعديلات",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم حذف العميل",
        description: "تم حذف العميل وجميع بياناته"
      });

      navigate('/customers');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "خطأ في حذف العميل",
        description: "حدث خطأ أثناء حذف العميل",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(`/customers/${id}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">تعديل بيانات العميل</h1>
            <p className="text-muted-foreground">{formData.full_name}</p>
          </div>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              حذف العميل
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد حذف العميل</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد من رغبتك في حذف هذا العميل؟ هذا الإجراء لا يمكن التراجع عنه وسيؤثر على جميع العقود المرتبطة.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "جاري الحذف..." : "حذف العميل"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              البيانات الأساسية
            </CardTitle>
            <CardDescription>معلومات العميل الشخصية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">الاسم الكامل *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_type">نوع العميل</Label>
                <Select
                  value={formData.customer_type}
                  onValueChange={(value) => handleInputChange('customer_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        فرد
                      </div>
                    </SelectItem>
                    <SelectItem value="company">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        شركة
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="مثال: +965 1234 5678"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="civil_id">الرقم المدني</Label>
              <Input
                id="civil_id"
                value={formData.civil_id || ""}
                onChange={(e) => handleInputChange('civil_id', e.target.value)}
                placeholder="أدخل الرقم المدني"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معلومات العنوان</CardTitle>
            <CardDescription>تفاصيل العنوان والموقع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                value={formData.address || ""}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="أدخل العنوان التفصيلي"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                value={formData.city || ""}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="أدخل اسم المدينة"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملاحظات إضافية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="أي ملاحظات إضافية عن العميل"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label>القائمة السوداء</Label>
                <p className="text-sm text-muted-foreground">منع العميل من إجراء عمليات جديدة</p>
              </div>
              <Switch
                checked={formData.is_blacklisted}
                onCheckedChange={(checked) => handleInputChange('is_blacklisted', checked)}
              />
            </div>

            {formData.is_blacklisted && (
              <div className="space-y-2">
                <Label htmlFor="blacklist_reason">سبب الإدراج في القائمة السوداء</Label>
                <Textarea
                  id="blacklist_reason"
                  value={formData.blacklist_reason || ""}
                  onChange={(e) => handleInputChange('blacklist_reason', e.target.value)}
                  placeholder="أدخل سبب الإدراج في القائمة السوداء"
                  rows={2}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(`/customers/${id}`)}>
            إلغاء
          </Button>
          <Button type="submit" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;