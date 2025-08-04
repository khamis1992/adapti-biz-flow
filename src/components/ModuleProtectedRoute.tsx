import React from 'react';
import { Navigate } from 'react-router-dom';
import { useModuleEnabled } from '@/utils/moduleUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

interface ModuleProtectedRouteProps {
  moduleId: string;
  children: React.ReactNode;
  redirectTo?: string;
  showFallback?: boolean;
}

export const ModuleProtectedRoute: React.FC<ModuleProtectedRouteProps> = ({
  moduleId,
  children,
  redirectTo = '/dashboard',
  showFallback = true
}) => {
  const isEnabled = useModuleEnabled(moduleId);

  if (!isEnabled) {
    if (!showFallback) {
      return <Navigate to={redirectTo} replace />;
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-orange-100 dark:bg-orange-900/20">
              <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-xl">الوحدة غير متاحة</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              هذه الوحدة غير مفعلة في النظام الحالي. يرجى التواصل مع المدير لتفعيلها.
            </p>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة للخلف
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full"
              >
                العودة للوحة التحكم
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ModuleProtectedRoute;

