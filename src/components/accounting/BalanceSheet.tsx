import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Loader2 } from "lucide-react";
import { format, startOfYear } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BalanceSheetItem {
  account_id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: 'assets' | 'liabilities' | 'equity';
  level: number;
  closing_balance: number;
}

interface BalanceSheetProps {
  onViewAccountDetails?: (accountId: string) => void;
}

export function BalanceSheet({ onViewAccountDetails }: BalanceSheetProps) {
  const [data, setData] = useState<BalanceSheetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [asOfDate, setAsOfDate] = useState<Date>(new Date());

  const fetchBalanceSheet = async () => {
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

      // Get accounts and calculate balances up to the selected date
      const { data: accounts, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .eq('tenant_id', userData.tenant_id)
        .eq('allow_posting', true)
        .in('account_type', ['assets', 'liabilities', 'equity'])
        .order('account_code');

      if (accountsError) {
        console.error('Error fetching accounts:', accountsError);
        toast.error('خطأ في جلب بيانات الحسابات');
        return;
      }

      // Get journal entry movements up to the selected date
      const { data: movements, error: movementsError } = await supabase
        .from('journal_entry_lines')
        .select(`
          account_id,
          debit_amount,
          credit_amount,
          journal_entries!inner(
            tenant_id,
            entry_date
          )
        `)
        .eq('journal_entries.tenant_id', userData.tenant_id)
        .lte('journal_entries.entry_date', format(asOfDate, 'yyyy-MM-dd'));

      if (movementsError) {
        console.error('Error fetching movements:', movementsError);
        toast.error('خطأ في جلب بيانات الحركات');
        return;
      }

      // Calculate closing balances
      const balanceSheetData = (accounts || []).map((account: any) => {
        const accountMovements = (movements || []).filter((m: any) => m.account_id === account.id);
        
        let totalDebits = 0;
        let totalCredits = 0;
        
        accountMovements.forEach((movement: any) => {
          totalDebits += parseFloat(movement.debit_amount || 0);
          totalCredits += parseFloat(movement.credit_amount || 0);
        });

        // Calculate closing balance based on account type
        let closingBalance = 0;
        if (account.account_type === 'assets') {
          closingBalance = totalDebits - totalCredits;
        } else {
          closingBalance = totalCredits - totalDebits;
        }

        return {
          account_id: account.id,
          account_code: account.account_code,
          account_name_ar: account.account_name_ar,
          account_name_en: account.account_name_en,
          account_type: account.account_type,
          level: account.level,
          closing_balance: closingBalance
        };
      }).filter(item => Math.abs(item.closing_balance) > 0.001); // Only show accounts with balances

      setData(balanceSheetData);
    } catch (error) {
      console.error('Error:', error);
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceSheet();
  }, [asOfDate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(Math.abs(amount));
  };

  const getAccountTypeLabel = (type: string) => {
    const labels = {
      assets: 'الأصول',
      liabilities: 'الخصوم',
      equity: 'حقوق الملكية'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getAccountTypeColor = (type: string) => {
    const colors = {
      assets: 'text-blue-600 bg-blue-50',
      liabilities: 'text-red-600 bg-red-50',
      equity: 'text-green-600 bg-green-50'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  // Group data by account type
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.account_type]) {
      acc[item.account_type] = [];
    }
    acc[item.account_type].push(item);
    return acc;
  }, {} as Record<string, BalanceSheetItem[]>);

  // Calculate totals
  const totals = {
    assets: data.filter(item => item.account_type === 'assets').reduce((sum, item) => sum + item.closing_balance, 0),
    liabilities: data.filter(item => item.account_type === 'liabilities').reduce((sum, item) => sum + item.closing_balance, 0),
    equity: data.filter(item => item.account_type === 'equity').reduce((sum, item) => sum + item.closing_balance, 0)
  };

  const isBalanced = Math.abs(totals.assets - (totals.liabilities + totals.equity)) < 0.001;

  const exportToCSV = () => {
    const csvContent = [
      ['كود الحساب', 'اسم الحساب', 'نوع الحساب', 'الرصيد'].join(','),
      ...data.map(item => [
        item.account_code,
        item.account_name_ar,
        getAccountTypeLabel(item.account_type),
        item.closing_balance.toFixed(3)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `balance-sheet-${format(asOfDate, 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin ml-2" />
        جاري تحميل قائمة المركز المالي...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">قائمة المركز المالي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2">
              <Label>كما في تاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !asOfDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {asOfDate ? format(asOfDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={asOfDate}
                    onSelect={(date) => date && setAsOfDate(date)}
                    initialFocus
                    className="pointer-events-auto"
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
            <CardTitle className="text-sm font-medium text-blue-600">إجمالي الأصول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.assets)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">إجمالي الخصوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.liabilities)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">حقوق الملكية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.equity)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">حالة التوازن</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-sm font-medium ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
              {isBalanced ? '✓ متوازنة' : '✗ غير متوازنة'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">الأصول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(groupedData.assets || []).map((item) => (
                <div 
                  key={item.account_id}
                  className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer"
                  onClick={() => onViewAccountDetails?.(item.account_id)}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-sm font-medium">
                      {item.account_code}
                    </span>
                    <span className="text-sm">
                      {item.account_name_ar}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrency(item.closing_balance)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between items-center font-bold">
                <span>إجمالي الأصول</span>
                <span>{formatCurrency(totals.assets)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liabilities and Equity */}
        <div className="space-y-6">
          {/* Liabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">الخصوم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(groupedData.liabilities || []).map((item) => (
                  <div 
                    key={item.account_id}
                    className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer"
                    onClick={() => onViewAccountDetails?.(item.account_id)}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-sm font-medium">
                        {item.account_code}
                      </span>
                      <span className="text-sm">
                        {item.account_name_ar}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(item.closing_balance)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between items-center font-bold">
                  <span>إجمالي الخصوم</span>
                  <span>{formatCurrency(totals.liabilities)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">حقوق الملكية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(groupedData.equity || []).map((item) => (
                  <div 
                    key={item.account_id}
                    className="flex justify-between items-center p-2 rounded hover:bg-muted/50 cursor-pointer"
                    onClick={() => onViewAccountDetails?.(item.account_id)}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-sm font-medium">
                        {item.account_code}
                      </span>
                      <span className="text-sm">
                        {item.account_name_ar}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(item.closing_balance)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between items-center font-bold">
                  <span>إجمالي حقوق الملكية</span>
                  <span>{formatCurrency(totals.equity)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Liabilities + Equity */}
          <Card className="border-primary">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>إجمالي الخصوم وحقوق الملكية</span>
                <span>{formatCurrency(totals.liabilities + totals.equity)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}