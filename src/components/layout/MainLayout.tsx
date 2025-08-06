import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home,
  Users, 
  FileText, 
  Calculator, 
  UserCheck, 
  CreditCard, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Receipt, 
  Briefcase, 
  BarChart3,
  ChefHat,
  Utensils,
  ClipboardList,
  Truck,
  Settings,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useModules } from '@/contexts/ModuleContext';
import { getArabicModuleName } from '@/data/arabicModuleNames';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { signOut } = useAuth();
  const { tenant, modules } = useTenant();
  const { isModuleEnabled } = useModules();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter enabled modules from tenant data
  const enabledModules = modules.filter(m => m.is_enabled && isModuleEnabled(m.module_id));

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
      'pos': <ShoppingCart className="h-5 w-5" />
    };
    return iconMap[moduleId] || <Settings className="h-5 w-5" />;
  };

  const getModuleName = (moduleId: string) => {
    return getArabicModuleName(moduleId);
  };

  const getModuleCategory = (moduleId: string) => {
    const categories: Record<string, string> = {
      'customers': 'أساسية',
      'contracts': 'أساسية',
      'bookings': 'أساسية',
      'accounting': 'مالية',
      'financial-reports': 'مالية',
      'invoices': 'مالية',
      'payroll': 'مالية',
      'payments': 'مالية',
      'fleet': 'تشغيلية',
      'inventory': 'تشغيلية',
      'purchasing': 'تشغيلية',
      'projects': 'تشغيلية',
      'delivery': 'تشغيلية',
      'kitchen': 'تشغيلية',
      'hr': 'موارد بشرية',
      'attendance': 'موارد بشرية',
      'leaves': 'موارد بشرية',
      'analytics': 'متقدمة',
      'menu': 'عملاء',
      'orders': 'عملاء',
      'pos': 'عملاء'
    };
    return categories[moduleId] || 'أساسية';
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

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Right Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-800">الوحدات المفعلة</h2>
            <p className="text-sm text-gray-600">{enabledModules.length} وحدة نشطة</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          <div className="p-4 space-y-2">
            {/* Dashboard Link */}
            <Button
              variant={isActiveRoute('/dashboard') ? 'default' : 'ghost'}
              className={`w-full justify-start text-right h-12 ${
                isActiveRoute('/dashboard') 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => navigate('/dashboard')}
            >
              <Home className="h-5 w-5 ml-3" />
              لوحة التحكم
            </Button>

            {/* Module Links */}
            {enabledModules.map((module) => (
              <Button
                key={module.module_id}
                variant={isActiveRoute(getModuleRoute(module.module_id)) ? 'default' : 'ghost'}
                className={`w-full justify-start text-right h-12 ${
                  isActiveRoute(getModuleRoute(module.module_id))
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'hover:bg-gray-100'
                }`}
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
              variant={isActiveRoute('/settings') ? 'default' : 'ghost'}
              className={`w-full justify-start text-right h-12 ${
                isActiveRoute('/settings')
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'hover:bg-gray-100'
              }`}
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
                  <h1 className="text-2xl font-bold text-gray-900">{tenant.name}</h1>
                  <p className="text-gray-600">نظام إدارة الأعمال المتكامل</p>
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

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

