import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Globe, CheckCircle } from 'lucide-react';
import heroLogo from '@/assets/erp-hero-logo.jpg';

interface HeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

export default function HeroSection({ onStartFree, onLogin }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-active/95"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.05'%3E%3Cpath d='M0 20h40M20 0v40' stroke='white' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative container mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <img src={heroLogo} alt="ERP Business System" className="h-16 w-auto" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success-light" />
                    <span className="text-sm font-medium text-white/90">ISO 27001 Certified</span>
                  </div>
                  <div className="text-sm text-white/70">Trusted by 1000+ businesses</div>
                </div>
              </div>

              <h1 className="font-display text-5xl lg:text-7xl font-semibold mb-8 leading-tight">
                <span className="text-white">نظام إدارة</span>
                <br />
                <span className="bg-gradient-to-r from-white to-success-light bg-clip-text text-transparent">
                  الأعمال المتكامل
                </span>
              </h1>

              <p className="text-xl lg:text-2xl mb-4 text-white/90 font-light">
                Integrated Business Management System
              </p>

              <p className="text-lg mb-12 max-w-2xl text-white/80 leading-relaxed">
                حلول ERP احترافية ومتطورة لإدارة جميع أنواع الأعمال بكفاءة عالية. 
                نظام شامل يدعم المحاسبة، إدارة العملاء، والعمليات التجارية المتقدمة.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Button 
                  size="lg" 
                  onClick={onStartFree}
                  className="text-lg px-8 py-6 h-auto bg-success hover:bg-success/90 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
                >
                  <Building2 className="w-5 h-5 mr-3" />
                  ابدأ الآن مجاناً
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={onLogin}
                  className="text-lg px-8 py-6 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-medium"
                >
                  <Globe className="w-5 h-5 mr-3" />
                  تسجيل الدخول
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-light" />
                  <span className="text-sm">بدون التزام</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-light" />
                  <span className="text-sm">إعداد في دقائق</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-light" />
                  <span className="text-sm">دعم 24/7</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="lg:pl-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-3">50+</div>
                  <div className="text-white/90 font-medium mb-2">وحدة متخصصة</div>
                  <div className="text-white/70 text-sm">من المحاسبة إلى إدارة العملاء</div>
                </div>
                <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-3">1000+</div>
                  <div className="text-white/90 font-medium mb-2">عميل راضٍ</div>
                  <div className="text-white/70 text-sm">في جميع أنحاء المنطقة</div>
                </div>
                <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-3">99.9%</div>
                  <div className="text-white/90 font-medium mb-2">وقت التشغيل</div>
                  <div className="text-white/70 text-sm">خدمة موثوقة ومستمرة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}