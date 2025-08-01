import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Car, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Settings,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          navigate('/auth');
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/auth');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'خطأ في تسجيل الخروج',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'تم تسجيل الخروج بنجاح',
        description: 'نراك قريباً'
      });
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">نظام إدارة الأعمال</h1>
                <p className="text-sm text-muted-foreground">لوحة التحكم الرئيسية</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                <Badge variant="destructive" className="w-2 h-2 p-0 ml-1"></Badge>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            مرحباً، {user?.user_metadata?.full_name || user?.email}
          </h2>
          <p className="text-muted-foreground text-lg">
            إليك ملخص سريع عن أداء نشاطك التجاري اليوم
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الإيرادات اليومية</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">٢٤,٥٠٠ د.ك</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+20.1%</span> من الأمس
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">العقود النشطة</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">١٢٣</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+5</span> عقود جديدة
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المركبات المتاحة</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">٤٥/٦٨</div>
              <p className="text-xs text-muted-foreground">
                ٢٣ مركبة مؤجرة حالياً
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل الإشغال</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">٧٨٪</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+12%</span> هذا الشهر
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                الإجراءات السريعة
              </CardTitle>
              <CardDescription>
                الوظائف الأكثر استخداماً في النظام
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/invoices')}>
                <Users className="w-6 h-6 mb-2" />
                فاتورة جديدة
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/accounting')}>
                <Car className="w-6 h-6 mb-2" />
                المحاسبة
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/financial-reports')}>
                <DollarSign className="w-6 h-6 mb-2" />
                التقارير المالية
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="w-6 h-6 mb-2" />
                عقد جديد
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                التنبيهات والمهام
              </CardTitle>
              <CardDescription>
                المهام المعلقة والتنبيهات المهمة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">انتهاء تأمين المركبة ABC-123</p>
                  <p className="text-xs text-muted-foreground">خلال ٣ أيام</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-2 h-2 bg-error rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">مخالفة مرورية غير مدفوعة</p>
                  <p className="text-xs text-muted-foreground">مركبة DEF-456</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">صيانة دورية مجدولة</p>
                  <p className="text-xs text-muted-foreground">٥ مركبات غداً</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>حالة النظام</CardTitle>
            <CardDescription>
              نظرة عامة على وحدات النظام والخدمات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">المحاسبة</p>
                  <p className="text-sm text-muted-foreground">جميع الخدمات تعمل</p>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">
                  نشط
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">إدارة العقود</p>
                  <p className="text-sm text-muted-foreground">جميع الخدمات تعمل</p>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">
                  نشط
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">نظام التقارير</p>
                  <p className="text-sm text-muted-foreground">جميع الخدمات تعمل</p>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">
                  نشط
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;