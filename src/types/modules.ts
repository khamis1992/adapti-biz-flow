// Module system types for flexible ERP
export interface ModuleConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  category: string;
  icon: string;
  path: string;
  component?: React.ComponentType;
  dependencies: string[];
  order: number;
  isEnabled?: boolean;
}

export interface ModuleCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  icon: string;
  modules: string[];
}

export interface ModuleIntegration {
  sourceModule: string;
  targetModule: string;
  integrationType: 'data_sync' | 'workflow' | 'notification' | 'calculation';
  config: Record<string, any>;
}

export interface ModuleData {
  moduleId: string;
  data: Record<string, any>;
  lastUpdated: Date;
  version: number;
}

export interface ModuleEvent {
  id: string;
  moduleId: string;
  eventType: string;
  data: Record<string, any>;
  timestamp: Date;
  processed: boolean;
}

export interface ModuleState {
  enabledModules: string[];
  moduleConfigs: Record<string, ModuleConfig>;
  integrations: ModuleIntegration[];
  data: Record<string, ModuleData>;
  events: ModuleEvent[];
}

