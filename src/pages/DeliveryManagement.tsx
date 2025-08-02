import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  Route,
  Star,
  Package,
  Timer,
  Fuel
} from 'lucide-react';

const DeliveryManagement = () => {
  const [activeTab, setActiveTab] = useState('active-deliveries');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // بيانات تجريبية للتوصيلات
  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      customerName: 'أحمد محمد',
      customerPhone: '+966501234567',
      address: 'شارع الملك فهد، الرياض',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      driverId: 'DRV-001',
      driverName: 'محمد السائق',
      driverPhone: '+966509876543',
      status: 'on-way',
      orderValue: 121.00,
      deliveryFee: 10.00,
      estimatedTime: 25,
      actualTime: 18,
      distance: 8.5,
      startTime: '14:30',
      estimatedArrival: '14:55',
      notes: 'الدور الثاني، شقة 205'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-002',
      customerName: 'فاطمة أحمد',
      customerPhone: '+966507654321',
      address: 'حي النخيل، جدة',
      coordinates: { lat: 21.3891, lng: 39.8579 },
      driverId: 'DRV-002',
      driverName: 'علي التوصيل',
      driverPhone: '+966508765432',
      status: 'delivered',
      orderValue: 89.50,
      deliveryFee: 8.00,
      estimatedTime: 20,
      actualTime: 22,
      distance: 6.2,
      startTime: '14:00',
      estimatedArrival: '14:20',
      deliveredTime: '14:22',
      rating: 5,
      notes: ''
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-003',
      customerName: 'محمد علي',
      customerPhone: '+966509876543',
      address: 'شارع التحلية، الخبر',
      coordinates: { lat: 26.2172, lng: 50.1971 },
      driverId: 'DRV-001',
      driverName: 'محمد السائق',
      driverPhone: '+966509876543',
      status: 'assigned',
      orderValue: 156.75,
      deliveryFee: 12.00,
      estimatedTime: 30,
      actualTime: 0,
      distance: 12.3,
      startTime: null,
      estimatedArrival: '15:15',
      notes: 'اتصل عند الوصول'
    }
  ];

  // بيانات السائقين
  const drivers = [
    {
      id: 'DRV-001',
      name: 'محمد السائق',
      phone: '+966509876543',
      status: 'busy',
      currentLocation: { lat: 24.7136, lng: 46.6753 },
      vehicle: 'دراجة نارية',
      plateNumber: 'ABC-123',
      rating: 4.8,
      completedDeliveries: 156,
      activeDeliveries: 2,
      totalDistance: 1250.5,
      earnings: 2340.00
    },
    {
      id: 'DRV-002',
      name: 'علي التوصيل',
      phone: '+966508765432',
      status: 'available',
      currentLocation: { lat: 21.3891, lng: 39.8579 },
      vehicle: 'سيارة صغيرة',
      plateNumber: 'XYZ-789',
      rating: 4.6,
      completedDeliveries: 203,
      activeDeliveries: 0,
      totalDistance: 1890.2,
      earnings: 3120.00
    },
    {
      id: 'DRV-003',
      name: 'سارة المندوبة',
      phone: '+966507654321',
      status: 'offline',
      currentLocation: { lat: 26.2172, lng: 50.1971 },
      vehicle: 'دراجة نارية',
      plateNumber: 'DEF-456',
      rating: 4.9,
      completedDeliveries: 89,
      activeDeliveries: 0,
      totalDistance: 890.7,
      earnings: 1560.00
    }
  ];

  const deliveryStats = {
    activeDeliveries: 12,
    completedToday: 89,
    avgDeliveryTime: 22,
    onTimeDelivery: 94,
    totalRevenue: 8950.00,
    avgRating: 4.7,
    availableDrivers: 8,
    busyDrivers: 4
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'picked-up': return 'bg-yellow-100 text-yellow-800';
      case 'on-way': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'assigned': return 'مُعيّن';
      case 'picked-up': return 'تم الاستلام';
      case 'on-way': return 'في الطريق';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getDriverStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDriverStatusText = (status) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'busy': return 'مشغول';
      case 'offline': return 'غير متصل';
      default: return status;
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const DeliveryCard = ({ delivery }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{delivery.id}</CardTitle>
            <CardDescription>طلب: {delivery.orderId}</CardDescription>
          </div>
          <Badge className={getStatusColor(delivery.status)}>
            {getStatusText(delivery.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* معلومات العميل */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{delivery.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{delivery.customerPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{delivery.address}</span>
            </div>
          </div>

          {/* معلومات السائق */}
          <div className="bg-blue-50 p-3 rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">السائق: {delivery.driverName}</p>
                <p className="text-xs text-gray-600">{delivery.driverPhone}</p>
              </div>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* تفاصيل التوصيل */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span>{delivery.orderValue.toFixed(2)} ر.س</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="h-4 w-4 text-blue-500" />
              <span>{delivery.deliveryFee.toFixed(2)} ر.س</span>
            </div>
            <div className="flex items-center gap-1">
              <Route className="h-4 w-4 text-purple-500" />
              <span>{delivery.distance} كم</span>
            </div>
            <div className="flex items-center gap-1">
              <Timer className="h-4 w-4 text-orange-500" />
              <span>{delivery.estimatedTime} دقيقة</span>
            </div>
          </div>

          {/* الأوقات */}
          <div className="space-y-2 text-sm">
            {delivery.startTime && (
              <div className="flex justify-between">
                <span>وقت البدء:</span>
                <span>{delivery.startTime}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>الوصول المتوقع:</span>
              <span>{delivery.estimatedArrival}</span>
            </div>
            {delivery.deliveredTime && (
              <div className="flex justify-between">
                <span>وقت التسليم:</span>
                <span className="text-green-600">{delivery.deliveredTime}</span>
              </div>
            )}
          </div>

          {/* التقييم للطلبات المكتملة */}
          {delivery.status === 'delivered' && delivery.rating && (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">تقييم العميل: {delivery.rating}/5</span>
            </div>
          )}

          {/* ملاحظات */}
          {delivery.notes && (
            <div className="bg-yellow-50 p-2 rounded text-sm">
              <strong>ملاحظات:</strong> {delivery.notes}
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              تتبع
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Navigation className="h-4 w-4 mr-1" />
              خريطة
            </Button>
            {delivery.status === 'assigned' && (
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                تأكيد الاستلام
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DriverCard = ({ driver }) => (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{driver.name}</CardTitle>
            <CardDescription>{driver.vehicle} - {driver.plateNumber}</CardDescription>
          </div>
          <Badge className={getDriverStatusColor(driver.status)}>
            {getDriverStatusText(driver.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* معلومات الاتصال */}
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{driver.phone}</span>
          </div>

          {/* إحصائيات السائق */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{driver.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-blue-500" />
              <span>{driver.completedDeliveries}</span>
            </div>
            <div className="flex items-center gap-1">
              <Route className="h-4 w-4 text-purple-500" />
              <span>{driver.totalDistance} كم</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span>{driver.earnings.toFixed(0)} ر.س</span>
            </div>
          </div>

          {/* التوصيلات النشطة */}
          <div className="flex justify-between items-center">
            <span className="text-sm">التوصيلات النشطة:</span>
            <span className="font-semibold text-blue-600">{driver.activeDeliveries}</span>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-1" />
              اتصال
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <MapPin className="h-4 w-4 mr-1" />
              موقع
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة التوصيل</h1>
          <p className="text-gray-600">متابعة وإدارة عمليات التوصيل والسائقين</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          إضافة سائق
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">توصيلات نشطة</p>
                <p className="text-2xl font-bold text-blue-600">{deliveryStats.activeDeliveries}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مكتملة اليوم</p>
                <p className="text-2xl font-bold text-green-600">{deliveryStats.completedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط وقت التوصيل</p>
                <p className="text-2xl font-bold">{deliveryStats.avgDeliveryTime} دقيقة</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التوصيل في الوقت</p>
                <p className="text-2xl font-bold text-purple-600">{deliveryStats.onTimeDelivery}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active-deliveries">التوصيلات النشطة</TabsTrigger>
          <TabsTrigger value="all-deliveries">جميع التوصيلات</TabsTrigger>
          <TabsTrigger value="drivers">السائقين</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="active-deliveries" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في التوصيلات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة التوصيل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="assigned">مُعيّن</SelectItem>
                    <SelectItem value="picked-up">تم الاستلام</SelectItem>
                    <SelectItem value="on-way">في الطريق</SelectItem>
                    <SelectItem value="delivered">تم التوصيل</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة التوصيلات النشطة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeliveries.filter(delivery => delivery.status !== 'delivered').map(delivery => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-deliveries" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في جميع التوصيلات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة التوصيل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="assigned">مُعيّن</SelectItem>
                    <SelectItem value="picked-up">تم الاستلام</SelectItem>
                    <SelectItem value="on-way">في الطريق</SelectItem>
                    <SelectItem value="delivered">تم التوصيل</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* قائمة جميع التوصيلات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeliveries.map(delivery => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          {/* إحصائيات السائقين */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">سائقين متاحين</p>
                    <p className="text-2xl font-bold text-green-600">{deliveryStats.availableDrivers}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">سائقين مشغولين</p>
                    <p className="text-2xl font-bold text-yellow-600">{deliveryStats.busyDrivers}</p>
                  </div>
                  <Truck className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">متوسط التقييم</p>
                    <p className="text-2xl font-bold text-orange-600">{deliveryStats.avgRating}</p>
                  </div>
                  <Star className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* قائمة السائقين */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>أداء التوصيل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي التوصيلات</span>
                    <span className="font-semibold">{deliveryStats.completedToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط وقت التوصيل</span>
                    <span className="font-semibold">{deliveryStats.avgDeliveryTime} دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل التوصيل في الوقت</span>
                    <span className="font-semibold text-green-600">{deliveryStats.onTimeDelivery}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط التقييم</span>
                    <span className="font-semibold text-orange-600">{deliveryStats.avgRating}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي الإيرادات اليوم</span>
                    <span className="font-semibold text-green-600">{deliveryStats.totalRevenue.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط قيمة التوصيل</span>
                    <span className="font-semibold">{(deliveryStats.totalRevenue / deliveryStats.completedToday).toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>رسوم التوصيل</span>
                    <span className="font-semibold">890.00 ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>أرباح السائقين</span>
                    <span className="font-semibold">2340.00 ر.س</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeliveryManagement;

