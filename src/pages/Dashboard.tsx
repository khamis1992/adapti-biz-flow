import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useNavigate } from 'react-router-dom';
import { PaymentNotifications } from '@/components/invoices/PaymentNotifications';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { SystemAlerts } from '@/components/dashboard/SystemAlerts';

export default function Dashboard() {
  const { signOut } = useAuth();
  const { tenant, modules, loading, dashboardData } = useTenant();
  const navigate = useNavigate();

  const enabledModules = modules.filter(m => m.is_enabled);
  
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
      'advanced-payroll': 'نظام الرواتب المتقدم'
    };
    return moduleNames[moduleId] || moduleId;
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
      'advanced-payroll': '/advanced-payroll'
    };
    return routes[moduleId] || `/${moduleId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{tenant.name}</h1>
              <p className="text-muted-foreground">لوحة التحكم الرئيسية</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المركبات</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <div className="text-2xl font-bold">{dashboardData?.vehicles_count || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">إجمالي المركبات</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">العملاء</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <div className="text-2xl font-bold">{dashboardData?.customers_count || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">إجمالي العملاء</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">العقود</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <div className="text-2xl font-bold">{dashboardData?.active_contracts || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">العقود النشطة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الموظفون</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <div className="text-2xl font-bold">{dashboardData?.employees_count || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">إجمالي الموظفين</p>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {enabledModules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {getModuleIcon(module.module_id)}
                </div>
                <CardTitle className="text-lg">{getModuleName(module.module_id)}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(getModuleRoute(module.module_id))}
                >
                  فتح الوحدة
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
  );
}