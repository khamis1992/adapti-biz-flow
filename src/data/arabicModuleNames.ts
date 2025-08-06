// Arabic module names mapping for complete localization
export const arabicModuleNames: Record<string, string> = {
  // Core modules
  'dashboard': 'لوحة التحكم',
  'contracts': 'إدارة العقود',
  'customers': 'إدارة العملاء',
  'settings': 'الإعدادات',
  
  // Financial modules
  'accounting': 'المحاسبة المالية',
  'advanced_accounting': 'المحاسبة المتقدمة',
  'ledger': 'دفتر الأستاذ',
  'invoicing': 'نظام الفوترة',
  'invoices': 'إدارة الفواتير',
  'payments': 'إدارة المدفوعات',
  'e_invoicing': 'الفوترة الإلكترونية',
  'financial_reports': 'التقارير المالية',
  'financial-reports': 'التقارير المالية',
  
  // Operations modules
  'vehicles': 'إدارة المركبات',
  'fleet': 'إدارة الأسطول',
  'equipment': 'إدارة المعدات',
  'maintenance': 'إدارة الصيانة',
  'insurance': 'إدارة التأمينات',
  'gps': 'تتبع GPS',
  'inventory': 'إدارة المخزون',
  'purchasing': 'إدارة المشتريات',
  'projects': 'إدارة المشاريع',
  'work-orders': 'أوامر العمل',
  'manufacturing': 'التصنيع',
  'quality-management': 'إدارة الجودة',
  
  // HR modules
  'hr': 'الموارد البشرية',
  'advanced-hr': 'الموارد البشرية المتقدمة',
  'payroll': 'نظام الرواتب',
  'advanced-payroll': 'نظام الرواتب المتقدم',
  'attendance': 'الحضور والانصراف',
  'leaves': 'إدارة الإجازات',
  
  // Customer service modules
  'bookings': 'نظام الحجوزات',
  'customer_portal': 'بوابة العملاء',
  'complaints': 'إدارة الشكاوى',
  'loyalty': 'برنامج الولاء',
  
  // Restaurant modules
  'menu': 'إدارة القائمة',
  'menu-management': 'إدارة القائمة',
  'orders': 'إدارة الطلبات',
  'order-management': 'إدارة الطلبات',
  'kitchen': 'إدارة المطبخ',
  'kitchen-management': 'إدارة المطبخ',
  'delivery': 'إدارة التوصيل',
  'delivery-management': 'إدارة التوصيل',
  'pos': 'نقاط البيع',
  'restaurant': 'إدارة المطعم',
  
  // Salon modules
  'salon': 'إدارة الصالون',
  'appointments': 'إدارة المواعيد',
  'services': 'إدارة الخدمات',
  'staff': 'إدارة الموظفين',
  
  // Advanced modules
  'analytics': 'التحليلات والتقارير',
  'advanced-analytics': 'التحليلات المتقدمة',
  'advanced-inventory': 'إدارة المخزون المتقدمة',
  'advanced-sales': 'إدارة المبيعات المتقدمة',
  'advanced-crm': 'إدارة العلاقات المتقدمة',
  'advanced-pos': 'نقاط البيع المتقدمة',
  'advanced-procurement': 'المشتريات المتقدمة',
  'document-management': 'إدارة المستندات',
  'system-integrations': 'تكاملات النظام',
  'business_intelligence': 'ذكاء الأعمال',
  'ai_assistant': 'المساعد الذكي',
  'cybersecurity': 'الأمان السيبراني',
  'legal_compliance': 'الامتثال القانوني',
  'risk_management': 'إدارة المخاطر',
  'performance_monitoring': 'مراقبة الأداء',
  'backup_recovery': 'النسخ الاحتياطي',
  'notifications': 'الإشعارات الذكية',
  'permissions': 'الصلاحيات المتقدمة',
  'geographic_expansion': 'التوسع الجغرافي',
  'partnership_management': 'إدارة الشراكات',
  'digital_marketing': 'التسويق الرقمي',
  'social_media': 'إدارة وسائل التواصل',
  'marketplace_integration': 'تكامل الأسواق',
  'supply_chain': 'تحسين سلسلة التوريد',
  'workflow_automation': 'أتمتة سير العمل',
  'api_management': 'إدارة واجهات البرمجة',
  'data_visualization': 'تصور البيانات',
  'mobile_app': 'إدارة التطبيقات المحمولة',
  'cloud_integration': 'التكامل السحابي',
  'realtime_collaboration': 'التعاون في الوقت الفعلي',
  'voice_assistant': 'المساعد الصوتي',
  'blockchain': 'تكامل البلوك تشين',
  'iot_management': 'إدارة إنترنت الأشياء',
  'quantum_computing': 'الحوسبة الكمية',
  'augmented_reality': 'الواقع المعزز'
};

// Category names in Arabic
export const arabicCategoryNames: Record<string, string> = {
  'core': 'الوحدات الأساسية',
  'financial': 'النظام المالي',
  'operations': 'العمليات التشغيلية',
  'customer': 'خدمة العملاء',
  'hr': 'الموارد البشرية',
  'advanced': 'الوحدات المتقدمة',
  'restaurant': 'وحدات المطاعم',
  'salon': 'وحدات الصالونات',
  'yacht': 'وحدات اليخوت'
};

// Business type names in Arabic
export const arabicBusinessTypes: Record<string, string> = {
  'car_rental': 'تأجير السيارات',
  'yacht_rental': 'تأجير اليخوت',
  'equipment_rental': 'تأجير المعدات',
  'restaurant': 'إدارة مطعم',
  'salon': 'إدارة صالون',
  'hr_only': 'نظام الموارد البشرية فقط',
  'bookings_only': 'نظام الحجوزات فقط',
  'custom': 'مخصص'
};

// Common UI text in Arabic
export const arabicUIText = {
  // Navigation
  'dashboard': 'لوحة التحكم',
  'modules': 'الوحدات',
  'settings': 'الإعدادات',
  'logout': 'تسجيل الخروج',
  'profile': 'الملف الشخصي',
  
  // Actions
  'add': 'إضافة',
  'edit': 'تعديل',
  'delete': 'حذف',
  'save': 'حفظ',
  'cancel': 'إلغاء',
  'search': 'بحث',
  'filter': 'فلترة',
  'export': 'تصدير',
  'import': 'استيراد',
  'print': 'طباعة',
  'view': 'عرض',
  'details': 'التفاصيل',
  'new': 'جديد',
  'create': 'إنشاء',
  'update': 'تحديث',
  'refresh': 'تحديث',
  'back': 'رجوع',
  'next': 'التالي',
  'previous': 'السابق',
  'submit': 'إرسال',
  'confirm': 'تأكيد',
  'close': 'إغلاق',
  
  // Status
  'active': 'نشط',
  'inactive': 'غير نشط',
  'pending': 'معلق',
  'completed': 'مكتمل',
  'cancelled': 'ملغي',
  'approved': 'موافق عليه',
  'rejected': 'مرفوض',
  'draft': 'مسودة',
  'published': 'منشور',
  
  // Common fields
  'name': 'الاسم',
  'description': 'الوصف',
  'date': 'التاريخ',
  'time': 'الوقت',
  'amount': 'المبلغ',
  'quantity': 'الكمية',
  'price': 'السعر',
  'total': 'الإجمالي',
  'status': 'الحالة',
  'type': 'النوع',
  'category': 'الفئة',
  'email': 'البريد الإلكتروني',
  'phone': 'رقم الهاتف',
  'address': 'العنوان',
  'notes': 'ملاحظات',
  'created_at': 'تاريخ الإنشاء',
  'updated_at': 'تاريخ التحديث',
  
  // Messages
  'success': 'تم بنجاح',
  'error': 'حدث خطأ',
  'warning': 'تحذير',
  'info': 'معلومات',
  'loading': 'جاري التحميل...',
  'no_data': 'لا توجد بيانات',
  'confirm_delete': 'هل أنت متأكد من الحذف؟',
  'save_success': 'تم الحفظ بنجاح',
  'delete_success': 'تم الحذف بنجاح',
  'update_success': 'تم التحديث بنجاح',
  'create_success': 'تم الإنشاء بنجاح'
};

// Helper function to get Arabic module name
export const getArabicModuleName = (moduleId: string): string => {
  return arabicModuleNames[moduleId] || moduleId;
};

// Helper function to get Arabic category name
export const getArabicCategoryName = (categoryId: string): string => {
  return arabicCategoryNames[categoryId] || categoryId;
};

// Helper function to get Arabic business type name
export const getArabicBusinessTypeName = (businessTypeId: string): string => {
  return arabicBusinessTypes[businessTypeId] || businessTypeId;
};

