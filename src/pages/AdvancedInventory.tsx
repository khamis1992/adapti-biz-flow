import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Warehouse, 
  TrendingUp, 
  AlertTriangle, 
  Barcode,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  QrCode,
  Truck,
  ShoppingCart,
  CheckCircle,
  XCircle,
  RefreshCw,
  Archive,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedInventory = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية للمنتجات
  const productsData = [
    { 
      id: 1, 
      sku: 'PRD001', 
      name: 'قطع غيار محرك', 
      category: 'قطع غيار',
      location: 'مستودع أ - رف 1',
      quantity: 150,
      minStock: 50,
      maxStock: 300,
      unitPrice: 250,
      totalValue: 37500,
      status: 'متوفر',
      lastMovement: '2024-08-01',
      supplier: 'مورد قطع الغيار'
    },
    { 
      id: 2, 
      sku: 'PRD002', 
      name: 'إطارات سيارات', 
      category: 'إطارات',
      location: 'مستودع ب - منطقة 2',
      quantity: 25,
      minStock: 30,
      maxStock: 100,
      unitPrice: 800,
      totalValue: 20000,
      status: 'منخفض',
      lastMovement: '2024-07-30',
      supplier: 'شركة الإطارات'
    },
    { 
      id: 3, 
      sku: 'PRD003', 
      name: 'زيوت المحرك', 
      category: 'زيوت',
      location: 'مستودع أ - رف 3',
      quantity: 0,
      minStock: 20,
      maxStock: 80,
      unitPrice: 120,
      totalValue: 0,
      status: 'نفد',
      lastMovement: '2024-07-28',
      supplier: 'مورد الزيوت'
    },
    { 
      id: 4, 
      sku: 'PRD004', 
      name: 'فلاتر الهواء', 
      category: 'فلاتر',
      location: 'مستودع ج - رف 1',
      quantity: 200,
      minStock: 50,
      maxStock: 250,
      unitPrice: 85,
      totalValue: 17000,
      status: 'متوفر',
      lastMovement: '2024-08-02',
      supplier: 'مورد الفلاتر'
    }
  ];

  // بيانات حركات المخزون
  const stockMovements = [
    { id: 1, date: '2024-08-02', type: 'استلام', product: 'قطع غيار محرك', quantity: 50, reference: 'PO-001', user: 'أحمد محمد' },
    { id: 2, date: '2024-08-02', type: 'صرف', product: 'إطارات سيارات', quantity: -5, reference: 'SO-001', user: 'سارة أحمد' },
    { id: 3, date: '2024-08-01', type: 'تسوية', product: 'فلاتر الهواء', quantity: 10, reference: 'ADJ-001', user: 'محمد علي' },
    { id: 4, date: '2024-08-01', type: 'إرجاع', product: 'زيوت المحرك', quantity: 5, reference: 'RET-001', user: 'فاطمة خالد' }
  ];

  // بيانات المواقع والمستودعات
  const warehouses = [
    { 
      id: 1, 
      name: 'المستودع الرئيسي - أ', 
      location: 'الرياض - حي الصناعية',
      capacity: 1000,
      occupied: 650,
      zones: 5,
      status: 'نشط',
      manager: 'أحمد السعد'
    },
    { 
      id: 2, 
      name: 'المستودع الفرعي - ب', 
      location: 'جدة - المنطقة الصناعية',
      capacity: 500,
      occupied: 320,
      zones: 3,
      status: 'نشط',
      manager: 'سعد المحمد'
    },
    { 
      id: 3, 
      name: 'مستودع قطع الغيار - ج', 
      location: 'الدمام - المنطقة الشرقية',
      capacity: 300,
      occupied: 180,
      zones: 2,
      status: 'نشط',
      manager: 'خالد العلي'
    }
  ];

  // بيانات الموردين
  const suppliers = [
    { 
      id: 1, 
      name: 'مورد قطع الغيار المتقدم', 
      contact: 'أحمد محمد',
      phone: '+966501234567',
      email: 'ahmed@supplier.com',
      rating: 4.8,
      totalOrders: 45,
      totalValue: 450000,
      status: 'نشط'
    },
    { 
      id: 2, 
      name: 'شركة الإطارات الدولية', 
      contact: 'سارة أحمد',
      phone: '+966507654321',
      email: 'sara@tires.com',
      rating: 4.5,
      totalOrders: 32,
      totalValue: 320000,
      status: 'نشط'
    },
    { 
      id: 3, 
      name: 'مورد الزيوت والسوائل', 
      contact: 'محمد علي',
      phone: '+966509876543',
      email: 'mohammed@oils.com',
      rating: 4.2,
      totalOrders: 28,
      totalValue: 180000,
      status: 'معلق'
    }
  ];

  // بيانات تحليل المخزون
  const inventoryAnalytics = [
    { month: 'يناير', inbound: 120, outbound: 95, adjustment: 5 },
    { month: 'فبراير', inbound: 135, outbound: 110, adjustment: -2 },
    { month: 'مارس', inbound: 150, outbound: 125, adjustment: 8 },
    { month: 'أبريل', inbound: 145, outbound: 115, adjustment: 3 },
    { month: 'مايو', inbound: 160, outbound: 130, adjustment: -5 },
    { month: 'يونيو', inbound: 175, outbound: 140, adjustment: 10 }
  ];

  // بيانات دوران المخزون
  const turnoverData = [
    { category: 'قطع غيار', turnover: 8.5, value: 450000 },
    { category: 'إطارات', turnover: 6.2, value: 320000 },
    { category: 'زيوت', turnover: 12.1, value: 180000 },
    { category: 'فلاتر', turnover: 9.8, value: 220000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متوفر': return 'bg-green-100 text-green-800';
      case 'منخفض': return 'bg-yellow-100 text-yellow-800';
      case 'نفد': return 'bg-red-100 text-red-800';
      case 'نشط': return 'bg-blue-100 text-blue-800';
      case 'معلق': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMovementTypeColor = (type: string) => {
    switch (type) {
      case 'استلام': return 'bg-green-100 text-green-800';
      case 'صرف': return 'bg-red-100 text-red-800';
      case 'تسوية': return 'bg-blue-100 text-blue-800';
      case 'إرجاع': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المخزون المتقدمة</h1>
          <p className="text-gray-600 mt-2">تتبع وإدارة المخزون في الوقت الفعلي</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            منتج جديد
          </Button>
          <Button variant="outline">
            <QrCode className="w-4 h-4 ml-2" />
            مسح الباركود
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
                <p className="text-sm font-medium text-gray-600">إجمالي قيمة المخزون</p>
                <p className="text-2xl font-bold text-gray-900">74,500 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +3.2% من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">عدد المنتجات</p>
                <p className="text-2xl font-bold text-gray-900">375</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Activity className="w-3 h-3 ml-1" />
                  4 منتجات نشطة
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Archive className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تنبيهات المخزون</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <AlertTriangle className="w-3 h-3 ml-1" />
                  منتج واحد نفد
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل دوران المخزون</p>
                <p className="text-2xl font-bold text-gray-900">9.1</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <RefreshCw className="w-3 h-3 ml-1" />
                  +0.8 من الشهر الماضي
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="movements">حركات المخزون</TabsTrigger>
          <TabsTrigger value="warehouses">المستودعات</TabsTrigger>
          <TabsTrigger value="suppliers">الموردين</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>حركات المخزون الشهرية</CardTitle>
                <CardDescription>تتبع الحركات الداخلة والخارجة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inventoryAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inbound" fill="#10b981" name="الوارد" />
                    <Bar dataKey="outbound" fill="#ef4444" name="الصادر" />
                    <Bar dataKey="adjustment" fill="#3b82f6" name="التسويات" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>دوران المخزون حسب الفئة</CardTitle>
                <CardDescription>معدل دوران المخزون لكل فئة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {turnoverData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-gray-600">القيمة: {item.value.toLocaleString()} ر.س</p>
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-bold text-blue-600">{item.turnover}</p>
                        <p className="text-xs text-gray-500">مرة/سنة</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* تنبيهات المخزون */}
          <Card>
            <CardHeader>
              <CardTitle>تنبيهات المخزون</CardTitle>
              <CardDescription>منتجات تحتاج إلى انتباه فوري</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium text-red-900">زيوت المحرك - نفد المخزون</p>
                    <p className="text-sm text-red-700">المنتج غير متوفر ويحتاج إلى طلب شراء فوري</p>
                  </div>
                  <Button size="sm" variant="outline">طلب شراء</Button>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-900">إطارات سيارات - مخزون منخفض</p>
                    <p className="text-sm text-yellow-700">الكمية الحالية (25) أقل من الحد الأدنى (30)</p>
                  </div>
                  <Button size="sm" variant="outline">طلب شراء</Button>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">فلاتر الهواء - اقتراب من الحد الأقصى</p>
                    <p className="text-sm text-blue-700">الكمية الحالية (200) تقترب من الحد الأقصى (250)</p>
                  </div>
                  <Button size="sm" variant="outline">عرض التفاصيل</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* المنتجات */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة المنتجات</CardTitle>
                  <CardDescription>قائمة شاملة بجميع المنتجات والمخزون</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    منتج جديد
                  </Button>
                  <Button variant="outline">
                    <Barcode className="w-4 h-4 ml-2" />
                    طباعة باركود
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input placeholder="البحث في المنتجات..." className="w-full" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 ml-2" />
                  فلترة
                </Button>
                <Button variant="outline">
                  <QrCode className="w-4 h-4 ml-2" />
                  مسح باركود
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رمز المنتج</th>
                      <th className="text-right p-3 font-medium">اسم المنتج</th>
                      <th className="text-right p-3 font-medium">الفئة</th>
                      <th className="text-right p-3 font-medium">الموقع</th>
                      <th className="text-right p-3 font-medium">الكمية</th>
                      <th className="text-right p-3 font-medium">سعر الوحدة</th>
                      <th className="text-right p-3 font-medium">القيمة الإجمالية</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{product.sku}</td>
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3">{product.category}</td>
                        <td className="p-3 text-sm">{product.location}</td>
                        <td className="p-3 font-mono">
                          <div className="flex flex-col">
                            <span className="font-bold">{product.quantity}</span>
                            <span className="text-xs text-gray-500">
                              حد أدنى: {product.minStock}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 font-mono">{product.unitPrice} ر.س</td>
                        <td className="p-3 font-mono">{product.totalValue.toLocaleString()} ر.س</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
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
                              <Barcode className="w-4 h-4" />
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

        {/* حركات المخزون */}
        <TabsContent value="movements" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>حركات المخزون</CardTitle>
                  <CardDescription>تتبع جميع حركات الدخول والخروج</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    حركة جديدة
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">الحركات اليوم</p>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">الوارد اليوم</p>
                      <p className="text-2xl font-bold text-green-600">8</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">الصادر اليوم</p>
                      <p className="text-2xl font-bold text-red-600">4</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">التسويات</p>
                      <p className="text-2xl font-bold text-yellow-600">2</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">التاريخ</th>
                      <th className="text-right p-3 font-medium">نوع الحركة</th>
                      <th className="text-right p-3 font-medium">المنتج</th>
                      <th className="text-right p-3 font-medium">الكمية</th>
                      <th className="text-right p-3 font-medium">المرجع</th>
                      <th className="text-right p-3 font-medium">المستخدم</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockMovements.map((movement) => (
                      <tr key={movement.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{movement.date}</td>
                        <td className="p-3">
                          <Badge className={getMovementTypeColor(movement.type)}>
                            {movement.type}
                          </Badge>
                        </td>
                        <td className="p-3 font-medium">{movement.product}</td>
                        <td className="p-3 font-mono">
                          <span className={movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                            {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                          </span>
                        </td>
                        <td className="p-3 font-mono">{movement.reference}</td>
                        <td className="p-3">{movement.user}</td>
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

        {/* المستودعات */}
        <TabsContent value="warehouses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة المستودعات</CardTitle>
                  <CardDescription>إدارة المواقع والمناطق التخزينية</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  مستودع جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {warehouses.map((warehouse) => (
                  <Card key={warehouse.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="w-4 h-4 ml-1" />
                            {warehouse.location}
                          </p>
                        </div>
                        <Badge className={getStatusColor(warehouse.status)}>
                          {warehouse.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">السعة:</span>
                          <span className="font-medium">{warehouse.capacity} وحدة</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">المشغول:</span>
                          <span className="font-medium">{warehouse.occupied} وحدة</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">المناطق:</span>
                          <span className="font-medium">{warehouse.zones} منطقة</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">المدير:</span>
                          <span className="font-medium">{warehouse.manager}</span>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>نسبة الإشغال</span>
                            <span>{Math.round((warehouse.occupied / warehouse.capacity) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(warehouse.occupied / warehouse.capacity) * 100}%` }}
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
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الموردين */}
        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الموردين</CardTitle>
                  <CardDescription>قاعدة بيانات الموردين وتقييم الأداء</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  مورد جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم المورد</th>
                      <th className="text-right p-3 font-medium">جهة الاتصال</th>
                      <th className="text-right p-3 font-medium">الهاتف</th>
                      <th className="text-right p-3 font-medium">التقييم</th>
                      <th className="text-right p-3 font-medium">إجمالي الطلبات</th>
                      <th className="text-right p-3 font-medium">إجمالي القيمة</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{supplier.name}</td>
                        <td className="p-3">{supplier.contact}</td>
                        <td className="p-3 font-mono">{supplier.phone}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{supplier.rating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono">{supplier.totalOrders}</td>
                        <td className="p-3 font-mono">{supplier.totalValue.toLocaleString()} ر.س</td>
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
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <ShoppingCart className="w-4 h-4" />
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
                <CardTitle>تحليل حركات المخزون</CardTitle>
                <CardDescription>اتجاهات الحركات الشهرية</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={inventoryAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="inbound" stroke="#10b981" name="الوارد" />
                    <Line type="monotone" dataKey="outbound" stroke="#ef4444" name="الصادر" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الموردين</CardTitle>
                <CardDescription>مقارنة أداء الموردين الرئيسيين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{supplier.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">طلبات: {supplier.totalOrders}</span>
                          <span className="text-sm text-gray-600">تقييم: {supplier.rating}★</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-blue-600">{supplier.totalValue.toLocaleString()} ر.س</p>
                        <Badge className={getStatusColor(supplier.status)}>
                          {supplier.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقرير دوران المخزون</CardTitle>
              <CardDescription>تحليل معدل دوران المخزون حسب الفئات</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={turnoverData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="turnover" fill="#3b82f6" name="معدل الدوران" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedInventory;

