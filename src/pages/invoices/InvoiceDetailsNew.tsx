import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';
import { supabase } from '@/integrations/supabase/client';
import PaymentDialog from '@/components/invoices/PaymentDialog';
import DeleteInvoiceDialog from '@/components/invoices/DeleteInvoiceDialog';
import { InvoicePrintView } from '@/components/invoices/InvoicePrintView';
import { generateInvoicePDF, generateInvoicePDFFromElement, downloadPDF, printPDF } from '@/utils/pdfGenerator';

interface InvoiceItem {
  id: string;
  item_name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  tax_percentage: number;
  line_total: number;
}

interface Customer {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
}

interface InvoiceDetails {
  id: string;
  invoice_number: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issue_date: string;
  due_date: string;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  notes?: string;
  terms_conditions?: string;
  payment_terms?: string;
  currency: string;
  created_at: string;
  customer: Customer;
  items: InvoiceItem[];
  payments?: Array<{
    id: string;
    amount: number;
    payment_date: string;
    payment_method: string;
    reference_number?: string;
    notes?: string;
  }>;
}

const InvoiceDetailsNew = () => {
  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenant } = useTenant();

  useEffect(() => {
    if (id) {
      fetchInvoiceDetails(id);
    }
  }, [id, tenant?.id]);

  const fetchInvoiceDetails = async (invoiceId: string) => {
    if (!tenant?.id) return;
    
    try {
      setIsLoading(true);
      
      // @ts-ignore - Invoice tables not in schema yet
      const { data: invoiceData, error: invoiceError } = await (supabase as any)
        .from('invoices')
        .select(`
          *,
          customers (*)
        `)
        .eq('id', invoiceId)
        .eq('tenant_id', tenant.id)
        .single();

      if (invoiceError) {
        throw invoiceError;
      }

      // @ts-ignore - Invoice tables not in schema yet
      const { data: itemsData, error: itemsError } = await (supabase as any)
        .from('invoice_items')
        .select('*')
        .eq('invoice_id', invoiceId)
        .order('created_at');

      if (itemsError) {
        throw itemsError;
      }

      // @ts-ignore - Invoice tables not in schema yet
      const { data: paymentsData, error: paymentsError } = await (supabase as any)
        .from('invoice_payments')
        .select('*')
        .eq('invoice_id', invoiceId)
        .order('payment_date', { ascending: false });

      if (paymentsError) {
        console.error('Error fetching payments:', paymentsError);
      }

      const formattedInvoice: InvoiceDetails = {
        id: invoiceData.id,
        invoice_number: invoiceData.invoice_number,
        status: invoiceData.status,
        issue_date: invoiceData.issue_date,
        due_date: invoiceData.due_date,
        subtotal: invoiceData.subtotal,
        discount_amount: invoiceData.discount_amount,
        tax_amount: invoiceData.tax_amount,
        total_amount: invoiceData.total_amount,
        paid_amount: invoiceData.paid_amount,
        notes: invoiceData.notes,
        terms_conditions: invoiceData.terms_conditions,
        payment_terms: invoiceData.payment_terms,
        currency: invoiceData.currency,
        created_at: invoiceData.created_at,
        customer: invoiceData.customers,
        items: itemsData || [],
        payments: paymentsData || []
      };

      setInvoice(formattedInvoice);
    } catch (error: any) {
      console.error('Error fetching invoice:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل تفاصيل الفاتورة",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: 'مسودة',
      sent: 'مرسلة',
      paid: 'مدفوعة',
      overdue: 'متأخرة'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const handlePrint = async () => {
    try {
      if (!invoice) return;
      
      // Generate PDF and print it
      const pdf = await generateInvoicePDF(invoice);
      printPDF(pdf);
      
      toast({
        title: "تم بنجاح",
        description: "تم فتح نافذة الطباعة"
      });
    } catch (error) {
      console.error('Error printing invoice:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في طباعة الفاتورة",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      if (!invoice) return;
      
      // Generate PDF from the print view element
      const pdf = await generateInvoicePDFFromElement(
        'invoice-print-view', 
        `فاتورة-${invoice.invoice_number}.pdf`
      );
      downloadPDF(pdf, `فاتورة-${invoice.invoice_number}.pdf`);
      
      toast({
        title: "تم بنجاح",
        description: "تم تحميل الفاتورة بصيغة PDF"
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إنشاء ملف PDF",
        variant: "destructive"
      });
    }
  };

  const handleSendEmail = () => {
    toast({
      title: "قريباً",
      description: "سيتم إضافة إرسال البريد الإلكتروني قريباً"
    });
  };

  const handlePaymentAdded = () => {
    if (id) {
      fetchInvoiceDetails(id);
    }
  };

  const handleInvoiceDeleted = () => {
    navigate('/invoices');
  };

  const remainingAmount = invoice ? invoice.total_amount - invoice.paid_amount : 0;

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
          <p className="text-muted-foreground">الفاتورة غير موجودة</p>
          <Button onClick={() => navigate('/invoices')} className="mt-4">
            العودة للفواتير
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
                <p className="text-sm text-muted-foreground">تفاصيل الفاتورة والدفعات</p>
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
              {remainingAmount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowPaymentDialog(true)}
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  تسجيل دفعة
                </Button>
              )}
              <Button onClick={() => navigate(`/invoices/${invoice.id}/edit`)}>
                <Edit className="w-4 h-4 mr-2" />
                تعديل
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteDialog(true)}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                حذف
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{invoice.invoice_number}</h2>
                  <Badge className={getStatusColor(invoice.status)}>
                    {getStatusLabel(invoice.status)}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">تاريخ الإصدار</p>
                  <p className="font-medium">{formatDate(invoice.issue_date)}</p>
                  <p className="text-sm text-muted-foreground mt-2">تاريخ الاستحقاق</p>
                  <p className="font-medium">{formatDate(invoice.due_date)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    بيانات العميل
                  </h3>
                  <div className="space-y-2">
                    <p className="font-medium">{invoice.customer.full_name}</p>
                    {invoice.customer.email && (
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {invoice.customer.email}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {invoice.customer.phone}
                    </p>
                    {invoice.customer.address && (
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {invoice.customer.address}
                        {invoice.customer.city && `, ${invoice.customer.city}`}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Terms */}
                <div className="text-right">
                  <h3 className="font-semibold mb-3 flex items-center justify-end">
                    <DollarSign className="w-4 h-4 ml-2" />
                    شروط الدفع
                  </h3>
                  <div className="space-y-2">
                    {invoice.payment_terms && (
                      <p className="text-sm">{invoice.payment_terms}</p>
                    )}
                    <p className="text-sm text-muted-foreground">العملة: {invoice.currency}</p>
                  </div>
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
                      <th className="text-right py-2">العنصر</th>
                      <th className="text-right py-2">الكمية</th>
                      <th className="text-right py-2">السعر</th>
                      <th className="text-right py-2">الخصم</th>
                      <th className="text-right py-2">الضريبة</th>
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
                        <td className="py-3">{item.quantity}</td>
                        <td className="py-3">{formatCurrency(item.unit_price)}</td>
                        <td className="py-3">{item.discount_percentage}%</td>
                        <td className="py-3">{item.tax_percentage}%</td>
                        <td className="py-3 font-medium">{formatCurrency(item.line_total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Summary */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
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
                      <div className="flex justify-between font-medium">
                        <span>المتبقي:</span>
                        <span>{formatCurrency(invoice.total_amount - invoice.paid_amount)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          {invoice.payments && invoice.payments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>سجل الدفعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoice.payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.payment_method} • {formatDate(payment.payment_date)}
                        </p>
                        {payment.reference_number && (
                          <p className="text-xs text-muted-foreground">
                            رقم المرجع: {payment.reference_number}
                          </p>
                        )}
                      </div>
                      {payment.notes && (
                        <p className="text-sm text-muted-foreground">{payment.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes & Terms */}
          {(invoice.notes || invoice.terms_conditions) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invoice.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>ملاحظات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{invoice.notes}</p>
                  </CardContent>
                </Card>
              )}
              
              {invoice.terms_conditions && (
                <Card>
                  <CardHeader>
                    <CardTitle>الشروط والأحكام</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{invoice.terms_conditions}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Payment Dialog */}
      {invoice && (
        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          invoiceId={invoice.id}
          invoiceNumber={invoice.invoice_number}
          remainingAmount={remainingAmount}
          onPaymentAdded={handlePaymentAdded}
        />
      )}

      {/* Delete Dialog */}
      {invoice && (
        <DeleteInvoiceDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          invoiceId={invoice.id}
          invoiceNumber={invoice.invoice_number}
          onDeleted={handleInvoiceDeleted}
        />
      )}

      {/* Hidden Print View Component */}
      <div className="hidden">
        {invoice && <InvoicePrintView invoice={invoice} />}
      </div>
    </div>
  );
};

export default InvoiceDetailsNew;