import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MockAuth = () => {
  const navigate = useNavigate();

  const handleMockLogin = () => {
    // Set mock authentication data in localStorage
    const mockUser = {
      id: 'mock-user-123',
      email: 'test@example.com',
      name: 'مستخدم تجريبي'
    };

    const mockTenant = {
      id: 'mock-tenant-123',
      name: 'شركة الخليج لتأجير السيارات',
      slug: 'gulf-car-rental',
      business_type: 'car_rental',
      status: 'active',
      subscription_status: 'active',
      settings: {
        currency: 'KWD',
        country: 'KW',
        language: 'ar'
      }
    };

    const mockSession = {
      access_token: 'mock-token-123',
      user: mockUser
    };

    // Store in localStorage for persistence
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    localStorage.setItem('mock_tenant', JSON.stringify(mockTenant));
    localStorage.setItem('mock_session', JSON.stringify(mockSession));
    localStorage.setItem('onboarding_completed', 'true');

    // Navigate to dashboard
    navigate('/dashboard', { replace: true });
  };

  const handleClearAuth = () => {
    localStorage.removeItem('mock_user');
    localStorage.removeItem('mock_tenant');
    localStorage.removeItem('mock_session');
    localStorage.removeItem('onboarding_completed');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            تسجيل دخول تجريبي
          </CardTitle>
          <p className="text-gray-600 mt-2">
            للاختبار والتطوير فقط
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleMockLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            تسجيل دخول تجريبي
          </Button>
          
          <Button 
            onClick={handleClearAuth}
            variant="outline"
            className="w-full"
            size="lg"
          >
            مسح بيانات التسجيل
          </Button>

          <div className="text-sm text-gray-500 text-center mt-4">
            <p>سيتم إنشاء:</p>
            <ul className="list-disc list-inside mt-2 text-right">
              <li>مستخدم تجريبي</li>
              <li>شركة تأجير سيارات</li>
              <li>جلسة مصادقة وهمية</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockAuth;

