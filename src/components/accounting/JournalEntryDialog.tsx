import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id?: string;
  entry_number: string;
  entry_date: string;
  description: string;
  reference?: string;
  cost_center_id: string;
  total_amount: number;
  lines: JournalEntryLine[];
}

interface JournalEntryLine {
  id?: string;
  account_id: string;
  description?: string;
  debit_amount: number;
  credit_amount: number;
}

interface Account {
  id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: string;
  allow_posting: boolean;
}

interface CostCenter {
  id: string;
  code: string;
  name_ar: string;
  name_en: string;
}

interface JournalEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  journalEntry?: JournalEntry | null;
  onSuccess: () => void;
}

export const JournalEntryDialog = ({ open, onOpenChange, journalEntry, onSuccess }: JournalEntryDialogProps) => {
  const [formData, setFormData] = useState<JournalEntry>({
    entry_number: '',
    entry_date: new Date().toISOString().split('T')[0],
    description: '',
    reference: '',
    cost_center_id: '',
    total_amount: 0,
    lines: [
      { account_id: '', description: '', debit_amount: 0, credit_amount: 0 },
      { account_id: '', description: '', debit_amount: 0, credit_amount: 0 }
    ]
  });
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [costCenters, setCostCenters] = useState<CostCenter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchAccounts();
      fetchCostCenters();
      generateEntryNumber();
      
      if (journalEntry) {
        setFormData(journalEntry);
      } else {
        // Reset form for new entry
        setFormData({
          entry_number: '',
          entry_date: new Date().toISOString().split('T')[0],
          description: '',
          reference: '',
          cost_center_id: '',
          total_amount: 0,
          lines: [
            { account_id: '', description: '', debit_amount: 0, credit_amount: 0 },
            { account_id: '', description: '', debit_amount: 0, credit_amount: 0 }
          ]
        });
        generateEntryNumber();
      }
    }
  }, [open, journalEntry]);

  useEffect(() => {
    calculateTotalAmount();
  }, [formData.lines]);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('id, account_code, account_name_ar, account_name_en, account_type, allow_posting')
        .eq('allow_posting', true)
        .eq('is_active', true)
        .order('account_code');

      if (error) throw error;
      setAccounts(data || []);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل الحسابات',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const fetchCostCenters = async () => {
    try {
      const { data, error } = await supabase
        .from('cost_centers')
        .select('id, code, name_ar, name_en')
        .eq('is_active', true)
        .order('code');

      if (error) throw error;
      setCostCenters(data || []);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل مراكز التكلفة',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const generateEntryNumber = async () => {
    if (journalEntry) return; // Don't generate new number for existing entries
    
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const prefix = `JE${year}${month}`;

      const { data, error } = await supabase
        .from('journal_entries')
        .select('entry_number')
        .like('entry_number', `${prefix}%`)
        .order('entry_number', { ascending: false })
        .limit(1);

      if (error) throw error;

      let nextNumber = 1;
      if (data && data.length > 0) {
        const lastNumber = data[0].entry_number.substring(prefix.length);
        nextNumber = parseInt(lastNumber) + 1;
      }

      const newEntryNumber = `${prefix}${String(nextNumber).padStart(4, '0')}`;
      setFormData(prev => ({ ...prev, entry_number: newEntryNumber }));
    } catch (error: any) {
      console.error('Error generating entry number:', error);
    }
  };

  const calculateTotalAmount = () => {
    const totalDebits = formData.lines.reduce((sum, line) => sum + (line.debit_amount || 0), 0);
    setFormData(prev => ({ ...prev, total_amount: totalDebits }));
  };

  const addLine = () => {
    setFormData(prev => ({
      ...prev,
      lines: [...prev.lines, { account_id: '', description: '', debit_amount: 0, credit_amount: 0 }]
    }));
  };

  const removeLine = (index: number) => {
    if (formData.lines.length <= 2) return; // Keep at least 2 lines
    
    setFormData(prev => ({
      ...prev,
      lines: prev.lines.filter((_, i) => i !== index)
    }));
  };

  const updateLine = (index: number, field: keyof JournalEntryLine, value: any) => {
    setFormData(prev => ({
      ...prev,
      lines: prev.lines.map((line, i) => 
        i === index ? { ...line, [field]: value } : line
      )
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.entry_number) {
      newErrors.entry_number = 'رقم القيد مطلوب';
    }

    if (!formData.entry_date) {
      newErrors.entry_date = 'تاريخ القيد مطلوب';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف القيد مطلوب';
    }

    if (!formData.cost_center_id) {
      newErrors.cost_center_id = 'مركز التكلفة مطلوب';
    }

    // Validate lines
    const validLines = formData.lines.filter(line => 
      line.account_id && (line.debit_amount > 0 || line.credit_amount > 0)
    );

    if (validLines.length < 2) {
      newErrors.lines = 'يجب أن يحتوي القيد على صفين على الأقل';
    }

    // Check if debits equal credits
    const totalDebits = formData.lines.reduce((sum, line) => sum + (line.debit_amount || 0), 0);
    const totalCredits = formData.lines.reduce((sum, line) => sum + (line.credit_amount || 0), 0);

    if (Math.abs(totalDebits - totalCredits) > 0.001) {
      newErrors.balance = 'إجمالي المدين يجب أن يساوي إجمالي الدائن';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Get current user for tenant_id
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get user's tenant_id
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      // Prepare journal entry data
      const journalEntryData = {
        entry_number: formData.entry_number,
        entry_date: formData.entry_date,
        description: formData.description,
        reference: formData.reference || null,
        cost_center_id: formData.cost_center_id,
        total_amount: formData.total_amount,
        tenant_id: userData.tenant_id,
        created_by: user.id
      };

      let journalEntryId: string;

      if (journalEntry?.id) {
        // Update existing entry
        const { error } = await supabase
          .from('journal_entries')
          .update(journalEntryData)
          .eq('id', journalEntry.id);

        if (error) throw error;
        journalEntryId = journalEntry.id;

        // Delete existing lines
        await supabase
          .from('journal_entry_lines')
          .delete()
          .eq('journal_entry_id', journalEntry.id);
      } else {
        // Create new entry
        const { data, error } = await supabase
          .from('journal_entries')
          .insert(journalEntryData)
          .select()
          .single();

        if (error) throw error;
        journalEntryId = data.id;
      }

      // Insert lines
      const validLines = formData.lines.filter(line => 
        line.account_id && (line.debit_amount > 0 || line.credit_amount > 0)
      );

      const linesData = validLines.map(line => ({
        journal_entry_id: journalEntryId,
        account_id: line.account_id,
        description: line.description || null,
        debit_amount: line.debit_amount || 0,
        credit_amount: line.credit_amount || 0
      }));

      const { error: linesError } = await supabase
        .from('journal_entry_lines')
        .insert(linesData);

      if (linesError) throw linesError;

      toast({
        title: journalEntry ? 'تم تحديث القيد بنجاح' : 'تم إنشاء القيد بنجاح',
        description: `رقم القيد: ${formData.entry_number}`
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'خطأ في حفظ القيد',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountLabel = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? `${account.account_code} - ${account.account_name_ar}` : '';
  };

  const totalDebits = formData.lines.reduce((sum, line) => sum + (line.debit_amount || 0), 0);
  const totalCredits = formData.lines.reduce((sum, line) => sum + (line.credit_amount || 0), 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.001;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {journalEntry ? 'تعديل القيد المحاسبي' : 'قيد محاسبي جديد'}
          </DialogTitle>
          <DialogDescription>
            {journalEntry ? 'قم بتعديل بيانات القيد المحاسبي' : 'قم بإدخال بيانات القيد المحاسبي الجديد'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="entry_number">رقم القيد</Label>
                  <Input
                    id="entry_number"
                    value={formData.entry_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, entry_number: e.target.value }))}
                    disabled={!!journalEntry}
                    className={errors.entry_number ? 'border-red-500' : ''}
                  />
                  {errors.entry_number && (
                    <p className="text-sm text-red-500 mt-1">{errors.entry_number}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="entry_date">التاريخ</Label>
                  <Input
                    id="entry_date"
                    type="date"
                    value={formData.entry_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, entry_date: e.target.value }))}
                    className={errors.entry_date ? 'border-red-500' : ''}
                  />
                  {errors.entry_date && (
                    <p className="text-sm text-red-500 mt-1">{errors.entry_date}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cost_center">مركز التكلفة</Label>
                  <Select
                    value={formData.cost_center_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, cost_center_id: value }))}
                  >
                    <SelectTrigger className={errors.cost_center_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="اختر مركز التكلفة" />
                    </SelectTrigger>
                    <SelectContent>
                      {costCenters.map((center) => (
                        <SelectItem key={center.id} value={center.id}>
                          {center.code} - {center.name_ar}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cost_center_id && (
                    <p className="text-sm text-red-500 mt-1">{errors.cost_center_id}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="وصف القيد المحاسبي..."
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                )}
              </div>
              <div>
                <Label htmlFor="reference">المرجع (اختياري)</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                  placeholder="رقم الفاتورة، رقم الشيك، إلخ..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Journal Entry Lines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>بنود القيد</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Badge variant={isBalanced ? "default" : "destructive"}>
                    {isBalanced ? 'متوازن' : 'غير متوازن'}
                  </Badge>
                  <Button onClick={addLine} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة بند
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {errors.lines && (
                <p className="text-sm text-red-500 mb-4">{errors.lines}</p>
              )}
              {errors.balance && (
                <p className="text-sm text-red-500 mb-4">{errors.balance}</p>
              )}
              
              <div className="space-y-4">
                {formData.lines.map((line, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end p-4 border rounded-lg">
                    <div className="col-span-4">
                      <Label>الحساب</Label>
                      <Select
                        value={line.account_id}
                        onValueChange={(value) => updateLine(index, 'account_id', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="اختر الحساب" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.account_code} - {account.account_name_ar}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Label>الوصف</Label>
                      <Input
                        value={line.description || ''}
                        onChange={(e) => updateLine(index, 'description', e.target.value)}
                        placeholder="وصف البند..."
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>مدين</Label>
                      <Input
                        type="number"
                        step="0.001"
                        min="0"
                        value={line.debit_amount || ''}
                        onChange={(e) => updateLine(index, 'debit_amount', parseFloat(e.target.value) || 0)}
                        placeholder="0.000"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>دائن</Label>
                      <Input
                        type="number"
                        step="0.001"
                        min="0"
                        value={line.credit_amount || ''}
                        onChange={(e) => updateLine(index, 'credit_amount', parseFloat(e.target.value) || 0)}
                        placeholder="0.000"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLine(index)}
                        disabled={formData.lines.length <= 2}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي المدين</p>
                    <p className="text-lg font-bold text-blue-600">
                      {new Intl.NumberFormat('ar-KW', { style: 'currency', currency: 'KWD' }).format(totalDebits)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي الدائن</p>
                    <p className="text-lg font-bold text-green-600">
                      {new Intl.NumberFormat('ar-KW', { style: 'currency', currency: 'KWD' }).format(totalCredits)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الفرق</p>
                    <p className={`text-lg font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                      {new Intl.NumberFormat('ar-KW', { style: 'currency', currency: 'KWD' }).format(Math.abs(totalDebits - totalCredits))}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !isBalanced}>
            {isLoading ? 'جاري الحفظ...' : journalEntry ? 'تحديث' : 'حفظ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};