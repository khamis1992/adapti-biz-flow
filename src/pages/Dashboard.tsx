import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
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
  Trash2,
  Star,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  RefreshCw,
  Download,
  Upload,
  PieChart,
  LineChart,
  BarChart,
  Target,
  Award,
  Bookmark,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar as CalendarIcon,
  Clock as ClockIcon
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useModules } from '@/contexts/ModuleContext';
import { useModuleIntegration } from '@/hooks/useModuleIntegration';
import { useNavigate } from 'react-router-dom';
import { 
  useTranslation, 
  useCommonTranslations, 
  useNavigationTranslations, 
  useDashboardTranslations,
  useModuleTranslations,
  formatCurrency,
  formatRelativeTime 
} from '@/hooks/useTranslation';

export default function Dashboard() {
  const { signOut, user } = useAuth();
  const { tenant, modules, loading, dashboardData } = useTenant();
  const { state: moduleState, isModuleEnabled, getIntegratedData } = useModules();
  const moduleIntegration = useModuleIntegration();
  const navigate = useNavigate();
  
  // Translation hooks
  const { t } = useTranslation();
  const common = useCommonTranslations();
  const nav = useNavigationTranslations();
  const dashboard = useDashboardTranslations();
  const modules_t = useModuleTranslations();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter enabled modules from tenant data
  const enabledModules = modules.filter(m => m.is_enabled && isModuleEnabled(m.module_id));

  // Module categories for filtering
  const moduleCategories = [
    { id: 'all', name: 'جميع الوحدات', icon: <BarChart3 className="h-4 w-4" />, color: 'bg-gray-100 text-gray-700' },
    { id: 'core', name: 'الوحدات الأساسية', icon: <Home className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700' },
    { id: 'financial', name: 'المالية والمحاسبة', icon: <DollarSign className="h-4 w-4" />, color: 'bg-green-100 text-green-700' },
    { id: 'operations', name: 'العمليات التشغيلية', icon: <Settings className="h-4 w-4" />, color: 'bg-purple-100 text-purple-700' },
    { id: 'hr', name: 'الموارد البشرية', icon: <Users className="h-4 w-4" />, color: 'bg-orange-100 text-orange-700' },
    { id: 'customer', name: 'خدمة العملاء', icon: <UserCheck className="h-4 w-4" />, color: 'bg-pink-100 text-pink-700' },
    { id: 'advanced', name: 'الوحدات المتقدمة', icon: <Zap className="h-4 w-4" />, color: 'bg-indigo-100 text-indigo-700' }
  ];

  const getModuleIcon = (moduleId: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'fleet': <Truck className="h-5 w-5" />,
      'customers': <Users className="h-5 w-5" />,
      'contracts': <FileText className="h-5 w-5" />,
      'accounting': <Calculator className="h-5 w-5" />,
      'hr': <UserCheck className="h-5 w-5" />,
      'payroll': <CreditCard className="h-5 w-5" />,
      'attendance': <Clock className="h-5 w-5" />,
      'leaves': <Calendar className="h-5 w-5" />,
      'financial-reports': <TrendingUp className="h-5 w-5" />,
      'inventory': <Package className="h-5 w-5" />,
      'purchasing': <ShoppingCart className="h-5 w-5" />,
      'invoices': <Receipt className="h-5 w-5" />,
      'projects': <Briefcase className="h-5 w-5" />,
      'analytics': <BarChart3 className="h-5 w-5" />,
      'bookings': <Calendar className="h-5 w-5" />,
      'delivery': <Truck className="h-5 w-5" />,
      'kitchen': <ChefHat className="h-5 w-5" />,
      'menu': <Utensils className="h-5 w-5" />,
      'orders': <ClipboardList className="h-5 w-5" />,
      'payments': <CreditCard className="h-5 w-5" />,
      'pos': <ShoppingCart className="h-5 w-5" />,
      'work-orders': <ClipboardList className="h-5 w-5" />
    };
    return iconMap[moduleId] || <Settings className="h-5 w-5" />;
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
      'pos': 'نقاط البيع',
      'work-orders': 'أوامر العمل'
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
      'work-orders': 'operations',
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
      'pos': '/pos',
      'work-orders': '/work-orders'
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
    { id: 'new-invoice', name: 'فاتورة جديدة', icon: <Receipt className="h-4 w-4" />, route: '/invoices/new', color: 'bg-green-500' },
    { id: 'new-customer', name: 'عميل جديد', icon: <UserPlus className="h-4 w-4" />, route: '/customers/new', color: 'bg-blue-500' },
    { id: 'new-contract', name: 'عقد جديد', icon: <FileText className="h-4 w-4" />, route: '/contracts/new', color: 'bg-purple-500' },
    { id: 'new-project', name: 'مشروع جديد', icon: <FolderKanban className="h-4 w-4" />, route: '/projects/new', color: 'bg-orange-500' },
    { id: 'add-vehicle', name: 'إضافة مركبة', icon: <Car className="h-4 w-4" />, route: '/fleet/add-vehicle', color: 'bg-red-500' },
    { id: 'new-payment', name: 'دفعة جديدة', icon: <CreditCard className="h-4 w-4" />, route: '/payments/new', color: 'bg-indigo-500' },
    { id: 'leave-request', name: 'طلب إجازة', icon: <Calendar className="h-4 w-4" />, route: '/leaves/new', color: 'bg-pink-500' },
    { id: 'add-product', name: 'إضافة منتج', icon: <Package className="h-4 w-4" />, route: '/inventory/new', color: 'bg-teal-500' }
  ];

  // System alerts data
  const systemAlerts = [
    {
      id: 1,
      title: 'دفعات متأخرة',
      description: '5 فواتير متأخرة السداد تتطلب متابعة فورية',
      type: 'high',
      icon: <AlertTriangle className="h-4 w-4" />,
      action: 'عرض التفاصيل',
      time: 'منذ ساعة',
      route: '/invoices?status=overdue'
    },
    {
      id: 2,
      title: 'عقود منتهية الصلاحية',
      description: '3 عقود ستنتهي خلال الأسبوع القادم',
      type: 'medium',
      icon: <FileText className="h-4 w-4" />,
      action: 'مراجعة العقود',
      time: 'منذ 2 ساعة',
      route: '/contracts?status=expiring'
    },
    {
      id: 3,
      title: 'صيانة مستحقة',
      description: '7 مركبات تحتاج صيانة دورية',
      type: 'medium',
      icon: <Car className="h-4 w-4" />,
      action: 'جدولة الصيانة',
      time: 'منذ 3 ساعات',
      route: '/fleet?maintenance=due'
    },
    {
      id: 4,
      title: 'مخزون منخفض',
      description: 'نفاد مخزون قطع الغيار الأساسية',
      type: 'high',
      icon: <Package className="h-4 w-4" />,
      action: 'طلب توريد',
      time: 'منذ 4 ساعات',
      route: '/inventory?status=low'
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      title: 'فاتورة جديدة',
      description: 'تم إنشاء فاتورة INV-2024-001 للعميل أحمد الكندري',
      amount: '175.000 د.ك.',
      time: 'منذ 10 دقائق',
      icon: <Receipt className="h-4 w-4 text-green-600" />,
      type: 'success'
    },
    {
      id: 2,
      title: 'دفعة مستلمة',
      description: 'تم استلام دفعة من شركة الخليج للتجارة',
      amount: '1,500.000 د.ك.',
      time: 'منذ 25 دقيقة',
      icon: <CreditCard className="h-4 w-4 text-blue-600" />,
      type: 'info'
    },
    {
      id: 3,
      title: 'عميل جديد',
      description: 'تم تسجيل عميل جديد: محمد سالم الرشيد',
      time: 'منذ 45 دقيقة',
      icon: <UserPlus className="h-4 w-4 text-purple-600" />,
      type: 'info'
    },
    {
      id: 4,
      title: 'صيانة مركبة',
      description: 'تم جدولة صيانة للمركبة ABC-123',
      time: 'منذ ساعة',
      icon: <Car className="h-4 w-4 text-orange-600" />,
      type: 'warning'
    },
    {
      id: 5,
      title: 'عقد منتهي الصلاحية',
      description: 'العقد CNT-2024-005 سينتهي خلال 3 أيام',
      time: 'منذ ساعتين',
      icon: <FileText className="h-4 w-4 text-red-600" />,
      type: 'error'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      {/* Enhanced Right Sidebar */}
      <div className={`fixed top-0 right-0 h-full ${sidebarCollapsed ? 'w-16' : 'w-72'} bg-white border-l border-gray-200 shadow-xl z-50 transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-white">نظام إدارة الأعمال</h2>
                <p className="text-sm text-blue-100">{enabledModules.length} وحدة نشطة</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-white hover:bg-blue-800"
            >
              {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* User Info */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{tenant?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في الوحدات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 text-right"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {moduleCategories.slice(0, 3).map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-xs ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                >
                  {category.icon}
                  <span className="mr-1">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="overflow-y-auto h-full pb-20">
          <div className="p-2 space-y-1">
            {/* Dashboard Link */}
            <Button
              variant="ghost"
              className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start'} text-right h-12 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100`}
              onClick={() => navigate('/dashboard')}
            >
              <Home className="h-5 w-5" />
              {!sidebarCollapsed && <span className="mr-3">لوحة التحكم</span>}
            </Button>

            {/* Module Links */}
            {filteredModules.map((module) => (
              <Button
                key={module.module_id}
                variant="ghost"
                className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start'} text-right h-12 hover:bg-gray-100 group`}
                onClick={() => navigate(getModuleRoute(module.module_id))}
              >
                <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} w-full`}>
                  <div className="flex items-center">
                    {getModuleIcon(module.module_id)}
                    {!sidebarCollapsed && <span className="mr-3">{getModuleName(module.module_id)}</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <Badge variant="secondary" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {getIntegrationStatus(module.module_id)}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}

            {/* Settings Link */}
            <Button
              variant="ghost"
              className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start'} text-right h-12 hover:bg-gray-100`}
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
              {!sidebarCollapsed && <span className="mr-3">الإعدادات</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarCollapsed ? 'mr-16' : 'mr-72'} min-h-screen transition-all duration-300`}>
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Building2 className="h-6 w-6 ml-2 text-blue-600" />
                    {tenant?.name || 'نظام إدارة الأعمال'}
                  </h1>
                  <p className="text-gray-600 flex items-center mt-1">
                    <CalendarIcon className="h-4 w-4 ml-1" />
                    {currentTime.toLocaleDateString('ar-SA', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    <ClockIcon className="h-4 w-4 mr-3 ml-1" />
                    {currentTime.toLocaleTimeString('ar-SA', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {systemAlerts.filter(alert => alert.type === 'high').length}
                  </span>
                </Button>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={signOut} className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Enhanced Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-all duration-300 border-r-4 border-r-green-500 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">الوحدات المفعلة</CardTitle>
                <div className="p-2 bg-green-500 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{enabledModules.length}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-green-500 ml-1" />
                  من إجمالي {modules.length} وحدة
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-r-4 border-r-blue-500 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">التكاملات النشطة</CardTitle>
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{moduleState.integrations.length}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <Target className="h-3 w-3 text-blue-500 ml-1" />
                  تكامل ذكي بين الوحدات
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-r-4 border-r-purple-500 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">العملاء</CardTitle>
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-3xl font-bold text-purple-600">{dashboardData?.customers_count || 247}</div>
                )}
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-purple-500 ml-1" />
                  +12% هذا الشهر
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-r-4 border-r-orange-500 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">الإيرادات الشهرية</CardTitle>
                <div className="p-2 bg-orange-500 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">45,250 د.ك.</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 text-orange-500 ml-1" />
                  +8.2% من الشهر الماضي
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 ml-2 text-yellow-500" />
                الإجراءات السريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all duration-300 group"
                    onClick={() => navigate(action.route)}
                  >
                    <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="text-xs text-center">{action.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* System Alerts */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 ml-2 text-red-500" />
                    تنبيهات النظام
                  </div>
                  <Badge variant="destructive">{systemAlerts.filter(alert => alert.type === 'high').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-r-4 ${
                    alert.type === 'high' ? 'border-r-red-500 bg-red-50' :
                    alert.type === 'medium' ? 'border-r-yellow-500 bg-yellow-50' :
                    'border-r-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {alert.icon}
                          <h4 className="font-medium text-sm mr-2">{alert.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => navigate(alert.route)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 ml-2 text-blue-500" />
                  الأنشطة الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                    <div className="flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-400">{activity.time}</p>
                        {activity.amount && (
                          <span className="text-xs font-medium text-green-600">{activity.amount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 ml-2 text-green-500" />
                  نظرة عامة على الأداء
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">معدل الإنجاز</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">رضا العملاء</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">كفاءة النظام</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">98.5%</p>
                    <p className="text-xs text-gray-500">وقت التشغيل</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">2.3s</p>
                    <p className="text-xs text-gray-500">متوسط الاستجابة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Module Overview Grid */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="h-5 w-5 ml-2 text-indigo-500" />
                  نظرة عامة على الوحدات
                </div>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {enabledModules.slice(0, 6).map((module) => {
                  const stats = getModuleStats(module.module_id);
                  return (
                    <Card key={module.module_id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(getModuleRoute(module.module_id))}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            {getModuleIcon(module.module_id)}
                            <span className="font-medium text-sm mr-2">{getModuleName(module.module_id)}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {getModuleCategory(module.module_id)}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-xs text-gray-500">
                          <div className="flex justify-between">
                            <span>السجلات:</span>
                            <span className="font-medium">{stats.totalRecords}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>التكاملات:</span>
                            <span className="font-medium">{stats.integrations}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>آخر تحديث:</span>
                            <span className="font-medium">{stats.lastUpdated}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

