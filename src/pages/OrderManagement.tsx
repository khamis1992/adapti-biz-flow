import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Truck,
  Phone,
  MapPin,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Timer,
  ChefHat,
  Utensils
} from 'lucide-react';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('active-orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // بيانات تجريبية للطلبات
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'أحمد محمد',
      customerPhone: '+966501234567',
      orderType: 'delivery',
      status: 'preparing',
      items: [
        { name: 'برجر كلاسيكي', quantity: 2, price: 45.00 },
        { name: 'بطاطس مقلية', quantity: 1, price: 15.00 },
        { name: 'كوكا كولا', quantity: 2, price: 8.00 }
      ],
      total: 121.00,
      orderTime: '2024-01-15 14:30',
      estimatedTime: 25,
      address: 'شارع الملك فهد، الرياض',
      paymentMethod: 'cash',
      notes: 'بدون بصل في البرجر'
    },
    {
      id: 'ORD-002',
      customerName: 'فاطمة أحمد',
      customerPhone: '+966507654321',
      orderType: 'dine-in',
      status: 'ready',
      items: [
        { name: 'سلطة قيصر', quantity: 1, price: 35.00 },
        { name: 'عصير برتقال', quantity: 1, price: 12.00 }
      ],
      total: 47.00,
      orderTime: '2024-01-15 14:15',
      estimatedTime: 15,
      tableNumber: 'T-05',
      paymentMethod: 'card',
      notes: ''
    },
    {
      id: 'ORD-003',
      customerName: 'محمد علي',
      customerPhone: '+966509876543',
      orderType: 'takeaway',
      status: 'completed',
      items: [
        { name: 'بيتزا مارجريتا', quantity: 1, price: 55.00 },
        { name: 'سلطة خضراء', quantity: 1, price: 25.00 }
      ],
      total: 80.00,
      orderTime: '2024-01-15 13:45',
      estimatedTime: 20,
      paymentMethod: 'online',
      notes: 'بيتزا مقرمشة'
    }
  ];

  const orderStats = {
    totalOrders: 156,
    activeOrders: 23,
    completedToday: 89,
    avgOrderValue: 67.50,
    avgPreparationTime: 18,
    deliveryOrders: 45,
    dineInOrders: 32,
    takeawayOrders: 12
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'preparing': return 'قيد التحضير';
      case 'ready': return 'جاهز';
      case 'delivered': return 'تم التوصيل';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getOrderTypeIcon = (type) => {
    switch (type) {
      case 'delivery': return <Truck className="h-4 w-4" />;
      case 'dine-in': return <Utensils className="h-4 w-4" />;
      case 'takeaway': return <ChefHat className="h-4 w-4" />;
      default: return <Utensils className="h-4 w-4" />;
    }
  };

  const getOrderTypeText = (type) => {
    switch (type) {
      case 'delivery': return 'توصيل';
      case 'dine-in': return 'في المطعم';
      case 'takeaway': return 'استلام';
      default: return type;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const OrderCard = ({ order }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              {getOrderTypeIcon(order.orderType)}
              <span>{getOrderTypeText(order.orderType)}</span>
              <span>•</span>
              <span>{order.orderTime}</span>
            </CardDescription>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusText(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* معلومات العميل */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{order.customerPhone}</span>
            </div>
          </div>

          {/* عنوان التوصيل أو رقم الطاولة */}
          {order.orderType === 'delivery' && order.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{order.address}</span>
            </div>
          )}
          
          {order.orderType === 'dine-in' && order.tableNumber && (
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">طاولة رقم: {order.tableNumber}</span>
            </div>
          )}

          {/* أصناف الطلب */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">أصناف الطلب:</h4>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>{(item.quantity * item.price).toFixed(2)} ر.س</span>
              </div>
            ))}
          </div>

          {/* الإجمالي والوقت المتوقع */}
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="font-bold text-green-600">{order.total.toFixed(2)} ر.س</span>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{order.estimatedTime} دقيقة</span>
              </div>
            </div>
          </div>

          {/* ملاحظات */}
          {order.notes && (
            <div className="bg-yellow-50 p-2 rounded text-sm">
              <strong>ملاحظات:</strong> {order.notes}
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              عرض التفاصيل
            </Button>
            {order.status === 'pending' && (
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                قبول الطلب
              </Button>
            )}
            {order.status === 'preparing' && (
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                جاهز
              </Button>
            )}
            {order.status === 'ready' && order.orderType === 'delivery' && (
              <Button size="sm" className="flex-1">
                <Truck className="h-4 w-4 mr-1" />
                إرسال للتوصيل
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
          <p className="text-gray-600">متابعة وإدارة طلبات العملاء</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          طلب جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الطلبات النشطة</p>
                <p className="text-2xl font-bold text-blue-600">{orderStats.activeOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مكتملة اليوم</p>
                <p className="text-2xl font-bold text-green-600">{orderStats.completedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط قيمة الطلب</p>
                <p className="text-2xl font-bold">{orderStats.avgOrderValue} ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط وقت التحضير</p>
                <p className="text-2xl font-bold">{orderStats.avgPreparationTime} دقيقة</p>
              </div>
              <Timer className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active-orders">الطلبات النشطة</TabsTrigger>
          <TabsTrigger value="all-orders">جميع الطلبات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="active-orders" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في الطلبات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">في الانتظار</SelectItem>
                    <SelectItem value="preparing">قيد التحضير</SelectItem>
                    <SelectItem value="ready">جاهز</SelectItem>
                    <SelectItem value="delivered">تم التوصيل</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة الطلبات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.filter(order => order.status !== 'completed' && order.status !== 'cancelled').map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-orders" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في جميع الطلبات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">في الانتظار</SelectItem>
                    <SelectItem value="preparing">قيد التحضير</SelectItem>
                    <SelectItem value="ready">جاهز</SelectItem>
                    <SelectItem value="delivered">تم التوصيل</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* قائمة جميع الطلبات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>توزيع أنواع الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span>طلبات التوصيل</span>
                    </div>
                    <span className="font-semibold">{orderStats.deliveryOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-green-500" />
                      <span>طلبات في المطعم</span>
                    </div>
                    <span className="font-semibold">{orderStats.dineInOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-4 w-4 text-orange-500" />
                      <span>طلبات الاستلام</span>
                    </div>
                    <span className="font-semibold">{orderStats.takeawayOrders}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الأداء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي الطلبات</span>
                    <span className="font-semibold">{orderStats.totalOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط قيمة الطلب</span>
                    <span className="font-semibold">{orderStats.avgOrderValue} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط وقت التحضير</span>
                    <span className="font-semibold">{orderStats.avgPreparationTime} دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل إكمال الطلبات</span>
                    <span className="font-semibold text-green-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات إدارة الطلبات</CardTitle>
              <CardDescription>تخصيص إعدادات معالجة الطلبات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الحد الأدنى لقيمة الطلب</label>
                  <Input type="number" placeholder="25.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رسوم التوصيل</label>
                  <Input type="number" placeholder="10.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">وقت التحضير الافتراضي (دقيقة)</label>
                  <Input type="number" placeholder="20" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">نطاق التوصيل (كم)</label>
                  <Input type="number" placeholder="15" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagement;

