import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { 
  Building2,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Shield,
  Zap,
  CheckCircle,
  Star
} from 'lucide-react';

export default function Auth() {
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const { tenant, loading: tenantLoading } = useTenant();
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
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      // Redirect will happen automatically via auth state change
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    
    const { error } = await signUp(email, password, fullName);
    
    if (!error) {
      // Switch to sign in tab after successful registration
      const signInTab = document.querySelector('[value="signin"]') as HTMLElement;
      signInTab?.click();
    }
    
    setIsLoading(false);
  };

  const benefits = [
    { icon: Shield, title: "أمان متطور", description: "حماية بيانات 256-bit" },
    { icon: Zap, title: "سرعة عالية", description: "استجابة فورية" },
    { icon: CheckCircle, title: "سهولة الاستخدام", description: "واجهة بديهية" },
  ];

  const testimonials = [
    { name: "أحمد محمد", company: "شركة النور", rating: 5, text: "نظام رائع ساعدنا في تطوير أعمالنا" },
    { name: "فاطمة علي", company: "مؤسسة الأمل", rating: 5, text: "سهل الاستخدام ومتكامل" },
  ];

  if (authLoading || tenantLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23272874' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-success/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <motion.div
            className="w-full max-w-md space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">ركن</h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  مرحباً بك في منصة ركن
                </h2>
                <p className="text-muted-foreground">
                  شريكك في إدارة احترافية لأعمالك
                </p>
              </motion.div>

              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
              </Link>
            </div>

            {/* Auth Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-border/20 shadow-elegant backdrop-blur-sm bg-card/80">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">ابدأ رحلتك الآن</CardTitle>
                  <CardDescription>
                    سجل دخولك أو أنشئ حساب جديد للوصول إلى جميع المميزات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="signin" className="text-sm">تسجيل الدخول</TabsTrigger>
                      <TabsTrigger value="signup" className="text-sm">إنشاء حساب</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="signin" className="space-y-4 mt-6">
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email" className="text-sm font-medium">
                            البريد الإلكتروني
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signin-email"
                              name="email"
                              type="email"
                              placeholder="example@domain.com"
                              className="pl-10 text-left"
                              required
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-password" className="text-sm font-medium">
                            كلمة المرور
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signin-password"
                              name="password"
                              type="password"
                              placeholder="••••••••"
                              className="pl-10 text-left"
                              required
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-success hover:bg-success/90 text-white font-medium py-6 text-base"
                          disabled={isLoading}
                        >
                          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup" className="space-y-4 mt-6">
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="text-sm font-medium">
                            الاسم الكامل
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-name"
                              name="fullName"
                              type="text"
                              placeholder="اسمك الكامل"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-sm font-medium">
                            البريد الإلكتروني
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-email"
                              name="email"
                              type="email"
                              placeholder="example@domain.com"
                              className="pl-10 text-left"
                              required
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-sm font-medium">
                            كلمة المرور
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              name="password"
                              type="password"
                              placeholder="كلمة مرور قوية"
                              className="pl-10 text-left"
                              required
                              dir="ltr"
                            />
                          </div>
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 text-base"
                          disabled={isLoading}
                        >
                          {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب مجاني"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Benefits & Testimonials */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-16 bg-gradient-to-bl from-primary/5 to-success/5">
          <motion.div
            className="max-w-lg space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Benefits */}
            <div className="space-y-6">
              <motion.h3 
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                لماذا تختار ركن؟
              </motion.h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/20"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <motion.h3 
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                ماذا يقول عملاؤنا
              </motion.h3>
              
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-card/50 border border-border/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">عميل معتمد</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-success/10 border border-border/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+1000</div>
                <div className="text-xs text-muted-foreground">شركة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">99%</div>
                <div className="text-xs text-muted-foreground">رضا العملاء</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-xs text-muted-foreground">دعم فني</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}