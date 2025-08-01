import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Calendar, Download, Filter, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface TrialBalanceItem {
  account_id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: 'assets' | 'liabilities' | 'equity' | 'revenue' | 'expenses';
  level: number;
  opening_balance: number;
  debit_movements: number;
  credit_movements: number;
  closing_balance: number;
}

interface TrialBalanceProps {
  onViewAccountDetails?: (accountId: string) => void;
}

const TrialBalance: React.FC<TrialBalanceProps> = ({ onViewAccountDetails }) => {
  const [data, setData] = useState<TrialBalanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), 0, 1));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all');

  const fetchTrialBalance = async () => {
    try {
      setLoading(true);
      
      // Get user's tenant_id
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      const { data: userData } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

      if (!userData?.tenant_id) throw new Error('لم يتم العثور على بيانات المستأجر');

      // Get accounts data and calculate movements
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select(`
          id,
          account_code,
          account_name_ar,
          account_name_en,
          account_type,
          level,
          balance
        `)
        .eq('tenant_id', userData.tenant_id)
        .eq('allow_posting', true)
        .order('account_code');

      if (accountsError) throw accountsError;

      // Get journal entry movements for the period
      const { data: journalMovements, error: movementsError } = await supabase
        .from('journal_entry_lines')
        .select(`
          account_id,
          debit_amount,
          credit_amount,
          journal_entries!inner(
            entry_date,
            tenant_id
          )
        `)
        .gte('journal_entries.entry_date', format(fromDate, 'yyyy-MM-dd'))
        .lte('journal_entries.entry_date', format(toDate, 'yyyy-MM-dd'))
        .eq('journal_entries.tenant_id', userData.tenant_id);

      if (movementsError) throw movementsError;

      // Transform data to trial balance format
      const transformedData: TrialBalanceItem[] = (accountsData || []).map(account => {
        // Calculate movements for this account in the period
        const accountMovements = (journalMovements || []).filter(
          movement => movement.account_id === account.id
        );

        const debitMovements = accountMovements.reduce(
          (sum, movement) => sum + (movement.debit_amount || 0), 0
        );
        const creditMovements = accountMovements.reduce(
          (sum, movement) => sum + (movement.credit_amount || 0), 0
        );

        const openingBalance = account.balance || 0;
        
        // Calculate closing balance based on account type
        let closingBalance = openingBalance;
        if (account.account_type === 'assets' || account.account_type === 'expenses') {
          closingBalance = openingBalance + debitMovements - creditMovements;
        } else {
          closingBalance = openingBalance - debitMovements + creditMovements;
        }

        return {
          account_id: account.id,
          account_code: account.account_code,
          account_name_ar: account.account_name_ar,
          account_name_en: account.account_name_en,
          account_type: account.account_type as 'assets' | 'liabilities' | 'equity' | 'revenue' | 'expenses',
          level: account.level,
          opening_balance: openingBalance,
          debit_movements: debitMovements,
          credit_movements: creditMovements,
          closing_balance: closingBalance
        };
      });

      // Filter by account type if specified
      const filteredData = accountTypeFilter === 'all' 
        ? transformedData 
        : transformedData.filter(item => item.account_type === accountTypeFilter);

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching trial balance:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل ميزان المراجعة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrialBalance();
  }, [fromDate, toDate, accountTypeFilter]);

  const filteredData = data.filter(item =>
    item.account_name_ar.includes(searchTerm) ||
    item.account_name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.account_code.includes(searchTerm)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount);
  };

  const getAccountTypeLabel = (type: string) => {
    const labels = {
      assets: 'الأصول',
      liabilities: 'الخصوم',
      equity: 'حقوق الملكية',
      revenue: 'الإيرادات',
      expenses: 'المصروفات'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getAccountTypeColor = (type: string) => {
    const colors = {
      assets: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      liabilities: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      equity: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      revenue: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      expenses: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Calculate totals
  const totals = filteredData.reduce((acc, item) => {
    const absOpeningBalance = Math.abs(item.opening_balance);
    const absClosingBalance = Math.abs(item.closing_balance);
    
    if (item.account_type === 'assets' || item.account_type === 'expenses') {
      // Debit accounts
      if (item.opening_balance >= 0) {
        acc.totalOpeningDebits += absOpeningBalance;
      } else {
        acc.totalOpeningCredits += absOpeningBalance;
      }
      
      if (item.closing_balance >= 0) {
        acc.totalClosingDebits += absClosingBalance;
      } else {
        acc.totalClosingCredits += absClosingBalance;
      }
    } else {
      // Credit accounts (liabilities, equity, revenue)
      if (item.opening_balance >= 0) {
        acc.totalOpeningCredits += absOpeningBalance;
      } else {
        acc.totalOpeningDebits += absOpeningBalance;
      }
      
      if (item.closing_balance >= 0) {
        acc.totalClosingCredits += absClosingBalance;
      } else {
        acc.totalClosingDebits += absClosingBalance;
      }
    }

    acc.totalDebitMovements += item.debit_movements;
    acc.totalCreditMovements += item.credit_movements;
    
    return acc;
  }, {
    totalOpeningDebits: 0,
    totalOpeningCredits: 0,
    totalDebitMovements: 0,
    totalCreditMovements: 0,
    totalClosingDebits: 0,
    totalClosingCredits: 0
  });

  const isBalanced = totals.totalClosingDebits === totals.totalClosingCredits;

  const exportToCSV = () => {
    const headers = ['رقم الحساب', 'اسم الحساب', 'نوع الحساب', 'الرصيد الافتتاحي', 'حركة مدين', 'حركة دائن', 'الرصيد الختامي'];
    const csvData = [
      headers.join(','),
      ...filteredData.map(item => [
        item.account_code,
        `"${item.account_name_ar}"`,
        getAccountTypeLabel(item.account_type),
        item.opening_balance,
        item.debit_movements,
        item.credit_movements,
        item.closing_balance
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `trial-balance-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">ميزان المراجعة</h2>
          <p className="text-muted-foreground">
            عرض الأرصدة الافتتاحية والحركات والأرصدة الختامية للحسابات
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 ml-2" />
            تصدير CSV
          </Button>
        </div>
      </div>

      {/* Date and Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* From Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">من تاريخ</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="ml-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* To Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">إلى تاريخ</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="ml-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Account Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع الحساب</label>
              <Select value={accountTypeFilter} onValueChange={setAccountTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الأنواع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="assets">الأصول</SelectItem>
                  <SelectItem value="liabilities">الخصوم</SelectItem>
                  <SelectItem value="equity">حقوق الملكية</SelectItem>
                  <SelectItem value="revenue">الإيرادات</SelectItem>
                  <SelectItem value="expenses">المصروفات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">البحث</label>
              <Input
                placeholder="ابحث في الحسابات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الحركات المدينة</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totals.totalDebitMovements)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الحركات الدائنة</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totals.totalCreditMovements)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حالة التوازن</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={isBalanced ? "default" : "destructive"} className="text-sm">
              {isBalanced ? "متوازن" : "غير متوازن"}
            </Badge>
            {!isBalanced && (
              <div className="text-xs text-muted-foreground mt-1">
                الفرق: {formatCurrency(Math.abs(totals.totalClosingDebits - totals.totalClosingCredits))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trial Balance Table */}
      <Card>
        <CardHeader>
          <CardTitle>ميزان المراجعة التفصيلي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم الحساب</TableHead>
                  <TableHead className="text-right">اسم الحساب</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">الرصيد الافتتاحي</TableHead>
                  <TableHead className="text-right">حركة مدين</TableHead>
                  <TableHead className="text-right">حركة دائن</TableHead>
                  <TableHead className="text-right">الرصيد الختامي</TableHead>
                  <TableHead className="text-right">العمليات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.account_id}>
                    <TableCell className="font-mono">{item.account_code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.account_name_ar}</div>
                        <div className="text-sm text-muted-foreground">{item.account_name_en}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAccountTypeColor(item.account_type)}>
                        {getAccountTypeLabel(item.account_type)}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right ${item.opening_balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(item.opening_balance))}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      {item.debit_movements > 0 ? formatCurrency(item.debit_movements) : '-'}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {item.credit_movements > 0 ? formatCurrency(item.credit_movements) : '-'}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${item.closing_balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(item.closing_balance))}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewAccountDetails?.(item.account_id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Totals Row */}
                <TableRow className="bg-muted font-bold">
                  <TableCell colSpan={3} className="text-right">الإجمالي</TableCell>
                  <TableCell className="text-right">
                    مدين: {formatCurrency(totals.totalOpeningDebits)}<br/>
                    دائن: {formatCurrency(totals.totalOpeningCredits)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatCurrency(totals.totalDebitMovements)}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    {formatCurrency(totals.totalCreditMovements)}
                  </TableCell>
                  <TableCell className="text-right">
                    مدين: {formatCurrency(totals.totalClosingDebits)}<br/>
                    دائن: {formatCurrency(totals.totalClosingCredits)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد بيانات لعرضها في الفترة المحددة
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialBalance;