import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  TrendingDown,
  Target,
  BookOpen,
  GraduationCap,
  Star,
  Heart,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Bell,
  Camera,
  Upload,
  Calendar as CalendarIcon,
  ClipboardList,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedHR = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية للموظفين
  const employees = [
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'أحمد محمد علي',
      position: 'مدير تطوير البرمجيات',
      department: 'تقنية المعلومات',
      email: 'ahmed.mohamed@company.com',
      phone: '+966501234567',
      hireDate: '2022-01-15',
      salary: 15000,
      status: 'نشط',
      performance: 4.5,
      attendance: 95,
      leaves: 5,
      skills: ['React', 'Node.js', 'Python', 'إدارة الفرق'],
      certifications: ['PMP', 'AWS Solutions Architect'],
      manager: 'سارة أحمد',
      location: 'الرياض'
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'فاطمة حسن محمد',
      position: 'محاسب أول',
      department: 'المالية',
      email: 'fatima.hassan@company.com',
      phone: '+966507654321',
      hireDate: '2021-03-20',
      salary: 12000,
      status: 'نشط',
      performance: 4.2,
      attendance: 98,
      leaves: 3,
      skills: ['Excel المتقدم', 'SAP', 'التحليل المالي'],
      certifications: ['CPA', 'CMA'],
      manager: 'محمد علي',
      location: 'جدة'
    },
    {
      id: 3,
      employeeId: 'EMP-003',
      name: 'خالد عبدالله سالم',
      position: 'مهندس جودة',
      department: 'الجودة',
      email: 'khalid.abdullah@company.com',
      phone: '+966509876543',
      hireDate: '2023-06-10',
      salary: 10000,
      status: 'نشط',
      performance: 4.0,
      attendance: 92,
      leaves: 8,
      skills: ['Six Sigma', 'ISO 9001', 'تحليل البيانات'],
      certifications: ['Six Sigma Black Belt', 'ISO 9001 Lead Auditor'],
      manager: 'أحمد محمد',
      location: 'الدمام'
    },
    {
      id: 4,
      employeeId: 'EMP-004',
      name: 'نورا سعد الغامدي',
      position: 'أخصائي موارد بشرية',
      department: 'الموارد البشرية',
      email: 'nora.saad@company.com',
      phone: '+966502468135',
      hireDate: '2020-09-01',
      salary: 9000,
      status: 'إجازة أمومة',
      performance: 4.3,
      attendance: 89,
      leaves: 45,
      skills: ['التوظيف', 'تطوير المواهب', 'قانون العمل'],
      certifications: ['SHRM-CP', 'PHR'],
      manager: 'سارة أحمد',
      location: 'الرياض'
    }
  ];

  // بيانات الحضور والانصراف
  const attendanceData = [
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'أحمد محمد علي',
      date: '2024-08-05',
      checkIn: '08:00',
      checkOut: '17:30',
      workingHours: 8.5,
      overtime: 0.5,
      status: 'حاضر',
      location: 'المكتب الرئيسي'
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'فاطمة حسن محمد',
      date: '2024-08-05',
      checkIn: '08:15',
      checkOut: '17:00',
      workingHours: 7.75,
      overtime: 0,
      status: 'حاضر',
      location: 'فرع جدة'
    },
    {
      id: 3,
      employeeId: 'EMP-003',
      name: 'خالد عبدالله سالم',
      date: '2024-08-05',
      checkIn: '09:00',
      checkOut: '18:00',
      workingHours: 8,
      overtime: 1,
      status: 'متأخر',
      location: 'فرع الدمام'
    },
    {
      id: 4,
      employeeId: 'EMP-004',
      name: 'نورا سعد الغامدي',
      date: '2024-08-05',
      checkIn: '-',
      checkOut: '-',
      workingHours: 0,
      overtime: 0,
      status: 'إجازة',
      location: '-'
    }
  ];

  // بيانات طلبات الإجازات
  const leaveRequests = [
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'أحمد محمد علي',
      type: 'إجازة سنوية',
      startDate: '2024-08-15',
      endDate: '2024-08-20',
      days: 6,
      reason: 'إجازة عائلية',
      status: 'معتمد',
      approvedBy: 'سارة أحمد',
      requestDate: '2024-07-20'
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'فاطمة حسن محمد',
      type: 'إجازة مرضية',
      startDate: '2024-08-08',
      endDate: '2024-08-10',
      days: 3,
      reason: 'مراجعة طبية',
      status: 'قيد المراجعة',
      approvedBy: '-',
      requestDate: '2024-08-05'
    },
    {
      id: 3,
      employeeId: 'EMP-003',
      name: 'خالد عبدالله سالم',
      type: 'إجازة طارئة',
      startDate: '2024-08-12',
      endDate: '2024-08-12',
      days: 1,
      reason: 'ظروف عائلية طارئة',
      status: 'مرفوض',
      approvedBy: 'أحمد محمد',
      requestDate: '2024-08-11'
    }
  ];

  // بيانات تقييم الأداء
  const performanceReviews = [
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'أحمد محمد علي',
      period: 'Q2 2024',
      overallScore: 4.5,
      categories: {
        technical: 4.8,
        communication: 4.2,
        leadership: 4.7,
        teamwork: 4.3,
        innovation: 4.6
      },
      goals: [
        { goal: 'تطوير نظام إدارة المشاريع', status: 'مكتمل', score: 5 },
        { goal: 'تدريب فريق التطوير', status: 'مكتمل', score: 4 },
        { goal: 'تحسين الأداء بنسبة 20%', status: 'قيد التنفيذ', score: 4 }
      ],
      feedback: 'أداء ممتاز في القيادة والتطوير التقني',
      reviewer: 'سارة أحمد',
      reviewDate: '2024-07-15'
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'فاطمة حسن محمد',
      period: 'Q2 2024',
      overallScore: 4.2,
      categories: {
        technical: 4.5,
        communication: 4.0,
        accuracy: 4.8,
        efficiency: 3.8,
        compliance: 4.2
      },
      goals: [
        { goal: 'تطبيق نظام محاسبي جديد', status: 'مكتمل', score: 4 },
        { goal: 'تقليل أخطاء التقارير', status: 'مكتمل', score: 5 },
        { goal: 'الحصول على شهادة CMA', status: 'قيد التنفيذ', score: 3 }
      ],
      feedback: 'دقة عالية في العمل مع حاجة لتحسين السرعة',
      reviewer: 'محمد علي',
      reviewDate: '2024-07-10'
    }
  ];

  // بيانات التدريب والتطوير
  const trainingPrograms = [
    {
      id: 1,
      title: 'إدارة المشاريع المتقدمة',
      description: 'برنامج تدريبي شامل في إدارة المشاريع باستخدام منهجيات Agile و Scrum',
      duration: '40 ساعة',
      startDate: '2024-09-01',
      endDate: '2024-09-15',
      instructor: 'د. محمد الأحمد',
      capacity: 20,
      enrolled: 15,
      status: 'مفتوح للتسجيل',
      cost: 5000,
      category: 'إدارة'
    },
    {
      id: 2,
      title: 'تطوير المهارات القيادية',
      description: 'تطوير مهارات القيادة والتواصل الفعال',
      duration: '24 ساعة',
      startDate: '2024-08-20',
      endDate: '2024-08-25',
      instructor: 'أ. سارة الزهراني',
      capacity: 15,
      enrolled: 12,
      status: 'قيد التنفيذ',
      cost: 3000,
      category: 'قيادة'
    },
    {
      id: 3,
      title: 'الأمن السيبراني للمؤسسات',
      description: 'أساسيات الأمن السيبراني وحماية البيانات',
      duration: '32 ساعة',
      startDate: '2024-10-01',
      endDate: '2024-10-10',
      instructor: 'م. أحمد الشهري',
      capacity: 25,
      enrolled: 8,
      status: 'مفتوح للتسجيل',
      cost: 4000,
      category: 'تقنية'
    }
  ];

  // بيانات تحليل الموارد البشرية
  const hrAnalytics = [
    { month: 'يناير', hires: 8, terminations: 2, retention: 96 },
    { month: 'فبراير', hires: 12, terminations: 3, retention: 95 },
    { month: 'مارس', hires: 15, terminations: 1, retention: 97 },
    { month: 'أبريل', hires: 10, terminations: 4, retention: 94 },
    { month: 'مايو', hires: 18, terminations: 2, retention: 96 },
    { month: 'يونيو', hires: 14, terminations: 3, retention: 95 }
  ];

  // بيانات توزيع الموظفين
  const departmentDistribution = [
    { department: 'تقنية المعلومات', count: 45, percentage: 30 },
    { department: 'المبيعات', count: 38, percentage: 25 },
    { department: 'المالية', count: 22, percentage: 15 },
    { department: 'الموارد البشرية', count: 18, percentage: 12 },
    { department: 'العمليات', count: 27, percentage: 18 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'إجازة': case 'إجازة أمومة': return 'bg-yellow-100 text-yellow-800';
      case 'معطل': case 'منتهي الخدمة': return 'bg-red-100 text-red-800';
      case 'حاضر': return 'bg-green-100 text-green-800';
      case 'متأخر': return 'bg-yellow-100 text-yellow-800';
      case 'غائب': return 'bg-red-100 text-red-800';
      case 'معتمد': return 'bg-green-100 text-green-800';
      case 'قيد المراجعة': return 'bg-blue-100 text-blue-800';
      case 'مرفوض': return 'bg-red-100 text-red-800';
      case 'مفتوح للتسجيل': return 'bg-green-100 text-green-800';
      case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">الموارد البشرية المتقدمة</h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة الموظفين والمواهب والأداء</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <UserPlus className="w-4 h-4 ml-2" />
            موظف جديد
          </Button>
          <Button variant="outline">
            <BookOpen className="w-4 h-4 ml-2" />
            برنامج تدريبي
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-gray-900">150</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <UserPlus className="w-3 h-3 ml-1" />
                  +8 هذا الشهر
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الحضور</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +2% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الأداء</p>
                <p className="text-2xl font-bold text-gray-900">4.2</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Star className="w-3 h-3 ml-1" />
                  من أصل 5
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الاحتفاظ</p>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Heart className="w-3 h-3 ml-1" />
                  ممتاز
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="employees">الموظفين</TabsTrigger>
          <TabsTrigger value="attendance">الحضور</TabsTrigger>
          <TabsTrigger value="leaves">الإجازات</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="training">التدريب</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه التوظيف والاحتفاظ</CardTitle>
                <CardDescription>التوظيفات الجديدة ومعدل الاحتفاظ</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hrAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hires" fill="#3b82f6" name="توظيفات جديدة" />
                    <Bar dataKey="terminations" fill="#ef4444" name="انتهاء خدمة" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الموظفين حسب القسم</CardTitle>
                <CardDescription>عدد الموظفين في كل قسم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentDistribution.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{dept.department}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${dept.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-blue-600">{dept.count}</p>
                        <p className="text-sm text-gray-600">{dept.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* الموظفين المتميزين */}
          <Card>
            <CardHeader>
              <CardTitle>الموظفين المتميزين</CardTitle>
              <CardDescription>أفضل الموظفين أداءً هذا الشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.filter(emp => emp.performance >= 4.2).map((employee) => (
                  <Card key={employee.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الأداء:</span>
                          <span className={`font-medium ${getPerformanceColor(employee.performance)}`}>
                            {employee.performance}/5
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحضور:</span>
                          <span className={`font-medium ${getAttendanceColor(employee.attendance)}`}>
                            {employee.attendance}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">القسم:</span>
                          <span className="font-medium">{employee.department}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الموظفين */}
        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الموظفين</CardTitle>
                  <CardDescription>قاعدة بيانات شاملة للموظفين</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <UserPlus className="w-4 h-4 ml-2" />
                    موظف جديد
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input placeholder="البحث في الموظفين..." className="w-full" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 ml-2" />
                  فلترة
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الموظف</th>
                      <th className="text-right p-3 font-medium">الاسم</th>
                      <th className="text-right p-3 font-medium">المنصب</th>
                      <th className="text-right p-3 font-medium">القسم</th>
                      <th className="text-right p-3 font-medium">تاريخ التوظيف</th>
                      <th className="text-right p-3 font-medium">الراتب</th>
                      <th className="text-right p-3 font-medium">الأداء</th>
                      <th className="text-right p-3 font-medium">الحضور</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{employee.employeeId}</td>
                        <td className="p-3 font-medium">{employee.name}</td>
                        <td className="p-3">{employee.position}</td>
                        <td className="p-3">{employee.department}</td>
                        <td className="p-3">{employee.hireDate}</td>
                        <td className="p-3 font-mono">{employee.salary.toLocaleString()} ر.س</td>
                        <td className="p-3 text-center">
                          <span className={`font-medium ${getPerformanceColor(employee.performance)}`}>
                            {employee.performance}/5
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`font-medium ${getAttendanceColor(employee.attendance)}`}>
                            {employee.attendance}%
                          </span>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الحضور */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الحضور والانصراف</CardTitle>
                  <CardDescription>تتبع حضور الموظفين اليومي</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Clock className="w-4 h-4 ml-2" />
                    تسجيل حضور
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 ml-2" />
                    التقويم
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">حاضرين اليوم</p>
                      <p className="text-2xl font-bold text-green-600">142</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متأخرين</p>
                      <p className="text-2xl font-bold text-yellow-600">5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">في إجازة</p>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">ساعات إضافية</p>
                      <p className="text-2xl font-bold text-purple-600">28</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الموظف</th>
                      <th className="text-right p-3 font-medium">الاسم</th>
                      <th className="text-right p-3 font-medium">التاريخ</th>
                      <th className="text-right p-3 font-medium">وقت الحضور</th>
                      <th className="text-right p-3 font-medium">وقت الانصراف</th>
                      <th className="text-right p-3 font-medium">ساعات العمل</th>
                      <th className="text-right p-3 font-medium">ساعات إضافية</th>
                      <th className="text-right p-3 font-medium">الموقع</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{record.employeeId}</td>
                        <td className="p-3 font-medium">{record.name}</td>
                        <td className="p-3">{record.date}</td>
                        <td className="p-3 font-mono">{record.checkIn}</td>
                        <td className="p-3 font-mono">{record.checkOut}</td>
                        <td className="p-3 text-center">{record.workingHours}</td>
                        <td className="p-3 text-center">{record.overtime}</td>
                        <td className="p-3">{record.location}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإجازات */}
        <TabsContent value="leaves" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الإجازات</CardTitle>
                  <CardDescription>طلبات الإجازات والموافقات</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  طلب إجازة جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">طلبات معلقة</p>
                      <p className="text-2xl font-bold text-yellow-600">8</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">معتمدة</p>
                      <p className="text-2xl font-bold text-green-600">25</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">مرفوضة</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي الأيام</p>
                      <p className="text-2xl font-bold text-blue-600">180</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الموظف</th>
                      <th className="text-right p-3 font-medium">الاسم</th>
                      <th className="text-right p-3 font-medium">نوع الإجازة</th>
                      <th className="text-right p-3 font-medium">تاريخ البداية</th>
                      <th className="text-right p-3 font-medium">تاريخ النهاية</th>
                      <th className="text-right p-3 font-medium">عدد الأيام</th>
                      <th className="text-right p-3 font-medium">السبب</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">المعتمد من</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{request.employeeId}</td>
                        <td className="p-3 font-medium">{request.name}</td>
                        <td className="p-3">{request.type}</td>
                        <td className="p-3">{request.startDate}</td>
                        <td className="p-3">{request.endDate}</td>
                        <td className="p-3 text-center">{request.days}</td>
                        <td className="p-3">{request.reason}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </td>
                        <td className="p-3">{request.approvedBy || '-'}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {request.status === 'قيد المراجعة' && (
                              <>
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأداء */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>تقييم الأداء</CardTitle>
                  <CardDescription>مراجعات الأداء والأهداف</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  تقييم جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceReviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{review.name}</CardTitle>
                          <CardDescription>
                            {review.period} | المراجع: {review.reviewer}
                          </CardDescription>
                        </div>
                        <div className="text-left">
                          <p className={`text-2xl font-bold ${getPerformanceColor(review.overallScore)}`}>
                            {review.overallScore}/5
                          </p>
                          <p className="text-sm text-gray-600">التقييم الإجمالي</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">تقييم الفئات:</h4>
                          <div className="space-y-2">
                            {Object.entries(review.categories).map(([category, score]) => (
                              <div key={category} className="flex justify-between items-center">
                                <span className="text-sm">{category}</span>
                                <span className={`font-medium ${getPerformanceColor(score as number)}`}>
                                  {score}/5
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">الأهداف:</h4>
                          <div className="space-y-2">
                            {review.goals.map((goal, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{goal.goal}</p>
                                  <Badge className={getStatusColor(goal.status)} variant="outline">
                                    {goal.status}
                                  </Badge>
                                </div>
                                <span className={`font-medium ${getPerformanceColor(goal.score)}`}>
                                  {goal.score}/5
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">التعليقات:</h4>
                        <p className="text-gray-700">{review.feedback}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التدريب */}
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>برامج التدريب والتطوير</CardTitle>
                  <CardDescription>تطوير مهارات الموظفين</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  برنامج جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingPrograms.map((program) => (
                  <Card key={program.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{program.title}</h3>
                          <p className="text-sm text-gray-600">{program.category}</p>
                        </div>
                        <Badge className={getStatusColor(program.status)}>
                          {program.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{program.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">المدة:</span>
                          <span className="font-medium">{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المدرب:</span>
                          <span className="font-medium">{program.instructor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المسجلين:</span>
                          <span className="font-medium">{program.enrolled}/{program.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">التكلفة:</span>
                          <span className="font-medium">{program.cost} ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ البداية:</span>
                          <span className="font-medium">{program.startDate}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>نسبة التسجيل</span>
                          <span>{Math.round((program.enrolled / program.capacity) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserPlus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه معدل الاحتفاظ</CardTitle>
                <CardDescription>معدل الاحتفاظ بالموظفين عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hrAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="retention" stroke="#10b981" name="معدل الاحتفاظ %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الأداء</CardTitle>
                <CardDescription>توزيع تقييمات الأداء</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-green-600" />
                      <span>ممتاز (4.5-5.0)</span>
                    </div>
                    <span className="font-bold text-green-600">25%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ThumbsUp className="h-5 w-5 text-blue-600" />
                      <span>جيد جداً (4.0-4.4)</span>
                    </div>
                    <span className="font-bold text-blue-600">45%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-yellow-600" />
                      <span>جيد (3.5-3.9)</span>
                    </div>
                    <span className="font-bold text-yellow-600">25%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ThumbsDown className="h-5 w-5 text-red-600" />
                      <span>يحتاج تحسين (أقل من 3.5)</span>
                    </div>
                    <span className="font-bold text-red-600">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>ملخص شامل لأداء الموارد البشرية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">150</p>
                  <p className="text-sm text-gray-600">إجمالي الموظفين</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">95%</p>
                  <p className="text-sm text-gray-600">معدل الاحتفاظ</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">4.2</p>
                  <p className="text-sm text-gray-600">متوسط الأداء</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">94%</p>
                  <p className="text-sm text-gray-600">معدل الحضور</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedHR;

