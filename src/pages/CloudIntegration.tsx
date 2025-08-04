import React, { useState } from 'react';
import { 
  Cloud, Server, Database, Shield, Zap, Globe,
  Settings, Monitor, AlertTriangle, CheckCircle,
  Upload, Download, RefreshCw as Sync, Key, Lock, Activity,
  BarChart3, Users, DollarSign, Clock, RefreshCw,
  Plus, Edit, Trash2, Eye, Copy, Share2
} from 'lucide-react';

const CloudIntegration = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProvider, setSelectedProvider] = useState('aws');

  // Cloud providers data
  const providers = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      logo: '🟠',
      status: 'connected',
      services: 12,
      cost: 2450,
      uptime: 99.9,
      region: 'الشرق الأوسط (البحرين)'
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      logo: '🔵',
      status: 'connected',
      services: 8,
      cost: 1850,
      uptime: 99.8,
      region: 'الإمارات العربية المتحدة'
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      logo: '🔴',
      status: 'disconnected',
      services: 0,
      cost: 0,
      uptime: 0,
      region: 'غير محدد'
    },
    {
      id: 'oracle',
      name: 'Oracle Cloud',
      logo: '🟡',
      status: 'pending',
      services: 3,
      cost: 890,
      uptime: 99.7,
      region: 'المملكة العربية السعودية'
    }
  ];

  const stats = [
    {
      title: 'إجمالي الخدمات السحابية',
      value: '23',
      change: '+5',
      icon: Cloud,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'التكلفة الشهرية',
      value: '5,190 ريال',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'وقت التشغيل المتوسط',
      value: '99.8%',
      change: '+0.1%',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'نقل البيانات الشهري',
      value: '2.4 TB',
      change: '+18.2%',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const services = [
    {
      name: 'قاعدة البيانات الرئيسية',
      provider: 'AWS RDS',
      type: 'database',
      status: 'running',
      cost: 890,
      usage: 78,
      region: 'me-south-1'
    },
    {
      name: 'خادم التطبيقات',
      provider: 'AWS EC2',
      type: 'compute',
      status: 'running',
      cost: 650,
      usage: 65,
      region: 'me-south-1'
    },
    {
      name: 'تخزين الملفات',
      provider: 'AWS S3',
      type: 'storage',
      status: 'running',
      cost: 320,
      usage: 45,
      region: 'me-south-1'
    },
    {
      name: 'شبكة التوصيل',
      provider: 'AWS CloudFront',
      type: 'network',
      status: 'running',
      cost: 180,
      usage: 82,
      region: 'global'
    },
    {
      name: 'النسخ الاحتياطي',
      provider: 'Azure Backup',
      type: 'backup',
      status: 'running',
      cost: 450,
      usage: 92,
      region: 'uae-north'
    },
    {
      name: 'مراقبة الأداء',
      provider: 'Azure Monitor',
      type: 'monitoring',
      status: 'running',
      cost: 280,
      usage: 88,
      region: 'uae-north'
    },
    {
      name: 'الذكاء الاصطناعي',
      provider: 'Azure AI',
      type: 'ai',
      status: 'stopped',
      cost: 0,
      usage: 0,
      region: 'uae-north'
    },
    {
      name: 'إدارة الهوية',
      provider: 'Oracle Identity',
      type: 'security',
      status: 'pending',
      cost: 340,
      usage: 55,
      region: 'sa-riyadh-1'
    }
  ];

  const integrations = [
    {
      name: 'Salesforce CRM',
      type: 'CRM',
      status: 'active',
      lastSync: '2025-08-04 14:30',
      records: 15420,
      errors: 0
    },
    {
      name: 'QuickBooks Online',
      type: 'Accounting',
      status: 'active',
      lastSync: '2025-08-04 13:45',
      records: 8750,
      errors: 2
    },
    {
      name: 'Shopify Store',
      type: 'E-commerce',
      status: 'active',
      lastSync: '2025-08-04 15:15',
      records: 3420,
      errors: 0
    },
    {
      name: 'Mailchimp',
      type: 'Marketing',
      status: 'warning',
      lastSync: '2025-08-04 12:20',
      records: 12500,
      errors: 5
    },
    {
      name: 'Slack Workspace',
      type: 'Communication',
      status: 'inactive',
      lastSync: '2025-08-03 18:30',
      records: 0,
      errors: 1
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

      {/* Cloud Providers */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مقدمو الخدمات السحابية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {providers.map((provider) => (
            <div key={provider.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-2xl">{provider.logo}</span>
                  <div>
                    <h4 className="font-medium text-sm">{provider.name}</h4>
                    <p className="text-xs text-gray-500">{provider.region}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  provider.status === 'connected' ? 'bg-green-100 text-green-800' :
                  provider.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {provider.status === 'connected' ? 'متصل' :
                   provider.status === 'pending' ? 'معلق' : 'غير متصل'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الخدمات</span>
                  <span className="font-medium">{provider.services}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التكلفة</span>
                  <span className="font-medium">{provider.cost} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وقت التشغيل</span>
                  <span className="font-medium">{provider.uptime}%</span>
                </div>
              </div>

              <button className="w-full mt-3 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700">
                إدارة
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="text-center">
              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">إضافة خدمة سحابية</p>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <Sync className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">مزامنة البيانات</p>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600">فحص الأمان</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      {/* Services Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">إدارة الخدمات السحابية</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 ml-2" />
            إضافة خدمة جديدة
          </button>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'running' ? 'bg-green-500' :
                    service.status === 'stopped' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.provider} • {service.region}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.status === 'running' ? 'bg-green-100 text-green-800' :
                    service.status === 'stopped' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {service.status === 'running' ? 'يعمل' :
                     service.status === 'stopped' ? 'متوقف' : 'معلق'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{service.cost} ريال</p>
                  <p className="text-sm text-gray-600">التكلفة الشهرية</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{service.usage}%</p>
                  <p className="text-sm text-gray-600">الاستخدام</p>
                </div>
                <div className="text-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${service.usage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">الأداء</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-1 space-x-reverse">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      {/* Third-party Integrations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">التكاملات مع الأطراف الثالثة</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 ml-2" />
            إضافة تكامل جديد
          </button>
        </div>

        <div className="space-y-4">
          {integrations.map((integration, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${
                    integration.status === 'active' ? 'bg-green-500' :
                    integration.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{integration.name}</h4>
                    <p className="text-sm text-gray-600">{integration.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    integration.status === 'active' ? 'bg-green-100 text-green-800' :
                    integration.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {integration.status === 'active' ? 'نشط' :
                     integration.status === 'warning' ? 'تحذير' : 'غير نشط'}
                  </span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                    <Sync className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{integration.records.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">السجلات المزامنة</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{integration.lastSync}</p>
                  <p className="text-sm text-gray-600">آخر مزامنة</p>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-bold ${integration.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {integration.errors}
                  </p>
                  <p className="text-sm text-gray-600">الأخطاء</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-1 space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Settings className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-green-50 rounded-lg mb-3 inline-block">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">100%</p>
          <p className="text-sm text-gray-600">التشفير</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-blue-50 rounded-lg mb-3 inline-block">
            <Key className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">45</p>
          <p className="text-sm text-gray-600">مفاتيح API</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-purple-50 rounded-lg mb-3 inline-block">
            <Lock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24/7</p>
          <p className="text-sm text-gray-600">المراقبة</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="p-3 bg-orange-50 rounded-lg mb-3 inline-block">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600">التهديدات الحالية</p>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">سياسات الأمان</h3>
        <div className="space-y-4">
          {[
            { name: 'تشفير البيانات', status: 'enabled', description: 'تشفير جميع البيانات أثناء النقل والتخزين' },
            { name: 'المصادقة الثنائية', status: 'enabled', description: 'مطلوبة لجميع المستخدمين الإداريين' },
            { name: 'مراقبة الوصول', status: 'enabled', description: 'تسجيل جميع محاولات الوصول والأنشطة' },
            { name: 'النسخ الاحتياطي الآمن', status: 'enabled', description: 'نسخ احتياطية مشفرة كل 6 ساعات' },
            { name: 'فحص الثغرات', status: 'warning', description: 'فحص أسبوعي للثغرات الأمنية' },
            { name: 'جدار الحماية', status: 'enabled', description: 'حماية متقدمة ضد الهجمات' }
          ].map((policy, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className={`w-3 h-3 rounded-full ${
                  policy.status === 'enabled' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <h4 className="font-medium">{policy.name}</h4>
                  <p className="text-sm text-gray-600">{policy.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  policy.status === 'enabled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {policy.status === 'enabled' ? 'مفعل' : 'تحذير'}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Cloud },
    { id: 'services', name: 'الخدمات', icon: Server },
    { id: 'integrations', name: 'التكاملات', icon: Sync },
    { id: 'security', name: 'الأمان', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">التكامل السحابي</h1>
              <p className="text-gray-600 mt-2">إدارة الخدمات السحابية والتكاملات مع الأطراف الثالثة</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <select 
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="aws">Amazon AWS</option>
                <option value="azure">Microsoft Azure</option>
                <option value="gcp">Google Cloud</option>
                <option value="oracle">Oracle Cloud</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث الحالة
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
          {activeTab === 'services' && renderServices()}
          {activeTab === 'integrations' && renderIntegrations()}
          {activeTab === 'security' && renderSecurity()}
        </div>
      </div>
    </div>
  );
};

export default CloudIntegration;

