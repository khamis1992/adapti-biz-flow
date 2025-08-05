import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useNavigate, useLocation } from 'react-router-dom';

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { tenant, loading: tenantLoading } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect if still loading
    if (authLoading || tenantLoading) return;

    // Don't redirect if we're already on a public page
    const publicPages = ['/', '/signin', '/signup', '/mock-auth'];
    if (publicPages.includes(location.pathname)) return;

    // Don't redirect if we're already on the onboarding page
    if (location.pathname === '/onboarding') return;

    // If user is authenticated but has no tenant, redirect to onboarding
    if (user && !tenant) {
      console.log('OnboardingGuard: User has no tenant, redirecting to onboarding');
      navigate('/onboarding', { replace: true });
      return;
    }

    // If user is not authenticated and not on a public page, redirect to signin
    if (!user) {
      console.log('OnboardingGuard: User not authenticated, redirecting to signin');
      navigate('/signin', { replace: true });
      return;
    }
  }, [user, tenant, authLoading, tenantLoading, location.pathname, navigate]);

  return <>{children}</>;
}