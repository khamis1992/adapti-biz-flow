import React, { useState } from 'react';
import { 
  Smartphone, Download, Users, Star, TrendingUp, Settings,
  Bell, Shield, Zap, Globe, BarChart3, RefreshCw,
  Play, Pause, Eye, Edit, Trash2, Plus, Search,
  Filter, Calendar, DollarSign, Target, Activity
} from 'lucide-react';

const MobileAppManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApp, setSelectedApp] = useState('main');

  // Sample data for mobile apps
  const apps = [
    {
      id: 'main',
      name: 'Adapti Business',
      version: '2.1.4',
      platform: 'iOS & Android',
      downloads: 25420,
      rating: 4.6,
      reviews: 1247,
      status: 'published',
      lastUpdate: '2025-08-01'
    },
    {
      id: 'customer',
      name: 'Adapti Customer',
      version: '1.8.2',
      platform: 'iOS & Android',
      downloads: 18750,
      rating: 4.4,
      reviews: 892,
      status: 'published',
      lastUpdate: '2025-07-28'
    },
    {
      id: 'driver',
      name: 'Adapti Driver',
      version: '1.5.1',
      platform: 'Android',
      downloads: 8420,
      rating: 4.2,
      reviews: 456,
      status: 'beta',
      lastUpdate: '2025-07-25'
    }
  ];

  const stats = [
    {
      title: 'إجمالي التحميلات',
      value: '52,590',
      change: '+18.5%',
      icon: Download,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'المستخدمون النشطون',
      value: '34,250',
      change: '+12.3%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'متوسط التقييم',
      value: '4.5',
      change: '+0.2',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'معدل الاحتفاظ',
      value: '78.2%',
      change: '+5.1%',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const analyticsData = [
    { date: '2025-07-01', downloads: 420, activeUsers: 2850, sessions: 4200 },
    { date: '2025-07-08', downloads: 380, activeUsers: 3100, sessions: 4650 },
    { date: '2025-07-15', downloads: 520, activeUsers: 3350, sessions: 5100 },
    { date: '2025-07-22', downloads: 650, activeUsers: 3600, sessions: 5800 },
    { date: '2025-07-29', downloads: 720, activeUsers: 3850, sessions: 6200 },
    { date: '2025-08-05', downloads: 890, activeUsers: 4100, sessions: 6900 },
  ];

  const features = [
    {
      name: 'إدارة الطلبات',
      status: 'active',
      usage: 85,
      users: 2840,
      description: 'إدارة وتتبع الطلبات من التطبيق'
    },
    {
      name: 'المدفوعات الرقمية',
      status: 'active',
      usage: 72,
      users: 2450,
      description: 'نظام دفع آمن ومتكامل'
    },
    {
      name: 'تتبع GPS',
      status: 'active',
      usage: 68,
      users: 2310,
      description: 'تتبع المركبات والشحنات'
    },
    {
      name: 'الإشعارات الفورية',
      status: 'active',
      usage: 91,
      users: 3100,
      description: 'إشعارات فورية للأحداث المهمة'
    },
    {
      name: 'التقارير المحمولة',
      status: 'beta',
      usage: 45,
      users: 1520,
      description: 'تقارير وتحليلات على الهاتف'
    },
    {
      name: 'المسح الضوئي',
      status: 'development',
      usage: 0,
      users: 0,
      description: 'مسح الباركود والـ QR'
    }
  ];

  const pushNotifications = [
    {
      id: 1,
      title: 'عرض خاص - خصم 20%',
      message: 'احصل على خصم 20% على جميع الخدمات لفترة محدودة',
      sent: 15420,
      opened: 8750,
      clicked: 2340,
      date: '2025-08-04',
      status: 'sent'
    },
    {
      id: 2,
      title: 'تحديث التطبيق متاح',
      message: 'إصدار جديد من التطبيق متاح للتحميل مع ميزات محسنة',
      sent: 12800,
      opened: 9600,
      clicked: 1920,
      date: '2025-08-02',
      status: 'sent'
    },
    {
      id: 3,
      title: 'تذكير موعد الصيانة',
      message: 'لديك موعد صيانة مجدول غداً في تمام الساعة 10:00 صباحاً',
      sent: 0,
      opened: 0,
      clicked: 0,
      date: '2025-08-05',
      status: 'scheduled'
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

      {/* Apps Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-500">v{app.version}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                app.status === 'published' ? 'bg-green-100 text-green-800' :
                app.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {app.status === 'published' ? 'منشور' : 
                 app.status === 'beta' ? 'تجريبي' : 'تطوير'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">التحميلات</span>
                <span className="font-medium">{app.downloads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">التقييم</span>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{app.rating}</span>
                  <span className="text-gray-500">({app.reviews})</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">آخر تحديث</span>
                <span className="font-medium">{app.lastUpdate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">المنصة</span>
                <span className="font-medium">{app.platform}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2 space-x-reverse">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700">
                إدارة
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-50">
                تحليلات
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="text-center">
              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">إنشاء تطبيق جديد</p>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">إرسال إشعار</p>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">عرض التحليلات</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      {/* Features Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">إدارة الميزات</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 ml-2" />
            إضافة ميزة جديدة
          </button>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${
                    feature.status === 'active' ? 'bg-green-500' :
                    feature.status === 'beta' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{feature.name}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'active' ? 'bg-green-100 text-green-800' :
                    feature.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {feature.status === 'active' ? 'نشط' :
                     feature.status === 'beta' ? 'تجريبي' : 'تطوير'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {feature.status !== 'development' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{feature.usage}%</p>
                    <p className="text-sm text-gray-600">معدل الاستخدام</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{feature.users.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">المستخدمون النشطون</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${feature.usage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">الأداء</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Push Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">الإشعارات الفورية</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 ml-2" />
            إنشاء إشعار جديد
          </button>
        </div>

        <div className="space-y-4">
          {pushNotifications.map((notification) => (
            <div key={notification.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  notification.status === 'sent' ? 'bg-green-100 text-green-800' :
                  notification.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {notification.status === 'sent' ? 'مُرسل' :
                   notification.status === 'scheduled' ? 'مجدول' : 'مسودة'}
                </span>
              </div>

              {notification.status === 'sent' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{notification.sent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">مُرسل</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{notification.opened.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">مفتوح</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">{notification.clicked.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">نقرات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-orange-600">
                      {((notification.opened / notification.sent) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600">معدل الفتح</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <p className="text-sm text-gray-500">تاريخ الإرسال: {notification.date}</p>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">تحليلات الاستخدام</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">المستخدمون النشطون يومياً</span>
              <span className="font-bold text-blue-600">12,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">متوسط وقت الجلسة</span>
              <span className="font-bold text-green-600">8:32 دقيقة</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">معدل الاحتفاظ (30 يوم)</span>
              <span className="font-bold text-purple-600">78.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">معدل الانهيار</span>
              <span className="font-bold text-red-600">0.12%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">توزيع المنصات</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Android</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">iOS</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مؤشرات الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-4 bg-blue-50 rounded-lg mb-3">
              <Activity className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">99.8%</p>
            <p className="text-sm text-gray-600">وقت التشغيل</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-green-50 rounded-lg mb-3">
              <Zap className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1.2s</p>
            <p className="text-sm text-gray-600">وقت التحميل</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-yellow-50 rounded-lg mb-3">
              <Shield className="h-8 w-8 text-yellow-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-gray-600">الأمان</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-purple-50 rounded-lg mb-3">
              <Globe className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-sm text-gray-600">الدول</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Smartphone },
    { id: 'features', name: 'الميزات', icon: Settings },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'analytics', name: 'التحليلات', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إدارة التطبيقات المحمولة</h1>
              <p className="text-gray-600 mt-2">إدارة وتطوير التطبيقات المحمولة وتحليل الأداء</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <select 
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="main">Adapti Business</option>
                <option value="customer">Adapti Customer</option>
                <option value="driver">Adapti Driver</option>
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
          {activeTab === 'features' && renderFeatures()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>
    </div>
  );
};

export default MobileAppManagement;

