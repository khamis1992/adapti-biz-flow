import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { AccountLedgerChart } from '@/components/accounting/AccountLedgerChart';
import { AccountTransactionHistory } from '@/components/accounting/AccountTransactionHistory';
import { AccountBalanceSummary } from '@/components/accounting/AccountBalanceSummary';
import { useTenant } from '@/hooks/useTenant';
import { useToast } from '@/hooks/use-toast';

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
}

interface LedgerEntry {
  id: string;
  entry_date: string;
  description: string;
  reference: string;
  debit_amount: number;
  credit_amount: number;
  running_balance: number;
  journal_entry_number: string;
}

export default function AccountLedger() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const { toast } = useToast();
  
  const [account, setAccount] = useState<Account | null>(null);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [transactionType, setTransactionType] = useState<string>('all');

  useEffect(() => {
    if (accountId && tenant) {
      fetchAccountDetails();
      fetchLedgerEntries();
    }
  }, [accountId, tenant, dateRange, transactionType]);

  const fetchAccountDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('id', accountId)
        .eq('tenant_id', tenant!.id)
        .single();

      if (error) throw error;
      setAccount(data);
    } catch (error) {
      console.error('Error fetching account details:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الحساب",
        variant: "destructive",
      });
    }
  };

  const fetchLedgerEntries = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('journal_entry_lines')
        .select(`
          id,
          debit_amount,
          credit_amount,
          description,
          journal_entries!inner(
            id,
            entry_date,
            description,
            reference,
            entry_number
          )
        `)
        .eq('account_id', accountId)
        .eq('journal_entries.tenant_id', tenant!.id)
        .order('journal_entries(entry_date)', { ascending: false });

      // Apply date filter if set
      if (dateRange?.from) {
        query = query.gte('journal_entries.entry_date', dateRange.from.toISOString().split('T')[0]);
      }
      if (dateRange?.to) {
        query = query.lte('journal_entries.entry_date', dateRange.to.toISOString().split('T')[0]);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Process entries and calculate running balance
      let runningBalance = 0;
      const processedEntries: LedgerEntry[] = data.map((entry: any) => {
        const netAmount = entry.debit_amount - entry.credit_amount;
        
        // Adjust balance based on account type
        if (account?.account_type === 'assets' || account?.account_type === 'expenses') {
          runningBalance += netAmount;
        } else {
          runningBalance -= netAmount;
        }

        return {
          id: entry.id,
          entry_date: entry.journal_entries.entry_date,
          description: entry.description || entry.journal_entries.description,
          reference: entry.journal_entries.reference || '',
          debit_amount: entry.debit_amount,
          credit_amount: entry.credit_amount,
          running_balance: runningBalance,
          journal_entry_number: entry.journal_entries.entry_number,
        };
      }).reverse(); // Reverse to show chronological order

      setLedgerEntries(processedEntries);
    } catch (error) {
      console.error('Error fetching ledger entries:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل حركات الحساب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = ledgerEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = transactionType === 'all' ||
                       (transactionType === 'debit' && entry.debit_amount > 0) ||
                       (transactionType === 'credit' && entry.credit_amount > 0);
    
    return matchesSearch && matchesType;
  });

  const exportToCSV = () => {
    const headers = ['التاريخ', 'البيان', 'المرجع', 'مدين', 'دائن', 'الرصيد الجاري'];
    const csvData = [
      headers.join(','),
      ...filteredEntries.map(entry => [
        entry.entry_date,
        `"${entry.description}"`,
        `"${entry.reference}"`,
        entry.debit_amount.toFixed(3),
        entry.credit_amount.toFixed(3),
        entry.running_balance.toFixed(3)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `account_ledger_${account?.account_code}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!account) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">جاري التحميل...</h2>
            <p className="text-muted-foreground">يتم تحميل بيانات الحساب</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/accounting')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للحسابات
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {account.account_code} - {account.account_name_ar}
            </h1>
            <p className="text-muted-foreground">{account.account_name_en}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            تصدير CSV
          </Button>
        </div>
      </div>

      {/* Account Balance Summary */}
      <AccountBalanceSummary 
        account={account} 
        entries={filteredEntries}
        dateRange={dateRange}
      />

      {/* Balance Chart */}
      <AccountLedgerChart 
        entries={filteredEntries}
        accountType={account.account_type}
      />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            عوامل التصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">البحث</label>
              <Input
                placeholder="البحث في البيان أو المرجع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">نوع الحركة</label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحركات</SelectItem>
                  <SelectItem value="debit">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      مدين فقط
                    </div>
                  </SelectItem>
                  <SelectItem value="credit">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      دائن فقط
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <AccountTransactionHistory 
        entries={filteredEntries}
        loading={loading}
        accountType={account.account_type}
      />
    </div>
  );
}