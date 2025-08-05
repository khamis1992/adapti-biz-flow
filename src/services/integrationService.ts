import { dataService, DataEntity } from './dataService';

export interface IntegrationRule {
  id: string;
  name: string;
  sourceModule: string;
  targetModule: string;
  triggerEvent: string;
  action: string;
  mapping: Record<string, string>;
  condition?: (data: any) => boolean;
  isActive: boolean;
}

export interface IntegrationEvent {
  id: string;
  ruleId: string;
  sourceEntityId: string;
  targetEntityId?: string;
  eventType: string;
  data: any;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

class IntegrationService {
  private rules: Map<string, IntegrationRule> = new Map();
  private events: Map<string, IntegrationEvent> = new Map();
  private subscribers: Map<string, ((event: IntegrationEvent) => void)[]> = new Map();

  constructor() {
    this.initializeDefaultRules();
  }

  // Initialize default integration rules
  private initializeDefaultRules() {
    const defaultRules: IntegrationRule[] = [
      // Customer integrations
      {
        id: 'customer-contract-sync',
        name: 'مزامنة العملاء مع العقود',
        sourceModule: 'customers',
        targetModule: 'contracts',
        triggerEvent: 'customer.created',
        action: 'sync_customer_data',
        mapping: {
          'customer_id': 'customer_id',
          'name': 'customer_name',
          'email': 'customer_email',
          'phone': 'customer_phone'
        },
        isActive: true
      },
      {
        id: 'customer-invoice-sync',
        name: 'مزامنة العملاء مع الفواتير',
        sourceModule: 'customers',
        targetModule: 'invoices',
        triggerEvent: 'customer.updated',
        action: 'update_customer_invoices',
        mapping: {
          'customer_id': 'customer_id',
          'name': 'customer_name',
          'address': 'billing_address'
        },
        isActive: true
      },

      // Contract integrations
      {
        id: 'contract-accounting-sync',
        name: 'ربط العقود بالمحاسبة',
        sourceModule: 'contracts',
        targetModule: 'accounting',
        triggerEvent: 'contract.created',
        action: 'create_accounting_entry',
        mapping: {
          'contract_id': 'reference_id',
          'total_amount': 'amount',
          'customer_id': 'customer_id',
          'start_date': 'transaction_date'
        },
        isActive: true
      },
      {
        id: 'contract-invoice-generation',
        name: 'إنشاء فواتير من العقود',
        sourceModule: 'contracts',
        targetModule: 'invoices',
        triggerEvent: 'contract.payment_due',
        action: 'generate_invoice',
        mapping: {
          'contract_id': 'contract_id',
          'customer_id': 'customer_id',
          'amount': 'amount',
          'due_date': 'due_date'
        },
        isActive: true
      },

      // Invoice integrations
      {
        id: 'invoice-payment-sync',
        name: 'ربط الفواتير بالمدفوعات',
        sourceModule: 'invoices',
        targetModule: 'payments',
        triggerEvent: 'invoice.created',
        action: 'create_payment_record',
        mapping: {
          'invoice_id': 'invoice_id',
          'customer_id': 'customer_id',
          'amount': 'amount',
          'due_date': 'due_date'
        },
        isActive: true
      },
      {
        id: 'payment-accounting-sync',
        name: 'ربط المدفوعات بالمحاسبة',
        sourceModule: 'payments',
        targetModule: 'accounting',
        triggerEvent: 'payment.received',
        action: 'create_accounting_entry',
        mapping: {
          'payment_id': 'reference_id',
          'amount': 'amount',
          'customer_id': 'customer_id',
          'payment_date': 'transaction_date'
        },
        isActive: true
      },

      // HR integrations
      {
        id: 'hr-payroll-sync',
        name: 'ربط الموارد البشرية بالرواتب',
        sourceModule: 'hr',
        targetModule: 'payroll',
        triggerEvent: 'employee.created',
        action: 'create_payroll_record',
        mapping: {
          'employee_id': 'employee_id',
          'name': 'employee_name',
          'salary': 'base_salary',
          'department': 'department'
        },
        isActive: true
      },
      {
        id: 'attendance-payroll-sync',
        name: 'ربط الحضور بالرواتب',
        sourceModule: 'attendance',
        targetModule: 'payroll',
        triggerEvent: 'attendance.monthly_summary',
        action: 'update_payroll_hours',
        mapping: {
          'employee_id': 'employee_id',
          'total_hours': 'worked_hours',
          'overtime_hours': 'overtime_hours',
          'absent_days': 'absent_days'
        },
        isActive: true
      },

      // Inventory integrations
      {
        id: 'purchasing-inventory-sync',
        name: 'ربط المشتريات بالمخزون',
        sourceModule: 'purchasing',
        targetModule: 'inventory',
        triggerEvent: 'purchase.received',
        action: 'update_inventory_levels',
        mapping: {
          'item_id': 'item_id',
          'quantity': 'quantity_received',
          'cost': 'unit_cost',
          'supplier_id': 'supplier_id'
        },
        isActive: true
      },
      {
        id: 'inventory-accounting-sync',
        name: 'ربط المخزون بالمحاسبة',
        sourceModule: 'inventory',
        targetModule: 'accounting',
        triggerEvent: 'inventory.valuation_change',
        action: 'create_inventory_adjustment',
        mapping: {
          'item_id': 'reference_id',
          'value_change': 'amount',
          'adjustment_date': 'transaction_date',
          'reason': 'description'
        },
        isActive: true
      },

      // Project integrations
      {
        id: 'project-accounting-sync',
        name: 'ربط المشاريع بالمحاسبة',
        sourceModule: 'projects',
        targetModule: 'accounting',
        triggerEvent: 'project.expense_added',
        action: 'create_project_expense',
        mapping: {
          'project_id': 'project_id',
          'expense_amount': 'amount',
          'expense_date': 'transaction_date',
          'category': 'account_category'
        },
        isActive: true
      }
    ];

    defaultRules.forEach(rule => this.rules.set(rule.id, rule));
  }

  // Rule management
  addRule(rule: IntegrationRule): void {
    this.rules.set(rule.id, rule);
  }

  updateRule(ruleId: string, updates: Partial<IntegrationRule>): boolean {
    const rule = this.rules.get(ruleId);
    if (!rule) return false;

    const updatedRule = { ...rule, ...updates };
    this.rules.set(ruleId, updatedRule);
    return true;
  }

  deleteRule(ruleId: string): boolean {
    return this.rules.delete(ruleId);
  }

  getRules(moduleId?: string): IntegrationRule[] {
    const allRules = Array.from(this.rules.values());
    if (!moduleId) return allRules;
    
    return allRules.filter(rule => 
      rule.sourceModule === moduleId || rule.targetModule === moduleId
    );
  }

  // Event processing
  async triggerEvent(
    sourceModule: string, 
    eventType: string, 
    entityId: string, 
    data: any
  ): Promise<void> {
    const relevantRules = Array.from(this.rules.values()).filter(rule => 
      rule.sourceModule === sourceModule && 
      rule.triggerEvent === eventType && 
      rule.isActive
    );

    for (const rule of relevantRules) {
      // Check condition if exists
      if (rule.condition && !rule.condition(data)) {
        continue;
      }

      const event: IntegrationEvent = {
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ruleId: rule.id,
        sourceEntityId: entityId,
        eventType,
        data,
        timestamp: new Date(),
        status: 'pending'
      };

      this.events.set(event.id, event);
      await this.processEvent(event);
    }
  }

  private async processEvent(event: IntegrationEvent): Promise<void> {
    try {
      event.status = 'processing';
      this.events.set(event.id, event);

      const rule = this.rules.get(event.ruleId);
      if (!rule) {
        throw new Error(`Rule not found: ${event.ruleId}`);
      }

      const result = await this.executeAction(rule, event);
      
      event.status = 'completed';
      event.targetEntityId = result.targetEntityId;
      this.events.set(event.id, event);

      this.notifySubscribers(event);
    } catch (error) {
      event.status = 'failed';
      event.error = error instanceof Error ? error.message : 'Unknown error';
      this.events.set(event.id, event);
      
      console.error('Integration event failed:', error);
    }
  }

  private async executeAction(rule: IntegrationRule, event: IntegrationEvent): Promise<{ targetEntityId?: string }> {
    const { action, targetModule, mapping } = rule;
    const sourceData = event.data;

    // Map source data to target format
    const mappedData: Record<string, any> = {};
    Object.entries(mapping).forEach(([sourceField, targetField]) => {
      if (sourceData[sourceField] !== undefined) {
        mappedData[targetField] = sourceData[sourceField];
      }
    });

    switch (action) {
      case 'sync_customer_data':
        return this.syncCustomerData(targetModule, mappedData);
      
      case 'update_customer_invoices':
        return this.updateCustomerInvoices(mappedData);
      
      case 'create_accounting_entry':
        return this.createAccountingEntry(mappedData);
      
      case 'generate_invoice':
        return this.generateInvoice(mappedData);
      
      case 'create_payment_record':
        return this.createPaymentRecord(mappedData);
      
      case 'create_payroll_record':
        return this.createPayrollRecord(mappedData);
      
      case 'update_payroll_hours':
        return this.updatePayrollHours(mappedData);
      
      case 'update_inventory_levels':
        return this.updateInventoryLevels(mappedData);
      
      case 'create_inventory_adjustment':
        return this.createInventoryAdjustment(mappedData);
      
      case 'create_project_expense':
        return this.createProjectExpense(mappedData);
      
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  // Action implementations
  private async syncCustomerData(targetModule: string, data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    const entity = dataService.createEntity(targetModule, 'customer_sync', {
      ...data,
      sync_timestamp: new Date(),
      sync_source: 'customers'
    });
    return { targetEntityId: entity.id };
  }

  private async updateCustomerInvoices(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    // Find all invoices for this customer and update them
    const invoices = dataService.queryEntities({
      moduleId: 'invoices',
      entityType: 'invoice',
      filters: { customer_id: data.customer_id }
    });

    invoices.forEach(invoice => {
      dataService.updateEntity(invoice.id, {
        customer_name: data.customer_name,
        billing_address: data.billing_address,
        updated_at: new Date()
      });
    });

    return {};
  }

  private async createAccountingEntry(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    const entity = dataService.createEntity('accounting', 'journal_entry', {
      ...data,
      entry_type: 'automated',
      created_by: 'system',
      created_at: new Date()
    });
    return { targetEntityId: entity.id };
  }

  private async generateInvoice(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    const entity = dataService.createEntity('invoices', 'invoice', {
      ...data,
      status: 'pending',
      generated_from: 'contract',
      created_at: new Date()
    });
    return { targetEntityId: entity.id };
  }

  private async createPaymentRecord(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    const entity = dataService.createEntity('payments', 'payment_schedule', {
      ...data,
      status: 'pending',
      created_at: new Date()
    });
    return { targetEntityId: entity.id };
  }

  private async createPayrollRecord(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    const entity = dataService.createEntity('payroll', 'employee_payroll', {
      ...data,
      status: 'active',
      created_at: new Date()
    });
    return { targetEntityId: entity.id };
  }

  private async updatePayrollHours(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    // Find payroll record for this employee
    const payrollRecords = dataService.queryEntities({
      moduleId: 'payroll',
      entityType: 'employee_payroll',
      filters: { employee_id: data.employee_id }
    });

    if (payrollRecords.length > 0) {
      const record = payrollRecords[0];
      dataService.updateEntity(record.id, {
        worked_hours: data.worked_hours,
        overtime_hours: data.overtime_hours,
        absent_days: data.absent_days,
        updated_at: new Date()
      });
      return { targetEntityId: record.id };
    }

    return {};
  }

  private async updateInventoryLevels(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    // Find inventory item and update levels
    const items = dataService.queryEntities({
      moduleId: 'inventory',
      entityType: 'inventory_item',
      filters: { item_id: data.item_id }
    });

    if (items.length > 0) {
      const item = items[0];
      const currentQuantity = item.data.quantity || 0;
      const newQuantity = currentQuantity + (data.quantity_received || 0);
      
      dataService.updateEntity(item.id, {
        quantity: newQuantity,
        last_received: new Date(),
        unit_cost: data.unit_cost,
        supplier_id: data.supplier_id
      });
      return { targetEntityId: item.id };
    }

    return {};
  }

  private async createInventoryAdjustment(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    const entity = dataService.createEntity('accounting', 'inventory_adjustment', {
      ...data,
      adjustment_type: 'valuation_change',
      created_at: new Date()
    });
    return { targetEntityId: entity.id };
  }

  private async createProjectExpense(data: Record<string, any>): Promise<{ targetEntityId?: string }> {
    const entity = dataService.createEntity('accounting', 'project_expense', {
      ...data,
      expense_type: 'project_cost',
      created_at: new Date()
    });
    return { targetEntityId: entity.id };
  }

  // Event history and monitoring
  getEvents(moduleId?: string, status?: string): IntegrationEvent[] {
    let events = Array.from(this.events.values());
    
    if (moduleId) {
      const moduleRules = this.getRules(moduleId).map(r => r.id);
      events = events.filter(e => moduleRules.includes(e.ruleId));
    }
    
    if (status) {
      events = events.filter(e => e.status === status);
    }
    
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getIntegrationStats(moduleId?: string): {
    totalEvents: number;
    successfulEvents: number;
    failedEvents: number;
    pendingEvents: number;
    activeRules: number;
  } {
    const events = this.getEvents(moduleId);
    const rules = this.getRules(moduleId);
    
    return {
      totalEvents: events.length,
      successfulEvents: events.filter(e => e.status === 'completed').length,
      failedEvents: events.filter(e => e.status === 'failed').length,
      pendingEvents: events.filter(e => e.status === 'pending' || e.status === 'processing').length,
      activeRules: rules.filter(r => r.isActive).length
    };
  }

  // Subscription management
  subscribe(eventType: string, callback: (event: IntegrationEvent) => void): () => void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(callback);

    return () => {
      const callbacks = this.subscribers.get(eventType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  private notifySubscribers(event: IntegrationEvent): void {
    const callbacks = this.subscribers.get(event.eventType) || [];
    callbacks.forEach(callback => callback(event));
  }
}

// Singleton instance
export const integrationService = new IntegrationService();

// Helper functions for common integrations
export const triggerCustomerCreated = (customerId: string, customerData: any) =>
  integrationService.triggerEvent('customers', 'customer.created', customerId, customerData);

export const triggerCustomerUpdated = (customerId: string, customerData: any) =>
  integrationService.triggerEvent('customers', 'customer.updated', customerId, customerData);

export const triggerContractCreated = (contractId: string, contractData: any) =>
  integrationService.triggerEvent('contracts', 'contract.created', contractId, contractData);

export const triggerContractPaymentDue = (contractId: string, paymentData: any) =>
  integrationService.triggerEvent('contracts', 'contract.payment_due', contractId, paymentData);

export const triggerInvoiceCreated = (invoiceId: string, invoiceData: any) =>
  integrationService.triggerEvent('invoices', 'invoice.created', invoiceId, invoiceData);

export const triggerPaymentReceived = (paymentId: string, paymentData: any) =>
  integrationService.triggerEvent('payments', 'payment.received', paymentId, paymentData);

export const triggerEmployeeCreated = (employeeId: string, employeeData: any) =>
  integrationService.triggerEvent('hr', 'employee.created', employeeId, employeeData);

export const triggerAttendanceSummary = (employeeId: string, attendanceData: any) =>
  integrationService.triggerEvent('attendance', 'attendance.monthly_summary', employeeId, attendanceData);

export const triggerPurchaseReceived = (purchaseId: string, purchaseData: any) =>
  integrationService.triggerEvent('purchasing', 'purchase.received', purchaseId, purchaseData);

export const triggerInventoryValuationChange = (itemId: string, valuationData: any) =>
  integrationService.triggerEvent('inventory', 'inventory.valuation_change', itemId, valuationData);

export const triggerProjectExpenseAdded = (projectId: string, expenseData: any) =>
  integrationService.triggerEvent('projects', 'project.expense_added', projectId, expenseData);

