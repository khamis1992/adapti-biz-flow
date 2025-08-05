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
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            {isRTL ? `الخطوة ${currentStep} من ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-primary">
              {Math.round(progress)}%
            </span>
            <span className="text-xs text-muted-foreground">
              {isRTL ? 'مكتمل' : 'Complete'}
            </span>
          </div>
        </div>
        
        {/* Enhanced Progress Bar - RTL Direction */}
        <div className="relative">
          <Progress 
            value={progress} 
            className={`h-3 bg-secondary/50 ${isRTL ? 'progress-rtl' : ''}`} 
          />
          <div className={`absolute inset-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-primary via-accent to-success opacity-20 rounded-full`}></div>
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                i + 1 <= currentStep
                  ? 'bg-gradient-primary text-white shadow-glow-primary'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}