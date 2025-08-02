import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Cog, 
  Package, 
  Clock, 
  Users,
  TrendingUp,
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
  Play,
  Pause,
  Square,
  BarChart3,
  PieChart,
  Calendar,
  FileText,
  Settings,
  Wrench,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const Manufacturing = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية لأوامر الإنتاج
  const productionOrders = [
    {
      id: 1,
      orderNumber: 'MO-2024-001',
      product: 'قطع غيار محرك - نوع A',
      quantity: 500,
      quantityProduced: 320,
      startDate: '2024-08-01',
      dueDate: '2024-08-15',
      status: 'قيد الإنتاج',
      priority: 'عالية',
      workCenter: 'خط الإنتاج 1',
      supervisor: 'أحمد محمد',
      estimatedHours: 120,
      actualHours: 85
    },
    {
      id: 2,
      orderNumber: 'MO-2024-002',
      product: 'فلاتر هواء - نوع B',
      quantity: 1000,
      quantityProduced: 1000,
      startDate: '2024-07-25',
      dueDate: '2024-08-10',
      status: 'مكتمل',
      priority: 'متوسطة',
      workCenter: 'خط الإنتاج 2',
      supervisor: 'سارة أحمد',
      estimatedHours: 80,
      actualHours: 75
    },
    {
      id: 3,
      orderNumber: 'MO-2024-003',
      product: 'أجزاء ناقل الحركة',
      quantity: 200,
      quantityProduced: 0,
      startDate: '2024-08-10',
      dueDate: '2024-08-25',
      status: 'مجدول',
      priority: 'منخفضة',
      workCenter: 'خط الإنتاج 3',
      supervisor: 'محمد علي',
      estimatedHours: 160,
      actualHours: 0
    }
  ];

  // بيانات مراكز العمل
  const workCenters = [
    {
      id: 1,
      name: 'خط الإنتاج 1',
      type: 'تصنيع رئيسي',
      capacity: 100,
      currentLoad: 75,
      efficiency: 92,
      status: 'نشط',
      operators: 8,
      maintenanceDate: '2024-08-20',
      location: 'المبنى A - الطابق الأول'
    },
    {
      id: 2,
      name: 'خط الإنتاج 2',
      type: 'تجميع',
      capacity: 80,
      currentLoad: 60,
      efficiency: 88,
      status: 'نشط',
      operators: 6,
      maintenanceDate: '2024-08-25',
      location: 'المبنى A - الطابق الثاني'
    },
    {
      id: 3,
      name: 'خط الإنتاج 3',
      type: 'تشطيب',
      capacity: 60,
      currentLoad: 20,
      efficiency: 85,
      status: 'صيانة',
      operators: 4,
      maintenanceDate: '2024-08-15',
      location: 'المبنى B - الطابق الأول'
    }
  ];

  // بيانات قوائم المواد (BOM)
  const billOfMaterials = [
    {
      id: 1,
      productCode: 'ENG-001',
      productName: 'قطع غيار محرك - نوع A',
      version: '1.2',
      status: 'نشط',
      totalCost: 450,
      components: [
        { code: 'MAT-001', name: 'معدن خام', quantity: 2.5, unit: 'كجم', cost: 120 },
        { code: 'MAT-002', name: 'مواد كيميائية', quantity: 0.5, unit: 'لتر', cost: 80 },
        { code: 'MAT-003', name: 'مكونات إلكترونية', quantity: 3, unit: 'قطعة', cost: 250 }
      ]
    },
    {
      id: 2,
      productCode: 'FIL-001',
      productName: 'فلاتر هواء - نوع B',
      version: '2.0',
      status: 'نشط',
      totalCost: 85,
      components: [
        { code: 'MAT-004', name: 'مواد فلترة', quantity: 1, unit: 'متر', cost: 45 },
        { code: 'MAT-005', name: 'إطار معدني', quantity: 1, unit: 'قطعة', cost: 25 },
        { code: 'MAT-006', name: 'مواد لاصقة', quantity: 0.1, unit: 'كجم', cost: 15 }
      ]
    }
  ];

  // بيانات مسارات الإنتاج
  const routings = [
    {
      id: 1,
      productCode: 'ENG-001',
      routingName: 'مسار إنتاج قطع غيار المحرك',
      operations: [
        { step: 1, operation: 'تحضير المواد', workCenter: 'خط الإنتاج 1', setupTime: 30, runTime: 45 },
        { step: 2, operation: 'التشكيل', workCenter: 'خط الإنتاج 1', setupTime: 15, runTime: 60 },
        { step: 3, operation: 'المعالجة الحرارية', workCenter: 'خط الإنتاج 2', setupTime: 45, runTime: 120 },
        { step: 4, operation: 'التشطيب', workCenter: 'خط الإنتاج 3', setupTime: 20, runTime: 30 },
        { step: 5, operation: 'فحص الجودة', workCenter: 'مركز الجودة', setupTime: 10, runTime: 15 }
      ]
    }
  ];

  // بيانات تحليل الإنتاج
  const productionAnalytics = [
    { month: 'يناير', planned: 2500, actual: 2350, efficiency: 94 },
    { month: 'فبراير', planned: 2800, actual: 2650, efficiency: 95 },
    { month: 'مارس', planned: 3000, actual: 2850, efficiency: 95 },
    { month: 'أبريل', planned: 2700, actual: 2430, efficiency: 90 },
    { month: 'مايو', planned: 3200, actual: 3040, efficiency: 95 },
    { month: 'يونيو', planned: 3500, actual: 3325, efficiency: 95 }
  ];

  // بيانات كفاءة مراكز العمل
  const workCenterEfficiency = [
    { name: 'خط الإنتاج 1', efficiency: 92, utilization: 75, oee: 69 },
    { name: 'خط الإنتاج 2', efficiency: 88, utilization: 60, oee: 53 },
    { name: 'خط الإنتاج 3', efficiency: 85, utilization: 20, oee: 17 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'قيد الإنتاج': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'مجدول': return 'bg-yellow-100 text-yellow-800';
      case 'متأخر': return 'bg-red-100 text-red-800';
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'صيانة': return 'bg-orange-100 text-orange-800';
      case 'متوقف': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'bg-red-100 text-red-800';
      case 'متوسطة': return 'bg-yellow-100 text-yellow-800';
      case 'منخفضة': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (produced: number, total: number) => {
    return Math.round((produced / total) * 100);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة التصنيع</h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة العمليات الصناعية والإنتاج</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            أمر إنتاج جديد
          </Button>
          <Button variant="outline">
            <Factory className="w-4 h-4 ml-2" />
            مركز عمل جديد
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
                <p className="text-sm font-medium text-gray-600">أوامر الإنتاج النشطة</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Factory className="w-3 h-3 ml-1" />
                  3 أوامر جديدة اليوم
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Factory className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">كفاءة الإنتاج</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +2.5% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مراكز العمل النشطة</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Cog className="w-3 h-3 ml-1" />
                  من أصل 10 مراكز
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Cog className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الإنتاج اليومي</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Package className="w-3 h-3 ml-1" />
                  قطعة اليوم
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="orders">أوامر الإنتاج</TabsTrigger>
          <TabsTrigger value="workcenters">مراكز العمل</TabsTrigger>
          <TabsTrigger value="bom">قوائم المواد</TabsTrigger>
          <TabsTrigger value="routing">مسارات الإنتاج</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أداء الإنتاج الشهري</CardTitle>
                <CardDescription>مقارنة الإنتاج المخطط مع الفعلي</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productionAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="planned" fill="#3b82f6" name="مخطط" />
                    <Bar dataKey="actual" fill="#10b981" name="فعلي" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>كفاءة مراكز العمل</CardTitle>
                <CardDescription>مؤشر الفعالية الإجمالية للمعدات (OEE)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workCenterEfficiency.map((center, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{center.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>الكفاءة: {center.efficiency}%</span>
                          <span>الاستخدام: {center.utilization}%</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className={`text-lg font-bold ${center.oee >= 60 ? 'text-green-600' : center.oee >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {center.oee}%
                        </p>
                        <p className="text-xs text-gray-500">OEE</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* أوامر الإنتاج النشطة */}
          <Card>
            <CardHeader>
              <CardTitle>أوامر الإنتاج النشطة</CardTitle>
              <CardDescription>الأوامر قيد التنفيذ حالياً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {productionOrders.filter(order => order.status === 'قيد الإنتاج').map((order) => (
                  <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Factory className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{order.orderNumber}</h3>
                          <p className="text-gray-600">{order.product}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>مركز العمل: {order.workCenter}</span>
                            <span>المشرف: {order.supervisor}</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.quantityProduced} / {order.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>التقدم</span>
                          <span>{calculateProgress(order.quantityProduced, order.quantity)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${calculateProgress(order.quantityProduced, order.quantity)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* أوامر الإنتاج */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>أوامر الإنتاج</CardTitle>
                  <CardDescription>إدارة جميع أوامر الإنتاج</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    أمر جديد
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
                  <Input placeholder="البحث في الأوامر..." className="w-full" />
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
                      <th className="text-right p-3 font-medium">رقم الأمر</th>
                      <th className="text-right p-3 font-medium">المنتج</th>
                      <th className="text-right p-3 font-medium">الكمية</th>
                      <th className="text-right p-3 font-medium">المنتج</th>
                      <th className="text-right p-3 font-medium">التقدم</th>
                      <th className="text-right p-3 font-medium">تاريخ البدء</th>
                      <th className="text-right p-3 font-medium">تاريخ الانتهاء</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الأولوية</th>
                      <th className="text-right p-3 font-medium">مركز العمل</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productionOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{order.orderNumber}</td>
                        <td className="p-3 font-medium">{order.product}</td>
                        <td className="p-3 text-center">{order.quantity}</td>
                        <td className="p-3 text-center">{order.quantityProduced}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {calculateProgress(order.quantityProduced, order.quantity)}%
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${calculateProgress(order.quantityProduced, order.quantity)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{order.startDate}</td>
                        <td className="p-3">{order.dueDate}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority}
                          </Badge>
                        </td>
                        <td className="p-3">{order.workCenter}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Play className="w-4 h-4" />
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

        {/* مراكز العمل */}
        <TabsContent value="workcenters" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>مراكز العمل</CardTitle>
                  <CardDescription>إدارة ومراقبة مراكز العمل والمعدات</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  مركز عمل جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workCenters.map((center) => (
                  <Card key={center.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{center.name}</h3>
                          <p className="text-sm text-gray-600">{center.type}</p>
                          <p className="text-xs text-gray-500 mt-1">{center.location}</p>
                        </div>
                        <Badge className={getStatusColor(center.status)}>
                          {center.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الطاقة:</span>
                          <span className="font-medium">{center.capacity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الحمولة الحالية:</span>
                          <span className="font-medium">{center.currentLoad}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الكفاءة:</span>
                          <span className="font-medium">{center.efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">المشغلون:</span>
                          <span className="font-medium">{center.operators}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الصيانة القادمة:</span>
                          <span className="font-medium">{center.maintenanceDate}</span>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>استخدام الطاقة</span>
                            <span>{center.currentLoad}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                center.currentLoad >= 80 ? 'bg-red-600' : 
                                center.currentLoad >= 60 ? 'bg-yellow-600' : 'bg-green-600'
                              }`}
                              style={{ width: `${center.currentLoad}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Wrench className="w-4 h-4 ml-2" />
                          صيانة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* قوائم المواد */}
        <TabsContent value="bom" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قوائم المواد (BOM)</CardTitle>
                  <CardDescription>إدارة مكونات ومواد المنتجات</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  قائمة مواد جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {billOfMaterials.map((bom) => (
                  <Card key={bom.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{bom.productName}</CardTitle>
                          <CardDescription>
                            كود المنتج: {bom.productCode} | الإصدار: {bom.version}
                          </CardDescription>
                        </div>
                        <div className="text-left">
                          <Badge className={getStatusColor(bom.status)}>
                            {bom.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            التكلفة الإجمالية: {bom.totalCost} ر.س
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-2 font-medium">كود المادة</th>
                              <th className="text-right p-2 font-medium">اسم المادة</th>
                              <th className="text-right p-2 font-medium">الكمية</th>
                              <th className="text-right p-2 font-medium">الوحدة</th>
                              <th className="text-right p-2 font-medium">التكلفة</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bom.components.map((component, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2 font-mono">{component.code}</td>
                                <td className="p-2">{component.name}</td>
                                <td className="p-2 text-center">{component.quantity}</td>
                                <td className="p-2 text-center">{component.unit}</td>
                                <td className="p-2 font-mono">{component.cost} ر.س</td>
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

        {/* مسارات الإنتاج */}
        <TabsContent value="routing" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>مسارات الإنتاج</CardTitle>
                  <CardDescription>تحديد خطوات وعمليات الإنتاج</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  مسار جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {routings.map((routing) => (
                  <Card key={routing.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{routing.routingName}</CardTitle>
                      <CardDescription>
                        كود المنتج: {routing.productCode}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {routing.operations.map((operation, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                              {operation.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{operation.operation}</h4>
                              <p className="text-sm text-gray-600">مركز العمل: {operation.workCenter}</p>
                            </div>
                            <div className="text-left">
                              <div className="flex gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">وقت التحضير</p>
                                  <p className="font-medium">{operation.setupTime} دقيقة</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">وقت التشغيل</p>
                                  <p className="font-medium">{operation.runTime} دقيقة</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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
                          <Play className="w-4 h-4 ml-2" />
                          بدء الإنتاج
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
                <CardTitle>اتجاه كفاءة الإنتاج</CardTitle>
                <CardDescription>تطور كفاءة الإنتاج عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productionAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#10b981" name="الكفاءة %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع أوامر الإنتاج</CardTitle>
                <CardDescription>حالة أوامر الإنتاج الحالية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 bg-blue-600 rounded"></div>
                      <span>قيد الإنتاج</span>
                    </div>
                    <span className="font-bold">5 أوامر</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 bg-green-600 rounded"></div>
                      <span>مكتمل</span>
                    </div>
                    <span className="font-bold">8 أوامر</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 bg-yellow-600 rounded"></div>
                      <span>مجدول</span>
                    </div>
                    <span className="font-bold">3 أوامر</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 bg-red-600 rounded"></div>
                      <span>متأخر</span>
                    </div>
                    <span className="font-bold">1 أمر</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>ملخص شامل لأداء التصنيع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">94%</p>
                  <p className="text-sm text-gray-600">كفاءة الإنتاج الإجمالية</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">68%</p>
                  <p className="text-sm text-gray-600">متوسط OEE</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">1,250</p>
                  <p className="text-sm text-gray-600">الإنتاج اليومي</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">2.5%</p>
                  <p className="text-sm text-gray-600">معدل الخردة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Manufacturing;

