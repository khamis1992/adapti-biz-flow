import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Module, ModuleCategory } from '@/types/onboarding';
import { isModuleUnavailable, getDependencyMessage } from '@/utils/moduleDependencies';

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
  // Only show modules that are available
  const displayModules = modules.filter(module => 
    availableModules.some(availableModule => availableModule.id === module.id)
  );
  
  if (displayModules.length === 0) return null;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <category.icon className="w-5 h-5" />
          {isRTL ? category.nameAr : category.nameEn}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayModules.map((module) => (
          <div
            key={module.id}
            className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
              selectedModules.includes(module.id) 
                ? 'bg-primary/5 border-primary' 
                : 'bg-background border-border hover:bg-accent'
            } ${isRTL ? 'space-x-reverse' : ''}`}
          >
            <Checkbox
              checked={selectedModules.includes(module.id)}
              onCheckedChange={() => onModuleToggle(module.id)}
              disabled={module.required || isModuleUnavailable(module, selectedModules)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Label 
                  className={`font-medium cursor-pointer text-sm ${
                    isModuleUnavailable(module, selectedModules) ? 'opacity-50' : ''
                  }`}
                >
                  {isRTL ? module.nameAr : module.nameEn}
                </Label>
                {module.required && (
                  <Badge variant="secondary" className="text-xs">
                    {isRTL ? 'مطلوب' : 'Required'}
                  </Badge>
                )}
                {module.advanced && (
                  <Badge variant="outline" className="text-xs">
                    {isRTL ? 'متقدم' : 'Advanced'}
                  </Badge>
                )}
                {module.dependencies && module.dependencies.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {isRTL ? 'يعتمد على وحدات أخرى' : 'Has Dependencies'}
                  </Badge>
                )}
              </div>
              {/* Dependency message for unavailable modules */}
              {isModuleUnavailable(module, selectedModules) && (
                <div className="text-xs text-muted-foreground mt-1">
                  {getDependencyMessage(module, allModules, isRTL)}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {module.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}