import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  business_type: string;
  status: string;
  subscription_status: string;
  settings: any;
  logo_url?: string;
}

interface TenantModule {
  id: string;
  module_id: string;
  is_enabled: boolean;
  settings: any;
}

interface TenantContextType {
  tenant: Tenant | null;
  modules: TenantModule[];
  loading: boolean;
  dashboardData: any;
  refreshTenant: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const { user, session } = useAuth();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [modules, setModules] = useState<TenantModule[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTenant = async () => {
    if (!user || !session) {
      setLoading(false);
      return;
    }

    try {
      // Fetch tenant data
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('*')
        .limit(1)
        .single();

      if (tenantError && tenantError.code !== 'PGRST116') {
        console.error('Error fetching tenant:', tenantError);
        setLoading(false);
        return;
      }

      setTenant(tenantData);

      if (tenantData) {
        // Fetch tenant modules using any to bypass type checking
        const { data: modulesData, error: modulesError } = await supabase
          .from('tenant_modules' as any)
          .select('*')
          .eq('tenant_id', tenantData.id);

        if (modulesError) {
          console.error('Error fetching modules:', modulesError);
        } else {
          setModules((modulesData as any) || []);
        }
      }
    } catch (error) {
      console.error('Error in fetchTenant:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    if (!tenant) return;

    try {
      const { data, error } = await supabase.rpc('get_dashboard_data' as any, {
        p_tenant_id: tenant.id
      });

      if (error) {
        console.error('Error fetching dashboard data:', error);
      } else {
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error in fetchDashboard:', error);
    }
  };

  useEffect(() => {
    fetchTenant();
  }, [user, session]);

  useEffect(() => {
    if (tenant) {
      fetchDashboard();
    }
  }, [tenant]);

  const refreshTenant = async () => {
    await fetchTenant();
  };

  const refreshDashboard = async () => {
    await fetchDashboard();
  };

  const value = {
    tenant,
    modules,
    loading,
    dashboardData,
    refreshTenant,
    refreshDashboard,
  };

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}