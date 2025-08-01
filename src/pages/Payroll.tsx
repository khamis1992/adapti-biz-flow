import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Plus, LogOut, Home, Check, DollarSign, Users, FileText, TrendingUp } from "lucide-react";

interface PayrollRecord {
  id: string;
  employee_id: string;
  month: number;
  year: number;
  basic_salary: number;
  allowances: number;
  overtime_hours: number;
  overtime_rate: number;
  overtime_amount: number;
  bonus: number;
  deductions: number;
  gross_salary: number;
  net_salary: number;
  status: string;
  payment_date: string;
  notes: string;
  created_at: string;
  employees?: {
    full_name: string;
    employee_number: string;
    basic_salary: number;
    allowances: number;
  };
}

interface Employee {
  id: string;
  employee_number: string;
  full_name: string;
  basic_salary: number;
  allowances: number;
}

const Payroll = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isGeneratingPayroll, setIsGeneratingPayroll] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [newPayroll, setNewPayroll] = useState({
    employee_id: "",
    overtime_hours: "",
    overtime_rate: "",
    bonus: "",
    deductions: "",
    notes: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const months = [
    { value: 1, label: "يناير" },
    { value: 2, label: "فبراير" },
    { value: 3, label: "مارس" },
    { value: 4, label: "أبريل" },
    { value: 5, label: "مايو" },
    { value: 6, label: "يونيو" },
    { value: 7, label: "يوليو" },
    { value: 8, label: "أغسطس" },
    { value: 9, label: "سبتمبر" },
    { value: 10, label: "أكتوبر" },
    { value: 11, label: "نوفمبر" },
    { value: 12, label: "ديسمبر" }
  ];

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchPayrollRecords();
      fetchEmployees();
    }
  }, [user, selectedMonth, selectedYear]);

  const fetchPayrollRecords = async () => {
    try {
      const { data, error } = await supabase
        .from("payroll" as any)
        .select(`
          *,
          employees (
            full_name,
            employee_number,
            basic_salary,
            allowances
          )
        `)
        .eq("month", selectedMonth)
        .eq("year", selectedYear)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayrollRecords(data as any || []);
    } catch (error) {
      console.error("Error fetching payroll records:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الرواتب",
        variant: "destructive",
      });
    }
  };

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, employee_number, full_name, basic_salary, allowances")
        .eq("is_active", true);

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الموظفين",
        variant: "destructive",
      });
    }
  };

  const calculatePayroll = (employee: Employee, overtimeHours: number, overtimeRate: number, bonus: number, deductions: number) => {
    const basicSalary = employee.basic_salary || 0;
    const allowances = employee.allowances || 0;
    const overtimeAmount = overtimeHours * overtimeRate;
    const grossSalary = basicSalary + allowances + overtimeAmount + bonus;
    const netSalary = grossSalary - deductions;

    return {
      basicSalary,
      allowances,
      overtimeAmount,
      grossSalary,
      netSalary
    };
  };

  const handleGeneratePayroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPayroll.employee_id) return;

    try {
      // Get user's tenant_id
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      const employee = employees.find(emp => emp.id === newPayroll.employee_id);
      if (!employee) throw new Error("Employee not found");

      const overtimeHours = parseFloat(newPayroll.overtime_hours || "0");
      const overtimeRate = parseFloat(newPayroll.overtime_rate || "0");
      const bonus = parseFloat(newPayroll.bonus || "0");
      const deductions = parseFloat(newPayroll.deductions || "0");

      const calculation = calculatePayroll(employee, overtimeHours, overtimeRate, bonus, deductions);

      // Check if payroll already exists for this employee, month, and year
      const { data: existingPayroll } = await supabase
        .from("payroll" as any)
        .select("id")
        .eq("tenant_id", userData.tenant_id)
        .eq("employee_id", newPayroll.employee_id)
        .eq("month", selectedMonth)
        .eq("year", selectedYear)
        .single();

      if (existingPayroll) {
        toast({
          title: "خطأ",
          description: "راتب هذا الموظف محسوب مسبقاً لهذا الشهر",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("payroll" as any)
        .insert([
          {
            tenant_id: userData.tenant_id,
            employee_id: newPayroll.employee_id,
            month: selectedMonth,
            year: selectedYear,
            basic_salary: calculation.basicSalary,
            allowances: calculation.allowances,
            overtime_hours: overtimeHours,
            overtime_rate: overtimeRate,
            overtime_amount: calculation.overtimeAmount,
            bonus: bonus,
            deductions: deductions,
            gross_salary: calculation.grossSalary,
            net_salary: calculation.netSalary,
            status: "draft",
            notes: newPayroll.notes,
            created_by: user.id
          }
        ]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم حساب الراتب بنجاح",
      });

      setNewPayroll({
        employee_id: "",
        overtime_hours: "",
        overtime_rate: "",
        bonus: "",
        deductions: "",
        notes: ""
      });
      setIsGeneratingPayroll(false);
      fetchPayrollRecords();
    } catch (error) {
      console.error("Error generating payroll:", error);
      toast({
        title: "خطأ",
        description: "فشل في حساب الراتب",
        variant: "destructive",
      });
    }
  };

  const handleApprovePayroll = async (payrollId: string) => {
    try {
      const { error } = await supabase
        .from("payroll" as any)
        .update({ status: "approved" })
        .eq("id", payrollId);

      if (error) throw error;

      toast({
        title: "تم الاعتماد",
        description: "تم اعتماد الراتب بنجاح",
      });

      fetchPayrollRecords();
    } catch (error) {
      console.error("Error approving payroll:", error);
      toast({
        title: "خطأ",
        description: "فشل في اعتماد الراتب",
        variant: "destructive",
      });
    }
  };

  const handlePayPayroll = async (payrollId: string) => {
    try {
      const { error } = await supabase
        .from("payroll" as any)
        .update({ 
          status: "paid",
          payment_date: new Date().toISOString().split('T')[0]
        })
        .eq("id", payrollId);

      if (error) throw error;

      toast({
        title: "تم الدفع",
        description: "تم تسجيل دفع الراتب بنجاح",
      });

      fetchPayrollRecords();
    } catch (error) {
      console.error("Error paying payroll:", error);
      toast({
        title: "خطأ",
        description: "فشل في تسجيل دفع الراتب",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">مسودة</Badge>;
      case "approved":
        return <Badge variant="default">معتمد</Badge>;
      case "paid":
        return <Badge variant="destructive">مدفوع</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "text-yellow-600";
      case "approved":
        return "text-blue-600";
      case "paid":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <Calculator className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-lg text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted" dir="rtl">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Calculator className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">إدارة الرواتب</h1>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                <Home className="h-4 w-4 ml-2" />
                الرئيسية
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            مرحباً، {user?.user_metadata?.full_name || user?.email}
          </h2>
          <p className="text-muted-foreground">إدارة وحساب رواتب الموظفين الشهرية</p>
        </div>

        {/* Month/Year Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>اختيار الشهر والسنة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="month">الشهر</Label>
                <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value.toString()}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="year">السنة</Label>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2024, 2025, 2026].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الرواتب</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {payrollRecords.reduce((sum, record) => sum + (record.net_salary || 0), 0).toLocaleString()} د.ك
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الموظفين المحسوبين</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {payrollRecords.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرواتب المعتمدة</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {payrollRecords.filter(record => record.status === 'approved' || record.status === 'paid').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرواتب المدفوعة</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {payrollRecords.filter(record => record.status === 'paid').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>رواتب {months.find(m => m.value === selectedMonth)?.label} {selectedYear}</CardTitle>
                <CardDescription>إدارة وحساب رواتب الموظفين</CardDescription>
              </div>
              <Dialog open={isGeneratingPayroll} onOpenChange={setIsGeneratingPayroll}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    حساب راتب جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>حساب راتب جديد</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleGeneratePayroll} className="space-y-4">
                    <div>
                      <Label htmlFor="employee_id">الموظف</Label>
                      <Select value={newPayroll.employee_id} onValueChange={(value) => setNewPayroll({...newPayroll, employee_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.full_name} - {employee.employee_number}
                              <div className="text-sm text-muted-foreground">
                                الراتب: {employee.basic_salary?.toLocaleString()} د.ك
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="overtime_hours">ساعات العمل الإضافية</Label>
                      <Input
                        id="overtime_hours"
                        type="number"
                        step="0.1"
                        value={newPayroll.overtime_hours}
                        onChange={(e) => setNewPayroll({...newPayroll, overtime_hours: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="overtime_rate">سعر الساعة الإضافية</Label>
                      <Input
                        id="overtime_rate"
                        type="number"
                        step="0.01"
                        value={newPayroll.overtime_rate}
                        onChange={(e) => setNewPayroll({...newPayroll, overtime_rate: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bonus">المكافآت</Label>
                      <Input
                        id="bonus"
                        type="number"
                        step="0.01"
                        value={newPayroll.bonus}
                        onChange={(e) => setNewPayroll({...newPayroll, bonus: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deductions">الخصومات</Label>
                      <Input
                        id="deductions"
                        type="number"
                        step="0.01"
                        value={newPayroll.deductions}
                        onChange={(e) => setNewPayroll({...newPayroll, deductions: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">ملاحظات</Label>
                      <Textarea
                        id="notes"
                        value={newPayroll.notes}
                        onChange={(e) => setNewPayroll({...newPayroll, notes: e.target.value})}
                        placeholder="ملاحظات إضافية"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <Button type="button" variant="outline" onClick={() => setIsGeneratingPayroll(false)}>
                        إلغاء
                      </Button>
                      <Button type="submit">حساب الراتب</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الموظف</TableHead>
                  <TableHead>الراتب الأساسي</TableHead>
                  <TableHead>البدلات</TableHead>
                  <TableHead>العمل الإضافي</TableHead>
                  <TableHead>المكافآت</TableHead>
                  <TableHead>الخصومات</TableHead>
                  <TableHead>الراتب الإجمالي</TableHead>
                  <TableHead>الراتب الصافي</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.employees?.full_name}
                      <div className="text-sm text-muted-foreground">
                        {record.employees?.employee_number}
                      </div>
                    </TableCell>
                    <TableCell>{record.basic_salary?.toLocaleString()} د.ك</TableCell>
                    <TableCell>{record.allowances?.toLocaleString()} د.ك</TableCell>
                    <TableCell>
                      {record.overtime_hours} ساعة
                      <div className="text-sm text-muted-foreground">
                        {record.overtime_amount?.toLocaleString()} د.ك
                      </div>
                    </TableCell>
                    <TableCell>{record.bonus?.toLocaleString()} د.ك</TableCell>
                    <TableCell>{record.deductions?.toLocaleString()} د.ك</TableCell>
                    <TableCell className="font-medium">{record.gross_salary?.toLocaleString()} د.ك</TableCell>
                    <TableCell className="font-bold text-green-600">{record.net_salary?.toLocaleString()} د.ك</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 space-x-reverse">
                        {record.status === 'draft' && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleApprovePayroll(record.id)}
                          >
                            اعتماد
                          </Button>
                        )}
                        {record.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handlePayPayroll(record.id)}
                          >
                            دفع
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payroll;