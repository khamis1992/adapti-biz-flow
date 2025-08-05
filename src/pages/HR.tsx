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
import { useToast } from "@/hooks/use-toast";
import { Users, UserPlus, LogOut, User, Home } from "lucide-react";

interface Employee {
  id: string;
  employee_number: string;
  full_name: string;
  department: string;
  position: string;
  basic_salary: number;
  allowances: number;
  hire_date: string;
  is_active: boolean;
}

const HR = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    employee_number: "",
    full_name: "",
    department: "",
    position: "",
    basic_salary: "",
    allowances: "",
    hire_date: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/signin");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchEmployees();
    }
  }, [user]);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("created_at", { ascending: false });

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

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Get user's tenant_id
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      const { error } = await supabase
        .from("employees")
        .insert([
          {
            tenant_id: userData.tenant_id,
            employee_number: newEmployee.employee_number,
            full_name: newEmployee.full_name,
            department: newEmployee.department,
            position: newEmployee.position,
            basic_salary: parseFloat(newEmployee.basic_salary),
            allowances: parseFloat(newEmployee.allowances || "0"),
            hire_date: newEmployee.hire_date,
          }
        ]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم إضافة الموظف بنجاح",
      });

      setNewEmployee({
        employee_number: "",
        full_name: "",
        department: "",
        position: "",
        basic_salary: "",
        allowances: "",
        hire_date: ""
      });
      setIsAddingEmployee(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة الموظف",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
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
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">إدارة الموارد البشرية</h1>
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
          <p className="text-muted-foreground">إدارة شاملة لبيانات الموظفين والموارد البشرية</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الموظفين النشطين</CardTitle>
              <User className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {employees.filter(emp => emp.is_active).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الرواتب</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {employees.reduce((sum, emp) => sum + (emp.basic_salary || 0) + (emp.allowances || 0), 0).toLocaleString()} د.ك
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employees Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>قائمة الموظفين</CardTitle>
                <CardDescription>إدارة بيانات الموظفين والمعلومات الأساسية</CardDescription>
              </div>
              <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 ml-2" />
                    إضافة موظف جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>إضافة موظف جديد</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddEmployee} className="space-y-4">
                    <div>
                      <Label htmlFor="employee_number">رقم الموظف</Label>
                      <Input
                        id="employee_number"
                        value={newEmployee.employee_number}
                        onChange={(e) => setNewEmployee({...newEmployee, employee_number: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="full_name">الاسم الكامل</Label>
                      <Input
                        id="full_name"
                        value={newEmployee.full_name}
                        onChange={(e) => setNewEmployee({...newEmployee, full_name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">القسم</Label>
                      <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operations">العمليات</SelectItem>
                          <SelectItem value="finance">المالية</SelectItem>
                          <SelectItem value="hr">الموارد البشرية</SelectItem>
                          <SelectItem value="marketing">التسويق</SelectItem>
                          <SelectItem value="maintenance">الصيانة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="position">المنصب</Label>
                      <Input
                        id="position"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="basic_salary">الراتب الأساسي</Label>
                      <Input
                        id="basic_salary"
                        type="number"
                        step="0.01"
                        value={newEmployee.basic_salary}
                        onChange={(e) => setNewEmployee({...newEmployee, basic_salary: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="allowances">البدلات</Label>
                      <Input
                        id="allowances"
                        type="number"
                        step="0.01"
                        value={newEmployee.allowances}
                        onChange={(e) => setNewEmployee({...newEmployee, allowances: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hire_date">تاريخ التوظيف</Label>
                      <Input
                        id="hire_date"
                        type="date"
                        value={newEmployee.hire_date}
                        onChange={(e) => setNewEmployee({...newEmployee, hire_date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <Button type="button" variant="outline" onClick={() => setIsAddingEmployee(false)}>
                        إلغاء
                      </Button>
                      <Button type="submit">إضافة</Button>
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
                  <TableHead>رقم الموظف</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>القسم</TableHead>
                  <TableHead>المنصب</TableHead>
                  <TableHead>الراتب الأساسي</TableHead>
                  <TableHead>البدلات</TableHead>
                  <TableHead>تاريخ التوظيف</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.employee_number}</TableCell>
                    <TableCell className="font-medium">{employee.full_name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.basic_salary?.toLocaleString()} د.ك</TableCell>
                    <TableCell>{employee.allowances?.toLocaleString()} د.ك</TableCell>
                    <TableCell>{new Date(employee.hire_date).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>
                      <Badge variant={employee.is_active ? "default" : "secondary"}>
                        {employee.is_active ? "نشط" : "غير نشط"}
                      </Badge>
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

export default HR;