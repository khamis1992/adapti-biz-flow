import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  FileText, 
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Calendar,
  BarChart3,
  PieChart,
  Building2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedProcurement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية لطلبات الشراء
  const purchaseOrders = [
    {
      id: 1,
      poNumber: 'PO-2024-001',
      supplier: 'شركة قطع الغيار المتقدمة',
      date: '2024-08-01',
      deliveryDate: '2024-08-15',
      amount: 85000,
      status: 'مؤكد',
      items: 8,
      buyer: 'أحمد محمد',
      priority: 'عالية'
    },
    {
      id: 2,
      poNumber: 'PO-2024-002',
      supplier: 'مؤسسة الإطارات الوطنية',
      date: '2024-08-02',
      deliveryDate: '2024-08-20',
      amount: 65000,
      status: 'قيد المراجعة',
      items: 5,
      buyer: 'سارة أحمد',
      priority: 'متوسطة'
    },
    {
      id: 3,
      poNumber: 'PO-2024-003',
      supplier: 'شركة الزيوت والمواد الكيميائية',
      date: '2024-08-03',
      deliveryDate: '2024-08-18',
      amount: 42000,
      status: 'مستلم',
      items: 12,
      buyer: 'محمد علي',
      priority: 'منخفضة'
    },
    {
      id: 4,
      poNumber: 'PO-2024-004',
      supplier: 'مجموعة الأدوات الصناعية',
      date: '2024-08-04',
      deliveryDate: '2024-08-25',
      amount: 120000,
      status: 'مسودة',
      items: 15,
      buyer: 'فاطمة خالد',
      priority: 'عالية'
    }
  ];

  // بيانات الموردين
  const suppliers = [
    {
      id: 1,
      name: 'شركة قطع الغيار المتقدمة',
      contact: 'خالد السعد',
      phone: '+966501234567',
      email: 'khalid@parts.com',
      address: 'الرياض، المملكة العربية السعودية',
      category: 'قطع غيار',
      rating: 4.8,
      totalOrders: 45,
      totalValue: 2500000,
      paymentTerms: '30 يوم',
      status: 'نشط'
    },
    {
      id: 2,
      name: 'مؤسسة الإطارات الوطنية',
      contact: 'نورا العلي',
      phone: '+966507654321',
      email: 'nora@tires.com',
      address: 'جدة، المملكة العربية السعودية',
      category: 'إطارات',
      rating: 4.5,
      totalOrders: 32,
      totalValue: 1800000,
      paymentTerms: '45 يوم',
      status: 'نشط'
    },
    {
      id: 3,
      name: 'شركة الزيوت والمواد الكيميائية',
      contact: 'عبدالله محمد',
      phone: '+966509876543',
      email: 'abdullah@oils.com',
      address: 'الدمام، المملكة العربية السعودية',
      category: 'زيوت ومواد كيميائية',
      rating: 4.2,
      totalOrders: 28,
      totalValue: 950000,
      paymentTerms: '60 يوم',
      status: 'نشط'
    }
  ];

  // بيانات طلبات الأسعار
  const rfqs = [
    {
      id: 1,
      rfqNumber: 'RFQ-2024-001',
      title: 'قطع غيار محركات',
      issueDate: '2024-08-01',
      responseDeadline: '2024-08-10',
      status: 'مفتوح',
      suppliersInvited: 5,
      responsesReceived: 3,
      estimatedValue: 150000
    },
    {
      id: 2,
      rfqNumber: 'RFQ-2024-002',
      title: 'إطارات مختلفة الأحجام',
      issueDate: '2024-07-28',
      responseDeadline: '2024-08-05',
      status: 'مغلق',
      suppliersInvited: 4,
      responsesReceived: 4,
      estimatedValue: 200000
    },
    {
      id: 3,
      rfqNumber: 'RFQ-2024-003',
      title: 'أدوات صيانة متنوعة',
      issueDate: '2024-08-03',
      responseDeadline: '2024-08-12',
      status: 'مفتوح',
      suppliersInvited: 6,
      responsesReceived: 2,
      estimatedValue: 80000
    }
  ];

  // بيانات الاستلام
  const receipts = [
    {
      id: 1,
      receiptNumber: 'REC-2024-001',
      poNumber: 'PO-2024-001',
      supplier: 'شركة قطع الغيار المتقدمة',
      receiptDate: '2024-08-15',
      itemsReceived: 8,
      itemsOrdered: 8,
      status: 'مكتمل',
      inspector: 'أحمد محمد',
      notes: 'جميع البنود مطابقة للمواصفات'
    },
    {
      id: 2,
      receiptNumber: 'REC-2024-002',
      poNumber: 'PO-2024-003',
      supplier: 'شركة الزيوت والمواد الكيميائية',
      receiptDate: '2024-08-18',
      itemsReceived: 10,
      itemsOrdered: 12,
      status: 'جزئي',
      inspector: 'محمد علي',
      notes: 'نقص في بندين - متوقع الوصول غداً'
    }
  ];

  // بيانات تحليل المشتريات
  const procurementAnalytics = [
    { month: 'يناير', spending: 450000, orders: 25, savings: 35000 },
    { month: 'فبراير', spending: 520000, orders: 28, savings: 42000 },
    { month: 'مارس', spending: 480000, orders: 32, savings: 38000 },
    { month: 'أبريل', spending: 610000, orders: 35, savings: 55000 },
    { month: 'مايو', spending: 580000, orders: 30, savings: 48000 },
    { month: 'يونيو', spending: 650000, orders: 38, savings: 62000 }
  ];

  // بيانات توزيع الإنفاق حسب الفئة
  const spendingByCategory = [
    { category: 'قطع غيار', amount: 2500000, percentage: 45 },
    { category: 'إطارات', amount: 1800000, percentage: 32 },
    { category: 'زيوت ومواد كيميائية', amount: 950000, percentage: 17 },
    { category: 'أدوات وعدد', amount: 350000, percentage: 6 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مؤكد': return 'bg-green-100 text-green-800';
      case 'قيد المراجعة': return 'bg-yellow-100 text-yellow-800';
      case 'مستلم': return 'bg-blue-100 text-blue-800';
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      case 'مفتوح': return 'bg-green-100 text-green-800';
      case 'مغلق': return 'bg-red-100 text-red-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'جزئي': return 'bg-yellow-100 text-yellow-800';
      case 'نشط': return 'bg-green-100 text-green-800';
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
          <h1 className="text-3xl font-bold text-gray-900">إدارة المشتريات المتقدمة</h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة المشتريات والموردين</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            طلب شراء جديد
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 ml-2" />
            طلب أسعار
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
                <p className="text-sm font-medium text-gray-600">إجمالي المشتريات</p>
                <p className="text-2xl font-bold text-gray-900">312,000 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +8.5% من الشهر الماضي
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
                <p className="text-sm font-medium text-gray-600">طلبات الشراء</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <ShoppingCart className="w-3 h-3 ml-1" />
                  4 طلبات جديدة اليوم
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
                <p className="text-sm font-medium text-gray-600">الموردون النشطون</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Users className="w-3 h-3 ml-1" />
                  3 موردون جدد
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
                <p className="text-sm font-medium text-gray-600">الوفورات المحققة</p>
                <p className="text-2xl font-bold text-gray-900">48,000 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  15.4% من إجمالي المشتريات
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="orders">طلبات الشراء</TabsTrigger>
          <TabsTrigger value="suppliers">الموردون</TabsTrigger>
          <TabsTrigger value="rfq">طلبات الأسعار</TabsTrigger>
          <TabsTrigger value="receipts">الاستلام</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه المشتريات الشهرية</CardTitle>
                <CardDescription>تطور الإنفاق والوفورات عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={procurementAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="spending" fill="#3b82f6" name="الإنفاق" />
                    <Bar dataKey="savings" fill="#10b981" name="الوفورات" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الإنفاق حسب الفئة</CardTitle>
                <CardDescription>نسبة الإنفاق على كل فئة من المنتجات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spendingByCategory.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{category.category}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-blue-600">{category.amount.toLocaleString()} ر.س</p>
                        <p className="text-sm text-gray-600">{category.percentage}%</p>
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
              <CardDescription>آخر الأنشطة في نظام المشتريات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">تم استلام طلب شراء</p>
                    <p className="text-sm text-green-700">PO-2024-001 من شركة قطع الغيار المتقدمة</p>
                  </div>
                  <span className="text-xs text-gray-500">منذ ساعتين</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">طلب أسعار جديد</p>
                    <p className="text-sm text-blue-700">RFQ-2024-003 لأدوات صيانة متنوعة</p>
                  </div>
                  <span className="text-xs text-gray-500">منذ 4 ساعات</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="font-medium text-purple-900">مورد جديد</p>
                    <p className="text-sm text-purple-700">تم إضافة شركة الأدوات الصناعية</p>
                  </div>
                  <span className="text-xs text-gray-500">منذ 6 ساعات</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* طلبات الشراء */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>طلبات الشراء</CardTitle>
                  <CardDescription>إدارة جميع طلبات الشراء</CardDescription>
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
                      <th className="text-right p-3 font-medium">المورد</th>
                      <th className="text-right p-3 font-medium">التاريخ</th>
                      <th className="text-right p-3 font-medium">تاريخ التسليم</th>
                      <th className="text-right p-3 font-medium">المبلغ</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الأولوية</th>
                      <th className="text-right p-3 font-medium">المشتري</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{order.poNumber}</td>
                        <td className="p-3 font-medium">{order.supplier}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{order.deliveryDate}</td>
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
                        <td className="p-3">{order.buyer}</td>
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

        {/* الموردون */}
        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الموردين</CardTitle>
                  <CardDescription>قاعدة بيانات شاملة للموردين</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  مورد جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي الموردين</p>
                      <p className="text-2xl font-bold text-blue-600">15</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">موردون نشطون</p>
                      <p className="text-2xl font-bold text-green-600">12</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متوسط التقييم</p>
                      <p className="text-2xl font-bold text-yellow-600">4.5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">إجمالي القيمة</p>
                      <p className="text-2xl font-bold text-purple-600">5.25M ر.س</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم المورد</th>
                      <th className="text-right p-3 font-medium">جهة الاتصال</th>
                      <th className="text-right p-3 font-medium">الفئة</th>
                      <th className="text-right p-3 font-medium">التقييم</th>
                      <th className="text-right p-3 font-medium">إجمالي الطلبات</th>
                      <th className="text-right p-3 font-medium">إجمالي القيمة</th>
                      <th className="text-right p-3 font-medium">شروط الدفع</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{supplier.name}</td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{supplier.contact}</p>
                            <p className="text-sm text-gray-600">{supplier.phone}</p>
                            <p className="text-sm text-gray-600">{supplier.email}</p>
                          </div>
                        </td>
                        <td className="p-3">{supplier.category}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{supplier.rating}</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono">{supplier.totalOrders}</td>
                        <td className="p-3 font-mono">{supplier.totalValue.toLocaleString()} ر.س</td>
                        <td className="p-3">{supplier.paymentTerms}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(supplier.status)}>
                            {supplier.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
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

        {/* طلبات الأسعار */}
        <TabsContent value="rfq" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>طلبات الأسعار</CardTitle>
                  <CardDescription>إدارة طلبات الأسعار والمناقصات</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  طلب أسعار جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">طلبات مفتوحة</p>
                      <p className="text-2xl font-bold text-green-600">2</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">طلبات مغلقة</p>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متوسط الردود</p>
                      <p className="text-2xl font-bold text-purple-600">3.2</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">الوفورات المحققة</p>
                      <p className="text-2xl font-bold text-yellow-600">18%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الطلب</th>
                      <th className="text-right p-3 font-medium">العنوان</th>
                      <th className="text-right p-3 font-medium">تاريخ الإصدار</th>
                      <th className="text-right p-3 font-medium">آخر موعد للرد</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الموردون المدعوون</th>
                      <th className="text-right p-3 font-medium">الردود المستلمة</th>
                      <th className="text-right p-3 font-medium">القيمة المتوقعة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfqs.map((rfq) => (
                      <tr key={rfq.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{rfq.rfqNumber}</td>
                        <td className="p-3 font-medium">{rfq.title}</td>
                        <td className="p-3">{rfq.issueDate}</td>
                        <td className="p-3">{rfq.responseDeadline}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(rfq.status)}>
                            {rfq.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">{rfq.suppliersInvited}</td>
                        <td className="p-3 text-center">{rfq.responsesReceived}</td>
                        <td className="p-3 font-mono">{rfq.estimatedValue.toLocaleString()} ر.س</td>
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

        {/* الاستلام */}
        <TabsContent value="receipts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>سجل الاستلام</CardTitle>
                  <CardDescription>تتبع استلام البضائع والمواد</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة استلام
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">استلامات اليوم</p>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">استلامات مكتملة</p>
                      <p className="text-2xl font-bold text-green-600">15</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">استلامات جزئية</p>
                      <p className="text-2xl font-bold text-yellow-600">2</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">معدل الدقة</p>
                      <p className="text-2xl font-bold text-purple-600">96%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الاستلام</th>
                      <th className="text-right p-3 font-medium">رقم طلب الشراء</th>
                      <th className="text-right p-3 font-medium">المورد</th>
                      <th className="text-right p-3 font-medium">تاريخ الاستلام</th>
                      <th className="text-right p-3 font-medium">البنود المستلمة</th>
                      <th className="text-right p-3 font-medium">البنود المطلوبة</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">المفتش</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((receipt) => (
                      <tr key={receipt.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{receipt.receiptNumber}</td>
                        <td className="p-3 font-mono">{receipt.poNumber}</td>
                        <td className="p-3 font-medium">{receipt.supplier}</td>
                        <td className="p-3">{receipt.receiptDate}</td>
                        <td className="p-3 text-center">{receipt.itemsReceived}</td>
                        <td className="p-3 text-center">{receipt.itemsOrdered}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(receipt.status)}>
                            {receipt.status}
                          </Badge>
                        </td>
                        <td className="p-3">{receipt.inspector}</td>
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

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه عدد الطلبات</CardTitle>
                <CardDescription>تطور عدد طلبات الشراء عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={procurementAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#3b82f6" name="عدد الطلبات" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الموردين</CardTitle>
                <CardDescription>تقييم أداء أهم الموردين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.slice(0, 3).map((supplier, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{supplier.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">طلبات: {supplier.totalOrders}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{supplier.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-blue-600">{supplier.totalValue.toLocaleString()} ر.س</p>
                        <p className="text-xs text-gray-500">إجمالي القيمة</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>ملخص شامل لأداء المشتريات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">312,000 ر.س</p>
                  <p className="text-sm text-gray-600">إجمالي المشتريات الشهرية</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">15.4%</p>
                  <p className="text-sm text-gray-600">نسبة الوفورات المحققة</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">4.5</p>
                  <p className="text-sm text-gray-600">متوسط تقييم الموردين</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">96%</p>
                  <p className="text-sm text-gray-600">معدل دقة الاستلام</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedProcurement;

