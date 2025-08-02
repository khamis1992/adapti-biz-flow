import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Link, 
  Globe, 
  Database,
  Cloud,
  Smartphone,
  Mail,
  MessageSquare,
  CreditCard,
  Truck,
  BarChart3,
  Shield,
  Key,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  Activity,
  TrendingUp,
  Users,
  FileText,
  Package,
  DollarSign,
  Calendar,
  Bell,
  Webhook,
  Code,
  Server,
  Monitor
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const SystemIntegrations = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية للتكاملات
  const integrations = [
    {
      id: 1,
      name: 'SAP ERP',
      category: 'أنظمة تخطيط الموارد',
      type: 'ERP',
      status: 'متصل',
      lastSync: '2024-08-05 14:30',
      syncFrequency: 'كل ساعة',
      dataExchanged: '2.5 GB',
      uptime: '99.8%',
      description: 'تكامل مع نظام SAP لمزامنة البيانات المالية والمحاسبية',
      endpoints: [
        { name: 'Financial Data', url: '/api/sap/financial', status: 'نشط' },
        { name: 'Customer Data', url: '/api/sap/customers', status: 'نشط' },
        { name: 'Inventory Data', url: '/api/sap/inventory', status: 'نشط' }
      ],
      features: ['مزامنة البيانات المالية', 'تبادل بيانات العملاء', 'إدارة المخزون']
    },
    {
      id: 2,
      name: 'Salesforce CRM',
      category: 'إدارة علاقات العملاء',
      type: 'CRM',
      status: 'متصل',
      lastSync: '2024-08-05 15:45',
      syncFrequency: 'كل 30 دقيقة',
      dataExchanged: '1.8 GB',
      uptime: '99.5%',
      description: 'تكامل مع Salesforce لإدارة العملاء والفرص التجارية',
      endpoints: [
        { name: 'Leads', url: '/api/salesforce/leads', status: 'نشط' },
        { name: 'Opportunities', url: '/api/salesforce/opportunities', status: 'نشط' },
        { name: 'Accounts', url: '/api/salesforce/accounts', status: 'نشط' }
      ],
      features: ['إدارة العملاء المحتملين', 'تتبع الفرص', 'تحليل المبيعات']
    },
    {
      id: 3,
      name: 'WhatsApp Business API',
      category: 'التواصل والرسائل',
      type: 'Communication',
      status: 'متصل',
      lastSync: '2024-08-05 16:20',
      syncFrequency: 'فوري',
      dataExchanged: '450 MB',
      uptime: '99.9%',
      description: 'تكامل مع WhatsApp لإرسال الإشعارات والرسائل للعملاء',
      endpoints: [
        { name: 'Send Message', url: '/api/whatsapp/send', status: 'نشط' },
        { name: 'Receive Webhook', url: '/api/whatsapp/webhook', status: 'نشط' }
      ],
      features: ['إرسال الإشعارات', 'رسائل تأكيد الطلبات', 'دعم العملاء']
    },
    {
      id: 4,
      name: 'PayPal Payment Gateway',
      category: 'المدفوعات المالية',
      type: 'Payment',
      status: 'متصل',
      lastSync: '2024-08-05 13:15',
      syncFrequency: 'فوري',
      dataExchanged: '320 MB',
      uptime: '99.7%',
      description: 'تكامل مع PayPal لمعالجة المدفوعات الإلكترونية',
      endpoints: [
        { name: 'Process Payment', url: '/api/paypal/payment', status: 'نشط' },
        { name: 'Refund', url: '/api/paypal/refund', status: 'نشط' },
        { name: 'Webhook', url: '/api/paypal/webhook', status: 'نشط' }
      ],
      features: ['معالجة المدفوعات', 'إدارة المرتجعات', 'تتبع المعاملات']
    },
    {
      id: 5,
      name: 'DHL Shipping API',
      category: 'الشحن واللوجستيات',
      type: 'Logistics',
      status: 'متصل',
      lastSync: '2024-08-05 12:45',
      syncFrequency: 'كل 15 دقيقة',
      dataExchanged: '680 MB',
      uptime: '98.9%',
      description: 'تكامل مع DHL لإدارة الشحنات وتتبع الطلبات',
      endpoints: [
        { name: 'Create Shipment', url: '/api/dhl/shipment', status: 'نشط' },
        { name: 'Track Package', url: '/api/dhl/track', status: 'نشط' },
        { name: 'Rate Calculator', url: '/api/dhl/rates', status: 'نشط' }
      ],
      features: ['إنشاء الشحنات', 'تتبع الطرود', 'حساب التكاليف']
    },
    {
      id: 6,
      name: 'Google Analytics',
      category: 'التحليلات والتقارير',
      type: 'Analytics',
      status: 'غير متصل',
      lastSync: '2024-08-03 09:20',
      syncFrequency: 'يومي',
      dataExchanged: '1.2 GB',
      uptime: '95.2%',
      description: 'تكامل مع Google Analytics لتحليل أداء الموقع والتطبيق',
      endpoints: [
        { name: 'Website Analytics', url: '/api/ga/website', status: 'خطأ' },
        { name: 'E-commerce Tracking', url: '/api/ga/ecommerce', status: 'خطأ' }
      ],
      features: ['تحليل الزوار', 'تتبع التحويلات', 'تقارير الأداء']
    }
  ];

  // بيانات واجهات برمجة التطبيقات
  const apiEndpoints = [
    {
      id: 1,
      name: 'Customer Management API',
      method: 'GET',
      endpoint: '/api/v1/customers',
      description: 'استرجاع قائمة العملاء',
      status: 'نشط',
      responseTime: '120ms',
      requestsToday: 1250,
      errorRate: '0.2%'
    },
    {
      id: 2,
      name: 'Order Processing API',
      method: 'POST',
      endpoint: '/api/v1/orders',
      description: 'إنشاء طلب جديد',
      status: 'نشط',
      responseTime: '85ms',
      requestsToday: 890,
      errorRate: '0.1%'
    },
    {
      id: 3,
      name: 'Inventory Check API',
      method: 'GET',
      endpoint: '/api/v1/inventory/{id}',
      description: 'فحص توفر المنتج',
      status: 'نشط',
      responseTime: '95ms',
      requestsToday: 2150,
      errorRate: '0.3%'
    },
    {
      id: 4,
      name: 'Payment Processing API',
      method: 'POST',
      endpoint: '/api/v1/payments',
      description: 'معالجة الدفعات',
      status: 'بطيء',
      responseTime: '450ms',
      requestsToday: 320,
      errorRate: '1.2%'
    },
    {
      id: 5,
      name: 'Notification API',
      method: 'POST',
      endpoint: '/api/v1/notifications',
      description: 'إرسال الإشعارات',
      status: 'خطأ',
      responseTime: '0ms',
      requestsToday: 0,
      errorRate: '100%'
    }
  ];

  // بيانات Webhooks
  const webhooks = [
    {
      id: 1,
      name: 'Order Status Update',
      url: 'https://api.partner.com/webhooks/order-status',
      events: ['order.created', 'order.updated', 'order.cancelled'],
      status: 'نشط',
      lastTriggered: '2024-08-05 16:30',
      successRate: '98.5%',
      totalCalls: 1250
    },
    {
      id: 2,
      name: 'Payment Confirmation',
      url: 'https://payments.gateway.com/webhook',
      events: ['payment.completed', 'payment.failed', 'payment.refunded'],
      status: 'نشط',
      lastTriggered: '2024-08-05 15:45',
      successRate: '99.2%',
      totalCalls: 890
    },
    {
      id: 3,
      name: 'Inventory Alert',
      url: 'https://inventory.system.com/alerts',
      events: ['inventory.low', 'inventory.out'],
      status: 'معطل',
      lastTriggered: '2024-08-03 10:20',
      successRate: '85.3%',
      totalCalls: 45
    }
  ];

  // بيانات تحليل الأداء
  const performanceAnalytics = [
    { month: 'يناير', requests: 45000, errors: 120, uptime: 99.8 },
    { month: 'فبراير', requests: 52000, errors: 95, uptime: 99.9 },
    { month: 'مارس', requests: 48000, errors: 110, uptime: 99.7 },
    { month: 'أبريل', requests: 61000, errors: 85, uptime: 99.9 },
    { month: 'مايو', requests: 55000, errors: 75, uptime: 99.8 },
    { month: 'يونيو', requests: 68000, errors: 90, uptime: 99.9 }
  ];

  // بيانات توزيع التكاملات
  const integrationDistribution = [
    { category: 'أنظمة تخطيط الموارد', count: 3, percentage: 25 },
    { category: 'إدارة علاقات العملاء', count: 2, percentage: 17 },
    { category: 'المدفوعات المالية', count: 4, percentage: 33 },
    { category: 'الشحن واللوجستيات', count: 2, percentage: 17 },
    { category: 'التحليلات والتقارير', count: 1, percentage: 8 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متصل': case 'نشط': return 'bg-green-100 text-green-800';
      case 'غير متصل': case 'خطأ': case 'معطل': return 'bg-red-100 text-red-800';
      case 'بطيء': case 'تحذير': return 'bg-yellow-100 text-yellow-800';
      case 'قيد الاختبار': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'ERP': return <Database className="h-5 w-5 text-blue-600" />;
      case 'CRM': return <Users className="h-5 w-5 text-green-600" />;
      case 'Communication': return <MessageSquare className="h-5 w-5 text-purple-600" />;
      case 'Payment': return <CreditCard className="h-5 w-5 text-yellow-600" />;
      case 'Logistics': return <Truck className="h-5 w-5 text-orange-600" />;
      case 'Analytics': return <BarChart3 className="h-5 w-5 text-pink-600" />;
      default: return <Link className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">التكاملات المتقدمة</h1>
          <p className="text-gray-600 mt-2">إدارة التكاملات مع الأنظمة الخارجية وواجهات برمجة التطبيقات</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            تكامل جديد
          </Button>
          <Button variant="outline">
            <Code className="w-4 h-4 ml-2" />
            API جديد
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 ml-2" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التكاملات النشطة</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 ml-1" />
                  10 متصلة
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Link className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">طلبات API اليوم</p>
                <p className="text-2xl font-bold text-gray-900">4,610</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +15% من أمس
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
                <p className="text-2xl font-bold text-gray-900">99.2%</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Shield className="w-3 h-3 ml-1" />
                  موثوق
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط وقت الاستجابة</p>
                <p className="text-2xl font-bold text-gray-900">150ms</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Clock className="w-3 h-3 ml-1" />
                  سريع
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="integrations">التكاملات</TabsTrigger>
          <TabsTrigger value="apis">واجهات API</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="monitoring">المراقبة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أداء التكاملات الشهري</CardTitle>
                <CardDescription>طلبات API ومعدل الأخطاء</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#3b82f6" name="الطلبات" />
                    <Bar dataKey="errors" fill="#ef4444" name="الأخطاء" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع التكاملات حسب الفئة</CardTitle>
                <CardDescription>أنواع التكاملات المختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrationDistribution.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{integration.category}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${integration.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-blue-600">{integration.count}</p>
                        <p className="text-sm text-gray-600">{integration.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* التكاملات النشطة */}
          <Card>
            <CardHeader>
              <CardTitle>التكاملات النشطة</CardTitle>
              <CardDescription>حالة التكاملات الحالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.filter(integration => integration.status === 'متصل').slice(0, 6).map((integration) => (
                  <Card key={integration.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {getIntegrationIcon(integration.type)}
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.category}</p>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">وقت التشغيل:</span>
                          <span className="font-medium">{integration.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">آخر مزامنة:</span>
                          <span className="font-medium">{integration.lastSync}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التكاملات */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة التكاملات</CardTitle>
                  <CardDescription>جميع التكاملات مع الأنظمة الخارجية</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    تكامل جديد
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 ml-2" />
                    تحديث الكل
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input placeholder="البحث في التكاملات..." className="w-full" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 ml-2" />
                  فلترة
                </Button>
              </div>

              <div className="space-y-4">
                {integrations.map((integration) => (
                  <Card key={integration.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getIntegrationIcon(integration.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{integration.name}</h3>
                              <Badge className={getStatusColor(integration.status)}>
                                {integration.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{integration.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">الفئة: {integration.category}</p>
                                <p className="text-gray-600">تكرار المزامنة: {integration.syncFrequency}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">البيانات المتبادلة: {integration.dataExchanged}</p>
                                <p className="text-gray-600">وقت التشغيل: {integration.uptime}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">آخر مزامنة: {integration.lastSync}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* نقاط النهاية */}
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-3">نقاط النهاية:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {integration.endpoints.map((endpoint, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <p className="font-medium text-sm">{endpoint.name}</p>
                                <p className="text-xs text-gray-600">{endpoint.url}</p>
                              </div>
                              <Badge className={getStatusColor(endpoint.status)} variant="outline">
                                {endpoint.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* واجهات API */}
        <TabsContent value="apis" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>واجهات برمجة التطبيقات</CardTitle>
                  <CardDescription>إدارة ومراقبة واجهات API</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    API جديد
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 ml-2" />
                    التوثيق
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">الاسم</th>
                      <th className="text-right p-3 font-medium">الطريقة</th>
                      <th className="text-right p-3 font-medium">نقطة النهاية</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">وقت الاستجابة</th>
                      <th className="text-right p-3 font-medium">الطلبات اليوم</th>
                      <th className="text-right p-3 font-medium">معدل الخطأ</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiEndpoints.map((api) => (
                      <tr key={api.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{api.name}</td>
                        <td className="p-3">
                          <Badge className={getMethodColor(api.method)}>
                            {api.method}
                          </Badge>
                        </td>
                        <td className="p-3 font-mono text-sm">{api.endpoint}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(api.status)}>
                            {api.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">{api.responseTime}</td>
                        <td className="p-3 text-center">{api.requestsToday.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <span className={`font-medium ${
                            parseFloat(api.errorRate) < 1 ? 'text-green-600' : 
                            parseFloat(api.errorRate) < 5 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {api.errorRate}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Activity className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks */}
        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة Webhooks</CardTitle>
                  <CardDescription>تكوين ومراقبة Webhooks</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  Webhook جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <Card key={webhook.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{webhook.name}</h3>
                            <Badge className={getStatusColor(webhook.status)}>
                              {webhook.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{webhook.url}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">آخر تشغيل:</p>
                              <p className="font-medium">{webhook.lastTriggered}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">معدل النجاح:</p>
                              <p className="font-medium text-green-600">{webhook.successRate}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">إجمالي الاستدعاءات:</p>
                              <p className="font-medium">{webhook.totalCalls}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">الأحداث:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {webhook.events.map((event, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {event}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* المراقبة */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">حالة النظام</p>
                  <p className="text-2xl font-bold text-green-600">تشغيل</p>
                  <p className="text-xs text-gray-500 mt-1">99.9% وقت التشغيل</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">متوسط الاستجابة</p>
                  <p className="text-2xl font-bold text-blue-600">150ms</p>
                  <p className="text-xs text-gray-500 mt-1">آخر 24 ساعة</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">الطلبات النشطة</p>
                  <p className="text-2xl font-bold text-purple-600">45</p>
                  <p className="text-xs text-gray-500 mt-1">في الوقت الحالي</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">معدل الخطأ</p>
                  <p className="text-2xl font-bold text-yellow-600">0.8%</p>
                  <p className="text-xs text-gray-500 mt-1">آخر ساعة</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مراقبة الأداء المباشر</CardTitle>
              <CardDescription>حالة التكاملات والواجهات في الوقت الفعلي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.slice(0, 5).map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getIntegrationIcon(integration.type)}
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-gray-600">آخر مزامنة: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">وقت التشغيل</p>
                        <p className="font-bold text-green-600">{integration.uptime}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">البيانات</p>
                        <p className="font-bold">{integration.dataExchanged}</p>
                      </div>
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه وقت التشغيل</CardTitle>
                <CardDescription>وقت التشغيل عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="uptime" stroke="#10b981" name="وقت التشغيل %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء واجهات API</CardTitle>
                <CardDescription>أوقات الاستجابة ومعدلات الخطأ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.slice(0, 5).map((api) => (
                    <div key={api.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{api.name}</p>
                        <p className="text-sm text-gray-600">{api.endpoint}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold">{api.responseTime}</p>
                        <p className={`text-sm ${
                          parseFloat(api.errorRate) < 1 ? 'text-green-600' : 
                          parseFloat(api.errorRate) < 5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          خطأ: {api.errorRate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>ملخص شامل لأداء التكاملات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">99.2%</p>
                  <p className="text-sm text-gray-600">معدل النجاح الإجمالي</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">150ms</p>
                  <p className="text-sm text-gray-600">متوسط وقت الاستجابة</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">68K</p>
                  <p className="text-sm text-gray-600">طلبات هذا الشهر</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                  <p className="text-sm text-gray-600">تكاملات نشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemIntegrations;

