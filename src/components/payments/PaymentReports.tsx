import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, subYears } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export const PaymentReports = () => {
  const [reportData, setReportData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("monthly");
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()));
  const { tenant } = useTenant();

  const fetchReportData = async () => {
    if (!tenant?.id) return;

    try {
      setLoading(true);
      
      // بيانات تجريبية مؤقتاً
      const payments = [
        { amount: 350, payment_method: 'cash', payment_date: '2024-01-15' },
        { amount: 1200, payment_method: 'bank_transfer', payment_date: '2024-01-20' },
        { amount: 750, payment_method: 'card', payment_date: '2024-01-25' },
      ];

      // معالجة البيانات للتقارير
      const processedData = processPaymentData(payments || []);
      setReportData(processedData);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPaymentData = (payments: any[]) => {
    // إجمالي المدفوعات
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalCount = payments.length;
    
    // المدفوعات حسب الطريقة
    const byMethod = payments.reduce((acc, payment) => {
      acc[payment.payment_method] = (acc[payment.payment_method] || 0) + payment.amount;
      return acc;
    }, {});

    const methodData = Object.entries(byMethod).map(([method, amount]) => ({
      name: getMethodName(method),
      value: amount,
    }));

    // المدفوعات حسب التاريخ (يومي/شهري حسب نوع التقرير)
    const timelineData = [];
    if (reportType === 'daily') {
      // تجميع حسب اليوم
      const byDay = payments.reduce((acc, payment) => {
        const day = format(new Date(payment.payment_date), 'yyyy-MM-dd');
        acc[day] = (acc[day] || 0) + payment.amount;
        return acc;
      }, {});

      Object.entries(byDay).forEach(([date, amount]) => {
        timelineData.push({
          date: format(new Date(date), 'dd/MM', { locale: ar }),
          amount,
        });
      });
    } else {
      // تجميع حسب الشهر
      const byMonth = payments.reduce((acc, payment) => {
        const month = format(new Date(payment.payment_date), 'yyyy-MM');
        acc[month] = (acc[month] || 0) + payment.amount;
        return acc;
      }, {});

      Object.entries(byMonth).forEach(([month, amount]) => {
        timelineData.push({
          date: format(new Date(month + '-01'), 'MMM yyyy', { locale: ar }),
          amount,
        });
      });
    }

    // أفضل العملاء (حسب قيمة المدفوعات) - مؤقتاً
    const topCustomers = [
      { customer: 'عميل 1', amount: 1000 },
      { customer: 'عميل 2', amount: 800 },
      { customer: 'عميل 3', amount: 600 },
    ];

    // مقارنة مع الفترة السابقة
    const previousPeriodStart = reportType === 'monthly' 
      ? subMonths(startDate, 1) 
      : subYears(startDate, 1);
    const previousPeriodEnd = reportType === 'monthly' 
      ? subMonths(endDate, 1) 
      : subYears(endDate, 1);

    return {
      summary: {
        totalAmount,
        totalCount,
        averageAmount: totalCount > 0 ? totalAmount / totalCount : 0,
      },
      methodData,
      timelineData,
      topCustomers,
      previousPeriodStart,
      previousPeriodEnd,
    };
  };

  const getMethodName = (method: string) => {
    const names = {
      cash: "نقدي",
      card: "بطاقة",
      bank_transfer: "تحويل بنكي",
      check: "شيك",
    };
    return names[method as keyof typeof names] || method;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(amount);
  };

  const setQuickPeriod = (period: string) => {
    const now = new Date();
    switch (period) {
      case 'thisMonth':
        setStartDate(startOfMonth(now));
        setEndDate(endOfMonth(now));
        break;
      case 'lastMonth':
        const lastMonth = subMonths(now, 1);
        setStartDate(startOfMonth(lastMonth));
        setEndDate(endOfMonth(lastMonth));
        break;
      case 'thisYear':
        setStartDate(startOfYear(now));
        setEndDate(endOfYear(now));
        break;
      case 'lastYear':
        const lastYear = subYears(now, 1);
        setStartDate(startOfYear(lastYear));
        setEndDate(endOfYear(lastYear));
        break;
    }
  };

  const exportReport = () => {
    // تصدير التقرير
    const reportContent = {
      period: `${format(startDate, 'yyyy/MM/dd')} - ${format(endDate, 'yyyy/MM/dd')}`,
      summary: reportData.summary,
      methodData: reportData.methodData,
      topCustomers: reportData.topCustomers,
    };

    const blob = new Blob([JSON.stringify(reportContent, null, 2)], { 
      type: 'application/json;charset=utf-8;' 
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payment_report_${format(new Date(), 'yyyy-MM-dd')}.json`;
    link.click();
  };

  useEffect(() => {
    fetchReportData();
  }, [tenant?.id, startDate, endDate, reportType]);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* أدوات التحكم */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="نوع التقرير" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">يومي</SelectItem>
              <SelectItem value="monthly">شهري</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setQuickPeriod('thisMonth')}>
              هذا الشهر
            </Button>
            <Button variant="outline" size="sm" onClick={() => setQuickPeriod('lastMonth')}>
              الشهر الماضي
            </Button>
            <Button variant="outline" size="sm" onClick={() => setQuickPeriod('thisYear')}>
              هذا العام
            </Button>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                <CalendarIcon className="ml-2 h-4 w-4" />
                {format(startDate, "yyyy/MM/dd", { locale: ar })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                <CalendarIcon className="ml-2 h-4 w-4" />
                {format(endDate, "yyyy/MM/dd", { locale: ar })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Button onClick={exportReport} variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* ملخص الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المدفوعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(reportData.summary?.totalAmount || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد المدفوعات</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.summary?.totalCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط الدفعة</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(reportData.summary?.averageAmount || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أعلى طريقة دفع</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {reportData.methodData?.[0]?.name || "-"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* خط زمني للمدفوعات */}
        <Card>
          <CardHeader>
            <CardTitle>تطور المدفوعات</CardTitle>
            <CardDescription>المدفوعات عبر الفترة المحددة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.timelineData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'المبلغ']}
                  labelStyle={{ direction: 'rtl' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* طرق الدفع */}
        <Card>
          <CardHeader>
            <CardTitle>طرق الدفع</CardTitle>
            <CardDescription>توزيع المدفوعات حسب طريقة الدفع</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.methodData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(reportData.methodData || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* أفضل العملاء */}
      <Card>
        <CardHeader>
          <CardTitle>أفضل العملاء</CardTitle>
          <CardDescription>العملاء الأكثر دفعاً في الفترة المحددة</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reportData.topCustomers || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="customer" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'إجمالي المدفوعات']}
                labelStyle={{ direction: 'rtl' }}
              />
              <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};