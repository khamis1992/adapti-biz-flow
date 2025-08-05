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
  const { tenant, loading: tenantLoading } = useTenant();
  const navigate = useNavigate();
  const [delayedCheck, setDelayedCheck] = useState(false);

  // Add a small delay to allow for tenant data loading after onboarding
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedCheck(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Don't redirect immediately, wait for delayedCheck to be true
    if (!delayedCheck) return;

    // Redirect to signin if not authenticated
    if (!authLoading && !user) {
      console.log('ProtectedRoute: User not authenticated, redirecting to signin');
      navigate('/signin');
      return;
    }

    // Redirect to onboarding if user has no tenant (and tenant is required)
    if (!authLoading && user && requireTenant && !tenantLoading && !tenant) {
      console.log('ProtectedRoute: User has no tenant, redirecting to onboarding');
      navigate('/onboarding');
      return;
    }

    // Log successful access
    if (!authLoading && user && (!requireTenant || (!tenantLoading && tenant))) {
      console.log('ProtectedRoute: Access granted', { user: user.email, tenant: tenant?.name });
    }
  }, [user, tenant, authLoading, tenantLoading, requireTenant, navigate, delayedCheck]);

  // Show loading spinner while checking authentication and tenant
  if (authLoading || (requireTenant && tenantLoading) || !delayedCheck) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Checking authentication...' : 
             tenantLoading ? 'Loading tenant data...' : 
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