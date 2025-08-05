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
      setTenant(null);
      setModules([]);
      setDashboardData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // First get the user's tenant_id from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .maybeSingle();

      if (userError) {
        console.error('Error fetching user data:', userError);
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        setLoading(false);
        return;
      }

      // If user has no tenant_id, they haven't completed onboarding
      if (!userData?.tenant_id) {
        console.log('User has no tenant_id - onboarding not completed');
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        setLoading(false);
        return;
      }

      // Fetch tenant data using the user's tenant_id
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', userData.tenant_id)
        .maybeSingle();

      if (tenantError) {
        console.error('Error fetching tenant:', tenantError);
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        setLoading(false);
        return;
      }

      setTenant(tenantData);

      if (tenantData) {
        // Fetch tenant modules - cast to any to handle type mismatch
        const { data: modulesData, error: modulesError } = await supabase
          .from('tenant_modules' as any)
          .select('*')
          .eq('tenant_id', tenantData.id);

        if (modulesError) {
          console.error('Error fetching modules:', modulesError);
          setModules([]);
        } else {
          setModules((modulesData as unknown as TenantModule[]) || []);
        }
      } else {
        setModules([]);
        setDashboardData(null);
      }
    } catch (error) {
      console.error('Error in fetchTenant:', error);
      setTenant(null);
      setModules([]);
      setDashboardData(null);
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