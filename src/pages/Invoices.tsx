import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  FileText, 
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  User,
  Building2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';

interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issue_date: string;
  due_date: string;
  created_at: string;
  customer?: {
    full_name: string;
  };
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenant } = useTenant();

  const fetchInvoices = async () => {
    if (!tenant?.id) return;
    
    try {
      setIsLoading(true);
      
      // @ts-ignore - Invoice tables not in schema yet  
      const { data, error } = await (supabase as any)
        .from('invoices')
        .select(`
          *,
          customers (
            id,
            full_name,
            email,
            phone
          )
        `)
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching invoices:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ في تحميل الفواتير",
          variant: "destructive",
        });
        return;
      }

      const formattedInvoices: Invoice[] = data?.map((invoice: any) => ({
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        customer_id: invoice.customer_id,
        total_amount: invoice.total_amount,
        status: invoice.status,
        issue_date: invoice.issue_date,
        due_date: invoice.due_date,
        created_at: invoice.created_at,
        customer: {
          full_name: invoice.customers?.full_name || 'غير محدد'
        }
      })) || [];

      setInvoices(formattedInvoices);
    } catch (error: any) {
      console.error('Error fetching invoices:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب الفواتير",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [tenant?.id]);

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-600'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: 'مسودة',
      sent: 'مرسلة',
      paid: 'مدفوعة',
      overdue: 'متأخرة',
      cancelled: 'ملغاة'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const filteredInvoices = invoices.filter(invoice => {
    const customerName = invoice.customer?.full_name || '';
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total_amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.total_amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'sent').reduce((sum, invoice) => sum + invoice.total_amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.total_amount, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل الفواتير...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة
              </Button>
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">إدارة الفواتير</h1>
                <p className="text-sm text-muted-foreground">إنشاء ومتابعة الفواتير والمدفوعات</p>
              </div>
            </div>
            <Button onClick={() => navigate('/invoices/new')}>
              <Plus className="w-4 h-4 mr-2" />
              فاتورة جديدة
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="all-invoices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-invoices" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              جميع الفواتير
            </TabsTrigger>
            <TabsTrigger value="recurring-invoices" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              الفواتير المتكررة
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              تقارير المبيعات
            </TabsTrigger>
          </TabsList>

          {/* All Invoices */}
          <TabsContent value="all-invoices" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">إجمالي الفواتير</p>
                    <p className="text-lg font-bold">{formatCurrency(totalAmount)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">المدفوع</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(paidAmount)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">في الانتظار</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(pendingAmount)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-4 h-4 text-red-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">متأخر</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(overdueAmount)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في الفواتير..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="حالة الفاتورة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="draft">مسودة</SelectItem>
                        <SelectItem value="sent">مرسلة</SelectItem>
                        <SelectItem value="paid">مدفوعة</SelectItem>
                        <SelectItem value="overdue">متأخرة</SelectItem>
                        <SelectItem value="cancelled">ملغاة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    تصدير
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoices List */}
            <Card>
              <CardHeader>
                <CardTitle>قائمة الفواتير ({filteredInvoices.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <p className="font-medium">{invoice.invoice_number}</p>
                            <Badge className={getStatusColor(invoice.status)}>
                              {getStatusLabel(invoice.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                             <span className="flex items-center">
                               <User className="w-3 h-3 mr-1" />
                               {invoice.customer?.full_name}
                             </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              تاريخ الإصدار: {formatDate(invoice.issue_date)}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              تاريخ الاستحقاق: {formatDate(invoice.due_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatCurrency(invoice.total_amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {invoice.status === 'overdue' ? 
                              `متأخر ${Math.floor((new Date().getTime() - new Date(invoice.due_date).getTime()) / (1000 * 3600 * 24))} يوم`
                              : `مستحق في ${formatDate(invoice.due_date)}`
                            }
                          </p>
                        </div>
                         <div className="flex space-x-1 space-x-reverse">
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => navigate(`/invoices/${invoice.id}`)}
                           >
                             <Eye className="w-4 h-4" />
                           </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/invoices/edit/${invoice.id}`)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => toast({
                               title: "قريباً",
                               description: "سيتم إضافة إرسال الفاتورة قريباً"
                             })}
                           >
                             <Send className="w-4 h-4" />
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => toast({
                               title: "قريباً", 
                               description: "سيتم إضافة تحميل الفاتورة قريباً"
                             })}
                           >
                             <Download className="w-4 h-4" />
                           </Button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recurring Invoices */}
          <TabsContent value="recurring-invoices">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  الفواتير المتكررة
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة فاتورة متكررة
                  </Button>
                </CardTitle>
                <CardDescription>
                  إدارة الفواتير التي يتم إرسالها بشكل دوري
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد فواتير متكررة حتى الآن</p>
                  <Button className="mt-4" variant="outline">
                    إنشاء أول فاتورة متكررة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير المبيعات الشهري</CardTitle>
                  <CardDescription>مبيعات الشهر الحالي والمقارنة مع الأشهر السابقة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير العملاء</CardTitle>
                  <CardDescription>تحليل المبيعات حسب العملاء</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">الفواتير المتأخرة</CardTitle>
                  <CardDescription>قائمة بالفواتير غير المدفوعة والمتأخرة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل الربحية</CardTitle>
                  <CardDescription>تحليل هوامش الربح والعائد على الاستثمار</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير الضرائب</CardTitle>
                  <CardDescription>تقرير الضرائب المضافة والاستقطاعات</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير التدفق النقدي</CardTitle>
                  <CardDescription>توقعات التدفق النقدي القادم</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Invoices;