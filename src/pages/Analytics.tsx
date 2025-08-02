import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  DollarSign,
  Users,
  Car,
  FileText,
  Target,
  Activity
} from 'lucide-react';
import { AdvancedCharts } from '@/components/analytics/AdvancedCharts';

const Analytics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Key Performance Indicators
  const kpis = [
    {
      title: 'إجمالي الإيرادات',
      value: '125,450',
      unit: 'د.ك',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      title: 'معدل نمو العملاء',
      value: '8.3%',
      unit: 'شهرياً',
      change: '+2.1%',
      trend: 'up',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'معدل استخدام الأسطول',
      value: '87%',
      unit: 'من الطاقة',
      change: '+5.2%',
      trend: 'up',
      icon: <Car className="h-6 w-6" />
    },
    {
      title: 'متوسط قيمة العقد',
      value: '285',
      unit: 'د.ك',
      change: '-1.8%',
      trend: 'down',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'معدل تحقيق الأهداف',
      value: '94%',
      unit: 'من الهدف',
      change: '+3.7%',
      trend: 'up',
      icon: <Target className="h-6 w-6" />
    },
    {
      title: 'رضا العملاء',
      value: '4.6',
      unit: 'من 5',
      change: '+0.2',
      trend: 'up',
      icon: <Activity className="h-6 w-6" />
    }
  ];

  const reports = [
    {
      title: 'تقرير الإيرادات الشهرية',
      description: 'تحليل مفصل للإيرادات والنمو الشهري',
      lastUpdated: '2024-01-22',
      status: 'ready',
      type: 'financial'
    },
    {
      title: 'تقرير أداء الأسطول',
      description: 'إحصائيات استخدام المركبات والصيانة',
      lastUpdated: '2024-01-22',
      status: 'ready',
      type: 'fleet'
    },
    {
      title: 'تحليل سلوك العملاء',
      description: 'أنماط الاستخدام وتفضيلات العملاء',
      lastUpdated: '2024-01-21',
      status: 'processing',
      type: 'customer'
    },
    {
      title: 'تقرير الربحية',
      description: 'تحليل الربحية حسب نوع الخدمة والعميل',
      lastUpdated: '2024-01-21',
      status: 'ready',
      type: 'financial'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">جاهز</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المعالجة</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="h-4 w-4" />;
      case 'fleet':
        return <Car className="h-4 w-4" />;
      case 'customer':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
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
              <BarChart3 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">التحليلات والتقارير</h1>
                <p className="text-sm text-muted-foreground">لوحة تحكم شاملة للبيانات والإحصائيات</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                فلترة
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                الفترة الزمنية
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              الرسوم البيانية
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="kpis" className="flex items-center">
              <Target className="w-4 h-4 mr-2" />
              مؤشرات الأداء
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kpis.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {kpi.icon}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{kpi.title}</p>
                          <div className="flex items-baseline space-x-1 space-x-reverse">
                            <span className="text-2xl font-bold">{kpi.value}</span>
                            <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Summary */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>ملخص الأداء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">الإيرادات هذا الشهر</span>
                      <span className="text-green-600 font-bold">19,500 د.ك</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">عدد العقود النشطة</span>
                      <span className="text-blue-600 font-bold">63 عقد</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">معدل الاستخدام</span>
                      <span className="text-purple-600 font-bold">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>التنبيهات والتوصيات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <p className="font-medium text-green-800">أداء ممتاز</p>
                      <p className="text-sm text-green-600">تم تجاوز الهدف الشهري بنسبة 3%</p>
                    </div>
                    <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                      <p className="font-medium text-yellow-800">تحسين مطلوب</p>
                      <p className="text-sm text-yellow-600">انخفاض في متوسط قيمة العقد</p>
                    </div>
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <p className="font-medium text-blue-800">فرصة نمو</p>
                      <p className="text-sm text-blue-600">زيادة الطلب على السيارات الفاخرة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts">
            <AdvancedCharts />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-4">
              {reports.map((report, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getTypeIcon(report.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{report.title}</h3>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            آخر تحديث: {new Date(report.lastUpdated).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {getStatusBadge(report.status)}
                        {report.status === 'ready' && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            تحميل
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* KPIs Tab */}
          <TabsContent value="kpis" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {kpis.map((kpi, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {kpi.icon}
                            <span className="font-medium">{kpi.title}</span>
                          </div>
                          <Badge variant={kpi.trend === 'up' ? 'default' : 'destructive'}>
                            {kpi.change}
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold mb-1">
                          {kpi.value} <span className="text-lg text-muted-foreground">{kpi.unit}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              kpi.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, parseInt(kpi.value))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;

