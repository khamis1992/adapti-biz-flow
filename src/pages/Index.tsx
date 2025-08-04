import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowRight, Globe, Shield, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import heroLogo from '@/assets/erp-hero-logo.jpg';

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="flex flex-col items-center text-center text-white max-w-6xl mx-auto">
            <div className="mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <img src={heroLogo} alt="ERP Business System" className="h-20 w-auto" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                نظام إدارة الأعمال المتكامل
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-normal text-white/90">
                Integrated Business Management System
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-12 max-w-4xl text-white/90 leading-relaxed">
              نظام ERP شامل ومتطور لإدارة جميع أنواع الأعمال بكفاءة عالية. يدعم تأجير السيارات، اليخوت، المطاعم، الصالونات والمزيد 
              مع نظام محاسبي احترافي ودعم كامل للغة العربية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="text-lg px-10 py-6 h-auto bg-success hover:bg-success/90 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Building2 className="w-5 h-5 mr-3" />
                ابدأ الآن مجاناً
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/auth')}
                className="text-lg px-10 py-6 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Globe className="w-5 h-5 mr-3" />
                تسجيل الدخول
              </Button>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80">وحدة متخصصة</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                <div className="text-white/80">عميل راضٍ</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80">دعم فني</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-primary">مميزات النظام المتطور</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            حلول متكاملة وذكية لإدارة جميع جوانب أعمالك بكفاءة ودقة عالية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <div className="mx-auto mb-6 p-4 rounded-full bg-primary/10 w-fit">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary mb-4">متعدد الأنشطة</CardTitle>
              <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                يدعم تأجير السيارات، اليخوت، المعدات، المطاعم، الصالونات، والعديد من الأنشطة الأخرى
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <div className="mx-auto mb-6 p-4 rounded-full bg-success/10 w-fit">
                <Shield className="w-10 h-10 text-success" />
              </div>
              <CardTitle className="text-2xl text-primary mb-4">نظام محاسبي احترافي</CardTitle>
              <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                دليل حسابات متكامل، قيود تلقائية، تقارير مالية شاملة، ومراكز تكلفة متقدمة
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-soft bg-gradient-card">
            <CardHeader>
              <div className="mx-auto mb-6 p-4 rounded-full bg-active/10 w-fit">
                <Users className="w-10 h-10 text-active" />
              </div>
              <CardTitle className="text-2xl text-primary mb-4">إدارة شاملة ومتطورة</CardTitle>
              <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                إدارة العملاء، الموظفين، الأسطول، العقود، والمخالفات في منصة واحدة موحدة
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto border-0 shadow-strong bg-gradient-card p-12">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl text-primary mb-6">جاهز لتطوير أعمالك؟</CardTitle>
              <CardDescription className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                ابدأ رحلتك معنا اليوم واكتشف كيف يمكن لنظامنا المتطور أن يحول طريقة إدارتك لأعمالك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  className="text-xl px-12 py-6 h-auto bg-success hover:bg-success/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Building2 className="w-6 h-6 mr-3" />
                  ابدأ الآن مجاناً
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="text-xl px-12 py-6 h-auto border-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Globe className="w-6 h-6 mr-3" />
                  عرض تجريبي
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
