import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  PieChart,
  Building2,
  CreditCard,
  Banknote,
  Receipt,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedAccounting = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية للحسابات
  const accountsData = [
    { id: 1, code: '1001', name: 'النقدية في الصندوق', type: 'أصول', balance: 50000, status: 'نشط' },
    { id: 2, code: '1002', name: 'البنك الأهلي - الحساب الجاري', type: 'أصول', balance: 250000, status: 'نشط' },
    { id: 3, code: '1101', name: 'العملاء - حسابات مدينة', type: 'أصول', balance: 180000, status: 'نشط' },
    { id: 4, code: '1201', name: 'المخزون - مواد خام', type: 'أصول', balance: 120000, status: 'نشط' },
    { id: 5, code: '1301', name: 'الأصول الثابتة - مباني', type: 'أصول', balance: 800000, status: 'نشط' },
    { id: 6, code: '2001', name: 'الموردون - حسابات دائنة', type: 'خصوم', balance: 95000, status: 'نشط' },
    { id: 7, code: '2101', name: 'القروض قصيرة الأجل', type: 'خصوم', balance: 150000, status: 'نشط' },
    { id: 8, code: '3001', name: 'رأس المال', type: 'حقوق ملكية', balance: 500000, status: 'نشط' },
    { id: 9, code: '4001', name: 'إيرادات المبيعات', type: 'إيرادات', balance: 320000, status: 'نشط' },
    { id: 10, code: '5001', name: 'تكلفة البضاعة المباعة', type: 'مصروفات', balance: 180000, status: 'نشط' }
  ];

  // بيانات القيود اليومية
  const journalEntries = [
    { id: 1, date: '2024-08-01', reference: 'JE001', description: 'مبيعات نقدية', debit: 15000, credit: 15000, status: 'مرحل' },
    { id: 2, date: '2024-08-01', reference: 'JE002', description: 'شراء مواد خام', debit: 8000, credit: 8000, status: 'مرحل' },
    { id: 3, date: '2024-08-02', reference: 'JE003', description: 'دفع إيجار المكتب', debit: 5000, credit: 5000, status: 'مرحل' },
    { id: 4, date: '2024-08-02', reference: 'JE004', description: 'تحصيل من العملاء', debit: 12000, credit: 12000, status: 'مسودة' }
  ];

  // بيانات الأصول الثابتة
  const fixedAssets = [
    { id: 1, name: 'مبنى المكتب الرئيسي', category: 'مباني', cost: 800000, depreciation: 80000, netValue: 720000, depreciationRate: 2.5 },
    { id: 2, name: 'سيارات الشركة', category: 'مركبات', cost: 150000, depreciation: 45000, netValue: 105000, depreciationRate: 20 },
    { id: 3, name: 'أجهزة الكمبيوتر', category: 'معدات مكتبية', cost: 25000, depreciation: 15000, netValue: 10000, depreciationRate: 33.33 },
    { id: 4, name: 'الآلات والمعدات', category: 'معدات إنتاج', cost: 200000, depreciation: 40000, netValue: 160000, depreciationRate: 10 }
  ];

  // بيانات الذمم المدينة
  const accountsReceivable = [
    { id: 1, customer: 'شركة الأمل للتجارة', amount: 45000, dueDate: '2024-08-15', overdue: 0, status: 'مستحق' },
    { id: 2, customer: 'مؤسسة النور', amount: 32000, dueDate: '2024-08-10', overdue: 5, status: 'متأخر' },
    { id: 3, customer: 'شركة الفجر', amount: 28000, dueDate: '2024-08-20', overdue: 0, status: 'مستحق' },
    { id: 4, customer: 'مجموعة الشروق', amount: 75000, dueDate: '2024-08-05', overdue: 10, status: 'متأخر جداً' }
  ];

  // بيانات الذمم الدائنة
  const accountsPayable = [
    { id: 1, supplier: 'مورد المواد الخام', amount: 35000, dueDate: '2024-08-12', overdue: 0, status: 'مستحق' },
    { id: 2, supplier: 'شركة الخدمات اللوجستية', amount: 18000, dueDate: '2024-08-08', overdue: 7, status: 'متأخر' },
    { id: 3, supplier: 'مورد المعدات', amount: 42000, dueDate: '2024-08-18', overdue: 0, status: 'مستحق' }
  ];

  // بيانات التدفقات النقدية
  const cashFlowData = [
    { month: 'يناير', inflow: 120000, outflow: 95000, net: 25000 },
    { month: 'فبراير', inflow: 135000, outflow: 110000, net: 25000 },
    { month: 'مارس', inflow: 150000, outflow: 125000, net: 25000 },
    { month: 'أبريل', inflow: 145000, outflow: 115000, net: 30000 },
    { month: 'مايو', inflow: 160000, outflow: 130000, net: 30000 },
    { month: 'يونيو', inflow: 175000, outflow: 140000, net: 35000 }
  ];

  // بيانات الميزانية مقابل الفعلي
  const budgetData = [
    { category: 'الإيرادات', budget: 300000, actual: 320000, variance: 20000 },
    { category: 'تكلفة المبيعات', budget: 180000, actual: 175000, variance: -5000 },
    { category: 'المصروفات التشغيلية', budget: 80000, actual: 85000, variance: 5000 },
    { category: 'المصروفات الإدارية', budget: 25000, actual: 22000, variance: -3000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مستحق': return 'bg-blue-100 text-blue-800';
      case 'متأخر': return 'bg-yellow-100 text-yellow-800';
      case 'متأخر جداً': return 'bg-red-100 text-red-800';
      case 'مرحل': return 'bg-green-100 text-green-800';
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">النظام المحاسبي المتقدم</h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للحسابات والعمليات المالية</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            قيد جديد
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
                <p className="text-sm font-medium text-gray-600">إجمالي الأصول</p>
                <p className="text-2xl font-bold text-gray-900">1,400,000 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +5.2% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الخصوم</p>
                <p className="text-2xl font-bold text-gray-900">245,000 ر.س</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +2.1% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">صافي الربح</p>
                <p className="text-2xl font-bold text-gray-900">140,000 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +8.5% من الشهر الماضي
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
                <p className="text-sm font-medium text-gray-600">التدفق النقدي</p>
                <p className="text-2xl font-bold text-gray-900">35,000 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +12.3% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Banknote className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="accounts">دليل الحسابات</TabsTrigger>
          <TabsTrigger value="journal">القيود اليومية</TabsTrigger>
          <TabsTrigger value="receivables">الذمم المدينة</TabsTrigger>
          <TabsTrigger value="payables">الذمم الدائنة</TabsTrigger>
          <TabsTrigger value="assets">الأصول الثابتة</TabsTrigger>
          <TabsTrigger value="budget">الميزانيات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>التدفقات النقدية الشهرية</CardTitle>
                <CardDescription>مقارنة التدفقات الداخلة والخارجة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inflow" fill="#10b981" name="التدفقات الداخلة" />
                    <Bar dataKey="outflow" fill="#ef4444" name="التدفقات الخارجة" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الميزانية مقابل الفعلي</CardTitle>
                <CardDescription>مقارنة الأداء الفعلي مع الميزانية المخططة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.category}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">الميزانية: {item.budget.toLocaleString()} ر.س</span>
                          <span className="text-sm text-gray-600">الفعلي: {item.actual.toLocaleString()} ر.س</span>
                        </div>
                      </div>
                      <Badge className={item.variance > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {item.variance > 0 ? '+' : ''}{item.variance.toLocaleString()} ر.س
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* تنبيهات مالية */}
          <Card>
            <CardHeader>
              <CardTitle>التنبيهات المالية</CardTitle>
              <CardDescription>تنبيهات مهمة تحتاج إلى انتباه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium text-red-900">ذمم متأخرة</p>
                    <p className="text-sm text-red-700">يوجد 2 عميل لديهم مستحقات متأخرة بقيمة 107,000 ر.س</p>
                  </div>
                  <Button size="sm" variant="outline">عرض التفاصيل</Button>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-900">مدفوعات مستحقة</p>
                    <p className="text-sm text-yellow-700">يوجد 3 فواتير موردين مستحقة الدفع خلال 5 أيام</p>
                  </div>
                  <Button size="sm" variant="outline">عرض التفاصيل</Button>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">تجاوز الميزانية</p>
                    <p className="text-sm text-blue-700">المصروفات التشغيلية تجاوزت الميزانية بنسبة 6.25%</p>
                  </div>
                  <Button size="sm" variant="outline">عرض التفاصيل</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* دليل الحسابات */}
        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>دليل الحسابات</CardTitle>
                  <CardDescription>إدارة شاملة لجميع الحسابات المالية</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    حساب جديد
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
                  <Input placeholder="البحث في الحسابات..." className="w-full" />
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
                      <th className="text-right p-3 font-medium">رمز الحساب</th>
                      <th className="text-right p-3 font-medium">اسم الحساب</th>
                      <th className="text-right p-3 font-medium">نوع الحساب</th>
                      <th className="text-right p-3 font-medium">الرصيد</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsData.map((account) => (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{account.code}</td>
                        <td className="p-3 font-medium">{account.name}</td>
                        <td className="p-3">{account.type}</td>
                        <td className="p-3 font-mono">{account.balance.toLocaleString()} ر.س</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(account.status)}>
                            {account.status}
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
                              <Trash2 className="w-4 h-4" />
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

        {/* القيود اليومية */}
        <TabsContent value="journal" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>القيود اليومية</CardTitle>
                  <CardDescription>إدارة جميع القيود المحاسبية</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    قيد جديد
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">التاريخ</th>
                      <th className="text-right p-3 font-medium">المرجع</th>
                      <th className="text-right p-3 font-medium">الوصف</th>
                      <th className="text-right p-3 font-medium">المدين</th>
                      <th className="text-right p-3 font-medium">الدائن</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {journalEntries.map((entry) => (
                      <tr key={entry.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{entry.date}</td>
                        <td className="p-3 font-mono">{entry.reference}</td>
                        <td className="p-3">{entry.description}</td>
                        <td className="p-3 font-mono">{entry.debit.toLocaleString()} ر.س</td>
                        <td className="p-3 font-mono">{entry.credit.toLocaleString()} ر.س</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(entry.status)}>
                            {entry.status}
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

        {/* الذمم المدينة */}
        <TabsContent value="receivables" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الذمم المدينة</CardTitle>
                  <CardDescription>متابعة المستحقات من العملاء</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  فاتورة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي المستحقات</p>
                      <p className="text-2xl font-bold text-blue-600">180,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">المستحقات المتأخرة</p>
                      <p className="text-2xl font-bold text-red-600">107,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متوسط فترة التحصيل</p>
                      <p className="text-2xl font-bold text-green-600">25 يوم</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">العميل</th>
                      <th className="text-right p-3 font-medium">المبلغ</th>
                      <th className="text-right p-3 font-medium">تاريخ الاستحقاق</th>
                      <th className="text-right p-3 font-medium">أيام التأخير</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsReceivable.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{item.customer}</td>
                        <td className="p-3 font-mono">{item.amount.toLocaleString()} ر.س</td>
                        <td className="p-3">{item.dueDate}</td>
                        <td className="p-3">{item.overdue > 0 ? `${item.overdue} أيام` : '-'}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">تذكير</Button>
                            <Button size="sm" variant="outline">تحصيل</Button>
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

        {/* الذمم الدائنة */}
        <TabsContent value="payables" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الذمم الدائنة</CardTitle>
                  <CardDescription>متابعة المستحقات للموردين</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  دفعة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي المستحقات</p>
                      <p className="text-2xl font-bold text-red-600">95,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">مستحقة خلال 7 أيام</p>
                      <p className="text-2xl font-bold text-yellow-600">53,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متأخرة الدفع</p>
                      <p className="text-2xl font-bold text-red-600">18,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">المورد</th>
                      <th className="text-right p-3 font-medium">المبلغ</th>
                      <th className="text-right p-3 font-medium">تاريخ الاستحقاق</th>
                      <th className="text-right p-3 font-medium">أيام التأخير</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsPayable.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{item.supplier}</td>
                        <td className="p-3 font-mono">{item.amount.toLocaleString()} ر.س</td>
                        <td className="p-3">{item.dueDate}</td>
                        <td className="p-3">{item.overdue > 0 ? `${item.overdue} أيام` : '-'}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm">دفع</Button>
                            <Button size="sm" variant="outline">تأجيل</Button>
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

        {/* الأصول الثابتة */}
        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الأصول الثابتة</CardTitle>
                  <CardDescription>متابعة الأصول والإهلاك</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  أصل جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي التكلفة</p>
                      <p className="text-2xl font-bold text-blue-600">1,175,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">الإهلاك المتراكم</p>
                      <p className="text-2xl font-bold text-red-600">180,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">القيمة الدفترية</p>
                      <p className="text-2xl font-bold text-green-600">995,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إهلاك هذا الشهر</p>
                      <p className="text-2xl font-bold text-yellow-600">15,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم الأصل</th>
                      <th className="text-right p-3 font-medium">الفئة</th>
                      <th className="text-right p-3 font-medium">التكلفة</th>
                      <th className="text-right p-3 font-medium">الإهلاك المتراكم</th>
                      <th className="text-right p-3 font-medium">القيمة الدفترية</th>
                      <th className="text-right p-3 font-medium">معدل الإهلاك</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fixedAssets.map((asset) => (
                      <tr key={asset.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{asset.name}</td>
                        <td className="p-3">{asset.category}</td>
                        <td className="p-3 font-mono">{asset.cost.toLocaleString()} ر.س</td>
                        <td className="p-3 font-mono">{asset.depreciation.toLocaleString()} ر.س</td>
                        <td className="p-3 font-mono">{asset.netValue.toLocaleString()} ر.س</td>
                        <td className="p-3">{asset.depreciationRate}%</td>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الميزانيات */}
        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الميزانيات</CardTitle>
                  <CardDescription>التخطيط المالي ومراقبة الأداء</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  ميزانية جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">أداء الميزانية - 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={budgetData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="budget" fill="#3b82f6" name="الميزانية" />
                        <Bar dataKey="actual" fill="#10b981" name="الفعلي" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">نسبة تحقيق الإيرادات</p>
                          <p className="text-2xl font-bold text-green-600">106.7%</p>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">نسبة المصروفات</p>
                          <p className="text-2xl font-bold text-yellow-600">103.1%</p>
                        </div>
                        <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">صافي الربح المحقق</p>
                          <p className="text-2xl font-bold text-blue-600">113,000 ر.س</p>
                        </div>
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAccounting;

