import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Car, 
  Users, 
  FileText, 
  DollarSign, 
  Settings, 
  UserPlus,
  Calendar,
  ClipboardList,
  TrendingUp,
  BarChart3,
  Plus,
  Package,
  ShoppingCart,
  FolderKanban,
  Truck,
  Calculator,
  UserCheck,
  CreditCard,
  Clock,
  Receipt,
  Briefcase,
  ChefHat,
  Utensils,
  Building2,
  Warehouse,
  Factory,
  Shield,
  Zap,
  Bell,
  Search,
  Filter,
  Menu,
  X,
  Home,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowLeft,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useModules } from '@/contexts/ModuleContext';
import { useModuleIntegration } from '@/hooks/useModuleIntegration';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { signOut } = useAuth();
  const { tenant, modules, loading, dashboardData } = useTenant();
  const { state: moduleState, isModuleEnabled, getIntegratedData } = useModules();
  const moduleIntegration = useModuleIntegration();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter enabled modules from tenant data
  const enabledModules = modules.filter(m => m.is_enabled && isModuleEnabled(m.module_id));

  // Module categories for filtering
  const moduleCategories = [
    { id: 'all', name: 'جميع الوحدات', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'core', name: 'الوحدات الأساسية', icon: <Home className="h-4 w-4" /> },
    { id: 'financial', name: 'المالية والمحاسبة', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'operations', name: 'العمليات التشغيلية', icon: <Settings className="h-4 w-4" /> },
    { id: 'hr', name: 'الموارد البشرية', icon: <Users className="h-4 w-4" /> },
    { id: 'customer', name: 'خدمة العملاء', icon: <UserCheck className="h-4 w-4" /> },
    { id: 'advanced', name: 'الوحدات المتقدمة', icon: <Zap className="h-4 w-4" /> }
  ];

  const getModuleIcon = (moduleId: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'fleet': <Truck className="h-6 w-6" />,
      'customers': <Users className="h-6 w-6" />,
      'contracts': <FileText className="h-6 w-6" />,
      'accounting': <Calculator className="h-6 w-6" />,
      'hr': <UserCheck className="h-6 w-6" />,
      'payroll': <CreditCard className="h-6 w-6" />,
      'attendance': <Clock className="h-6 w-6" />,
      'leaves': <Calendar className="h-6 w-6" />,
      'financial-reports': <TrendingUp className="h-6 w-6" />,
      'inventory': <Package className="h-6 w-6" />,
      'purchasing': <ShoppingCart className="h-6 w-6" />,
      'invoices': <Receipt className="h-6 w-6" />,
      'projects': <Briefcase className="h-6 w-6" />,
      'analytics': <BarChart3 className="h-6 w-6" />,
      'bookings': <Calendar className="h-6 w-6" />,
      'delivery': <Truck className="h-6 w-6" />,
      'kitchen': <ChefHat className="h-6 w-6" />,
      'menu': <Utensils className="h-6 w-6" />,
      'orders': <ClipboardList className="h-6 w-6" />,
      'payments': <CreditCard className="h-6 w-6" />,
      'pos': <ShoppingCart className="h-6 w-6" />
    };
    return iconMap[moduleId] || <Settings className="h-6 w-6" />;
  };

  const getModuleName = (moduleId: string) => {
    const moduleNames: Record<string, string> = {
      'fleet': 'إدارة الأسطول',
      'customers': 'إدارة العملاء',
      'contracts': 'إدارة العقود',
      'accounting': 'المحاسبة المالية',
      'hr': 'الموارد البشرية',
      'payroll': 'نظام الرواتب',
      'attendance': 'الحضور والانصراف',
      'leaves': 'إدارة الإجازات',
      'financial-reports': 'التقارير المالية',
      'inventory': 'إدارة المخزون',
      'purchasing': 'إدارة المشتريات',
      'invoices': 'إدارة الفواتير',
      'projects': 'إدارة المشاريع',
      'analytics': 'التحليلات والتقارير',
      'bookings': 'نظام الحجوزات',
      'delivery': 'إدارة التوصيل',
      'kitchen': 'إدارة المطبخ',
      'menu': 'إدارة القائمة',
      'orders': 'إدارة الطلبات',
      'payments': 'إدارة المدفوعات',
      'pos': 'نقاط البيع'
    };
    return moduleNames[moduleId] || moduleId;
  };

  const getModuleCategory = (moduleId: string) => {
    const categories: Record<string, string> = {
      'customers': 'core',
      'contracts': 'core',
      'bookings': 'core',
      'accounting': 'financial',
      'financial-reports': 'financial',
      'invoices': 'financial',
      'payroll': 'financial',
      'payments': 'financial',
      'fleet': 'operations',
      'inventory': 'operations',
      'purchasing': 'operations',
      'projects': 'operations',
      'delivery': 'operations',
      'kitchen': 'operations',
      'hr': 'hr',
      'attendance': 'hr',
      'leaves': 'hr',
      'analytics': 'advanced',
      'menu': 'customer',
      'orders': 'customer',
      'pos': 'customer'
    };
    return categories[moduleId] || 'core';
  };

  const getModuleRoute = (moduleId: string) => {
    const routes: Record<string, string> = {
      'fleet': '/fleet',
      'customers': '/customers',
      'contracts': '/contracts',
      'accounting': '/accounting',
      'hr': '/hr',
      'payroll': '/payroll',
      'attendance': '/attendance',
      'leaves': '/leaves',
      'financial-reports': '/financial-reports',
      'inventory': '/inventory',
      'purchasing': '/purchasing',
      'invoices': '/invoices',
      'projects': '/projects',
      'analytics': '/analytics',
      'bookings': '/bookings',
      'delivery': '/delivery',
      'kitchen': '/kitchen',
      'menu': '/menu',
      'orders': '/orders',
      'payments': '/payments',
      'pos': '/pos'
    };
    return routes[moduleId] || `/${moduleId}`;
  };

  // Filter modules based on search and category
  const filteredModules = enabledModules.filter(module => {
    const matchesSearch = getModuleName(module.module_id).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || getModuleCategory(module.module_id) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get integration status for modules
  const getIntegrationStatus = (moduleId: string) => {
    const integrations = moduleState.integrations.filter(
      i => i.sourceModule === moduleId || i.targetModule === moduleId
    );
    return integrations.length;
  };

  // Get module statistics
  const getModuleStats = (moduleId: string) => {
    const data = getIntegratedData(moduleId);
    return {
      totalRecords: Object.keys(data).length,
      lastUpdated: new Date().toLocaleDateString('ar-SA'),
      integrations: getIntegrationStatus(moduleId)
    };
  };

  // Quick actions data
  const quickActions = [
    { id: 'new-invoice', name: 'فاتورة جديدة', icon: <Receipt className="h-4 w-4" />, route: '/invoices/new' },
    { id: 'new-customer', name: 'عميل جديد', icon: <UserPlus className="h-4 w-4" />, route: '/customers/new' },
    { id: 'new-contract', name: 'عقد جديد', icon: <FileText className="h-4 w-4" />, route: '/contracts/new' },
    { id: 'new-project', name: 'مشروع جديد', icon: <FolderKanban className="h-4 w-4" />, route: '/projects/new' },
    { id: 'add-vehicle', name: 'إضافة مركبة', icon: <Car className="h-4 w-4" />, route: '/fleet/new' },
    { id: 'new-payment', name: 'دفعة جديدة', icon: <CreditCard className="h-4 w-4" />, route: '/payments/new' },
    { id: 'leave-request', name: 'طلب إجازة', icon: <Calendar className="h-4 w-4" />, route: '/leaves/new' },
    { id: 'add-product', name: 'إضافة منتج', icon: <Package className="h-4 w-4" />, route: '/inventory/new' }
  ];

  // System alerts data
  const systemAlerts = [
    {
      id: 1,
      title: 'دفعات متأخرة',
      description: '5 فواتير متأخرة السداد تتطلب متابعة فورية',
      type: 'high',
      action: 'يتطلب إجراء',
      time: 'منذ 561 يوم'
    },
    {
      id: 2,
      title: 'عقود منتهية الصلاحية',
      description: '3 عقود ستنتهي خلال الأسبوع القادم',
      type: 'medium',
      action: 'يتطلب إجراء',
      time: 'منذ 561 يوم'
    },
    {
      id: 3,
      title: 'صيانة مستحقة',
      description: '7 مركبات تحتاج صيانة دورية',
      type: 'medium',
      action: 'يتطلب إجراء',
      time: 'منذ 561 يوم'
    },
    {
      id: 4,
      title: 'مخزون منخفض',
      description: 'نفاد مخزون قطع الغيار الأساسية',
      type: 'high',
      action: 'يتطلب إجراء',
      time: 'منذ 562 يوم'
    },
    {
      id: 5,
      title: 'تحديث النظام',
      description: 'تحديث جديد متاح للنظام',
      type: 'low',
      action: '',
      time: 'منذ 562 يوم'
    }
  ];

  // Payment notifications data
  const paymentNotifications = [
    {
      id: 1,
      title: 'تم استلام دفعة جديدة',
      description: 'تم استلام دفعة من أحمد محمد الكندري',
      details: {
        invoice: 'INV-202501-0001',
        customer: 'أحمد محمد الكندري',
        amount: '500.000 د.ك.'
      },
      priority: 'عالية',
      time: 'منذ أقل من ساعة'
    },
    {
      id: 2,
      title: 'فاتورة متأخرة',
      description: 'الفاتورة INV-202501-0002 متأخرة منذ 5 أيام',
      details: {
        invoice: 'INV-202501-0002',
        customer: 'سارة أحمد العنزي',
        amount: '750.000 د.ك.'
      },
      priority: 'عالية',
      time: 'منذ 2 ساعة'
    },
    {
      id: 3,
      title: 'تذكير بموعد الدفع',
      description: 'تستحق الفاتورة INV-202501-0003 خلال 3 أيام',
      details: {
        invoice: 'INV-202501-0003',
        customer: 'محمد خالد الرشيد',
        amount: '1,200.000 د.ك.'
      },
      priority: 'متوسطة',
      time: 'منذ 1 ساعة'
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      title: 'فاتورة جديدة',
      description: 'تم إنشاء فاتورة INV-2024-001 للعميل أحمد الكندري',
      amount: '175.000 د.ك.',
      time: 'منذ 561 يوم'
    },
    {
      id: 2,
      title: 'دفعة مستلمة',
      description: 'تم استلام دفعة من شركة الخليج للتجارة',
      amount: '1,500.000 د.ك.',
      time: 'منذ 561 يوم'
    },
    {
      id: 3,
      title: 'عميل جديد',
      description: 'تم تسجيل عميل جديد: محمد سالم الرشيد',
      time: 'منذ 561 يوم'
    },
    {
      id: 4,
      title: 'صيانة مركبة',
      description: 'تم جدولة صيانة للمركبة ABC-123',
      time: 'منذ 562 يوم'
    },
    {
      id: 5,
      title: 'عقد منتهي الصلاحية',
      description: 'العقد CNT-2024-005 سينتهي خلال 3 أيام',
      time: 'منذ 562 يوم'
    },
    {
      id: 6,
      title: 'مشروع مكتمل',
      description: 'تم إكمال مشروع تطوير النظام المحاسبي',
      time: 'منذ 562 يوم'
    },
    {
      id: 7,
      title: 'تنبيه مخزون',
      description: 'مستوى المخزون منخفض لقطع الغيار',
      time: 'منذ 562 يوم'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Right Sidebar */}
      <div className="fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-200 shadow-lg z-50">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">الوحدات المفعلة</h2>
          <p className="text-sm text-gray-600">{enabledModules.length} وحدة نشطة</p>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          <div className="p-4 space-y-2">
            {/* Dashboard Link */}
            <Button
              variant="ghost"
              className="w-full justify-start text-right h-12 bg-blue-50 text-blue-700 border border-blue-200"
              onClick={() => navigate('/dashboard')}
            >
              <Home className="h-5 w-5 ml-3" />
              لوحة التحكم
            </Button>

            {/* Module Links */}
            {enabledModules.map((module) => (
              <Button
                key={module.module_id}
                variant="ghost"
                className="w-full justify-start text-right h-12 hover:bg-gray-100"
                onClick={() => navigate(getModuleRoute(module.module_id))}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {getModuleIcon(module.module_id)}
                    <span className="mr-3">{getModuleName(module.module_id)}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {getModuleCategory(module.module_id)}
                  </Badge>
                </div>
              </Button>
            ))}

            {/* Settings Link */}
            <Button
              variant="ghost"
              className="w-full justify-start text-right h-12 hover:bg-gray-100"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5 ml-3" />
              الإعدادات
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mr-64 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{tenant.name}</h1>
                <p className="text-gray-600">لوحة التحكم الرئيسية</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={signOut}>
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="hover:shadow-lg transition-shadow border-r-4 border-r-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">الوحدات المفعلة</CardTitle>
                <Activity className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{enabledModules.length}</div>
                <p className="text-xs text-gray-500">من إجمالي {modules.length} وحدة</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-r-4 border-r-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">التكاملات النشطة</CardTitle>
                <Zap className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{moduleState.integrations.length}</div>
                <p className="text-xs text-gray-500">تكامل ذكي بين الوحدات</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-r-4 border-r-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">العملاء</CardTitle>
                <Users className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-3xl font-bold text-purple-600">{dashboardData?.customers_count || 0}</div>
                )}
                <p className="text-xs text-gray-500">إجمالي العملاء</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-r-4 border-r-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">العقود النشطة</CardTitle>
                <FileText className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-3xl font-bold text-orange-600">{dashboardData?.active_contracts || 0}</div>
                )}
                <p className="text-xs text-gray-500">عقد نشط</p>
              </CardContent>
            </Card>
          </div>

          {/* Module Search and Filter */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                البحث والفلترة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="البحث في الوحدات..."
                      className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {moduleCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      {category.icon}
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modules Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {filteredModules.map((module) => {
              const stats = getModuleStats(module.module_id);
              return (
                <Card key={module.module_id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          {getModuleIcon(module.module_id)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{getModuleName(module.module_id)}</CardTitle>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {getModuleCategory(module.module_id)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">السجلات:</span>
                        <span className="font-medium">{stats.totalRecords}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">التكاملات:</span>
                        <span className="font-medium">{stats.integrations}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">آخر تحديث:</span>
                        <span className="font-medium">{stats.lastUpdated}</span>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate(getModuleRoute(module.module_id))}
                        >
                          <Eye className="h-4 w-4 ml-2" />
                          فتح الوحدة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                إجراءات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="h-12 justify-start"
                    onClick={() => navigate(action.route)}
                  >
                    {action.icon}
                    <span className="mr-2">{action.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom Section - Alerts and Notifications */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    تنبيهات النظام
                  </div>
                  <Badge variant="destructive">{systemAlerts.filter(a => a.type === 'high').length}</Badge>
                </CardTitle>
                <p className="text-sm text-gray-600">{systemAlerts.filter(a => a.action).length} عالية الأولوية</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge 
                        variant={alert.type === 'high' ? 'destructive' : alert.type === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {alert.type === 'high' ? 'عالية' : alert.type === 'medium' ? 'متوسطة' : 'منخفضة'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">{alert.time}</span>
                      {alert.action && (
                        <span className="text-red-600 font-medium">{alert.action}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {systemAlerts.filter(a => a.action).length} تنبيه يتطلب إجراءً فورياً
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    إشعارات الدفع
                  </div>
                  <Badge variant="secondary">{paymentNotifications.length}</Badge>
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  تحديد الكل كمقروء
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentNotifications.map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <Badge 
                        variant={notification.priority === 'عالية' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{notification.description}</p>
                    <div className="bg-gray-50 rounded p-2 mb-2 text-xs space-y-1">
                      <div>فاتورة: {notification.details.invoice}</div>
                      <div>العميل: {notification.details.customer}</div>
                      <div className="font-medium text-green-600">{notification.details.amount}</div>
                    </div>
                    <div className="text-xs text-gray-500">{notification.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  الأنشطة الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border-r-2 border-blue-200 pr-3">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      {activity.amount && (
                        <span className="text-xs font-medium text-green-600">{activity.amount}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

