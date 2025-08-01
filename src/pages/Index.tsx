import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowRight, Globe, Shield, Users } from 'lucide-react';
import heroLogo from '@/assets/erp-hero-logo.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center text-white">
            <img src={heroLogo} alt="ERP Business System" className="h-24 w-auto mb-8" />
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              نظام إدارة الأعمال المتكامل
              <br />
              <span className="text-3xl font-normal opacity-90">Integrated Business Management System</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl opacity-90 leading-relaxed">
              نظام ERP شامل لإدارة شركات تأجير السيارات، اليخوت، المطاعم، الصالونات والمزيد. 
              مع نظام محاسبي احترافي ودعم كامل للغة العربية
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/onboarding')}
                className="text-lg px-8 py-4 h-auto"
              >
                <Building2 className="w-5 h-5 mr-2" />
                ابدأ الإعداد الآن
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Globe className="w-5 h-5 mr-2" />
                Start Setup Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">مميزات النظام</h2>
          <p className="text-xl text-muted-foreground">نظام شامل ومتكامل لإدارة جميع أنواع الأعمال</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>متعدد الأنشطة</CardTitle>
              <CardDescription>
                يدعم تأجير السيارات، اليخوت، المعدات، المطاعم، الصالونات، والمزيد
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 rounded-full bg-success/10 w-fit">
                <Shield className="w-8 h-8 text-success" />
              </div>
              <CardTitle>نظام محاسبي احترافي</CardTitle>
              <CardDescription>
                دليل حسابات متكامل، قيود تلقائية، تقارير مالية شاملة، ومراكز تكلفة
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 rounded-full bg-warning/10 w-fit">
                <Users className="w-8 h-8 text-warning" />
              </div>
              <CardTitle>إدارة شاملة</CardTitle>
              <CardDescription>
                إدارة العملاء، الموظفين، الأسطول، العقود، والمخالفات في مكان واحد
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">جاهز للبدء؟</CardTitle>
              <CardDescription className="text-lg">
                اتبع معالج الإعداد البسيط لتخصيص النظام حسب نوع نشاطك التجاري
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                onClick={() => navigate('/onboarding')}
                className="w-full text-lg py-6"
              >
                <Building2 className="w-5 h-5 mr-2" />
                ابدأ معالج الإعداد
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
