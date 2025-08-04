import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Share, 
  Mail, 
  MessageSquare, 
  Search, 
  Globe, 
  Smartphone, 
  Monitor, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity, 
  Zap, 
  Star, 
  Heart, 
  ThumbsUp, 
  Send, 
  Calendar, 
  Clock, 
  Filter, 
  PlusCircle, 
  MoreHorizontal, 
  Settings, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  ArrowUp, 
  ArrowDown, 
  Percent, 
  Hash, 
  AtSign, 
  Tag, 
  Bookmark, 
  Link, 
  Image, 
  Video, 
  FileText, 
  Mic, 
  Camera, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  FullScreen, 
  ExitFullScreen 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart, 
  Area, 
  Pie, 
  Cell, 
  Line, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const campaignsData = [
  { id: 1, name: 'حملة الصيف 2024', type: 'إعلانات جوجل', status: 'نشطة', budget: 5000, spent: 3200, impressions: 125000, clicks: 8500, conversions: 340, ctr: 6.8, cpc: 0.38, roas: 4.2 },
  { id: 2, name: 'إعلانات فيسبوك - منتجات جديدة', type: 'إعلانات فيسبوك', status: 'نشطة', budget: 3000, spent: 2800, impressions: 89000, clicks: 5600, conversions: 280, ctr: 6.3, cpc: 0.50, roas: 3.8 },
  { id: 3, name: 'حملة البريد الإلكتروني', type: 'بريد إلكتروني', status: 'مكتملة', budget: 1000, spent: 950, impressions: 45000, clicks: 3200, conversions: 160, ctr: 7.1, cpc: 0.30, roas: 5.1 },
  { id: 4, name: 'تحسين محركات البحث', type: 'SEO', status: 'نشطة', budget: 2000, spent: 1200, impressions: 67000, clicks: 4200, conversions: 210, ctr: 6.3, cpc: 0.29, roas: 6.2 },
  { id: 5, name: 'إعلانات إنستجرام', type: 'إعلانات إنستجرام', status: 'متوقفة', budget: 1500, spent: 1500, impressions: 34000, clicks: 2100, conversions: 95, ctr: 6.2, cpc: 0.71, roas: 2.8 },
];

const channelPerformanceData = [
  { name: 'إعلانات جوجل', impressions: 125000, clicks: 8500, conversions: 340, spend: 3200 },
  { name: 'إعلانات فيسبوك', impressions: 89000, clicks: 5600, conversions: 280, spend: 2800 },
  { name: 'بريد إلكتروني', impressions: 45000, clicks: 3200, conversions: 160, spend: 950 },
  { name: 'SEO', impressions: 67000, clicks: 4200, conversions: 210, spend: 1200 },
  { name: 'إعلانات إنستجرام', impressions: 34000, clicks: 2100, conversions: 95, spend: 1500 },
];

const monthlyPerformanceData = [
  { name: 'يناير', impressions: 280000, clicks: 18500, conversions: 920, spend: 8200 },
  { name: 'فبراير', impressions: 320000, clicks: 21200, conversions: 1050, spend: 9100 },
  { name: 'مارس', impressions: 350000, clicks: 23800, conversions: 1180, spend: 9800 },
  { name: 'أبريل', impressions: 380000, clicks: 25600, conversions: 1280, spend: 10500 },
  { name: 'مايو', impressions: 420000, clicks: 28200, conversions: 1420, spend: 11200 },
  { name: 'يونيو', impressions: 360000, clicks: 24100, conversions: 1285, spend: 9650 },
];

const audienceData = [
  { subject: 'العمر 18-24', A: 120, B: 110, fullMark: 150 },
  { subject: 'العمر 25-34', A: 98, B: 130, fullMark: 150 },
  { subject: 'العمر 35-44', A: 86, B: 130, fullMark: 150 },
  { subject: 'العمر 45-54', A: 99, B: 100, fullMark: 150 },
  { subject: 'العمر 55+', A: 85, B: 90, fullMark: 150 },
];

const devicePerformanceData = [
  { name: 'الهاتف المحمول', value: 65 },
  { name: 'سطح المكتب', value: 25 },
  { name: 'الجهاز اللوحي', value: 10 },
];

const DigitalMarketing = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الانطباعات</p>
                <p className="text-2xl font-bold text-blue-600">360K</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +14.2% عن الشهر الماضي
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">النقرات</p>
                <p className="text-2xl font-bold text-green-600">24,100</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8.7% عن الشهر الماضي
                </p>
              </div>
              <MousePointer className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التحويلات</p>
                <p className="text-2xl font-bold text-purple-600">1,285</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +12.3% عن الشهر الماضي
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل النقر (CTR)</p>
                <p className="text-2xl font-bold text-orange-600">6.7%</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +0.3% عن الشهر الماضي
                </p>
              </div>
              <Percent className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء القنوات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={channelPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversions" fill="#8884d8" name="التحويلات" />
                <Line type="monotone" dataKey="clicks" stroke="#ff7300" name="النقرات" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الأجهزة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={devicePerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {devicePerformanceData.map((entry, index) => (
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

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            الأداء الشهري
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="impressions" fill="#8884d8" stroke="#8884d8" name="الانطباعات" />
              <Bar dataKey="clicks" fill="#82ca9d" name="النقرات" />
              <Line type="monotone" dataKey="conversions" stroke="#ff7300" name="التحويلات" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderCampaigns = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>الحملات التسويقية</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              إنشاء حملة جديدة
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الحملة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الميزانية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنفق</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignsData.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={campaign.status === 'نشطة' ? 'default' : campaign.status === 'مكتملة' ? 'secondary' : 'destructive'}
                      className={`${
                        campaign.status === 'نشطة' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'مكتملة' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${campaign.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${campaign.spent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.ctr}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.roas}x</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Audience Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            تحليل الجمهور
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={audienceData}>
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

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط CPC</p>
                <p className="text-2xl font-bold text-blue-600">$0.42</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> -5.2% عن الشهر الماضي
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط ROAS</p>
                <p className="text-2xl font-bold text-green-600">4.4x</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8.1% عن الشهر الماضي
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التحويل</p>
                <p className="text-2xl font-bold text-purple-600">5.3%</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +1.2% عن الشهر الماضي
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-blue-600" />
            التسويق الرقمي
          </h1>
          <p className="text-gray-600 mt-2">إدارة وتحسين حملاتك التسويقية الرقمية لتحقيق أفضل النتائج</p>
        </div>
        <div className="flex gap-2">
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="campaigns">الحملات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="campaigns">
          {renderCampaigns()}
        </TabsContent>

        <TabsContent value="analytics">
          {renderAnalytics()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DigitalMarketing;

