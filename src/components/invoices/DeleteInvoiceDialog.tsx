import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';
import { supabase } from '@/integrations/supabase/client';

interface DeleteInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  invoiceNumber: string;
  onDeleted: () => void;
}

const DeleteInvoiceDialog = ({ 
  open, 
  onOpenChange, 
  invoiceId, 
  invoiceNumber,
  onDeleted 
}: DeleteInvoiceDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { tenant } = useTenant();

  const handleDelete = async () => {
    if (!tenant?.id) {
      toast({
        title: "خطأ",
        description: "خطأ في بيانات المستأجر",
        variant: "destructive"
      });
      return;
    }

    setIsDeleting(true);
    try {
      // حذف عناصر الفاتورة أولاً
      // @ts-ignore - Invoice tables not in schema yet
      const { error: itemsError } = await (supabase as any)
        .from('invoice_items')
        .delete()
        .eq('invoice_id', invoiceId);

      if (itemsError) throw itemsError;

      // حذف المدفوعات
      // @ts-ignore - Invoice tables not in schema yet
      const { error: paymentsError } = await (supabase as any)
        .from('invoice_payments')
        .delete()
        .eq('invoice_id', invoiceId);

      if (paymentsError) throw paymentsError;

      // حذف الفاتورة
      // @ts-ignore - Invoice tables not in schema yet
      const { error: invoiceError } = await (supabase as any)
        .from('invoices')
        .delete()
        .eq('id', invoiceId)
        .eq('tenant_id', tenant.id);

      if (invoiceError) throw invoiceError;

      toast({
        title: "تم الحذف",
        description: `تم حذف الفاتورة ${invoiceNumber} بنجاح`,
      });

      onDeleted();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error deleting invoice:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حذف الفاتورة",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-destructive">
            <Trash2 className="w-5 h-5 mr-2" />
            حذف الفاتورة
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            هل أنت متأكد من حذف الفاتورة <strong>{invoiceNumber}</strong>؟
            <br />
            <span className="text-destructive font-medium">
              هذا الإجراء لا يمكن التراجع عنه وسيتم حذف جميع البيانات المرتبطة بالفاتورة.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse">
          <AlertDialogCancel disabled={isDeleting}>
            إلغاء
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'جاري الحذف...' : 'حذف الفاتورة'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteInvoiceDialog;