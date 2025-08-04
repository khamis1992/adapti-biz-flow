import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Package, 
  Truck, 
  CreditCard,
  MapPin,
  User,
  Settings,
  Bell,
  Gift,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Repeat,
  MessageCircle
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  options?: { [key: string]: string };
}

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  rating: number;
  discount?: number;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet';
  name: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const CustomerShopping = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock customer data
  const customerInfo = {
    name: 'أحمد محمد الأحمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    memberSince: '2023-01-15',
    loyaltyPoints: 2500,
    totalOrders: 45,
    totalSpent: 125000
  };

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-08-01',
      status: 'delivered',
      total: 2500,
      items: [
        {
          id: '1',
          name: 'لابتوب Dell XPS 13',
          image: '/api/placeholder/100/100',
          price: 2500,
          quantity: 1
        }
      ],
      shippingAddress: 'شارع الملك فهد، الرياض 12345',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-08-05'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-08-03',
      status: 'shipped',
      total: 1200,
      items: [
        {
          id: '2',
          name: 'سماعات Sony WH-1000XM5',
          image: '/api/placeholder/100/100',
          price: 1200,
          quantity: 1
        }
      ],
      shippingAddress: 'شارع الملك فهد، الرياض 12345',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-08-07'
    }
  ]);

  // Mock wishlist data
  const [wishlist] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'هاتف iPhone 15 Pro',
      image: '/api/placeholder/100/100',
      price: 4200,
      inStock: true,
      rating: 4.9,
      discount: 5
    },
    {
      id: '2',
      name: 'ساعة Apple Watch Series 9',
      image: '/api/placeholder/100/100',
      price: 1800,
      originalPrice: 2000,
      inStock: false,
      rating: 4.6,
      discount: 10
    }
  ]);

  // Mock addresses data
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      name: 'المنزل',
      phone: '+966501234567',
      address: 'شارع الملك فهد، حي العليا',
      city: 'الرياض',
      postalCode: '12345',
      isDefault: true
    },
    {
      id: '2',
      name: 'المكتب',
      phone: '+966509876543',
      address: 'طريق الملك عبدالعزيز، حي الملز',
      city: 'الرياض',
      postalCode: '12346',
      isDefault: false
    }
  ]);

  // Mock payment methods data
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'بطاقة الراجحي',
      lastFour: '1234',
      expiryDate: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'wallet',
      name: 'محفظة STC Pay',
      isDefault: false
    }
  ]);

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'تم التسليم';
      case 'shipped': return 'تم الشحن';
      case 'confirmed': return 'تم التأكيد';
      case 'pending': return 'في الانتظار';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            لوحة تحكم التسوق
          </h1>
          <p className="text-gray-600 mt-2">مرحباً {customerInfo.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{customerInfo.totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المشتريات</p>
                <p className="text-2xl font-bold text-gray-900">{customerInfo.totalSpent.toLocaleString()} ريال</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">نقاط الولاء</p>
                <p className="text-2xl font-bold text-gray-900">{customerInfo.loyaltyPoints.toLocaleString()}</p>
              </div>
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المفضلة</p>
                <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="orders">طلباتي</TabsTrigger>
          <TabsTrigger value="wishlist">المفضلة</TabsTrigger>
          <TabsTrigger value="addresses">العناوين</TabsTrigger>
          <TabsTrigger value="payments">طرق الدفع</TabsTrigger>
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>طلباتي الأخيرة</CardTitle>
              <CardDescription>عرض وتتبع جميع طلباتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">طلب رقم: {order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <Badge className={getOrderStatusColor(order.status)}>
                        {getOrderStatusText(order.status)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              الكمية: {item.quantity} | السعر: {item.price.toLocaleString()} ريال
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <div>
                        <span className="text-lg font-bold">
                          المجموع: {order.total.toLocaleString()} ريال
                        </span>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-600">
                            رقم التتبع: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          التفاصيل
                        </Button>
                        {order.status === 'shipped' && (
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            تتبع الطلب
                          </Button>
                        )}
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            <Repeat className="h-4 w-4 mr-2" />
                            إعادة الطلب
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة المفضلة</CardTitle>
              <CardDescription>المنتجات التي أضفتها لقائمة المفضلة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="relative mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      {item.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          خصم {item.discount}%
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-medium mb-2">{item.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(item.rating)}
                      <span className="text-sm text-gray-600 mr-1">
                        ({item.rating})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-blue-600">
                        {item.price.toLocaleString()} ريال
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {item.originalPrice.toLocaleString()} ريال
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={!item.inStock}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        {item.inStock ? 'أضف للسلة' : 'غير متوفر'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>عناوين الشحن</CardTitle>
                  <CardDescription>إدارة عناوين التسليم الخاصة بك</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  إضافة عنوان جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{address.name}</h3>
                      {address.isDefault && (
                        <Badge variant="secondary">افتراضي</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{address.address}</p>
                      <p>{address.city} {address.postalCode}</p>
                      <p>{address.phone}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm">
                        حذف
                      </Button>
                      {!address.isDefault && (
                        <Button variant="outline" size="sm">
                          جعله افتراضي
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>طرق الدفع</CardTitle>
                  <CardDescription>إدارة طرق الدفع المحفوظة</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  إضافة طريقة دفع
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          {method.lastFour && (
                            <p className="text-sm text-gray-600">
                              **** **** **** {method.lastFour}
                              {method.expiryDate && ` | ينتهي في ${method.expiryDate}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary">افتراضي</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm">
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>تحديث بياناتك الشخصية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input id="name" defaultValue={customerInfo.name} />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue={customerInfo.email} />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" defaultValue={customerInfo.phone} />
                </div>
                <Button className="w-full">
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الحساب</CardTitle>
                <CardDescription>ملخص نشاطك في المتجر</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>عضو منذ:</span>
                  <span className="font-medium">
                    {new Date(customerInfo.memberSince).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>إجمالي الطلبات:</span>
                  <span className="font-medium">{customerInfo.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>إجمالي المشتريات:</span>
                  <span className="font-medium">{customerInfo.totalSpent.toLocaleString()} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span>نقاط الولاء:</span>
                  <span className="font-medium">{customerInfo.loyaltyPoints.toLocaleString()} نقطة</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>تفضيلات الإشعارات</CardTitle>
              <CardDescription>اختر كيفية تلقي الإشعارات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات الطلبات</p>
                    <p className="text-sm text-gray-600">تلقي إشعارات حول حالة طلباتك</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">العروض والخصومات</p>
                    <p className="text-sm text-gray-600">تلقي إشعارات العروض الخاصة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">المنتجات الجديدة</p>
                    <p className="text-sm text-gray-600">إشعارات المنتجات الجديدة في المفضلة</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerShopping;

