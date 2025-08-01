import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Account {
  id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: 'assets' | 'liabilities' | 'equity' | 'revenue' | 'expenses';
  level: number;
  balance: number;
  allow_posting: boolean;
  is_active: boolean;
  parent_account_id?: string;
}

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account;
  onSuccess: () => void;
}

const ACCOUNT_TYPES = [
  { value: 'assets', label: 'أصول' },
  { value: 'liabilities', label: 'خصوم' },
  { value: 'equity', label: 'حقوق ملكية' },
  { value: 'revenue', label: 'إيرادات' },
  { value: 'expenses', label: 'مصروفات' }
];

export const AccountDialog = ({ open, onOpenChange, account, onSuccess }: AccountDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [parentAccounts, setParentAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState({
    account_code: '',
    account_name_ar: '',
    account_name_en: '',
    account_type: '',
    level: 1,
    balance: 0,
    allow_posting: false,
    is_active: true,
    parent_account_id: ''
  });

  const { toast } = useToast();
  const isEditing = !!account;

  useEffect(() => {
    if (account) {
      setFormData({
        account_code: account.account_code,
        account_name_ar: account.account_name_ar,
        account_name_en: account.account_name_en,
        account_type: account.account_type,
        level: account.level,
        balance: account.balance,
        allow_posting: account.allow_posting,
        is_active: account.is_active,
        parent_account_id: account.parent_account_id || ''
      });
    }
    fetchParentAccounts();
  }, [account]);

  const fetchParentAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('id, account_code, account_name_ar, account_name_en, account_type, level, balance, allow_posting, is_active')
        .eq('allow_posting', false)
        .order('account_code');

      if (error) throw error;
      setParentAccounts(data || []);
    } catch (error) {
      console.error('Error fetching parent accounts:', error);
    }
  };

  const validateAccountCode = async (code: string) => {
    if (!code) return 'رمز الحساب مطلوب';
    
    // Check if code already exists (except for current account when editing)
    const { data, error } = await supabase
      .from('accounts')
      .select('id')
      .eq('account_code', code)
      .neq('id', account?.id || '');

    if (error) return 'خطأ في التحقق من رمز الحساب';
    if (data && data.length > 0) return 'رمز الحساب مستخدم بالفعل';

    // Validate code format based on level
    const level = calculateLevel(formData.parent_account_id);
    const expectedLength = level;
    
    if (code.length !== expectedLength) {
      return `رمز الحساب يجب أن يكون ${expectedLength} أرقام للمستوى ${level}`;
    }

    // Validate that code starts with parent code
    if (formData.parent_account_id) {
      const parent = parentAccounts.find(p => p.id === formData.parent_account_id);
      if (parent && !code.startsWith(parent.account_code)) {
        return `رمز الحساب يجب أن يبدأ بـ ${parent.account_code}`;
      }
    }

    return null;
  };

  const calculateLevel = (parentId: string) => {
    if (!parentId) return 1;
    const parent = parentAccounts.find(p => p.id === parentId);
    return parent ? parent.level + 1 : 1;
  };

  const handleParentChange = (parentId: string) => {
    const level = calculateLevel(parentId);
    const parent = parentAccounts.find(p => p.id === parentId);
    
    setFormData(prev => ({
      ...prev,
      parent_account_id: parentId,
      level,
      account_type: parent?.account_type || prev.account_type,
      // Generate suggested code
      account_code: parent ? `${parent.account_code}1` : '1'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate account code
      const codeError = await validateAccountCode(formData.account_code);
      if (codeError) {
        toast({
          title: 'خطأ في البيانات',
          description: codeError,
          variant: 'destructive'
        });
        return;
      }

      // Get current user's tenant_id
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      const accountData = {
        ...formData,
        tenant_id: userData.tenant_id,
        parent_account_id: formData.parent_account_id || null,
        balance: Number(formData.balance),
        account_type: formData.account_type as 'assets' | 'liabilities' | 'equity' | 'revenue' | 'expenses'
      };

      if (isEditing) {
        const { error } = await supabase
          .from('accounts')
          .update(accountData)
          .eq('id', account.id);

        if (error) throw error;

        toast({
          title: 'تم التحديث بنجاح',
          description: 'تم تحديث بيانات الحساب بنجاح'
        });
      } else {
        const { error } = await supabase
          .from('accounts')
          .insert(accountData);

        if (error) throw error;

        toast({
          title: 'تم الإنشاء بنجاح',
          description: 'تم إنشاء الحساب الجديد بنجاح'
        });
      }

      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: 'خطأ في العملية',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      account_code: '',
      account_name_ar: '',
      account_name_en: '',
      account_type: '',
      level: 1,
      balance: 0,
      allow_posting: false,
      is_active: true,
      parent_account_id: ''
    });
  };

  const filteredParentAccounts = parentAccounts.filter(p => 
    !formData.account_type || p.account_type === formData.account_type
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'تعديل الحساب' : 'إضافة حساب جديد'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'تعديل بيانات الحساب المحاسبي' : 'إنشاء حساب محاسبي جديد في دليل الحسابات'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account_code">رمز الحساب *</Label>
              <Input
                id="account_code"
                value={formData.account_code}
                onChange={(e) => setFormData(prev => ({ ...prev, account_code: e.target.value }))}
                placeholder="مثل: 1111"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account_type">نوع الحساب *</Label>
              <Select
                value={formData.account_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, account_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الحساب" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account_name_ar">اسم الحساب (عربي) *</Label>
            <Input
              id="account_name_ar"
              value={formData.account_name_ar}
              onChange={(e) => setFormData(prev => ({ ...prev, account_name_ar: e.target.value }))}
              placeholder="اسم الحساب باللغة العربية"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account_name_en">اسم الحساب (إنجليزي) *</Label>
            <Input
              id="account_name_en"
              value={formData.account_name_en}
              onChange={(e) => setFormData(prev => ({ ...prev, account_name_en: e.target.value }))}
              placeholder="Account name in English"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_account">الحساب الأب</Label>
            <Select
              value={formData.parent_account_id}
              onValueChange={handleParentChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الحساب الأب (اختياري)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">بدون حساب أب</SelectItem>
                {filteredParentAccounts.map((parent) => (
                  <SelectItem key={parent.id} value={parent.id}>
                    {parent.account_code} - {parent.account_name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="balance">الرصيد الافتتاحي</Label>
              <Input
                id="balance"
                type="number"
                step="0.001"
                value={formData.balance}
                onChange={(e) => setFormData(prev => ({ ...prev, balance: Number(e.target.value) }))}
                placeholder="0.000"
              />
            </div>

            <div className="space-y-2">
              <Label>المستوى</Label>
              <Input
                value={formData.level}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                id="allow_posting"
                checked={formData.allow_posting}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allow_posting: checked }))}
              />
              <Label htmlFor="allow_posting">قابل للترحيل</Label>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">نشط</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditing ? 'تحديث' : 'إنشاء'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};