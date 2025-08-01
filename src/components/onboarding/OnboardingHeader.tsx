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
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={heroLogo} alt="ERP Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {isRTL ? 'نظام إدارة الأعمال المتكامل' : 'Integrated Business Management System'}
              </h1>
              <p className="text-blue-100">
                {isRTL ? 'إعداد النظام لأول مرة' : 'First-time System Setup'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onLanguageToggle}
            className="text-white hover:bg-white/20"
          >
            <Globe className="w-4 h-4 mr-2" />
            {isRTL ? 'English' : 'العربية'}
          </Button>
        </div>
      </div>
    </div>
  );
}