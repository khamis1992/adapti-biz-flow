import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Lock,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Wallet,
  Banknote,
  Smartphone,
  Building,
  Calendar,
  Clock,
  Gift,
  AlertCircle,
  Edit,
  Plus
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variants?: { [key: string]: string };
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'bank' | 'cod';
  name: string;
  details: string;
  icon: React.ReactNode;
  fee?: number;
}

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order items
  const orderItems: OrderItem[] = [
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
  ];

  // Mock addresses
  const addresses: Address[] = [
    {
      id: '1',
      type: 'home',
      name: 'المنزل',
      street: 'شارع الملك فهد، حي النخيل',
      city: 'الرياض',
      district: 'النخيل',
      postalCode: '12345',
      phone: '+966501234567',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      name: 'العمل',
      street: 'طريق الملك عبدالعزيز، برج الأعمال',
      city: 'الرياض',
      district: 'العليا',
      postalCode: '12346',
      phone: '+966501234568',
      isDefault: false
    }
  ];

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      type: 'card',
      name: 'بطاقة ائتمان/مدين',
      details: 'Visa, Mastercard, Mada',
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      id: 'stc_pay',
      type: 'wallet',
      name: 'STC Pay',
      details: 'محفظة رقمية سريعة وآمنة',
      icon: <Wallet className="h-6 w-6" />
    },
    {
      id: 'apple_pay',
      type: 'wallet',
      name: 'Apple Pay',
      details: 'دفع سريع بالهاتف',
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      id: 'bank_transfer',
      type: 'bank',
      name: 'تحويل بنكي',
      details: 'تحويل مباشر من البنك',
      icon: <Building className="h-6 w-6" />
    },
    {
      id: 'cod',
      type: 'cod',
      name: 'الدفع عند الاستلام',
      details: 'ادفع نقداً عند التسليم',
      icon: <Banknote className="h-6 w-6" />,
      fee: 15
    }
  ];

  // Shipping options
  const shippingOptions = [
    {
      id: 'standard',
      name: 'الشحن العادي',
      description: '3-5 أيام عمل',
      price: 25,
      icon: <Truck className="h-5 w-5" />
    },
    {
      id: 'express',
      name: 'الشحن السريع',
      description: '1-2 أيام عمل',
      price: 50,
      icon: <Clock className="h-5 w-5" />
    },
    {
      id: 'same_day',
      name: 'التوصيل في نفس اليوم',
      description: 'خلال 6 ساعات',
      price: 75,
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  const getSubtotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShippingCost = () => {
    const option = shippingOptions.find(opt => opt.id === selectedShipping);
    return option?.price || 0;
  };

  const getPaymentFee = () => {
    const method = paymentMethods.find(method => method.id === selectedPayment);
    return method?.fee || 0;
  };

  const getTax = () => {
    return (getSubtotal() + getShippingCost() + getPaymentFee()) * 0.15;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost() + getPaymentFee() + getTax();
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setCurrentStep(4); // Success step
  };

  const steps = [
    { id: 1, title: 'عنوان التسليم', icon: <MapPin className="h-5 w-5" /> },
    { id: 2, title: 'طريقة الشحن', icon: <Truck className="h-5 w-5" /> },
    { id: 3, title: 'الدفع', icon: <CreditCard className="h-5 w-5" /> },
    { id: 4, title: 'تأكيد الطلب', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.id 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'border-gray-300 text-gray-400'
          }`}>
            {currentStep > step.id ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              step.icon
            )}
          </div>
          <div className="mr-3 ml-3">
            <p className={`text-sm font-medium ${
              currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">عنوان التسليم</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة عنوان جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card 
            key={address.id}
            className={`cursor-pointer transition-all ${
              selectedAddress === address.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedAddress(address.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAddress === address.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAddress === address.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="font-medium">{address.name}</span>
                  {address.isDefault && (
                    <Badge variant="secondary" className="text-xs">افتراضي</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <p>{address.street}</p>
                <p>{address.district}, {address.city}</p>
                <p>الرمز البريدي: {address.postalCode}</p>
                <p className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {address.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setCurrentStep(2)}>
          متابعة إلى الشحن
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">طريقة الشحن</h2>

      <div className="space-y-4">
        {shippingOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all ${
              selectedShipping === option.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedShipping(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedShipping === option.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedShipping === option.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  {option.icon}
                  <div>
                    <p className="font-medium">{option.name}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                <span className="font-medium">
                  {option.price === 0 ? 'مجاني' : `${option.price} ريال`}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <Button onClick={() => setCurrentStep(3)}>
          متابعة إلى الدفع
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">طريقة الدفع</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all ${
              selectedPayment === method.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPayment(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedPayment === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === method.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                {method.icon}
                <div className="flex-1">
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-gray-600">{method.details}</p>
                  {method.fee && (
                    <p className="text-sm text-orange-600">رسوم إضافية: {method.fee} ريال</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Form */}
      {selectedPayment === 'card' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              بيانات البطاقة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="card-number">رقم البطاقة</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div>
              <Label htmlFor="card-name">اسم حامل البطاقة</Label>
              <Input id="card-name" placeholder="الاسم كما يظهر على البطاقة" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <Button onClick={() => setCurrentStep(4)}>
          مراجعة الطلب
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">مراجعة الطلب</h2>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>المنتجات المطلوبة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderItems.map((item) => (
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
                <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ريال</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              عنوان التسليم
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const address = addresses.find(addr => addr.id === selectedAddress);
              return address ? (
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{address.name}</p>
                  <p>{address.street}</p>
                  <p>{address.district}, {address.city}</p>
                  <p>الرمز البريدي: {address.postalCode}</p>
                  <p className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {address.phone}
                  </p>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              طريقة الشحن
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const shipping = shippingOptions.find(opt => opt.id === selectedShipping);
              return shipping ? (
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{shipping.name}</p>
                  <p>{shipping.description}</p>
                  <p>التكلفة: {shipping.price === 0 ? 'مجاني' : `${shipping.price} ريال`}</p>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            طريقة الدفع
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const payment = paymentMethods.find(method => method.id === selectedPayment);
            return payment ? (
              <div className="flex items-center gap-3">
                {payment.icon}
                <div>
                  <p className="font-medium">{payment.name}</p>
                  <p className="text-sm text-gray-600">{payment.details}</p>
                  {payment.fee && (
                    <p className="text-sm text-orange-600">رسوم إضافية: {payment.fee} ريال</p>
                  )}
                </div>
              </div>
            ) : null;
          })()}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>ملخص الطلب</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>المجموع الفرعي</span>
            <span>{getSubtotal().toLocaleString()} ريال</span>
          </div>
          <div className="flex justify-between">
            <span>الشحن</span>
            <span>{getShippingCost() === 0 ? 'مجاني' : `${getShippingCost().toLocaleString()} ريال`}</span>
          </div>
          {getPaymentFee() > 0 && (
            <div className="flex justify-between">
              <span>رسوم الدفع</span>
              <span>{getPaymentFee().toLocaleString()} ريال</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>ضريبة القيمة المضافة (15%)</span>
            <span>{getTax().toLocaleString()} ريال</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold">
            <span>المجموع الكلي</span>
            <span className="text-blue-600">{getTotal().toLocaleString()} ريال</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(3)}>
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <Button 
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              جاري المعالجة...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              تأكيد الطلب والدفع
            </>
          )}
        </Button>
      </div>

      {/* Security Notice */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
        <Shield className="h-4 w-4" />
        <span>معاملة آمنة ومشفرة بتقنية SSL</span>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6 py-12">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-green-600 mb-2">تم تأكيد طلبك!</h2>
        <p className="text-gray-600">رقم الطلب: #ORD-2024-001234</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="text-sm">تم إرسال تأكيد الطلب إلى بريدك الإلكتروني</span>
          </div>
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-green-600" />
            <span className="text-sm">ستصلك رسالة نصية بتفاصيل الشحن</span>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-purple-600" />
            <span className="text-sm">التسليم المتوقع: 3-5 أيام عمل</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button variant="outline">
          تتبع الطلب
        </Button>
        <Button>
          متابعة التسوق
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الشراء</h1>
        <p className="text-gray-600">أكمل طلبك بخطوات بسيطة وآمنة</p>
      </div>

      {/* Step Indicator */}
      {currentStep < 4 && renderStepIndicator()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && renderAddressStep()}
          {currentStep === 2 && renderShippingStep()}
          {currentStep === 3 && renderPaymentStep()}
          {currentStep === 4 && (isProcessing ? renderReviewStep() : renderSuccessStep())}
        </div>

        {/* Order Summary Sidebar */}
        {currentStep < 4 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-200 last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">الكمية: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">{(item.price * item.quantity).toLocaleString()} ريال</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي</span>
                  <span>{getSubtotal().toLocaleString()} ريال</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الشحن</span>
                  <span>{getShippingCost() === 0 ? 'مجاني' : `${getShippingCost().toLocaleString()} ريال`}</span>
                </div>
                {getPaymentFee() > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>رسوم الدفع</span>
                    <span>{getPaymentFee().toLocaleString()} ريال</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>الضريبة</span>
                  <span>{getTax().toLocaleString()} ريال</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>المجموع</span>
                  <span className="text-blue-600">{getTotal().toLocaleString()} ريال</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>دفع آمن ومشفر</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>شحن مضمون</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="h-4 w-4 text-purple-600" />
                  <span>إرجاع مجاني خلال 30 يوم</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

