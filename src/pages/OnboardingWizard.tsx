import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
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
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Globe
} from 'lucide-react';
import heroLogo from '@/assets/erp-hero-logo.jpg';

interface BusinessType {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: React.ReactNode;
  modules: string[];
}

interface Module {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  required?: boolean;
}

const businessTypes: BusinessType[] = [
  {
    id: 'car_rental',
    nameAr: 'تأجير السيارات',
    nameEn: 'Car Rental',
    icon: <Car className="w-8 h-8" />,
    modules: ['contracts', 'accounting', 'customers', 'vehicles', 'maintenance', 'insurance', 'gps', 'hr']
  },
  {
    id: 'yacht_rental', 
    nameAr: 'تأجير اليخوت',
    nameEn: 'Yacht Rental',
    icon: <Anchor className="w-8 h-8" />,
    modules: ['contracts', 'accounting', 'customers', 'fleet', 'crew', 'bookings', 'hospitality']
  },
  {
    id: 'equipment_rental',
    nameAr: 'تأجير المعدات',
    nameEn: 'Equipment Rental', 
    icon: <Wrench className="w-8 h-8" />,
    modules: ['contracts', 'accounting', 'customers', 'equipment', 'maintenance', 'work_orders']
  },
  {
    id: 'restaurant',
    nameAr: 'إدارة مطعم',
    nameEn: 'Restaurant Management',
    icon: <UtensilsCrossed className="w-8 h-8" />,
    modules: ['menu', 'orders', 'accounting', 'customers', 'bookings', 'pos', 'hr']
  },
  {
    id: 'salon',
    nameAr: 'إدارة صالون',
    nameEn: 'Salon Management',
    icon: <Scissors className="w-8 h-8" />,
    modules: ['appointments', 'services', 'accounting', 'customers', 'packages', 'hr']
  },
  {
    id: 'hr_only',
    nameAr: 'نظام HR فقط',
    nameEn: 'HR System Only',
    icon: <Users className="w-8 h-8" />,
    modules: ['hr', 'payroll', 'attendance', 'leaves', 'accounting']
  },
  {
    id: 'bookings_only',
    nameAr: 'نظام حجوزات فقط',
    nameEn: 'Bookings Only',
    icon: <Calendar className="w-8 h-8" />,
    modules: ['bookings', 'customers', 'payments', 'notifications']
  },
  {
    id: 'custom',
    nameAr: 'أخرى (مخصص)',
    nameEn: 'Other (Custom)',
    icon: <Settings className="w-8 h-8" />,
    modules: ['contracts', 'accounting', 'customers', 'hr']
  }
];

const allModules: Module[] = [
  { id: 'contracts', nameAr: 'إدارة العقود', nameEn: 'Contract Management', description: 'إدارة العقود والاتفاقيات', required: true },
  { id: 'accounting', nameAr: 'النظام المالي الكامل', nameEn: 'Full Accounting System', description: 'نظام محاسبي متكامل', required: true },
  { id: 'customers', nameAr: 'إدارة العملاء', nameEn: 'Customer Management', description: 'إدارة بيانات العملاء', required: true },
  { id: 'ledger', nameAr: 'دفتر الأستاذ', nameEn: 'General Ledger', description: 'دفتر الأستاذ العام' },
  { id: 'vehicles', nameAr: 'إدارة المركبات', nameEn: 'Vehicle Management', description: 'إدارة الأسطول والمركبات' },
  { id: 'maintenance', nameAr: 'الصيانة', nameEn: 'Maintenance', description: 'إدارة صيانة المركبات' },
  { id: 'insurance', nameAr: 'التأمينات', nameEn: 'Insurance', description: 'إدارة تأمينات المركبات' },
  { id: 'gps', nameAr: 'تتبع GPS', nameEn: 'GPS Tracking', description: 'تتبع المركبات بالـ GPS' },
  { id: 'work_orders', nameAr: 'أوامر العمل', nameEn: 'Work Orders', description: 'إدارة أوامر العمل والمهام' },
  { id: 'menu', nameAr: 'المنيو / الطلبات', nameEn: 'Menu / Orders', description: 'إدارة المنيو والطلبات' },
  { id: 'bookings', nameAr: 'وحدة الحجوزات', nameEn: 'Booking Module', description: 'نظام إدارة الحجوزات' },
  { id: 'hr', nameAr: 'الموارد البشرية', nameEn: 'Human Resources', description: 'إدارة الموظفين والرواتب' },
  { id: 'inventory', nameAr: 'إدارة المخزون', nameEn: 'Inventory Management', description: 'إدارة المخزون والمواد' },
  { id: 'customer_portal', nameAr: 'بوابة العميل', nameEn: 'Customer Portal', description: 'بوابة العملاء الإلكترونية' },
  { id: 'e_invoicing', nameAr: 'إصدار الفواتير الإلكترونية', nameEn: 'E-Invoicing', description: 'نظام الفوترة الإلكترونية' }
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    companyName: '',
    currency: 'KWD',
    country: 'KW',
    needsAccounting: true,
    needsPayroll: true,
    defaultUsers: 5
  });
  const [isRTL, setIsRTL] = useState(true);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleBusinessTypeSelect = (typeId: string) => {
    setSelectedBusinessType(typeId);
    const businessType = businessTypes.find(t => t.id === typeId);
    if (businessType) {
      const requiredModules = allModules.filter(m => m.required).map(m => m.id);
      setSelectedModules([...requiredModules, ...businessType.modules]);
    }
  };

  const handleModuleToggle = (moduleId: string) => {
    const module = allModules.find(m => m.id === moduleId);
    if (module?.required) return; // Can't toggle required modules
    
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentStepData = () => {
    switch (currentStep) {
      case 1:
        return {
          titleAr: 'اختيار نوع النشاط',
          titleEn: 'Select Business Type',
          descriptionAr: 'اختر نوع النشاط التجاري لشركتك لتخصيص النظام وفقاً لاحتياجاتك',
          descriptionEn: 'Choose your business type to customize the system according to your needs'
        };
      case 2:
        return {
          titleAr: 'تحديد الوحدات',
          titleEn: 'Select Modules', 
          descriptionAr: 'اختر الوحدات التي تريد تفعيلها في نظامك',
          descriptionEn: 'Choose the modules you want to activate in your system'
        };
      case 3:
        return {
          titleAr: 'الإعدادات العامة',
          titleEn: 'General Settings',
          descriptionAr: 'أدخل البيانات الأساسية لشركتك وتفضيلات النظام',
          descriptionEn: 'Enter your company basic information and system preferences'
        };
      case 4:
        return {
          titleAr: 'ملخص الإعداد',
          titleEn: 'Setup Summary',
          descriptionAr: 'راجع إعداداتك قبل إنشاء النظام',
          descriptionEn: 'Review your settings before creating the system'
        };
      default:
        return { titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '' };
    }
  };

  const stepData = getCurrentStepData();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={heroLogo} alt="ERP Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {isRTL ? 'نظام إدارة الأعمال المتكامل' : 'Integrated Business Management System'}
                </h1>
                <p className="text-blue-100">
                  {isRTL ? 'إعداد النظام لأول مرة' : 'First-time System Setup'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsRTL(!isRTL)}
              className="text-white hover:bg-white/20"
            >
              <Globe className="w-4 h-4 mr-2" />
              {isRTL ? 'English' : 'العربية'}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {isRTL ? `الخطوة ${currentStep} من ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              {isRTL ? stepData.titleAr : stepData.titleEn}
            </CardTitle>
            <CardDescription className="text-lg">
              {isRTL ? stepData.descriptionAr : stepData.descriptionEn}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Business Type Selection */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {businessTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
                      selectedBusinessType === type.id 
                        ? 'ring-2 ring-primary shadow-glow bg-primary/5' 
                        : 'hover:shadow-soft'
                    }`}
                    onClick={() => handleBusinessTypeSelect(type.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`mx-auto mb-4 p-3 rounded-full ${
                        selectedBusinessType === type.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {type.icon}
                      </div>
                      <h3 className="font-semibold mb-2">
                        {isRTL ? type.nameAr : type.nameEn}
                      </h3>
                      {selectedBusinessType === type.id && (
                        <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 2: Module Selection */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allModules.map((module) => (
                  <div
                    key={module.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                      selectedModules.includes(module.id) 
                        ? 'bg-primary/5 border-primary' 
                        : 'bg-background border-border hover:bg-accent'
                    } ${isRTL ? 'space-x-reverse' : ''}`}
                  >
                    <Checkbox
                      checked={selectedModules.includes(module.id)}
                      onCheckedChange={() => handleModuleToggle(module.id)}
                      disabled={module.required}
                    />
                    <div className="flex-1">
                      <Label className="font-medium cursor-pointer">
                        {isRTL ? module.nameAr : module.nameEn}
                        {module.required && (
                          <span className="text-xs text-primary ml-2">
                            {isRTL ? '(مطلوب)' : '(Required)'}
                          </span>
                        )}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: General Settings */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">
                      {isRTL ? 'اسم الشركة' : 'Company Name'}
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder={isRTL ? 'أدخل اسم الشركة' : 'Enter company name'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currency">
                      {isRTL ? 'العملة' : 'Currency'}
                    </Label>
                    <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KWD">
                          {isRTL ? 'دينار كويتي (KWD)' : 'Kuwaiti Dinar (KWD)'}
                        </SelectItem>
                        <SelectItem value="USD">
                          {isRTL ? 'دولار أمريكي (USD)' : 'US Dollar (USD)'}
                        </SelectItem>
                        <SelectItem value="EUR">
                          {isRTL ? 'يورو (EUR)' : 'Euro (EUR)'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="country">
                      {isRTL ? 'الدولة' : 'Country'}
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KW">
                          {isRTL ? 'الكويت' : 'Kuwait'}
                        </SelectItem>
                        <SelectItem value="SA">
                          {isRTL ? 'السعودية' : 'Saudi Arabia'}
                        </SelectItem>
                        <SelectItem value="AE">
                          {isRTL ? 'الإمارات' : 'UAE'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.needsAccounting}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, needsAccounting: !!checked }))}
                    />
                    <Label>
                      {isRTL ? 'هل تحتاج النظام المحاسبي؟' : 'Do you need the accounting system?'}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.needsPayroll}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, needsPayroll: !!checked }))}
                    />
                    <Label>
                      {isRTL ? 'هل تحتاج وحدة الرواتب؟' : 'Do you need the payroll module?'}
                    </Label>
                  </div>

                  <div>
                    <Label htmlFor="defaultUsers">
                      {isRTL ? 'عدد المستخدمين الافتراضي' : 'Default number of users'}
                    </Label>
                    <Input
                      id="defaultUsers"
                      type="number"
                      value={formData.defaultUsers}
                      onChange={(e) => setFormData(prev => ({ ...prev, defaultUsers: parseInt(e.target.value) || 5 }))}
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isRTL ? 'نوع النشاط المختار' : 'Selected Business Type'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedBusinessType && (
                        <div className="flex items-center gap-3">
                          {businessTypes.find(t => t.id === selectedBusinessType)?.icon}
                          <span className="font-medium">
                            {isRTL 
                              ? businessTypes.find(t => t.id === selectedBusinessType)?.nameAr
                              : businessTypes.find(t => t.id === selectedBusinessType)?.nameEn
                            }
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isRTL ? 'الإعدادات العامة' : 'General Settings'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>{isRTL ? 'اسم الشركة:' : 'Company:'}</strong> {formData.companyName}</p>
                      <p><strong>{isRTL ? 'العملة:' : 'Currency:'}</strong> {formData.currency}</p>
                      <p><strong>{isRTL ? 'الدولة:' : 'Country:'}</strong> {formData.country}</p>
                      <p><strong>{isRTL ? 'المستخدمين:' : 'Users:'}</strong> {formData.defaultUsers}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'الوحدات المفعّلة' : 'Activated Modules'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedModules.map(moduleId => {
                        const module = allModules.find(m => m.id === moduleId);
                        return module ? (
                          <div key={moduleId} className="flex items-center gap-2 p-2 bg-primary/5 rounded">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <span className="text-sm">
                              {isRTL ? module.nameAr : module.nameEn}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                {!isRTL && <ChevronLeft className="w-4 h-4" />}
                {isRTL ? 'التالي' : 'Previous'}
                {isRTL && <ChevronRight className="w-4 h-4" />}
              </Button>

              {currentStep < totalSteps ? (
                <Button 
                  onClick={nextStep} 
                  disabled={currentStep === 1 && !selectedBusinessType}
                  className="flex items-center gap-2"
                >
                  {isRTL ? 'التالي' : 'Next'}
                  {!isRTL && <ChevronRight className="w-4 h-4" />}
                  {isRTL && <ChevronLeft className="w-4 h-4" />}
                </Button>
              ) : (
                <Button 
                  variant="success"
                  className="flex items-center gap-2"
                  onClick={() => {
                    // Handle final setup
                    console.log('Setting up system with:', {
                      businessType: selectedBusinessType,
                      modules: selectedModules,
                      settings: formData
                    });
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isRTL ? 'إنشاء النظام' : 'Create System'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}