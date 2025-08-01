import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, User, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";

const AddCustomer = () => {
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    civil_id: "",
    customer_type: "individual",
    address: "",
    city: "",
    notes: "",
    is_blacklisted: false,
    blacklist_reason: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!tenant?.id) {
        throw new Error('لا يمكن العثور على معرف المؤسسة');
      }

      const { error } = await supabase
        .from('customers')
        .insert([{
          ...formData,
          customer_type: formData.customer_type as 'individual' | 'company',
          tenant_id: tenant.id
        }]);

      if (error) throw error;

      toast({
        title: "تم إضافة العميل بنجاح",
        description: "تم حفظ بيانات العميل الجديد"
      });

      navigate('/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: "خطأ في إضافة العميل",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate('/customers')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">إضافة عميل جديد</h1>
          <p className="text-muted-foreground">قم بإدخال بيانات العميل الجديد</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              البيانات الأساسية
            </CardTitle>
            <CardDescription>معلومات العميل الشخصية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">الاسم الكامل *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_type">نوع العميل</Label>
                <Select
                  value={formData.customer_type}
                  onValueChange={(value) => handleInputChange('customer_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        فرد
                      </div>
                    </SelectItem>
                    <SelectItem value="company">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        شركة
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="مثال: +965 1234 5678"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="civil_id">الرقم المدني</Label>
              <Input
                id="civil_id"
                value={formData.civil_id}
                onChange={(e) => handleInputChange('civil_id', e.target.value)}
                placeholder="أدخل الرقم المدني"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معلومات العنوان</CardTitle>
            <CardDescription>تفاصيل العنوان والموقع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="أدخل العنوان التفصيلي"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="أدخل اسم المدينة"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملاحظات إضافية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="أي ملاحظات إضافية عن العميل"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label>القائمة السوداء</Label>
                <p className="text-sm text-muted-foreground">منع العميل من إجراء عمليات جديدة</p>
              </div>
              <Switch
                checked={formData.is_blacklisted}
                onCheckedChange={(checked) => handleInputChange('is_blacklisted', checked)}
              />
            </div>

            {formData.is_blacklisted && (
              <div className="space-y-2">
                <Label htmlFor="blacklist_reason">سبب الإدراج في القائمة السوداء</Label>
                <Textarea
                  id="blacklist_reason"
                  value={formData.blacklist_reason}
                  onChange={(e) => handleInputChange('blacklist_reason', e.target.value)}
                  placeholder="أدخل سبب الإدراج في القائمة السوداء"
                  rows={2}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate('/customers')}>
            إلغاء
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "جاري الحفظ..." : "حفظ العميل"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;