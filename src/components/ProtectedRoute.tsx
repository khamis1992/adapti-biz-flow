import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireTenant?: boolean;
}

export function ProtectedRoute({ children, requireTenant = true }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { tenant, loading: tenantLoading, isReady: tenantReady } = useTenant();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth to be ready
    if (authLoading) return;

    // Redirect to signin if not authenticated
    if (!user) {
      console.log('ProtectedRoute: User not authenticated, redirecting to signin');
      navigate('/signin');
      return;
    }

    // For routes that require tenant, wait for tenant data to be ready
    if (requireTenant && !tenantReady) {
      console.log('ProtectedRoute: Waiting for tenant data to be ready...');
      return;
    }

    // Redirect to onboarding if user has no tenant (and tenant is required)
    if (requireTenant && tenantReady && !tenant) {
      console.log('ProtectedRoute: User has no tenant, redirecting to onboarding');
      navigate('/onboarding');
      return;
    }

    // Log successful access
    if (user && (!requireTenant || (tenantReady && tenant))) {
      console.log('ProtectedRoute: Access granted', { user: user.email, tenant: tenant?.name });
    }
  }, [user, tenant, authLoading, tenantReady, requireTenant, navigate]);

  // Show loading spinner while checking authentication and tenant
  if (authLoading || (requireTenant && (tenantLoading || !tenantReady))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Checking authentication...' : 
             tenantLoading ? 'Loading tenant data...' : 
             !tenantReady ? 'Preparing tenant data...' :
             'Initializing...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  // Don't render if tenant is required but not available
  if (requireTenant && !tenant) {
    return null;
  }

  return <>{children}</>;
}