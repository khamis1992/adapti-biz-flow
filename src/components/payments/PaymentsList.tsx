import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search, Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Payment {
  id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
  created_at: string;
  invoice_id: string;
}

export const PaymentsList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { tenant } = useTenant();
  const { toast } = useToast();

  const fetchPayments = async () => {
    if (!tenant?.id) return;

    try {
      setLoading(true);
      // بيانات تجريبية مؤقتاً
      const mockPayments: Payment[] = [
        {
          id: '1',
          amount: 350.500,
          payment_date: '2024-01-15',
          payment_method: 'cash',
          reference_number: 'PAY-001',
          notes: 'دفعة نقدية',
          created_at: '2024-01-15T10:00:00Z',
          invoice_id: 'INV-001',
        },
        {
          id: '2',
          amount: 1200.000,
          payment_date: '2024-01-20',
          payment_method: 'bank_transfer',
          reference_number: 'PAY-002',
          notes: 'تحويل بنكي',
          created_at: '2024-01-20T14:30:00Z',
          invoice_id: 'INV-002',
        },
      ];

      let filteredData = mockPayments;
      
      if (searchTerm) {
        filteredData = filteredData.filter(payment =>
          payment.reference_number?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setPayments(filteredData);
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في تحميل المدفوعات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [tenant?.id, startDate, endDate, methodFilter]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchPayments();
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const getPaymentMethodBadge = (method: string) => {
    const methodColors = {
      cash: "bg-green-100 text-green-800",
      card: "bg-blue-100 text-blue-800",
      bank_transfer: "bg-purple-100 text-purple-800",
      check: "bg-orange-100 text-orange-800",
    };
    
    const methodNames = {
      cash: "نقدي",
      card: "بطاقة",
      bank_transfer: "تحويل بنكي",
      check: "شيك",
    };

    return (
      <Badge className={methodColors[method as keyof typeof methodColors] || "bg-gray-100 text-gray-800"}>
        {methodNames[method as keyof typeof methodNames] || method}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(amount);
  };

  const exportPayments = () => {
    // إعداد تصدير المدفوعات لـ CSV
    const headers = ['التاريخ', 'رقم الفاتورة', 'العميل', 'المبلغ', 'طريقة الدفع', 'المرجع', 'ملاحظات'];
    const csvContent = [
      headers.join(','),
      ...payments.map(payment => [
        payment.payment_date,
        payment.invoice_id,
        'عميل',
        payment.amount,
        payment.payment_method,
        payment.reference_number || '',
        payment.notes || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payments_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* ملخص المدفوعات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>إجمالي المدفوعات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(totalAmount)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>عدد المدفوعات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>متوسط الدفعة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.length > 0 ? formatCurrency(totalAmount / payments.length) : formatCurrency(0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات البحث والفلترة */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في المدفوعات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger>
            <SelectValue placeholder="طريقة الدفع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">جميع الطرق</SelectItem>
            <SelectItem value="cash">نقدي</SelectItem>
            <SelectItem value="card">بطاقة</SelectItem>
            <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
            <SelectItem value="check">شيك</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
              <CalendarIcon className="ml-2 h-4 w-4" />
              {startDate ? format(startDate, "yyyy/MM/dd", { locale: ar }) : "من تاريخ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
              <CalendarIcon className="ml-2 h-4 w-4" />
              {endDate ? format(endDate, "yyyy/MM/dd", { locale: ar }) : "إلى تاريخ"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Button onClick={exportPayments} variant="outline">
          <Download className="ml-2 h-4 w-4" />
          تصدير
        </Button>
      </div>

      {/* جدول المدفوعات */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>التاريخ</TableHead>
              <TableHead>رقم الفاتورة</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>طريقة الدفع</TableHead>
              <TableHead>المرجع</TableHead>
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
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  لا توجد مدفوعات
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {format(new Date(payment.payment_date), "yyyy/MM/dd", { locale: ar })}
                  </TableCell>
                  <TableCell className="font-medium">
                    {payment.invoice_id}
                  </TableCell>
                  <TableCell>عميل</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    {getPaymentMethodBadge(payment.payment_method)}
                  </TableCell>
                  <TableCell>{payment.reference_number || "-"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};