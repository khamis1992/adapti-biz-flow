import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import ProfessionalHeroSection from '@/components/landing/ProfessionalHeroSection';
import ProfessionalFeaturesSection from '@/components/landing/ProfessionalFeaturesSection';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';



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

  const handleStartFree = () => navigate('/auth?tab=signup');
  const handleLogin = () => navigate('/auth');
  const handleRequestDemo = () => navigate('/auth');

  return (
    <div className="min-h-screen" dir="rtl">
      <Header 
        onStartFree={handleStartFree}
        onLogin={handleLogin}
      />
      <div className="pt-16 lg:pt-20">
        <ProfessionalHeroSection 
          onStartFree={handleStartFree}
          onLogin={handleLogin}
        />
        <ProfessionalFeaturesSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
