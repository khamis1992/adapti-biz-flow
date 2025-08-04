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
  Heart,
  Factory,
  CheckCircle,
  FolderOpen,
  Link,
  UserCheck,
  Calculator
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
    category: moduleCategories[0]
  },
  { 
    id: 'customers', 
    nameAr: 'إدارة العملاء', 
    nameEn: 'Customer Management', 
    description: 'إدارة بيانات العملاء والتواصل',
    category: moduleCategories[0]
  },

  // Financial System
  { 
    id: 'accounting', 
    nameAr: 'النظام المحاسبي الكامل', 
    nameEn: 'Full Accounting System', 
    description: 'نظام محاسبي متكامل مع التقارير المالية',
    category: moduleCategories[1]
  },
  { 
    id: 'advanced_accounting', 
    nameAr: 'النظام المحاسبي المتقدم', 
    nameEn: 'Advanced Accounting System', 
    description: 'نظام محاسبي متطور مع ميزات متقدمة',
    category: moduleCategories[1],
    dependencies: ['accounting'],
    advanced: true
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
  { 
    id: 'financial_reports', 
    nameAr: 'التقارير المالية', 
    nameEn: 'Financial Reports', 
    description: 'تقارير مالية شاملة ومتقدمة',
    category: moduleCategories[1],
    dependencies: ['accounting']
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
    id: 'advanced_inventory', 
    nameAr: 'إدارة المخزون المتقدمة', 
    nameEn: 'Advanced Inventory Management', 
    description: 'نظام مخزون متطور مع تتبع فوري',
    category: moduleCategories[2],
    dependencies: ['inventory'],
    advanced: true
  },
  { 
    id: 'purchasing', 
    nameAr: 'إدارة المشتريات', 
    nameEn: 'Purchasing Management', 
    description: 'إدارة المشتريات والموردين',
    category: moduleCategories[2]
  },
  { 
    id: 'advanced_procurement', 
    nameAr: 'إدارة المشتريات المتقدمة', 
    nameEn: 'Advanced Procurement', 
    description: 'نظام مشتريات متطور مع إدارة الموردين',
    category: moduleCategories[2],
    dependencies: ['purchasing'],
    advanced: true
  },
  { 
    id: 'supply_chain', 
    nameAr: 'إدارة سلسلة التوريد', 
    nameEn: 'Supply Chain Management', 
    description: 'إدارة الموردين وسلسلة التوريد',
    category: moduleCategories[2],
    advanced: true
  },
  { 
    id: 'projects', 
    nameAr: 'إدارة المشاريع', 
    nameEn: 'Project Management', 
    description: 'تخطيط وتنفيذ ومتابعة المشاريع',
    category: moduleCategories[2]
  },
  { 
    id: 'manufacturing', 
    nameAr: 'إدارة التصنيع', 
    nameEn: 'Manufacturing Management', 
    description: 'إدارة عمليات التصنيع والإنتاج',
    category: moduleCategories[2],
    advanced: true
  },
  { 
    id: 'quality_management', 
    nameAr: 'إدارة الجودة', 
    nameEn: 'Quality Management', 
    description: 'نظام إدارة الجودة والفحوصات',
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
    id: 'advanced_crm', 
    nameAr: 'نظام CRM المتقدم', 
    nameEn: 'Advanced CRM System', 
    description: 'نظام CRM متطور مع ميزات متقدمة',
    category: moduleCategories[3],
    dependencies: ['crm'],
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
  { 
    id: 'advanced_sales', 
    nameAr: 'إدارة المبيعات المتقدمة', 
    nameEn: 'Advanced Sales Management', 
    description: 'نظام مبيعات متطور مع قمع المبيعات',
    category: moduleCategories[3],
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
    id: 'menu_management', 
    nameAr: 'إدارة المنيو المتقدمة', 
    nameEn: 'Advanced Menu Management', 
    description: 'نظام إدارة منيو متطور للمطاعم',
    category: moduleCategories[2],
    dependencies: ['menu'],
    businessTypes: ['restaurant'],
    advanced: true
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
    id: 'order_management', 
    nameAr: 'إدارة الطلبات المتقدمة', 
    nameEn: 'Advanced Order Management', 
    description: 'نظام طلبات متطور للمطاعم',
    category: moduleCategories[2],
    dependencies: ['orders'],
    businessTypes: ['restaurant'],
    advanced: true
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
    id: 'advanced_pos', 
    nameAr: 'نظام نقاط البيع المتقدم', 
    nameEn: 'Advanced POS System', 
    description: 'نظام POS متطور مع ميزات متقدمة',
    category: moduleCategories[2],
    dependencies: ['pos'],
    advanced: true
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
    id: 'kitchen_management', 
    nameAr: 'إدارة المطبخ المتقدمة', 
    nameEn: 'Advanced Kitchen Management', 
    description: 'نظام إدارة مطبخ متطور',
    category: moduleCategories[2],
    dependencies: ['kitchen'],
    businessTypes: ['restaurant'],
    advanced: true
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
    id: 'delivery_management', 
    nameAr: 'إدارة التوصيل المتقدمة', 
    nameEn: 'Advanced Delivery Management', 
    description: 'نظام توصيل متطور مع تتبع GPS',
    category: moduleCategories[2],
    dependencies: ['delivery'],
    businessTypes: ['restaurant'],
    advanced: true
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
    id: 'salon_services', 
    nameAr: 'خدمات الصالون', 
    nameEn: 'Salon Services', 
    description: 'إدارة خدمات الصالون المتخصصة',
    category: moduleCategories[2],
    dependencies: ['services'],
    businessTypes: ['salon'],
    advanced: true
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
    id: 'salon_appointments', 
    nameAr: 'مواعيد الصالون', 
    nameEn: 'Salon Appointments', 
    description: 'نظام مواعيد متخصص للصالونات',
    category: moduleCategories[3],
    dependencies: ['appointments'],
    businessTypes: ['salon'],
    advanced: true
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
  { 
    id: 'yacht_management', 
    nameAr: 'إدارة اليخوت', 
    nameEn: 'Yacht Management', 
    description: 'نظام إدارة اليخوت الشامل',
    category: moduleCategories[2],
    dependencies: ['fleet'],
    businessTypes: ['yacht_rental'],
    advanced: true
  },
  { 
    id: 'booking_system', 
    nameAr: 'نظام الحجوزات الشامل', 
    nameEn: 'Comprehensive Booking System', 
    description: 'نظام حجوزات متطور لجميع الخدمات',
    category: moduleCategories[3],
    dependencies: ['bookings'],
    advanced: true
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
    id: 'advanced_hr', 
    nameAr: 'الموارد البشرية المتقدمة', 
    nameEn: 'Advanced Human Resources', 
    description: 'نظام موارد بشرية متطور مع ميزات متقدمة',
    category: moduleCategories[4],
    dependencies: ['hr'],
    advanced: true
  },
  { 
    id: 'payroll', 
    nameAr: 'إدارة الرواتب', 
    nameEn: 'Payroll Management', 
    description: 'حساب وإدارة رواتب الموظفين',
    category: moduleCategories[4]
  },
  { 
    id: 'advanced_payroll', 
    nameAr: 'نظام الرواتب المتقدم', 
    nameEn: 'Advanced Payroll System', 
    description: 'نظام رواتب متطور مع جميع المكونات',
    category: moduleCategories[4],
    dependencies: ['payroll'],
    advanced: true
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
    id: 'system_integrations', 
    nameAr: 'التكاملات المتقدمة', 
    nameEn: 'Advanced System Integrations', 
    description: 'تكاملات متقدمة مع الأنظمة الخارجية',
    category: moduleCategories[5],
    dependencies: ['api'],
    advanced: true
  },
  { 
    id: 'document_management', 
    nameAr: 'إدارة الوثائق', 
    nameEn: 'Document Management', 
    description: 'نظام إدارة الوثائق والملفات',
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
  },

  // Additional Advanced Modules (New)
  { 
    id: 'complaints_management', 
    nameAr: 'إدارة الشكاوى', 
    nameEn: 'Complaints Management', 
    description: 'نظام إدارة شكاوى العملاء والمتابعة',
    category: moduleCategories[3],
    advanced: true
  },
  { 
    id: 'ecommerce_store', 
    nameAr: 'المتجر الإلكتروني', 
    nameEn: 'E-commerce Store', 
    description: 'متجر إلكتروني متكامل للبيع أونلاين',
    category: moduleCategories[2],
    advanced: true
  },
  { 
    id: 'customer_shopping', 
    nameAr: 'تسوق العملاء', 
    nameEn: 'Customer Shopping', 
    description: 'واجهة تسوق العملاء في المتجر الإلكتروني',
    category: moduleCategories[3],
    dependencies: ['ecommerce_store'],
    advanced: true
  },
  { 
    id: 'customer_booking', 
    nameAr: 'حجوزات العملاء', 
    nameEn: 'Customer Booking', 
    description: 'نظام حجوزات العملاء المتقدم',
    category: moduleCategories[3],
    dependencies: ['bookings'],
    advanced: true
  },
  { 
    id: 'product_catalog', 
    nameAr: 'كتالوج المنتجات', 
    nameEn: 'Product Catalog', 
    description: 'إدارة كتالوج المنتجات والخدمات',
    category: moduleCategories[2],
    advanced: true
  },
  { 
    id: 'product_details', 
    nameAr: 'تفاصيل المنتجات', 
    nameEn: 'Product Details', 
    description: 'عرض تفاصيل المنتجات والمواصفات',
    category: moduleCategories[2],
    dependencies: ['product_catalog'],
    advanced: true
  },
  { 
    id: 'shopping_cart', 
    nameAr: 'سلة التسوق', 
    nameEn: 'Shopping Cart', 
    description: 'نظام سلة التسوق والدفع',
    category: moduleCategories[2],
    dependencies: ['ecommerce_store'],
    advanced: true
  },
  { 
    id: 'checkout', 
    nameAr: 'إتمام الطلب', 
    nameEn: 'Checkout', 
    description: 'نظام إتمام الطلبات والدفع الآمن',
    category: moduleCategories[2],
    dependencies: ['shopping_cart'],
    advanced: true
  },
  { 
    id: 'order_tracking', 
    nameAr: 'تتبع الطلبات', 
    nameEn: 'Order Tracking', 
    description: 'تتبع حالة الطلبات والشحنات',
    category: moduleCategories[2],
    dependencies: ['checkout'],
    advanced: true
  },
  { 
    id: 'ecommerce_product_management', 
    nameAr: 'إدارة منتجات التجارة الإلكترونية', 
    nameEn: 'E-commerce Product Management', 
    description: 'إدارة منتجات المتجر الإلكتروني',
    category: moduleCategories[2],
    dependencies: ['ecommerce_store'],
    advanced: true
  },
  { 
    id: 'ecommerce_order_management', 
    nameAr: 'إدارة طلبات التجارة الإلكترونية', 
    nameEn: 'E-commerce Order Management', 
    description: 'إدارة طلبات المتجر الإلكتروني',
    category: moduleCategories[2],
    dependencies: ['ecommerce_store'],
    advanced: true
  },
  { 
    id: 'cyber_security', 
    nameAr: 'الأمان السيبراني', 
    nameEn: 'Cyber Security', 
    description: 'نظام الحماية والأمان السيبراني',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'ai_assistant', 
    nameAr: 'المساعد الذكي', 
    nameEn: 'AI Assistant', 
    description: 'مساعد ذكي بالذكاء الاصطناعي',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'business_intelligence', 
    nameAr: 'ذكاء الأعمال', 
    nameEn: 'Business Intelligence', 
    description: 'نظام ذكاء الأعمال والتحليلات',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'legal_compliance', 
    nameAr: 'الامتثال القانوني المتقدم', 
    nameEn: 'Legal Compliance', 
    description: 'نظام الامتثال القانوني المتطور',
    category: moduleCategories[5],
    dependencies: ['compliance'],
    advanced: true
  },
  { 
    id: 'customer_behavior_analysis', 
    nameAr: 'تحليل سلوك العملاء', 
    nameEn: 'Customer Behavior Analysis', 
    description: 'تحليل سلوك العملاء والتنبؤ',
    category: moduleCategories[3],
    advanced: true
  },
  { 
    id: 'multi_language_support', 
    nameAr: 'الدعم متعدد اللغات', 
    nameEn: 'Multi-Language Support', 
    description: 'دعم متعدد اللغات للنظام',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'risk_management', 
    nameAr: 'إدارة المخاطر', 
    nameEn: 'Risk Management', 
    description: 'نظام إدارة وتقييم المخاطر',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'advanced_backup', 
    nameAr: 'النسخ الاحتياطي المتقدم', 
    nameEn: 'Advanced Backup', 
    description: 'نظام النسخ الاحتياطي المتطور',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'performance_monitoring', 
    nameAr: 'مراقبة الأداء', 
    nameEn: 'Performance Monitoring', 
    description: 'مراقبة أداء النظام والخوادم',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'smart_notifications', 
    nameAr: 'الإشعارات الذكية', 
    nameEn: 'Smart Notifications', 
    description: 'نظام إشعارات ذكي ومتقدم',
    category: moduleCategories[5],
    dependencies: ['notifications'],
    advanced: true
  },
  { 
    id: 'advanced_permissions', 
    nameAr: 'الصلاحيات المتقدمة', 
    nameEn: 'Advanced Permissions', 
    description: 'نظام صلاحيات متقدم ومرن',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'geographic_expansion', 
    nameAr: 'التوسع الجغرافي', 
    nameEn: 'Geographic Expansion', 
    description: 'إدارة التوسع الجغرافي والفروع',
    category: moduleCategories[5],
    dependencies: ['multi_location'],
    advanced: true
  },
  { 
    id: 'advanced_analytics_dashboard', 
    nameAr: 'لوحة التحليلات المتقدمة', 
    nameEn: 'Advanced Analytics Dashboard', 
    description: 'لوحة تحليلات متقدمة وتفاعلية',
    category: moduleCategories[5],
    dependencies: ['analytics'],
    advanced: true
  },
  { 
    id: 'partnership_management', 
    nameAr: 'إدارة الشراكات', 
    nameEn: 'Partnership Management', 
    description: 'إدارة الشراكات التجارية',
    category: moduleCategories[2],
    advanced: true
  },
  { 
    id: 'loyalty_rewards', 
    nameAr: 'برنامج المكافآت', 
    nameEn: 'Loyalty Rewards', 
    description: 'نظام مكافآت العملاء المتقدم',
    category: moduleCategories[3],
    dependencies: ['loyalty'],
    advanced: true
  },
  { 
    id: 'digital_marketing', 
    nameAr: 'التسويق الرقمي', 
    nameEn: 'Digital Marketing', 
    description: 'أدوات التسويق الرقمي والحملات',
    category: moduleCategories[3],
    advanced: true
  },
  { 
    id: 'advanced_content_management', 
    nameAr: 'إدارة المحتوى المتقدمة', 
    nameEn: 'Advanced Content Management', 
    description: 'نظام إدارة محتوى متطور',
    category: moduleCategories[5],
    dependencies: ['document_management'],
    advanced: true
  },
  { 
    id: 'advanced_ecommerce', 
    nameAr: 'التجارة الإلكترونية المتقدمة', 
    nameEn: 'Advanced E-commerce', 
    description: 'ميزات التجارة الإلكترونية المتقدمة',
    category: moduleCategories[2],
    dependencies: ['ecommerce_store'],
    advanced: true
  },
  { 
    id: 'social_media_management', 
    nameAr: 'إدارة وسائل التواصل الاجتماعي', 
    nameEn: 'Social Media Management', 
    description: 'إدارة حسابات وسائل التواصل',
    category: moduleCategories[3],
    advanced: true
  },
  { 
    id: 'marketplace_integration', 
    nameAr: 'تكامل الأسواق الإلكترونية', 
    nameEn: 'Marketplace Integration', 
    description: 'التكامل مع الأسواق الإلكترونية',
    category: moduleCategories[2],
    dependencies: ['ecommerce_store'],
    advanced: true
  },
  { 
    id: 'supply_chain_optimization', 
    nameAr: 'تحسين سلسلة التوريد', 
    nameEn: 'Supply Chain Optimization', 
    description: 'تحسين وتطوير سلسلة التوريد',
    category: moduleCategories[2],
    dependencies: ['supply_chain'],
    advanced: true
  },
  { 
    id: 'digital_asset_management', 
    nameAr: 'إدارة الأصول الرقمية', 
    nameEn: 'Digital Asset Management', 
    description: 'إدارة الملفات والأصول الرقمية',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'workflow_automation', 
    nameAr: 'أتمتة سير العمل', 
    nameEn: 'Workflow Automation', 
    description: 'أتمتة العمليات وسير العمل',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'api_management', 
    nameAr: 'إدارة واجهات البرمجة', 
    nameEn: 'API Management', 
    description: 'إدارة واجهات البرمجة والتكاملات',
    category: moduleCategories[5],
    dependencies: ['api'],
    advanced: true
  },
  { 
    id: 'data_visualization', 
    nameAr: 'تصور البيانات', 
    nameEn: 'Data Visualization', 
    description: 'تصور البيانات والتحليلات البصرية',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'mobile_app_management', 
    nameAr: 'إدارة التطبيقات المحمولة', 
    nameEn: 'Mobile App Management', 
    description: 'إدارة التطبيقات المحمولة',
    category: moduleCategories[5],
    dependencies: ['mobile_app'],
    advanced: true
  },
  { 
    id: 'cloud_integration', 
    nameAr: 'التكامل السحابي', 
    nameEn: 'Cloud Integration', 
    description: 'التكامل مع الخدمات السحابية',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'realtime_collaboration', 
    nameAr: 'التعاون في الوقت الفعلي', 
    nameEn: 'Realtime Collaboration', 
    description: 'أدوات التعاون في الوقت الفعلي',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'voice_assistant', 
    nameAr: 'المساعد الصوتي', 
    nameEn: 'Voice Assistant', 
    description: 'مساعد صوتي ذكي للنظام',
    category: moduleCategories[5],
    dependencies: ['ai_assistant'],
    advanced: true
  },
  { 
    id: 'blockchain_integration', 
    nameAr: 'تكامل البلوك تشين', 
    nameEn: 'Blockchain Integration', 
    description: 'التكامل مع تقنيات البلوك تشين',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'iot_management', 
    nameAr: 'إدارة إنترنت الأشياء', 
    nameEn: 'IoT Management', 
    description: 'إدارة أجهزة إنترنت الأشياء',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'quantum_computing', 
    nameAr: 'الحوسبة الكمية', 
    nameEn: 'Quantum Computing', 
    description: 'تقنيات الحوسبة الكمية المتقدمة',
    category: moduleCategories[5],
    advanced: true
  },
  { 
    id: 'augmented_reality', 
    nameAr: 'الواقع المعزز', 
    nameEn: 'Augmented Reality', 
    description: 'تقنيات الواقع المعزز للأعمال',
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

