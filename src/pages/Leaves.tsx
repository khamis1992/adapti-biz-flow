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
import { CalendarDays, Plus, LogOut, Home, Check, X } from "lucide-react";

interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  total_days: number;
  status: string;
  reason: string;
  rejection_reason: string;
  approved_by: string;
  approved_at: string;
  created_at: string;
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

const Leaves = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    employee_id: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: ""
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
      fetchLeaveRequests();
      fetchEmployees();
    }
  }, [user]);

  const fetchLeaveRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("leave_requests")
        .select(`
          *,
          employees (
            full_name,
            employee_number
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeaveRequests(data || []);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل طلبات الإجازة",
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

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end dates
    
    return diffDays;
  };

  const handleAddRequest = async (e: React.FormEvent) => {
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

      const totalDays = calculateDays(newRequest.start_date, newRequest.end_date);

      const { error } = await supabase
        .from("leave_requests")
        .insert([
          {
            tenant_id: userData.tenant_id,
            employee_id: newRequest.employee_id,
            leave_type: newRequest.leave_type,
            start_date: newRequest.start_date,
            end_date: newRequest.end_date,
            total_days: totalDays,
            reason: newRequest.reason,
            status: "pending"
          }
        ]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم تقديم طلب الإجازة بنجاح",
      });

      setNewRequest({
        employee_id: "",
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: ""
      });
      setIsAddingRequest(false);
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error adding leave request:", error);
      toast({
        title: "خطأ",
        description: "فشل في تقديم طلب الإجازة",
        variant: "destructive",
      });
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from("leave_requests")
        .update({
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString()
        })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "تم الموافقة",
        description: "تم الموافقة على طلب الإجازة",
      });

      fetchLeaveRequests();
    } catch (error) {
      console.error("Error approving request:", error);
      toast({
        title: "خطأ",
        description: "فشل في الموافقة على الطلب",
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (requestId: string, reason: string) => {
    try {
      const { error } = await supabase
        .from("leave_requests")
        .update({
          status: "rejected",
          rejection_reason: reason,
          approved_by: user.id,
          approved_at: new Date().toISOString()
        })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "تم الرفض",
        description: "تم رفض طلب الإجازة",
      });

      fetchLeaveRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast({
        title: "خطأ",
        description: "فشل في رفض الطلب",
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
      case "pending":
        return <Badge variant="secondary">قيد المراجعة</Badge>;
      case "approved":
        return <Badge variant="default">موافق عليه</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLeaveTypeName = (type: string) => {
    switch (type) {
      case "annual":
        return "إجازة سنوية";
      case "sick":
        return "إجازة مرضية";
      case "emergency":
        return "إجازة طارئة";
      case "maternity":
        return "إجازة أمومة";
      case "paternity":
        return "إجازة أبوة";
      case "unpaid":
        return "إجازة بدون راتب";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <CalendarDays className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
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
              <CalendarDays className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">إدارة الإجازات</h1>
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
          <p className="text-muted-foreground">إدارة طلبات الإجازات ومتابعة حالتها</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المعلقة</CardTitle>
              <CalendarDays className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {leaveRequests.filter(req => req.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المعتمدة</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {leaveRequests.filter(req => req.status === 'approved').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المرفوضة</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {leaveRequests.filter(req => req.status === 'rejected').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">مجموع الأيام</CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {leaveRequests
                  .filter(req => req.status === 'approved')
                  .reduce((sum, req) => sum + (req.total_days || 0), 0)
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>طلبات الإجازة</CardTitle>
                <CardDescription>إدارة ومتابعة طلبات الإجازات</CardDescription>
              </div>
              <Dialog open={isAddingRequest} onOpenChange={setIsAddingRequest}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    طلب إجازة جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>طلب إجازة جديد</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddRequest} className="space-y-4">
                    <div>
                      <Label htmlFor="employee_id">الموظف</Label>
                      <Select value={newRequest.employee_id} onValueChange={(value) => setNewRequest({...newRequest, employee_id: value})}>
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
                      <Label htmlFor="leave_type">نوع الإجازة</Label>
                      <Select value={newRequest.leave_type} onValueChange={(value) => setNewRequest({...newRequest, leave_type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الإجازة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">إجازة سنوية</SelectItem>
                          <SelectItem value="sick">إجازة مرضية</SelectItem>
                          <SelectItem value="emergency">إجازة طارئة</SelectItem>
                          <SelectItem value="maternity">إجازة أمومة</SelectItem>
                          <SelectItem value="paternity">إجازة أبوة</SelectItem>
                          <SelectItem value="unpaid">إجازة بدون راتب</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="start_date">تاريخ البداية</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={newRequest.start_date}
                        onChange={(e) => setNewRequest({...newRequest, start_date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_date">تاريخ النهاية</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={newRequest.end_date}
                        onChange={(e) => setNewRequest({...newRequest, end_date: e.target.value})}
                        required
                      />
                    </div>
                    {newRequest.start_date && newRequest.end_date && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          مدة الإجازة: {calculateDays(newRequest.start_date, newRequest.end_date)} يوم
                        </p>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="reason">سبب الإجازة</Label>
                      <Textarea
                        id="reason"
                        value={newRequest.reason}
                        onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                        placeholder="اذكر سبب طلب الإجازة"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <Button type="button" variant="outline" onClick={() => setIsAddingRequest(false)}>
                        إلغاء
                      </Button>
                      <Button type="submit">تقديم الطلب</Button>
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
                  <TableHead>نوع الإجازة</TableHead>
                  <TableHead>من</TableHead>
                  <TableHead>إلى</TableHead>
                  <TableHead>عدد الأيام</TableHead>
                  <TableHead>السبب</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.employees?.full_name}
                      <div className="text-sm text-muted-foreground">
                        {request.employees?.employee_number}
                      </div>
                    </TableCell>
                    <TableCell>{getLeaveTypeName(request.leave_type)}</TableCell>
                    <TableCell>{new Date(request.start_date).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>{new Date(request.end_date).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>{request.total_days} يوم</TableCell>
                    <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.status === 'pending' && (
                        <div className="flex space-x-2 space-x-reverse">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectRequest(request.id, "تم الرفض من قبل الإدارة")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
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

export default Leaves;