import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Heart, 
  Zap, 
  Filter, 
  Calendar, 
  Download, 
  RefreshCw, 
  Settings, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  ArrowUp, 
  ArrowDown, 
  MoreHorizontal, 
  Share, 
  Star, 
  Award, 
  Target, 
  Activity, 
  Cpu, 
  Database, 
  Server, 
  Network, 
  Cloud, 
  Globe, 
  MapPin, 
  Building, 
  Factory, 
  Store, 
  Warehouse, 
  Truck, 
  Ship, 
  Plane, 
  Car, 
  Train, 
  Package, 
  Box, 
  Layers, 
  Grid, 
  List, 
  Table, 
  Columns, 
  Rows, 
  Layout, 
  Sidebar, 
  PanelLeft, 
  PanelRight, 
  PanelTop, 
  PanelBottom, 
  HelpCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart, 
  Area, 
  PieChart,
  Pie, 
  Cell, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Scatter, 
  ScatterChart 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19AF'];

const salesData = [
  { name: 'يناير', revenue: 4000, profit: 2400, customers: 240 },
  { name: 'فبراير', revenue: 3000, profit: 1398, customers: 221 },
  { name: 'مارس', revenue: 2000, profit: 9800, customers: 229 },
  { name: 'أبريل', revenue: 2780, profit: 3908, customers: 200 },
  { name: 'مايو', revenue: 1890, profit: 4800, customers: 218 },
  { name: 'يونيو', revenue: 2390, profit: 3800, customers: 250 },
  { name: 'يوليو', revenue: 3490, profit: 4300, customers: 210 },
];

const customerSegmentsData = [
  { name: 'عملاء جدد', value: 400 },
  { name: 'عملاء عائدون', value: 300 },
  { name: 'عملاء مخلصون', value: 300 },
  { name: 'عملاء غير نشطين', value: 200 },
];

const marketingPerformanceData = [
  { subject: 'حملات البريد', A: 120, B: 110, fullMark: 150 },
  { subject: 'إعلانات جوجل', A: 98, B: 130, fullMark: 150 },
  { subject: 'إعلانات فيسبوك', A: 86, B: 130, fullMark: 150 },
  { subject: 'التسويق بالمحتوى', A: 99, B: 100, fullMark: 150 },
  { subject: 'تحسين محركات البحث', A: 85, B: 90, fullMark: 150 },
  { subject: 'التسويق المؤثر', A: 65, B: 85, fullMark: 150 },
];

const productPerformanceData = [
  { name: 'منتج أ', revenue: 590, profit: 290, sales: 869 },
  { name: 'منتج ب', revenue: 868, profit: 434, sales: 967 },
  { name: 'منتج ج', revenue: 1397, profit: 698, sales: 1506 },
  { name: 'منتج د', revenue: 1480, profit: 740, sales: 1200 },
  { name: 'منتج هـ', revenue: 1520, profit: 760, sales: 1108 },
  { name: 'منتج و', revenue: 1400, profit: 700, sales: 680 },
];

const cohortData = [
  { month: 'يناير', '1': 100, '2': 80, '3': 60, '4': 40, '5': 20 },
  { month: 'فبراير', '1': 120, '2': 90, '3': 70, '4': 50 },
  { month: 'مارس', '1': 150, '2': 110, '3': 80 },
  { month: 'أبريل', '1': 180, '2': 130 },
  { month: 'مايو', '1': 200 },
];

const funnelData = [
  { name: 'الزيارات', value: 10000 },
  { name: 'العملاء المحتملون', value: 4567 },
  { name: 'العملاء المؤهلون', value: 2034 },
  { name: 'الصفقات', value: 987 },
  { name: 'العملاء', value: 500 },
];

const AdvancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-green-600">$1,250,000</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +12.5% عن الشهر الماضي
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                <p className="text-2xl font-bold text-blue-600">8,250</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8.2% عن الشهر الماضي
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التحويل</p>
                <p className="text-2xl font-bold text-purple-600">4.8%</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +0.5% عن الشهر الماضي
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط قيمة الطلب</p>
                <p className="text-2xl font-bold text-orange-600">$150</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" /> -2.1% عن الشهر الماضي
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            أداء المبيعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="الإيرادات" />
              <Area type="monotone" dataKey="profit" fill="#82ca9d" stroke="#82ca9d" name="الأرباح" />
              <Area type="monotone" dataKey="customers" stroke="#ff7300" name="العملاء" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Segments & Marketing Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              شرائح العملاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegmentsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {customerSegmentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              أداء التسويق
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={marketingPerformanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="الحملة أ" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="الحملة ب" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProductAnalytics = () => (
    <div className="space-y-6">
      {/* Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            أداء المنتجات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={productPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="الإيرادات" />
              <Bar dataKey="profit" fill="#82ca9d" name="الأرباح" />
              <Area type="monotone" dataKey="sales" stroke="#ff7300" name="المبيعات" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            أداء فئات المنتجات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'إلكترونيات', value: 400 },
                  { name: 'ملابس', value: 300 },
                  { name: 'أثاث', value: 300 },
                  { name: 'أدوات منزلية', value: 200 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {[
                  { name: 'إلكترونيات', value: 400 },
                  { name: 'ملابس', value: 300 },
                  { name: 'أثاث', value: 300 },
                  { name: 'أدوات منزلية', value: 200 },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomerAnalytics = () => (
    <div className="space-y-6">
      {/* Cohort Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            تحليل الأفواج (Cohort Analysis)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="1" stackId="1" stroke="#8884d8" fill="#8884d8" name="الشهر 1" />
              <Area type="monotone" dataKey="2" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="الشهر 2" />
              <Area type="monotone" dataKey="3" stackId="1" stroke="#ffc658" fill="#ffc658" name="الشهر 3" />
              <Area type="monotone" dataKey="4" stackId="1" stroke="#ff8042" fill="#ff8042" name="الشهر 4" />
              <Area type="monotone" dataKey="5" stackId="1" stroke="#af19ff" fill="#af19ff" name="الشهر 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sales Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            قمع المبيعات (Sales Funnel)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="العدد" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderMarketingAnalytics = () => (
    <div className="space-y-6">
      {/* Marketing Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            أداء الحملات التسويقية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={marketingPerformanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="الحملة أ" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="الحملة ب" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            أداء القنوات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'البريد الإلكتروني', value: 400 },
                  { name: 'إعلانات جوجل', value: 300 },
                  { name: 'إعلانات فيسبوك', value: 300 },
                  { name: 'تحسين محركات البحث', value: 200 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {[
                  { name: 'البريد الإلكتروني', value: 400 },
                  { name: 'إعلانات جوجل', value: 300 },
                  { name: 'إعلانات فيسبوك', value: 300 },
                  { name: 'تحسين محركات البحث', value: 200 },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            التحليلات المتقدمة
          </h1>
          <p className="text-gray-600 mt-2">نظرة شاملة على أداء أعمالك مع تحليلات ذكية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            فلترة
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            تحديد الفترة
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="products">تحليل المنتجات</TabsTrigger>
          <TabsTrigger value="customers">تحليل العملاء</TabsTrigger>
          <TabsTrigger value="marketing">تحليل التسويق</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="products">
          {renderProductAnalytics()}
        </TabsContent>

        <TabsContent value="customers">
          {renderCustomerAnalytics()}
        </TabsContent>

        <TabsContent value="marketing">
          {renderMarketingAnalytics()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;

