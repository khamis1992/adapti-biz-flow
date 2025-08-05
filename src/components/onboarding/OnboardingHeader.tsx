import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import heroLogo from '@/assets/erp-hero-logo.jpg';

interface OnboardingHeaderProps {
  isRTL: boolean;
  onLanguageToggle: () => void;
}

export default function OnboardingHeader({ isRTL, onLanguageToggle }: OnboardingHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
              <img src={heroLogo} alt="ERP Logo" className="h-14 w-auto" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2 animate-fade-in-down">
                {isRTL ? 'نظام إدارة الأعمال المتكامل' : 'Integrated Business Management System'}
              </h1>
              <p className="text-blue-100/90 text-lg animate-fade-in-up">
                {isRTL ? 'إعداد النظام لأول مرة' : 'First-time System Setup'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onLanguageToggle}
            className="text-white hover:bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <Globe className="w-5 h-5 mr-2" />
            <span className="font-medium">
              {isRTL ? 'English' : 'العربية'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}