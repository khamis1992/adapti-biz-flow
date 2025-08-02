import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  CreditCard, 
  Banknote, 
  Receipt, 
  Barcode,
  Calculator,
  Percent,
  Plus,
  Minus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  QrCode,
  Printer,
  Clock,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedPOS = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState(0);

  // بيانات تجريبية للمنتجات
  const products = [
    { 
      id: 1, 
      sku: 'PRD001', 
      name: 'قطع غيار محرك', 
      price: 250,
      stock: 150,
      category: 'قطع غيار',
      barcode: '1234567890123',
      image: '/api/placeholder/100/100'
    },
    { 
      id: 2, 
      sku: 'PRD002', 
      name: 'إطارات سيارات', 
      price: 800,
      stock: 25,
      category: 'إطارات',
      barcode: '1234567890124',
      image: '/api/placeholder/100/100'
    },
    { 
      id: 3, 
      sku: 'PRD003', 
      name: 'زيوت المحرك', 
      price: 120,
      stock: 80,
      category: 'زيوت',
      barcode: '1234567890125',
      image: '/api/placeholder/100/100'
    },
    { 
      id: 4, 
      sku: 'PRD004', 
      name: 'فلاتر الهواء', 
      price: 85,
      stock: 200,
      category: 'فلاتر',
      barcode: '1234567890126',
      image: '/api/placeholder/100/100'
    }
  ];

  // بيانات العملاء
  const customers = [
    { id: 1, name: 'أحمد محمد', phone: '+966501234567', points: 150 },
    { id: 2, name: 'سارة أحمد', phone: '+966507654321', points: 230 },
    { id: 3, name: 'محمد علي', phone: '+966509876543', points: 85 }
  ];

  // بيانات المبيعات اليومية
  const dailySales = [
    { id: 1, receiptNumber: 'RCP-001', time: '09:30', customer: 'أحمد محمد', amount: 450, payment: 'نقدي', cashier: 'موظف 1' },
    { id: 2, receiptNumber: 'RCP-002', time: '10:15', customer: 'زائر', amount: 320, payment: 'بطاقة', cashier: 'موظف 1' },
    { id: 3, receiptNumber: 'RCP-003', time: '11:45', customer: 'سارة أحمد', amount: 180, payment: 'نقدي', cashier: 'موظف 2' },
    { id: 4, receiptNumber: 'RCP-004', time: '14:20', customer: 'محمد علي', amount: 750, payment: 'بطاقة', cashier: 'موظف 1' }
  ];

  // بيانات تحليل المبيعات
  const salesAnalytics = [
    { hour: '09:00', sales: 450, transactions: 3 },
    { hour: '10:00', sales: 680, transactions: 5 },
    { hour: '11:00', sales: 920, transactions: 7 },
    { hour: '12:00', sales: 1200, transactions: 9 },
    { hour: '13:00', sales: 850, transactions: 6 },
    { hour: '14:00', sales: 1100, transactions: 8 },
    { hour: '15:00', sales: 750, transactions: 5 },
    { hour: '16:00', sales: 600, transactions: 4 }
  ];

  // بيانات طرق الدفع
  const paymentMethods = [
    { method: 'نقدي', amount: 2850, percentage: 45, transactions: 15 },
    { method: 'بطاقة ائتمان', amount: 2200, percentage: 35, transactions: 12 },
    { method: 'بطاقة مدى', amount: 1260, percentage: 20, transactions: 8 }
  ];

  // حساب إجمالي السلة
  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * (discount / 100);
    return subtotal - discountAmount;
  };

  // إضافة منتج للسلة
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // تحديث كمية المنتج
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  // إتمام البيع
  const completeSale = () => {
    if (cart.length === 0) return;
    
    // هنا يتم إرسال البيانات للخادم
    alert(`تم إتمام البيع بنجاح!\nالإجمالي: ${calculateTotal().toFixed(2)} ر.س\nطريقة الدفع: ${paymentMethod}`);
    
    // إعادة تعيين السلة
    setCart([]);
    setSelectedCustomer(null);
    setDiscount(0);
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'cash': return <Banknote className="w-4 h-4" />;
      case 'card': return <CreditCard className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">نظام نقاط البيع المتقدم</h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة المبيعات والمدفوعات</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <QrCode className="w-4 h-4 ml-2" />
            مسح الباركود
          </Button>
          <Button variant="outline">
            <Printer className="w-4 h-4 ml-2" />
            طباعة تقرير
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير البيانات
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مبيعات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">6,310 ر.س</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +15.2% من أمس
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
                <p className="text-sm font-medium text-gray-600">المعاملات</p>
                <p className="text-2xl font-bold text-gray-900">35</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Receipt className="w-3 h-3 ml-1" />
                  معاملة اليوم
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Receipt className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط المعاملة</p>
                <p className="text-2xl font-bold text-gray-900">180 ر.س</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Calculator className="w-3 h-3 ml-1" />
                  +8.5% من أمس
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المنتجات المباعة</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Package className="w-3 h-3 ml-1" />
                  قطعة اليوم
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pos">نقطة البيع</TabsTrigger>
          <TabsTrigger value="sales">المبيعات اليومية</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* نقطة البيع */}
        <TabsContent value="pos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* قائمة المنتجات */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>المنتجات</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="البحث..." className="w-48" />
                      <Button variant="outline">
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <Card 
                        key={product.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => addToCart(product)}
                      >
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{product.sku}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-blue-600">{product.price} ر.س</span>
                            <Badge variant="outline" className="text-xs">
                              {product.stock}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* سلة التسوق والدفع */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>سلة التسوق</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* العميل */}
                  <div>
                    <Label>العميل</Label>
                    <select 
                      className="w-full p-2 border rounded-md mt-1"
                      value={selectedCustomer?.id || ''}
                      onChange={(e) => {
                        const customer = customers.find(c => c.id === parseInt(e.target.value));
                        setSelectedCustomer(customer || null);
                      }}
                    >
                      <option value="">زائر</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} - {customer.phone}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* عناصر السلة */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">السلة فارغة</p>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">{item.price} ر.س</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* الخصم */}
                  <div>
                    <Label>الخصم (%)</Label>
                    <Input 
                      type="number" 
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>

                  {/* طريقة الدفع */}
                  <div>
                    <Label>طريقة الدفع</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button 
                        variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('cash')}
                        className="flex items-center gap-2"
                      >
                        <Banknote className="w-4 h-4" />
                        نقدي
                      </Button>
                      <Button 
                        variant={paymentMethod === 'card' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('card')}
                        className="flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        بطاقة
                      </Button>
                    </div>
                  </div>

                  {/* الإجمالي */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>المجموع الفرعي:</span>
                      <span>{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} ر.س</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between mb-2 text-red-600">
                        <span>الخصم ({discount}%):</span>
                        <span>-{(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (discount / 100)).toFixed(2)} ر.س</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي:</span>
                      <span>{calculateTotal().toFixed(2)} ر.س</span>
                    </div>
                  </div>

                  {/* أزرار العمليات */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={completeSale}
                      disabled={cart.length === 0}
                    >
                      <CheckCircle className="w-4 h-4 ml-2" />
                      إتمام البيع
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" onClick={() => setCart([])}>
                        <XCircle className="w-4 h-4 ml-2" />
                        إلغاء
                      </Button>
                      <Button variant="outline">
                        <Printer className="w-4 h-4 ml-2" />
                        طباعة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* المبيعات اليومية */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>المبيعات اليومية</CardTitle>
                  <CardDescription>سجل جميع المعاملات لليوم الحالي</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 ml-2" />
                    فلترة
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم الإيصال</th>
                      <th className="text-right p-3 font-medium">الوقت</th>
                      <th className="text-right p-3 font-medium">العميل</th>
                      <th className="text-right p-3 font-medium">المبلغ</th>
                      <th className="text-right p-3 font-medium">طريقة الدفع</th>
                      <th className="text-right p-3 font-medium">الكاشير</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailySales.map((sale) => (
                      <tr key={sale.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{sale.receiptNumber}</td>
                        <td className="p-3">{sale.time}</td>
                        <td className="p-3 font-medium">{sale.customer}</td>
                        <td className="p-3 font-mono">{sale.amount} ر.س</td>
                        <td className="p-3">
                          <Badge variant="outline">
                            {sale.payment}
                          </Badge>
                        </td>
                        <td className="p-3">{sale.cashier}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Receipt className="w-4 h-4" />
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
                <CardTitle>مبيعات اليوم حسب الساعة</CardTitle>
                <CardDescription>توزيع المبيعات على مدار اليوم</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#10b981" name="المبيعات (ر.س)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع طرق الدفع</CardTitle>
                <CardDescription>نسبة استخدام طرق الدفع المختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {method.method === 'نقدي' && <Banknote className="h-5 w-5 text-blue-600" />}
                          {method.method !== 'نقدي' && <CreditCard className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{method.method}</p>
                          <p className="text-sm text-gray-600">{method.transactions} معاملة</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-blue-600">{method.amount.toLocaleString()} ر.س</p>
                        <p className="text-sm text-gray-600">{method.percentage}%</p>
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
              <CardDescription>ملخص شامل لأداء نقطة البيع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">6,310 ر.س</p>
                  <p className="text-sm text-gray-600">إجمالي المبيعات اليوم</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">35</p>
                  <p className="text-sm text-gray-600">عدد المعاملات</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">180 ر.س</p>
                  <p className="text-sm text-gray-600">متوسط قيمة المعاملة</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">127</p>
                  <p className="text-sm text-gray-600">المنتجات المباعة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإعدادات */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات نقطة البيع</CardTitle>
                <CardDescription>تخصيص إعدادات النظام</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>اسم المتجر</Label>
                  <Input defaultValue="متجر قطع غيار السيارات" className="mt-1" />
                </div>
                <div>
                  <Label>عنوان المتجر</Label>
                  <Input defaultValue="الرياض، المملكة العربية السعودية" className="mt-1" />
                </div>
                <div>
                  <Label>رقم الضريبة</Label>
                  <Input defaultValue="123456789" className="mt-1" />
                </div>
                <div>
                  <Label>العملة الافتراضية</Label>
                  <select className="w-full p-2 border rounded-md mt-1">
                    <option value="SAR">ريال سعودي (ر.س)</option>
                    <option value="USD">دولار أمريكي ($)</option>
                    <option value="EUR">يورو (€)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات الطباعة</CardTitle>
                <CardDescription>تخصيص إعدادات الإيصالات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>حجم الورق</Label>
                  <select className="w-full p-2 border rounded-md mt-1">
                    <option value="80mm">80 مم (حراري)</option>
                    <option value="58mm">58 مم (حراري)</option>
                    <option value="A4">A4</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="auto-print" defaultChecked />
                  <Label htmlFor="auto-print">طباعة تلقائية للإيصالات</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="show-logo" defaultChecked />
                  <Label htmlFor="show-logo">عرض شعار المتجر</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="show-barcode" />
                  <Label htmlFor="show-barcode">عرض الباركود على الإيصال</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الضرائب والخصومات</CardTitle>
              <CardDescription>تكوين الضرائب والخصومات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">الضرائب</h3>
                  <div>
                    <Label>ضريبة القيمة المضافة (%)</Label>
                    <Input type="number" defaultValue="15" className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="include-tax" defaultChecked />
                    <Label htmlFor="include-tax">تطبيق الضريبة تلقائياً</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">الخصومات</h3>
                  <div>
                    <Label>الحد الأقصى للخصم (%)</Label>
                    <Input type="number" defaultValue="20" className="mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="require-manager" />
                    <Label htmlFor="require-manager">يتطلب موافقة المدير للخصم أكثر من 10%</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPOS;

