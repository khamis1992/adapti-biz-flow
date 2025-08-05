import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useModules } from '@/contexts/ModuleContext';
import { useTenant } from '@/hooks/useTenant';
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
  Zap
} from 'lucide-react';

interface DynamicSidebarProps {
  className?: string;
}

export function DynamicSidebar({ className }: DynamicSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isModuleEnabled } = useModules();
  const { modules } = useTenant();

  // Filter enabled modules
  const enabledModules = modules.filter(m => m.is_enabled && isModuleEnabled(m.module_id));

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'fleet': return <Truck className="h-4 w-4" />;
      case 'customers': return <Users className="h-4 w-4" />;
      case 'contracts': return <FileText className="h-4 w-4" />;
      case 'accounting': return <Calculator className="h-4 w-4" />;
      case 'hr': return <UserCheck className="h-4 w-4" />;
      case 'payroll': return <CreditCard className="h-4 w-4" />;
      case 'attendance': return <Clock className="h-4 w-4" />;
      case 'leaves': return <Calendar className="h-4 w-4" />;
      case 'financial-reports': return <TrendingUp className="h-4 w-4" />;
      case 'inventory': return <Package className="h-4 w-4" />;
      case 'purchasing': return <ShoppingCart className="h-4 w-4" />;
      case 'invoices': return <Receipt className="h-4 w-4" />;
      case 'projects': return <Briefcase className="h-4 w-4" />;
      case 'analytics': return <BarChart3 className="h-4 w-4" />;
      case 'advanced-accounting': return <Building2 className="h-4 w-4" />;
      case 'advanced-inventory': return <Warehouse className="h-4 w-4" />;
      case 'advanced-sales': return <TrendingUp className="h-4 w-4" />;
      case 'advanced-crm': return <Users className="h-4 w-4" />;
      case 'advanced-pos': return <ShoppingCart className="h-4 w-4" />;
      case 'advanced-procurement': return <Package className="h-4 w-4" />;
      case 'manufacturing': return <Factory className="h-4 w-4" />;
      case 'quality-management': return <Shield className="h-4 w-4" />;
      case 'document-management': return <FileText className="h-4 w-4" />;
      case 'system-integrations': return <Zap className="h-4 w-4" />;
      case 'advanced-hr': return <Users className="h-4 w-4" />;
      case 'advanced-payroll': return <DollarSign className="h-4 w-4" />;
      case 'menu-management': return <ChefHat className="h-4 w-4" />;
      case 'order-management': return <ClipboardList className="h-4 w-4" />;
      case 'kitchen-management': return <Utensils className="h-4 w-4" />;
      case 'delivery-management': return <Truck className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
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

  const isActive = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            الوحدات المفعلة
          </h2>
          <div className="space-y-1">
            {/* Dashboard Link */}
            <Button
              variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/dashboard')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              لوحة التحكم
            </Button>

            {/* Dynamic Module Links */}
            <ScrollArea className="h-[calc(100vh-200px)]">
              {enabledModules.map((module) => {
                const route = getModuleRoute(module.module_id);
                return (
                  <Button
                    key={module.id}
                    variant={isActive(route) ? 'secondary' : 'ghost'}
                    className="w-full justify-start mb-1"
                    onClick={() => navigate(route)}
                  >
                    <span className="mr-2">
                      {getModuleIcon(module.module_id)}
                    </span>
                    {getModuleName(module.module_id)}
                  </Button>
                );
              })}
            </ScrollArea>

            {/* Settings Link */}
            <Button
              variant={isActive('/settings') ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              الإعدادات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

