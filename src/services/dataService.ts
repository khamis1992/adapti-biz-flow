// Centralized data service for module integration
export interface DataEntity {
  id: string;
  type: string;
  data: Record<string, any>;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface DataRelation {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  relationType: string;
  metadata?: Record<string, any>;
}

export interface DataQuery {
  moduleId?: string;
  entityType?: string;
  filters?: Record<string, any>;
  relations?: string[];
  limit?: number;
  offset?: number;
}

class DataService {
  private entities: Map<string, DataEntity> = new Map();
  private relations: Map<string, DataRelation> = new Map();
  private subscribers: Map<string, ((data: DataEntity[]) => void)[]> = new Map();

  // Entity management
  createEntity(moduleId: string, type: string, data: Record<string, any>): DataEntity {
    const entity: DataEntity = {
      id: `${moduleId}_${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      moduleId,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };

    this.entities.set(entity.id, entity);
    this.notifySubscribers(moduleId, type);
    return entity;
  }

  updateEntity(entityId: string, data: Partial<Record<string, any>>): DataEntity | null {
    const entity = this.entities.get(entityId);
    if (!entity) return null;

    const updatedEntity: DataEntity = {
      ...entity,
      data: { ...entity.data, ...data },
      updatedAt: new Date(),
      version: entity.version + 1,
    };

    this.entities.set(entityId, updatedEntity);
    this.notifySubscribers(entity.moduleId, entity.type);
    return updatedEntity;
  }

  deleteEntity(entityId: string): boolean {
    const entity = this.entities.get(entityId);
    if (!entity) return false;

    // Remove related relations
    const relatedRelations = Array.from(this.relations.values()).filter(
      rel => rel.sourceEntityId === entityId || rel.targetEntityId === entityId
    );
    relatedRelations.forEach(rel => this.relations.delete(rel.id));

    this.entities.delete(entityId);
    this.notifySubscribers(entity.moduleId, entity.type);
    return true;
  }

  getEntity(entityId: string): DataEntity | null {
    return this.entities.get(entityId) || null;
  }

  // Query entities
  queryEntities(query: DataQuery): DataEntity[] {
    let results = Array.from(this.entities.values());

    // Filter by module
    if (query.moduleId) {
      results = results.filter(entity => entity.moduleId === query.moduleId);
    }

    // Filter by type
    if (query.entityType) {
      results = results.filter(entity => entity.type === query.entityType);
    }

    // Apply custom filters
    if (query.filters) {
      results = results.filter(entity => {
        return Object.entries(query.filters!).every(([key, value]) => {
          return entity.data[key] === value;
        });
      });
    }

    // Include related entities
    if (query.relations && query.relations.length > 0) {
      results = results.map(entity => {
        const relatedEntities: Record<string, DataEntity[]> = {};
        
        query.relations!.forEach(relationType => {
          const relations = Array.from(this.relations.values()).filter(
            rel => rel.sourceEntityId === entity.id && rel.relationType === relationType
          );
          
          relatedEntities[relationType] = relations
            .map(rel => this.entities.get(rel.targetEntityId))
            .filter(Boolean) as DataEntity[];
        });

        return {
          ...entity,
          data: {
            ...entity.data,
            _relations: relatedEntities,
          },
        };
      });
    }

    // Apply pagination
    if (query.offset) {
      results = results.slice(query.offset);
    }
    if (query.limit) {
      results = results.slice(0, query.limit);
    }

    return results;
  }

  // Relation management
  createRelation(
    sourceEntityId: string,
    targetEntityId: string,
    relationType: string,
    metadata?: Record<string, any>
  ): DataRelation {
    const relation: DataRelation = {
      id: `rel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sourceEntityId,
      targetEntityId,
      relationType,
      metadata,
    };

    this.relations.set(relation.id, relation);
    return relation;
  }

  getRelations(entityId: string, relationType?: string): DataRelation[] {
    return Array.from(this.relations.values()).filter(rel => {
      const isRelated = rel.sourceEntityId === entityId || rel.targetEntityId === entityId;
      const typeMatches = !relationType || rel.relationType === relationType;
      return isRelated && typeMatches;
    });
  }

  // Subscription management
  subscribe(moduleId: string, entityType: string, callback: (data: DataEntity[]) => void): () => void {
    const key = `${moduleId}_${entityType}`;
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    this.subscribers.get(key)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(key);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  private notifySubscribers(moduleId: string, entityType: string): void {
    const key = `${moduleId}_${entityType}`;
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      const data = this.queryEntities({ moduleId, entityType });
      callbacks.forEach(callback => callback(data));
    }
  }

  // Bulk operations
  bulkCreate(entities: Array<{ moduleId: string; type: string; data: Record<string, any> }>): DataEntity[] {
    return entities.map(entity => this.createEntity(entity.moduleId, entity.type, entity.data));
  }

  bulkUpdate(updates: Array<{ entityId: string; data: Partial<Record<string, any>> }>): DataEntity[] {
    return updates
      .map(update => this.updateEntity(update.entityId, update.data))
      .filter(Boolean) as DataEntity[];
  }

  // Data export/import
  exportData(moduleId?: string): { entities: DataEntity[]; relations: DataRelation[] } {
    const entities = moduleId 
      ? Array.from(this.entities.values()).filter(e => e.moduleId === moduleId)
      : Array.from(this.entities.values());
    
    const entityIds = new Set(entities.map(e => e.id));
    const relations = Array.from(this.relations.values()).filter(
      rel => entityIds.has(rel.sourceEntityId) || entityIds.has(rel.targetEntityId)
    );

    return { entities, relations };
  }

  importData(data: { entities: DataEntity[]; relations: DataRelation[] }): void {
    data.entities.forEach(entity => {
      this.entities.set(entity.id, entity);
    });
    
    data.relations.forEach(relation => {
      this.relations.set(relation.id, relation);
    });

    // Notify all subscribers
    const moduleTypes = new Set(data.entities.map(e => `${e.moduleId}_${e.type}`));
    moduleTypes.forEach(key => {
      const [moduleId, entityType] = key.split('_');
      this.notifySubscribers(moduleId, entityType);
    });
  }

  // Search functionality
  search(query: string, moduleId?: string): DataEntity[] {
    const entities = moduleId 
      ? Array.from(this.entities.values()).filter(e => e.moduleId === moduleId)
      : Array.from(this.entities.values());

    const searchTerms = query.toLowerCase().split(' ');
    
    return entities.filter(entity => {
      const searchableText = JSON.stringify(entity.data).toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  // Statistics
  getStats(moduleId?: string): Record<string, number> {
    const entities = moduleId 
      ? Array.from(this.entities.values()).filter(e => e.moduleId === moduleId)
      : Array.from(this.entities.values());

    const stats: Record<string, number> = {
      totalEntities: entities.length,
      totalRelations: this.relations.size,
    };

    // Count by type
    entities.forEach(entity => {
      const key = `${entity.type}_count`;
      stats[key] = (stats[key] || 0) + 1;
    });

    return stats;
  }
}

// Singleton instance
export const dataService = new DataService();

// Helper functions for common operations
export const createCustomer = (data: Record<string, any>) => 
  dataService.createEntity('customers', 'customer', data);

export const createContract = (data: Record<string, any>) => 
  dataService.createEntity('contracts', 'contract', data);

export const createInvoice = (data: Record<string, any>) => 
  dataService.createEntity('invoices', 'invoice', data);

export const createPayment = (data: Record<string, any>) => 
  dataService.createEntity('payments', 'payment', data);

export const linkCustomerToContract = (customerId: string, contractId: string) =>
  dataService.createRelation(customerId, contractId, 'customer_contract');

export const linkContractToInvoice = (contractId: string, invoiceId: string) =>
  dataService.createRelation(contractId, invoiceId, 'contract_invoice');

export const linkInvoiceToPayment = (invoiceId: string, paymentId: string) =>
  dataService.createRelation(invoiceId, paymentId, 'invoice_payment');

