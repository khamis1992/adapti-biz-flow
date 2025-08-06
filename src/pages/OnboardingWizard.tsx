import React, { useState, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
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
  const { refreshTenant } = useTenant();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
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
      toast.error(state.isRTL ? 'يرجى إدخال اسم الشركة' : 'Please enter company name');
      return;
    }
    
    // If user is not authenticated, redirect to auth page first
    if (!user) {
      toast.error(state.isRTL ? 'يرجى تسجيل الدخول أولاً لإكمال الإعداد' : 'Please sign in first to complete setup');
      navigate('/signin');
      return;
    }
    
    setIsSubmitting(true);
    console.log('Starting onboarding process...');
    
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

      console.log('Calling completeOnboarding with data:', onboardingData);
      const { error, tenantId } = await completeOnboarding(onboardingData);
      
      if (error) {
        console.error('Onboarding failed with error:', error);
        toast.error(state.isRTL ? 'حدث خطأ في إعداد النظام' : 'Error setting up system');
        return;
      }

      if (tenantId) {
        console.log('Onboarding completed successfully, tenantId:', tenantId);
        
        toast.success(state.isRTL ? 'تم إنشاء النظام بنجاح!' : 'System created successfully!');
        
        setRedirecting(true);
        
        // Refresh tenant data to ensure the new tenant is loaded
        console.log('Refreshing tenant data...');
        await refreshTenant();
        
        // Use React Router navigation instead of window.location
        console.log('Navigating to dashboard...');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
      } else {
        console.error('No tenantId returned from onboarding');
        toast.error(state.isRTL ? 'لم يتم إرجاع معرف المؤسسة' : 'No tenant ID returned');
      }
    } catch (error) {
      console.error('Unexpected error in handleCreateSystem:', error);
      toast.error(state.isRTL ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
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
    <div className={`min-h-screen bg-gradient-mesh relative overflow-hidden ${state.isRTL ? 'rtl' : 'ltr'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-gradient-success rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-gradient-hero rounded-full opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <OnboardingHeader />

      {/* Progress Bar */}
      <OnboardingProgress 
        currentStep={state.currentStep} 
        totalSteps={totalSteps} 
        isRTL={state.isRTL} 
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Step Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block p-3 rounded-2xl bg-gradient-primary text-white shadow-glow-primary mb-4 animate-scale-in">
              {state.currentStep === 1 && <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</div>}
              {state.currentStep === 2 && <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</div>}
              {state.currentStep === 3 && <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</div>}
              {state.currentStep === 4 && <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">4</div>}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4 animate-fade-in-down">
              {state.isRTL ? stepData.titleAr : stepData.titleEn}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
              {state.isRTL ? stepData.descriptionAr : stepData.descriptionEn}
            </p>
          </div>

          {/* Content Card */}
          <Card className="backdrop-blur-xl bg-card/90 border-0 shadow-3d-soft hover:shadow-3d-medium transition-all duration-500 animate-scale-in">
            <CardContent className="p-8 md:p-12">
            {/* Step 1: Business Type Selection */}
            {state.currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-lg text-muted-foreground mb-8">
                    {state.isRTL 
                      ? 'اختر نوع عملك لنقوم بتخصيص النظام المناسب لك'
                      : 'Choose your business type to customize the perfect system for you'
                    }
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {businessTypes.map((type, index) => (
                    <div 
                      key={type.id} 
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
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

            {/* Step 2: Enhanced Module Selection with Tabs and Filters */}
            {state.currentStep === 2 && (
              <div className="space-y-8">
                {/* Header Section with Statistics */}
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {state.isRTL ? 'اختر وحدات النظام' : 'Choose System Modules'}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {state.isRTL 
                        ? 'اختر الوحدات التي تحتاجها لإدارة عملك بفعالية'
                        : 'Select the modules you need to manage your business effectively'
                      }
                    </p>
                  </div>
                  
                  {/* Enhanced Statistics Dashboard */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {state.selectedModules.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {state.isRTL ? 'وحدة مختارة' : 'Selected Modules'}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-4 border border-success/20">
                      <div className="text-2xl font-bold text-success mb-1">
                        {availableModules.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {state.isRTL ? 'وحدة متاحة' : 'Available Modules'}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl p-4 border border-warning/20">
                      <div className="text-2xl font-bold text-warning mb-1">
                        {allModules.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {state.isRTL ? 'إجمالي الوحدات' : 'Total Modules'}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/20">
                      <div className="text-2xl font-bold text-accent mb-1">
                        {moduleCategories.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {state.isRTL ? 'فئة رئيسية' : 'Categories'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className={`flex items-center justify-center gap-3 flex-wrap ${state.isRTL ? 'flex-row-reverse' : ''}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Select ALL modules (109 total)
                        const allModuleIds = allModules.map(m => m.id);
                        setState(prev => ({
                          ...prev,
                          selectedModules: allModuleIds
                        }));
                        toast.success(
                          state.isRTL 
                            ? `تم تحديد جميع الوحدات (${allModules.length})`
                            : `Selected all modules (${allModules.length})`
                        );
                      }}
                      className="text-xs"
                    >
                      {state.isRTL ? `تحديد الكل (${allModules.length})` : `Select All (${allModules.length})`}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Select only available modules for business type
                        const allAvailableModuleIds = availableModules.map(m => m.id);
                        const allRequiredModules = allModules.filter(m => m.required).map(m => m.id);
                        const allSelectedModules = [...new Set([...allRequiredModules, ...allAvailableModuleIds])];
                        
                        setState(prev => ({
                          ...prev,
                          selectedModules: allSelectedModules
                        }));
                        toast.success(
                          state.isRTL 
                            ? `تم تحديد الوحدات المتاحة (${allSelectedModules.length})`
                            : `Selected available modules (${allSelectedModules.length})`
                        );
                      }}
                      className="text-xs"
                    >
                      {state.isRTL ? `تحديد المتاحة (${availableModules.length})` : `Select Available (${availableModules.length})`}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Select only essentials (core + financial + required)
                        const essentialModules = allModules.filter(m => 
                          m.required || 
                          m.category.id === 'core' || 
                          m.category.id === 'financial'
                        ).map(m => m.id);
                        
                        setState(prev => ({
                          ...prev,
                          selectedModules: essentialModules
                        }));
                        toast.success(
                          state.isRTL 
                            ? `تم تحديد الوحدات الأساسية (${essentialModules.length})`
                            : `Selected essential modules (${essentialModules.length})`
                        );
                      }}
                      className="text-xs"
                    >
                      {state.isRTL ? 'الأساسية فقط' : 'Essentials Only'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Clear all non-required selections
                        const requiredModules = allModules.filter(m => m.required).map(m => m.id);
                        setState(prev => ({
                          ...prev,
                          selectedModules: requiredModules
                        }));
                        toast.success(
                          state.isRTL 
                            ? 'تم إلغاء جميع الاختيارات ما عدا المطلوبة'
                            : 'Cleared all selections except required'
                        );
                      }}
                      className="text-xs"
                    >
                      {state.isRTL ? 'إلغاء الاختيارات' : 'Clear All'}
                    </Button>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <Tabs defaultValue="recommended" className="w-full">
                  <TabsList className={`grid w-full grid-cols-5 ${state.isRTL ? 'rtl [&>*]:flex-row-reverse' : ''}`}>
                    <TabsTrigger value="all" className="text-sm">
                      {state.isRTL ? 'جميع الوحدات' : 'All Modules'}
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-sm">
                      {state.isRTL ? 'متقدمة' : 'Advanced'}
                    </TabsTrigger>
                    <TabsTrigger value="business" className="text-sm">
                      {state.isRTL ? 'تجارية' : 'Business'}
                    </TabsTrigger>
                    <TabsTrigger value="core" className="text-sm">
                      {state.isRTL ? 'الأساسية' : 'Core'}
                    </TabsTrigger>
                    <TabsTrigger value="recommended" className="text-sm">
                      {state.isRTL ? 'المُوصى بها' : 'Recommended'}
                    </TabsTrigger>
                  </TabsList>

                  {/* Recommended Tab */}
                  <TabsContent value="recommended" className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">
                        {state.isRTL ? 'الوحدات المُوصى بها لعملك' : 'Recommended Modules for Your Business'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {state.isRTL 
                          ? 'بناء على نوع عملك، نوصي بهذه الوحدات للبدء'
                          : 'Based on your business type, we recommend these modules to get started'
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Core Modules */}
                      {moduleCategories
                        .filter(cat => ['core', 'financial'].includes(cat.id))
                        .map(category => {
                          const categoryModules = modulesByCategory.get(category.id) || [];
                          const availableCategoryModules = categoryModules.filter(module => 
                            availableModules.some(availableModule => availableModule.id === module.id)
                          );
                          
                          if (availableCategoryModules.length === 0) return null;
                          
                          return (
                            <ModuleSelectionCard
                              key={category.id}
                              category={category}
                              modules={categoryModules}
                              selectedModules={state.selectedModules}
                              onModuleToggle={handleModuleToggle}
                              isRTL={state.isRTL}
                              availableModules={availableModules}
                              allModules={allModules}
                            />
                          );
                        })}
                    </div>
                  </TabsContent>

                  {/* Core Tab */}
                  <TabsContent value="core" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {moduleCategories
                        .filter(cat => ['core', 'financial'].includes(cat.id))
                        .map(category => {
                          const categoryModules = modulesByCategory.get(category.id) || [];
                          const availableCategoryModules = categoryModules.filter(module => 
                            availableModules.some(availableModule => availableModule.id === module.id)
                          );
                          
                          if (availableCategoryModules.length === 0) return null;
                          
                          return (
                            <ModuleSelectionCard
                              key={category.id}
                              category={category}
                              modules={categoryModules}
                              selectedModules={state.selectedModules}
                              onModuleToggle={handleModuleToggle}
                              isRTL={state.isRTL}
                              availableModules={availableModules}
                              allModules={allModules}
                            />
                          );
                        })}
                    </div>
                  </TabsContent>

                  {/* Business Tab */}
                  <TabsContent value="business" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {moduleCategories
                        .filter(cat => ['operations', 'customer'].includes(cat.id))
                        .map(category => {
                          const categoryModules = modulesByCategory.get(category.id) || [];
                          const availableCategoryModules = categoryModules.filter(module => 
                            availableModules.some(availableModule => availableModule.id === module.id)
                          );
                          
                          if (availableCategoryModules.length === 0) return null;
                          
                          return (
                            <ModuleSelectionCard
                              key={category.id}
                              category={category}
                              modules={categoryModules}
                              selectedModules={state.selectedModules}
                              onModuleToggle={handleModuleToggle}
                              isRTL={state.isRTL}
                              availableModules={availableModules}
                              allModules={allModules}
                            />
                          );
                        })}
                    </div>
                  </TabsContent>

                  {/* All Modules Tab */}
                  <TabsContent value="all" className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {state.isRTL ? 'جميع الوحدات المتاحة' : 'All Available Modules'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {state.isRTL 
                          ? `عرض جميع الوحدات (${allModules.length}) مُنظمة حسب الفئات`
                          : `View all modules (${allModules.length}) organized by categories`
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {moduleCategories
                        .sort((a, b) => a.order - b.order)
                        .map(category => {
                          const categoryModules = modulesByCategory.get(category.id) || [];
                          
                          if (categoryModules.length === 0) return null;
                          
                          return (
                            <ModuleSelectionCard
                              key={category.id}
                              category={category}
                              modules={categoryModules}
                              selectedModules={state.selectedModules}
                              onModuleToggle={handleModuleToggle}
                              isRTL={state.isRTL}
                              availableModules={allModules} // Show all modules, not just available
                              allModules={allModules}
                            />
                          );
                        })}
                    </div>
                  </TabsContent>

                  {/* Advanced Tab */}
                  <TabsContent value="advanced" className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {state.isRTL ? 'الوحدات المتقدمة' : 'Advanced Modules'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {state.isRTL 
                          ? 'وحدات متقدمة للشركات التي تحتاج ميزات إضافية'
                          : 'Advanced modules for businesses that need additional features'
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {moduleCategories
                        .filter(cat => ['hr', 'advanced'].includes(cat.id))
                        .map(category => {
                          const categoryModules = modulesByCategory.get(category.id) || [];
                          const availableCategoryModules = categoryModules.filter(module => 
                            availableModules.some(availableModule => availableModule.id === module.id)
                          );
                          
                          if (availableCategoryModules.length === 0) return null;
                          
                          return (
                            <ModuleSelectionCard
                              key={category.id}
                              category={category}
                              modules={categoryModules}
                              selectedModules={state.selectedModules}
                              onModuleToggle={handleModuleToggle}
                              isRTL={state.isRTL}
                              availableModules={availableModules}
                              allModules={allModules}
                            />
                          );
                        })}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Selection Summary */}
                {state.selectedModules.length > 0 && (
                  <div className={`bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20`} dir={state.isRTL ? 'rtl' : 'ltr'}>
                    <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${state.isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {state.isRTL ? 'ملخص الاختيارات' : 'Selection Summary'}
                    </h3>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${state.isRTL ? 'text-right' : 'text-left'}`}>
                      {moduleCategories.map(category => {
                        const categoryModules = modulesByCategory.get(category.id) || [];
                        const selectedInCategory = categoryModules.filter(m => 
                          state.selectedModules.includes(m.id)
                        );
                        
                        if (selectedInCategory.length === 0) return null;
                        
                        return (
                          <div key={category.id} className="space-y-2">
                            <div className={`flex items-center gap-2 ${state.isRTL ? '' : 'flex-row-reverse'}`}>
                              <category.icon className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">
                                {state.isRTL ? category.nameAr : category.nameEn}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {selectedInCategory.length}
                              </Badge>
                            </div>
                            <div className={`space-y-1 ${state.isRTL ? 'pr-6' : 'pl-6'}`}>
                              {selectedInCategory.slice(0, 3).map(module => (
                                <div key={module.id} className="text-xs text-muted-foreground">
                                  • {state.isRTL ? module.nameAr : module.nameEn}
                                </div>
                              ))}
                              {selectedInCategory.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  {state.isRTL 
                                    ? `+ ${selectedInCategory.length - 3} أخرى` 
                                    : `+ ${selectedInCategory.length - 3} more`
                                  }
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: General Settings */}
            {state.currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-lg text-muted-foreground mb-8">
                    {state.isRTL 
                      ? 'قم بإعداد المعلومات الأساسية لشركتك'
                      : 'Set up your company basic information'
                    }
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" dir={state.isRTL ? 'rtl' : 'ltr'}>
                  {/* Company Information */}
                  <Card className="p-6 bg-gradient-subtle border-border/50">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      {state.isRTL ? 'معلومات الشركة' : 'Company Information'}
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium">
                          {state.isRTL ? 'اسم الشركة' : 'Company Name'}
                        </Label>
                        <Input
                          id="companyName"
                          value={state.formData.companyName}
                          onChange={(e) => updateFormData({ companyName: e.target.value })}
                          placeholder={state.isRTL ? 'أدخل اسم الشركة' : 'Enter company name'}
                          className="h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currency" className="text-sm font-medium">
                          {state.isRTL ? 'العملة' : 'Currency'}
                        </Label>
                        <Select value={state.formData.currency} onValueChange={(value) => updateFormData({ currency: value })}>
                          <SelectTrigger className="h-12">
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium">
                          {state.isRTL ? 'البلد' : 'Country'}
                        </Label>
                        <Select value={state.formData.country} onValueChange={(value) => updateFormData({ country: value })}>
                          <SelectTrigger className="h-12">
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
                              {state.isRTL ? 'عُمان' : 'Oman'}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>

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
            <div className={`flex justify-between pt-12 mt-8 border-t border-border/20`}>
              {state.currentStep < totalSteps ? (
                <Button 
                  onClick={nextStep} 
                  disabled={state.currentStep === 1 && !state.selectedBusinessType}
                  className="flex items-center gap-2 px-8 py-3 h-auto bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
                >
                  <span className="font-medium">
                    {state.isRTL ? 'التالي' : 'Next'}
                  </span>
                  {!state.isRTL && <ChevronRight className="w-5 h-5" />}
                  {state.isRTL && <ChevronLeft className="w-5 h-5" />}
                </Button>
              ) : (
                <Button 
                  className="flex items-center gap-2 px-8 py-3 h-auto bg-gradient-success hover:shadow-glow-success transition-all duration-300 text-white font-semibold"
                  onClick={handleCreateSystem}
                  disabled={isSubmitting || redirecting}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {redirecting 
                      ? (state.isRTL ? 'جاري التوجيه...' : 'Redirecting...')
                      : isSubmitting 
                        ? (state.isRTL ? 'جاري الإعداد...' : 'Setting up...')
                        : (state.isRTL ? 'إنشاء النظام' : 'Create System')
                    }
                  </span>
                </Button>
              )}

              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={state.currentStep === 1}
                className="flex items-center gap-2 px-8 py-3 h-auto border-2 hover:border-primary/50 transition-all duration-300"
              >
                {!state.isRTL && <ChevronLeft className="w-5 h-5" />}
                <span className="font-medium">
                  {state.isRTL ? 'السابق' : 'Previous'}
                </span>
                {state.isRTL && <ChevronRight className="w-5 h-5" />}
              </Button>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}