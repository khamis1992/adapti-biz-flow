import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import OrganicHeroSection from '@/components/landing/OrganicHeroSection';
import OrganicFeaturesSection from '@/components/landing/OrganicFeaturesSection';
import OrganicTestimonialsSection from '@/components/landing/OrganicTestimonialsSection';
import OrganicCTASection from '@/components/landing/OrganicCTASection';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { tenant, loading: tenantLoading } = useTenant();

  if (authLoading || tenantLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect authenticated users based on their onboarding status
  if (user) {
    if (tenant) {
      navigate('/dashboard');
      return null;
    } else {
      navigate('/onboarding');
      return null;
    }
  }

  const handleStartFree = () => navigate('/auth');
  const handleLogin = () => navigate('/auth');
  const handleRequestDemo = () => navigate('/auth');

  return (
    <div className="min-h-screen">
      <OrganicHeroSection 
        onStartFree={handleStartFree}
        onLogin={handleLogin}
      />
      <OrganicFeaturesSection />
      <OrganicTestimonialsSection />
      <OrganicCTASection 
        onStartFree={handleStartFree}
        onRequestDemo={handleRequestDemo}
      />
    </div>
  );
};

export default Index;
