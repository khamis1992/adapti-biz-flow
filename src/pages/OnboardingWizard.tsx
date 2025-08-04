import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { OnboardingState, OnboardingFormData } from '@/types/onboarding';
import { businessTypes, allModules, moduleCategories } from '@/data/onboardingData';
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import BusinessTypeCard from '@/components/onboarding/BusinessTypeCard';
import ModuleSelectionCard from '@/components/onboarding/ModuleSelectionCard';
import { getAvailableModules, handleModuleSelection } from '@/utils/moduleDependencies';
import { toast } from 'sonner';

// All interfaces and data are now imported from separate files

export default function OnboardingWizard() {
  const { user, loading, completeOnboarding } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    selectedBusinessType: '',
    selectedModules: [],
    formData: {
      companyName: '',
      currency: 'KWD',
      country: 'KW',
      needsAccounting: true,
      needsPayroll: true,
      defaultUsers: 5
    },
    isRTL: true
  });

  // Get available modules based on current selection and business type
  const availableModules = useMemo(() => {
    return getAvailableModules(allModules, state.selectedModules, state.selectedBusinessType);
  }, [state.selectedModules, state.selectedBusinessType]);

  // Organize modules by category for better display
  const modulesByCategory = useMemo(() => {
    const categoryMap = new Map();
    
    // Initialize all categories
    moduleCategories.forEach(category => {
      categoryMap.set(category.id, []);
    });
    
    // Group all modules by category (we'll filter available ones in the component)
    allModules.forEach(module => {
      const categoryModules = categoryMap.get(module.category.id) || [];
      categoryModules.push(module);
      categoryMap.set(module.category.id, categoryModules);
    });
    
    return categoryMap;
  }, []);

  // Show loading spinner only if user is authenticated and loading
  if (user && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalSteps = 4;

  const handleBusinessTypeSelect = (typeId: string) => {
    setState(prev => {
      const businessType = businessTypes.find(t => t.id === typeId);
      if (businessType) {
        const requiredModules = allModules.filter(m => m.required).map(m => m.id);
        const businessModules = [...new Set([...requiredModules, ...businessType.modules])];
        
        return {
          ...prev,
          selectedBusinessType: typeId,
          selectedModules: businessModules
        };
      }
      return { ...prev, selectedBusinessType: typeId };
    });
  };

  const handleModuleToggle = (moduleId: string) => {
    const isCurrentlySelected = state.selectedModules.includes(moduleId);
    const result = handleModuleSelection(
      allModules,
      state.selectedModules,
      moduleId,
      !isCurrentlySelected
    );

    // Show warning if provided
    if (result.warningMessage) {
      toast.warning(result.warningMessage);
      return;
    }

    // Show notification for auto-added dependencies
    if (result.autoAddedModules.length > 0) {
      const moduleNames = result.autoAddedModules.map(id => {
        const module = allModules.find(m => m.id === id);
        return module ? (state.isRTL ? module.nameAr : module.nameEn) : id;
      }).join(', ');
      
      toast.info(
        state.isRTL 
          ? `تم إضافة الوحدات المطلوبة تلقائياً: ${moduleNames}`
          : `Auto-added required modules: ${moduleNames}`
      );
    }

    // Show notification for auto-removed dependent modules
    if (result.autoRemovedModules.length > 1) { // More than just the module being removed
      const removedDependents = result.autoRemovedModules.filter(id => id !== moduleId);
      if (removedDependents.length > 0) {
        const moduleNames = removedDependents.map(id => {
          const module = allModules.find(m => m.id === id);
          return module ? (state.isRTL ? module.nameAr : module.nameEn) : id;
        }).join(', ');
        
        toast.info(
          state.isRTL 
            ? `تم إزالة الوحدات التابعة تلقائياً: ${moduleNames}`
            : `Auto-removed dependent modules: ${moduleNames}`
        );
      }
    }

    setState(prev => ({
      ...prev,
      selectedModules: result.newSelection
    }));
  };

  const nextStep = () => {
    if (state.currentStep < totalSteps) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const updateFormData = (updates: Partial<OnboardingFormData>) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates }
    }));
  };

  const handleCreateSystem = async () => {
    if (!state.formData.companyName.trim()) {
      alert('يرجى إدخال اسم الشركة');
      return;
    }
    
    // If user is not authenticated, redirect to auth page first
    if (!user) {
      alert('يرجى تسجيل الدخول أولاً لإكمال الإعداد');
      window.location.href = '/auth';
      return;
    }
    
    setIsSubmitting(true);
    try {
      const onboardingData = {
        selectedBusinessType: state.selectedBusinessType,
        selectedModules: state.selectedModules,
        companyName: state.formData.companyName,
        currency: state.formData.currency,
        country: state.formData.country,
        needsAccounting: state.formData.needsAccounting,
        needsPayroll: state.formData.needsPayroll,
        defaultUsers: state.formData.defaultUsers
      };

      const { error, tenantId } = await completeOnboarding(onboardingData);
      
      if (!error && tenantId) {
        // Give some time for tenant data to be created and then redirect to system setup
        setTimeout(() => {
          window.location.href = '/settings';
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating system:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentStepData = () => {
    switch (state.currentStep) {
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
          descriptionAr: 'اختر الوحدات التي تريد تفعيلها في نظامك (مرتبة حسب الفئات)',
          descriptionEn: 'Choose the modules you want to activate in your system (organized by categories)'
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
    <div className={`min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 ${state.isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <OnboardingHeader 
        isRTL={state.isRTL} 
        onLanguageToggle={() => setState(prev => ({ ...prev, isRTL: !prev.isRTL }))} 
      />

      {/* Progress Bar */}
      <OnboardingProgress 
        currentStep={state.currentStep} 
        totalSteps={totalSteps} 
        isRTL={state.isRTL} 
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Card className="max-w-6xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              {state.isRTL ? stepData.titleAr : stepData.titleEn}
            </CardTitle>
            <CardDescription className="text-lg">
              {state.isRTL ? stepData.descriptionAr : stepData.descriptionEn}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Business Type Selection */}
            {state.currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {businessTypes.map((type) => (
                  <BusinessTypeCard
                    key={type.id}
                    businessType={type}
                    isSelected={state.selectedBusinessType === type.id}
                    onSelect={() => handleBusinessTypeSelect(type.id)}
                    isRTL={state.isRTL}
                  />
                ))}
              </div>
            )}

            {/* Step 2: Module Selection */}
            {state.currentStep === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {moduleCategories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => (
                     <ModuleSelectionCard
                       key={category.id}
                       category={category}
                       modules={modulesByCategory.get(category.id) || []}
                       selectedModules={state.selectedModules}
                       onModuleToggle={handleModuleToggle}
                       isRTL={state.isRTL}
                       availableModules={availableModules}
                       allModules={allModules}
                     />
                  ))}
              </div>
            )}

            {/* Step 3: General Settings */}
            {state.currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">
                      {state.isRTL ? 'اسم الشركة' : 'Company Name'}
                    </Label>
                    <Input
                      id="companyName"
                      value={state.formData.companyName}
                      onChange={(e) => updateFormData({ companyName: e.target.value })}
                      placeholder={state.isRTL ? 'أدخل اسم الشركة' : 'Enter company name'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currency">
                      {state.isRTL ? 'العملة' : 'Currency'}
                    </Label>
                    <Select value={state.formData.currency} onValueChange={(value) => updateFormData({ currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KWD">
                          {state.isRTL ? 'دينار كويتي (KWD)' : 'Kuwaiti Dinar (KWD)'}
                        </SelectItem>
                        <SelectItem value="USD">
                          {state.isRTL ? 'دولار أمريكي (USD)' : 'US Dollar (USD)'}
                        </SelectItem>
                        <SelectItem value="EUR">
                          {state.isRTL ? 'يورو (EUR)' : 'Euro (EUR)'}
                        </SelectItem>
                        <SelectItem value="SAR">
                          {state.isRTL ? 'ريال سعودي (SAR)' : 'Saudi Riyal (SAR)'}
                        </SelectItem>
                        <SelectItem value="AED">
                          {state.isRTL ? 'درهم إماراتي (AED)' : 'UAE Dirham (AED)'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="country">
                      {state.isRTL ? 'الدولة' : 'Country'}
                    </Label>
                    <Select value={state.formData.country} onValueChange={(value) => updateFormData({ country: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KW">
                          {state.isRTL ? 'الكويت' : 'Kuwait'}
                        </SelectItem>
                        <SelectItem value="SA">
                          {state.isRTL ? 'السعودية' : 'Saudi Arabia'}
                        </SelectItem>
                        <SelectItem value="AE">
                          {state.isRTL ? 'الإمارات' : 'UAE'}
                        </SelectItem>
                        <SelectItem value="QA">
                          {state.isRTL ? 'قطر' : 'Qatar'}
                        </SelectItem>
                        <SelectItem value="BH">
                          {state.isRTL ? 'البحرين' : 'Bahrain'}
                        </SelectItem>
                        <SelectItem value="OM">
                          {state.isRTL ? 'عمان' : 'Oman'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={state.formData.needsAccounting}
                      onCheckedChange={(checked) => updateFormData({ needsAccounting: !!checked })}
                    />
                    <Label>
                      {state.isRTL ? 'هل تحتاج النظام المحاسبي؟' : 'Do you need the accounting system?'}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={state.formData.needsPayroll}
                      onCheckedChange={(checked) => updateFormData({ needsPayroll: !!checked })}
                    />
                    <Label>
                      {state.isRTL ? 'هل تحتاج وحدة الرواتب؟' : 'Do you need the payroll module?'}
                    </Label>
                  </div>

                  <div>
                    <Label htmlFor="defaultUsers">
                      {state.isRTL ? 'عدد المستخدمين الافتراضي' : 'Default number of users'}
                    </Label>
                    <Input
                      id="defaultUsers"
                      type="number"
                      value={state.formData.defaultUsers}
                      onChange={(e) => updateFormData({ defaultUsers: parseInt(e.target.value) || 5 })}
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {state.currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {state.isRTL ? 'نوع النشاط المختار' : 'Selected Business Type'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {state.selectedBusinessType && (() => {
                        const selectedType = businessTypes.find(t => t.id === state.selectedBusinessType);
                        return selectedType && (
                          <div className="flex items-center gap-3">
                            <selectedType.icon className="w-8 h-8" />
                            <div>
                              <div className="font-medium">
                                {state.isRTL ? selectedType.nameAr : selectedType.nameEn}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedType.description}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {state.isRTL ? 'الإعدادات العامة' : 'General Settings'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>{state.isRTL ? 'اسم الشركة:' : 'Company:'}</strong> {state.formData.companyName}</p>
                      <p><strong>{state.isRTL ? 'العملة:' : 'Currency:'}</strong> {state.formData.currency}</p>
                      <p><strong>{state.isRTL ? 'الدولة:' : 'Country:'}</strong> {state.formData.country}</p>
                      <p><strong>{state.isRTL ? 'المستخدمين:' : 'Users:'}</strong> {state.formData.defaultUsers}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moduleCategories
                    .sort((a, b) => a.order - b.order)
                    .map((category) => {
                      const categoryModules = state.selectedModules
                        .map(moduleId => allModules.find(m => m.id === moduleId))
                        .filter(module => module && module.category.id === category.id);
                      
                      if (categoryModules.length === 0) return null;
                      
                      return (
                        <Card key={category.id}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <category.icon className="w-5 h-5" />
                              {state.isRTL ? category.nameAr : category.nameEn}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {categoryModules.map(module => module && (
                                <div key={module.id} className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                                  <span>{state.isRTL ? module.nameAr : module.nameEn}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={state.currentStep === 1}
                className="flex items-center gap-2"
              >
                {!state.isRTL && <ChevronLeft className="w-4 h-4" />}
                {state.isRTL ? 'السابق' : 'Previous'}
                {state.isRTL && <ChevronRight className="w-4 h-4" />}
              </Button>

              {state.currentStep < totalSteps ? (
                <Button 
                  onClick={nextStep} 
                  disabled={state.currentStep === 1 && !state.selectedBusinessType}
                  className="flex items-center gap-2"
                >
                  {state.isRTL ? 'التالي' : 'Next'}
                  {!state.isRTL && <ChevronRight className="w-4 h-4" />}
                  {state.isRTL && <ChevronLeft className="w-4 h-4" />}
                </Button>
              ) : (
                <Button 
                  className="flex items-center gap-2 bg-gradient-primary hover:bg-gradient-primary/90"
                  onClick={handleCreateSystem}
                  disabled={isSubmitting}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isSubmitting 
                    ? (state.isRTL ? 'جاري الإعداد...' : 'Setting up...')
                    : (state.isRTL ? 'إنشاء النظام' : 'Create System')
                  }
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}