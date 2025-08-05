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
      className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
        isSelected 
          ? 'ring-2 ring-primary shadow-glow-primary bg-gradient-subtle border-primary/50' 
          : 'hover:shadow-3d-medium border-border/50 hover:border-primary/30'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-8 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute top-0 right-0 w-16 h-16 rounded-full ${
            isSelected ? 'bg-primary' : 'bg-secondary'
          }`}></div>
        </div>
        
        <div className={`relative mx-auto mb-6 p-4 rounded-2xl transition-all duration-300 ${
          isSelected 
            ? 'bg-gradient-primary text-white shadow-glow-primary scale-110' 
            : 'bg-secondary text-secondary-foreground group-hover:bg-primary/10 group-hover:scale-105'
        }`}>
          <businessType.icon className="w-10 h-10" />
        </div>
        
        <h3 className={`font-display font-bold text-lg mb-3 transition-colors duration-300 ${
          isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
        }`}>
          {isRTL ? businessType.nameAr : businessType.nameEn}
        </h3>
        
        {businessType.description && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {businessType.description}
          </p>
        )}
        
        {isSelected ? (
          <div className="flex items-center justify-center gap-2 text-primary animate-scale-in">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">
              {isRTL ? 'مختار' : 'Selected'}
            </span>
          </div>
        ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-muted-foreground">
            {isRTL ? 'انقر للاختيار' : 'Click to select'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}