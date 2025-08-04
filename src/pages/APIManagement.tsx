import React, { useState } from 'react';
import { 
  Code, 
  Key, 
  Shield, 
  Activity, 
  Globe, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Filter,
  Search,
  Download,
  Upload,
  Zap,
  Database
} from 'lucide-react';

const APIManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});

  // إحصائيات API
  const apiStats = {
    totalAPIs: 15,
    activeKeys: 42,
    monthlyRequests: 125000,
    successRate: 99.2
  };

  // واجهات برمجة التطبيقات
  const apis = [
    {
      id: 1,
      name: 'Customer Management API',
      description: 'إدارة بيانات العملاء والحسابات',
      version: 'v2.1',
      status: 'active',
      endpoint: 'https://api.adapti-biz.com/customers',
      method: 'REST',
      authentication: 'API Key',
      requests: 45200,
      successRate: 99.8,
      avgResponseTime: '120ms',
      lastUpdated: '2024-01-15',
      category: 'عملاء'
    },
    {
      id: 2,
      name: 'Inventory API',
      description: 'إدارة المخزون والمنتجات',
      version: 'v1.5',
      status: 'active',
      endpoint: 'https://api.adapti-biz.com/inventory',
      method: 'REST',
      authentication: 'OAuth 2.0',
      requests: 32100,
      successRate: 98.5,
      avgResponseTime: '95ms',
      lastUpdated: '2024-01-14',
      category: 'مخزون'
    },
    {
      id: 3,
      name: 'Financial Reports API',
      description: 'تقارير مالية وإحصائيات',
      version: 'v3.0',
      status: 'active',
      endpoint: 'https://api.adapti-biz.com/finance',
      method: 'GraphQL',
      authentication: 'JWT',
      requests: 18900,
      successRate: 99.9,
      avgResponseTime: '85ms',
      lastUpdated: '2024-01-13',
      category: 'مالية'
    },
    {
      id: 4,
      name: 'Notification Service API',
      description: 'إرسال الإشعارات والرسائل',
      version: 'v1.2',
      status: 'maintenance',
      endpoint: 'https://api.adapti-biz.com/notifications',
      method: 'REST',
      authentication: 'API Key',
      requests: 28700,
      successRate: 97.2,
      avgResponseTime: '200ms',
      lastUpdated: '2024-01-12',
      category: 'إشعارات'
    },
    {
      id: 5,
      name: 'Analytics API',
      description: 'تحليلات وإحصائيات متقدمة',
      version: 'v2.0',
      status: 'beta',
      endpoint: 'https://api.adapti-biz.com/analytics',
      method: 'REST',
      authentication: 'OAuth 2.0',
      requests: 5600,
      successRate: 96.8,
      avgResponseTime: '150ms',
      lastUpdated: '2024-01-11',
      category: 'تحليلات'
    }
  ];

  // مفاتيح API
  const apiKeys = [
    {
      id: 1,
      name: 'Production Key - Mobile App',
      key: 'ak_live_1234567890abcdef',
      status: 'active',
      permissions: ['customers:read', 'customers:write', 'inventory:read'],
      requests: 15200,
      lastUsed: '2024-01-15 14:30',
      createdDate: '2023-12-01',
      expiryDate: '2024-12-01'
    },
    {
      id: 2,
      name: 'Development Key - Web Portal',
      key: 'ak_test_abcdef1234567890',
      status: 'active',
      permissions: ['*'],
      requests: 8900,
      lastUsed: '2024-01-15 12:15',
      createdDate: '2024-01-01',
      expiryDate: '2024-06-01'
    },
    {
      id: 3,
      name: 'Integration Key - Third Party',
      key: 'ak_live_fedcba0987654321',
      status: 'inactive',
      permissions: ['finance:read', 'reports:read'],
      requests: 2300,
      lastUsed: '2024-01-10 09:45',
      createdDate: '2023-11-15',
      expiryDate: '2024-11-15'
    }
  ];

  // إحصائيات الاستخدام
  const usageData = [
    { date: '2024-01-09', requests: 8200, errors: 45 },
    { date: '2024-01-10', requests: 9100, errors: 32 },
    { date: '2024-01-11', requests: 8800, errors: 28 },
    { date: '2024-01-12', requests: 9500, errors: 52 },
    { date: '2024-01-13', requests: 10200, errors: 38 },
    { date: '2024-01-14', requests: 9800, errors: 41 },
    { date: '2024-01-15', requests: 11200, errors: 29 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'beta': return 'text-blue-600 bg-blue-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'deprecated': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'maintenance': return 'صيانة';
      case 'beta': return 'تجريبي';
      case 'inactive': return 'غير نشط';
      case 'deprecated': return 'مهجور';
      default: return 'غير محدد';
    }
  };

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const maskApiKey = (key: string) => {
    return key.substring(0, 8) + '...' + key.substring(key.length - 8);
  };

  const filteredApis = apis.filter(api =>
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      {/* العنوان الرئيسي */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة واجهات برمجة التطبيقات</h1>
        <p className="text-gray-600">إدارة ومراقبة واجهات برمجة التطبيقات والمفاتيح</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي APIs</p>
              <p className="text-2xl font-bold text-gray-900">{apiStats.totalAPIs}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المفاتيح النشطة</p>
              <p className="text-2xl font-bold text-green-600">{apiStats.activeKeys}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Key className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الطلبات الشهرية</p>
              <p className="text-2xl font-bold text-gray-900">{apiStats.monthlyRequests.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
              <p className="text-2xl font-bold text-green-600">{apiStats.successRate}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* التبويبات */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'نظرة عامة', icon: Activity },
              { id: 'apis', name: 'واجهات API', icon: Code },
              { id: 'keys', name: 'مفاتيح API', icon: Key },
              { id: 'analytics', name: 'التحليلات', icon: BarChart3 },
              { id: 'documentation', name: 'التوثيق', icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* محتوى التبويبات */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* استخدام API اليومي */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">استخدام API اليومي</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {usageData.map((data, index) => {
                const maxRequests = Math.max(...usageData.map(d => d.requests));
                const height = (data.requests / maxRequests) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col justify-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${height}%` }}
                        title={`${data.requests.toLocaleString()} طلب`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">
                      {new Date(data.date).getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* أهم واجهات API */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">أهم واجهات API</h3>
            <div className="space-y-4">
              {apis.slice(0, 5).map((api) => (
                <div key={api.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Code className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{api.name}</div>
                      <div className="text-sm text-gray-500">{api.requests.toLocaleString()} طلب</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{api.successRate}%</div>
                    <div className="text-xs text-gray-500">{api.avgResponseTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'apis' && (
        <div>
          {/* شريط البحث والأدوات */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في واجهات API..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  إنشاء API جديد
                </button>
              </div>
            </div>
          </div>

          {/* قائمة واجهات API */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الاسم</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الحالة</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الإصدار</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">النوع</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الطلبات</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">معدل النجاح</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">زمن الاستجابة</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApis.map((api) => (
                    <tr key={api.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">{api.name}</div>
                          <div className="text-sm text-gray-500">{api.description}</div>
                          <div className="text-xs text-blue-600 mt-1">{api.endpoint}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(api.status)}`}>
                          {getStatusText(api.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{api.version}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {api.method}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{api.requests.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${api.successRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{api.successRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{api.avgResponseTime}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'keys' && (
        <div>
          {/* شريط الأدوات */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">مفاتيح API</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                إنشاء مفتاح جديد
              </button>
            </div>
          </div>

          {/* قائمة المفاتيح */}
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{apiKey.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>تم الإنشاء: {apiKey.createdDate}</span>
                      <span>ينتهي في: {apiKey.expiryDate}</span>
                      <span>آخر استخدام: {apiKey.lastUsed}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apiKey.status)}`}>
                    {getStatusText(apiKey.status)}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">مفتاح API:</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <code className="flex-1 text-sm font-mono text-gray-800">
                      {showApiKey[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                    </code>
                    <button
                      onClick={() => toggleApiKeyVisibility(apiKey.id.toString())}
                      className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                    >
                      {showApiKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 mb-2 block">الصلاحيات:</span>
                  <div className="flex flex-wrap gap-2">
                    {apiKey.permissions.map((permission, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{apiKey.requests.toLocaleString()}</span> طلب هذا الشهر
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* رسم بياني للطلبات والأخطاء */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">الطلبات والأخطاء اليومية</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {usageData.map((data, index) => {
                const maxRequests = Math.max(...usageData.map(d => d.requests));
                const requestHeight = (data.requests / maxRequests) * 180;
                const errorHeight = (data.errors / Math.max(...usageData.map(d => d.errors))) * 40;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col justify-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-blue-500 rounded-t mb-1"
                        style={{ height: `${requestHeight}px` }}
                        title={`${data.requests.toLocaleString()} طلب`}
                      ></div>
                      <div
                        className="w-full bg-red-500 rounded"
                        style={{ height: `${errorHeight}px` }}
                        title={`${data.errors} خطأ`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">
                      {new Date(data.date).getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">الطلبات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">الأخطاء</span>
              </div>
            </div>
          </div>

          {/* توزيع استخدام API */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع استخدام API</h3>
            <div className="space-y-4">
              {apis.slice(0, 5).map((api, index) => {
                const maxRequests = Math.max(...apis.map(a => a.requests));
                const percentage = (api.requests / maxRequests) * 100;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full" style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}></div>
                      <span className="text-gray-700 text-sm">{api.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-16 text-right">{api.requests.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'documentation' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">توثيق واجهات برمجة التطبيقات</h3>
            <p className="text-gray-600 mb-6">الوصول إلى التوثيق التفاعلي والأمثلة</p>
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Globe className="w-5 h-5" />
                عرض التوثيق التفاعلي
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5" />
                تحميل OpenAPI Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIManagement;

