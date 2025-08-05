import { useEffect, useCallback } from 'react';
import { useModules } from '@/contexts/ModuleContext';

interface IntegrationRule {
  sourceModule: string;
  targetModule: string;
  trigger: string;
  action: (sourceData: any, targetData: any) => any;
}

// Define integration rules between modules
const integrationRules: IntegrationRule[] = [
  // Contracts -> Accounting integration
  {
    sourceModule: 'contracts',
    targetModule: 'accounting',
    trigger: 'contract_created',
    action: (contractData, accountingData) => {
      // Create accounting entries for new contracts
      const newEntry = {
        id: `contract_${contractData.id}`,
        type: 'contract_revenue',
        amount: contractData.total_amount,
        description: `عقد رقم ${contractData.contract_number}`,
        date: contractData.start_date,
        contract_id: contractData.id,
      };
      return {
        ...accountingData,
        entries: [...(accountingData.entries || []), newEntry],
      };
    },
  },
  
  // Customers -> Contracts integration
  {
    sourceModule: 'customers',
    targetModule: 'contracts',
    trigger: 'customer_updated',
    action: (customerData, contractsData) => {
      // Update customer info in related contracts
      const updatedContracts = (contractsData.contracts || []).map((contract: any) => 
        contract.customer_id === customerData.id 
          ? { ...contract, customer_info: customerData }
          : contract
      );
      return {
        ...contractsData,
        contracts: updatedContracts,
      };
    },
  },
  
  // Invoices -> Accounting integration
  {
    sourceModule: 'invoices',
    targetModule: 'accounting',
    trigger: 'invoice_created',
    action: (invoiceData, accountingData) => {
      const newEntry = {
        id: `invoice_${invoiceData.id}`,
        type: 'invoice_revenue',
        amount: invoiceData.total_amount,
        description: `فاتورة رقم ${invoiceData.invoice_number}`,
        date: invoiceData.issue_date,
        invoice_id: invoiceData.id,
      };
      return {
        ...accountingData,
        entries: [...(accountingData.entries || []), newEntry],
      };
    },
  },
  
  // Payments -> Accounting integration
  {
    sourceModule: 'payments',
    targetModule: 'accounting',
    trigger: 'payment_received',
    action: (paymentData, accountingData) => {
      const newEntry = {
        id: `payment_${paymentData.id}`,
        type: 'payment_received',
        amount: paymentData.amount,
        description: `دفعة من ${paymentData.customer_name}`,
        date: paymentData.payment_date,
        payment_id: paymentData.id,
      };
      return {
        ...accountingData,
        entries: [...(accountingData.entries || []), newEntry],
      };
    },
  },
  
  // HR -> Payroll integration
  {
    sourceModule: 'hr',
    targetModule: 'payroll',
    trigger: 'employee_added',
    action: (employeeData, payrollData) => {
      const newPayrollRecord = {
        employee_id: employeeData.id,
        employee_name: employeeData.name,
        basic_salary: employeeData.salary || 0,
        department: employeeData.department,
        position: employeeData.position,
      };
      return {
        ...payrollData,
        employees: [...(payrollData.employees || []), newPayrollRecord],
      };
    },
  },
  
  // Fleet -> Maintenance integration
  {
    sourceModule: 'fleet',
    targetModule: 'maintenance',
    trigger: 'vehicle_added',
    action: (vehicleData, maintenanceData) => {
      const maintenanceSchedule = {
        vehicle_id: vehicleData.id,
        vehicle_info: vehicleData,
        next_service_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        service_type: 'routine_maintenance',
      };
      return {
        ...maintenanceData,
        schedules: [...(maintenanceData.schedules || []), maintenanceSchedule],
      };
    },
  },
  
  // Inventory -> Purchasing integration
  {
    sourceModule: 'inventory',
    targetModule: 'purchasing',
    trigger: 'low_stock_alert',
    action: (inventoryData, purchasingData) => {
      const purchaseRequest = {
        item_id: inventoryData.item_id,
        item_name: inventoryData.item_name,
        current_stock: inventoryData.current_stock,
        minimum_stock: inventoryData.minimum_stock,
        suggested_quantity: inventoryData.minimum_stock * 2,
        priority: 'medium',
        status: 'pending',
      };
      return {
        ...purchasingData,
        requests: [...(purchasingData.requests || []), purchaseRequest],
      };
    },
  },
];

export function useModuleIntegration() {
  const { state, updateModuleData, triggerEvent } = useModules();

  // Process integration events
  useEffect(() => {
    const unprocessedEvents = state.events.filter(event => !event.processed);
    
    unprocessedEvents.forEach(event => {
      const applicableRules = integrationRules.filter(rule => 
        rule.sourceModule === event.moduleId && rule.trigger === event.eventType
      );
      
      applicableRules.forEach(rule => {
        const sourceData = event.data;
        const targetData = state.data[rule.targetModule]?.data || {};
        
        try {
          const updatedTargetData = rule.action(sourceData, targetData);
          updateModuleData(rule.targetModule, updatedTargetData);
          
          // Trigger notification event
          triggerEvent({
            moduleId: rule.targetModule,
            eventType: 'integration_update',
            data: {
              sourceModule: rule.sourceModule,
              trigger: rule.trigger,
              updatedData: updatedTargetData,
            },
          });
        } catch (error) {
          console.error('Integration error:', error);
        }
      });
    });
  }, [state.events, state.data, updateModuleData, triggerEvent]);

  // Helper functions for common integrations
  const syncCustomerData = useCallback((customerId: string, customerData: any) => {
    // Update customer data across all modules
    ['contracts', 'invoices', 'payments'].forEach(moduleId => {
      if (state.enabledModules.includes(moduleId)) {
        triggerEvent({
          moduleId,
          eventType: 'customer_updated',
          data: { id: customerId, ...customerData },
        });
      }
    });
  }, [state.enabledModules, triggerEvent]);

  const createFinancialEntry = useCallback((entryData: any) => {
    if (state.enabledModules.includes('accounting')) {
      triggerEvent({
        moduleId: 'accounting',
        eventType: 'financial_entry_created',
        data: entryData,
      });
    }
  }, [state.enabledModules, triggerEvent]);

  const updateInventoryLevel = useCallback((itemId: string, quantity: number) => {
    if (state.enabledModules.includes('inventory')) {
      triggerEvent({
        moduleId: 'inventory',
        eventType: 'stock_updated',
        data: { item_id: itemId, quantity },
      });
    }
  }, [state.enabledModules, triggerEvent]);

  return {
    syncCustomerData,
    createFinancialEntry,
    updateInventoryLevel,
    triggerEvent,
    integrationRules,
  };
}

