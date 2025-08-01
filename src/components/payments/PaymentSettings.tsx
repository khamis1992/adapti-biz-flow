import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Save, Settings, CreditCard, Bell, FileText } from "lucide-react";

export const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    defaultPaymentMethod: 'cash',
    autoCreateJournalEntries: true,
    requirePaymentReference: false,
    enablePaymentNotifications: true,
    defaultPaymentTerms: 'net_30',
    lateFeePercentage: 2,
    gracePeriodDays: 7,
    paymentReminderDays: [7, 3, 1],
    defaultAccountId: '',
    paymentNotes: '',
    enableRecurringPayments: true,
    enablePartialPayments: true,
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const { tenant } = useTenant();
  const { toast } = useToast();

  const loadSettings = async () => {
    if (!tenant?.id) return;

    try {
      setLoading(true);
      
      // جلب إعدادات الدفع من tenant settings
      const { data: tenantData, error } = await supabase
        .from('tenants')
        .select('settings')
        .eq('id', tenant.id)
        .single();

      if (error) throw error;

      const tenantSettings = typeof tenantData.settings === 'object' && tenantData.settings !== null ? tenantData.settings as any : {};
      const paymentSettings = tenantSettings.payment || {};
      setSettings(prev => ({ ...prev, ...paymentSettings }));

      // جلب الحسابات المحاسبية
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('id, account_name_ar, account_code')
        .eq('tenant_id', tenant.id)
        .eq('account_type', 'assets')
        .eq('allow_posting', true)
        .order('account_code');

      if (accountsError) throw accountsError;
      setAccounts(accountsData || []);

    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في تحميل الإعدادات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!tenant?.id) return;

    try {
      setSaving(true);

      // تحديث إعدادات المؤسسة
      const currentSettings = typeof tenant.settings === 'object' && tenant.settings !== null ? tenant.settings as any : {};
      const { error } = await supabase
        .from('tenants')
        .update({
          settings: {
            ...currentSettings,
            payment: settings
          }
        })
        .eq('id', tenant.id);

      if (error) throw error;

      toast({
        title: "تم الحفظ",
        description: "تم حفظ إعدادات المدفوعات بنجاح",
      });

    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, [tenant?.id]);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* إعدادات الدفع العامة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            إعدادات الدفع العامة
          </CardTitle>
          <CardDescription>
            الإعدادات الأساسية لنظام إدارة المدفوعات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultPaymentMethod">طريقة الدفع الافتراضية</Label>
              <Select 
                value={settings.defaultPaymentMethod} 
                onValueChange={(value) => updateSetting('defaultPaymentMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="card">بطاقة</SelectItem>
                  <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                  <SelectItem value="check">شيك</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultPaymentTerms">شروط الدفع الافتراضية</Label>
              <Select 
                value={settings.defaultPaymentTerms} 
                onValueChange={(value) => updateSetting('defaultPaymentTerms', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="due_on_receipt">مستحق عند الاستلام</SelectItem>
                  <SelectItem value="net_15">15 يوم</SelectItem>
                  <SelectItem value="net_30">30 يوم</SelectItem>
                  <SelectItem value="net_45">45 يوم</SelectItem>
                  <SelectItem value="net_60">60 يوم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultAccount">الحساب الافتراضي</Label>
              <Select 
                value={settings.defaultAccountId} 
                onValueChange={(value) => updateSetting('defaultAccountId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحساب" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.account_code} - {account.account_name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gracePeriodDays">فترة السماح (أيام)</Label>
              <Input
                id="gracePeriodDays"
                type="number"
                value={settings.gracePeriodDays}
                onChange={(e) => updateSetting('gracePeriodDays', parseInt(e.target.value))}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>إنشاء قيود محاسبية تلقائياً</Label>
                <p className="text-sm text-muted-foreground">
                  إنشاء قيود محاسبية تلقائياً عند تسجيل المدفوعات
                </p>
              </div>
              <Switch
                checked={settings.autoCreateJournalEntries}
                onCheckedChange={(checked) => updateSetting('autoCreateJournalEntries', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>إلزامية رقم المرجع</Label>
                <p className="text-sm text-muted-foreground">
                  جعل حقل رقم المرجع إلزامياً عند تسجيل المدفوعات
                </p>
              </div>
              <Switch
                checked={settings.requirePaymentReference}
                onCheckedChange={(checked) => updateSetting('requirePaymentReference', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>تفعيل المدفوعات الجزئية</Label>
                <p className="text-sm text-muted-foreground">
                  السماح بالدفعات الجزئية للفواتير
                </p>
              </div>
              <Switch
                checked={settings.enablePartialPayments}
                onCheckedChange={(checked) => updateSetting('enablePartialPayments', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>تفعيل المدفوعات المتكررة</Label>
                <p className="text-sm text-muted-foreground">
                  تفعيل نظام المدفوعات المتكررة والاشتراكات
                </p>
              </div>
              <Switch
                checked={settings.enableRecurringPayments}
                onCheckedChange={(checked) => updateSetting('enableRecurringPayments', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إعدادات التنبيهات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            إعدادات التنبيهات
          </CardTitle>
          <CardDescription>
            إدارة تنبيهات المدفوعات والمتأخرات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>تفعيل تنبيهات المدفوعات</Label>
              <p className="text-sm text-muted-foreground">
                إرسال تنبيهات للمدفوعات المستحقة والمتأخرة
              </p>
            </div>
            <Switch
              checked={settings.enablePaymentNotifications}
              onCheckedChange={(checked) => updateSetting('enablePaymentNotifications', checked)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lateFeePercentage">نسبة الغرامة المتأخرة (%)</Label>
              <Input
                id="lateFeePercentage"
                type="number"
                value={settings.lateFeePercentage}
                onChange={(e) => updateSetting('lateFeePercentage', parseFloat(e.target.value))}
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminderDays">أيام التذكير (مفصولة بفاصلة)</Label>
              <Input
                id="reminderDays"
                value={settings.paymentReminderDays.join(', ')}
                onChange={(e) => {
                  const days = e.target.value.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d));
                  updateSetting('paymentReminderDays', days);
                }}
                placeholder="7, 3, 1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إعدادات النصوص */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            النصوص والملاحظات
          </CardTitle>
          <CardDescription>
            النصوص الافتراضية للمدفوعات والفواتير
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentNotes">ملاحظات الدفع الافتراضية</Label>
            <Textarea
              id="paymentNotes"
              value={settings.paymentNotes}
              onChange={(e) => updateSetting('paymentNotes', e.target.value)}
              placeholder="ملاحظات افتراضية تظهر في سجلات المدفوعات..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* أزرار الحفظ */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={loadSettings} disabled={loading || saving}>
          إعادة تحميل
        </Button>
        <Button onClick={saveSettings} disabled={loading || saving}>
          {saving ? (
            "جاري الحفظ..."
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              حفظ الإعدادات
            </>
          )}
        </Button>
      </div>
    </div>
  );
};