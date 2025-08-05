import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logoRukn from '@/assets/logo_rukn_1-removebg-preview.png';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
export default function Auth() {
  const {
    user,
    signIn,
    loading: authLoading
  } = useAuth();
  const {
    tenant,
    loading: tenantLoading
  } = useTenant();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (user && !authLoading && !tenantLoading) {
    if (tenant) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/onboarding" replace />;
    }
  }
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const {
      error
    } = await signIn(email, password);
    if (!error) {
      // Redirect will happen automatically via auth state change
    }
    setIsLoading(false);
  };
  if (authLoading || tenantLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div className="flex flex-col items-center gap-4" initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </motion.div>
      </div>;
  }
  return <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <motion.div className="w-full max-w-md space-y-8" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }}>
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div className="flex items-center justify-center" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2
        }}>
            <div className="w-32 h-32 flex items-center justify-center">
              <img src={logoRukn} alt="ركن - شعار الشركة" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
            
            <h2 className="text-xl font-semibold text-foreground mb-2">
              مرحباً بك في منصة ركن
            </h2>
            <p className="text-muted-foreground">
              شريكك في إدارة احترافية لأعمالك
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.4
        }}>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Link>
          </motion.div>
        </div>

        {/* Auth Card */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }}>
          <Card className="border shadow-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl">تسجيل الدخول</CardTitle>
              <CardDescription>
                سجل دخولك للوصول إلى جميع المميزات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium text-foreground">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signin-email" name="email" type="email" placeholder="example@domain.com" className="pl-10 h-12 text-left border-border" required dir="ltr" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium text-foreground">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signin-password" name="password" type="password" placeholder="••••••••" className="pl-10 h-12 text-left border-border" required dir="ltr" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-success hover:bg-success/90 text-white font-medium h-12 text-base" disabled={isLoading}>
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>;
}