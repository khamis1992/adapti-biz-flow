import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Award,
  Clipboard,
  Settings,
  Activity,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Package
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const QualityManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية لفحوصات الجودة
  const qualityInspections = [
    {
      id: 1,
      inspectionNumber: 'QI-2024-001',
      product: 'قطع غيار محرك - نوع A',
      batch: 'BATCH-001',
      quantity: 100,
      inspectedQuantity: 100,
      passedQuantity: 95,
      failedQuantity: 5,
      inspectionDate: '2024-08-05',
      inspector: 'أحمد محمد',
      status: 'مكتمل',
      defectRate: 5,
      criteria: 'فحص بصري، قياسات دقة'
    },
    {
      id: 2,
      inspectionNumber: 'QI-2024-002',
      product: 'فلاتر هواء - نوع B',
      batch: 'BATCH-002',
      quantity: 200,
      inspectedQuantity: 50,
      passedQuantity: 48,
      failedQuantity: 2,
      inspectionDate: '2024-08-05',
      inspector: 'سارة أحمد',
      status: 'قيد الفحص',
      defectRate: 4,
      criteria: 'اختبار تدفق الهواء، فحص المواد'
    },
    {
      id: 3,
      inspectionNumber: 'QI-2024-003',
      product: 'أجزاء ناقل الحركة',
      batch: 'BATCH-003',
      quantity: 50,
      inspectedQuantity: 50,
      passedQuantity: 50,
      failedQuantity: 0,
      inspectionDate: '2024-08-04',
      inspector: 'محمد علي',
      status: 'مكتمل',
      defectRate: 0,
      criteria: 'اختبار قوة التحمل، قياسات دقة'
    }
  ];

  // بيانات العيوب والمشاكل
  const defects = [
    {
      id: 1,
      defectCode: 'DEF-001',
      description: 'خدوش على السطح',
      category: 'عيب بصري',
      severity: 'متوسط',
      frequency: 15,
      product: 'قطع غيار محرك',
      rootCause: 'مشكلة في عملية التشطيب',
      corrective: 'تحسين عملية التشطيب وإضافة طبقة حماية',
      status: 'قيد المعالجة'
    },
    {
      id: 2,
      defectCode: 'DEF-002',
      description: 'أبعاد غير مطابقة للمواصفات',
      category: 'عيب قياسي',
      severity: 'عالي',
      frequency: 8,
      product: 'فلاتر هواء',
      rootCause: 'عدم معايرة المعدات',
      corrective: 'معايرة دورية للمعدات وتدريب المشغلين',
      status: 'مغلق'
    },
    {
      id: 3,
      defectCode: 'DEF-003',
      description: 'تسرب في الختم',
      category: 'عيب وظيفي',
      severity: 'عالي',
      frequency: 3,
      product: 'أجزاء ناقل الحركة',
      rootCause: 'جودة المواد الخام',
      corrective: 'تغيير المورد وتحسين معايير الاستلام',
      status: 'جديد'
    }
  ];

  // بيانات معايير الجودة
  const qualityStandards = [
    {
      id: 1,
      standardCode: 'QS-001',
      name: 'معيار فحص قطع غيار المحرك',
      category: 'قطع غيار',
      version: '2.1',
      lastUpdated: '2024-07-15',
      status: 'نشط',
      criteria: [
        { parameter: 'الأبعاد', tolerance: '±0.1 مم', method: 'قياس بالمقياس الرقمي' },
        { parameter: 'خشونة السطح', tolerance: 'Ra ≤ 1.6', method: 'فحص بصري ولمسي' },
        { parameter: 'صلابة المادة', tolerance: '45-50 HRC', method: 'اختبار الصلابة' }
      ]
    },
    {
      id: 2,
      standardCode: 'QS-002',
      name: 'معيار فحص الفلاتر',
      category: 'فلاتر',
      version: '1.8',
      lastUpdated: '2024-06-20',
      status: 'نشط',
      criteria: [
        { parameter: 'كفاءة الفلترة', tolerance: '≥ 95%', method: 'اختبار تدفق الهواء' },
        { parameter: 'مقاومة الضغط', tolerance: '≤ 2.5 kPa', method: 'اختبار الضغط' },
        { parameter: 'سلامة الإطار', tolerance: 'لا توجد تشققات', method: 'فحص بصري' }
      ]
    }
  ];

  // بيانات شهادات الجودة
  const certificates = [
    {
      id: 1,
      certificateNumber: 'CERT-2024-001',
      product: 'قطع غيار محرك - نوع A',
      batch: 'BATCH-001',
      issueDate: '2024-08-05',
      expiryDate: '2024-11-05',
      issuedBy: 'أحمد محمد - مفتش الجودة',
      status: 'صالح',
      testResults: 'جميع الاختبارات مطابقة للمواصفات'
    },
    {
      id: 2,
      certificateNumber: 'CERT-2024-002',
      product: 'أجزاء ناقل الحركة',
      batch: 'BATCH-003',
      issueDate: '2024-08-04',
      expiryDate: '2024-12-04',
      issuedBy: 'محمد علي - مفتش الجودة',
      status: 'صالح',
      testResults: 'اجتياز جميع اختبارات الجودة بنسبة 100%'
    }
  ];

  // بيانات تحليل الجودة
  const qualityAnalytics = [
    { month: 'يناير', defectRate: 3.2, passRate: 96.8, inspections: 45 },
    { month: 'فبراير', defectRate: 2.8, passRate: 97.2, inspections: 52 },
    { month: 'مارس', defectRate: 3.5, passRate: 96.5, inspections: 48 },
    { month: 'أبريل', defectRate: 2.1, passRate: 97.9, inspections: 55 },
    { month: 'مايو', defectRate: 1.9, passRate: 98.1, inspections: 60 },
    { month: 'يونيو', defectRate: 2.3, passRate: 97.7, inspections: 58 }
  ];

  // بيانات توزيع العيوب
  const defectDistribution = [
    { category: 'عيوب بصرية', count: 25, percentage: 45 },
    { category: 'عيوب قياسية', count: 18, percentage: 32 },
    { category: 'عيوب وظيفية', count: 8, percentage: 15 },
    { category: 'عيوب مواد', count: 4, percentage: 8 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'قيد الفحص': return 'bg-blue-100 text-blue-800';
      case 'فشل': return 'bg-red-100 text-red-800';
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'غير نشط': return 'bg-gray-100 text-gray-800';
      case 'صالح': return 'bg-green-100 text-green-800';
      case 'منتهي الصلاحية': return 'bg-red-100 text-red-800';
      case 'قيد المعالجة': return 'bg-yellow-100 text-yellow-800';
      case 'مغلق': return 'bg-green-100 text-green-800';
      case 'جديد': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'عالي': return 'bg-red-100 text-red-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'منخفض': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculatePassRate = (passed: number, total: number) => {
    return Math.round((passed / total) * 100);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الجودة</h1>
          <p className="text-gray-600 mt-2">نظام شامل لضمان ومراقبة جودة المنتجات</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            فحص جودة جديد
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 ml-2" />
            معيار جودة جديد
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
                <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
                <p className="text-2xl font-bold text-gray-900">97.7%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +0.8% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل العيوب</p>
                <p className="text-2xl font-bold text-gray-900">2.3%</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 ml-1" />
                  -0.4% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">فحوصات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Clipboard className="w-3 h-3 ml-1" />
                  3 فحوصات قيد التنفيذ
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clipboard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">شهادات صالحة</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Award className="w-3 h-3 ml-1" />
                  5 شهادات جديدة
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="inspections">فحوصات الجودة</TabsTrigger>
          <TabsTrigger value="defects">العيوب والمشاكل</TabsTrigger>
          <TabsTrigger value="standards">معايير الجودة</TabsTrigger>
          <TabsTrigger value="certificates">الشهادات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه معدل النجاح</CardTitle>
                <CardDescription>تطور معدل نجاح فحوصات الجودة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={qualityAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="passRate" stroke="#10b981" name="معدل النجاح %" />
                    <Line type="monotone" dataKey="defectRate" stroke="#ef4444" name="معدل العيوب %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع العيوب حسب الفئة</CardTitle>
                <CardDescription>تصنيف العيوب المكتشفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {defectDistribution.map((defect, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{defect.category}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${defect.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-red-600">{defect.count}</p>
                        <p className="text-sm text-gray-600">{defect.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* فحوصات حديثة */}
          <Card>
            <CardHeader>
              <CardTitle>الفحوصات الحديثة</CardTitle>
              <CardDescription>آخر فحوصات الجودة المنجزة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {qualityInspections.slice(0, 3).map((inspection) => (
                  <div key={inspection.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{inspection.inspectionNumber}</h3>
                          <p className="text-gray-600">{inspection.product}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>المفتش: {inspection.inspector}</span>
                            <span>التاريخ: {inspection.inspectionDate}</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <Badge className={getStatusColor(inspection.status)}>
                            {inspection.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            معدل النجاح: {calculatePassRate(inspection.passedQuantity, inspection.inspectedQuantity)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* فحوصات الجودة */}
        <TabsContent value="inspections" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>فحوصات الجودة</CardTitle>
                  <CardDescription>إدارة جميع فحوصات الجودة</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    فحص جديد
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
                  <Input placeholder="البحث في الفحوصات..." className="w-full" />
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
                      <th className="text-right p-3 font-medium">رقم الفحص</th>
                      <th className="text-right p-3 font-medium">المنتج</th>
                      <th className="text-right p-3 font-medium">الدفعة</th>
                      <th className="text-right p-3 font-medium">الكمية</th>
                      <th className="text-right p-3 font-medium">نجح</th>
                      <th className="text-right p-3 font-medium">فشل</th>
                      <th className="text-right p-3 font-medium">معدل النجاح</th>
                      <th className="text-right p-3 font-medium">التاريخ</th>
                      <th className="text-right p-3 font-medium">المفتش</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualityInspections.map((inspection) => (
                      <tr key={inspection.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{inspection.inspectionNumber}</td>
                        <td className="p-3 font-medium">{inspection.product}</td>
                        <td className="p-3 font-mono">{inspection.batch}</td>
                        <td className="p-3 text-center">{inspection.inspectedQuantity}</td>
                        <td className="p-3 text-center text-green-600 font-medium">{inspection.passedQuantity}</td>
                        <td className="p-3 text-center text-red-600 font-medium">{inspection.failedQuantity}</td>
                        <td className="p-3 text-center">
                          <span className={`font-medium ${
                            calculatePassRate(inspection.passedQuantity, inspection.inspectedQuantity) >= 95 
                              ? 'text-green-600' 
                              : calculatePassRate(inspection.passedQuantity, inspection.inspectedQuantity) >= 90 
                                ? 'text-yellow-600' 
                                : 'text-red-600'
                          }`}>
                            {calculatePassRate(inspection.passedQuantity, inspection.inspectedQuantity)}%
                          </span>
                        </td>
                        <td className="p-3">{inspection.inspectionDate}</td>
                        <td className="p-3">{inspection.inspector}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(inspection.status)}>
                            {inspection.status}
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

        {/* العيوب والمشاكل */}
        <TabsContent value="defects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>العيوب والمشاكل</CardTitle>
                  <CardDescription>تتبع ومعالجة عيوب الجودة</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  تسجيل عيب جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">عيوب جديدة</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">قيد المعالجة</p>
                      <p className="text-2xl font-bold text-yellow-600">5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">مغلقة</p>
                      <p className="text-2xl font-bold text-green-600">18</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">معدل الحل</p>
                      <p className="text-2xl font-bold text-blue-600">85%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {defects.map((defect) => (
                  <Card key={defect.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{defect.defectCode}</h3>
                            <Badge className={getSeverityColor(defect.severity)}>
                              {defect.severity}
                            </Badge>
                            <Badge className={getStatusColor(defect.status)}>
                              {defect.status}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-2">{defect.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p><span className="font-medium">الفئة:</span> {defect.category}</p>
                              <p><span className="font-medium">المنتج:</span> {defect.product}</p>
                              <p><span className="font-medium">التكرار:</span> {defect.frequency} مرة</p>
                            </div>
                            <div>
                              <p><span className="font-medium">السبب الجذري:</span> {defect.rootCause}</p>
                              <p><span className="font-medium">الإجراء التصحيحي:</span> {defect.corrective}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* معايير الجودة */}
        <TabsContent value="standards" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>معايير الجودة</CardTitle>
                  <CardDescription>إدارة معايير ومواصفات الجودة</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  معيار جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {qualityStandards.map((standard) => (
                  <Card key={standard.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{standard.name}</CardTitle>
                          <CardDescription>
                            كود المعيار: {standard.standardCode} | الإصدار: {standard.version}
                          </CardDescription>
                        </div>
                        <div className="text-left">
                          <Badge className={getStatusColor(standard.status)}>
                            {standard.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            آخر تحديث: {standard.lastUpdated}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-2 font-medium">المعيار</th>
                              <th className="text-right p-2 font-medium">التفاوت المسموح</th>
                              <th className="text-right p-2 font-medium">طريقة الفحص</th>
                            </tr>
                          </thead>
                          <tbody>
                            {standard.criteria.map((criterion, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2 font-medium">{criterion.parameter}</td>
                                <td className="p-2">{criterion.tolerance}</td>
                                <td className="p-2">{criterion.method}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 ml-2" />
                          طباعة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الشهادات */}
        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>شهادات الجودة</CardTitle>
                  <CardDescription>إدارة شهادات مطابقة الجودة</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إصدار شهادة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">شهادات صالحة</p>
                      <p className="text-2xl font-bold text-green-600">28</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">تنتهي قريباً</p>
                      <p className="text-2xl font-bold text-yellow-600">5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">منتهية الصلاحية</p>
                      <p className="text-2xl font-bold text-red-600">2</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي الشهادات</p>
                      <p className="text-2xl font-bold text-blue-600">35</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الشهادة</th>
                      <th className="text-right p-3 font-medium">المنتج</th>
                      <th className="text-right p-3 font-medium">الدفعة</th>
                      <th className="text-right p-3 font-medium">تاريخ الإصدار</th>
                      <th className="text-right p-3 font-medium">تاريخ الانتهاء</th>
                      <th className="text-right p-3 font-medium">المُصدر</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((certificate) => (
                      <tr key={certificate.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{certificate.certificateNumber}</td>
                        <td className="p-3 font-medium">{certificate.product}</td>
                        <td className="p-3 font-mono">{certificate.batch}</td>
                        <td className="p-3">{certificate.issueDate}</td>
                        <td className="p-3">{certificate.expiryDate}</td>
                        <td className="p-3">{certificate.issuedBy}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(certificate.status)}>
                            {certificate.status}
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

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>عدد الفحوصات الشهرية</CardTitle>
                <CardDescription>تطور عدد فحوصات الجودة عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={qualityAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inspections" fill="#3b82f6" name="عدد الفحوصات" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء مفتشي الجودة</CardTitle>
                <CardDescription>إحصائيات أداء فريق الجودة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">أحمد محمد</p>
                      <p className="text-sm text-gray-600">مفتش جودة أول</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-green-600">98.5%</p>
                      <p className="text-xs text-gray-500">معدل دقة الفحص</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">سارة أحمد</p>
                      <p className="text-sm text-gray-600">مفتش جودة</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-green-600">96.8%</p>
                      <p className="text-xs text-gray-500">معدل دقة الفحص</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">محمد علي</p>
                      <p className="text-sm text-gray-600">مفتش جودة</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-green-600">97.2%</p>
                      <p className="text-xs text-gray-500">معدل دقة الفحص</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>ملخص شامل لأداء الجودة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">97.7%</p>
                  <p className="text-sm text-gray-600">معدل النجاح الإجمالي</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">2.3%</p>
                  <p className="text-sm text-gray-600">معدل العيوب</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">58</p>
                  <p className="text-sm text-gray-600">فحوصات هذا الشهر</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">85%</p>
                  <p className="text-sm text-gray-600">معدل حل المشاكل</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityManagement;

