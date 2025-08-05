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
  Info
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useModules } from '@/contexts/ModuleContext';
import { useModuleIntegration } from '@/hooks/useModuleIntegration';
import { useNavigate } from 'react-router-dom';
import { PaymentNotifications } from '@/components/invoices/PaymentNotifications';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { SystemAlerts } from '@/components/dashboard/SystemAlerts';
import { DynamicSidebar } from '@/components/layout/DynamicSidebar';

export default function Dashboard() {
  const { signOut } = useAuth();
  const { tenant, modules, loading, dashboardData } = useTenant();
  const { state: moduleState, isModuleEnabled, getIntegratedData } = useModules();
  const moduleIntegration = useModuleIntegration();
  const navigate = useNavigate();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    switch (moduleId) {
      case 'fleet': return <Truck className="h-6 w-6" />;
      case 'customers': return <Users className="h-6 w-6" />;
      case 'contracts': return <FileText className="h-6 w-6" />;
      case 'accounting': return <Calculator className="h-6 w-6" />;
      case 'hr': return <UserCheck className="h-6 w-6" />;
      case 'payroll': return <CreditCard className="h-6 w-6" />;
      case 'attendance': return <Clock className="h-6 w-6" />;
      case 'leaves': return <Calendar className="h-6 w-6" />;
      case 'financial-reports': return <TrendingUp className="h-6 w-6" />;
      case 'inventory': return <Package className="h-6 w-6" />;
      case 'purchasing': return <ShoppingCart className="h-6 w-6" />;
      case 'invoices': return <Receipt className="h-6 w-6" />;
      case 'projects': return <Briefcase className="h-6 w-6" />;
      case 'analytics': return <BarChart3 className="h-6 w-6" />;
      case 'advanced-accounting': return <Building2 className="h-6 w-6" />;
      case 'advanced-inventory': return <Warehouse className="h-6 w-6" />;
      case 'advanced-sales': return <TrendingUp className="h-6 w-6" />;
      case 'advanced-crm': return <Users className="h-6 w-6" />;
      case 'advanced-pos': return <ShoppingCart className="h-6 w-6" />;
      case 'advanced-procurement': return <Package className="h-6 w-6" />;
      case 'manufacturing': return <Factory className="h-6 w-6" />;
      case 'quality-management': return <Shield className="h-6 w-6" />;
      case 'document-management': return <FileText className="h-6 w-6" />;
      case 'system-integrations': return <Zap className="h-6 w-6" />;
      case 'advanced-hr': return <Users className="h-6 w-6" />;
      case 'advanced-payroll': return <DollarSign className="h-6 w-6" />;
      case 'menu-management': return <ChefHat className="h-6 w-6" />;
      case 'order-management': return <ClipboardList className="h-6 w-6" />;
      case 'kitchen-management': return <Utensils className="h-6 w-6" />;
      case 'delivery-management': return <Truck className="h-6 w-6" />;
      default: return <Settings className="h-6 w-6" />;
    }
  };

  const getModuleName = (moduleId: string) => {
    const moduleNames: Record<string, string> = {
      'fleet': 'إدارة الأسطول',
      'customers': 'إدارة العملاء',
      'contracts': 'إدارة العقود',
      'accounting': 'المحاسبة',
      'hr': 'الموارد البشرية',
      'payroll': 'الرواتب',
      'attendance': 'الحضور والانصراف',
      'leaves': 'إدارة الإجازات',
      'financial-reports': 'التقارير المالية',
      'inventory': 'إدارة المخزون',
      'purchasing': 'المشتريات',
      'invoices': 'الفواتير',
      'projects': 'إدارة المشاريع',
      'analytics': 'التحليلات والتقارير',
      'advanced-accounting': 'النظام المحاسبي المتقدم',
      'advanced-inventory': 'إدارة المخزون المتقدمة',
      'advanced-sales': 'إدارة المبيعات المتقدمة',
      'advanced-crm': 'نظام إدارة علاقات العملاء',
      'advanced-pos': 'نظام نقاط البيع المتقدم',
      'advanced-procurement': 'إدارة المشتريات المتقدمة',
      'manufacturing': 'إدارة التصنيع',
      'quality-management': 'إدارة الجودة',
      'document-management': 'إدارة الوثائق',
      'system-integrations': 'التكاملات المتقدمة',
      'advanced-hr': 'الموارد البشرية المتقدمة',
      'advanced-payroll': 'نظام الرواتب المتقدم',
      'menu-management': 'إدارة المنيو',
      'order-management': 'إدارة الطلبات',
      'kitchen-management': 'إدارة المطبخ',
      'delivery-management': 'إدارة التوصيل'
    };
    return moduleNames[moduleId] || moduleId;
  };

  const getModuleCategory = (moduleId: string) => {
    const categories: Record<string, string> = {
      'customers': 'core',
      'contracts': 'core',
      'accounting': 'financial',
      'financial-reports': 'financial',
      'invoices': 'financial',
      'payroll': 'financial',
      'fleet': 'operations',
      'inventory': 'operations',
      'purchasing': 'operations',
      'projects': 'operations',
      'hr': 'hr',
      'attendance': 'hr',
      'leaves': 'hr',
      'analytics': 'advanced',
      'advanced-accounting': 'advanced',
      'advanced-inventory': 'advanced',
      'advanced-sales': 'advanced',
      'advanced-crm': 'advanced',
      'advanced-pos': 'advanced',
      'advanced-procurement': 'advanced',
      'manufacturing': 'advanced',
      'quality-management': 'advanced',
      'document-management': 'advanced',
      'system-integrations': 'advanced',
      'advanced-hr': 'advanced',
      'advanced-payroll': 'advanced',
      'menu-management': 'customer',
      'order-management': 'customer',
      'kitchen-management': 'operations',
      'delivery-management': 'operations'
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
      'advanced-accounting': '/advanced-accounting',
      'advanced-inventory': '/advanced-inventory',
      'advanced-sales': '/advanced-sales',
      'advanced-crm': '/advanced-crm',
      'advanced-pos': '/advanced-pos',
      'advanced-procurement': '/advanced-procurement',
      'manufacturing': '/manufacturing',
      'quality-management': '/quality-management',
      'document-management': '/document-management',
      'system-integrations': '/system-integrations',
      'advanced-hr': '/advanced-hr',
      'advanced-payroll': '/advanced-payroll',
      'menu-management': '/menu-management',
      'order-management': '/order-management',
      'kitchen-management': '/kitchen-management',
      'delivery-management': '/delivery-management'
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

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-card border-l transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold">القائمة</h2>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DynamicSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:mr-64">
        {/* Header */}
        <div className="border-b bg-card sticky top-0 z-30">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">{tenant.name}</h1>
                  <p className="text-muted-foreground">لوحة التحكم الرئيسية</p>
                </div>
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

        <div className="container mx-auto px-6 py-8">
          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الوحدات المفعلة</CardTitle>
                <Activity className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{enabledModules.length}</div>
                <p className="text-xs text-muted-foreground">من إجمالي {modules.length} وحدة</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">التكاملات النشطة</CardTitle>
                <Zap className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{moduleState.integrations.length}</div>
                <p className="text-xs text-muted-foreground">تكامل ذكي بين الوحدات</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">العملاء</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  <div className="text-2xl font-bold text-purple-600">{dashboardData?.customers_count || 0}</div>
                )}
                <p className="text-xs text-muted-foreground">إجمالي العملاء</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">العقود النشطة</CardTitle>
                <FileText className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  <div className="text-2xl font-bold text-orange-600">{dashboardData?.active_contracts || 0}</div>
                )}
                <p className="text-xs text-muted-foreground">عقد نشط</p>
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
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="text"
                      placeholder="البحث في الوحدات..."
                      className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
            {filteredModules.map((module) => {
              const stats = getModuleStats(module.module_id);
              return (
                <Card key={module.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {getModuleIcon(module.module_id)}
                    </div>
                    <CardTitle className="text-lg leading-tight">{getModuleName(module.module_id)}</CardTitle>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {getModuleCategory(module.module_id)}
                      </Badge>
                      {stats.integrations > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          {stats.integrations} تكامل
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <div className="text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span>السجلات:</span>
                        <span className="font-medium">{stats.totalRecords}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>آخر تحديث:</span>
                        <span className="font-medium">{stats.lastUpdated}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => navigate(getModuleRoute(module.module_id))}
                    >
                      فتح الوحدة
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No modules found */}
          {filteredModules.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto mb-4 p-4 rounded-full bg-muted w-fit">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">لم يتم العثور على وحدات</h3>
                <p className="text-muted-foreground">جرب تغيير معايير البحث أو الفلترة</p>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Dashboard Components */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Quick Actions and Alerts */}
            <div className="space-y-6">
              <QuickActions />
              <SystemAlerts />
            </div>
            
            {/* Middle Column - Payment Notifications */}
            <div>
              <PaymentNotifications />
            </div>
            
            {/* Right Column - Recent Activities */}
            <div>
              <RecentActivities />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

