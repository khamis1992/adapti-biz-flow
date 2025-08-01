import { ComponentType, SVGProps } from 'react';

export interface BusinessType {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  modules: string[];
  description?: string;
}

export interface Module {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  category: ModuleCategory;
  required?: boolean;
  businessTypes?: string[];
  advanced?: boolean;
  dependencies?: string[];
}

export interface ModuleCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  order: number;
}

export interface OnboardingFormData {
  companyName: string;
  currency: string;
  country: string;
  needsAccounting: boolean;
  needsPayroll: boolean;
  defaultUsers: number;
}

export interface OnboardingState {
  currentStep: number;
  selectedBusinessType: string;
  selectedModules: string[];
  formData: OnboardingFormData;
  isRTL: boolean;
}