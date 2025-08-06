import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import arTranslations from '@/locales/ar.json';

type TranslationKey = string;
type TranslationParams = Record<string, string | number>;

interface TranslationContextType {
  t: (key: TranslationKey, params?: TranslationParams) => string;
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState('ar');
  const [translations, setTranslations] = useState(arTranslations);

  const isRTL = language === 'ar';

  // Function to get nested translation value
  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  };

  // Translation function with parameter interpolation
  const t = (key: TranslationKey, params?: TranslationParams): string => {
    let translation = getNestedValue(translations, key);
    
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    // Handle parameter interpolation
    if (params && typeof translation === 'string') {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(
          new RegExp(`{{${paramKey}}}`, 'g'),
          String(paramValue)
        );
      });
    }

    return translation;
  };

  // Load translations based on language
  useEffect(() => {
    if (language === 'ar') {
      setTranslations(arTranslations);
    }
    // Add other languages here when needed
  }, [language]);

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const value = {
    t,
    language,
    setLanguage,
    isRTL
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Helper hooks for specific translation categories
export function useCommonTranslations() {
  const { t } = useTranslation();
  
  return {
    add: t('common.add'),
    edit: t('common.edit'),
    delete: t('common.delete'),
    save: t('common.save'),
    cancel: t('common.cancel'),
    search: t('common.search'),
    filter: t('common.filter'),
    export: t('common.export'),
    import: t('common.import'),
    view: t('common.view'),
    details: t('common.details'),
    new: t('common.new'),
    create: t('common.create'),
    update: t('common.update'),
    refresh: t('common.refresh'),
    back: t('common.back'),
    next: t('common.next'),
    previous: t('common.previous'),
    submit: t('common.submit'),
    confirm: t('common.confirm'),
    close: t('common.close'),
    loading: t('common.loading'),
    noData: t('common.no_data'),
    select: t('common.select'),
    all: t('common.all'),
    none: t('common.none'),
    yes: t('common.yes'),
    no: t('common.no'),
    ok: t('common.ok'),
    error: t('common.error'),
    success: t('common.success'),
    warning: t('common.warning'),
    info: t('common.info')
  };
}

export function useNavigationTranslations() {
  const { t } = useTranslation();
  
  return {
    dashboard: t('navigation.dashboard'),
    modules: t('navigation.modules'),
    settings: t('navigation.settings'),
    logout: t('navigation.logout'),
    profile: t('navigation.profile'),
    home: t('navigation.home'),
    menu: t('navigation.menu')
  };
}

export function useStatusTranslations() {
  const { t } = useTranslation();
  
  return {
    active: t('status.active'),
    inactive: t('status.inactive'),
    pending: t('status.pending'),
    completed: t('status.completed'),
    cancelled: t('status.cancelled'),
    approved: t('status.approved'),
    rejected: t('status.rejected'),
    draft: t('status.draft'),
    published: t('status.published'),
    expired: t('status.expired'),
    overdue: t('status.overdue'),
    paid: t('status.paid'),
    unpaid: t('status.unpaid'),
    partial: t('status.partial')
  };
}

export function useFieldTranslations() {
  const { t } = useTranslation();
  
  return {
    name: t('fields.name'),
    description: t('fields.description'),
    date: t('fields.date'),
    time: t('fields.time'),
    amount: t('fields.amount'),
    quantity: t('fields.quantity'),
    price: t('fields.price'),
    total: t('fields.total'),
    status: t('fields.status'),
    type: t('fields.type'),
    category: t('fields.category'),
    email: t('fields.email'),
    phone: t('fields.phone'),
    address: t('fields.address'),
    notes: t('fields.notes'),
    createdAt: t('fields.created_at'),
    updatedAt: t('fields.updated_at'),
    startDate: t('fields.start_date'),
    endDate: t('fields.end_date'),
    dueDate: t('fields.due_date'),
    company: t('fields.company'),
    contact: t('fields.contact'),
    reference: t('fields.reference'),
    code: t('fields.code'),
    id: t('fields.id')
  };
}

export function useModuleTranslations() {
  const { t } = useTranslation();
  
  return {
    dashboard: t('modules.dashboard'),
    contracts: t('modules.contracts'),
    customers: t('modules.customers'),
    accounting: t('modules.accounting'),
    hr: t('modules.hr'),
    payroll: t('modules.payroll'),
    attendance: t('modules.attendance'),
    leaves: t('modules.leaves'),
    financialReports: t('modules.financial_reports'),
    inventory: t('modules.inventory'),
    purchasing: t('modules.purchasing'),
    invoices: t('modules.invoices'),
    projects: t('modules.projects'),
    analytics: t('modules.analytics'),
    bookings: t('modules.bookings'),
    fleet: t('modules.fleet'),
    vehicles: t('modules.vehicles'),
    equipment: t('modules.equipment'),
    maintenance: t('modules.maintenance'),
    payments: t('modules.payments'),
    workOrders: t('modules.work_orders'),
    delivery: t('modules.delivery'),
    kitchen: t('modules.kitchen'),
    menu: t('modules.menu'),
    orders: t('modules.orders'),
    pos: t('modules.pos')
  };
}

export function useDashboardTranslations() {
  const { t } = useTranslation();
  
  return {
    title: t('dashboard.title'),
    welcome: t('dashboard.welcome'),
    overview: t('dashboard.overview'),
    statistics: t('dashboard.statistics'),
    recentActivities: t('dashboard.recent_activities'),
    quickActions: t('dashboard.quick_actions'),
    systemAlerts: t('dashboard.system_alerts'),
    performance: t('dashboard.performance'),
    enabledModules: t('dashboard.enabled_modules'),
    activeIntegrations: t('dashboard.active_integrations'),
    totalCustomers: t('dashboard.total_customers'),
    monthlyRevenue: t('dashboard.monthly_revenue'),
    completionRate: t('dashboard.completion_rate'),
    customerSatisfaction: t('dashboard.customer_satisfaction'),
    systemEfficiency: t('dashboard.system_efficiency'),
    uptime: t('dashboard.uptime'),
    responseTime: t('dashboard.response_time'),
    moduleOverview: t('dashboard.module_overview'),
    records: t('dashboard.records'),
    integrations: t('dashboard.integrations'),
    lastUpdated: t('dashboard.last_updated'),
    thisMonth: t('dashboard.this_month'),
    fromLastMonth: t('dashboard.from_last_month')
  };
}

export function useMessageTranslations() {
  const { t } = useTranslation();
  
  return {
    confirmDelete: t('messages.confirm_delete'),
    saveSuccess: t('messages.save_success'),
    deleteSuccess: t('messages.delete_success'),
    updateSuccess: t('messages.update_success'),
    createSuccess: t('messages.create_success'),
    operationFailed: t('messages.operation_failed'),
    invalidData: t('messages.invalid_data'),
    requiredField: t('messages.required_field'),
    invalidEmail: t('messages.invalid_email'),
    invalidPhone: t('messages.invalid_phone'),
    passwordMismatch: t('messages.password_mismatch'),
    weakPassword: t('messages.weak_password'),
    sessionExpired: t('messages.session_expired'),
    accessDenied: t('messages.access_denied'),
    networkError: t('messages.network_error'),
    serverError: t('messages.server_error')
  };
}

// Utility function to format numbers with Arabic locale
export function formatNumber(number: number, locale: string = 'ar-KW'): string {
  return new Intl.NumberFormat(locale).format(number);
}

// Utility function to format currency with Arabic locale
export function formatCurrency(amount: number, currency: string = 'KWD', locale: string = 'ar-KW'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(amount);
}

// Utility function to format dates with Arabic locale
export function formatDate(date: Date | string, locale: string = 'ar-KW'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

// Utility function to format time with Arabic locale
export function formatTime(date: Date | string, locale: string = 'ar-KW'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(dateObj);
}

// Utility function to format relative time in Arabic
export function formatRelativeTime(date: Date | string, locale: string = 'ar'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
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
}

