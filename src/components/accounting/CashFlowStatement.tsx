import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { format, startOfYear, endOfYear } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CashFlowItem {
  account_id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: 'assets' | 'liabilities' | 'equity' | 'revenue' | 'expenses';
  amount: number;
  category: 'operating' | 'investing' | 'financing';
}

interface CashFlowData {
  operating: {
    inflows: CashFlowItem[];
    outflows: CashFlowItem[];
    net: number;
  };
  investing: {
    inflows: CashFlowItem[];
    outflows: CashFlowItem[];
    net: number;
  };
  financing: {
    inflows: CashFlowItem[];
    outflows: CashFlowItem[];
    net: number;
  };
  netCashFlow: number;
  beginningCash: number;
  endingCash: number;
}

interface CashFlowStatementProps {
  onViewAccountDetails?: (accountId: string) => void;
}

export function CashFlowStatement({ onViewAccountDetails }: CashFlowStatementProps) {
  const [data, setData] = useState<CashFlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState<Date>(startOfYear(new Date()));
  const [toDate, setToDate] = useState<Date>(new Date());

  const fetchCashFlowStatement = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('يجب تسجيل الدخول أولاً');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

      if (!userData?.tenant_id) {
        toast.error('معرف المؤسسة غير موجود');
        return;
      }

      // Get all accounts
      const { data: accounts, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .eq('tenant_id', userData.tenant_id)
        .eq('allow_posting', true)
        .order('account_code');

      if (accountsError) {
        console.error('Error fetching accounts:', accountsError);
        toast.error('خطأ في جلب بيانات الحسابات');
        return;
      }

      // Get journal entry movements for the period
      const { data: movements, error: movementsError } = await supabase
        .from('journal_entry_lines')
        .select(`
          account_id,
          debit_amount,
          credit_amount,
          journal_entries!inner(
            tenant_id,
            entry_date,
            description
          )
        `)
        .eq('journal_entries.tenant_id', userData.tenant_id)
        .gte('journal_entries.entry_date', format(fromDate, 'yyyy-MM-dd'))
        .lte('journal_entries.entry_date', format(toDate, 'yyyy-MM-dd'));

      if (movementsError) {
        console.error('Error fetching movements:', movementsError);
        toast.error('خطأ في جلب بيانات الحركات');
        return;
      }

      // Calculate cash flows
      const cashFlowData = calculateCashFlows(accounts || [], movements || []);
      setData(cashFlowData);

    } catch (error) {
      console.error('Error:', error);
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const calculateCashFlows = (accounts: any[], movements: any[]): CashFlowData => {
    // Initialize cash flow structure
    const cashFlow: CashFlowData = {
      operating: { inflows: [], outflows: [], net: 0 },
      investing: { inflows: [], outflows: [], net: 0 },
      financing: { inflows: [], outflows: [], net: 0 },
      netCashFlow: 0,
      beginningCash: 0,
      endingCash: 0
    };

    // Calculate movements by account
    const accountMovements = movements.reduce((acc: any, movement: any) => {
      if (!acc[movement.account_id]) {
        acc[movement.account_id] = { debits: 0, credits: 0 };
      }
      acc[movement.account_id].debits += parseFloat(movement.debit_amount || 0);
      acc[movement.account_id].credits += parseFloat(movement.credit_amount || 0);
      return acc;
    }, {});

    // Process each account and categorize cash flows
    accounts.forEach(account => {
      const accountMovement = accountMovements[account.id];
      if (!accountMovement) return;

      const netMovement = accountMovement.debits - accountMovement.credits;
      if (Math.abs(netMovement) < 0.001) return; // Skip if no significant movement

      const cashFlowItem: CashFlowItem = {
        account_id: account.id,
        account_code: account.account_code,
        account_name_ar: account.account_name_ar,
        account_name_en: account.account_name_en,
        account_type: account.account_type,
        amount: netMovement,
        category: categorizeCashFlow(account)
      };

      // Categorize and add to appropriate section
      const category = cashFlow[cashFlowItem.category];
      
      if (shouldBeInflow(account, netMovement)) {
        category.inflows.push(cashFlowItem);
      } else {
        category.outflows.push({ ...cashFlowItem, amount: Math.abs(netMovement) });
      }
    });

    // Calculate net cash flows for each category
    cashFlow.operating.net = calculateNetFlow(cashFlow.operating);
    cashFlow.investing.net = calculateNetFlow(cashFlow.investing);
    cashFlow.financing.net = calculateNetFlow(cashFlow.financing);

    // Calculate total net cash flow
    cashFlow.netCashFlow = cashFlow.operating.net + cashFlow.investing.net + cashFlow.financing.net;

    // For beginning and ending cash, we'll use cash accounts
    const cashAccounts = accounts.filter(acc => 
      acc.account_code.startsWith('1111') || acc.account_code.startsWith('1112')
    );
    
    cashFlow.beginningCash = 0; // Should be calculated from beginning of period
    cashFlow.endingCash = cashFlow.beginningCash + cashFlow.netCashFlow;

    return cashFlow;
  };

  const categorizeCashFlow = (account: any): 'operating' | 'investing' | 'financing' => {
    const code = account.account_code;
    
    // Operating activities - revenue, expenses, current assets/liabilities
    if (account.account_type === 'revenue' || account.account_type === 'expenses') {
      return 'operating';
    }
    
    // Cash and bank accounts movements (except for investments)
    if (code.startsWith('111')) {
      return 'operating';
    }
    
    // Customer and supplier accounts
    if (code.startsWith('112') || code.startsWith('211')) {
      return 'operating';
    }
    
    // Investing activities - fixed assets, investments
    if (code.startsWith('12') || code.includes('استثمار')) {
      return 'investing';
    }
    
    // Financing activities - capital, loans, equity
    if (account.account_type === 'equity' || code.includes('قرض') || code.includes('رأس المال')) {
      return 'financing';
    }
    
    // Default to operating
    return 'operating';
  };

  const shouldBeInflow = (account: any, netMovement: number): boolean => {
    // Revenue accounts: credit increases are inflows
    if (account.account_type === 'revenue') {
      return netMovement < 0; // Credit movement
    }
    
    // Expense accounts: debit increases are outflows
    if (account.account_type === 'expenses') {
      return false; // Always outflow
    }
    
    // Asset accounts: debit increases are typically outflows (cash going out)
    if (account.account_type === 'assets') {
      return netMovement < 0; // Credit movement (decrease in asset = cash in)
    }
    
    // Liability accounts: credit increases are inflows
    if (account.account_type === 'liabilities') {
      return netMovement < 0; // Credit movement
    }
    
    // Equity accounts: credit increases are inflows
    if (account.account_type === 'equity') {
      return netMovement < 0; // Credit movement
    }
    
    return netMovement > 0;
  };

  const calculateNetFlow = (category: { inflows: CashFlowItem[]; outflows: CashFlowItem[] }) => {
    const totalInflows = category.inflows.reduce((sum, item) => sum + Math.abs(item.amount), 0);
    const totalOutflows = category.outflows.reduce((sum, item) => sum + item.amount, 0);
    return totalInflows - totalOutflows;
  };

  useEffect(() => {
    fetchCashFlowStatement();
  }, [fromDate, toDate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(Math.abs(amount));
  };

  const exportToCSV = () => {
    if (!data) return;

    const csvContent = [
      ['قائمة التدفقات النقدية'],
      [`من ${format(fromDate, 'yyyy-MM-dd')} إلى ${format(toDate, 'yyyy-MM-dd')}`],
      [''],
      ['الأنشطة التشغيلية'],
      ['التدفقات الداخلة:'],
      ...data.operating.inflows.map(item => [item.account_code, item.account_name_ar, formatCurrency(item.amount)]),
      ['التدفقات الخارجة:'],
      ...data.operating.outflows.map(item => [item.account_code, item.account_name_ar, `-${formatCurrency(item.amount)}`]),
      ['', 'صافي التدفق من الأنشطة التشغيلية', formatCurrency(data.operating.net)],
      [''],
      ['الأنشطة الاستثمارية'],
      ['التدفقات الداخلة:'],
      ...data.investing.inflows.map(item => [item.account_code, item.account_name_ar, formatCurrency(item.amount)]),
      ['التدفقات الخارجة:'],
      ...data.investing.outflows.map(item => [item.account_code, item.account_name_ar, `-${formatCurrency(item.amount)}`]),
      ['', 'صافي التدفق من الأنشطة الاستثمارية', formatCurrency(data.investing.net)],
      [''],
      ['الأنشطة التمويلية'],
      ['التدفقات الداخلة:'],
      ...data.financing.inflows.map(item => [item.account_code, item.account_name_ar, formatCurrency(item.amount)]),
      ['التدفقات الخارجة:'],
      ...data.financing.outflows.map(item => [item.account_code, item.account_name_ar, `-${formatCurrency(item.amount)}`]),
      ['', 'صافي التدفق من الأنشطة التمويلية', formatCurrency(data.financing.net)],
      [''],
      ['', 'صافي التدفق النقدي', formatCurrency(data.netCashFlow)],
      ['', 'النقدية في بداية الفترة', formatCurrency(data.beginningCash)],
      ['', 'النقدية في نهاية الفترة', formatCurrency(data.endingCash)]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `cash-flow-statement-${format(fromDate, 'yyyy-MM-dd')}-${format(toDate, 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin ml-2" />
        جاري تحميل قائمة التدفقات النقدية...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">لا توجد بيانات متاحة للفترة المحددة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">قائمة التدفقات النقدية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2">
              <Label>من تاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={(date) => date && setFromDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>إلى تاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(date) => date && setToDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button onClick={exportToCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              تصدير CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">الأنشطة التشغيلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(data.operating.net)}</div>
              {data.operating.net >= 0 ? 
                <TrendingUp className="w-5 h-5 text-green-500" /> : 
                <TrendingDown className="w-5 h-5 text-red-500" />
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">الأنشطة الاستثمارية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(data.investing.net)}</div>
              {data.investing.net >= 0 ? 
                <TrendingUp className="w-5 h-5 text-green-500" /> : 
                <TrendingDown className="w-5 h-5 text-red-500" />
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">الأنشطة التمويلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(data.financing.net)}</div>
              {data.financing.net >= 0 ? 
                <TrendingUp className="w-5 h-5 text-green-500" /> : 
                <TrendingDown className="w-5 h-5 text-red-500" />
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">صافي التدفق النقدي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-2xl font-bold ${data.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(data.netCashFlow)}
              </div>
              {data.netCashFlow >= 0 ? 
                <TrendingUp className="w-5 h-5 text-green-500" /> : 
                <TrendingDown className="w-5 h-5 text-red-500" />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operating Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">الأنشطة التشغيلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.operating.inflows.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-600 mb-2">التدفقات الداخلة</h4>
                  <div className="space-y-1">
                    {data.operating.inflows.map((item) => (
                      <div 
                        key={item.account_id}
                        className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer text-sm"
                        onClick={() => onViewAccountDetails?.(item.account_id)}
                      >
                        <span>{item.account_name_ar}</span>
                        <span className="text-green-600">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.operating.outflows.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2">التدفقات الخارجة</h4>
                  <div className="space-y-1">
                    {data.operating.outflows.map((item) => (
                      <div 
                        key={item.account_id}
                        className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer text-sm"
                        onClick={() => onViewAccountDetails?.(item.account_id)}
                      >
                        <span>{item.account_name_ar}</span>
                        <span className="text-red-600">({formatCurrency(item.amount)})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-2 flex justify-between items-center font-bold">
                <span>صافي التدفق</span>
                <span className={data.operating.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data.operating.net)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investing Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">الأنشطة الاستثمارية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.investing.inflows.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-600 mb-2">التدفقات الداخلة</h4>
                  <div className="space-y-1">
                    {data.investing.inflows.map((item) => (
                      <div 
                        key={item.account_id}
                        className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer text-sm"
                        onClick={() => onViewAccountDetails?.(item.account_id)}
                      >
                        <span>{item.account_name_ar}</span>
                        <span className="text-green-600">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.investing.outflows.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2">التدفقات الخارجة</h4>
                  <div className="space-y-1">
                    {data.investing.outflows.map((item) => (
                      <div 
                        key={item.account_id}
                        className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer text-sm"
                        onClick={() => onViewAccountDetails?.(item.account_id)}
                      >
                        <span>{item.account_name_ar}</span>
                        <span className="text-red-600">({formatCurrency(item.amount)})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-2 flex justify-between items-center font-bold">
                <span>صافي التدفق</span>
                <span className={data.investing.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data.investing.net)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financing Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">الأنشطة التمويلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.financing.inflows.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-600 mb-2">التدفقات الداخلة</h4>
                  <div className="space-y-1">
                    {data.financing.inflows.map((item) => (
                      <div 
                        key={item.account_id}
                        className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer text-sm"
                        onClick={() => onViewAccountDetails?.(item.account_id)}
                      >
                        <span>{item.account_name_ar}</span>
                        <span className="text-green-600">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.financing.outflows.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2">التدفقات الخارجة</h4>
                  <div className="space-y-1">
                    {data.financing.outflows.map((item) => (
                      <div 
                        key={item.account_id}
                        className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer text-sm"
                        onClick={() => onViewAccountDetails?.(item.account_id)}
                      >
                        <span>{item.account_name_ar}</span>
                        <span className="text-red-600">({formatCurrency(item.amount)})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-2 flex justify-between items-center font-bold">
                <span>صافي التدفق</span>
                <span className={data.financing.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data.financing.net)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Cash Flow Summary */}
      <Card className="border-primary">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">صافي التدفق من الأنشطة التشغيلية</span>
              <span className={data.operating.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(data.operating.net)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">صافي التدفق من الأنشطة الاستثمارية</span>
              <span className={data.investing.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(data.investing.net)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">صافي التدفق من الأنشطة التمويلية</span>
              <span className={data.financing.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(data.financing.net)}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>صافي التدفق النقدي</span>
                <span className={data.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data.netCashFlow)}
                </span>
              </div>
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span>النقدية في بداية الفترة</span>
                <span>{formatCurrency(data.beginningCash)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>النقدية في نهاية الفترة</span>
                <span>{formatCurrency(data.endingCash)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}