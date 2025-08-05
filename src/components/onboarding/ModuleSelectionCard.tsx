import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Module, ModuleCategory } from '@/types/onboarding';
import { isModuleUnavailable, getDependencyMessage } from '@/utils/moduleDependencies';
import { ChevronDown, ChevronUp, Info, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleSelectionCardProps {
  category: ModuleCategory;
  modules: Module[];
  selectedModules: string[];
  onModuleToggle: (moduleId: string) => void;
  isRTL: boolean;
  availableModules?: Module[];
  allModules: Module[];
}

export default function ModuleSelectionCard({ 
  category, 
  modules, 
  selectedModules, 
  onModuleToggle, 
  isRTL,
  availableModules = modules,
  allModules
}: ModuleSelectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Only show modules that are available
  const displayModules = modules.filter(module => 
    availableModules.some(availableModule => availableModule.id === module.id)
  );
  
  if (displayModules.length === 0) return null;

  // Calculate statistics
  const selectedCount = displayModules.filter(module => selectedModules.includes(module.id)).length;
  const totalCount = displayModules.length;
  const completionPercentage = totalCount > 0 ? Math.round((selectedCount / totalCount) * 100) : 0;

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 border-2",
      selectedCount > 0 ? "border-primary/20 bg-primary/2" : "border-border hover:border-primary/30"
    )}>
      <CardHeader 
        className="pb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={cn("flex items-center justify-between", isRTL ? "flex-row-reverse" : "")}>
          <div className={cn("flex items-center gap-3", isRTL ? "flex-row-reverse" : "")}>
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              selectedCount > 0 ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              <category.icon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">
                {isRTL ? category.nameAr : category.nameEn}
              </CardTitle>
              <div className={cn("flex items-center gap-2 mt-1", isRTL ? "flex-row-reverse" : "")}>
                <Badge 
                  variant={selectedCount > 0 ? "default" : "secondary"} 
                  className="text-xs"
                >
                  {selectedCount}/{totalCount}
                </Badge>
                {selectedCount > 0 && (
                  <div className="flex items-center gap-1 text-primary text-xs font-medium">
                    <Check className="w-3 h-3" />
                    <span>{completionPercentage}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="w-full bg-secondary rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-3 animate-accordion-down">
          {displayModules.map((module, index) => {
            const isSelected = selectedModules.includes(module.id);
            const isUnavailable = isModuleUnavailable(module, selectedModules);
            
            return (
              <div
                key={module.id}
                className={cn(
                  "group/module relative overflow-hidden rounded-xl border-2 transition-all duration-300",
                  isSelected 
                    ? 'bg-gradient-to-r from-primary/5 to-primary/10 border-primary/30 shadow-sm' 
                    : 'bg-card border-border/50 hover:border-primary/20 hover:bg-accent/30',
                  isUnavailable && "opacity-60",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn(
                  "flex items-start gap-4 p-4", 
                  isRTL ? 'flex-row-reverse' : ''
                )}>
                  <div className="flex items-center justify-center mt-1">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onModuleToggle(module.id)}
                      disabled={module.required || isUnavailable}
                      className={cn(
                        "w-5 h-5 transition-all duration-200",
                        isSelected && "shadow-lg shadow-primary/25"
                      )}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className={cn("flex items-center gap-2 flex-wrap", isRTL ? "flex-row-reverse" : "")}>
                      <Label 
                        className={cn(
                          "font-semibold cursor-pointer text-base leading-tight",
                          isUnavailable ? 'text-muted-foreground' : 'text-foreground'
                        )}
                        onClick={() => !module.required && !isUnavailable && onModuleToggle(module.id)}
                      >
                        {isRTL ? module.nameAr : module.nameEn}
                      </Label>
                      
                      <div className={cn("flex items-center gap-1", isRTL ? "flex-row-reverse" : "")}>
                        {module.required && (
                          <Badge variant="destructive" className="text-xs font-medium">
                            <Clock className="w-3 h-3 mr-1" />
                            {isRTL ? 'مطلوب' : 'Required'}
                          </Badge>
                        )}
                        {module.advanced && (
                          <Badge variant="secondary" className="text-xs font-medium">
                            <Info className="w-3 h-3 mr-1" />
                            {isRTL ? 'متقدم' : 'Advanced'}
                          </Badge>
                        )}
                        {module.dependencies && module.dependencies.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {isRTL ? 'يعتمد على وحدات أخرى' : 'Has Dependencies'}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                    
                    {/* Dependency message for unavailable modules */}
                    {isUnavailable && (
                      <div className="bg-muted/50 rounded-lg p-3 border border-muted">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            {getDependencyMessage(module, allModules, isRTL)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
}