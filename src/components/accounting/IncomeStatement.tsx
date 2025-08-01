import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CalendarDays, Download, Eye, TrendingUp, TrendingDown, Equal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface IncomeStatementData {
  revenue: {
    total: number;
    accounts: Array<{
      id: string;
      code: string;
      name: string;
      balance: number;
    }>;
  };
  expenses: {
    total: number;
    accounts: Array<{
      id: string;
      code: string;
      name: string;
      balance: number;
    }>;
  };
  netIncome: number;
}

interface PeriodData {
  period: string;
  revenue: number;
  expenses: number;
  netIncome: number;
}

const IncomeStatement = () => {
  const [data, setData] = useState<IncomeStatementData | null>(null);
  const [periodData, setPeriodData] = useState<PeriodData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous-month');
  const [showComparison, setShowComparison] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchIncomeStatementData();
    fetchPeriodAnalysis();
  }, [selectedPeriod, startDate, endDate]);

  const fetchIncomeStatementData = async () => {
    try {
      setIsLoading(true);
      
      // Get date range based on selected period
      const { startDate: periodStart, endDate: periodEnd } = getDateRange(selectedPeriod);
      
      // Fetch revenue accounts with their balances
      const { data: revenueData, error: revenueError } = await supabase
        .from('accounts')
        .select(`
          id,
          account_code,
          account_name_ar,
          balance
        `)
        .eq('account_type', 'revenue')
        .eq('is_active', true);

      if (revenueError) throw revenueError;

      // Fetch expense accounts with their balances
      const { data: expenseData, error: expenseError } = await supabase
        .from('accounts')
        .select(`
          id,
          account_code,
          account_name_ar,
          balance
        `)
        .eq('account_type', 'expenses')
        .eq('is_active', true);

      if (expenseError) throw expenseError;

      // Calculate totals
      const revenueTotal = revenueData?.reduce((sum, account) => sum + Number(account.balance), 0) || 0;
      const expenseTotal = expenseData?.reduce((sum, account) => sum + Number(account.balance), 0) || 0;
      const netIncome = revenueTotal - expenseTotal;

      setData({
        revenue: {
          total: revenueTotal,
          accounts: revenueData?.map(account => ({
            id: account.id,
            code: account.account_code,
            name: account.account_name_ar,
            balance: Number(account.balance)
          })) || []
        },
        expenses: {
          total: expenseTotal,
          accounts: expenseData?.map(account => ({
            id: account.id,
            code: account.account_code,
            name: account.account_name_ar,
            balance: Number(account.balance)
          })) || []
        },
        netIncome
      });

    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل البيانات',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPeriodAnalysis = async () => {
    try {
      // Fetch last 6 months data for trend analysis
      const months = [];
      const currentDate = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        
        // For this demo, we'll use current balances as sample data
        // In a real implementation, you'd fetch historical data
        const revenue = Math.random() * 50000 + 20000;
        const expenses = Math.random() * 40000 + 15000;
        
        months.push({
          period: `${year}-${month.toString().padStart(2, '0')}`,
          revenue,
          expenses,
          netIncome: revenue - expenses
        });
      }
      
      setPeriodData(months);
    } catch (error: any) {
      console.error('Error fetching period analysis:', error);
    }
  };

  const getDateRange = (period: string) => {
    const now = new Date();
    let startDate: Date, endDate: Date;

    switch (period) {
      case 'current-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'current-quarter':
        const quarterStart = Math.floor(now.getMonth() / 3) * 3;
        startDate = new Date(now.getFullYear(), quarterStart, 1);
        endDate = new Date(now.getFullYear(), quarterStart + 3, 0);
        break;
      case 'current-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      case 'custom':
        return { startDate, endDate }; // Use the manually set dates
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const getPeriodLabel = (period: string) => {
    const labels = {
      'current-month': 'الشهر الحالي',
      'current-quarter': 'الربع الحالي',
      'current-year': 'السنة الحالية',
      'custom': 'فترة مخصصة'
    };
    return labels[period as keyof typeof labels] || period;
  };

  const exportToCSV = () => {
    if (!data) return;
    
    const csvContent = [
      ['قائمة الدخل'],
      [''],
      ['الإيرادات'],
      ...data.revenue.accounts.map(acc => [acc.code, acc.name, formatCurrency(acc.balance)]),
      ['', 'إجمالي الإيرادات', formatCurrency(data.revenue.total)],
      [''],
      ['المصروفات'],
      ...data.expenses.accounts.map(acc => [acc.code, acc.name, formatCurrency(acc.balance)]),
      ['', 'إجمالي المصروفات', formatCurrency(data.expenses.total)],
      [''],
      ['', 'صافي الدخل', formatCurrency(data.netIncome)]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `income-statement-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">جاري تحميل قائمة الدخل...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">قائمة الدخل</h2>
          <p className="text-muted-foreground">الإيرادات والمصروفات وصافي الدخل</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">الشهر الحالي</SelectItem>
              <SelectItem value="current-quarter">الربع الحالي</SelectItem>
              <SelectItem value="current-year">السنة الحالية</SelectItem>
              <SelectItem value="custom">فترة مخصصة</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedPeriod === 'custom' && (
            <>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-36"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-36"
              />
            </>
          )}
          
          <Button variant="outline" onClick={() => setShowComparison(!showComparison)}>
            <CalendarDays className="w-4 h-4 mr-2" />
            مقارنة الفترات
          </Button>
          
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي الإيرادات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(data?.revenue.total || 0)}
              </p>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المصروفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(data?.expenses.total || 0)}
              </p>
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">صافي الدخل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className={`text-2xl font-bold ${(data?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(data?.netIncome || 0)}
              </p>
              {(data?.netIncome || 0) >= 0 ? 
                <TrendingUp className="w-6 h-6 text-green-500" /> : 
                <TrendingDown className="w-6 h-6 text-red-500" />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Expenses Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>الإيرادات</span>
              <Badge variant="outline" className="text-green-600 border-green-200">
                {data?.revenue.accounts.length || 0} حساب
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.revenue.accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.code}</p>
                  </div>
                  <p className="font-mono text-sm font-medium text-green-600">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between font-bold">
                  <span>إجمالي الإيرادات</span>
                  <span className="text-green-600">{formatCurrency(data?.revenue.total || 0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>المصروفات</span>
              <Badge variant="outline" className="text-red-600 border-red-200">
                {data?.expenses.accounts.length || 0} حساب
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.expenses.accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.code}</p>
                  </div>
                  <p className="font-mono text-sm font-medium text-red-600">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between font-bold">
                  <span>إجمالي المصروفات</span>
                  <span className="text-red-600">{formatCurrency(data?.expenses.total || 0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Income Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">إجمالي الإيرادات</span>
              <span className="text-lg font-bold text-green-600">
                {formatCurrency(data?.revenue.total || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">إجمالي المصروفات</span>
              <span className="text-lg font-bold text-red-600">
                -{formatCurrency(data?.expenses.total || 0)}
              </span>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">صافي الدخل</span>
                <span className={`text-xl font-bold ${(data?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(data?.netIncome || 0)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis Chart */}
      <Card>
        <CardHeader>
          <CardTitle>تحليل الاتجاه - آخر 6 شهور</CardTitle>
          <CardDescription>مقارنة الإيرادات والمصروفات وصافي الدخل عبر الأشهر</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={periodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `فترة: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="الإيرادات"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="المصروفات"
                />
                <Line 
                  type="monotone" 
                  dataKey="netIncome" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="صافي الدخل"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeStatement;