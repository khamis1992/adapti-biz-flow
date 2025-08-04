import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  MessageCircle,
  RefreshCw,
  FileText,
  Printer,
  Send,
  Archive,
  RotateCcw,
  Ban,
  CheckSquare,
  User,
  CreditCard,
  Building,
  Navigation
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  quantity: number;
  variants?: { [key: string]: string };
  total: number;
}

interface Address {
  name: string;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  phone: string;
  email?: string;
}

const EcommerceOrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string>('all');

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001234',
      customerName: 'أحمد محمد السعد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      orderDate: '2024-08-04T10:30:00',
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'بطاقة ائتمان',
      total: 6300,
      subtotal: 5250,
      tax: 787.5,
      shipping: 25,
      discount: 262.5,
      priority: 'high',
      items: [
        {
          id: '1',
          productId: 'LAPTOP-001',
          name: 'لابتوب Dell XPS 13',
          image: '/api/placeholder/80/80',
          sku: 'LAPTOP-DELL-001',
          price: 4200,
          quantity: 1,
          variants: { color: 'فضي', storage: '512GB' },
          total: 4200
        },
        {
          id: '2',
          productId: 'HEADPHONES-001',
          name: 'سماعات Sony WH-1000XM5',
          image: '/api/placeholder/80/80',
          sku: 'HEADPHONES-SONY-001',
          price: 1050,
          quantity: 1,
          total: 1050
        }
      ],
      shippingAddress: {
        name: 'أحمد محمد السعد',
        street: 'شارع الملك فهد، حي النخيل، مبنى 123',
        city: 'الرياض',
        district: 'النخيل',
        postalCode: '12345',
        phone: '+966501234567'
      },
      billingAddress: {
        name: 'أحمد محمد السعد',
        street: 'شارع الملك فهد، حي النخيل، مبنى 123',
        city: 'الرياض',
        district: 'النخيل',
        postalCode: '12345',
        phone: '+966501234567',
        email: 'ahmed@example.com'
      },
      trackingNumber: 'TRK123456789',
      carrier: 'شركة الشحن السريع',
      estimatedDelivery: '2024-08-08',
      notes: 'يرجى التسليم في المساء بعد الساعة 6'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-001235',
      customerName: 'فاطمة علي الأحمد',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966501234568',
      orderDate: '2024-08-04T14:15:00',
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'STC Pay',
      total: 1275,
      subtotal: 1200,
      tax: 180,
      shipping: 0,
      discount: 105,
      priority: 'medium',
      items: [
        {
          id: '3',
          productId: 'WATCH-001',
          name: 'ساعة Apple Watch Series 9',
          image: '/api/placeholder/80/80',
          sku: 'WATCH-APPLE-001',
          price: 1200,
          quantity: 1,
          variants: { color: 'أسود', size: '45mm' },
          total: 1200
        }
      ],
      shippingAddress: {
        name: 'فاطمة علي الأحمد',
        street: 'طريق الملك عبدالعزيز، برج الأعمال، الطابق 15',
        city: 'الرياض',
        district: 'العليا',
        postalCode: '12346',
        phone: '+966501234568'
      },
      billingAddress: {
        name: 'فاطمة علي الأحمد',
        street: 'طريق الملك عبدالعزيز، برج الأعمال، الطابق 15',
        city: 'الرياض',
        district: 'العليا',
        postalCode: '12346',
        phone: '+966501234568',
        email: 'fatima@example.com'
      },
      trackingNumber: 'TRK123456790',
      carrier: 'شركة التوصيل المحلي',
      estimatedDelivery: '2024-08-06'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-001236',
      customerName: 'خالد عبدالله النصر',
      customerEmail: 'khalid@example.com',
      customerPhone: '+966501234569',
      orderDate: '2024-08-04T16:45:00',
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'الدفع عند الاستلام',
      total: 875,
      subtotal: 850,
      tax: 127.5,
      shipping: 25,
      discount: 127.5,
      priority: 'urgent',
      items: [
        {
          id: '4',
          productId: 'KEYBOARD-001',
          name: 'كيبورد لوجيتك MX Keys',
          image: '/api/placeholder/80/80',
          sku: 'KEYBOARD-LOGITECH-001',
          price: 450,
          quantity: 1,
          total: 450
        },
        {
          id: '5',
          productId: 'MOUSE-001',
          name: 'ماوس لوجيتك MX Master 3',
          image: '/api/placeholder/80/80',
          sku: 'MOUSE-LOGITECH-001',
          price: 400,
          quantity: 1,
          total: 400
        }
      ],
      shippingAddress: {
        name: 'خالد عبدالله النصر',
        street: 'شارع التحلية، مجمع الأعمال، مكتب 205',
        city: 'جدة',
        district: 'التحلية',
        postalCode: '21455',
        phone: '+966501234569'
      },
      billingAddress: {
        name: 'خالد عبدالله النصر',
        street: 'شارع التحلية، مجمع الأعمال، مكتب 205',
        city: 'جدة',
        district: 'التحلية',
        postalCode: '21455',
        phone: '+966501234569',
        email: 'khalid@example.com'
      },
      notes: 'طلب عاجل - يرجى التواصل قبل التسليم'
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
      case 'refunded': return 'bg-gray-100 text-gray-800';
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
      case 'refunded': return 'مسترد';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'paid': return 'مدفوع';
      case 'failed': return 'فشل';
      case 'refunded': return 'مسترد';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'منخفضة';
      case 'medium': return 'متوسطة';
      case 'high': return 'عالية';
      case 'urgent': return 'عاجلة';
      default: return priority;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
    const matchesPriority = selectedPriority === 'all' || order.priority === selectedPriority;
    
    // Date filter logic would go here
    
    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesPriority;
  });

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
      avgOrderValue: orders.reduce((sum, o) => sum + o.total, 0) / orders.length,
      pendingPayments: orders.filter(o => o.paymentStatus === 'pending').length
    };
  };

  const stats = getOrderStats();

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length 
        ? [] 
        : filteredOrders.map(o => o.id)
    );
  };

  const renderOrderCard = (order: Order) => {
    const isSelected = selectedOrders.includes(order.id);
    
    return (
      <Card key={order.id} className={`hover:shadow-lg transition-shadow duration-300 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleSelectOrder(order.id)}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                <p className="text-sm text-gray-600">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.orderDate).toLocaleDateString('ar-SA')} - {new Date(order.orderDate).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {getPaymentStatusText(order.paymentStatus)}
              </Badge>
              <Badge className={getPriorityColor(order.priority)}>
                {getPriorityText(order.priority)}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.variants && (
                    <div className="flex gap-1">
                      {Object.entries(item.variants).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-sm">×{item.quantity}</span>
                <span className="text-sm font-medium">{item.total.toLocaleString()} ريال</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {order.paymentMethod}
              </span>
              {order.trackingNumber && (
                <span className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {order.trackingNumber}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-600">
                {order.total.toLocaleString()} ريال
              </span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderOrderDetails = (order: Order) => (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
          <p className="text-gray-600">
            {new Date(order.orderDate).toLocaleDateString('ar-SA')} - {new Date(order.orderDate).toLocaleTimeString('ar-SA')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            طباعة
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
            العودة
          </Button>
        </div>
      </div>

      {/* Status and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">حالة الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>حالة الطلب:</span>
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>حالة الدفع:</span>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {getPaymentStatusText(order.paymentStatus)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>الأولوية:</span>
              <Badge className={getPriorityColor(order.priority)}>
                {getPriorityText(order.priority)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات الشحن</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {order.trackingNumber && (
              <div>
                <span className="font-medium">رقم التتبع:</span>
                <p className="font-mono">{order.trackingNumber}</p>
              </div>
            )}
            {order.carrier && (
              <div>
                <span className="font-medium">شركة الشحن:</span>
                <p>{order.carrier}</p>
              </div>
            )}
            {order.estimatedDelivery && (
              <div>
                <span className="font-medium">التسليم المتوقع:</span>
                <p>{new Date(order.estimatedDelivery).toLocaleDateString('ar-SA')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <CheckCircle className="h-4 w-4 mr-2" />
              تأكيد الطلب
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Package className="h-4 w-4 mr-2" />
              تحديث الشحن
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <MessageCircle className="h-4 w-4 mr-2" />
              تواصل مع العميل
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات العميل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="font-medium">الاسم</Label>
              <p>{order.customerName}</p>
            </div>
            <div>
              <Label className="font-medium">البريد الإلكتروني</Label>
              <p className="flex items-center gap-2">
                {order.customerEmail}
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </p>
            </div>
            <div>
              <Label className="font-medium">رقم الهاتف</Label>
              <p className="flex items-center gap-2">
                {order.customerPhone}
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              معلومات الدفع
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="font-medium">طريقة الدفع</Label>
              <p>{order.paymentMethod}</p>
            </div>
            <div>
              <Label className="font-medium">حالة الدفع</Label>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {getPaymentStatusText(order.paymentStatus)}
              </Badge>
            </div>
            <div>
              <Label className="font-medium">المبلغ المدفوع</Label>
              <p className="text-lg font-bold text-green-600">
                {order.paymentStatus === 'paid' ? order.total.toLocaleString() : '0'} ريال
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              عنوان التسليم
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.district}, {order.shippingAddress.city}</p>
            <p>الرمز البريدي: {order.shippingAddress.postalCode}</p>
            <p className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {order.shippingAddress.phone}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              عنوان الفوترة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">{order.billingAddress.name}</p>
            <p>{order.billingAddress.street}</p>
            <p>{order.billingAddress.district}, {order.billingAddress.city}</p>
            <p>الرمز البريدي: {order.billingAddress.postalCode}</p>
            <p className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {order.billingAddress.phone}
            </p>
            {order.billingAddress.email && (
              <p className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {order.billingAddress.email}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

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
                  <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                  {item.variants && (
                    <div className="flex gap-2 mt-1">
                      {Object.entries(item.variants).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="font-medium">×{item.quantity}</p>
                  <p className="text-sm text-gray-600">{item.price.toLocaleString()} ريال</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.total.toLocaleString()} ريال</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span>{order.subtotal.toLocaleString()} ريال</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>الخصم:</span>
                <span>-{order.discount.toLocaleString()} ريال</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>الشحن:</span>
              <span>{order.shipping === 0 ? 'مجاني' : `${order.shipping.toLocaleString()} ريال`}</span>
            </div>
            <div className="flex justify-between">
              <span>ضريبة القيمة المضافة:</span>
              <span>{order.tax.toLocaleString()} ريال</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>المجموع الكلي:</span>
              <span className="text-blue-600">{order.total.toLocaleString()} ريال</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {order.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              ملاحظات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{order.notes}</p>
          </CardContent>
        </Card>
      )}
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
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            إدارة الطلبات
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لطلبات المتجر الإلكتروني</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% من الشهر الماضي
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-green-600">{(stats.totalRevenue / 1000).toFixed(0)}K ريال</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% من الشهر الماضي
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط قيمة الطلب</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgOrderValue.toFixed(0)} ريال</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5% من الشهر الماضي
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مدفوعات معلقة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingPayments}</p>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  يحتاج متابعة
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث برقم الطلب أو اسم العميل أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">في الانتظار</option>
                <option value="confirmed">مؤكد</option>
                <option value="processing">قيد التحضير</option>
                <option value="shipped">تم الشحن</option>
                <option value="delivered">تم التسليم</option>
                <option value="cancelled">ملغي</option>
                <option value="refunded">مسترد</option>
              </select>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">جميع المدفوعات</option>
                <option value="pending">في الانتظار</option>
                <option value="paid">مدفوع</option>
                <option value="failed">فشل</option>
                <option value="refunded">مسترد</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">جميع الأولويات</option>
                <option value="low">منخفضة</option>
                <option value="medium">متوسطة</option>
                <option value="high">عالية</option>
                <option value="urgent">عاجلة</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>عرض {filteredOrders.length} من {orders.length} طلب</span>
              {selectedOrders.length > 0 && (
                <span className="text-blue-600 font-medium">
                  تم تحديد {selectedOrders.length} طلب
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedOrders.length === filteredOrders.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>تحديد الكل</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-800">
                تم تحديد {selectedOrders.length} طلب
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  تأكيد مجمع
                </Button>
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  تحديث الشحن
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                  <Ban className="h-4 w-4 mr-2" />
                  إلغاء
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">الكل ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">في الانتظار ({stats.pending})</TabsTrigger>
          <TabsTrigger value="processing">قيد التحضير ({stats.processing})</TabsTrigger>
          <TabsTrigger value="shipped">تم الشحن ({stats.shipped})</TabsTrigger>
          <TabsTrigger value="delivered">تم التسليم ({stats.delivered})</TabsTrigger>
          <TabsTrigger value="cancelled">ملغي ({stats.cancelled})</TabsTrigger>
          <TabsTrigger value="urgent">عاجل</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">لا توجد طلبات</h2>
                <p className="text-gray-600 mb-6">لم يتم العثور على طلبات تطابق البحث</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(renderOrderCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EcommerceOrderManagement;

