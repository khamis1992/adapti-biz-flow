import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, CalendarIcon, Play, Pause, Edit, Trash2, Repeat } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";

// مؤقتاً حتى ننشئ جدول المدفوعات المتكررة
interface RecurringPayment {
  id: string;
  customer_name: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  start_date: string;
  next_payment: string;
  status: 'active' | 'paused' | 'completed';
  description: string;
  payment_method: string;
  total_payments: number;
  completed_payments: number;
}

export const RecurringPayments = () => {
  const [recurringPayments, setRecurringPayments] = useState<RecurringPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const { tenant } = useTenant();
  const { toast } = useToast();

  // بيانات تجريبية
  const mockRecurringPayments: RecurringPayment[] = [
    {
      id: '1',
      customer_name: 'أحمد محمد',
      amount: 350,
      frequency: 'monthly',
      start_date: '2024-01-01',
      next_payment: '2024-02-01',
      status: 'active',
      description: 'اشتراك شهري - خدمة تأجير',
      payment_method: 'bank_transfer',
      total_payments: 12,
      completed_payments: 8,
    },
    {
      id: '2',
      customer_name: 'شركة الخليج التجارية',
      amount: 1200,
      frequency: 'quarterly',
      start_date: '2024-01-01',
      next_payment: '2024-04-01',
      status: 'active',
      description: 'دفعة ربع سنوية - عقد طويل الأجل',
      payment_method: 'check',
      total_payments: 4,
      completed_payments: 3,
    },
    {
      id: '3',
      customer_name: 'سارة أحمد',
      amount: 150,
      frequency: 'weekly',
      start_date: '2024-01-01',
      next_payment: '2024-01-29',
      status: 'paused',
      description: 'دفعة أسبوعية - سيارة صغيرة',
      payment_method: 'card',
      total_payments: 52,
      completed_payments: 25,
    },
  ];

  const [formData, setFormData] = useState({
    customer_id: '',
    amount: '',
    frequency: 'monthly',
    start_date: new Date(),
    total_payments: '',
    description: '',
    payment_method: 'cash',
  });

  const loadRecurringPayments = async () => {
    if (!tenant?.id) return;

    try {
      setLoading(true);
      // في الوقت الحالي نستخدم بيانات تجريبية
      // عندما ننشئ جدول المدفوعات المتكررة، سنجلب البيانات من قاعدة البيانات
      setRecurringPayments(mockRecurringPayments);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في تحميل المدفوعات المتكررة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    if (!tenant?.id) return;

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, full_name')
        .eq('tenant_id', tenant.id)
        .order('full_name');

      if (error) throw error;
      setCustomers(data || []);
    } catch (error: any) {
      console.error('Error loading customers:', error);
    }
  };

  useEffect(() => {
    loadRecurringPayments();
    loadCustomers();
  }, [tenant?.id]);

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      weekly: 'أسبوعي',
      monthly: 'شهري',
      quarterly: 'ربع سنوي',
      yearly: 'سنوي',
    };
    return labels[frequency as keyof typeof labels] || frequency;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'نشط', className: 'bg-green-100 text-green-800' },
      paused: { label: 'متوقف', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'مكتمل', className: 'bg-blue-100 text-blue-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      cash: 'نقدي',
      card: 'بطاقة',
      bank_transfer: 'تحويل بنكي',
      check: 'شيك',
    };
    return methods[method as keyof typeof methods] || method;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(amount);
  };

  const getProgress = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const toggleStatus = (id: string) => {
    setRecurringPayments(prev => 
      prev.map(payment => 
        payment.id === id 
          ? { ...payment, status: payment.status === 'active' ? 'paused' : 'active' }
          : payment
      )
    );
    
    toast({
      title: "تم التحديث",
      description: "تم تحديث حالة المدفوعة المتكررة",
    });
  };

  const createRecurringPayment = async () => {
    // مؤقتاً - سنحفظ في قاعدة البيانات لاحقاً
    const newPayment: RecurringPayment = {
      id: Date.now().toString(),
      customer_name: customers.find(c => c.id === formData.customer_id)?.full_name || 'عميل جديد',
      amount: parseFloat(formData.amount),
      frequency: formData.frequency as any,
      start_date: format(formData.start_date, 'yyyy-MM-dd'),
      next_payment: format(formData.start_date, 'yyyy-MM-dd'),
      status: 'active',
      description: formData.description,
      payment_method: formData.payment_method,
      total_payments: parseInt(formData.total_payments) || 0,
      completed_payments: 0,
    };

    setRecurringPayments(prev => [newPayment, ...prev]);
    setShowCreateDialog(false);
    
    // إعادة تعيين النموذج
    setFormData({
      customer_id: '',
      amount: '',
      frequency: 'monthly',
      start_date: new Date(),
      total_payments: '',
      description: '',
      payment_method: 'cash',
    });

    toast({
      title: "تم الإنشاء",
      description: "تم إنشاء المدفوعة المتكررة بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>المدفوعات النشطة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {recurringPayments.filter(p => p.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>الإيرادات الشهرية المتوقعة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(
                recurringPayments
                  .filter(p => p.status === 'active' && p.frequency === 'monthly')
                  .reduce((sum, p) => sum + p.amount, 0)
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>المدفوعات المتوقفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {recurringPayments.filter(p => p.status === 'paused').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>المدفوعات المكتملة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {recurringPayments.filter(p => p.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* زر إضافة مدفوعة متكررة جديدة */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">المدفوعات المتكررة</h3>
          <p className="text-sm text-muted-foreground">
            إدارة الاشتراكات والمدفوعات المتكررة
          </p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              مدفوعة متكررة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>إنشاء مدفوعة متكررة جديدة</DialogTitle>
              <DialogDescription>
                إعداد مدفوعة تتكرر بانتظام للعميل
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="customer">العميل</Label>
                <Select value={formData.customer_id} onValueChange={(value) => setFormData(prev => ({ ...prev, customer_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العميل" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">المبلغ</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.000"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="frequency">التكرار</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربع سنوي</SelectItem>
                      <SelectItem value="yearly">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>تاريخ البداية</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("justify-start text-left font-normal", !formData.start_date && "text-muted-foreground")}>
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {formData.start_date ? format(formData.start_date, "yyyy/MM/dd", { locale: ar }) : "اختر التاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={formData.start_date} onSelect={(date) => date && setFormData(prev => ({ ...prev, start_date: date }))} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="total_payments">عدد الدفعات</Label>
                  <Input
                    id="total_payments"
                    type="number"
                    value={formData.total_payments}
                    onChange={(e) => setFormData(prev => ({ ...prev, total_payments: e.target.value }))}
                    placeholder="12"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="payment_method">طريقة الدفع</Label>
                <Select value={formData.payment_method} onValueChange={(value) => setFormData(prev => ({ ...prev, payment_method: value }))}>
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
              
              <div className="grid gap-2">
                <Label htmlFor="description">الوصف</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="وصف المدفوعة المتكررة..."
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={createRecurringPayment}>
                <Repeat className="ml-2 h-4 w-4" />
                إنشاء
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* جدول المدفوعات المتكررة */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>التكرار</TableHead>
                <TableHead>التقدم</TableHead>
                <TableHead>الدفعة التالية</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    جاري التحميل...
                  </TableCell>
                </TableRow>
              ) : recurringPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    لا توجد مدفوعات متكررة
                  </TableCell>
                </TableRow>
              ) : (
                recurringPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.customer_name}</div>
                        <div className="text-sm text-muted-foreground">{payment.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getFrequencyLabel(payment.frequency)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {payment.completed_payments} / {payment.total_payments}
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${getProgress(payment.completed_payments, payment.total_payments)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(payment.next_payment), "yyyy/MM/dd", { locale: ar })}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStatus(payment.id)}
                        >
                          {payment.status === 'active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};