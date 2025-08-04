import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Clock,
  MapPin,
  User,
  Calendar
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  brand: string;
  category: string;
  sku: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  specifications: { [key: string]: string };
  features: string[];
  variants?: ProductVariant[];
  relatedProducts?: string[];
  tags: string[];
}

interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'storage' | 'other';
  value: string;
  price?: number;
  image?: string;
  inStock: boolean;
}

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface Question {
  id: string;
  customerName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  date: string;
  answerDate?: string;
}

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const product: Product = {
    id: '1',
    name: 'لابتوب Dell XPS 13',
    description: 'لابتوب عالي الأداء مع معالج Intel Core i7 الجيل الحادي عشر وذاكرة 16GB RAM وتخزين SSD بسعة 512GB. يتميز بشاشة 13.3 بوصة عالية الدقة وتصميم نحيف وخفيف الوزن مثالي للعمل والدراسة.',
    price: 4200,
    originalPrice: 4500,
    discount: 7,
    brand: 'Dell',
    category: 'إلكترونيات',
    sku: 'LAPTOP-DELL-001',
    rating: 4.8,
    reviewsCount: 156,
    inStock: true,
    stockQuantity: 15,
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    specifications: {
      'المعالج': 'Intel Core i7-1165G7',
      'الذاكرة': '16GB LPDDR4x',
      'التخزين': '512GB SSD',
      'الشاشة': '13.3" FHD+ (1920x1200)',
      'كرت الرسوميات': 'Intel Iris Xe Graphics',
      'نظام التشغيل': 'Windows 11',
      'البطارية': 'حتى 12 ساعة',
      'الوزن': '1.2 كيلو',
      'الأبعاد': '295.7 x 198.7 x 14.8 مم',
      'المنافذ': '2x Thunderbolt 4, 1x USB-C 3.2',
      'الاتصال': 'Wi-Fi 6E, Bluetooth 5.1',
      'الكاميرا': '720p HD مع Windows Hello'
    },
    features: [
      'معالج Intel Core i7 الجيل الحادي عشر',
      'ذاكرة 16GB RAM عالية السرعة',
      'تخزين SSD 512GB فائق السرعة',
      'شاشة 13.3 بوصة عالية الدقة',
      'تصميم نحيف وخفيف الوزن',
      'بطارية تدوم حتى 12 ساعة',
      'منافذ Thunderbolt 4 متعددة',
      'كاميرا مع تقنية Windows Hello'
    ],
    variants: [
      {
        id: '1',
        name: 'اللون',
        type: 'color',
        value: 'فضي',
        inStock: true
      },
      {
        id: '2',
        name: 'اللون',
        type: 'color',
        value: 'أسود',
        inStock: true
      },
      {
        id: '3',
        name: 'التخزين',
        type: 'storage',
        value: '512GB',
        inStock: true
      },
      {
        id: '4',
        name: 'التخزين',
        type: 'storage',
        value: '1TB',
        price: 4800,
        inStock: true
      }
    ],
    tags: ['لابتوب', 'Dell', 'Intel Core i7', 'عالي الأداء', 'نحيف']
  };

  // Mock reviews data
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      customerName: 'أحمد محمد',
      rating: 5,
      title: 'لابتوب ممتاز للعمل والدراسة',
      comment: 'اشتريت هذا اللابتوب منذ 3 أشهر وأنا راضي جداً عنه. الأداء ممتاز والبطارية تدوم طوال اليوم. التصميم أنيق وخفيف الوزن. أنصح به بشدة!',
      date: '2024-07-15',
      verified: true,
      helpful: 12,
      images: ['/api/placeholder/100/100', '/api/placeholder/100/100']
    },
    {
      id: '2',
      customerName: 'فاطمة علي',
      rating: 4,
      title: 'جودة عالية مع بعض الملاحظات',
      comment: 'اللابتوب بجودة عالية والشاشة واضحة جداً. الوحيد العيب أن المراوح تعمل بصوت عالي أحياناً عند الاستخدام المكثف.',
      date: '2024-07-20',
      verified: true,
      helpful: 8
    },
    {
      id: '3',
      customerName: 'خالد السعد',
      rating: 5,
      title: 'استثمار ممتاز',
      comment: 'يستحق كل ريال دفعته فيه. سريع جداً في تشغيل البرامج والألعاب. التصميم راقي والجودة عالية.',
      date: '2024-08-01',
      verified: false,
      helpful: 5
    }
  ]);

  // Mock questions data
  const [questions] = useState<Question[]>([
    {
      id: '1',
      customerName: 'مريم الأحمد',
      question: 'هل يمكن ترقية الذاكرة العشوائية لاحقاً؟',
      answer: 'لا، الذاكرة العشوائية ملحومة باللوحة الأم ولا يمكن ترقيتها لاحقاً.',
      answeredBy: 'فريق الدعم الفني',
      date: '2024-07-10',
      answerDate: '2024-07-11'
    },
    {
      id: '2',
      customerName: 'عبدالله الشمري',
      question: 'كم مدة الضمان؟',
      answer: 'يأتي اللابتوب بضمان لمدة سنتين من Dell مع إمكانية تمديد الضمان.',
      answeredBy: 'فريق الدعم الفني',
      date: '2024-07-18',
      answerDate: '2024-07-18'
    },
    {
      id: '3',
      customerName: 'نورا القحطاني',
      question: 'هل يدعم الشحن السريع؟',
      date: '2024-08-02'
    }
  ]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantSelect = (variantType: string, variantValue: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: variantValue
    }));
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

  const getSelectedPrice = () => {
    let price = product.price;
    
    // Check if storage variant affects price
    const storageVariant = product.variants?.find(
      v => v.type === 'storage' && v.value === selectedVariants['storage'] && v.price
    );
    
    if (storageVariant?.price) {
      price = storageVariant.price;
    }
    
    return price;
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <span>الرئيسية</span>
        <ChevronLeft className="h-4 w-4" />
        <span>{product.category}</span>
        <ChevronLeft className="h-4 w-4" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                خصم {product.discount}%
              </Badge>
            )}
            
            {/* Image Navigation */}
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setSelectedImage(prev => 
                prev > 0 ? prev - 1 : product.images.length - 1
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setSelectedImage(prev => 
                prev < product.images.length - 1 ? prev + 1 : 0
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-4">SKU: {product.sku}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewsCount} تقييم)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-blue-600">
              {getSelectedPrice().toLocaleString()} ريال
            </span>
            {product.originalPrice && product.originalPrice > getSelectedPrice() && (
              <span className="text-xl text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} ريال
              </span>
            )}
            {product.discount && (
              <Badge className="bg-red-500 text-white">
                وفر {(product.originalPrice! - getSelectedPrice()).toLocaleString()} ريال
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">
                  متوفر ({product.stockQuantity} قطعة)
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-medium">غير متوفر</span>
              </>
            )}
          </div>

          {/* Variants */}
          {product.variants && (
            <div className="space-y-4">
              {/* Group variants by type */}
              {Object.entries(
                product.variants.reduce((acc, variant) => {
                  if (!acc[variant.type]) acc[variant.type] = [];
                  acc[variant.type].push(variant);
                  return acc;
                }, {} as { [key: string]: ProductVariant[] })
              ).map(([type, variants]) => (
                <div key={type}>
                  <Label className="text-sm font-medium mb-2 block">
                    {variants[0].name}
                  </Label>
                  <div className="flex gap-2">
                    {variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant={selectedVariants[type] === variant.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleVariantSelect(type, variant.value)}
                        disabled={!variant.inStock}
                      >
                        {variant.value}
                        {variant.price && (
                          <span className="mr-1">
                            (+{(variant.price - product.price).toLocaleString()})
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div>
            <Label className="text-sm font-medium mb-2 block">الكمية</Label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-600">
                (الحد الأقصى: {product.stockQuantity})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 flex items-center gap-2"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5" />
              أضف إلى السلة
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
            </Button>
            <Button variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-sm">شحن مجاني</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm">ضمان سنتين</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-purple-600" />
              <span className="text-sm">إرجاع مجاني</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span className="text-sm">تسليم سريع</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="description">الوصف</TabsTrigger>
          <TabsTrigger value="specifications">المواصفات</TabsTrigger>
          <TabsTrigger value="reviews">التقييمات ({product.reviewsCount})</TabsTrigger>
          <TabsTrigger value="questions">الأسئلة</TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">وصف المنتج</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">المميزات الرئيسية</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">الكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Specifications Tab */}
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">المواصفات التقنية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Reviews Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {product.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-gray-600">{product.reviewsCount} تقييم</p>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = reviews.filter(r => Math.floor(r.rating) === stars).length;
                      const percentage = (count / reviews.length) * 100;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{stars}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{review.customerName}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  مشتري موثق
                                </Badge>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(review.date).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        
                        <h5 className="font-medium mb-2">{review.title}</h5>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        
                        {review.images && (
                          <div className="flex gap-2 mb-3">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-16 h-16 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4" />
                            مفيد ({review.helpful})
                          </button>
                          <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                            <ThumbsDown className="h-4 w-4" />
                            غير مفيد
                          </button>
                          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                            <MessageCircle className="h-4 w-4" />
                            رد
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Write Review Button */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">شارك تجربتك</h3>
                <p className="text-gray-600 mb-4">ساعد العملاء الآخرين بكتابة تقييمك لهذا المنتج</p>
                <Button>
                  <Star className="h-4 w-4 mr-2" />
                  كتابة تقييم
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions" className="mt-6">
          <div className="space-y-6">
            {/* Ask Question */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">اسأل سؤال</h3>
                <div className="space-y-4">
                  <Input placeholder="اكتب سؤالك هنا..." />
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    إرسال السؤال
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{question.customerName}</span>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(question.date).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                          <p className="text-gray-700">{question.question}</p>
                        </div>
                      </div>
                      
                      {question.answer ? (
                        <div className="bg-blue-50 p-4 rounded-lg mr-11">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-blue-800">{question.answeredBy}</span>
                            <span className="text-sm text-blue-600">
                              {new Date(question.answerDate!).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                          <p className="text-blue-800">{question.answer}</p>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg mr-11">
                          <p className="text-gray-600 text-sm">في انتظار الإجابة...</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetails;

