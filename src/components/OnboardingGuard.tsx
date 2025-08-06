import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { useNavigate, useLocation } from 'react-router-dom';

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { tenant, loading: tenantLoading, isReady: tenantReady } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect if still loading auth or if tenant data isn't ready yet
    if (authLoading || (!tenantReady && user)) return;

    // Don't redirect if we're already on a public page
    const publicPages = ['/', '/signin', '/signup', '/mock-auth'];
    if (publicPages.includes(location.pathname)) return;

    // Don't redirect if we're already on the onboarding page
    if (location.pathname === '/onboarding') return;

    // If user is not authenticated and not on a public page, redirect to signin
    if (!user) {
      console.log('OnboardingGuard: User not authenticated, redirecting to signin');
      navigate('/signin', { replace: true });
      return;
    }

    // Check if onboarding was recently completed (within last 5 minutes)
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    const onboardingTime = localStorage.getItem('onboarding_time');
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (onboardingCompleted && onboardingTime) {
      const completedTime = parseInt(onboardingTime);
      if (now - completedTime < fiveMinutes) {
        console.log('OnboardingGuard: Onboarding recently completed, allowing access');
        return;
      } else {
        // Clear old onboarding flags
        localStorage.removeItem('onboarding_completed');
        localStorage.removeItem('onboarding_time');
      }
    }

    // If user is authenticated and tenant data is ready but has no tenant, redirect to onboarding
    if (user && tenantReady && !tenant) {
      console.log('OnboardingGuard: User has no tenant, redirecting to onboarding');
      navigate('/onboarding', { replace: true });
      return;
    }
  }, [user, tenant, authLoading, tenantReady, location.pathname, navigate]);

  return <>{children}</>;
}