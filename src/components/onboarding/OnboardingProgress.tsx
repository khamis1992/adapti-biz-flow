import { Progress } from '@/components/ui/progress';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  isRTL: boolean;
}

export default function OnboardingProgress({ currentStep, totalSteps, isRTL }: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {isRTL ? `الخطوة ${currentStep} من ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}