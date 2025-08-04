import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  Star,
  Download,
  RefreshCw,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Share2,
  ArrowRight,
  User,
  Building,
  Navigation
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery: string;
  carrier: string;
  timeline: TimelineEvent[];
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variants?: { [key: string]: string };
}

interface Address {
  name: string;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  phone: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
  location?: string;
}

const OrderTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001234',
      date: '2024-08-01',
      status: 'shipped',
      total: 6300,
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-08-05',
      carrier: 'شركة الشحن السريع',
      items: [
        {
          id: '1',
          name: 'لابتوب Dell XPS 13',
          image: '/api/placeholder/80/80',
          price: 4200,
          quantity: 1,
          variants: { color: 'فضي', storage: '512GB' }
        },
        {
          id: '2',
          name: 'سماعات Sony WH-1000XM5',
          image: '/api/placeholder/80/80',
          price: 1050,
          quantity: 2
        }
      ],
      shippingAddress: {
        name: 'أحمد محمد',
        street: 'شارع الملك فهد، حي النخيل',
        city: 'الرياض',
        district: 'النخيل',
        postalCode: '12345',
        phone: '+966501234567'
      },
      timeline: [
        {
          id: '1',
          title: 'تم تأكيد الطلب',
          description: 'تم استلام طلبك وتأكيده بنجاح',
          date: '2024-08-01',
          time: '10:30',
          status: 'completed'
        },
        {
          id: '2',
          title: 'جاري التحضير',
          description: 'يتم تحضير طلبك في المستودع',
          date: '2024-08-01',
          time: '14:15',
          status: 'completed'
        },
        {
          id: '3',
          title: 'تم الشحن',
          description: 'تم شحن طلبك وهو في الطريق إليك',
          date: '2024-08-02',
          time: '09:45',
          status: 'completed',
          location: 'مستودع الرياض'
        },
        {
          id: '4',
          title: 'في الطريق للتسليم',
          description: 'الطلب مع مندوب التوصيل',
          date: '2024-08-03',
          time: '08:00',
          status: 'current',
          location: 'مركز توزيع النخيل'
        },
        {
          id: '5',
          title: 'تم التسليم',
          description: 'سيتم تسليم طلبك قريباً',
          date: '2024-08-05',
          time: '--:--',
          status: 'pending'
        }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-001235',
      date: '2024-07-28',
      status: 'delivered',
      total: 1200,
      trackingNumber: 'TRK123456790',
      estimatedDelivery: '2024-08-01',
      carrier: 'شركة التوصيل المحلي',
      items: [
        {
          id: '3',
          name: 'ساعة Apple Watch Series 9',
          image: '/api/placeholder/80/80',
          price: 1200,
          quantity: 1,
          variants: { color: 'أسود', size: '45mm' }
        }
      ],
      shippingAddress: {
        name: 'فاطمة علي',
        street: 'طريق الملك عبدالعزيز، برج الأعمال',
        city: 'الرياض',
        district: 'العليا',
        postalCode: '12346',
        phone: '+966501234568'
      },
      timeline: [
        {
          id: '1',
          title: 'تم تأكيد الطلب',
          description: 'تم استلام طلبك وتأكيده بنجاح',
          date: '2024-07-28',
          time: '11:20',
          status: 'completed'
        },
        {
          id: '2',
          title: 'جاري التحضير',
          description: 'يتم تحضير طلبك في المستودع',
          date: '2024-07-28',
          time: '15:30',
          status: 'completed'
        },
        {
          id: '3',
          title: 'تم الشحن',
          description: 'تم شحن طلبك وهو في الطريق إليك',
          date: '2024-07-29',
          time: '10:15',
          status: 'completed'
        },
        {
          id: '4',
          title: 'تم التسليم',
          description: 'تم تسليم طلبك بنجاح',
          date: '2024-08-01',
          time: '14:30',
          status: 'completed',
          location: 'تم التسليم للعميل'
        }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-001236',
      date: '2024-08-03',
      status: 'processing',
      total: 850,
      estimatedDelivery: '2024-08-08',
      carrier: 'شركة الشحن السريع',
      items: [
        {
          id: '4',
          name: 'كيبورد لوجيتك MX Keys',
          image: '/api/placeholder/80/80',
          price: 450,
          quantity: 1
        },
        {
          id: '5',
          name: 'ماوس لوجيتك MX Master 3',
          image: '/api/placeholder/80/80',
          price: 400,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'خالد السعد',
        street: 'شارع التحلية، مجمع الأعمال',
        city: 'جدة',
        district: 'التحلية',
        postalCode: '21455',
        phone: '+966501234569'
      },
      timeline: [
        {
          id: '1',
          title: 'تم تأكيد الطلب',
          description: 'تم استلام طلبك وتأكيده بنجاح',
          date: '2024-08-03',
          time: '16:45',
          status: 'completed'
        },
        {
          id: '2',
          title: 'جاري التحضير',
          description: 'يتم تحضير طلبك في المستودع',
          date: '2024-08-04',
          time: '09:00',
          status: 'current'
        },
        {
          id: '3',
          title: 'سيتم الشحن',
          description: 'سيتم شحن طلبك قريباً',
          date: '2024-08-05',
          time: '--:--',
          status: 'pending'
        },
        {
          id: '4',
          title: 'التسليم المتوقع',
          description: 'سيتم تسليم طلبك',
          date: '2024-08-08',
          time: '--:--',
          status: 'pending'
        }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'processing': return 'قيد التحضير';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const renderOrderCard = (order: Order) => (
    <Card key={order.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
            <p className="text-sm text-gray-600">
              تاريخ الطلب: {new Date(order.date).toLocaleDateString('ar-SA')}
            </p>
            {order.trackingNumber && (
              <p className="text-sm text-gray-600">
                رقم التتبع: {order.trackingNumber}
              </p>
            )}
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            <span className="mr-1">{getStatusText(order.status)}</span>
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                {item.variants && (
                  <div className="flex gap-1 mt-1">
                    {Object.entries(item.variants).map(([key, value]) => (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {value}
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-600">الكمية: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium">{(item.price * item.quantity).toLocaleString()} ريال</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600">المجموع الكلي</p>
            <p className="font-bold text-blue-600">{order.total.toLocaleString()} ريال</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedOrder(order.id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              تفاصيل
            </Button>
            {order.status === 'delivered' && (
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                تقييم
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOrderDetails = (order: Order) => (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
          <p className="text-gray-600">
            تاريخ الطلب: {new Date(order.date).toLocaleDateString('ar-SA')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            تحميل الفاتورة
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            مشاركة
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
            <ArrowRight className="h-4 w-4 mr-2" />
            العودة
          </Button>
        </div>
      </div>

      {/* Status and Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              حالة الطلب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(order.status)} text-base px-3 py-1`}>
                  {getStatusIcon(order.status)}
                  <span className="mr-2">{getStatusText(order.status)}</span>
                </Badge>
              </div>
              {order.trackingNumber && (
                <div>
                  <Label className="text-sm font-medium">رقم التتبع</Label>
                  <p className="font-mono text-lg">{order.trackingNumber}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">شركة الشحن</Label>
                <p>{order.carrier}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">التسليم المتوقع</Label>
                <p>{new Date(order.estimatedDelivery).toLocaleDateString('ar-SA')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              عنوان التسليم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.district}, {order.shippingAddress.city}</p>
              <p>الرمز البريدي: {order.shippingAddress.postalCode}</p>
              <p className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {order.shippingAddress.phone}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            تتبع الشحنة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.timeline.map((event, index) => (
              <div key={event.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : event.status === 'current'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {event.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : event.status === 'current' ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <div className="w-2 h-2 bg-current rounded-full" />
                    )}
                  </div>
                  {index < order.timeline.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 ${
                      event.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${
                      event.status === 'current' ? 'text-blue-600' : ''
                    }`}>
                      {event.title}
                    </h4>
                    <span className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('ar-SA')} - {event.time}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                  {event.location && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  {item.variants && (
                    <div className="flex gap-2 mt-1">
                      {Object.entries(item.variants).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{(item.price * item.quantity).toLocaleString()} ريال</p>
                  <p className="text-sm text-gray-600">{item.price.toLocaleString()} ريال / قطعة</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-bold">
              <span>المجموع الكلي</span>
              <span className="text-blue-600">{order.total.toLocaleString()} ريال</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        {order.status === 'delivered' && (
          <>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" />
              تقييم المنتجات
            </Button>
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              تواصل مع البائع
            </Button>
          </>
        )}
        {order.status === 'shipped' && (
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث التتبع
          </Button>
        )}
        {(order.status === 'pending' || order.status === 'confirmed') && (
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <AlertCircle className="h-4 w-4 mr-2" />
            إلغاء الطلب
          </Button>
        )}
      </div>
    </div>
  );

  if (selectedOrder) {
    const order = orders.find(o => o.id === selectedOrder);
    if (order) {
      return (
        <div className="container mx-auto p-6" dir="rtl">
          {renderOrderDetails(order)}
        </div>
      );
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-8 w-8 text-blue-600" />
            تتبع الطلبات
          </h1>
          <p className="text-gray-600 mt-2">تابع حالة طلباتك وشحناتك</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          تحديث
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث برقم الطلب أو رقم التتبع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                فلتر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">الكل ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">في الانتظار ({orders.filter(o => o.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="processing">قيد التحضير ({orders.filter(o => o.status === 'processing').length})</TabsTrigger>
          <TabsTrigger value="shipped">تم الشحن ({orders.filter(o => o.status === 'shipped').length})</TabsTrigger>
          <TabsTrigger value="delivered">تم التسليم ({orders.filter(o => o.status === 'delivered').length})</TabsTrigger>
          <TabsTrigger value="cancelled">ملغي ({orders.filter(o => o.status === 'cancelled').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">لا توجد طلبات</h2>
                <p className="text-gray-600 mb-6">لم يتم العثور على طلبات تطابق البحث</p>
                <Button>
                  ابدأ التسوق
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map(renderOrderCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Track */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            تتبع سريع
          </CardTitle>
          <CardDescription>
            أدخل رقم الطلب أو رقم التتبع للحصول على التحديثات فوراً
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="رقم الطلب أو رقم التتبع" className="flex-1" />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              تتبع
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>هل تحتاج مساعدة؟</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
              <Phone className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium">اتصل بنا</p>
                <p className="text-sm text-gray-600">920012345</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
              <Mail className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium">راسلنا</p>
                <p className="text-sm text-gray-600">support@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
              <MessageCircle className="h-8 w-8 text-purple-600" />
              <div>
                <p className="font-medium">الدردشة المباشرة</p>
                <p className="text-sm text-gray-600">متاح 24/7</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracking;

