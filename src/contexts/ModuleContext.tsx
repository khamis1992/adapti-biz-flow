import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ModuleState, ModuleConfig, ModuleIntegration, ModuleEvent } from '@/types/modules';
import { useTenant } from '@/hooks/useTenant';

interface ModuleContextType {
  state: ModuleState;
  enabledModules: string[];
  enableModule: (moduleId: string) => void;
  disableModule: (moduleId: string) => void;
  updateModuleData: (moduleId: string, data: Record<string, any>) => void;
  triggerEvent: (event: Omit<ModuleEvent, 'id' | 'timestamp' | 'processed'>) => void;
  getIntegratedData: (moduleId: string) => Record<string, any>;
  isModuleEnabled: (moduleId: string) => boolean;
  getModuleDependencies: (moduleId: string) => string[];
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

type ModuleAction = 
  | { type: 'ENABLE_MODULE'; payload: string }
  | { type: 'DISABLE_MODULE'; payload: string }
  | { type: 'UPDATE_MODULE_DATA'; payload: { moduleId: string; data: Record<string, any> } }
  | { type: 'TRIGGER_EVENT'; payload: ModuleEvent }
  | { type: 'PROCESS_EVENT'; payload: string }
  | { type: 'INITIALIZE_MODULES'; payload: { configs: Record<string, ModuleConfig>; enabled: string[] } };

function moduleReducer(state: ModuleState, action: ModuleAction): ModuleState {
  switch (action.type) {
    case 'INITIALIZE_MODULES':
      return {
        ...state,
        moduleConfigs: action.payload.configs,
        enabledModules: action.payload.enabled,
      };
    
    case 'ENABLE_MODULE':
      if (state.enabledModules.includes(action.payload)) return state;
      return {
        ...state,
        enabledModules: [...state.enabledModules, action.payload],
      };
    
    case 'DISABLE_MODULE':
      return {
        ...state,
        enabledModules: state.enabledModules.filter(id => id !== action.payload),
      };
    
    case 'UPDATE_MODULE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.moduleId]: {
            moduleId: action.payload.moduleId,
            data: action.payload.data,
            lastUpdated: new Date(),
            version: (state.data[action.payload.moduleId]?.version || 0) + 1,
          },
        },
      };
    
    case 'TRIGGER_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    
    case 'PROCESS_EVENT':
      return {
        ...state,
        events: state.events.map(event => 
          event.id === action.payload ? { ...event, processed: true } : event
        ),
      };
    
    default:
      return state;
  }
}

const initialState: ModuleState = {
  enabledModules: [],
  moduleConfigs: {},
  integrations: [],
  data: {},
  events: [],
};

export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(moduleReducer, initialState);
  const { modules } = useTenant();

  // Initialize modules from tenant data
  useEffect(() => {
    if (modules && modules.length > 0) {
      const configs: Record<string, ModuleConfig> = {};
      const enabled: string[] = [];

      modules.forEach(module => {
        configs[module.module_id] = {
          id: module.module_id,
          nameAr: module.module_id,
          nameEn: module.module_id,
          descriptionAr: '',
          category: 'general',
          icon: 'Settings',
          path: `/${module.module_id}`,
          dependencies: [],
          order: 0,
          isEnabled: module.is_enabled,
        };

        if (module.is_enabled) {
          enabled.push(module.module_id);
        }
      });

      dispatch({ type: 'INITIALIZE_MODULES', payload: { configs, enabled } });
    }
  }, [modules]);

  const enableModule = (moduleId: string) => {
    dispatch({ type: 'ENABLE_MODULE', payload: moduleId });
  };

  const disableModule = (moduleId: string) => {
    dispatch({ type: 'DISABLE_MODULE', payload: moduleId });
  };

  const updateModuleData = (moduleId: string, data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_MODULE_DATA', payload: { moduleId, data } });
    
    // Trigger integration events
    const integrations = state.integrations.filter(i => i.sourceModule === moduleId);
    integrations.forEach(integration => {
      triggerEvent({
        moduleId: integration.targetModule,
        eventType: 'data_sync',
        data: { sourceModule: moduleId, sourceData: data, integration },
      });
    });
  };

  const triggerEvent = (event: Omit<ModuleEvent, 'id' | 'timestamp' | 'processed'>) => {
    const fullEvent: ModuleEvent = {
      ...event,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      processed: false,
    };
    dispatch({ type: 'TRIGGER_EVENT', payload: fullEvent });
  };

  const getIntegratedData = (moduleId: string): Record<string, any> => {
    const moduleData = state.data[moduleId]?.data || {};
    const integrations = state.integrations.filter(i => i.targetModule === moduleId);
    
    const integratedData = { ...moduleData };
    integrations.forEach(integration => {
      const sourceData = state.data[integration.sourceModule]?.data;
      if (sourceData) {
        integratedData[`${integration.sourceModule}_data`] = sourceData;
      }
    });
    
    return integratedData;
  };

  const isModuleEnabled = (moduleId: string): boolean => {
    return state.enabledModules.includes(moduleId);
  };

  const getModuleDependencies = (moduleId: string): string[] => {
    return state.moduleConfigs[moduleId]?.dependencies || [];
  };

  const value: ModuleContextType = {
    state,
    enabledModules: state.enabledModules,
    enableModule,
    disableModule,
    updateModuleData,
    triggerEvent,
    getIntegratedData,
    isModuleEnabled,
    getModuleDependencies,
  };

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModules() {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
}

