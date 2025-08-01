import { 
  Building2, 
  Car, 
  Anchor, 
  Wrench, 
  UtensilsCrossed, 
  Scissors, 
  Users, 
  Calendar,
  Settings,
  DollarSign,
  FileText,
  Package,
  Shield,
  MapPin,
  Wifi,
  Utensils,
  Bed,
  Clock,
  CreditCard,
  Bell,
  BarChart3,
  Truck,
  Smartphone,
  Globe,
  Heart
} from 'lucide-react';
import { BusinessType, Module, ModuleCategory } from '@/types/onboarding';

export const moduleCategories: ModuleCategory[] = [
  {
    id: 'core',
    nameAr: 'الوحدات الأساسية',
    nameEn: 'Core Modules',
    icon: Settings,
    order: 1
  },
  {
    id: 'financial',
    nameAr: 'النظام المالي',
    nameEn: 'Financial System',
    icon: DollarSign,
    order: 2
  },
  {
    id: 'operations',
    nameAr: 'العمليات التشغيلية',
    nameEn: 'Operations',
    icon: Package,
    order: 3
  },
  {
    id: 'customer',
    nameAr: 'خدمة العملاء',
    nameEn: 'Customer Service',
    icon: Users,
    order: 4
  },
  {
    id: 'hr',
    nameAr: 'الموارد البشرية',
    nameEn: 'Human Resources',
    icon: Users,
    order: 5
  },
  {
    id: 'advanced',
    nameAr: 'الوحدات المتقدمة',
    nameEn: 'Advanced Modules',
    icon: BarChart3,
    order: 6
  }
];

export const allModules: Module[] = [
  // Core Modules
  { 
    id: 'contracts', 
    nameAr: 'إدارة العقود', 
    nameEn: 'Contract Management', 
    description: 'إدارة العقود والاتفاقيات',
    category: moduleCategories[0],
    required: true 
  },
  { 
    id: 'customers', 
    nameAr: 'إدارة العملاء', 
    nameEn: 'Customer Management', 
    description: 'إدارة بيانات العملاء والتواصل',
    category: moduleCategories[0],
    required: true 
  },

  // Financial System
  { 
    id: 'accounting', 
    nameAr: 'النظام المحاسبي الكامل', 
    nameEn: 'Full Accounting System', 
    description: 'نظام محاسبي متكامل مع التقارير المالية',
    category: moduleCategories[1],
    required: true 
  },
  { 
    id: 'ledger', 
    nameAr: 'دفتر الأستاذ', 
    nameEn: 'General Ledger', 
    description: 'دفتر الأستاذ العام والحسابات التفصيلية',
    category: moduleCategories[1],
    dependencies: ['accounting']
  },
  { 
    id: 'invoicing', 
    nameAr: 'نظام الفوترة', 
    nameEn: 'Invoicing System', 
    description: 'إصدار وإدارة الفواتير',
    category: moduleCategories[1],
    dependencies: ['accounting']
  },
  { 
    id: 'payments', 
    nameAr: 'إدارة المدفوعات', 
    nameEn: 'Payment Management', 
    description: 'معالجة وتتبع المدفوعات',
    category: moduleCategories[1],
    dependencies: ['accounting']
  },
  { 
    id: 'e_invoicing', 
    nameAr: 'الفوترة الإلكترونية', 
    nameEn: 'E-Invoicing', 
    description: 'نظام الفوترة الإلكترونية المعتمد',
    category: moduleCategories[1],
    dependencies: ['invoicing'],
    advanced: true
  },

  // Operations
  { 
    id: 'vehicles', 
    nameAr: 'إدارة المركبات', 
    nameEn: 'Vehicle Management', 
    description: 'إدارة الأسطول والمركبات',
    category: moduleCategories[2],
    businessTypes: ['car_rental']
  },
  { 
    id: 'fleet', 
    nameAr: 'إدارة الأسطول', 
    nameEn: 'Fleet Management', 
    description: 'إدارة أسطول اليخوت والقوارب',
    category: moduleCategories[2],
    businessTypes: ['yacht_rental']
  },
  { 
    id: 'equipment', 
    nameAr: 'إدارة المعدات', 
    nameEn: 'Equipment Management', 
    description: 'إدارة المعدات والأدوات',
    category: moduleCategories[2],
    businessTypes: ['equipment_rental']
  },
  { 
    id: 'maintenance', 
    nameAr: 'إدارة الصيانة', 
    nameEn: 'Maintenance Management', 
    description: 'جدولة وتتبع أعمال الصيانة',
    category: moduleCategories[2]
  },
  { 
    id: 'insurance', 
    nameAr: 'إدارة التأمينات', 
    nameEn: 'Insurance Management', 
    description: 'إدارة تأمينات المركبات والمعدات',
    category: moduleCategories[2],
    businessTypes: ['car_rental', 'yacht_rental', 'equipment_rental']
  },
  { 
    id: 'gps', 
    nameAr: 'تتبع GPS', 
    nameEn: 'GPS Tracking', 
    description: 'تتبع المركبات والمعدات بنظام GPS',
    category: moduleCategories[2],
    businessTypes: ['car_rental', 'equipment_rental']
  },
  { 
    id: 'work_orders', 
    nameAr: 'أوامر العمل', 
    nameEn: 'Work Orders', 
    description: 'إدارة أوامر العمل والمهام التشغيلية',
    category: moduleCategories[2]
  },
  { 
    id: 'inventory', 
    nameAr: 'إدارة المخزون', 
    nameEn: 'Inventory Management', 
    description: 'إدارة المخزون والمواد والقطع',
    category: moduleCategories[2]
  },
  { 
    id: 'supply_chain', 
    nameAr: 'إدارة سلسلة التوريد', 
    nameEn: 'Supply Chain Management', 
    description: 'إدارة الموردين وسلسلة التوريد',
    category: moduleCategories[2],
    advanced: true
  },

  // Customer Service
  { 
    id: 'bookings', 
    nameAr: 'نظام الحجوزات', 
    nameEn: 'Booking System', 
    description: 'إدارة الحجوزات والمواعيد',
    category: moduleCategories[3]
  },
  { 
    id: 'appointments', 
    nameAr: 'إدارة المواعيد', 
    nameEn: 'Appointment Management', 
    description: 'جدولة وإدارة المواعيد',
    category: moduleCategories[3],
    businessTypes: ['salon', 'restaurant']
  },
  { 
    id: 'customer_portal', 
    nameAr: 'بوابة العميل', 
    nameEn: 'Customer Portal', 
    description: 'بوابة العملاء الإلكترونية للخدمة الذاتية',
    category: moduleCategories[3],
    advanced: true
  },
  { 
    id: 'crm', 
    nameAr: 'إدارة علاقات العملاء', 
    nameEn: 'Customer Relationship Management', 
    description: 'نظام إدارة علاقات العملاء المتقدم',
    category: moduleCategories[3],
    advanced: true
  },
  { 
    id: 'loyalty', 
    nameAr: 'برنامج الولاء', 
    nameEn: 'Loyalty Program', 
    description: 'برنامج نقاط الولاء ومكافآت العملاء',
    category: moduleCategories[3],
    businessTypes: ['restaurant', 'salon'],
    advanced: true
  },

  // Business-Specific Modules
  { 
    id: 'menu', 
    nameAr: 'إدارة المنيو', 
    nameEn: 'Menu Management', 
    description: 'إدارة المنيو والأصناف والأسعار',
    category: moduleCategories[2],
    businessTypes: ['restaurant']
  },
  { 
    id: 'orders', 
    nameAr: 'إدارة الطلبات', 
    nameEn: 'Order Management', 
    description: 'معالجة وتتبع طلبات العملاء',
    category: moduleCategories[2],
    businessTypes: ['restaurant']
  },
  { 
    id: 'pos', 
    nameAr: 'نقاط البيع', 
    nameEn: 'Point of Sale', 
    description: 'نظام نقاط البيع والكاشير',
    category: moduleCategories[2],
    businessTypes: ['restaurant', 'salon']
  },
  { 
    id: 'kitchen', 
    nameAr: 'إدارة المطبخ', 
    nameEn: 'Kitchen Management', 
    description: 'إدارة عمليات المطبخ والطهي',
    category: moduleCategories[2],
    businessTypes: ['restaurant']
  },
  { 
    id: 'delivery', 
    nameAr: 'إدارة التوصيل', 
    nameEn: 'Delivery Management', 
    description: 'نظام إدارة طلبات التوصيل',
    category: moduleCategories[2],
    businessTypes: ['restaurant']
  },
  { 
    id: 'services', 
    nameAr: 'إدارة الخدمات', 
    nameEn: 'Service Management', 
    description: 'إدارة الخدمات المقدمة والأسعار',
    category: moduleCategories[2],
    businessTypes: ['salon', 'yacht_rental']
  },
  { 
    id: 'packages', 
    nameAr: 'إدارة الباقات', 
    nameEn: 'Package Management', 
    description: 'إدارة باقات الخدمات والعروض',
    category: moduleCategories[2],
    businessTypes: ['salon', 'yacht_rental']
  },
  { 
    id: 'crew', 
    nameAr: 'إدارة الطاقم', 
    nameEn: 'Crew Management', 
    description: 'إدارة طاقم اليخوت والقوارب',
    category: moduleCategories[4],
    businessTypes: ['yacht_rental']
  },
  { 
    id: 'hospitality', 
    nameAr: 'إدارة الضيافة', 
    nameEn: 'Hospitality Management', 
    description: 'إدارة خدمات الضيافة والترفيه',
    category: moduleCategories[2],
    businessTypes: ['yacht_rental']
  },

  // HR Modules
  { 
    id: 'hr', 
    nameAr: 'الموارد البشرية', 
    nameEn: 'Human Resources', 
    description: 'إدارة الموظفين والملفات الشخصية',
    category: moduleCategories[4]
  },
  { 
    id: 'payroll', 
    nameAr: 'إدارة الرواتب', 
    nameEn: 'Payroll Management', 
    description: 'حساب وإدارة رواتب الموظفين',
    category: moduleCategories[4]
  },
  { 
    id: 'attendance', 
    nameAr: 'نظام الحضور', 
    nameEn: 'Attendance System', 
    description: 'تتبع حضور وانصراف الموظفين',
    category: moduleCategories[4]
  },
  { 
    id: 'leaves', 
    nameAr: 'إدارة الإجازات', 
    nameEn: 'Leave Management', 
    description: 'إدارة طلبات الإجازات والرصيد',
    category: moduleCategories[4]
  },
  { 
    id: 'performance', 
    nameAr: 'تقييم الأداء', 
    nameEn: 'Performance Management', 
    description: 'تقييم ومتابعة أداء الموظفين',
    category: moduleCategories[4],
    advanced: true
  },
  { 
    id: 'recruitment', 
    nameAr: 'إدارة التوظيف', 
    nameEn: 'Recruitment Management', 
    description: 'إدارة عمليات التوظيف والمقابلات',
    category: moduleCategories[4],
    advanced: true
  },

  // Advanced Modules
  { 
    id: 'analytics', 
    nameAr: 'التحليلات المتقدمة', 
    nameEn: 'Advanced Analytics', 
    description: 'تحليلات البيانات والتقارير المتقدمة',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'api', 
    nameAr: 'واجهة برمجية', 
    nameEn: 'API Integration', 
    description: 'ربط النظام مع الأنظمة الخارجية',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'mobile_app', 
    nameAr: 'تطبيق الجوال', 
    nameEn: 'Mobile Application', 
    description: 'تطبيق جوال للعملاء والموظفين',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'notifications', 
    nameAr: 'نظام الإشعارات', 
    nameEn: 'Notification System', 
    description: 'إشعارات SMS وبريد إلكتروني',
    category: moduleCategories[5]
  },
  { 
    id: 'multi_location', 
    nameAr: 'تعدد الفروع', 
    nameEn: 'Multi-Location Support', 
    description: 'إدارة عدة فروع أو مواقع',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'compliance', 
    nameAr: 'الامتثال القانوني', 
    nameEn: 'Compliance Management', 
    description: 'إدارة الامتثال للقوانين واللوائح',
    category: moduleCategories[5],
    advanced: true
  }
];

export const businessTypes: BusinessType[] = [
  {
    id: 'car_rental',
    nameAr: 'تأجير السيارات',
    nameEn: 'Car Rental',
    icon: Car,
    modules: [
      'contracts', 'accounting', 'customers', 'vehicles', 'maintenance', 
      'insurance', 'gps', 'hr', 'bookings', 'payments', 'notifications'
    ],
    description: 'نظام شامل لإدارة شركات تأجير السيارات'
  },
  {
    id: 'yacht_rental', 
    nameAr: 'تأجير اليخوت',
    nameEn: 'Yacht Rental',
    icon: Anchor,
    modules: [
      'contracts', 'accounting', 'customers', 'fleet', 'crew', 'bookings', 
      'hospitality', 'services', 'packages', 'insurance', 'hr'
    ],
    description: 'إدارة أعمال تأجير اليخوت والقوارب'
  },
  {
    id: 'equipment_rental',
    nameAr: 'تأجير المعدات',
    nameEn: 'Equipment Rental', 
    icon: Wrench,
    modules: [
      'contracts', 'accounting', 'customers', 'equipment', 'maintenance', 
      'work_orders', 'insurance', 'gps', 'inventory', 'hr'
    ],
    description: 'إدارة شركات تأجير المعدات والآلات'
  },
  {
    id: 'restaurant',
    nameAr: 'إدارة مطعم',
    nameEn: 'Restaurant Management',
    icon: UtensilsCrossed,
    modules: [
      'menu', 'orders', 'accounting', 'customers', 'bookings', 'pos', 
      'kitchen', 'delivery', 'hr', 'inventory', 'payments'
    ],
    description: 'نظام شامل لإدارة المطاعم والمقاهي'
  },
  {
    id: 'salon',
    nameAr: 'إدارة صالون',
    nameEn: 'Salon Management',
    icon: Scissors,
    modules: [
      'appointments', 'services', 'accounting', 'customers', 'packages', 
      'pos', 'hr', 'inventory', 'payments'
    ],
    description: 'إدارة صالونات التجميل ومراكز العناية'
  },
  {
    id: 'hr_only',
    nameAr: 'نظام HR فقط',
    nameEn: 'HR System Only',
    icon: Users,
    modules: [
      'hr', 'payroll', 'attendance', 'leaves', 'accounting', 
      'performance', 'recruitment'
    ],
    description: 'نظام متخصص في إدارة الموارد البشرية'
  },
  {
    id: 'bookings_only',
    nameAr: 'نظام حجوزات فقط',
    nameEn: 'Bookings Only',
    icon: Calendar,
    modules: [
      'bookings', 'customers', 'payments', 'notifications', 
      'customer_portal', 'accounting'
    ],
    description: 'نظام متخصص في إدارة الحجوزات والمواعيد'
  },
  {
    id: 'custom',
    nameAr: 'أخرى (مخصص)',
    nameEn: 'Other (Custom)',
    icon: Settings,
    modules: [
      'contracts', 'accounting', 'customers', 'hr', 'bookings', 'payments'
    ],
    description: 'تخصيص النظام حسب احتياجاتك الخاصة'
  }
];