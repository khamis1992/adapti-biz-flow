import React, { useState } from 'react';
import { 
  Eye, Camera, Smartphone, Monitor, Glasses, Zap,
  Play, Pause, Settings, Download, Upload, Share2,
  BarChart3, TrendingUp, Users, Clock, CheckCircle,
  AlertTriangle, RefreshCw, Plus, Filter, Search,
  Layers, Box, Cube, Move3D, RotateCcw, ZoomIn
} from 'lucide-react';

const AugmentedReality = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isARActive, setIsARActive] = useState(false);

  // AR applications data
  const arApplications = [
    {
      id: 1,
      name: 'عرض المنتجات التفاعلي',
      category: 'retail',
      status: 'active',
      users: 1247,
      sessions: 3420,
      avgDuration: '4.2 دقيقة',
      conversionRate: '12.8%',
      description: 'عرض المنتجات بتقنية الواقع المعزز للعملاء'
    },
    {
      id: 2,
      name: 'التدريب التفاعلي للموظفين',
      category: 'training',
      status: 'active',
      users: 89,
      sessions: 456,
      avgDuration: '18.5 دقيقة',
      conversionRate: '95.2%',
      description: 'برامج تدريب الموظفين باستخدام الواقع المعزز'
    },
    {
      id: 3,
      name: 'صيانة المعدات المرشدة',
      category: 'maintenance',
      status: 'active',
      users: 34,
      sessions: 178,
      avgDuration: '25.3 دقيقة',
      conversionRate: '88.7%',
      description: 'إرشادات صيانة المعدات بالواقع المعزز'
    },
    {
      id: 4,
      name: 'جولات افتراضية للمرافق',
      category: 'tours',
      status: 'development',
      users: 0,
      sessions: 0,
      avgDuration: '0 دقيقة',
      conversionRate: '0%',
      description: 'جولات افتراضية تفاعلية للمرافق والمكاتب'
    },
    {
      id: 5,
      name: 'تصور البيانات ثلاثي الأبعاد',
      category: 'analytics',
      status: 'beta',
      users: 156,
      sessions: 289,
      avgDuration: '8.7 دقيقة',
      conversionRate: '76.4%',
      description: 'عرض التقارير والبيانات بشكل ثلاثي الأبعاد'
    }
  ];

  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: '1,526',
      change: '+23.5%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'الجلسات النشطة',
      value: '4,343',
      change: '+18.2%',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'متوسط وقت الاستخدام',
      value: '12.4 دقيقة',
      change: '+5.8%',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'معدل النجاح',
      value: '89.3%',
      change: '+2.1%',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // AR devices and hardware
  const arDevices = [
    {
      id: 1,
      name: 'نظارات AR المتقدمة',
      model: 'HoloLens 2',
      status: 'connected',
      battery: 78,
      users: 12,
      location: 'قسم التدريب',
      lastUsed: '2025-08-04 15:30'
    },
    {
      id: 2,
      name: 'تطبيق الهاتف المحمول',
      model: 'iOS/Android App',
      status: 'active',
      battery: 100,
      users: 1247,
      location: 'متاح عالمياً',
      lastUsed: '2025-08-04 16:45'
    },
    {
      id: 3,
      name: 'كاميرا AR الصناعية',
      model: 'Magic Leap 2',
      status: 'maintenance',
      battery: 45,
      users: 0,
      location: 'ورشة الصيانة',
      lastUsed: '2025-08-03 14:20'
    },
    {
      id: 4,
      name: 'شاشات AR التفاعلية',
      model: 'Microsoft Surface Hub',
      status: 'connected',
      battery: 95,
      users: 34,
      location: 'قاعة الاجتماعات',
      lastUsed: '2025-08-04 16:15'
    }
  ];

  // AR content library
  const arContent = [
    {
      id: 1,
      name: 'نماذج المنتجات ثلاثية الأبعاد',
      type: '3D Models',
      size: '2.4 GB',
      items: 156,
      category: 'products',
      lastUpdated: '2025-08-04'
    },
    {
      id: 2,
      name: 'مقاطع التدريب التفاعلية',
      type: 'Interactive Videos',
      size: '5.8 GB',
      items: 89,
      category: 'training',
      lastUpdated: '2025-08-03'
    },
    {
      id: 3,
      name: 'دلائل الصيانة المرئية',
      type: 'AR Guides',
      size: '1.2 GB',
      items: 45,
      category: 'maintenance',
      lastUpdated: '2025-08-02'
    },
    {
      id: 4,
      name: 'خرائط ثلاثية الأبعاد',
      type: '3D Maps',
      size: '3.1 GB',
      items: 23,
      category: 'navigation',
      lastUpdated: '2025-08-01'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* AR Control Center */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">مركز التحكم في الواقع المعزز</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse text-sm">
              <div className={`w-2 h-2 rounded-full ${isARActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="text-gray-600">{isARActive ? 'نشط' : 'متوقف'}</span>
            </div>
            <button 
              onClick={() => setIsARActive(!isARActive)}
              className={`px-4 py-2 rounded-lg flex items-center ${
                isARActive 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isARActive ? <Pause className="h-4 w-4 ml-2" /> : <Play className="h-4 w-4 ml-2" />}
              {isARActive ? 'إيقاف' : 'تشغيل'}
            </button>
          </div>
        </div>

        {/* AR Visualization */}
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 text-center text-white mb-6">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 border-2 border-blue-400 rounded-full mb-4 relative">
              <Eye className="h-16 w-16 text-blue-400" />
              {isARActive && (
                <div className="absolute inset-0 border-2 border-purple-400 rounded-full animate-ping opacity-75"></div>
              )}
            </div>
            <p className="text-lg mb-2">{isARActive ? 'الواقع المعزز نشط' : 'الواقع المعزز متوقف'}</p>
            <p className="text-gray-300">1,526 مستخدم • 4,343 جلسة نشطة</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="p-3 bg-blue-500/20 rounded-lg mb-2 inline-block">
                <Cube className="h-8 w-8 text-blue-300" />
              </div>
              <p className="text-sm text-gray-300">النماذج ثلاثية الأبعاد</p>
            </div>
            <div>
              <div className="p-3 bg-purple-500/20 rounded-lg mb-2 inline-block">
                <Layers className="h-8 w-8 text-purple-300" />
              </div>
              <p className="text-sm text-gray-300">الطبقات التفاعلية</p>
            </div>
            <div>
              <div className="p-3 bg-green-500/20 rounded-lg mb-2 inline-block">
                <Move3D className="h-8 w-8 text-green-300" />
              </div>
              <p className="text-sm text-gray-300">التتبع المكاني</p>
            </div>
          </div>
        </div>

        {/* AR Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {arApplications.slice(0, 3).map((app) => (
            <div key={app.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{app.name}</h4>
                  <p className="text-sm text-gray-600">{app.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === 'active' ? 'bg-green-100 text-green-800' :
                  app.status === 'beta' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.status === 'active' ? 'نشط' :
                   app.status === 'beta' ? 'تجريبي' : 'تطوير'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{app.users.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">مستخدم</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{app.sessions.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">جلسة</p>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">متوسط الوقت: {app.avgDuration}</span>
                <span className="text-green-600 font-medium">{app.conversionRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مؤشرات الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg mb-3 inline-block">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">98.7%</p>
            <p className="text-sm text-gray-600">دقة التتبع</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-green-50 rounded-lg mb-3 inline-block">
              <Monitor className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">60 FPS</p>
            <p className="text-sm text-gray-600">معدل الإطارات</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-50 rounded-lg mb-3 inline-block">
              <Box className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">15ms</p>
            <p className="text-sm text-gray-600">زمن الاستجابة</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-orange-50 rounded-lg mb-3 inline-block">
              <Camera className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4K</p>
            <p className="text-sm text-gray-600">دقة العرض</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      {/* Applications Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">تطبيقات الواقع المعزز</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 ml-2" />
            تطبيق جديد
          </button>
        </div>

        <div className="space-y-4">
          {arApplications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{app.name}</h4>
                  <p className="text-sm text-gray-600">{app.description}</p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    app.status === 'active' ? 'bg-green-100 text-green-800' :
                    app.status === 'beta' ? 'bg-blue-100 text-blue-800' :
                    app.status === 'development' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status === 'active' ? 'نشط' :
                     app.status === 'beta' ? 'تجريبي' :
                     app.status === 'development' ? 'تطوير' : 'متوقف'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    app.category === 'retail' ? 'bg-purple-100 text-purple-800' :
                    app.category === 'training' ? 'bg-blue-100 text-blue-800' :
                    app.category === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                    app.category === 'analytics' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.category === 'retail' ? 'تجارة' :
                     app.category === 'training' ? 'تدريب' :
                     app.category === 'maintenance' ? 'صيانة' :
                     app.category === 'analytics' ? 'تحليلات' : 'جولات'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{app.users.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">مستخدم</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{app.sessions.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">جلسة</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{app.avgDuration}</p>
                  <p className="text-sm text-gray-600">متوسط الوقت</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-orange-600">{app.conversionRate}</p>
                  <p className="text-sm text-gray-600">معدل النجاح</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2 space-x-reverse">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    عرض
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                    تحرير
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  آخر تحديث: منذ يومين
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-6">
      {/* AR Devices */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">أجهزة الواقع المعزز</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </button>
            <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center">
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {arDevices.map((device) => (
            <div key={device.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-lg ${
                    device.status === 'connected' ? 'bg-green-100' :
                    device.status === 'active' ? 'bg-blue-100' :
                    'bg-yellow-100'
                  }`}>
                    {device.model.includes('HoloLens') && <Glasses className="h-5 w-5 text-green-600" />}
                    {device.model.includes('App') && <Smartphone className="h-5 w-5 text-blue-600" />}
                    {device.model.includes('Magic Leap') && <Camera className="h-5 w-5 text-yellow-600" />}
                    {device.model.includes('Surface') && <Monitor className="h-5 w-5 text-green-600" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{device.name}</h4>
                    <p className="text-sm text-gray-600">{device.model}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  device.status === 'connected' ? 'bg-green-100 text-green-800' :
                  device.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {device.status === 'connected' ? 'متصل' :
                   device.status === 'active' ? 'نشط' : 'صيانة'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">المستخدمون النشطون</p>
                  <p className="text-lg font-bold text-blue-600">{device.users.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">البطارية</p>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          device.battery > 50 ? 'bg-green-600' :
                          device.battery > 20 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{device.battery}%</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                <p>الموقع: {device.location}</p>
                <p>آخر استخدام: {device.lastUsed}</p>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                  مراقبة
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50">
                  إعدادات
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {/* Content Library */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">مكتبة المحتوى</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="البحث في المحتوى..."
                className="pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Upload className="h-4 w-4 ml-2" />
              رفع محتوى
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {arContent.map((content) => (
            <div key={content.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-lg ${
                    content.type === '3D Models' ? 'bg-blue-100' :
                    content.type === 'Interactive Videos' ? 'bg-green-100' :
                    content.type === 'AR Guides' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    {content.type === '3D Models' && <Cube className="h-5 w-5 text-blue-600" />}
                    {content.type === 'Interactive Videos' && <Play className="h-5 w-5 text-green-600" />}
                    {content.type === 'AR Guides' && <Eye className="h-5 w-5 text-purple-600" />}
                    {content.type === '3D Maps' && <Move3D className="h-5 w-5 text-orange-600" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{content.name}</h4>
                    <p className="text-sm text-gray-600">{content.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  content.category === 'products' ? 'bg-purple-100 text-purple-800' :
                  content.category === 'training' ? 'bg-blue-100 text-blue-800' :
                  content.category === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {content.category === 'products' ? 'منتجات' :
                   content.category === 'training' ? 'تدريب' :
                   content.category === 'maintenance' ? 'صيانة' : 'خرائط'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">الحجم</p>
                  <p className="text-lg font-bold text-blue-600">{content.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">العناصر</p>
                  <p className="text-lg font-bold text-green-600">{content.items}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                <p>آخر تحديث: {content.lastUpdated}</p>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                  عرض
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50">
                  تحرير
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إحصائيات المحتوى</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg mb-3 inline-block">
              <Cube className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">313</p>
            <p className="text-sm text-gray-600">إجمالي العناصر</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-green-50 rounded-lg mb-3 inline-block">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12.5 GB</p>
            <p className="text-sm text-gray-600">إجمالي الحجم</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-50 rounded-lg mb-3 inline-block">
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">8,450</p>
            <p className="text-sm text-gray-600">مرات المشاهدة</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-orange-50 rounded-lg mb-3 inline-block">
              <Download className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2,340</p>
            <p className="text-sm text-gray-600">مرات التحميل</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Eye },
    { id: 'applications', name: 'التطبيقات', icon: Layers },
    { id: 'devices', name: 'الأجهزة', icon: Glasses },
    { id: 'content', name: 'المحتوى', icon: Cube },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الواقع المعزز (AR)</h1>
              <p className="text-gray-600 mt-2">تقنيات الواقع المعزز للأعمال والتدريب</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">1,526 مستخدم نشط</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Settings className="h-4 w-4 ml-2" />
                إعدادات AR
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'devices' && renderDevices()}
          {activeTab === 'content' && renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AugmentedReality;

