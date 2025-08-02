import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  ChefHat, 
  Timer, 
  TrendingUp,
  Flame,
  Thermometer,
  Bell,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Eye,
  Utensils,
  Package
} from 'lucide-react';

const KitchenManagement = () => {
  const [activeTab, setActiveTab] = useState('active-orders');

  // بيانات تجريبية لطلبات المطبخ
  const kitchenOrders = [
    {
      id: 'ORD-001',
      orderNumber: '001',
      customerName: 'أحمد محمد',
      orderType: 'delivery',
      priority: 'high',
      status: 'preparing',
      items: [
        { 
          name: 'برجر كلاسيكي', 
          quantity: 2, 
          station: 'grill',
          preparationTime: 8,
          currentTime: 5,
          status: 'preparing',
          notes: 'بدون بصل'
        },
        { 
          name: 'بطاطس مقلية', 
          quantity: 1, 
          station: 'fryer',
          preparationTime: 5,
          currentTime: 3,
          status: 'preparing',
          notes: ''
        }
      ],
      totalTime: 15,
      elapsedTime: 8,
      estimatedCompletion: '14:45',
      orderTime: '14:30'
    },
    {
      id: 'ORD-002',
      orderNumber: '002',
      customerName: 'فاطمة أحمد',
      orderType: 'dine-in',
      priority: 'normal',
      status: 'ready',
      items: [
        { 
          name: 'سلطة قيصر', 
          quantity: 1, 
          station: 'cold',
          preparationTime: 5,
          currentTime: 5,
          status: 'completed',
          notes: ''
        }
      ],
      totalTime: 5,
      elapsedTime: 5,
      estimatedCompletion: '14:20',
      orderTime: '14:15'
    },
    {
      id: 'ORD-003',
      orderNumber: '003',
      customerName: 'محمد علي',
      orderType: 'takeaway',
      priority: 'urgent',
      status: 'pending',
      items: [
        { 
          name: 'بيتزا مارجريتا', 
          quantity: 1, 
          station: 'oven',
          preparationTime: 12,
          currentTime: 0,
          status: 'pending',
          notes: 'مقرمشة'
        }
      ],
      totalTime: 12,
      elapsedTime: 0,
      estimatedCompletion: '15:00',
      orderTime: '14:48'
    }
  ];

  // بيانات محطات المطبخ
  const kitchenStations = [
    {
      id: 'grill',
      name: 'الشواية',
      icon: <Flame className="h-6 w-6" />,
      activeOrders: 3,
      capacity: 6,
      status: 'busy',
      temperature: 180,
      chef: 'أحمد الطباخ'
    },
    {
      id: 'fryer',
      name: 'المقلاة',
      icon: <Thermometer className="h-6 w-6" />,
      activeOrders: 2,
      capacity: 4,
      status: 'normal',
      temperature: 175,
      chef: 'سارة المساعدة'
    },
    {
      id: 'oven',
      name: 'الفرن',
      icon: <Package className="h-6 w-6" />,
      activeOrders: 1,
      capacity: 8,
      status: 'available',
      temperature: 220,
      chef: 'محمد الخباز'
    },
    {
      id: 'cold',
      name: 'المحطة الباردة',
      icon: <Utensils className="h-6 w-6" />,
      activeOrders: 0,
      capacity: 10,
      status: 'available',
      temperature: 4,
      chef: 'فاطمة السلطات'
    }
  ];

  const kitchenStats = {
    activeOrders: 6,
    completedToday: 89,
    avgPreparationTime: 18,
    onTimeDelivery: 94,
    busyStations: 2,
    availableChefs: 4
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالي';
      case 'normal': return 'عادي';
      case 'low': return 'منخفض';
      default: return priority;
    }
  };

  const getStationStatusColor = (status) => {
    switch (status) {
      case 'busy': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStationStatusText = (status) => {
    switch (status) {
      case 'busy': return 'مشغول';
      case 'normal': return 'عادي';
      case 'available': return 'متاح';
      default: return status;
    }
  };

  const KitchenOrderCard = ({ order }) => {
    const progress = (order.elapsedTime / order.totalTime) * 100;
    
    return (
      <Card className={`hover:shadow-lg transition-shadow ${order.priority === 'urgent' ? 'border-red-500' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">طلب #{order.orderNumber}</CardTitle>
              <CardDescription>{order.customerName}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={getPriorityColor(order.priority)}>
                {getPriorityText(order.priority)}
              </Badge>
              <Badge variant={order.status === 'ready' ? 'default' : 'secondary'}>
                {order.status === 'preparing' ? 'قيد التحضير' : 
                 order.status === 'ready' ? 'جاهز' : 'في الانتظار'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* تقدم الطلب */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">تقدم التحضير</span>
                <span className="text-sm text-gray-600">
                  {order.elapsedTime}/{order.totalTime} دقيقة
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* أصناف الطلب */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">الأصناف:</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.station === 'grill' ? 'شواية' :
                         item.station === 'fryer' ? 'مقلاة' :
                         item.station === 'oven' ? 'فرن' : 'باردة'}
                      </Badge>
                    </div>
                    {item.notes && (
                      <p className="text-xs text-gray-600 mt-1">ملاحظة: {item.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{item.currentTime}/{item.preparationTime}د</span>
                    {item.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* معلومات الوقت */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>وقت الطلب: {order.orderTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bell className="h-4 w-4 text-blue-500" />
                <span>متوقع: {order.estimatedCompletion}</span>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex gap-2 pt-2">
              {order.status === 'pending' && (
                <Button size="sm" className="flex-1">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  بدء التحضير
                </Button>
              )}
              {order.status === 'preparing' && (
                <>
                  <Button size="sm" variant="outline">
                    <PauseCircle className="h-4 w-4 mr-1" />
                    إيقاف مؤقت
                  </Button>
                  <Button size="sm" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    جاهز
                  </Button>
                </>
              )}
              {order.status === 'ready' && (
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  تم التسليم
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const StationCard = ({ station }) => (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {station.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{station.name}</CardTitle>
              <CardDescription>{station.chef}</CardDescription>
            </div>
          </div>
          <Badge className={getStationStatusColor(station.status)}>
            {getStationStatusText(station.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* استخدام المحطة */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">الاستخدام</span>
              <span className="text-sm text-gray-600">
                {station.activeOrders}/{station.capacity}
              </span>
            </div>
            <Progress value={(station.activeOrders / station.capacity) * 100} className="h-2" />
          </div>

          {/* درجة الحرارة */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span className="text-sm">درجة الحرارة</span>
            </div>
            <span className="font-semibold">{station.temperature}°م</span>
          </div>

          {/* الطلبات النشطة */}
          <div className="flex justify-between items-center">
            <span className="text-sm">الطلبات النشطة</span>
            <span className="font-semibold text-blue-600">{station.activeOrders}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة المطبخ</h1>
          <p className="text-gray-600">مراقبة وإدارة عمليات المطبخ والتحضير</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            الإشعارات
          </Button>
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طلبات نشطة</p>
                <p className="text-2xl font-bold text-blue-600">{kitchenStats.activeOrders}</p>
              </div>
              <ChefHat className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مكتملة اليوم</p>
                <p className="text-2xl font-bold text-green-600">{kitchenStats.completedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التحضير</p>
                <p className="text-2xl font-bold">{kitchenStats.avgPreparationTime}د</p>
              </div>
              <Timer className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التسليم في الوقت</p>
                <p className="text-2xl font-bold text-purple-600">{kitchenStats.onTimeDelivery}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">محطات مشغولة</p>
                <p className="text-2xl font-bold text-orange-600">{kitchenStats.busyStations}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طباخين متاحين</p>
                <p className="text-2xl font-bold text-indigo-600">{kitchenStats.availableChefs}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active-orders">الطلبات النشطة</TabsTrigger>
          <TabsTrigger value="stations">محطات المطبخ</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="active-orders" className="space-y-4">
          {/* طلبات عاجلة */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-red-600">طلبات عاجلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kitchenOrders.filter(order => order.priority === 'urgent').map(order => (
                <KitchenOrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          {/* طلبات عادية */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">طلبات أخرى</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kitchenOrders.filter(order => order.priority !== 'urgent').map(order => (
                <KitchenOrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kitchenStations.map(station => (
              <StationCard key={station.id} station={station} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>أداء المحطات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kitchenStations.map(station => (
                    <div key={station.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {station.icon}
                        <span>{station.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(station.activeOrders / station.capacity) * 100} 
                          className="w-20 h-2" 
                        />
                        <span className="text-sm w-12">
                          {Math.round((station.activeOrders / station.capacity) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
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
                    <span>متوسط وقت التحضير</span>
                    <span className="font-semibold">{kitchenStats.avgPreparationTime} دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل التسليم في الوقت</span>
                    <span className="font-semibold text-green-600">{kitchenStats.onTimeDelivery}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الطلبات المكتملة اليوم</span>
                    <span className="font-semibold">{kitchenStats.completedToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>كفاءة المطبخ</span>
                    <span className="font-semibold text-blue-600">92%</span>
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

export default KitchenManagement;

