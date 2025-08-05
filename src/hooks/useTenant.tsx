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
  error: string | null;
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
  const [error, setError] = useState<string | null>(null);

  const fetchTenant = async () => {
    if (!user || !session) {
      console.log('useTenant: No user or session, clearing tenant data');
      setTenant(null);
      setModules([]);
      setDashboardData(null);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('useTenant: Fetching tenant data for user:', user.id);
      
      // First get the user's tenant_id from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .maybeSingle();

      if (userError) {
        console.error('useTenant: Error fetching user data:', userError);
        setError('Failed to fetch user data');
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        return;
      }

      // If user has no tenant_id, they haven't completed onboarding
      if (!userData?.tenant_id) {
        console.log('useTenant: User has no tenant_id - onboarding not completed');
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        setError(null);
        return;
      }

      console.log('useTenant: User has tenant_id:', userData.tenant_id);

      // Fetch tenant data using the user's tenant_id
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', userData.tenant_id)
        .maybeSingle();

      if (tenantError) {
        console.error('useTenant: Error fetching tenant:', tenantError);
        setError('Failed to fetch tenant data');
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        return;
      }

      if (!tenantData) {
        console.warn('useTenant: No tenant found for id:', userData.tenant_id);
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        setError(null);
        return;
      }

      console.log('useTenant: Tenant loaded successfully:', tenantData.name);
      setTenant(tenantData);

      // Fetch tenant modules - cast to any to handle type mismatch
      const { data: modulesData, error: modulesError } = await supabase
        .from('tenant_modules' as any)
        .select('*')
        .eq('tenant_id', tenantData.id);

      if (modulesError) {
        console.error('useTenant: Error fetching modules:', modulesError);
        setModules([]);
      } else {
        console.log('useTenant: Modules loaded:', modulesData?.length || 0);
        setModules((modulesData as unknown as TenantModule[]) || []);
      }
    } catch (error: any) {
      console.error('useTenant: Unexpected error in fetchTenant:', error);
      setError(error.message || 'Unexpected error occurred');
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
    error,
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