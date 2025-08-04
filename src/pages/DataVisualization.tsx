import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter
} from 'recharts';
import { 
  TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, 
  Download, Filter, Settings, RefreshCw, Eye, Share2,
  Calendar, Users, DollarSign, ShoppingCart, Target, Zap
} from 'lucide-react';

const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Sample data for different chart types
  const salesData = [
    { month: 'يناير', sales: 45000, profit: 12000, orders: 320 },
    { month: 'فبراير', sales: 52000, profit: 15000, orders: 380 },
    { month: 'مارس', sales: 48000, profit: 13500, orders: 350 },
    { month: 'أبريل', sales: 61000, profit: 18000, orders: 420 },
    { month: 'مايو', sales: 55000, profit: 16500, orders: 390 },
    { month: 'يونيو', sales: 67000, profit: 20000, orders: 480 },
  ];

  const categoryData = [
    { name: 'الإلكترونيات', value: 35, count: 1247 },
    { name: 'الملابس', value: 25, count: 892 },
    { name: 'المنزل والحديقة', value: 20, count: 651 },
    { name: 'الرياضة', value: 12, count: 423 },
    { name: 'أخرى', value: 8, count: 287 },
  ];

  const performanceData = [
    { subject: 'المبيعات', A: 120, B: 110, fullMark: 150 },
    { subject: 'التسويق', A: 98, B: 130, fullMark: 150 },
    { subject: 'خدمة العملاء', A: 86, B: 130, fullMark: 150 },
    { subject: 'الجودة', A: 99, B: 100, fullMark: 150 },
    { subject: 'الابتكار', A: 85, B: 90, fullMark: 150 },
    { subject: 'الكفاءة', A: 65, B: 85, fullMark: 150 },
  ];

  const customerData = [
    { segment: 'VIP', satisfaction: 95, retention: 98, value: 450000 },
    { segment: 'متميز', satisfaction: 88, retention: 92, value: 280000 },
    { segment: 'عادي', satisfaction: 82, retention: 85, value: 180000 },
    { segment: 'جديد', satisfaction: 75, retention: 70, value: 95000 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  const stats = [
    {
      title: 'إجمالي الإيرادات',
      value: '1.25M ريال',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'المبيعات الشهرية',
      value: '67,000 ريال',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'عدد العملاء',
      value: '8,250',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'معدل التحويل',
      value: '4.8%',
      change: '+0.5%',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} من الشهر الماضي
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">اتجاه المبيعات</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} name="المبيعات" />
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} name="الربح" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">توزيع الفئات</h3>
            <PieChartIcon className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      {/* Sales Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">أداء المبيعات الشهري</h3>
          <div className="flex items-center space-x-2 space-x-reverse">
            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>آخر 6 أشهر</option>
              <option>آخر سنة</option>
              <option>مخصص</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" name="المبيعات" />
            <Area type="monotone" dataKey="profit" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="الربح" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sales by Category */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">المبيعات حسب الفئة</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" name="عدد المبيعات" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      {/* Customer Segments */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">تحليل شرائح العملاء</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={customerData}>
            <CartesianGrid />
            <XAxis dataKey="satisfaction" name="الرضا" unit="%" />
            <YAxis dataKey="retention" name="الاحتفاظ" unit="%" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="العملاء" data={customerData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Radar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مؤشرات الأداء الرئيسية</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={performanceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="الأداء الحالي" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="الهدف" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Builder */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">منشئ التقارير المخصصة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقرير</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>تقرير المبيعات</option>
              <option>تقرير العملاء</option>
              <option>تقرير المخزون</option>
              <option>تقرير مالي</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الفترة الزمنية</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>آخر شهر</option>
              <option>آخر 3 أشهر</option>
              <option>آخر 6 أشهر</option>
              <option>آخر سنة</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق التصدير</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
              <option>PowerPoint</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Eye className="h-4 w-4 ml-2" />
            معاينة التقرير
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
            <Share2 className="h-4 w-4 ml-2" />
            مشاركة
          </button>
        </div>
      </div>

      {/* Saved Reports */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">التقارير المحفوظة</h3>
        <div className="space-y-3">
          {[
            { name: 'تقرير المبيعات الشهري', date: '2025-08-01', type: 'PDF', size: '2.4 MB' },
            { name: 'تحليل العملاء Q2', date: '2025-07-15', type: 'Excel', size: '1.8 MB' },
            { name: 'تقرير المخزون الأسبوعي', date: '2025-08-03', type: 'CSV', size: '0.9 MB' },
            { name: 'التقرير المالي السنوي', date: '2025-07-31', type: 'PDF', size: '5.2 MB' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-500">{report.date} • {report.type} • {report.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="h-4 w-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Activity },
    { id: 'sales', name: 'المبيعات', icon: TrendingUp },
    { id: 'customers', name: 'العملاء', icon: Users },
    { id: 'reports', name: 'التقارير', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">تصور البيانات والتحليلات</h1>
              <p className="text-gray-600 mt-2">لوحات معلومات تفاعلية وتحليلات متقدمة</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="quarter">هذا الربع</option>
                <option value="year">هذه السنة</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث البيانات
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 ml-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'sales' && renderSales()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'reports' && renderReports()}
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;

