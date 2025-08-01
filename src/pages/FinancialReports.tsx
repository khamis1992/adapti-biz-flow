import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  TrendingUp, 
  BarChart3,
  PieChart,
  Download,
  Calendar,
  DollarSign,
  Users,
  Car,
  FileText,
  Building2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FinancialReports = () => {
  const [reportPeriod, setReportPeriod] = useState('current-month');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock financial data
  const mockData = {
    revenue: {
      current: 24500.750,
      previous: 21200.500,
      change: 15.6
    },
    expenses: {
      current: 12300.250,
      previous: 11800.100,
      change: 4.2
    },
    profit: {
      current: 12200.500,
      previous: 9400.400,
      change: 29.8
    },
    customers: {
      active: 156,
      new: 23,
      returning: 133
    },
    vehicles: {
      total: 68,
      rented: 45,
      available: 23,
      maintenance: 5
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل التقارير المالية...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة
              </Button>
              <TrendingUp className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">التقارير المالية</h1>
                <p className="text-sm text-muted-foreground">تحليلات وتقارير شاملة للأداء المالي</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="current-week">هذا الأسبوع</SelectItem>
                  <SelectItem value="current-month">هذا الشهر</SelectItem>
                  <SelectItem value="current-quarter">هذا الربع</SelectItem>
                  <SelectItem value="current-year">هذا العام</SelectItem>
                  <SelectItem value="custom">فترة مخصصة</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                تصدير التقارير
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="income-statement" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              قائمة الدخل
            </TabsTrigger>
            <TabsTrigger value="balance-sheet" className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              المركز المالي
            </TabsTrigger>
            <TabsTrigger value="cash-flow" className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              التدفق النقدي
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <PieChart className="w-4 h-4 mr-2" />
              التحليلات
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockData.revenue.current)}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {mockData.revenue.change > 0 ? (
                      <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={mockData.revenue.change > 0 ? 'text-green-500' : 'text-red-500'}>
                      {formatPercentage(mockData.revenue.change)}
                    </span>
                    <span className="mr-1">من الشهر السابق</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockData.expenses.current)}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <ArrowUp className="w-3 h-3 text-red-500 mr-1" />
                    <span className="text-red-500">
                      {formatPercentage(mockData.expenses.change)}
                    </span>
                    <span className="mr-1">من الشهر السابق</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">صافي الربح</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(mockData.profit.current)}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500">
                      {formatPercentage(mockData.profit.change)}
                    </span>
                    <span className="mr-1">من الشهر السابق</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الإيرادات والمصروفات</CardTitle>
                  <CardDescription>مقارنة شهرية للأداء المالي</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>رسم بياني للإيرادات والمصروفات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توزيع الإيرادات</CardTitle>
                  <CardDescription>تحليل مصادر الإيرادات المختلفة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 mx-auto mb-2" />
                      <p>رسم دائري لتوزيع الإيرادات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات العملاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">العملاء النشطون</span>
                      <span className="font-medium">{mockData.customers.active}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">عملاء جدد</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {mockData.customers.new}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">عملاء عائدون</span>
                      <span className="font-medium">{mockData.customers.returning}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>حالة الأسطول</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">إجمالي المركبات</span>
                      <span className="font-medium">{mockData.vehicles.total}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">مؤجرة حالياً</span>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        {mockData.vehicles.rented}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">متاحة للإيجار</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {mockData.vehicles.available}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">في الصيانة</span>
                      <Badge variant="default" className="bg-orange-100 text-orange-800">
                        {mockData.vehicles.maintenance}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Income Statement */}
          <TabsContent value="income-statement">
            <Card>
              <CardHeader>
                <CardTitle>قائمة الدخل</CardTitle>
                <CardDescription>تفصيل الإيرادات والمصروفات والأرباح</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Revenue Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-green-600">الإيرادات</h3>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span>إيرادات الإيجار اليومي</span>
                        <span className="font-medium">{formatCurrency(18500.500)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>إيرادات الإيجار الشهري</span>
                        <span className="font-medium">{formatCurrency(5200.250)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>إيرادات أخرى</span>
                        <span className="font-medium">{formatCurrency(800.000)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>إجمالي الإيرادات</span>
                        <span className="text-green-600">{formatCurrency(24500.750)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expenses Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-red-600">المصروفات</h3>
                    <div className="space-y-2 pl-4">
                      <div className="flex justify-between">
                        <span>مصروفات الصيانة</span>
                        <span className="font-medium">{formatCurrency(4500.100)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الرواتب والأجور</span>
                        <span className="font-medium">{formatCurrency(3200.000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>مصروفات الوقود</span>
                        <span className="font-medium">{formatCurrency(2100.150)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>مصروفات إدارية</span>
                        <span className="font-medium">{formatCurrency(1800.000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الإهلاك</span>
                        <span className="font-medium">{formatCurrency(700.000)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>إجمالي المصروفات</span>
                        <span className="text-red-600">{formatCurrency(12300.250)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Net Income */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>صافي الربح</span>
                      <span className="text-green-600">{formatCurrency(12200.500)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Balance Sheet */}
          <TabsContent value="balance-sheet">
            <Card>
              <CardHeader>
                <CardTitle>قائمة المركز المالي</CardTitle>
                <CardDescription>الأصول والخصوم وحقوق الملكية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">سيتم عرض قائمة المركز المالي هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cash Flow */}
          <TabsContent value="cash-flow">
            <Card>
              <CardHeader>
                <CardTitle>قائمة التدفقات النقدية</CardTitle>
                <CardDescription>التدفقات النقدية من الأنشطة التشغيلية والاستثمارية والتمويلية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">سيتم عرض قائمة التدفقات النقدية هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل الربحية</CardTitle>
                  <CardDescription>هوامش الربح والعائد على الاستثمار</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل العملاء</CardTitle>
                  <CardDescription>قيمة العميل الدائم ومعدل الاحتفاظ</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">كفاءة الأسطول</CardTitle>
                  <CardDescription>معدل الإشغال والإيرادات لكل مركبة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">التنبؤ المالي</CardTitle>
                  <CardDescription>توقعات الإيرادات والتدفقات النقدية</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل التكاليف</CardTitle>
                  <CardDescription>تحليل مراكز التكلفة والمصروفات</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">مقارنة السوق</CardTitle>
                  <CardDescription>الأداء مقارنة بمتوسطات الصناعة</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinancialReports;