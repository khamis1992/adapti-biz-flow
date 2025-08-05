import { Progress } from '@/components/ui/progress';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  isRTL: boolean;
}

export default function OnboardingProgress({ currentStep, totalSteps, isRTL }: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className={`container mx-auto px-6 py-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between mb-4`}>
          <span className="text-sm font-medium text-muted-foreground">
            {isRTL ? `الخطوة ${currentStep} من ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
          </span>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-bold text-primary">
              {Math.round(progress)}%
            </span>
            <span className="text-xs text-muted-foreground">
              {isRTL ? 'مكتمل' : 'Complete'}
            </span>
          </div>
        </div>
        
        {/* Enhanced Progress Bar - RTL Direction */}
        <div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="w-full h-3 bg-secondary/50 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-${isRTL ? 'l' : 'r'} from-primary via-accent to-success transition-all duration-500 ease-out`}
              style={{ 
                width: `${progress}%`,
                transformOrigin: isRTL ? 'right' : 'left',
                direction: isRTL ? 'rtl' : 'ltr'
              }}
            />
          </div>
          <div className={`absolute inset-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-primary/10 via-accent/10 to-success/10 rounded-full pointer-events-none`}></div>
        </div>
        
        {/* Step Indicators */}
        <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between mt-4`}>
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNumber = isRTL ? totalSteps - i : i + 1;
            const isCompleted = isRTL ? (totalSteps - i) <= currentStep : (i + 1) <= currentStep;
            return (
              <div
                key={i}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-primary text-white shadow-glow-primary'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {stepNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}