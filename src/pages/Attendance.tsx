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
import { Clock, LogOut, Home, Calendar, Timer, UserCheck } from "lucide-react";

interface AttendanceRecord {
  id: string;
  employee_id: string;
  date: string;
  check_in_time: string;
  check_out_time: string;
  total_hours: number;
  overtime_hours: number;
  status: string;
  notes: string;
  employees?: {
    full_name: string;
    employee_number: string;
  };
}

interface Employee {
  id: string;
  employee_number: string;
  full_name: string;
}

const Attendance = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    employee_id: "",
    date: new Date().toISOString().split('T')[0],
    check_in_time: "",
    check_out_time: "",
    status: "present",
    notes: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

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
      fetchAttendanceRecords();
      fetchEmployees();
    }
  }, [user]);

  const fetchAttendanceRecords = async () => {
    try {
      const { data, error } = await supabase
        .from("attendance_records")
        .select(`
          *,
          employees (
            full_name,
            employee_number
          )
        `)
        .order("date", { ascending: false })
        .order("check_in_time", { ascending: false });

      if (error) throw error;
      setAttendanceRecords(data || []);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الحضور",
        variant: "destructive",
      });
    }
  };

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, employee_number, full_name")
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

  const calculateTotalHours = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    
    const checkInTime = new Date(`2000-01-01T${checkIn}`);
    const checkOutTime = new Date(`2000-01-01T${checkOut}`);
    
    const diffMs = checkOutTime.getTime() - checkInTime.getTime();
    return Math.max(0, diffMs / (1000 * 60 * 60)); // Convert to hours
  };

  const handleAddRecord = async (e: React.FormEvent) => {
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

      const totalHours = calculateTotalHours(newRecord.check_in_time, newRecord.check_out_time);
      const overtimeHours = Math.max(0, totalHours - 8); // Assuming 8 hours standard work day

      const { error } = await supabase
        .from("attendance_records")
        .insert([
          {
            tenant_id: userData.tenant_id,
            employee_id: newRecord.employee_id,
            date: newRecord.date,
            check_in_time: newRecord.check_in_time,
            check_out_time: newRecord.check_out_time,
            total_hours: totalHours,
            overtime_hours: overtimeHours,
            status: newRecord.status,
            notes: newRecord.notes,
          }
        ]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم إضافة سجل الحضور بنجاح",
      });

      setNewRecord({
        employee_id: "",
        date: new Date().toISOString().split('T')[0],
        check_in_time: "",
        check_out_time: "",
        status: "present",
        notes: ""
      });
      setIsAddingRecord(false);
      fetchAttendanceRecords();
    } catch (error) {
      console.error("Error adding attendance record:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة سجل الحضور",
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
      case "present":
        return <Badge variant="default">حاضر</Badge>;
      case "absent":
        return <Badge variant="destructive">غائب</Badge>;
      case "late":
        return <Badge variant="secondary">متأخر</Badge>;
      case "half_day":
        return <Badge variant="outline">نصف يوم</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
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
              <Clock className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">نظام الحضور والانصراف</h1>
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
          <p className="text-muted-foreground">إدارة سجلات الحضور والانصراف للموظفين</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الحضور اليوم</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {attendanceRecords.filter(record => 
                  record.date === new Date().toISOString().split('T')[0] && 
                  record.status === 'present'
                ).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الغياب اليوم</CardTitle>
              <Timer className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {attendanceRecords.filter(record => 
                  record.date === new Date().toISOString().split('T')[0] && 
                  record.status === 'absent'
                ).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التأخير اليوم</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {attendanceRecords.filter(record => 
                  record.date === new Date().toISOString().split('T')[0] && 
                  record.status === 'late'
                ).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ساعات العمل الإضافية</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {attendanceRecords
                  .filter(record => record.date === new Date().toISOString().split('T')[0])
                  .reduce((sum, record) => sum + (record.overtime_hours || 0), 0)
                  .toFixed(1)
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Records Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>سجلات الحضور والانصراف</CardTitle>
                <CardDescription>متابعة حضور الموظفين وساعات العمل</CardDescription>
              </div>
              <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
                <DialogTrigger asChild>
                  <Button>
                    <Clock className="h-4 w-4 ml-2" />
                    إضافة سجل حضور
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>إضافة سجل حضور جديد</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddRecord} className="space-y-4">
                    <div>
                      <Label htmlFor="employee_id">الموظف</Label>
                      <Select value={newRecord.employee_id} onValueChange={(value) => setNewRecord({...newRecord, employee_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.full_name} - {employee.employee_number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">التاريخ</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="check_in_time">وقت الحضور</Label>
                      <Input
                        id="check_in_time"
                        type="time"
                        value={newRecord.check_in_time}
                        onChange={(e) => setNewRecord({...newRecord, check_in_time: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="check_out_time">وقت الانصراف</Label>
                      <Input
                        id="check_out_time"
                        type="time"
                        value={newRecord.check_out_time}
                        onChange={(e) => setNewRecord({...newRecord, check_out_time: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">الحالة</Label>
                      <Select value={newRecord.status} onValueChange={(value) => setNewRecord({...newRecord, status: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">حاضر</SelectItem>
                          <SelectItem value="absent">غائب</SelectItem>
                          <SelectItem value="late">متأخر</SelectItem>
                          <SelectItem value="half_day">نصف يوم</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notes">ملاحظات</Label>
                      <Input
                        id="notes"
                        value={newRecord.notes}
                        onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                        placeholder="ملاحظات إضافية"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <Button type="button" variant="outline" onClick={() => setIsAddingRecord(false)}>
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
                  <TableHead>الموظف</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>وقت الحضور</TableHead>
                  <TableHead>وقت الانصراف</TableHead>
                  <TableHead>ساعات العمل</TableHead>
                  <TableHead>ساعات إضافية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.employees?.full_name}
                      <div className="text-sm text-muted-foreground">
                        {record.employees?.employee_number}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>{record.check_in_time || "-"}</TableCell>
                    <TableCell>{record.check_out_time || "-"}</TableCell>
                    <TableCell>{record.total_hours?.toFixed(1) || "0.0"} ساعة</TableCell>
                    <TableCell className="text-blue-600">{record.overtime_hours?.toFixed(1) || "0.0"} ساعة</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="max-w-xs truncate">{record.notes || "-"}</TableCell>
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

export default Attendance;