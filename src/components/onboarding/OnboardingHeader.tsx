import companyLogo from '@/assets/logo_rukn_1-removebg-preview.png';

export default function OnboardingHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10" dir="rtl">
        <div className="flex items-center gap-6">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
            <img src={companyLogo} alt="رُكن Logo" className="h-14 w-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2 animate-fade-in-down">
              نظام إدارة الأعمال المتكامل
            </h1>
            <p className="text-blue-100/90 text-lg animate-fade-in-up">
              إعداد النظام لأول مرة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}