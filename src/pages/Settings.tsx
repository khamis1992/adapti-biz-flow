import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Building2, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Save,
  Trash2,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Company Settings
  const [companySettings, setCompanySettings] = useState({
    name: 'شركة تأجير السيارات المتقدمة',
    email: 'info@company.com',
    phone: '+965 2222 3333',
    address: 'الكويت، منطقة السالمية',
    taxNumber: 'TAX123456789',
    currency: 'KWD',
    language: 'ar'
  });

  // User Profile
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'admin'
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    contractReminders: true,
    maintenanceAlerts: true,
    paymentDue: true,
    systemUpdates: false
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: '30',
    passwordChange: false
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setProfileData({
          fullName: session.user.user_metadata?.full_name || '',
          email: session.user.email || '',
          phone: session.user.user_metadata?.phone || '',
          role: 'admin'
        });
      } else {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.fullName,
          phone: profileData.phone
        }
      });

      if (error) throw error;

      toast({
        title: 'تم حفظ البيانات',
        description: 'تم تحديث الملف الشخصي بنجاح'
      });
    } catch (error: any) {
      toast({
        title: 'خطأ في الحفظ',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCompany = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'تم حفظ إعدادات الشركة',
        description: 'تم تحديث بيانات الشركة بنجاح'
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'تم حفظ إعدادات التنبيهات',
      description: 'تم تحديث تفضيلات التنبيهات بنجاح'
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: 'تم حفظ إعدادات الأمان',
      description: 'تم تحديث إعدادات الأمان بنجاح'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة
              </Button>
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">الإعدادات</h1>
                <p className="text-sm text-muted-foreground">إدارة إعدادات النظام والحساب</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              بيانات الشركة
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              التنبيهات
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              الأمان
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
                <CardDescription>
                  إدارة بياناتك الشخصية ومعلومات الحساب
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      placeholder="الاسم الكامل"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      لا يمكن تغيير البريد الإلكتروني حالياً
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+965 xxxx xxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">الدور</Label>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Badge variant="default" className="bg-primary">
                        مدير النظام
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Settings */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>بيانات الشركة</CardTitle>
                <CardDescription>
                  إعدادات الشركة والمعلومات الأساسية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">اسم الشركة</Label>
                    <Input
                      id="companyName"
                      value={companySettings.name}
                      onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">البريد الإلكتروني</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">رقم الهاتف</Label>
                    <Input
                      id="companyPhone"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                    <Input
                      id="taxNumber"
                      value={companySettings.taxNumber}
                      onChange={(e) => setCompanySettings({ ...companySettings, taxNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة</Label>
                    <Select
                      value={companySettings.currency}
                      onValueChange={(value) => setCompanySettings({ ...companySettings, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
                        <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                        <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                        <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">اللغة</Label>
                    <Select
                      value={companySettings.language}
                      onValueChange={(value) => setCompanySettings({ ...companySettings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input
                    id="address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                    placeholder="العنوان الكامل للشركة"
                  />
                </div>
                <Button onClick={handleSaveCompany} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ الإعدادات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات التنبيهات</CardTitle>
                <CardDescription>
                  إدارة التنبيهات والإشعارات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">إشعارات البريد الإلكتروني</p>
                      <p className="text-sm text-muted-foreground">
                        استقبال الإشعارات عبر البريد الإلكتروني
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تذكير العقود</p>
                      <p className="text-sm text-muted-foreground">
                        تنبيهات انتهاء وتجديد العقود
                      </p>
                    </div>
                    <Switch
                      checked={notifications.contractReminders}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, contractReminders: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تنبيهات الصيانة</p>
                      <p className="text-sm text-muted-foreground">
                        تنبيهات مواعيد الصيانة الدورية
                      </p>
                    </div>
                    <Switch
                      checked={notifications.maintenanceAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, maintenanceAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">استحقاق المدفوعات</p>
                      <p className="text-sm text-muted-foreground">
                        تنبيهات المدفوعات المستحقة
                      </p>
                    </div>
                    <Switch
                      checked={notifications.paymentDue}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, paymentDue: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تحديثات النظام</p>
                      <p className="text-sm text-muted-foreground">
                        إشعارات التحديثات والميزات الجديدة
                      </p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, systemUpdates: checked })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleSaveNotifications}>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ إعدادات التنبيهات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
                <CardDescription>
                  إدارة أمان الحساب والصلاحيات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">المصادقة الثنائية</p>
                      <p className="text-sm text-muted-foreground">
                        طبقة حماية إضافية للحساب
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">إشعارات تسجيل الدخول</p>
                      <p className="text-sm text-muted-foreground">
                        تنبيه عند تسجيل الدخول من جهاز جديد
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.loginNotifications}
                      onCheckedChange={(checked) => 
                        setSecuritySettings({ ...securitySettings, loginNotifications: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">مهلة انتهاء الجلسة (بالدقائق)</Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) => 
                        setSecuritySettings({ ...securitySettings, sessionTimeout: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 دقيقة</SelectItem>
                        <SelectItem value="30">30 دقيقة</SelectItem>
                        <SelectItem value="60">ساعة واحدة</SelectItem>
                        <SelectItem value="120">ساعتان</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <h4 className="font-medium mb-4">إجراءات الأمان</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      تغيير كلمة المرور
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="w-4 h-4 mr-2" />
                      إنهاء جميع الجلسات النشطة
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handleSaveSecurity}>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ إعدادات الأمان
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;