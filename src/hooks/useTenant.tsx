import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  isReady: boolean; // New: indicates if initial load is complete
  retryCount: number; // New: track retry attempts
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
  const [isReady, setIsReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchTenant = async (isRetry = false) => {
    // Check for mock tenant first
    const mockTenant = localStorage.getItem('mock_tenant');
    if (mockTenant) {
      try {
        const parsedTenant = JSON.parse(mockTenant);
        setTenant(parsedTenant);
        setModules([]); // Mock modules can be added here if needed
        setDashboardData(null);
        setError(null);
        setLoading(false);
        setIsReady(true);
        setRetryCount(0);
        return;
      } catch (error) {
        console.error('Error parsing mock tenant data:', error);
        localStorage.removeItem('mock_tenant');
      }
    }

    if (!user || !session) {
      console.log('useTenant: No user or session, clearing tenant data');
      setTenant(null);
      setModules([]);
      setDashboardData(null);
      setError(null);
      setLoading(false);
      setIsReady(true); // Set ready even when no user
      setRetryCount(0);
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
        
        // Retry logic for user data
        if (!isRetry && retryCount < 2) {
          console.log('useTenant: Retrying user data fetch...');
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchTenant(true), 1000 * (retryCount + 1));
          return;
        }
        setIsReady(true);
        return;
      }

      // If user has no tenant_id, they haven't completed onboarding
      if (!userData?.tenant_id) {
        console.log('useTenant: User has no tenant_id - onboarding not completed');
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        setError(null);
        setIsReady(true);
        setRetryCount(0);
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
        
        // Retry logic for tenant data
        if (!isRetry && retryCount < 2) {
          console.log('useTenant: Retrying tenant data fetch...');
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchTenant(true), 1000 * (retryCount + 1));
          return;
        }
        setIsReady(true);
        return;
      }

      if (!tenantData) {
        console.warn('useTenant: No tenant found for id:', userData.tenant_id);
        setTenant(null);
        setModules([]);
        setDashboardData(null);
        setError(null);
        setIsReady(true);
        setRetryCount(0);
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
      
      // Mark as ready and reset retry count on success
      setIsReady(true);
      setRetryCount(0);
    } catch (error: any) {
      console.error('useTenant: Unexpected error in fetchTenant:', error);
      setError(error.message || 'Unexpected error occurred');
      setTenant(null);
      setModules([]);
      setDashboardData(null);
      
      // Retry logic for unexpected errors
      if (!isRetry && retryCount < 2) {
        console.log('useTenant: Retrying after unexpected error...');
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchTenant(true), 1000 * (retryCount + 1));
        return;
      }
      setIsReady(true);
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
    setIsReady(false);
    setRetryCount(0);
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
    isReady,
    retryCount,
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