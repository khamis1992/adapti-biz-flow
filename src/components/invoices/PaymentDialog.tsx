import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';
import { supabase } from '@/integrations/supabase/client';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  invoiceNumber: string;
  remainingAmount: number;
  onPaymentAdded: () => void;
}

const PaymentDialog = ({ 
  open, 
  onOpenChange, 
  invoiceId, 
  invoiceNumber, 
  remainingAmount,
  onPaymentAdded 
}: PaymentDialogProps) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { tenant } = useTenant();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال مبلغ صحيح",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) > remainingAmount) {
      toast({
        title: "خطأ",
        description: "المبلغ المدخل أكبر من المبلغ المتبقي",
        variant: "destructive"
      });
      return;
    }

    if (!tenant?.id) {
      toast({
        title: "خطأ",
        description: "خطأ في بيانات المستأجر",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // @ts-ignore - Invoice tables not in schema yet
      const { error } = await (supabase as any)
        .from('invoice_payments')
        .insert({
          invoice_id: invoiceId,
          tenant_id: tenant.id,
          amount: parseFloat(amount),
          payment_method: paymentMethod,
          payment_date: paymentDate,
          reference_number: referenceNumber || null,
          notes: notes || null,
          created_by: tenant.id // مؤقتاً حتى يتم إضافة المصادقة
        });

      if (error) throw error;

      toast({
        title: "تم إضافة الدفعة",
        description: `تم تسجيل دفعة بمبلغ ${formatCurrency(parseFloat(amount))} للفاتورة ${invoiceNumber}`,
      });

      onPaymentAdded();
      onOpenChange(false);
      
      // إعادة تعيين النموذج
      setAmount('');
      setPaymentMethod('cash');
      setPaymentDate(new Date().toISOString().split('T')[0]);
      setReferenceNumber('');
      setNotes('');
    } catch (error: any) {
      console.error('Error adding payment:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إضافة الدفعة",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            إضافة دفعة - {invoiceNumber}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-muted/50 p-3 rounded">
            <p className="text-sm text-muted-foreground">المبلغ المتبقي</p>
            <p className="font-bold text-lg">{formatCurrency(remainingAmount)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">المبلغ المدفوع *</Label>
              <Input
                id="amount"
                type="number"
                step="0.001"
                min="0"
                max={remainingAmount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.000"
                required
              />
            </div>
            <div>
              <Label htmlFor="payment-date">تاريخ الدفع *</Label>
              <Input
                id="payment-date"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="payment-method">طريقة الدفع *</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="اختر طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">نقدي</SelectItem>
                <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                <SelectItem value="check">شيك</SelectItem>
                <SelectItem value="credit_card">بطاقة ائتمان</SelectItem>
                <SelectItem value="debit_card">بطاقة مدين</SelectItem>
                <SelectItem value="online">دفع إلكتروني</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reference">رقم المرجع</Label>
            <Input
              id="reference"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="رقم الشيك، المرجع البنكي، إلخ..."
            />
          </div>

          <div>
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ملاحظات إضافية..."
              rows={3}
            />
          </div>

          <div className="flex space-x-2 space-x-reverse pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <CreditCard className="w-4 h-4 mr-2 animate-pulse" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  تسجيل الدفعة
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;