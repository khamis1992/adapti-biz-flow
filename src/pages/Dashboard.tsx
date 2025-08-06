import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Star,
  Target,
  Gauge,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Download,
  Upload,
  Share2,
  BookOpen,
  Layers,
  Grid3X3,
  List,
  Calendar as CalendarIcon,
  Clock3,
  MapPin,
  Phone,
  Mail,
  Globe,
  Wifi,
  WifiOff,
  Database,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Monitor,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';
import { useTranslation, useDashboardTranslations, useModuleTranslations, useCommonTranslations, formatCurrency, formatNumber } from '@/hooks/useTranslation';
import { useModules } from '@/contexts/ModuleContext';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DashboardStats {
  totalCustomers: number;
  monthlyRevenue: number;
  completionRate: number;
  activeContracts: number;
  pendingPayments: number;
  fleetUtilization: number;
  employeeCount: number;
  systemUptime: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  path: string;
  enabled: boolean;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  icon: any;
  color: string;
}

const Dashboard = () => {
  const { t, isRTL } = useTranslation();
  const dashboardT = useDashboardTranslations();
  const moduleT = useModuleTranslations();
  const commonT = useCommonTranslations();
  const { enabledModules } = useModules();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('thisMonth');
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalCustomers: 1247,
    monthlyRevenue: 125750.500,
    completionRate: 94.2,
    activeContracts: 89,
    pendingPayments: 23,
    fleetUtilization: 87.5,
    employeeCount: 45,
    systemUptime: 99.8
  });

  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'تنبيه صيانة',
      message: 'يوجد 3 مركبات تحتاج صيانة دورية خلال الأسبوع القادم',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بنجاح إلى الإصدار 2.1.0',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'success',
      title: 'دفعة جديدة',
      message: 'تم استلام دفعة بقيمة 15,750 د.ك من العميل أحمد محمد',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'contract',
      title: 'عقد جديد',
      description: 'تم إنشاء عقد تأجير جديد للعميل سارة أحمد',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      user: 'محمد علي',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'payment',
      title: 'دفعة مستلمة',
      description: 'تم استلام دفعة بقيمة 2,500 د.ك',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      user: 'فاطمة خالد',
      icon: CreditCard,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'vehicle',
      title: 'مركبة جديدة',
      description: 'تم إضافة مركبة جديدة إلى الأسطول - تويوتا كامري 2024',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'أحمد سالم',
      icon: Car,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'customer',
      title: 'عميل جديد',
      description: 'تم تسجيل عميل جديد - شركة الخليج للتجارة',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      user: 'نورا محمد',
      icon: Users,
      color: 'text-orange-600'
    }
  ]);

  const quickActions: QuickAction[] = [
    {
      id: 'new-contract',
      title: 'عقد جديد',
      description: 'إنشاء عقد تأجير جديد',
      icon: FileText,
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/contracts/new',
      enabled: enabledModules.includes('contracts')
    },
    {
      id: 'new-customer',
      title: 'عميل جديد',
      description: 'إضافة عميل جديد',
      icon: UserPlus,
      color: 'bg-green-500 hover:bg-green-600',
      path: '/customers/new',
      enabled: enabledModules.includes('customers')
    },
    {
      id: 'new-invoice',
      title: 'فاتورة جديدة',
      description: 'إنشاء فاتورة جديدة',
      icon: Receipt,
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/invoices/new',
      enabled: enabledModules.includes('invoices')
    },
    {
      id: 'new-vehicle',
      title: 'مركبة جديدة',
      description: 'إضافة مركبة للأسطول',
      icon: Car,
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/fleet/add-vehicle',
      enabled: enabledModules.includes('fleet')
    },
    {
      id: 'financial-report',
      title: 'تقرير مالي',
      description: 'عرض التقارير المالية',
      icon: BarChart3,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      path: '/financial-reports',
      enabled: enabledModules.includes('financialReports')
    },
    {
      id: 'analytics',
      title: 'التحليلات',
      description: 'عرض تحليلات الأداء',
      icon: TrendingUp,
      color: 'bg-pink-500 hover:bg-pink-600',
      path: '/analytics',
      enabled: enabledModules.includes('analytics')
    }
  ];

  const moduleCards = [
    {
      id: 'contracts',
      title: moduleT.contracts,
      description: 'إدارة العقود والاتفاقيات',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      stats: { total: 89, active: 76, pending: 13 },
      path: '/contracts',
      enabled: enabledModules.includes('contracts')
    },
    {
      id: 'customers',
      title: moduleT.customers,
      description: 'إدارة قاعدة العملاء',
      icon: Users,
      color: 'from-green-500 to-green-600',
      stats: { total: 1247, active: 1180, new: 67 },
      path: '/customers',
      enabled: enabledModules.includes('customers')
    },
    {
      id: 'fleet',
      title: moduleT.fleet,
      description: 'إدارة أسطول المركبات',
      icon: Car,
      color: 'from-purple-500 to-purple-600',
      stats: { total: 45, available: 32, rented: 13 },
      path: '/fleet',
      enabled: enabledModules.includes('fleet')
    },
    {
      id: 'accounting',
      title: moduleT.accounting,
      description: 'النظام المحاسبي المتكامل',
      icon: Calculator,
      color: 'from-orange-500 to-orange-600',
      stats: { revenue: 125750.5, expenses: 45230.2, profit: 80520.3 },
      path: '/accounting',
      enabled: enabledModules.includes('accounting')
    },
    {
      id: 'hr',
      title: moduleT.hr,
      description: 'إدارة الموارد البشرية',
      icon: UserCheck,
      color: 'from-indigo-500 to-indigo-600',
      stats: { employees: 45, present: 42, absent: 3 },
      path: '/hr',
      enabled: enabledModules.includes('hr')
    },
    {
      id: 'invoices',
      title: moduleT.invoices,
      description: 'نظام الفوترة الإلكترونية',
      icon: Receipt,
      color: 'from-pink-500 to-pink-600',
      stats: { total: 234, paid: 198, pending: 36 },
      path: '/invoices',
      enabled: enabledModules.includes('invoices')
    }
  ];

  const sidebarModules = [
    { id: 'dashboard', title: 'لوحة التحكم', icon: Home, path: '/dashboard', enabled: true },
    { id: 'contracts', title: moduleT.contracts, icon: FileText, path: '/contracts', enabled: enabledModules.includes('contracts') },
    { id: 'customers', title: moduleT.customers, icon: Users, path: '/customers', enabled: enabledModules.includes('customers') },
    { id: 'fleet', title: moduleT.fleet, icon: Car, path: '/fleet', enabled: enabledModules.includes('fleet') },
    { id: 'accounting', title: moduleT.accounting, icon: Calculator, path: '/accounting', enabled: enabledModules.includes('accounting') },
    { id: 'invoices', title: moduleT.invoices, icon: Receipt, path: '/invoices', enabled: enabledModules.includes('invoices') },
    { id: 'payments', title: moduleT.payments, icon: CreditCard, path: '/payments', enabled: enabledModules.includes('payments') },
    { id: 'hr', title: moduleT.hr, icon: UserCheck, path: '/hr', enabled: enabledModules.includes('hr') },
    { id: 'payroll', title: moduleT.payroll, icon: DollarSign, path: '/payroll', enabled: enabledModules.includes('payroll') },
    { id: 'inventory', title: moduleT.inventory, icon: Package, path: '/inventory', enabled: enabledModules.includes('inventory') },
    { id: 'projects', title: moduleT.projects, icon: FolderKanban, path: '/projects', enabled: enabledModules.includes('projects') },
    { id: 'analytics', title: moduleT.analytics, icon: BarChart3, path: '/analytics', enabled: enabledModules.includes('analytics') },
    { id: 'settings', title: 'الإعدادات', icon: Settings, path: '/settings', enabled: true }
  ].filter(module => module.enabled);

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'الآن';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `منذ ${minutes} دقيقة`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `منذ ${hours} ساعة`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `منذ ${days} يوم`;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 to-slate-100", isRTL && "rtl")}>
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 h-full bg-white shadow-xl border-l border-gray-200 transition-all duration-300 z-50",
        isRTL ? "right-0" : "left-0",
        sidebarOpen ? "w-80" : "w-16"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {sidebarOpen && (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">نظام إدارة الأعمال</h1>
                  <p className="text-sm text-gray-500">ERP المتكامل</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {sidebarModules.map((module) => {
                const Icon = module.icon;
                return (
                  <Link
                    key={module.id}
                    to={module.path}
                    className={cn(
                      "flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-200",
                      "hover:bg-gray-100 hover:text-blue-600",
                      module.id === 'dashboard' ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-700"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="font-medium">{module.title}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">المدير العام</p>
                  <p className="text-xs text-gray-500">admin@company.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        isRTL ? (sidebarOpen ? "mr-80" : "mr-16") : (sidebarOpen ? "ml-80" : "ml-16")
      )}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{dashboardT.title}</h1>
              <p className="text-gray-600 mt-1">مرحباً بك في نظام إدارة الأعمال المتكامل</p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <Search className="absolute left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في النظام..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rtl:pr-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 ml-2 rtl:mr-2" />
                الإشعارات
                <Badge variant="destructive" className="ml-2 rtl:mr-2">3</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">إجمالي العملاء</p>
                    <p className="text-3xl font-bold">{formatNumber(dashboardStats.totalCustomers)}</p>
                    <p className="text-blue-100 text-sm mt-1">
                      <ArrowUp className="w-4 h-4 inline ml-1 rtl:mr-1" />
                      +12% من الشهر الماضي
                    </p>
                  </div>
                  <Users className="w-12 h-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">الإيرادات الشهرية</p>
                    <p className="text-3xl font-bold">{formatCurrency(dashboardStats.monthlyRevenue)}</p>
                    <p className="text-green-100 text-sm mt-1">
                      <ArrowUp className="w-4 h-4 inline ml-1 rtl:mr-1" />
                      +8.5% من الشهر الماضي
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">معدل الإنجاز</p>
                    <p className="text-3xl font-bold">{dashboardStats.completionRate}%</p>
                    <p className="text-purple-100 text-sm mt-1">
                      <ArrowUp className="w-4 h-4 inline ml-1 rtl:mr-1" />
                      +2.1% من الشهر الماضي
                    </p>
                  </div>
                  <Target className="w-12 h-12 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">العقود النشطة</p>
                    <p className="text-3xl font-bold">{dashboardStats.activeContracts}</p>
                    <p className="text-orange-100 text-sm mt-1">
                      <ArrowUp className="w-4 h-4 inline ml-1 rtl:mr-1" />
                      +5 عقود جديدة
                    </p>
                  </div>
                  <FileText className="w-12 h-12 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 ml-2 rtl:mr-2" />
                الإجراءات السريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.filter(action => action.enabled).map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.id}
                      variant="outline"
                      className={cn(
                        "h-auto p-4 justify-start hover:shadow-md transition-all duration-200",
                        action.color.replace('bg-', 'hover:bg-').replace('hover:bg-', 'hover:bg-opacity-10 hover:border-')
                      )}
                      onClick={() => navigate(action.path)}
                    >
                      <Icon className="w-6 h-6 ml-3 rtl:mr-3" />
                      <div className="text-right rtl:text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Module Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Grid3X3 className="w-5 h-5 ml-2 rtl:mr-2" />
                    نظرة عامة على الوحدات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {moduleCards.filter(module => module.enabled).map((module) => {
                      const Icon = module.icon;
                      return (
                        <Card key={module.id} className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => navigate(module.path)}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className={cn("w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center", module.color)}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              {module.id === 'accounting' ? (
                                <>
                                  <span className="text-gray-500">الإيرادات</span>
                                  <span className="font-medium text-green-600">{formatCurrency(module.stats.revenue)}</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-gray-500">المجموع</span>
                                  <span className="font-medium">{formatNumber(module.stats.total)}</span>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 ml-2 rtl:mr-2" />
                      تنبيهات النظام
                    </div>
                    <Badge variant="secondary">{systemAlerts.filter(alert => !alert.read).length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {systemAlerts.slice(0, 3).map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                      <div key={alert.id} className={cn("p-3 rounded-lg border", getAlertColor(alert.type))}>
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alert.title}</p>
                            <p className="text-xs mt-1 opacity-90">{alert.message}</p>
                            <p className="text-xs mt-2 opacity-75">{formatRelativeTime(alert.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Button variant="outline" size="sm" className="w-full">
                    عرض جميع التنبيهات
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 ml-2 rtl:mr-2" />
                    الأنشطة الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {recentActivities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                          <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-50">
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center bg-gray-100", activity.color)}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-500">{activity.user}</p>
                                <p className="text-xs text-gray-500">{formatRelativeTime(activity.timestamp)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="w-5 h-5 ml-2 rtl:mr-2" />
                    حالة النظام
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">وقت التشغيل</span>
                    </div>
                    <span className="text-sm font-medium">{dashboardStats.systemUptime}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">الوحدات المفعلة</span>
                    </div>
                    <span className="text-sm font-medium">{enabledModules.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">المدفوعات المعلقة</span>
                    </div>
                    <span className="text-sm font-medium">{dashboardStats.pendingPayments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">استخدام الأسطول</span>
                    </div>
                    <span className="text-sm font-medium">{dashboardStats.fleetUtilization}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

