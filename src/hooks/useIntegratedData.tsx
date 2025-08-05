import { useState, useEffect, useCallback } from 'react';
import { dataService, DataEntity, DataQuery } from '@/services/dataService';
import { useModules } from '@/contexts/ModuleContext';

interface UseIntegratedDataOptions {
  moduleId: string;
  entityType: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseIntegratedDataResult {
  data: DataEntity[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  create: (data: Record<string, any>) => DataEntity;
  update: (entityId: string, data: Partial<Record<string, any>>) => DataEntity | null;
  remove: (entityId: string) => boolean;
  search: (query: string) => DataEntity[];
  filter: (filters: Record<string, any>) => DataEntity[];
  getRelated: (entityId: string, relationType: string) => DataEntity[];
}

export function useIntegratedData(options: UseIntegratedDataOptions): UseIntegratedDataResult {
  const [data, setData] = useState<DataEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isModuleEnabled } = useModules();

  const { moduleId, entityType, autoRefresh = true, refreshInterval = 5000 } = options;

  // Load data
  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isModuleEnabled(moduleId)) {
        setData([]);
        setLoading(false);
        return;
      }

      const query: DataQuery = {
        moduleId,
        entityType,
        relations: ['customer_contract', 'contract_invoice', 'invoice_payment'],
      };
      
      const entities = dataService.queryEntities(query);
      setData(entities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [moduleId, entityType, isModuleEnabled]);

  // Subscribe to data changes
  useEffect(() => {
    if (!isModuleEnabled(moduleId)) return;

    const unsubscribe = dataService.subscribe(moduleId, entityType, (newData) => {
      setData(newData);
    });

    return unsubscribe;
  }, [moduleId, entityType, isModuleEnabled]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh || !isModuleEnabled(moduleId)) return;

    const interval = setInterval(loadData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loadData, moduleId, isModuleEnabled]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // CRUD operations
  const create = useCallback((entityData: Record<string, any>): DataEntity => {
    return dataService.createEntity(moduleId, entityType, entityData);
  }, [moduleId, entityType]);

  const update = useCallback((entityId: string, entityData: Partial<Record<string, any>>): DataEntity | null => {
    return dataService.updateEntity(entityId, entityData);
  }, []);

  const remove = useCallback((entityId: string): boolean => {
    return dataService.deleteEntity(entityId);
  }, []);

  // Search and filter
  const search = useCallback((query: string): DataEntity[] => {
    return dataService.search(query, moduleId);
  }, [moduleId]);

  const filter = useCallback((filters: Record<string, any>): DataEntity[] => {
    const query: DataQuery = {
      moduleId,
      entityType,
      filters,
    };
    return dataService.queryEntities(query);
  }, [moduleId, entityType]);

  // Get related entities
  const getRelated = useCallback((entityId: string, relationType: string): DataEntity[] => {
    const relations = dataService.getRelations(entityId, relationType);
    return relations
      .map(rel => {
        const targetId = rel.sourceEntityId === entityId ? rel.targetEntityId : rel.sourceEntityId;
        return dataService.getEntity(targetId);
      })
      .filter(Boolean) as DataEntity[];
  }, []);

  return {
    data,
    loading,
    error,
    refresh: loadData,
    create,
    update,
    remove,
    search,
    filter,
    getRelated,
  };
}

// Specialized hooks for common entities
export function useCustomers() {
  return useIntegratedData({ moduleId: 'customers', entityType: 'customer' });
}

export function useContracts() {
  return useIntegratedData({ moduleId: 'contracts', entityType: 'contract' });
}

export function useInvoices() {
  return useIntegratedData({ moduleId: 'invoices', entityType: 'invoice' });
}

export function usePayments() {
  return useIntegratedData({ moduleId: 'payments', entityType: 'payment' });
}

export function useEmployees() {
  return useIntegratedData({ moduleId: 'hr', entityType: 'employee' });
}

export function useVehicles() {
  return useIntegratedData({ moduleId: 'fleet', entityType: 'vehicle' });
}

export function useInventoryItems() {
  return useIntegratedData({ moduleId: 'inventory', entityType: 'item' });
}

export function useProjects() {
  return useIntegratedData({ moduleId: 'projects', entityType: 'project' });
}

// Cross-module data hooks
export function useCustomerContracts(customerId: string) {
  const { getRelated } = useCustomers();
  const [contracts, setContracts] = useState<DataEntity[]>([]);

  useEffect(() => {
    if (customerId) {
      const relatedContracts = getRelated(customerId, 'customer_contract');
      setContracts(relatedContracts);
    }
  }, [customerId, getRelated]);

  return contracts;
}

export function useContractInvoices(contractId: string) {
  const { getRelated } = useContracts();
  const [invoices, setInvoices] = useState<DataEntity[]>([]);

  useEffect(() => {
    if (contractId) {
      const relatedInvoices = getRelated(contractId, 'contract_invoice');
      setInvoices(relatedInvoices);
    }
  }, [contractId, getRelated]);

  return invoices;
}

export function useInvoicePayments(invoiceId: string) {
  const { getRelated } = useInvoices();
  const [payments, setPayments] = useState<DataEntity[]>([]);

  useEffect(() => {
    if (invoiceId) {
      const relatedPayments = getRelated(invoiceId, 'invoice_payment');
      setPayments(relatedPayments);
    }
  }, [invoiceId, getRelated]);

  return payments;
}

