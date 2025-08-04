import React, { useState } from 'react';
import { 
  Wifi, WifiOff, Thermometer, Zap, Droplets, Wind,
  Shield, AlertTriangle, CheckCircle, Clock, Settings,
  Battery, Signal, MapPin, Eye, Edit, Trash2,
  Plus, Filter, Download, RefreshCw, Bell, Activity,
  Smartphone, Laptop, Car, Home, Factory, Camera
} from 'lucide-react';

const IoTManagement = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // IoT devices data
  const devices = [
    {
      id: 1,
      name: 'مستشعر درجة الحرارة - المستودع A',
      type: 'temperature',
      category: 'warehouse',
      status: 'online',
      battery: 85,
      signal: 92,
      lastUpdate: '2025-08-04 16:45',
      value: '24.5°C',
      location: 'المستودع الرئيسي - الطابق الأول',
      alerts: 0
    },
    {
      id: 2,
      name: 'كاميرا مراقبة - المدخل الرئيسي',
      type: 'camera',
      category: 'security',
      status: 'online',
      battery: 100,
      signal: 88,
      lastUpdate: '2025-08-04 16:44',
      value: 'تسجيل نشط',
      location: 'المدخل الرئيسي',
      alerts: 1
    },
    {
      id: 3,
      name: 'مستشعر الرطوبة - غرفة الخوادم',
      type: 'humidity',
      category: 'environment',
      status: 'online',
      battery: 67,
      signal: 95,
      lastUpdate: '2025-08-04 16:43',
      value: '45%',
      location: 'غرفة الخوادم',
      alerts: 0
    },
    {
      id: 4,
      name: 'جهاز تتبع المركبة - شاحنة 001',
      type: 'gps',
      category: 'vehicle',
      status: 'online',
      battery: 78,
      signal: 82,
      lastUpdate: '2025-08-04 16:42',
      value: 'متحرك - 65 كم/س',
      location: 'طريق الملك فهد',
      alerts: 0
    },
    {
      id: 5,
      name: 'مستشعر الحركة - المكتب الإداري',
      type: 'motion',
      category: 'security',
      status: 'offline',
      battery: 12,
      signal: 0,
      lastUpdate: '2025-08-04 14:20',
      value: 'غير متاح',
      location: 'الطابق الثاني - المكتب الإداري',
      alerts: 2
    },
    {
      id: 6,
      name: 'مقياس الطاقة - المصنع الرئيسي',
      type: 'energy',
      category: 'industrial',
      status: 'warning',
      battery: 45,
      signal: 76,
      lastUpdate: '2025-08-04 16:40',
      value: '2.4 كيلو واط',
      location: 'المصنع - خط الإنتاج 1',
      alerts: 1
    }
  ];

  const stats = [
    {
      title: 'إجمالي الأجهزة',
      value: '247',
      change: '+12',
      icon: Wifi,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'الأجهزة المتصلة',
      value: '234',
      change: '+8',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'التنبيهات النشطة',
      value: '18',
      change: '+3',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'استهلاك البيانات',
      value: '2.4 GB',
      change: '+15%',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // Sensor data for analytics
  const sensorData = [
    { time: '12:00', temperature: 23.5, humidity: 42, energy: 2.1 },
    { time: '13:00', temperature: 24.2, humidity: 44, energy: 2.3 },
    { time: '14:00', temperature: 25.1, humidity: 46, energy: 2.5 },
    { time: '15:00', temperature: 24.8, humidity: 45, energy: 2.4 },
    { time: '16:00', temperature: 24.5, humidity: 45, energy: 2.4 },
  ];

  // Alerts and notifications
  const alerts = [
    {
      id: 1,
      device: 'مستشعر الحركة - المكتب الإداري',
      type: 'offline',
      message: 'الجهاز غير متصل منذ ساعتين',
      severity: 'high',
      timestamp: '2025-08-04 14:20',
      resolved: false
    },
    {
      id: 2,
      device: 'كاميرا مراقبة - المدخل الرئيسي',
      type: 'motion',
      message: 'تم اكتشاف حركة غير مصرح بها',
      severity: 'medium',
      timestamp: '2025-08-04 16:30',
      resolved: false
    },
    {
      id: 3,
      device: 'مقياس الطاقة - المصنع الرئيسي',
      type: 'battery',
      message: 'مستوى البطارية منخفض (45%)',
      severity: 'low',
      timestamp: '2025-08-04 15:45',
      resolved: false
    },
    {
      id: 4,
      device: 'مستشعر درجة الحرارة - المستودع B',
      type: 'temperature',
      message: 'درجة الحرارة تجاوزت الحد المسموح (28°C)',
      severity: 'high',
      timestamp: '2025-08-04 13:15',
      resolved: true
    }
  ];

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'temperature': return Thermometer;
      case 'humidity': return Droplets;
      case 'camera': return Camera;
      case 'gps': return MapPin;
      case 'motion': return Eye;
      case 'energy': return Zap;
      default: return Wifi;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'warehouse': return Home;
      case 'security': return Shield;
      case 'environment': return Wind;
      case 'vehicle': return Car;
      case 'industrial': return Factory;
      default: return Wifi;
    }
  };

  const renderDevices = () => (
    <div className="space-y-6">
      {/* Device Categories */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">فئات الأجهزة</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 ml-2" />
            إضافة جهاز جديد
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {[
            { id: 'all', name: 'الكل', count: 247, icon: Wifi },
            { id: 'warehouse', name: 'المستودعات', count: 89, icon: Home },
            { id: 'security', name: 'الأمان', count: 45, icon: Shield },
            { id: 'environment', name: 'البيئة', count: 67, icon: Wind },
            { id: 'vehicle', name: 'المركبات', count: 23, icon: Car },
            { id: 'industrial', name: 'الصناعي', count: 23, icon: Factory }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <category.icon className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{category.name}</p>
              <p className="text-xs text-gray-500">{category.count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Device List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">قائمة الأجهزة</h3>
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

        <div className="space-y-4">
          {devices.map((device) => {
            const DeviceIcon = getDeviceIcon(device.type);
            return (
              <div key={device.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`p-2 rounded-lg ${
                      device.status === 'online' ? 'bg-green-100' :
                      device.status === 'warning' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      <DeviceIcon className={`h-5 w-5 ${
                        device.status === 'online' ? 'text-green-600' :
                        device.status === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{device.name}</h4>
                      <p className="text-sm text-gray-600">{device.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {device.alerts > 0 && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        {device.alerts} تنبيه
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      device.status === 'online' ? 'bg-green-100 text-green-800' :
                      device.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {device.status === 'online' ? 'متصل' :
                       device.status === 'warning' ? 'تحذير' : 'غير متصل'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{device.value}</p>
                    <p className="text-sm text-gray-600">القيمة الحالية</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 space-x-reverse">
                      <Battery className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{device.battery}%</span>
                    </div>
                    <p className="text-sm text-gray-600">البطارية</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 space-x-reverse">
                      <Signal className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{device.signal}%</span>
                    </div>
                    <p className="text-sm text-gray-600">الإشارة</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{device.lastUpdate}</p>
                    <p className="text-sm text-gray-600">آخر تحديث</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center space-x-1 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Battery and Signal Bars */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>البطارية</span>
                      <span>{device.battery}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          device.battery > 50 ? 'bg-green-600' :
                          device.battery > 20 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>قوة الإشارة</span>
                      <span>{device.signal}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${device.signal}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Real-time Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-red-50 rounded-lg mb-3 inline-block">
            <Thermometer className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24.5°C</p>
          <p className="text-sm text-gray-600">متوسط درجة الحرارة</p>
          <p className="text-xs text-green-600 mt-1">+0.3°C من الأمس</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-blue-50 rounded-lg mb-3 inline-block">
            <Droplets className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">45%</p>
          <p className="text-sm text-gray-600">متوسط الرطوبة</p>
          <p className="text-xs text-red-600 mt-1">-2% من الأمس</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-yellow-50 rounded-lg mb-3 inline-block">
            <Zap className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2.4 kW</p>
          <p className="text-sm text-gray-600">استهلاك الطاقة</p>
          <p className="text-xs text-green-600 mt-1">-5% من الأمس</p>
        </div>
      </div>

      {/* Device Performance */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">أداء الأجهزة</h3>
        <div className="space-y-4">
          {[
            { category: 'أجهزة الاستشعار البيئية', total: 89, online: 85, offline: 4, performance: 95 },
            { category: 'أنظمة الأمان', total: 45, online: 43, offline: 2, performance: 96 },
            { category: 'أجهزة تتبع المركبات', total: 23, online: 22, offline: 1, performance: 96 },
            { category: 'أجهزة الطاقة الصناعية', total: 23, online: 20, offline: 3, performance: 87 },
            { category: 'أجهزة المراقبة', total: 67, online: 64, offline: 3, performance: 95 }
          ].map((category, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{category.category}</h4>
                <span className="text-sm text-gray-600">{category.performance}% أداء</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{category.total}</p>
                  <p className="text-sm text-gray-600">إجمالي</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{category.online}</p>
                  <p className="text-sm text-gray-600">متصل</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-red-600">{category.offline}</p>
                  <p className="text-sm text-gray-600">غير متصل</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${category.performance}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-red-50 rounded-lg mb-3 inline-block">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-600">تنبيهات عالية</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-yellow-50 rounded-lg mb-3 inline-block">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-600">تنبيهات متوسطة</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-blue-50 rounded-lg mb-3 inline-block">
            <AlertTriangle className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">7</p>
          <p className="text-sm text-gray-600">تنبيهات منخفضة</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-green-50 rounded-lg mb-3 inline-block">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">45</p>
          <p className="text-sm text-gray-600">تنبيهات محلولة</p>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">التنبيهات والإشعارات</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50">
              تصفية
            </button>
            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
              حل الكل
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 ${alert.resolved ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100' :
                    alert.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.severity === 'high' ? 'text-red-600' :
                      alert.severity === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{alert.device}</h4>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.severity === 'high' ? 'عالي' :
                     alert.severity === 'medium' ? 'متوسط' : 'منخفض'}
                  </span>
                  {alert.resolved && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      محلول
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{alert.timestamp}</p>
                {!alert.resolved && (
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      حل
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                      تجاهل
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Network Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إعدادات الشبكة</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">بروتوكول الاتصال</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>MQTT</option>
                <option>CoAP</option>
                <option>HTTP/HTTPS</option>
                <option>WebSocket</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تردد التحديث</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>كل دقيقة</option>
                <option>كل 5 دقائق</option>
                <option>كل 15 دقيقة</option>
                <option>كل ساعة</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان خادم MQTT</label>
            <input 
              type="text" 
              defaultValue="mqtt.adapti-biz.com:1883"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Alert Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إعدادات التنبيهات</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تنبيهات البريد الإلكتروني</p>
              <p className="text-sm text-gray-600">إرسال تنبيهات عبر البريد الإلكتروني</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تنبيهات SMS</p>
              <p className="text-sm text-gray-600">إرسال تنبيهات عبر الرسائل النصية</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تنبيهات التطبيق</p>
              <p className="text-sm text-gray-600">إظهار تنبيهات داخل التطبيق</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إعدادات البيانات</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">فترة الاحتفاظ بالبيانات</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>30 يوم</option>
              <option>90 يوم</option>
              <option>6 أشهر</option>
              <option>سنة واحدة</option>
              <option>بدون حد</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تردد النسخ الاحتياطي</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>يومي</option>
              <option>أسبوعي</option>
              <option>شهري</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">ضغط البيانات</p>
              <p className="text-sm text-gray-600">ضغط البيانات القديمة لتوفير المساحة</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end space-x-3 space-x-reverse">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          إلغاء
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'devices', name: 'الأجهزة', icon: Wifi },
    { id: 'analytics', name: 'التحليلات', icon: Activity },
    { id: 'alerts', name: 'التنبيهات', icon: Bell },
    { id: 'settings', name: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إدارة إنترنت الأشياء (IoT)</h1>
              <p className="text-gray-600 mt-2">مراقبة وإدارة الأجهزة المتصلة والمستشعرات</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">234 جهاز متصل</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث البيانات
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
                    {stat.change} من الأمس
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
          {activeTab === 'devices' && renderDevices()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'alerts' && renderAlerts()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default IoTManagement;

