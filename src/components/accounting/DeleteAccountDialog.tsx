import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Account {
  id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
}

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
  onSuccess: () => void;
}

export const DeleteAccountDialog = ({ open, onOpenChange, account, onSuccess }: DeleteAccountDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!account) return;
    
    setIsLoading(true);
    try {
      // Check if account has child accounts
      const { data: childAccounts, error: childError } = await supabase
        .from('accounts')
        .select('id')
        .eq('parent_account_id', account.id);

      if (childError) throw childError;

      if (childAccounts && childAccounts.length > 0) {
        toast({
          title: 'لا يمكن حذف الحساب',
          description: 'يحتوي هذا الحساب على حسابات فرعية. يرجى حذف الحسابات الفرعية أولاً.',
          variant: 'destructive'
        });
        return;
      }

      // Check if account has journal entries
      const { data: journalEntries, error: journalError } = await supabase
        .from('journal_entry_lines')
        .select('id')
        .eq('account_id', account.id)
        .limit(1);

      if (journalError) throw journalError;

      if (journalEntries && journalEntries.length > 0) {
        toast({
          title: 'لا يمكن حذف الحساب',
          description: 'يحتوي هذا الحساب على قيود محاسبية. لا يمكن حذف الحسابات التي تحتوي على معاملات.',
          variant: 'destructive'
        });
        return;
      }

      // Delete the account
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', account.id);

      if (error) throw error;

      toast({
        title: 'تم الحذف بنجاح',
        description: 'تم حذف الحساب بنجاح'
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'خطأ في الحذف',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد حذف الحساب</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد من رغبتك في حذف الحساب "{account?.account_name_ar}"؟
            <br />
            <strong>رمز الحساب:</strong> {account?.account_code}
            <br />
            <br />
            <span className="text-destructive">
              تحذير: هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الحساب نهائياً من النظام.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            حذف نهائي
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};