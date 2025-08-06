import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  completeOnboarding: (formData: any) => Promise<{ error: any; tenantId?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for mock authentication first
    const mockUser = localStorage.getItem('mock_user');
    const mockSession = localStorage.getItem('mock_session');
    
    if (mockUser && mockSession) {
      try {
        const parsedUser = JSON.parse(mockUser);
        const parsedSession = JSON.parse(mockSession);
        setUser(parsedUser as User);
        setSession(parsedSession as Session);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing mock auth data:', error);
        localStorage.removeItem('mock_user');
        localStorage.removeItem('mock_session');
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/onboarding`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });
    
    if (error) {
      toast({
        title: "خطأ في التسجيل",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يرجى تسجيل الدخول للمتابعة",
      });
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
    }
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const completeOnboarding = async (formData: any) => {
    if (!user) {
      return { error: { message: "لا يوجد مستخدم مسجل دخول" } };
    }

    try {
      console.log('Starting onboarding with data:', formData);
      console.log('Current user:', { id: user.id, email: user.email });
      
      const { data, error } = await supabase.rpc('complete_onboarding' as any, {
        p_user_id: user.id,
        p_user_email: user.email || '',
        p_user_name: user.user_metadata?.full_name || user.email || '',
        p_company_name: formData.companyName,
        p_business_type: formData.selectedBusinessType,
        p_currency: formData.currency || 'KWD',
        p_country: formData.country || 'Kuwait',
        p_selected_modules: formData.selectedModules || []
      });

      console.log('Onboarding RPC response:', { data, error });

      if (error) {
        console.error('Onboarding RPC error:', error);
        toast({
          title: "خطأ في إعداد النظام",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Check if the function returned an error in the data
      const result = data as any;
      if (result && !result.success) {
        console.error('Onboarding failed:', result);
        toast({
          title: "خطأ في إعداد النظام",
          description: result.message || result.error,
          variant: "destructive",
        });
        return { error: result.error };
      }

      console.log('Onboarding completed successfully:', result);
      
      // Update user's tenant_id in the users table
      if (result?.tenant_id) {
        console.log('Updating user tenant_id:', result.tenant_id);
        const { error: updateError } = await supabase
          .from('users')
          .update({ tenant_id: result.tenant_id })
          .eq('id', user.id);
          
        if (updateError) {
          console.error('Error updating user tenant_id:', updateError);
          // Don't fail the onboarding for this error, just log it
        } else {
          console.log('User tenant_id updated successfully');
        }
      }
      
      // Force refresh auth state to get updated user data
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        console.warn('Session refresh warning:', refreshError);
      }

      toast({
        title: "تم إعداد النظام بنجاح",
        description: "مرحباً بك في نظام إدارة الأعمال المتكامل",
      });

      return { error: null, tenantId: result?.tenant_id };
    } catch (err: any) {
      console.error('Error completing onboarding:', err);
      toast({
        title: "خطأ في إعداد النظام",
        description: err.message,
        variant: "destructive",
      });
      return { error: err };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}