import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Building2, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Account {
  id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: string;
  level: number;
  balance: number;
  allow_posting: boolean;
  is_active: boolean;
  parent_account_id?: string;
  created_at: string;
  updated_at: string;
}

interface AccountDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
}

interface JournalEntry {
  id: string;
  entry_date: string;
  description: string;
  debit_amount: number;
  credit_amount: number;
  reference: string;
}

export const AccountDetails = ({ open, onOpenChange, account }: AccountDetailsProps) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [parentAccount, setParentAccount] = useState<Account | null>(null);
  const [childAccounts, setChildAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account && open) {
      fetchAccountDetails();
    }
  }, [account, open]);

  const fetchAccountDetails = async () => {
    if (!account) return;
    
    setIsLoading(true);
    try {
      // Fetch journal entries
      const { data: entries, error: entriesError } = await supabase
        .from('journal_entry_lines')
        .select(`
          id,
          debit_amount,
          credit_amount,
          description,
          journal_entries!inner(
            entry_date,
            description,
            reference
          )
        `)
        .eq('account_id', account.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (entriesError) throw entriesError;

      const formattedEntries = entries?.map(entry => ({
        id: entry.id,
        entry_date: entry.journal_entries.entry_date,
        description: entry.description || entry.journal_entries.description,
        debit_amount: entry.debit_amount || 0,
        credit_amount: entry.credit_amount || 0,
        reference: entry.journal_entries.reference || ''
      })) || [];

      setJournalEntries(formattedEntries);

      // Fetch parent account
      if (account.parent_account_id) {
        const { data: parent, error: parentError } = await supabase
          .from('accounts')
          .select('*')
          .eq('id', account.parent_account_id)
          .single();

        if (parentError) throw parentError;
        setParentAccount(parent);
      }

      // Fetch child accounts
      const { data: children, error: childrenError } = await supabase
        .from('accounts')
        .select('*')
        .eq('parent_account_id', account.id)
        .order('account_code');

      if (childrenError) throw childrenError;
      setChildAccounts(children || []);

    } catch (error) {
      console.error('Error fetching account details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeLabel = (type: string) => {
    const labels = {
      assets: 'أصول',
      liabilities: 'خصوم',
      equity: 'حقوق ملكية',
      revenue: 'إيرادات',
      expenses: 'مصروفات'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getAccountTypeColor = (type: string) => {
    const colors = {
      assets: 'bg-blue-100 text-blue-800',
      liabilities: 'bg-red-100 text-red-800',
      equity: 'bg-green-100 text-green-800',
      revenue: 'bg-purple-100 text-purple-800',
      expenses: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(balance);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-KW');
  };

  if (!account) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 space-x-reverse">
            <span>{account.account_name_ar}</span>
            <Badge className={getAccountTypeColor(account.account_type)}>
              {getAccountTypeLabel(account.account_type)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {account.account_code} - {account.account_name_en}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                معلومات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">رمز الحساب</p>
                  <p className="font-mono font-medium">{account.account_code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المستوى</p>
                  <p className="font-medium">{account.level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
                  <p className="font-medium text-lg">{formatBalance(account.balance)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <div className="flex space-x-2 space-x-reverse">
                    {account.is_active ? (
                      <Badge variant="default">نشط</Badge>
                    ) : (
                      <Badge variant="secondary">غير نشط</Badge>
                    )}
                    {account.allow_posting && (
                      <Badge variant="outline">قابل للترحيل</Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">تاريخ الإنشاء</p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(account.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">آخر تحديث</p>
                  <p className="flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    {formatDate(account.updated_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent Account */}
          {parentAccount && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الحساب الأب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{parentAccount.account_name_ar}</p>
                    <p className="text-sm text-muted-foreground">
                      {parentAccount.account_code} - {parentAccount.account_name_en}
                    </p>
                  </div>
                  <Badge className={getAccountTypeColor(parentAccount.account_type)}>
                    {getAccountTypeLabel(parentAccount.account_type)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Child Accounts */}
          {childAccounts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الحسابات الفرعية ({childAccounts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {childAccounts.map((child) => (
                    <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{child.account_name_ar}</p>
                        <p className="text-sm text-muted-foreground">
                          {child.account_code} - {child.account_name_en}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{formatBalance(child.balance)}</p>
                        {child.allow_posting && (
                          <Badge variant="outline" className="text-xs">قابل للترحيل</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Journal Entries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">آخر القيود المحاسبية</CardTitle>
              <CardDescription>
                آخر 10 قيود محاسبية لهذا الحساب
              </CardDescription>
            </CardHeader>
            <CardContent>
              {journalEntries.length > 0 ? (
                <div className="space-y-3">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{entry.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(entry.entry_date)}
                          {entry.reference && ` • ${entry.reference}`}
                        </p>
                      </div>
                      <div className="text-left space-y-1">
                        {entry.debit_amount > 0 && (
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span className="font-medium">
                              {formatBalance(entry.debit_amount)} مدين
                            </span>
                          </div>
                        )}
                        {entry.credit_amount > 0 && (
                          <div className="flex items-center text-red-600">
                            <TrendingDown className="w-4 h-4 mr-1" />
                            <span className="font-medium">
                              {formatBalance(entry.credit_amount)} دائن
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد قيود محاسبية لهذا الحساب</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};