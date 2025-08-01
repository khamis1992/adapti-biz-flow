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
  Plus
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { signOut } = useAuth();
  const { tenant, modules, loading, dashboardData } = useTenant();
  const navigate = useNavigate();

  const enabledModules = modules.filter(m => m.is_enabled);
  
  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'fleet_management': return <Car className="h-6 w-6" />;
      case 'customer_management': return <Users className="h-6 w-6" />;
      case 'contract_management': return <FileText className="h-6 w-6" />;
      case 'accounting': return <DollarSign className="h-6 w-6" />;
      case 'hr_management': return <UserPlus className="h-6 w-6" />;
      case 'payroll': return <BarChart3 className="h-6 w-6" />;
      case 'attendance': return <Calendar className="h-6 w-6" />;
      case 'leaves': return <ClipboardList className="h-6 w-6" />;
      case 'financial_reports': return <TrendingUp className="h-6 w-6" />;
      default: return <Settings className="h-6 w-6" />;
    }
  };

  const getModuleName = (moduleId: string) => {
    const moduleNames: Record<string, string> = {
      'fleet_management': 'إدارة الأسطول',
      'customer_management': 'إدارة العملاء',
      'contract_management': 'إدارة العقود',
      'accounting': 'المحاسبة',
      'hr_management': 'إدارة الموارد البشرية',
      'payroll': 'الرواتب',
      'attendance': 'الحضور والانصراف',
      'leaves': 'إدارة الإجازات',
      'financial_reports': 'التقارير المالية',
      'inventory': 'إدارة المخزون',
      'purchasing': 'المشتريات',
      'invoices': 'الفواتير'
    };
    return moduleNames[moduleId] || moduleId;
  };

  const getModuleRoute = (moduleId: string) => {
    const routes: Record<string, string> = {
      'fleet_management': '/fleet',
      'customer_management': '/customers',
      'contract_management': '/contracts',
      'accounting': '/accounting',
      'hr_management': '/hr',
      'payroll': '/payroll',
      'attendance': '/attendance',
      'leaves': '/leaves',
      'financial_reports': '/financial-reports',
      'inventory': '/inventory',
      'purchasing': '/purchasing',
      'invoices': '/invoices'
    };
    return routes[moduleId] || '/settings';
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

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">إجراءات سريعة</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/customers/add')}
            >
              <UserPlus className="h-6 w-6" />
              إضافة عميل جديد
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/fleet')}
            >
              <Car className="h-6 w-6" />
              إضافة مركبة جديدة
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/contracts')}
            >
              <FileText className="h-6 w-6" />
              إنشاء عقد جديد
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-6 w-6" />
              الإعدادات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}