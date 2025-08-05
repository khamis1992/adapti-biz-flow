import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, ChevronRight, ChevronLeft, Building2, Settings, Users, Rocket } from 'lucide-react';
import { OnboardingState, OnboardingFormData } from '@/types/onboarding';
import { businessTypes, allModules, moduleCategories } from '@/data/onboardingData';
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import BusinessTypeCard from '@/components/onboarding/BusinessTypeCard';
import ModuleSelectionCard from '@/components/onboarding/ModuleSelectionCard';
import { getAvailableModules, handleModuleSelection } from '@/utils/moduleDependencies';
import { toast } from 'sonner';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-mesh">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary mx-auto"></div>
          <p className="text-muted-foreground font-medium">جاري التحميل...</p>
        </div>
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
        return module ? module.nameAr : id;
      }).join(', ');
      
      toast.info(`تم إضافة الوحدات المطلوبة تلقائياً: ${moduleNames}`);
    }

    // Show notification for auto-removed dependent modules
    if (result.autoRemovedModules.length > 1) {
      const removedDependents = result.autoRemovedModules.filter(id => id !== moduleId);
      if (removedDependents.length > 0) {
        const moduleNames = removedDependents.map(id => {
          const module = allModules.find(m => m.id === id);
          return module ? module.nameAr : id;
        }).join(', ');
        
        toast.info(`تم إزالة الوحدات التابعة تلقائياً: ${moduleNames}`);
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
      toast.error('يرجى إدخال اسم الشركة');
      return;
    }
    
    // If user is not authenticated, redirect to auth page first
    if (!user) {
      toast.error('يرجى تسجيل الدخول أولاً لإكمال الإعداد');
      window.location.href = '/signin';
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
        toast.success('تم إنشاء النظام بنجاح!');
        // Give some time for tenant data to be created and then redirect to system setup
        setTimeout(() => {
          window.location.href = '/settings';
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating system:', error);
      toast.error('حدث خطأ أثناء إنشاء النظام');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (step: number) => {
    switch(step) {
      case 1: return Building2;
      case 2: return Settings; 
      case 3: return Users;
      case 4: return Rocket;
      default: return Building2;
    }
  };

  const getStepData = () => {
    const steps = [
      {
        title: 'اختيار نوع النشاط',
        description: 'حدد نوع عملك التجاري لتخصيص النظام المناسب',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        title: 'تحديد الوحدات',
        description: 'اختر الوحدات التي تحتاجها لإدارة عملك',
        color: 'from-purple-500 to-pink-500'
      },
      {
        title: 'الإعدادات العامة',
        description: 'أدخل المعلومات الأساسية لشركتك',
        color: 'from-green-500 to-emerald-500'
      },
      {
        title: 'ملخص الإعداد',
        description: 'راجع إعداداتك قبل إنشاء النظام',
        color: 'from-orange-500 to-red-500'
      }
    ];
    return steps[state.currentStep - 1];
  };

  const currentStepData = getStepData();
  const StepIcon = getStepIcon(state.currentStep);

  const canProceedToNext = () => {
    switch (state.currentStep) {
      case 1: return state.selectedBusinessType !== '';
      case 2: return state.selectedModules.length > 0;
      case 3: return state.formData.companyName.trim() !== '';
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh relative overflow-hidden" dir="rtl">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <OnboardingHeader />

      {/* Enhanced Progress Bar */}
      <div className="container mx-auto px-6 py-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => {
              const Icon = getStepIcon(step);
              const isActive = step === state.currentStep;
              const isCompleted = step < state.currentStep;
              
              return (
                <div key={step} className="flex items-center">
                  <div className={`
                    relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                    ${isActive 
                      ? 'border-primary bg-primary text-primary-foreground shadow-lg scale-110' 
                      : isCompleted 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted bg-muted text-muted-foreground'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
                    )}
                  </div>
                  {step < 4 && (
                    <div className={`
                      w-24 h-1 mx-2 transition-all duration-300
                      ${step < state.currentStep ? 'bg-primary' : 'bg-muted'}
                    `}></div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Step indicator */}
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              الخطوة {state.currentStep} من {totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Step Header */}
          <div className="text-center mb-12 space-y-6">
            <div className={`
              inline-flex items-center justify-center w-20 h-20 rounded-3xl 
              bg-gradient-to-br ${currentStepData.color} 
              text-white shadow-2xl mb-6 animate-bounce
            `}>
              <StepIcon className="w-10 h-10" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in-down">
              {currentStepData.title}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
              {currentStepData.description}
            </p>
          </div>

          {/* Enhanced Content Card */}
          <Card className="backdrop-blur-xl bg-card/95 border-0 shadow-2xl rounded-3xl overflow-hidden animate-scale-in">
            <CardContent className="p-8 md:p-12">
              
              {/* Step 1: Business Type Selection */}
              {state.currentStep === 1 && (
                <div className="space-y-10">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">ما نوع عملك؟</h3>
                    <p className="text-lg text-muted-foreground">
                      اختر نوع نشاطك التجاري لنقوم بإعداد النظام المثالي لاحتياجاتك
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {businessTypes.map((type, index) => (
                      <div 
                        key={type.id} 
                        className="animate-fade-in-up hover:scale-105 transition-transform duration-300"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <BusinessTypeCard
                          businessType={type}
                          isSelected={state.selectedBusinessType === type.id}
                          onSelect={() => handleBusinessTypeSelect(type.id)}
                          isRTL={state.isRTL}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Module Selection */}
              {state.currentStep === 2 && (
                <div className="space-y-10">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">أي الوحدات تحتاج؟</h3>
                    <p className="text-lg text-muted-foreground">
                      اختر الوحدات التي تريد استخدامها في نظامك - يمكنك إضافة المزيد لاحقاً
                    </p>
                    
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {state.selectedModules.length}
                      </div>
                      <span className="font-medium">وحدة مختارة</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {moduleCategories
                      .sort((a, b) => a.order - b.order)
                      .map((category, index) => (
                        <div 
                          key={category.id}
                          className="animate-fade-in-up hover:scale-105 transition-transform duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <ModuleSelectionCard
                            category={category}
                            modules={modulesByCategory.get(category.id) || []}
                            selectedModules={state.selectedModules}
                            onModuleToggle={handleModuleToggle}
                            isRTL={state.isRTL}
                            availableModules={availableModules}
                            allModules={allModules}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Step 3: Company Settings */}
              {state.currentStep === 3 && (
                <div className="space-y-10">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">معلومات شركتك</h3>
                    <p className="text-lg text-muted-foreground">
                      أدخل البيانات الأساسية لشركتك لإعداد النظام
                    </p>
                  </div>
                  
                  <div className="max-w-2xl mx-auto">
                    <Card className="p-8 bg-gradient-to-br from-card to-muted/50 border border-border/50 shadow-lg">
                      <div className="space-y-8">
                        {/* Company Name */}
                        <div className="space-y-3">
                          <Label htmlFor="companyName" className="text-base font-medium flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            اسم الشركة *
                          </Label>
                          <Input
                            id="companyName"
                            value={state.formData.companyName}
                            onChange={(e) => updateFormData({ companyName: e.target.value })}
                            placeholder="أدخل اسم شركتك"
                            className="h-14 text-lg bg-background/50 backdrop-blur-sm"
                          />
                        </div>
                        
                        {/* Currency and Country */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-base font-medium flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-secondary"></div>
                              العملة
                            </Label>
                            <Select value={state.formData.currency} onValueChange={(value) => updateFormData({ currency: value })}>
                              <SelectTrigger className="h-14 text-lg bg-background/50 backdrop-blur-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
                                <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                                <SelectItem value="EUR">يورو (EUR)</SelectItem>
                                <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                                <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-medium flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-accent"></div>
                              الدولة
                            </Label>
                            <Select value={state.formData.country} onValueChange={(value) => updateFormData({ country: value })}>
                              <SelectTrigger className="h-14 text-lg bg-background/50 backdrop-blur-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="KW">الكويت</SelectItem>
                                <SelectItem value="SA">السعودية</SelectItem>
                                <SelectItem value="AE">الإمارات</SelectItem>
                                <SelectItem value="QA">قطر</SelectItem>
                                <SelectItem value="BH">البحرين</SelectItem>
                                <SelectItem value="OM">عمان</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Additional Settings */}
                        <div className="space-y-6 pt-6 border-t border-border">
                          <h4 className="text-lg font-medium">إعدادات إضافية</h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <Checkbox 
                                id="accounting" 
                                checked={state.formData.needsAccounting}
                                onCheckedChange={(checked) => updateFormData({ needsAccounting: !!checked })}
                              />
                              <Label htmlFor="accounting" className="text-sm">
                                تفعيل وحدة المحاسبة المتقدمة
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <Checkbox 
                                id="payroll" 
                                checked={state.formData.needsPayroll}
                                onCheckedChange={(checked) => updateFormData({ needsPayroll: !!checked })}
                              />
                              <Label htmlFor="payroll" className="text-sm">
                                تفعيل وحدة الرواتب والموارد البشرية
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 4: Summary */}
              {state.currentStep === 4 && (
                <div className="space-y-10">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">كل شيء جاهز!</h3>
                    <p className="text-lg text-muted-foreground">
                      راجع إعداداتك قبل إنشاء نظامك الجديد
                    </p>
                  </div>
                  
                  <div className="max-w-3xl mx-auto space-y-6">
                    {/* Company Info Summary */}
                    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        معلومات الشركة
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">اسم الشركة:</span>
                          <p className="font-semibold">{state.formData.companyName}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">العملة:</span>
                          <p className="font-semibold">{state.formData.currency}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">الدولة:</span>
                          <p className="font-semibold">{state.formData.country}</p>
                        </div>
                      </div>
                    </Card>

                    {/* Business Type Summary */}
                    <Card className="p-6 bg-gradient-to-br from-secondary/5 to-accent/5">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-secondary" />
                        نوع النشاط التجاري
                      </h4>
                      <p className="font-semibold">
                        {businessTypes.find(t => t.id === state.selectedBusinessType)?.nameAr || 'غير محدد'}
                      </p>
                    </Card>

                    {/* Modules Summary */}
                    <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-accent" />
                        الوحدات المختارة ({state.selectedModules.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {state.selectedModules.map(moduleId => {
                          const module = allModules.find(m => m.id === moduleId);
                          return module ? (
                            <div key={moduleId} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>{module.nameAr}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={state.currentStep === 1}
              className="px-8 py-4 h-auto text-lg disabled:opacity-50 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80"
            >
              <ChevronRight className="w-5 h-5 ml-2" />
              السابق
            </Button>

            <div className="flex-1 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground text-sm">
                <span>الخطوة {state.currentStep} من {totalSteps}</span>
              </div>
            </div>

            {state.currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!canProceedToNext()}
                className="px-8 py-4 h-auto text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg disabled:opacity-50"
              >
                التالي
                <ChevronLeft className="w-5 h-5 mr-2" />
              </Button>
            ) : (
              <Button
                onClick={handleCreateSystem}
                disabled={isSubmitting || !canProceedToNext()}
                className="px-8 py-4 h-auto text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white ml-2"></div>
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 ml-2" />
                    إنشاء النظام
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}