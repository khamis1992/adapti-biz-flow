import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  FileText, 
  Plus,
  Save,
  X,
  Calculator,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';
import { supabase } from '@/integrations/supabase/client';

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

interface Customer {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
}

interface EditInvoiceData {
  id: string;
  invoice_number: string;
  customer_id: string;
  issue_date: string;
  due_date: string;
  notes: string;
  terms_conditions: string;
  payment_terms: string;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  items: InvoiceItem[];
}

const EditInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<EditInvoiceData | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([]);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenant } = useTenant();

  useEffect(() => {
    if (id && tenant?.id) {
      fetchInvoiceData();
      fetchCustomers();
    }
  }, [id, tenant?.id]);

  const fetchInvoiceData = async () => {
    if (!id || !tenant?.id) return;

    try {
      setIsLoading(true);
      
      // @ts-ignore - Invoice tables not in schema yet
      const { data: invoiceData, error: invoiceError } = await (supabase as any)
        .from('invoices')
        .select('*')
        .eq('id', id)
        .eq('tenant_id', tenant.id)
        .single();

      if (invoiceError) throw invoiceError;

      // @ts-ignore - Invoice tables not in schema yet
      const { data: itemsData, error: itemsError } = await (supabase as any)
        .from('invoice_items')
        .select('*')
        .eq('invoice_id', id)
        .order('created_at');

      if (itemsError) throw itemsError;

      const invoiceWithItems: EditInvoiceData = {
        ...invoiceData,
        items: itemsData || []
      };

      setInvoice(invoiceWithItems);
      setItems(itemsData || []);
    } catch (error: any) {
      console.error('Error fetching invoice:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في جلب بيانات الفاتورة",
        variant: "destructive"
      });
      navigate('/invoices');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    if (!tenant?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, full_name, email, phone')
        .eq('tenant_id', tenant.id)
        .order('full_name');

      if (error) throw error;
      setCustomers(data || []);
    } catch (error: any) {
      console.error('Error fetching customers:', error);
    }
  };

  const calculateLineTotal = (item: InvoiceItem) => {
    const subtotal = item.quantity * item.unit_price;
    const discountAmount = subtotal * (item.discount_percentage / 100);
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * (item.tax_percentage / 100);
    return afterDiscount + taxAmount;
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.line_total = calculateLineTotal(updatedItem);
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      item_name: '',
      description: '',
      quantity: 1,
      unit_price: 0,
      discount_percentage: 0,
      tax_percentage: 10,
      line_total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const totalDiscount = items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unit_price;
      return sum + (itemSubtotal * item.discount_percentage / 100);
    }, 0);
    const afterDiscount = subtotal - totalDiscount;
    const totalTax = items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unit_price;
      const itemAfterDiscount = itemSubtotal - (itemSubtotal * item.discount_percentage / 100);
      return sum + (itemAfterDiscount * item.tax_percentage / 100);
    }, 0);
    const total = afterDiscount + totalTax;

    return {
      subtotal,
      totalDiscount,
      totalTax,
      total
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const handleSaveInvoice = async () => {
    if (!invoice || !tenant?.id) return;

    if (items.some(item => !item.item_name || item.unit_price <= 0)) {
      toast({
        title: "خطأ",
        description: "يرجى التأكد من صحة بيانات جميع العناصر",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { subtotal, totalDiscount, totalTax, total } = calculateTotals();
      
      // تحديث الفاتورة
      // @ts-ignore - Invoice tables not in schema yet
      const { error: invoiceError } = await (supabase as any)
        .from('invoices')
        .update({
          customer_id: invoice.customer_id,
          issue_date: invoice.issue_date,
          due_date: invoice.due_date,
          subtotal: subtotal,
          discount_amount: totalDiscount,
          tax_amount: totalTax,
          total_amount: total,
          notes: invoice.notes,
          terms_conditions: invoice.terms_conditions,
          payment_terms: invoice.payment_terms
        })
        .eq('id', invoice.id)
        .eq('tenant_id', tenant.id);

      if (invoiceError) throw invoiceError;

      // حذف العناصر القديمة
      // @ts-ignore - Invoice tables not in schema yet
      const { error: deleteError } = await (supabase as any)
        .from('invoice_items')
        .delete()
        .eq('invoice_id', invoice.id);

      if (deleteError) throw deleteError;

      // إضافة العناصر الجديدة
      const invoiceItemsToInsert = items.filter(item => item.item_name.trim()).map(item => ({
        invoice_id: invoice.id,
        item_name: item.item_name,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount_percentage: item.discount_percentage,
        tax_percentage: item.tax_percentage,
        line_total: calculateLineTotal(item)
      }));

      if (invoiceItemsToInsert.length > 0) {
        // @ts-ignore - Invoice tables not in schema yet
        const { error: itemsError } = await (supabase as any)
          .from('invoice_items')
          .insert(invoiceItemsToInsert);

        if (itemsError) throw itemsError;
      }
      
      toast({
        title: "تم التحديث بنجاح",
        description: `تم تحديث الفاتورة ${invoice.invoice_number} بنجاح`,
      });
      
      navigate('/invoices');
    } catch (error: any) {
      console.error('Error updating invoice:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحديث الفاتورة",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const totals = calculateTotals();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">جاري تحميل بيانات الفاتورة...</p>
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
      <header className="border-b bg-card shadow-soft">
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
                <h1 className="text-xl font-bold">تعديل فاتورة {invoice.invoice_number}</h1>
                <p className="text-sm text-muted-foreground">تحديث بيانات الفاتورة والعناصر</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button 
                variant="outline"
                onClick={() => navigate('/invoices')}
              >
                إلغاء
              </Button>
              <Button 
                onClick={handleSaveInvoice}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                حفظ التغييرات
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Dates */}
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الفاتورة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer">العميل *</Label>
                    <Select 
                      value={invoice.customer_id} 
                      onValueChange={(value) => setInvoice({...invoice, customer_id: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="payment-terms">شروط الدفع</Label>
                    <Input
                      id="payment-terms"
                      value={invoice.payment_terms}
                      onChange={(e) => setInvoice({...invoice, payment_terms: e.target.value})}
                      placeholder="مثال: صافي 30 يوم"
                    />
                  </div>
                  <div>
                    <Label htmlFor="issue-date">تاريخ الإصدار *</Label>
                    <Input
                      id="issue-date"
                      type="date"
                      value={invoice.issue_date}
                      onChange={(e) => setInvoice({...invoice, issue_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="due-date">تاريخ الاستحقاق *</Label>
                    <Input
                      id="due-date"
                      type="date"
                      value={invoice.due_date}
                      onChange={(e) => setInvoice({...invoice, due_date: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>عناصر الفاتورة</CardTitle>
                  <Button onClick={addItem} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة عنصر
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">العنصر {index + 1}</span>
                        {items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>اسم العنصر *</Label>
                          <Input
                            value={item.item_name}
                            onChange={(e) => updateItem(item.id, 'item_name', e.target.value)}
                            placeholder="اسم المنتج أو الخدمة"
                          />
                        </div>
                        <div>
                          <Label>الوصف</Label>
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="وصف العنصر"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <Label>الكمية</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>السعر</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.001"
                            value={item.unit_price}
                            onChange={(e) => updateItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>الخصم %</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={item.discount_percentage}
                            onChange={(e) => updateItem(item.id, 'discount_percentage', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>الضريبة %</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={item.tax_percentage}
                            onChange={(e) => updateItem(item.id, 'tax_percentage', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>المجموع</Label>
                          <div className="h-10 px-3 py-2 bg-muted rounded border flex items-center">
                            <span className="font-medium">{formatCurrency(item.line_total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes & Terms */}
            <Card>
              <CardHeader>
                <CardTitle>ملاحظات وشروط</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    value={invoice.notes}
                    onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
                    placeholder="ملاحظات إضافية للفاتورة..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="terms">الشروط والأحكام</Label>
                  <Textarea
                    id="terms"
                    value={invoice.terms_conditions}
                    onChange={(e) => setInvoice({...invoice, terms_conditions: e.target.value})}
                    placeholder="الشروط والأحكام..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  ملخص الفاتورة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>إجمالي الخصم:</span>
                  <span>-{formatCurrency(totals.totalDiscount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>إجمالي الضريبة:</span>
                  <span>{formatCurrency(totals.totalTax)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع الكلي:</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditInvoice;