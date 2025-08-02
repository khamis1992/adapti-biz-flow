import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Calculator, 
  CreditCard,
  Receipt,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Users,
  Building,
  PieChart,
  BarChart3,
  Target,
  Award,
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
  Send,
  Printer,
  Mail,
  Settings,
  Shield,
  Lock,
  Unlock,
  RefreshCw,
  Activity,
  Percent,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Banknote,
  Wallet,
  CreditCard as CreditCardIcon,
  Building2,
  MapPin,
  Phone,
  User,
  Calendar as CalendarIcon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedPayroll = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية للرواتب
  const payrollData = [
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'أحمد محمد علي',
      position: 'مدير تطوير البرمجيات',
      department: 'تقنية المعلومات',
      basicSalary: 15000,
      allowances: {
        housing: 3000,
        transportation: 1000,
        food: 500,
        communication: 200,
        other: 300
      },
      deductions: {
        insurance: 450,
        gosi: 1125,
        tax: 0,
        loan: 500,
        other: 100
      },
      overtime: {
        hours: 8,
        rate: 100,
        amount: 800
      },
      bonus: 2000,
      netSalary: 20725,
      paymentMethod: 'تحويل بنكي',
      bankAccount: 'SA03 8000 0000 6080 1016 7519',
      paymentStatus: 'مدفوع',
      paymentDate: '2024-07-30',
      period: '2024-07'
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'فاطمة حسن محمد',
      position: 'محاسب أول',
      department: 'المالية',
      basicSalary: 12000,
      allowances: {
        housing: 2400,
        transportation: 800,
        food: 400,
        communication: 150,
        other: 250
      },
      deductions: {
        insurance: 360,
        gosi: 900,
        tax: 0,
        loan: 0,
        other: 50
      },
      overtime: {
        hours: 4,
        rate: 80,
        amount: 320
      },
      bonus: 1000,
      netSalary: 16010,
      paymentMethod: 'تحويل بنكي',
      bankAccount: 'SA03 8000 0000 6080 1016 7520',
      paymentStatus: 'مدفوع',
      paymentDate: '2024-07-30',
      period: '2024-07'
    },
    {
      id: 3,
      employeeId: 'EMP-003',
      name: 'خالد عبدالله سالم',
      position: 'مهندس جودة',
      department: 'الجودة',
      basicSalary: 10000,
      allowances: {
        housing: 2000,
        transportation: 600,
        food: 300,
        communication: 100,
        other: 200
      },
      deductions: {
        insurance: 300,
        gosi: 750,
        tax: 0,
        loan: 300,
        other: 50
      },
      overtime: {
        hours: 12,
        rate: 70,
        amount: 840
      },
      bonus: 500,
      netSalary: 12540,
      paymentMethod: 'تحويل بنكي',
      bankAccount: 'SA03 8000 0000 6080 1016 7521',
      paymentStatus: 'قيد المعالجة',
      paymentDate: '2024-08-05',
      period: '2024-07'
    },
    {
      id: 4,
      employeeId: 'EMP-004',
      name: 'نورا سعد الغامدي',
      position: 'أخصائي موارد بشرية',
      department: 'الموارد البشرية',
      basicSalary: 9000,
      allowances: {
        housing: 1800,
        transportation: 500,
        food: 250,
        communication: 100,
        other: 150
      },
      deductions: {
        insurance: 270,
        gosi: 675,
        tax: 0,
        loan: 200,
        other: 30
      },
      overtime: {
        hours: 0,
        rate: 60,
        amount: 0
      },
      bonus: 0,
      netSalary: 10625,
      paymentMethod: 'تحويل بنكي',
      bankAccount: 'SA03 8000 0000 6080 1016 7522',
      paymentStatus: 'معلق',
      paymentDate: '-',
      period: '2024-07'
    }
  ];

  // بيانات تحليل الرواتب
  const salaryAnalytics = [
    { month: 'يناير', totalPayroll: 2250000, employees: 148, avgSalary: 15203 },
    { month: 'فبراير', totalPayroll: 2380000, employees: 152, avgSalary: 15658 },
    { month: 'مارس', totalPayroll: 2420000, employees: 155, avgSalary: 15613 },
    { month: 'أبريل', totalPayroll: 2510000, employees: 158, avgSalary: 15886 },
    { month: 'مايو', totalPayroll: 2650000, employees: 162, avgSalary: 16358 },
    { month: 'يونيو', totalPayroll: 2720000, employees: 165, avgSalary: 16485 }
  ];

  // بيانات توزيع الرواتب حسب القسم
  const departmentSalaries = [
    { department: 'تقنية المعلومات', totalSalary: 850000, employees: 45, avgSalary: 18889 },
    { department: 'المبيعات', totalSalary: 680000, employees: 38, avgSalary: 17895 },
    { department: 'المالية', totalSalary: 420000, employees: 22, avgSalary: 19091 },
    { department: 'الموارد البشرية', totalSalary: 280000, employees: 18, avgSalary: 15556 },
    { department: 'العمليات', totalSalary: 490000, employees: 27, avgSalary: 18148 }
  ];

  // بيانات البدلات والخصومات
  const allowancesBreakdown = [
    { type: 'بدل سكن', amount: 450000, percentage: 35 },
    { type: 'بدل مواصلات', amount: 180000, percentage: 14 },
    { type: 'بدل طعام', amount: 90000, percentage: 7 },
    { type: 'بدل اتصالات', amount: 45000, percentage: 3.5 },
    { type: 'بدلات أخرى', amount: 65000, percentage: 5 }
  ];

  const deductionsBreakdown = [
    { type: 'التأمينات الاجتماعية', amount: 204000, percentage: 60 },
    { type: 'التأمين الطبي', amount: 85000, percentage: 25 },
    { type: 'القروض', amount: 35000, percentage: 10 },
    { type: 'خصومات أخرى', amount: 16000, percentage: 5 }
  ];

  // بيانات تقارير الضرائب
  const taxReports = [
    {
      id: 1,
      period: 'Q2 2024',
      totalSalaries: 7680000,
      totalTax: 0,
      gosi: 576000,
      employees: 165,
      status: 'مقدم',
      submissionDate: '2024-07-15',
      dueDate: '2024-07-31'
    },
    {
      id: 2,
      period: 'Q1 2024',
      totalSalaries: 7050000,
      totalTax: 0,
      gosi: 528750,
      employees: 158,
      status: 'معتمد',
      submissionDate: '2024-04-10',
      dueDate: '2024-04-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مدفوع': case 'معتمد': return 'bg-green-100 text-green-800';
      case 'قيد المعالجة': case 'مقدم': return 'bg-blue-100 text-blue-800';
      case 'معلق': case 'متأخر': return 'bg-yellow-100 text-yellow-800';
      case 'مرفوض': case 'ملغي': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTotalAllowances = (allowances: any): number => {
    return Object.values(allowances).reduce((sum: number, value: any) => sum + (Number(value) || 0), 0) as number;
  };

  const calculateTotalDeductions = (deductions: any) => {
    return Object.values(deductions).reduce((sum: number, value: any) => sum + value, 0);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">نظام الرواتب المتقدم</h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للرواتب والبدلات والخصومات</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Calculator className="w-4 h-4 ml-2" />
            حساب الرواتب
          </Button>
          <Button variant="outline">
            <Send className="w-4 h-4 ml-2" />
            إرسال الرواتب
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
                <p className="text-sm font-medium text-gray-600">إجمالي الرواتب</p>
                <p className="text-2xl font-bold text-gray-900">2.72M</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +5.2% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الراتب</p>
                <p className="text-2xl font-bold text-gray-900">16,485</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                  ر.س شهرياً
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي البدلات</p>
                <p className="text-2xl font-bold text-gray-900">830K</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Percent className="w-3 h-3 ml-1" />
                  30.5% من الرواتب
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الخصومات</p>
                <p className="text-2xl font-bold text-gray-900">340K</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <ArrowDownRight className="w-3 h-3 ml-1" />
                  12.5% من الرواتب
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Minus className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="payroll">الرواتب</TabsTrigger>
          <TabsTrigger value="allowances">البدلات</TabsTrigger>
          <TabsTrigger value="deductions">الخصومات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه الرواتب الشهري</CardTitle>
                <CardDescription>إجمالي الرواتب ومتوسط الراتب</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salaryAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalPayroll" fill="#3b82f6" name="إجمالي الرواتب" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الرواتب حسب القسم</CardTitle>
                <CardDescription>متوسط الرواتب في كل قسم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentSalaries.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-gray-600">{dept.employees} موظف</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(dept.avgSalary / 20000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-green-600">{dept.avgSalary.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">متوسط الراتب</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ملخص البدلات والخصومات */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع البدلات</CardTitle>
                <CardDescription>أنواع البدلات ونسبها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allowancesBreakdown.map((allowance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{allowance.type}</p>
                        <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${allowance.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-green-600">{allowance.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{allowance.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الخصومات</CardTitle>
                <CardDescription>أنواع الخصومات ونسبها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deductionsBreakdown.map((deduction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{deduction.type}</p>
                        <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${deduction.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-red-600">{deduction.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{deduction.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* الرواتب */}
        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الرواتب</CardTitle>
                  <CardDescription>تفاصيل رواتب الموظفين الشهرية</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Calculator className="w-4 h-4 ml-2" />
                    حساب الرواتب
                  </Button>
                  <Button variant="outline">
                    <Send className="w-4 h-4 ml-2" />
                    إرسال الرواتب
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

              <div className="space-y-4">
                {payrollData.map((employee) => (
                  <Card key={employee.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{employee.name}</h3>
                            <p className="text-gray-600">{employee.position}</p>
                            <p className="text-sm text-gray-500">{employee.employeeId} | {employee.department}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-green-600">{employee.netSalary.toLocaleString()} ر.س</p>
                          <p className="text-sm text-gray-600">الراتب الصافي</p>
                          <Badge className={getStatusColor(employee.paymentStatus)}>
                            {employee.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 text-green-600">الراتب والبدلات:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>الراتب الأساسي:</span>
                              <span className="font-medium">{employee.basicSalary.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>بدل سكن:</span>
                              <span className="font-medium">{employee.allowances.housing.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>بدل مواصلات:</span>
                              <span className="font-medium">{employee.allowances.transportation.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>بدلات أخرى:</span>
                              <span className="font-medium">
                                {(employee.allowances.food + employee.allowances.communication + employee.allowances.other).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>ساعات إضافية:</span>
                              <span className="font-medium">{employee.overtime.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>مكافآت:</span>
                              <span className="font-medium">{employee.bonus.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-medium border-t pt-2">
                              <span>إجمالي الاستحقاقات:</span>
                              <span className="text-green-600">
                                {(Number(employee.basicSalary) + calculateTotalAllowances(employee.allowances) + Number(employee.overtime?.amount || 0) + Number(employee.bonus)).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3 text-red-600">الخصومات:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>التأمين الطبي:</span>
                              <span className="font-medium">{employee.deductions.insurance.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>التأمينات الاجتماعية:</span>
                              <span className="font-medium">{employee.deductions.gosi.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>ضريبة الدخل:</span>
                              <span className="font-medium">{employee.deductions.tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>قروض:</span>
                              <span className="font-medium">{employee.deductions.loan.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>خصومات أخرى:</span>
                              <span className="font-medium">{employee.deductions.other.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-medium border-t pt-2">
                              <span>إجمالي الخصومات:</span>
                              <span className="text-red-600">
                                {calculateTotalDeductions(employee.deductions).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3 text-blue-600">معلومات الدفع:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>طريقة الدفع:</span>
                              <span className="font-medium">{employee.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>رقم الحساب:</span>
                              <span className="font-mono text-xs">{employee.bankAccount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>تاريخ الدفع:</span>
                              <span className="font-medium">{employee.paymentDate || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>فترة الراتب:</span>
                              <span className="font-medium">{employee.period}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 ml-2" />
                              عرض
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* البدلات */}
        <TabsContent value="allowances" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة البدلات</CardTitle>
                  <CardDescription>تكوين وإدارة بدلات الموظفين</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  بدل جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">بدل السكن</CardTitle>
                    <CardDescription>بدل السكن للموظفين</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">450,000</p>
                        <p className="text-sm text-gray-600">إجمالي شهري</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>عدد المستفيدين:</span>
                          <span className="font-medium">150</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط البدل:</span>
                          <span className="font-medium">3,000 ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span>النسبة من الراتب:</span>
                          <span className="font-medium">20%</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 ml-2" />
                        إعدادات البدل
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">بدل المواصلات</CardTitle>
                    <CardDescription>بدل المواصلات للموظفين</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">180,000</p>
                        <p className="text-sm text-gray-600">إجمالي شهري</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>عدد المستفيدين:</span>
                          <span className="font-medium">165</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط البدل:</span>
                          <span className="font-medium">1,091 ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span>النسبة من الراتب:</span>
                          <span className="font-medium">6.6%</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 ml-2" />
                        إعدادات البدل
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">بدل الطعام</CardTitle>
                    <CardDescription>بدل الطعام للموظفين</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">90,000</p>
                        <p className="text-sm text-gray-600">إجمالي شهري</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>عدد المستفيدين:</span>
                          <span className="font-medium">165</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط البدل:</span>
                          <span className="font-medium">545 ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span>النسبة من الراتب:</span>
                          <span className="font-medium">3.3%</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 ml-2" />
                        إعدادات البدل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>قواعد البدلات</CardTitle>
                  <CardDescription>قواعد احتساب البدلات حسب المنصب والقسم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right p-3 font-medium">المنصب</th>
                          <th className="text-right p-3 font-medium">بدل السكن</th>
                          <th className="text-right p-3 font-medium">بدل المواصلات</th>
                          <th className="text-right p-3 font-medium">بدل الطعام</th>
                          <th className="text-right p-3 font-medium">بدل الاتصالات</th>
                          <th className="text-right p-3 font-medium">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">مدير</td>
                          <td className="p-3">25% من الراتب</td>
                          <td className="p-3">1,500 ر.س</td>
                          <td className="p-3">800 ر.س</td>
                          <td className="p-3">300 ر.س</td>
                          <td className="p-3">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">أخصائي أول</td>
                          <td className="p-3">20% من الراتب</td>
                          <td className="p-3">1,000 ر.س</td>
                          <td className="p-3">500 ر.س</td>
                          <td className="p-3">200 ر.س</td>
                          <td className="p-3">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">أخصائي</td>
                          <td className="p-3">18% من الراتب</td>
                          <td className="p-3">800 ر.س</td>
                          <td className="p-3">400 ر.س</td>
                          <td className="p-3">150 ر.س</td>
                          <td className="p-3">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الخصومات */}
        <TabsContent value="deductions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الخصومات</CardTitle>
                  <CardDescription>تكوين وإدارة خصومات الموظفين</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  خصم جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">التأمينات الاجتماعية</CardTitle>
                    <CardDescription>خصم التأمينات الاجتماعية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">204,000</p>
                        <p className="text-sm text-gray-600">إجمالي شهري</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>نسبة الخصم:</span>
                          <span className="font-medium">7.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>عدد المشتركين:</span>
                          <span className="font-medium">165</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط الخصم:</span>
                          <span className="font-medium">1,236 ر.س</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 ml-2" />
                        إعدادات الخصم
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">التأمين الطبي</CardTitle>
                    <CardDescription>خصم التأمين الطبي</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">85,000</p>
                        <p className="text-sm text-gray-600">إجمالي شهري</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>نسبة الخصم:</span>
                          <span className="font-medium">3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>عدد المشتركين:</span>
                          <span className="font-medium">165</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط الخصم:</span>
                          <span className="font-medium">515 ر.س</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 ml-2" />
                        إعدادات الخصم
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">القروض</CardTitle>
                    <CardDescription>خصومات القروض الشخصية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">35,000</p>
                        <p className="text-sm text-gray-600">إجمالي شهري</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>عدد القروض النشطة:</span>
                          <span className="font-medium">28</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط القسط:</span>
                          <span className="font-medium">1,250 ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span>إجمالي المتبقي:</span>
                          <span className="font-medium">850,000 ر.س</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 ml-2" />
                        عرض القروض
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>قروض الموظفين</CardTitle>
                  <CardDescription>تفاصيل القروض النشطة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right p-3 font-medium">رقم الموظف</th>
                          <th className="text-right p-3 font-medium">الاسم</th>
                          <th className="text-right p-3 font-medium">مبلغ القرض</th>
                          <th className="text-right p-3 font-medium">القسط الشهري</th>
                          <th className="text-right p-3 font-medium">المتبقي</th>
                          <th className="text-right p-3 font-medium">تاريخ الانتهاء</th>
                          <th className="text-right p-3 font-medium">الحالة</th>
                          <th className="text-right p-3 font-medium">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono">EMP-001</td>
                          <td className="p-3 font-medium">أحمد محمد علي</td>
                          <td className="p-3">50,000</td>
                          <td className="p-3">500</td>
                          <td className="p-3">35,000</td>
                          <td className="p-3">2026-12-31</td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-800">نشط</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono">EMP-003</td>
                          <td className="p-3 font-medium">خالد عبدالله سالم</td>
                          <td className="p-3">30,000</td>
                          <td className="p-3">300</td>
                          <td className="p-3">18,000</td>
                          <td className="p-3">2025-08-31</td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-800">نشط</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التقارير */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>تقارير الرواتب والضرائب</CardTitle>
                  <CardDescription>تقارير شاملة للرواتب والالتزامات الضريبية</CardDescription>
                </div>
                <Button>
                  <Download className="w-4 h-4 ml-2" />
                  تصدير التقارير
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium">تقرير الرواتب الشهري</p>
                      <p className="text-sm text-gray-600 mt-1">يوليو 2024</p>
                      <Button variant="outline" className="w-full mt-3">
                        <Download className="w-4 h-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Receipt className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">تقرير التأمينات الاجتماعية</p>
                      <p className="text-sm text-gray-600 mt-1">Q2 2024</p>
                      <Button variant="outline" className="w-full mt-3">
                        <Download className="w-4 h-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium">تحليل تكاليف الموظفين</p>
                      <p className="text-sm text-gray-600 mt-1">2024</p>
                      <Button variant="outline" className="w-full mt-3">
                        <Download className="w-4 h-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>تقارير التأمينات والضرائب</CardTitle>
                  <CardDescription>حالة التقارير المقدمة للجهات الحكومية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right p-3 font-medium">الفترة</th>
                          <th className="text-right p-3 font-medium">إجمالي الرواتب</th>
                          <th className="text-right p-3 font-medium">التأمينات الاجتماعية</th>
                          <th className="text-right p-3 font-medium">ضريبة الدخل</th>
                          <th className="text-right p-3 font-medium">عدد الموظفين</th>
                          <th className="text-right p-3 font-medium">تاريخ التقديم</th>
                          <th className="text-right p-3 font-medium">الحالة</th>
                          <th className="text-right p-3 font-medium">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {taxReports.map((report) => (
                          <tr key={report.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{report.period}</td>
                            <td className="p-3">{report.totalSalaries.toLocaleString()}</td>
                            <td className="p-3">{report.gosi.toLocaleString()}</td>
                            <td className="p-3">{report.totalTax.toLocaleString()}</td>
                            <td className="p-3 text-center">{report.employees}</td>
                            <td className="p-3">{report.submissionDate}</td>
                            <td className="p-3">
                              <Badge className={getStatusColor(report.status)}>
                                {report.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4" />
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإعدادات */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات نظام الرواتب</CardTitle>
              <CardDescription>تكوين النظام والقواعد العامة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">الإعدادات العامة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="payroll-cycle">دورة الرواتب</Label>
                      <Input id="payroll-cycle" value="شهرية" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="payment-date">تاريخ صرف الرواتب</Label>
                      <Input id="payment-date" value="آخر يوم عمل في الشهر" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="currency">العملة</Label>
                      <Input id="currency" value="ريال سعودي (SAR)" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="working-days">أيام العمل الشهرية</Label>
                      <Input id="working-days" value="22 يوم" readOnly />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إعدادات التأمينات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="gosi-rate">نسبة التأمينات الاجتماعية</Label>
                      <Input id="gosi-rate" value="7.5%" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="medical-insurance">نسبة التأمين الطبي</Label>
                      <Input id="medical-insurance" value="3%" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="max-gosi">الحد الأقصى للتأمينات</Label>
                      <Input id="max-gosi" value="45,000 ر.س" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="min-wage">الحد الأدنى للأجور</Label>
                      <Input id="min-wage" value="4,000 ر.س" readOnly />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إعدادات الساعات الإضافية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="overtime-rate">معدل الساعات الإضافية</Label>
                      <Input id="overtime-rate" value="150% من الراتب الأساسي" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="max-overtime">الحد الأقصى للساعات الإضافية</Label>
                      <Input id="max-overtime" value="180 ساعة سنوياً" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="holiday-rate">معدل العمل في الإجازات</Label>
                      <Input id="holiday-rate" value="200% من الراتب الأساسي" readOnly />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إعدادات الأمان</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="encryption">تشفير البيانات</Label>
                      <Badge className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 ml-1" />
                        مفعل
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="audit-trail">سجل المراجعة</Label>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 ml-1" />
                        مفعل
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="backup">النسخ الاحتياطي</Label>
                      <Badge className="bg-green-100 text-green-800">
                        <RefreshCw className="w-3 h-3 ml-1" />
                        يومي
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPayroll;

