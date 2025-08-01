import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  FileText, 
  Download,
  Send,
  Edit,
  Printer,
  Eye,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';

interface InvoiceItem {
  id: string;
  item_name: string;
  description: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  tax_percentage: number;
  line_total: number;
}

interface InvoiceDetails {
  id: string;
  invoice_number: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  currency: string;
  payment_terms?: string;
  notes?: string;
  terms_conditions?: string;
  customer: {
    id: string;
    full_name: string;
    email?: string;
    phone: string;
    address?: string;
    city?: string;
  };
  items: InvoiceItem[];
  payments: Array<{
    id: string;
    payment_date: string;
    amount: number;
    payment_method: string;
    reference_number?: string;
    notes?: string;
  }>;
}

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenant } = useTenant();

  useEffect(() => {
    if (id) {
      fetchInvoiceDetails(id);
    }
  }, [id]);

  const fetchInvoiceDetails = async (invoiceId: string) => {
    setIsLoading(true);
    try {
      // Mock data for now
      const mockInvoice: InvoiceDetails = {
        id: invoiceId,
        invoice_number: 'INV-202501-0001',
        status: 'sent',
        issue_date: '2025-01-15',
        due_date: '2025-02-15',
        subtotal: 1000.000,
        tax_amount: 100.000,
        discount_amount: 50.000,
        total_amount: 1050.000,
        paid_amount: 0,
        currency: 'KWD',
        payment_terms: 'صافي 30 يوم',
        notes: 'شكراً لاختياركم خدماتنا',
        terms_conditions: 'يرجى السداد في التاريخ المحدد. رسوم تأخير 2% شهرياً.',
        customer: {
          id: '1',
          full_name: 'أحمد محمد الكندري',
          email: 'ahmed@example.com',
          phone: '+965 1234 5678',
          address: 'شارع الخليج العربي، الكويت',
          city: 'الكويت'
        },
        items: [
          {
            id: '1',
            item_name: 'إيجار سيارة - يومي',
            description: 'إيجار سيارة صغيرة لمدة 5 أيام',
            quantity: 5,
            unit_price: 25.000,
            discount_percentage: 10,
            tax_percentage: 10,
            line_total: 123.750
          },
          {
            id: '2',
            item_name: 'تأمين شامل',
            description: 'تأمين شامل ضد الحوادث',
            quantity: 1,
            unit_price: 50.000,
            discount_percentage: 0,
            tax_percentage: 10,
            line_total: 55.000
          }
        ],
        payments: []
      };

      setTimeout(() => {
        setInvoice(mockInvoice);
        setIsLoading(false);
      }, 1000);
    } catch (error: any) {
      console.error('Error fetching invoice details:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب تفاصيل الفاتورة",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast({
      title: "قريباً",
      description: "سيتم إضافة ميزة تحميل PDF قريباً"
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "قريباً",
      description: "سيتم إضافة ميزة الإرسال عبر البريد الإلكتروني قريباً"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل تفاصيل الفاتورة...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">لم يتم العثور على الفاتورة</p>
          <Button onClick={() => navigate('/invoices')} className="mt-4">
            العودة إلى قائمة الفواتير
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft print:hidden">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                onClick={() => navigate('/invoices')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة
              </Button>
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">فاتورة {invoice.invoice_number}</h1>
                <p className="text-sm text-muted-foreground">تفاصيل الفاتورة والعمليات</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                طباعة
              </Button>
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                تحميل PDF
              </Button>
              <Button variant="outline" onClick={handleSendEmail}>
                <Send className="w-4 h-4 mr-2" />
                إرسال
              </Button>
              <Button onClick={() => navigate(`/invoices/${invoice.id}/edit`)}>
                <Edit className="w-4 h-4 mr-2" />
                تعديل
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Invoice Header */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">فاتورة</h2>
                  <div className="space-y-2">
                    <p className="font-semibold">شركة تأجير السيارات</p>
                    <p className="text-sm text-muted-foreground">شارع الخليج العربي</p>
                    <p className="text-sm text-muted-foreground">الكويت، الكويت</p>
                    <p className="text-sm text-muted-foreground">+965 2222 3333</p>
                  </div>
                </div>

                {/* Invoice Info */}
                <div className="text-right">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">رقم الفاتورة:</span>
                      <span className="font-bold">{invoice.invoice_number}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">الحالة:</span>
                      <Badge className={getStatusColor(invoice.status)}>
                        {getStatusLabel(invoice.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">تاريخ الإصدار:</span>
                      <span>{formatDate(invoice.issue_date)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">تاريخ الاستحقاق:</span>
                      <span>{formatDate(invoice.due_date)}</span>
                    </div>
                    {invoice.payment_terms && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium">شروط الدفع:</span>
                        <span>{invoice.payment_terms}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                معلومات العميل
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-semibold">{invoice.customer.full_name}</p>
                  {invoice.customer.email && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {invoice.customer.email}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {invoice.customer.phone}
                  </p>
                  {invoice.customer.address && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {invoice.customer.address}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle>عناصر الفاتورة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-2">الوصف</th>
                      <th className="text-center py-2">الكمية</th>
                      <th className="text-center py-2">السعر</th>
                      <th className="text-center py-2">الخصم</th>
                      <th className="text-center py-2">الضريبة</th>
                      <th className="text-right py-2">المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{item.item_name}</p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-3">{item.quantity}</td>
                        <td className="text-center py-3">{formatCurrency(item.unit_price)}</td>
                        <td className="text-center py-3">{item.discount_percentage}%</td>
                        <td className="text-center py-3">{item.tax_percentage}%</td>
                        <td className="text-right py-3 font-medium">{formatCurrency(item.line_total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2 max-w-sm ml-auto">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.discount_amount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>إجمالي الخصم:</span>
                    <span>-{formatCurrency(invoice.discount_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>إجمالي الضريبة:</span>
                  <span>{formatCurrency(invoice.tax_amount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع الكلي:</span>
                  <span>{formatCurrency(invoice.total_amount)}</span>
                </div>
                {invoice.paid_amount > 0 && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span>المدفوع:</span>
                      <span>{formatCurrency(invoice.paid_amount)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-red-600">
                      <span>المتبقي:</span>
                      <span>{formatCurrency(invoice.total_amount - invoice.paid_amount)}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          {invoice.payments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  سجل المدفوعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoice.payments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(payment.payment_date)} - {payment.payment_method}
                        </p>
                        {payment.reference_number && (
                          <p className="text-sm text-muted-foreground">مرجع: {payment.reference_number}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes and Terms */}
          {(invoice.notes || invoice.terms_conditions) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invoice.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>ملاحظات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{invoice.notes}</p>
                  </CardContent>
                </Card>
              )}
              
              {invoice.terms_conditions && (
                <Card>
                  <CardHeader>
                    <CardTitle>الشروط والأحكام</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{invoice.terms_conditions}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvoiceDetails;