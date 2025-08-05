import { useState, useEffect, useCallback } from 'react';
import { useModules } from '@/contexts/ModuleContext';
import { integrationService, IntegrationRule, IntegrationEvent } from '@/services/integrationService';

interface ModuleIntegrationState {
  rules: IntegrationRule[];
  events: IntegrationEvent[];
  stats: {
    totalEvents: number;
    successfulEvents: number;
    failedEvents: number;
    pendingEvents: number;
    activeRules: number;
  };
  loading: boolean;
  error: string | null;
}

export function useModuleIntegration(moduleId?: string) {
  const { isModuleEnabled } = useModules();
  const [state, setState] = useState<ModuleIntegrationState>({
    rules: [],
    events: [],
    stats: {
      totalEvents: 0,
      successfulEvents: 0,
      failedEvents: 0,
      pendingEvents: 0,
      activeRules: 0
    },
    loading: true,
    error: null
  });

  // Load integration data
  const loadData = useCallback(() => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const rules = integrationService.getRules(moduleId);
      const events = integrationService.getEvents(moduleId);
      const stats = integrationService.getIntegrationStats(moduleId);
      
      setState({
        rules,
        events,
        stats,
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }, [moduleId]);

  // Subscribe to integration events
  useEffect(() => {
    const unsubscribe = integrationService.subscribe('*', (event) => {
      if (!moduleId || event.ruleId.includes(moduleId)) {
        loadData();
      }
    });

    return unsubscribe;
  }, [moduleId, loadData]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Integration management functions
  const createRule = useCallback((rule: Omit<IntegrationRule, 'id'>) => {
    const newRule: IntegrationRule = {
      ...rule,
      id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    integrationService.addRule(newRule);
    loadData();
    return newRule;
  }, [loadData]);

  const updateRule = useCallback((ruleId: string, updates: Partial<IntegrationRule>) => {
    const success = integrationService.updateRule(ruleId, updates);
    if (success) {
      loadData();
    }
    return success;
  }, [loadData]);

  const deleteRule = useCallback((ruleId: string) => {
    const success = integrationService.deleteRule(ruleId);
    if (success) {
      loadData();
    }
    return success;
  }, [loadData]);

  const toggleRule = useCallback((ruleId: string) => {
    const rule = state.rules.find(r => r.id === ruleId);
    if (rule) {
      return updateRule(ruleId, { isActive: !rule.isActive });
    }
    return false;
  }, [state.rules, updateRule]);

  // Event triggering functions
  const triggerEvent = useCallback(async (
    sourceModule: string,
    eventType: string,
    entityId: string,
    data: any
  ) => {
    if (!isModuleEnabled(sourceModule)) {
      throw new Error(`Module ${sourceModule} is not enabled`);
    }

    await integrationService.triggerEvent(sourceModule, eventType, entityId, data);
    loadData();
  }, [isModuleEnabled, loadData]);

  // Get integrations for specific modules
  const getModuleIntegrations = useCallback((targetModuleId: string) => {
    return state.rules.filter(rule => 
      rule.sourceModule === targetModuleId || rule.targetModule === targetModuleId
    );
  }, [state.rules]);

  // Check if two modules are integrated
  const areModulesIntegrated = useCallback((module1: string, module2: string) => {
    return state.rules.some(rule => 
      (rule.sourceModule === module1 && rule.targetModule === module2) ||
      (rule.sourceModule === module2 && rule.targetModule === module1)
    );
  }, [state.rules]);

  // Get integration status between modules
  const getIntegrationStatus = useCallback((module1: string, module2: string) => {
    const integrations = state.rules.filter(rule => 
      (rule.sourceModule === module1 && rule.targetModule === module2) ||
      (rule.sourceModule === module2 && rule.targetModule === module1)
    );

    const activeIntegrations = integrations.filter(rule => rule.isActive);
    const recentEvents = state.events.filter(event => {
      const rule = state.rules.find(r => r.id === event.ruleId);
      return rule && (
        (rule.sourceModule === module1 && rule.targetModule === module2) ||
        (rule.sourceModule === module2 && rule.targetModule === module1)
      );
    }).slice(0, 5);

    return {
      isIntegrated: integrations.length > 0,
      activeRules: activeIntegrations.length,
      totalRules: integrations.length,
      recentEvents,
      lastEventTime: recentEvents[0]?.timestamp
    };
  }, [state.rules, state.events]);

  // Get suggested integrations
  const getSuggestedIntegrations = useCallback((targetModuleId: string) => {
    const suggestions = [];
    
    // Common integration patterns
    const integrationPatterns = [
      { source: 'customers', target: 'contracts', reason: 'ربط العملاء بالعقود' },
      { source: 'customers', target: 'invoices', reason: 'ربط العملاء بالفواتير' },
      { source: 'contracts', target: 'accounting', reason: 'ربط العقود بالمحاسبة' },
      { source: 'contracts', target: 'invoices', reason: 'إنشاء فواتير من العقود' },
      { source: 'invoices', target: 'payments', reason: 'ربط الفواتير بالمدفوعات' },
      { source: 'payments', target: 'accounting', reason: 'ربط المدفوعات بالمحاسبة' },
      { source: 'hr', target: 'payroll', reason: 'ربط الموارد البشرية بالرواتب' },
      { source: 'attendance', target: 'payroll', reason: 'ربط الحضور بالرواتب' },
      { source: 'purchasing', target: 'inventory', reason: 'ربط المشتريات بالمخزون' },
      { source: 'inventory', target: 'accounting', reason: 'ربط المخزون بالمحاسبة' },
      { source: 'projects', target: 'accounting', reason: 'ربط المشاريع بالمحاسبة' }
    ];

    integrationPatterns.forEach(pattern => {
      if (pattern.source === targetModuleId || pattern.target === targetModuleId) {
        const otherModule = pattern.source === targetModuleId ? pattern.target : pattern.source;
        
        if (isModuleEnabled(otherModule) && !areModulesIntegrated(targetModuleId, otherModule)) {
          suggestions.push({
            moduleId: otherModule,
            reason: pattern.reason,
            priority: 'high'
          });
        }
      }
    });

    return suggestions;
  }, [isModuleEnabled, areModulesIntegrated]);

  // Helper functions for common integrations
  const syncCustomerData = useCallback(async (customerId: string, customerData: any) => {
    await triggerEvent('customers', 'customer.updated', customerId, customerData);
  }, [triggerEvent]);

  const createFinancialEntry = useCallback(async (entryData: any) => {
    await triggerEvent('accounting', 'accounting.entry_created', entryData.id, entryData);
  }, [triggerEvent]);

  const updateInventoryLevel = useCallback(async (itemId: string, inventoryData: any) => {
    await triggerEvent('inventory', 'inventory.valuation_change', itemId, inventoryData);
  }, [triggerEvent]);

  const processContractPayment = useCallback(async (contractId: string, paymentData: any) => {
    await triggerEvent('contracts', 'contract.payment_due', contractId, paymentData);
  }, [triggerEvent]);

  const addEmployee = useCallback(async (employeeId: string, employeeData: any) => {
    await triggerEvent('hr', 'employee.created', employeeId, employeeData);
  }, [triggerEvent]);

  const recordAttendance = useCallback(async (employeeId: string, attendanceData: any) => {
    await triggerEvent('attendance', 'attendance.monthly_summary', employeeId, attendanceData);
  }, [triggerEvent]);

  const receivePurchase = useCallback(async (purchaseId: string, purchaseData: any) => {
    await triggerEvent('purchasing', 'purchase.received', purchaseId, purchaseData);
  }, [triggerEvent]);

  const addProjectExpense = useCallback(async (projectId: string, expenseData: any) => {
    await triggerEvent('projects', 'project.expense_added', projectId, expenseData);
  }, [triggerEvent]);

  return {
    ...state,
    refresh: loadData,
    createRule,
    updateRule,
    deleteRule,
    toggleRule,
    triggerEvent,
    getModuleIntegrations,
    areModulesIntegrated,
    getIntegrationStatus,
    getSuggestedIntegrations,
    // Helper functions
    syncCustomerData,
    createFinancialEntry,
    updateInventoryLevel,
    processContractPayment,
    addEmployee,
    recordAttendance,
    receivePurchase,
    addProjectExpense
  };
}

