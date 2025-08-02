import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const MockAuth = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  useEffect(() => {
    // Mock authentication for testing
    const mockUser = {
      id: 'test-user-1',
      email: 'test@example.com',
      user_metadata: {
        full_name: 'مستخدم تجريبي',
        avatar_url: null
      }
    };

    // Simulate successful login
    signIn(mockUser);
    navigate('/dashboard');
  }, [signIn, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>جاري تسجيل الدخول...</p>
      </div>
    </div>
  );
};

