import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  ShoppingBag, 
  FileText, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Clock,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  Star,
  MessageCircle,
  Bell,
  Settings
} from 'lucide-react';

interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
}

interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  downloadUrl: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  lastUpdate: string;
}

const CustomerPortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock customer data
  const customerInfo = {
    id: 'CUST-001',
    name: 'شركة الأعمال المتقدمة',
    email: 'info@advanced-business.com',
    phone: '+966501234567',
    address: 'شارع الملك فهد، الرياض 12345',
    memberSince: '2023-01-15',
    totalOrders: 45,
    totalSpent: 125000,
    loyaltyPoints: 2500
  };

  // Mock orders data
  const [orders] = useState<CustomerOrder[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-08-01',
      status: 'delivered',
      total: 5500,
      items: 3,
      trackingNumber: 'TRK123456789'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-08-03',
      status: 'shipped',
      total: 3200,
      items: 2,
      trackingNumber: 'TRK987654321'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-08-04',
      status: 'processing',
      total: 7800,
      items: 5
    }
  ]);

  // Mock invoices data
  const [invoices] = useState<CustomerInvoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      date: '2024-08-01',
      dueDate: '2024-08-31',
      amount: 5500,
      status: 'paid',
      downloadUrl: '/invoices/INV-2024-001.pdf'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      date: '2024-08-03',
      dueDate: '2024-09-02',
      amount: 3200,
      status: 'pending',
      downloadUrl: '/invoices/INV-2024-002.pdf'
    }
  ]);

  // Mock support tickets
  const [tickets] = useState<SupportTicket[]>([
    {
      id: '1',
      subject: 'مشكلة في تسجيل الدخول',
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-08-01',
      lastUpdate: '2024-08-02'
    },
    {
      id: '2',
      subject: 'استفسار عن الفاتورة',
      status: 'in_progress',
      priority: 'low',
      createdDate: '2024-08-03',
      lastUpdate: '2024-08-04'
    }
  ]);

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'تم التسليم';
      case 'shipped': return 'تم الشحن';
      case 'processing': return 'قيد المعالجة';
      case 'pending': return 'في الانتظار';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvoiceStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'مدفوعة';
      case 'pending': return 'في الانتظار';
      case 'overdue': return 'متأخرة';
      default: return status;
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTicketStatusText = (status: string) => {
    switch (status) {
      case 'resolved': return 'تم الحل';
      case 'in_progress': return 'قيد المعالجة';
      case 'open': return 'مفتوحة';
      case 'closed': return 'مغلقة';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return priority;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <User className="h-8 w-8 text-blue-600" />
            بوابة العميل
          </h1>
          <p className="text-gray-600 mt-2">مرحباً بك في بوابة العميل الخاصة بك</p>
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

      {/* Customer Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات الحساب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">اسم الشركة</p>
                <p className="font-medium">{customerInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                <p className="font-medium">{customerInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">رقم الهاتف</p>
                <p className="font-medium">{customerInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">نقاط الولاء</p>
                <p className="font-medium">{customerInfo.loyaltyPoints.toLocaleString()} نقطة</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{customerInfo.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">عضو منذ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Date(customerInfo.memberSince).getFullYear()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">الطلبات</TabsTrigger>
          <TabsTrigger value="invoices">الفواتير</TabsTrigger>
          <TabsTrigger value="support">الدعم الفني</TabsTrigger>
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>طلباتي</CardTitle>
                  <CardDescription>عرض وتتبع جميع طلباتك</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  طلب جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">طلب رقم: {order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">
                          تاريخ الطلب: {new Date(order.date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <Badge className={getOrderStatusColor(order.status)}>
                        {getOrderStatusText(order.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">إجمالي المبلغ: </span>
                        <span className="font-medium">{order.total.toLocaleString()} ريال</span>
                      </div>
                      <div>
                        <span className="text-gray-600">عدد الأصناف: </span>
                        <span className="font-medium">{order.items}</span>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <span className="text-gray-600">رقم التتبع: </span>
                          <span className="font-medium">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        عرض التفاصيل
                      </Button>
                      {order.trackingNumber && (
                        <Button variant="outline" size="sm">
                          تتبع الطلب
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-2" />
                          تقييم
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الفواتير</CardTitle>
              <CardDescription>عرض وتحميل جميع فواتيرك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">فاتورة رقم: {invoice.invoiceNumber}</h3>
                        <p className="text-sm text-gray-600">
                          تاريخ الإصدار: {new Date(invoice.date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <Badge className={getInvoiceStatusColor(invoice.status)}>
                        {getInvoiceStatusText(invoice.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">المبلغ: </span>
                        <span className="font-medium">{invoice.amount.toLocaleString()} ريال</span>
                      </div>
                      <div>
                        <span className="text-gray-600">تاريخ الاستحقاق: </span>
                        <span className="font-medium">{new Date(invoice.dueDate).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">الحالة: </span>
                        <span className="font-medium">{getInvoiceStatusText(invoice.status)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        تحميل PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        عرض التفاصيل
                      </Button>
                      {invoice.status === 'pending' && (
                        <Button size="sm">
                          <CreditCard className="h-4 w-4 mr-2" />
                          دفع الآن
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>الدعم الفني</CardTitle>
                  <CardDescription>تذاكر الدعم والمساعدة</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  تذكرة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <p className="text-sm text-gray-600">
                          تاريخ الإنشاء: {new Date(ticket.createdDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {getPriorityText(ticket.priority)}
                        </Badge>
                        <Badge className={getTicketStatusColor(ticket.status)}>
                          {getTicketStatusText(ticket.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">آخر تحديث: </span>
                        <span className="font-medium">{new Date(ticket.lastUpdate).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">الأولوية: </span>
                        <span className="font-medium">{getPriorityText(ticket.priority)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        عرض التفاصيل
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        إضافة رد
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Support Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">دردشة مباشرة</h3>
                <p className="text-sm text-gray-600">تحدث مع فريق الدعم مباشرة</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">اتصال هاتفي</h3>
                <p className="text-sm text-gray-600">اتصل بنا على: 920001234</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">قاعدة المعرفة</h3>
                <p className="text-sm text-gray-600">ابحث في الأسئلة الشائعة</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الشركة</CardTitle>
                <CardDescription>تحديث بيانات الشركة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input id="company-name" defaultValue={customerInfo.name} />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue={customerInfo.email} />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" defaultValue={customerInfo.phone} />
                </div>
                <div>
                  <Label htmlFor="address">العنوان</Label>
                  <Input id="address" defaultValue={customerInfo.address} />
                </div>
                <Button className="w-full">
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحساب</CardTitle>
                <CardDescription>إدارة إعدادات الحساب والأمان</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full">
                  تغيير كلمة المرور
                </Button>
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
                    <p className="text-sm text-gray-600">تلقي إشعارات حول حالة الطلبات</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات الفواتير</p>
                    <p className="text-sm text-gray-600">تلقي إشعارات الفواتير الجديدة</p>
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
                    <p className="font-medium">تحديثات النظام</p>
                    <p className="text-sm text-gray-600">تلقي إشعارات تحديثات النظام</p>
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

export default CustomerPortal;

