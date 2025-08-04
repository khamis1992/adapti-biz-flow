import { useTenant } from '@/hooks/useTenant';
import React from 'react';

/**
 * Hook to check if a specific module is enabled for the current tenant
 */
export const useModuleEnabled = (moduleId: string): boolean => {
  const { modules } = useTenant();
  return modules.some(module => module.module_id === moduleId && module.is_enabled);
};

/**
 * Utility function to check if a module is enabled
 */
export const isModuleEnabled = (modules: any[], moduleId: string): boolean => {
  return modules.some(module => module.module_id === moduleId && module.is_enabled);
};

/**
 * Get all enabled modules for the current tenant
 */
export const useEnabledModules = () => {
  const { modules } = useTenant();
  return modules.filter(module => module.is_enabled);
};

/**
 * Conditional component that only renders if the module is enabled
 */
interface ModuleGuardProps {
  moduleId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ModuleGuard: React.FC<ModuleGuardProps> = ({ moduleId, children, fallback = null }) => {
  const isEnabled = useModuleEnabled(moduleId);
  return isEnabled ? React.createElement(React.Fragment, {}, children) : React.createElement(React.Fragment, {}, fallback);
};

/**
 * Higher-order component to protect routes based on module availability
 */
export const withModuleProtection = (
  Component: React.ComponentType<any>,
  moduleId: string,
  fallbackComponent?: React.ComponentType<any>
) => {
  return (props: any) => {
    const isEnabled = useModuleEnabled(moduleId);
    
    if (!isEnabled) {
      if (fallbackComponent) {
        const FallbackComponent = fallbackComponent;
        return React.createElement(FallbackComponent, props);
      }
      return React.createElement('div', 
        { className: "flex items-center justify-center min-h-screen" },
        React.createElement('div', 
          { className: "text-center" },
          React.createElement('h2', 
            { className: "text-2xl font-bold mb-4" },
            "الوحدة غير متاحة"
          ),
          React.createElement('p', 
            { className: "text-muted-foreground" },
            "هذه الوحدة غير مفعلة في خطة الاشتراك الحالية"
          )
        )
      );
    }
    
    return React.createElement(Component, props);
  };
};

/**
 * Get module display name in Arabic
 */
export const getModuleDisplayName = (moduleId: string): string => {
  const moduleNames: Record<string, string> = {
    'contracts': 'إدارة العقود',
    'customers': 'إدارة العملاء',
    'accounting': 'النظام المحاسبي الكامل',
    'advanced_accounting': 'النظام المحاسبي المتقدم',
    'ledger': 'دفتر الأستاذ',
    'invoicing': 'نظام الفوترة',
    'payments': 'إدارة المدفوعات',
    'e_invoicing': 'الفوترة الإلكترونية',
    'financial_reports': 'التقارير المالية',
    'vehicles': 'إدارة المركبات',
    'fleet': 'إدارة الأسطول',
    'equipment': 'إدارة المعدات',
    'maintenance': 'إدارة الصيانة',
    'insurance': 'إدارة التأمينات',
    'gps': 'تتبع GPS',
    'work_orders': 'أوامر العمل',
    'inventory': 'إدارة المخزون',
    'advanced_inventory': 'إدارة المخزون المتقدمة',
    'purchasing': 'إدارة المشتريات',
    'advanced_procurement': 'إدارة المشتريات المتقدمة',
    'supply_chain': 'إدارة سلسلة التوريد',
    'projects': 'إدارة المشاريع',
    'manufacturing': 'إدارة التصنيع',
    'quality_management': 'إدارة الجودة',
    'bookings': 'نظام الحجوزات',
    'appointments': 'إدارة المواعيد',
    'customer_portal': 'بوابة العميل',
    'crm': 'إدارة علاقات العملاء',
    'advanced_crm': 'نظام CRM المتقدم',
    'loyalty': 'برنامج الولاء',
    'advanced_sales': 'إدارة المبيعات المتقدمة',
    'menu': 'إدارة المنيو',
    'menu_management': 'إدارة المنيو المتقدمة',
    'orders': 'إدارة الطلبات',
    'order_management': 'إدارة الطلبات المتقدمة',
    'pos': 'نقاط البيع',
    'advanced_pos': 'نظام نقاط البيع المتقدم',
    'kitchen': 'إدارة المطبخ',
    'kitchen_management': 'إدارة المطبخ المتقدمة',
    'delivery': 'إدارة التوصيل',
    'delivery_management': 'إدارة التوصيل المتقدمة',
    'services': 'إدارة الخدمات',
    'salon_services': 'خدمات الصالون',
    'packages': 'إدارة الباقات',
    'salon_appointments': 'مواعيد الصالون',
    'crew': 'إدارة الطاقم',
    'hospitality': 'إدارة الضيافة',
    'yacht_management': 'إدارة اليخوت',
    'booking_system': 'نظام الحجوزات الشامل',
    'hr': 'الموارد البشرية',
    'advanced_hr': 'الموارد البشرية المتقدمة',
    'payroll': 'إدارة الرواتب',
    'advanced_payroll': 'نظام الرواتب المتقدم',
    'attendance': 'نظام الحضور',
    'leaves': 'إدارة الإجازات',
    'performance': 'تقييم الأداء',
    'recruitment': 'إدارة التوظيف',
    'analytics': 'التحليلات المتقدمة',
    'api': 'واجهة برمجية',
    'system_integrations': 'التكاملات المتقدمة',
    'document_management': 'إدارة الوثائق',
    'mobile_app': 'تطبيق الجوال',
    'notifications': 'نظام الإشعارات',
    'multi_location': 'تعدد الفروع',
    'compliance': 'الامتثال القانوني'
  };
  
  return moduleNames[moduleId] || moduleId;
};