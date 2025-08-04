import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart,
  ArrowRight,
  ArrowLeft,
  Gift,
  Percent,
  Truck,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  Tag,
  CreditCard,
  Wallet,
  Banknote
} from 'lucide-react';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  maxQuantity: number;
  variants?: { [key: string]: string };
  inStock: boolean;
  shippingTime: string;
  seller: string;
}

interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  description: string;
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: React.ReactNode;
}

const ShoppingCart = () => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      productId: 'laptop-dell-001',
      name: 'لابتوب Dell XPS 13',
      image: '/api/placeholder/150/150',
      price: 4200,
      originalPrice: 4500,
      quantity: 1,
      maxQuantity: 5,
      variants: { color: 'فضي', storage: '512GB' },
      inStock: true,
      shippingTime: '2-3 أيام',
      seller: 'متجر التقنية'
    },
    {
      id: '2',
      productId: 'phone-iphone-001',
      name: 'هاتف iPhone 15 Pro',
      image: '/api/placeholder/150/150',
      price: 4200,
      quantity: 1,
      maxQuantity: 3,
      variants: { color: 'أسود', storage: '128GB' },
      inStock: true,
      shippingTime: '1-2 أيام',
      seller: 'متجر الجوالات'
    },
    {
      id: '3',
      productId: 'headphones-sony-001',
      name: 'سماعات Sony WH-1000XM5',
      image: '/api/placeholder/150/150',
      price: 1050,
      originalPrice: 1200,
      quantity: 2,
      maxQuantity: 10,
      inStock: false,
      shippingTime: '5-7 أيام',
      seller: 'متجر الصوتيات'
    }
  ]);

  // Available coupons
  const availableCoupons: Coupon[] = [
    {
      code: 'SAVE10',
      type: 'percentage',
      value: 10,
      minAmount: 1000,
      description: 'خصم 10% على الطلبات أكثر من 1000 ريال'
    },
    {
      code: 'WELCOME50',
      type: 'fixed',
      value: 50,
      minAmount: 500,
      description: 'خصم 50 ريال للعملاء الجدد'
    },
    {
      code: 'FREESHIP',
      type: 'fixed',
      value: 0,
      description: 'شحن مجاني'
    }
  ];

  // Shipping options
  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'الشحن العادي',
      description: '3-5 أيام عمل',
      price: 25,
      estimatedDays: '3-5 أيام',
      icon: <Truck className="h-5 w-5" />
    },
    {
      id: 'express',
      name: 'الشحن السريع',
      description: '1-2 أيام عمل',
      price: 50,
      estimatedDays: '1-2 أيام',
      icon: <Clock className="h-5 w-5" />
    },
    {
      id: 'same-day',
      name: 'التوصيل في نفس اليوم',
      description: 'خلال 6 ساعات',
      price: 75,
      estimatedDays: 'خلال 6 ساعات',
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const moveToWishlist = (itemId: string) => {
    // Implementation for moving to wishlist
    removeItem(itemId);
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      const subtotal = getSubtotal();
      if (coupon.minAmount && subtotal < coupon.minAmount) {
        alert(`الحد الأدنى للطلب ${coupon.minAmount} ريال`);
        return;
      }
      setAppliedCoupon(coupon);
      setCouponCode('');
    } else {
      alert('كود الخصم غير صحيح');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = getSubtotal();
    if (appliedCoupon.type === 'percentage') {
      const discount = subtotal * (appliedCoupon.value / 100);
      return appliedCoupon.maxDiscount ? Math.min(discount, appliedCoupon.maxDiscount) : discount;
    }
    return appliedCoupon.value;
  };

  const getShippingCost = () => {
    if (appliedCoupon?.code === 'FREESHIP') return 0;
    const selectedOption = shippingOptions.find(option => option.id === selectedShipping);
    return selectedOption?.price || 0;
  };

  const getTax = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    return (subtotal - discount) * 0.15; // 15% VAT
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getShippingCost() + getTax();
  };

  const getSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0) + getDiscount();
  };

  const hasOutOfStockItems = () => {
    return cartItems.some(item => !item.inStock);
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            عربة التسوق
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} منتج في عربة التسوق
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4" />
          متابعة التسوق
        </Button>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">عربة التسوق فارغة</h2>
            <p className="text-gray-600 mb-6">ابدأ التسوق واضف المنتجات إلى عربة التسوق</p>
            <Button className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              ابدأ التسوق
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Out of Stock Warning */}
            {hasOutOfStockItems() && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-orange-800">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">
                      بعض المنتجات غير متوفرة حالياً
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <Card key={item.id} className={!item.inStock ? 'opacity-75' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                          <Badge className="bg-red-500 text-white text-xs">
                            غير متوفر
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600">البائع: {item.seller}</p>
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
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveToWishlist(item.id)}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-600">
                            {item.price.toLocaleString()} ريال
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {item.originalPrice.toLocaleString()} ريال
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {item.inStock && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                          <Truck className="h-4 w-4" />
                          <span>التوصيل خلال {item.shippingTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Recommended Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-600" />
                  منتجات قد تعجبك
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center">
                      <img
                        src="/api/placeholder/120/120"
                        alt={`منتج ${i}`}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium mb-1">منتج مقترح {i}</p>
                      <p className="text-sm text-blue-600 font-bold">299 ريال</p>
                      <Button size="sm" variant="outline" className="mt-2 w-full">
                        إضافة
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-green-600" />
                  كود الخصم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                    <div>
                      <span className="font-medium text-green-800">{appliedCoupon.code}</span>
                      <p className="text-sm text-green-600">{appliedCoupon.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="أدخل كود الخصم"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={applyCoupon} disabled={!couponCode}>
                      تطبيق
                    </Button>
                  </div>
                )}

                {/* Available Coupons */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">الأكواد المتاحة:</Label>
                  {availableCoupons.map((coupon) => (
                    <div
                      key={coupon.code}
                      className="flex items-center justify-between p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                      onClick={() => setCouponCode(coupon.code)}
                    >
                      <div>
                        <span className="font-medium text-sm">{coupon.code}</span>
                        <p className="text-xs text-gray-600">{coupon.description}</p>
                      </div>
                      <Tag className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  خيارات الشحن
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center justify-between p-3 border rounded cursor-pointer ${
                      selectedShipping === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedShipping(option.id)}
                  >
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
                ))}
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
                
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>-{getDiscount().toLocaleString()} ريال</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>
                    {getShippingCost() === 0 ? 'مجاني' : `${getShippingCost().toLocaleString()} ريال`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span>{getTax().toLocaleString()} ريال</span>
                </div>
                
                <hr />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-blue-600">{getTotal().toLocaleString()} ريال</span>
                </div>
                
                {getSavings() > 0 && (
                  <div className="text-center p-2 bg-green-50 border border-green-200 rounded">
                    <span className="text-green-800 font-medium">
                      وفرت {getSavings().toLocaleString()} ريال!
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Methods Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  طرق الدفع المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4 text-gray-600">
                  <CreditCard className="h-8 w-8" />
                  <Wallet className="h-8 w-8" />
                  <Banknote className="h-8 w-8" />
                  <Shield className="h-8 w-8" />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  دفع آمن ومضمون
                </p>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button 
              className="w-full py-3 text-lg"
              disabled={hasOutOfStockItems()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              متابعة إلى الدفع
            </Button>
            
            {hasOutOfStockItems() && (
              <p className="text-center text-sm text-red-600">
                يرجى إزالة المنتجات غير المتوفرة للمتابعة
              </p>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>تسوق آمن ومضمون</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

