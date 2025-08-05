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
      className={`group cursor-pointer transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-1 ${
        isSelected 
          ? 'ring-2 ring-primary/40 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] bg-gradient-to-br from-primary/5 to-primary/10 border-primary/60' 
          : 'hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] border-border/40 hover:border-primary/50 bg-background/80 backdrop-blur-sm'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-10 text-center relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-20 h-20 rounded-full ${
            isSelected ? 'bg-primary' : 'bg-secondary'
          }`}></div>
          <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-12 h-12 rounded-full ${
            isSelected ? 'bg-accent' : 'bg-muted'
          }`}></div>
        </div>
        
        {/* Selection Badge */}
        {isSelected && (
          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-primary text-white rounded-full p-2 animate-scale-in`}>
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
        
        <div className={`relative mx-auto mb-8 p-6 rounded-3xl transition-all duration-500 ${
          isSelected 
            ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-[0_0_25px_rgba(var(--primary-rgb),0.4)] scale-110 rotate-3' 
            : 'bg-gradient-to-br from-secondary/50 to-secondary text-secondary-foreground group-hover:from-primary/20 group-hover:to-primary/10 group-hover:scale-105 group-hover:-rotate-1'
        }`}>
          <businessType.icon className="w-12 h-12 mx-auto" />
        </div>
        
        <h3 className={`font-display font-bold text-xl mb-4 transition-all duration-300 ${
          isSelected ? 'text-primary scale-105' : 'text-foreground group-hover:text-primary group-hover:scale-102'
        }`}>
          {isRTL ? businessType.nameAr : businessType.nameEn}
        </h3>
        
        {businessType.description && (
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs mx-auto">
            {businessType.description}
          </p>
        )}
        
        {isSelected ? (
          <div className="flex items-center justify-center gap-3 text-primary animate-fade-in">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold tracking-wide">
              {isRTL ? 'محدد ✓' : 'Selected ✓'}
            </span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-sm text-muted-foreground group-hover:text-primary/80">
            <div className="border border-dashed border-current rounded-lg px-4 py-2 group-hover:border-solid">
              {isRTL ? 'انقر للاختيار' : 'Click to select'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}