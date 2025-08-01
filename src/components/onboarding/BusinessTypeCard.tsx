import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { BusinessType } from '@/types/onboarding';

interface BusinessTypeCardProps {
  businessType: BusinessType;
  isSelected: boolean;
  onSelect: () => void;
  isRTL: boolean;
}

export default function BusinessTypeCard({ 
  businessType, 
  isSelected, 
  onSelect, 
  isRTL 
}: BusinessTypeCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
        isSelected 
          ? 'ring-2 ring-primary shadow-glow bg-primary/5' 
          : 'hover:shadow-soft'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-6 text-center">
        <div className={`mx-auto mb-4 p-3 rounded-full ${
          isSelected 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground'
        }`}>
          <businessType.icon className="w-8 h-8" />
        </div>
        <h3 className="font-semibold mb-2">
          {isRTL ? businessType.nameAr : businessType.nameEn}
        </h3>
        {businessType.description && (
          <p className="text-sm text-muted-foreground mb-2">
            {businessType.description}
          </p>
        )}
        {isSelected && (
          <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
        )}
      </CardContent>
    </Card>
  );
}