import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Car, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';

interface VehicleFormData {
  plate_number: string;
  make: string;
  model: string;
  year: number;
  color: string;
  daily_rate: number;
  weekly_rate: number;
  monthly_rate: number;
  yearly_rate: number;
  max_km_per_day: number;
  extra_km_rate: number;
  engine_number?: string;
  chassis_number?: string;
  purchase_date?: string;
  purchase_cost?: number;
  current_location?: string;
}

export default function AddVehicle() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenant } = useTenant();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<VehicleFormData>();

  const onSubmit = async (data: VehicleFormData) => {
    if (!tenant) {
      toast({
        title: 'خطأ',
        description: 'لم يتم العثور على بيانات المؤسسة',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('vehicles')
        .insert({
          tenant_id: tenant.id,
          plate_number: data.plate_number,
          make: data.make,
          model: data.model,
          year: data.year,
          color: data.color,
          daily_rate: data.daily_rate,
          weekly_rate: data.weekly_rate || 0,
          monthly_rate: data.monthly_rate || 0,
          yearly_rate: data.yearly_rate || 0,
          max_km_per_day: data.max_km_per_day || 200,
          extra_km_rate: data.extra_km_rate || 0.5,
          engine_number: data.engine_number,
          chassis_number: data.chassis_number,
          purchase_date: data.purchase_date,
          purchase_cost: data.purchase_cost || 0,
          current_location: data.current_location || 'المكتب الرئيسي',
          status: 'available'
        });

      if (error) throw error;

      toast({
        title: 'تم إضافة المركبة بنجاح',
        description: 'تم إضافة المركبة الجديدة إلى الأسطول',
      });

      navigate('/fleet');
    } catch (error: any) {
      toast({
        title: 'خطأ في إضافة المركبة',
        description: error.message || 'حدث خطأ غير متوقع',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/fleet')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة
            </Button>
            <Car className="w-8 h-8 text-primary mr-3" />
            <div>
              <h1 className="text-xl font-bold">إضافة مركبة جديدة</h1>
              <p className="text-sm text-muted-foreground">إضافة مركبة جديدة إلى الأسطول</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>بيانات المركبة</CardTitle>
              <CardDescription>
                أدخل جميع المعلومات المطلوبة للمركبة الجديدة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plate_number">رقم اللوحة *</Label>
                  <Input
                    id="plate_number"
                    {...register('plate_number', { required: 'رقم اللوحة مطلوب' })}
                    placeholder="مثال: ABC-123"
                  />
                  {errors.plate_number && (
                    <p className="text-sm text-destructive">{errors.plate_number.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="make">الصانع *</Label>
                  <Input
                    id="make"
                    {...register('make', { required: 'اسم الصانع مطلوب' })}
                    placeholder="مثال: تويوتا"
                  />
                  {errors.make && (
                    <p className="text-sm text-destructive">{errors.make.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">الموديل *</Label>
                  <Input
                    id="model"
                    {...register('model', { required: 'الموديل مطلوب' })}
                    placeholder="مثال: كامري"
                  />
                  {errors.model && (
                    <p className="text-sm text-destructive">{errors.model.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">سنة الصنع *</Label>
                  <Input
                    id="year"
                    type="number"
                    {...register('year', { 
                      required: 'سنة الصنع مطلوبة',
                      valueAsNumber: true,
                      min: { value: 1990, message: 'سنة الصنع يجب أن تكون أكبر من 1990' },
                      max: { value: new Date().getFullYear() + 1, message: 'سنة الصنع غير صحيحة' }
                    })}
                    placeholder="2023"
                  />
                  {errors.year && (
                    <p className="text-sm text-destructive">{errors.year.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">اللون *</Label>
                  <Input
                    id="color"
                    {...register('color', { required: 'اللون مطلوب' })}
                    placeholder="مثال: أبيض"
                  />
                  {errors.color && (
                    <p className="text-sm text-destructive">{errors.color.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current_location">الموقع الحالي</Label>
                  <Input
                    id="current_location"
                    {...register('current_location')}
                    placeholder="المكتب الرئيسي"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">أسعار الإيجار</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily_rate">الأجرة اليومية (د.ك) *</Label>
                    <Input
                      id="daily_rate"
                      type="number"
                      step="0.001"
                      {...register('daily_rate', { 
                        required: 'الأجرة اليومية مطلوبة',
                        valueAsNumber: true,
                        min: { value: 0, message: 'السعر يجب أن يكون أكبر من صفر' }
                      })}
                      placeholder="25.000"
                    />
                    {errors.daily_rate && (
                      <p className="text-sm text-destructive">{errors.daily_rate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weekly_rate">الأجرة الأسبوعية (د.ك)</Label>
                    <Input
                      id="weekly_rate"
                      type="number"
                      step="0.001"
                      {...register('weekly_rate', { valueAsNumber: true })}
                      placeholder="150.000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly_rate">الأجرة الشهرية (د.ك)</Label>
                    <Input
                      id="monthly_rate"
                      type="number"
                      step="0.001"
                      {...register('monthly_rate', { valueAsNumber: true })}
                      placeholder="600.000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearly_rate">الأجرة السنوية (د.ك)</Label>
                    <Input
                      id="yearly_rate"
                      type="number"
                      step="0.001"
                      {...register('yearly_rate', { valueAsNumber: true })}
                      placeholder="6000.000"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Settings */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">إعدادات إضافية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max_km_per_day">الحد الأقصى للمسافة اليومية (كم)</Label>
                    <Input
                      id="max_km_per_day"
                      type="number"
                      {...register('max_km_per_day', { valueAsNumber: true })}
                      placeholder="200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extra_km_rate">تعرفة الكيلومتر الإضافي (د.ك)</Label>
                    <Input
                      id="extra_km_rate"
                      type="number"
                      step="0.001"
                      {...register('extra_km_rate', { valueAsNumber: true })}
                      placeholder="0.500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="engine_number">رقم المحرك</Label>
                    <Input
                      id="engine_number"
                      {...register('engine_number')}
                      placeholder="ENG123456"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chassis_number">رقم الشاسي</Label>
                    <Input
                      id="chassis_number"
                      {...register('chassis_number')}
                      placeholder="CHS789012"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchase_date">تاريخ الشراء</Label>
                    <Input
                      id="purchase_date"
                      type="date"
                      {...register('purchase_date')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchase_cost">تكلفة الشراء (د.ك)</Label>
                    <Input
                      id="purchase_cost"
                      type="number"
                      step="0.001"
                      {...register('purchase_cost', { valueAsNumber: true })}
                      placeholder="15000.000"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 space-x-reverse pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/fleet')}
                >
                  إلغاء
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      إضافة المركبة
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}