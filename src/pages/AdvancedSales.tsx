import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package,
  Truck,
  Target,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedSales = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية لأوامر المبيعات
  const salesOrders = [
    { 
      id: 1, 
      orderNumber: 'SO-2024-001', 
      customer: 'شركة الأمل للتجارة',
      date: '2024-08-01',
      dueDate: '2024-08-15',
      amount: 45000,
      status: 'مؤكد',
      items: 5,
      salesperson: 'أحمد محمد',
      priority: 'عالية'
    },
    { 
      id: 2, 
      orderNumber: 'SO-2024-002', 
      customer: 'مؤسسة النور',
      date: '2024-08-02',
      dueDate: '2024-08-20',
      amount: 32000,
      status: 'قيد التجهيز',
      items: 3,
      salesperson: 'سارة أحمد',
      priority: 'متوسطة'
    },
    { 
      id: 3, 
      orderNumber: 'SO-2024-003', 
      customer: 'شركة الفجر',
      date: '2024-08-03',
      dueDate: '2024-08-18',
      amount: 28000,
      status: 'مشحون',
      items: 4,
      salesperson: 'محمد علي',
      priority: 'منخفضة'
    },
    { 
      id: 4, 
      orderNumber: 'SO-2024-004', 
      customer: 'مجموعة الشروق',
      date: '2024-08-04',
      dueDate: '2024-08-25',
      amount: 75000,
      status: 'مسودة',
      items: 8,
      salesperson: 'فاطمة خالد',
      priority: 'عالية'
    }
  ];

  // بيانات العملاء المحتملين
  const leads = [
    {
      id: 1,
      name: 'شركة التقنية المتقدمة',
      contact: 'خالد السعد',
      phone: '+966501234567',
      email: 'khalid@tech.com',
      source: 'موقع إلكتروني',
      status: 'جديد',
      value: 85000,
      probability: 30,
      assignedTo: 'أحمد محمد',
      lastContact: '2024-08-01'
    },
    {
      id: 2,
      name: 'مؤسسة الابتكار',
      contact: 'نورا العلي',
      phone: '+966507654321',
      email: 'nora@innovation.com',
      source: 'إحالة',
      status: 'مؤهل',
      value: 120000,
      probability: 60,
      assignedTo: 'سارة أحمد',
      lastContact: '2024-08-03'
    },
    {
      id: 3,
      name: 'شركة المستقبل',
      contact: 'عبدالله محمد',
      phone: '+966509876543',
      email: 'abdullah@future.com',
      source: 'معرض تجاري',
      status: 'عرض سعر',
      value: 95000,
      probability: 80,
      assignedTo: 'محمد علي',
      lastContact: '2024-08-04'
    }
  ];

  // بيانات الشحنات
  const shipments = [
    {
      id: 1,
      trackingNumber: 'SH-001-2024',
      orderNumber: 'SO-2024-001',
      customer: 'شركة الأمل للتجارة',
      destination: 'الرياض',
      carrier: 'شركة الشحن السريع',
      status: 'في الطريق',
      shipDate: '2024-08-05',
      estimatedDelivery: '2024-08-07',
      weight: '250 كجم'
    },
    {
      id: 2,
      trackingNumber: 'SH-002-2024',
      orderNumber: 'SO-2024-003',
      customer: 'شركة الفجر',
      destination: 'جدة',
      carrier: 'النقل الوطني',
      status: 'تم التسليم',
      shipDate: '2024-08-03',
      estimatedDelivery: '2024-08-05',
      weight: '180 كجم'
    }
  ];

  // بيانات فريق المبيعات
  const salesTeam = [
    {
      id: 1,
      name: 'أحمد محمد',
      position: 'مدير مبيعات أول',
      target: 500000,
      achieved: 320000,
      leads: 15,
      deals: 8,
      performance: 64
    },
    {
      id: 2,
      name: 'سارة أحمد',
      position: 'مندوب مبيعات',
      target: 300000,
      achieved: 245000,
      leads: 12,
      deals: 6,
      performance: 82
    },
    {
      id: 3,
      name: 'محمد علي',
      position: 'مندوب مبيعات',
      target: 350000,
      achieved: 180000,
      leads: 10,
      deals: 4,
      performance: 51
    }
  ];

  // بيانات تحليل المبيعات
  const salesAnalytics = [
    { month: 'يناير', sales: 120000, target: 150000, leads: 45 },
    { month: 'فبراير', sales: 135000, target: 150000, leads: 52 },
    { month: 'مارس', sales: 150000, target: 150000, leads: 48 },
    { month: 'أبريل', sales: 145000, target: 160000, leads: 55 },
    { month: 'مايو', sales: 160000, target: 160000, leads: 60 },
    { month: 'يونيو', sales: 175000, target: 170000, leads: 58 }
  ];

  // بيانات قمع المبيعات
  const salesFunnel = [
    { stage: 'عملاء محتملون', count: 150, value: 1500000 },
    { stage: 'مؤهلون', count: 75, value: 900000 },
    { stage: 'عرض سعر', count: 35, value: 525000 },
    { stage: 'تفاوض', count: 20, value: 350000 },
    { stage: 'إغلاق', count: 8, value: 180000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مؤكد': return 'bg-green-100 text-green-800';
      case 'قيد التجهيز': return 'bg-blue-100 text-blue-800';
      case 'مشحون': return 'bg-purple-100 text-purple-800';
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      case 'جديد': return 'bg-blue-100 text-blue-800';
      case 'مؤهل': return 'bg-green-100 text-green-800';
      case 'عرض سعر': return 'bg-yellow-100 text-yellow-800';
      case 'في الطريق': return 'bg-blue-100 text-blue-800';
      case 'تم التسليم': return 'bg-green-100 text-green-800';
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المبيعات والتوزيع</h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة المبيعات وعلاقات العملاء</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            طلب جديد
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 ml-2" />
            عميل محتمل
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
                <p className="text-sm font-medium text-gray-600">إجمالي المبيعات</p>
                <p className="text-2xl font-bold text-gray-900">180,000 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +12.5% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">أوامر المبيعات</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <ShoppingCart className="w-3 h-3 ml-1" />
                  4 أوامر جديدة اليوم
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">العملاء المحتملون</p>
                <p className="text-2xl font-bold text-gray-900">37</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Users className="w-3 h-3 ml-1" />
                  8 عملاء مؤهلون
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التحويل</p>
                <p className="text-2xl font-bold text-gray-900">24%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Target className="w-3 h-3 ml-1" />
                  +3.2% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="orders">أوامر المبيعات</TabsTrigger>
          <TabsTrigger value="leads">العملاء المحتملون</TabsTrigger>
          <TabsTrigger value="shipments">الشحنات</TabsTrigger>
          <TabsTrigger value="team">فريق المبيعات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أداء المبيعات الشهري</CardTitle>
                <CardDescription>مقارنة المبيعات الفعلية مع الأهداف</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#10b981" name="المبيعات الفعلية" />
                    <Bar dataKey="target" fill="#3b82f6" name="الهدف" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>قمع المبيعات</CardTitle>
                <CardDescription>تتبع مراحل العملية البيعية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesFunnel.map((stage, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{stage.stage}</p>
                        <p className="text-sm text-gray-600">{stage.count} فرصة</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-blue-600">{stage.value.toLocaleString()} ر.س</p>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(stage.count / 150) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* أهم الأنشطة */}
          <Card>
            <CardHeader>
              <CardTitle>الأنشطة الحديثة</CardTitle>
              <CardDescription>آخر الأنشطة في نظام المبيعات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">تم إغلاق صفقة جديدة</p>
                    <p className="text-sm text-green-700">شركة الأمل للتجارة - 45,000 ر.س</p>
                  </div>
                  <span className="text-xs text-gray-500">منذ ساعتين</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">عميل محتمل جديد</p>
                    <p className="text-sm text-blue-700">شركة التقنية المتقدمة - 85,000 ر.س</p>
                  </div>
                  <span className="text-xs text-gray-500">منذ 4 ساعات</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Truck className="h-5 w-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="font-medium text-purple-900">تم شحن الطلب</p>
                    <p className="text-sm text-purple-700">SO-2024-003 إلى شركة الفجر</p>
                  </div>
                  <span className="text-xs text-gray-500">منذ 6 ساعات</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* أوامر المبيعات */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>أوامر المبيعات</CardTitle>
                  <CardDescription>إدارة جميع أوامر المبيعات</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    طلب جديد
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
                  <Input placeholder="البحث في الطلبات..." className="w-full" />
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
                      <th className="text-right p-3 font-medium">رقم الطلب</th>
                      <th className="text-right p-3 font-medium">العميل</th>
                      <th className="text-right p-3 font-medium">التاريخ</th>
                      <th className="text-right p-3 font-medium">تاريخ التسليم</th>
                      <th className="text-right p-3 font-medium">المبلغ</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الأولوية</th>
                      <th className="text-right p-3 font-medium">مندوب المبيعات</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{order.orderNumber}</td>
                        <td className="p-3 font-medium">{order.customer}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{order.dueDate}</td>
                        <td className="p-3 font-mono">{order.amount.toLocaleString()} ر.س</td>
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
                        <td className="p-3">{order.salesperson}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Truck className="w-4 h-4" />
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

        {/* العملاء المحتملون */}
        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة العملاء المحتملين</CardTitle>
                  <CardDescription>تتبع وإدارة الفرص البيعية</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  عميل محتمل جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي العملاء المحتملين</p>
                      <p className="text-2xl font-bold text-blue-600">37</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">مؤهلون</p>
                      <p className="text-2xl font-bold text-green-600">8</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">في مرحلة العرض</p>
                      <p className="text-2xl font-bold text-yellow-600">5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">القيمة المتوقعة</p>
                      <p className="text-2xl font-bold text-purple-600">300,000 ر.س</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم الشركة</th>
                      <th className="text-right p-3 font-medium">جهة الاتصال</th>
                      <th className="text-right p-3 font-medium">المصدر</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">القيمة المتوقعة</th>
                      <th className="text-right p-3 font-medium">احتمالية النجاح</th>
                      <th className="text-right p-3 font-medium">المسؤول</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{lead.name}</td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{lead.contact}</p>
                            <p className="text-sm text-gray-600">{lead.phone}</p>
                          </div>
                        </td>
                        <td className="p-3">{lead.source}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="p-3 font-mono">{lead.value.toLocaleString()} ر.س</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{lead.probability}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${lead.probability}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{lead.assignedTo}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4" />
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

        {/* الشحنات */}
        <TabsContent value="shipments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الشحنات</CardTitle>
                  <CardDescription>تتبع حالة الشحنات والتوزيع</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  شحنة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي الشحنات</p>
                      <p className="text-2xl font-bold text-blue-600">24</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">في الطريق</p>
                      <p className="text-2xl font-bold text-yellow-600">8</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">تم التسليم</p>
                      <p className="text-2xl font-bold text-green-600">15</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متأخرة</p>
                      <p className="text-2xl font-bold text-red-600">1</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم التتبع</th>
                      <th className="text-right p-3 font-medium">رقم الطلب</th>
                      <th className="text-right p-3 font-medium">العميل</th>
                      <th className="text-right p-3 font-medium">الوجهة</th>
                      <th className="text-right p-3 font-medium">شركة الشحن</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">تاريخ الشحن</th>
                      <th className="text-right p-3 font-medium">التسليم المتوقع</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{shipment.trackingNumber}</td>
                        <td className="p-3 font-mono">{shipment.orderNumber}</td>
                        <td className="p-3 font-medium">{shipment.customer}</td>
                        <td className="p-3">{shipment.destination}</td>
                        <td className="p-3">{shipment.carrier}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(shipment.status)}>
                            {shipment.status}
                          </Badge>
                        </td>
                        <td className="p-3">{shipment.shipDate}</td>
                        <td className="p-3">{shipment.estimatedDelivery}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MapPin className="w-4 h-4" />
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

        {/* فريق المبيعات */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>فريق المبيعات</CardTitle>
                  <CardDescription>أداء ومتابعة فريق المبيعات</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  عضو جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {salesTeam.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.position}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الهدف:</span>
                          <span className="font-medium">{member.target.toLocaleString()} ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">المحقق:</span>
                          <span className="font-medium">{member.achieved.toLocaleString()} ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">العملاء المحتملون:</span>
                          <span className="font-medium">{member.leads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">الصفقات المغلقة:</span>
                          <span className="font-medium">{member.deals}</span>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>نسبة تحقيق الهدف</span>
                            <span>{member.performance}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                member.performance >= 80 ? 'bg-green-600' : 
                                member.performance >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                              }`}
                              style={{ width: `${Math.min(member.performance, 100)}%` }}
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
                          <BarChart3 className="w-4 h-4 ml-2" />
                          تقرير
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
                <CardTitle>اتجاه المبيعات والعملاء المحتملين</CardTitle>
                <CardDescription>تطور المبيعات والعملاء المحتملين عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#10b981" name="المبيعات" />
                    <Line type="monotone" dataKey="leads" stroke="#3b82f6" name="العملاء المحتملون" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء فريق المبيعات</CardTitle>
                <CardDescription>مقارنة أداء أعضاء الفريق</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesTeam}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="achieved" fill="#10b981" name="المحقق" />
                    <Bar dataKey="target" fill="#3b82f6" name="الهدف" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تحليل مصادر العملاء المحتملين</CardTitle>
              <CardDescription>توزيع العملاء المحتملين حسب المصدر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">45%</p>
                  <p className="text-sm text-gray-600">موقع إلكتروني</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">30%</p>
                  <p className="text-sm text-gray-600">إحالات</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">25%</p>
                  <p className="text-sm text-gray-600">معارض تجارية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSales;

