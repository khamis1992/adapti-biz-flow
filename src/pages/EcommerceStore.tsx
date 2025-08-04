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
  Star, 
  Heart, 
  Search, 
  Filter,
  Grid,
  List,
  Plus,
  Minus,
  Eye,
  Share2,
  Truck,
  Shield,
  CreditCard,
  ArrowRight
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  features: string[];
  specifications: { [key: string]: string };
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
  selectedOptions?: { [key: string]: string };
}

const EcommerceStore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Mock products data
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'لابتوب Dell XPS 13',
      description: 'لابتوب عالي الأداء مع معالج Intel Core i7 وذاكرة 16GB RAM',
      price: 4500,
      originalPrice: 5000,
      category: 'electronics',
      brand: 'Dell',
      rating: 4.8,
      reviewsCount: 245,
      inStock: true,
      stockQuantity: 15,
      images: ['/api/placeholder/400/300'],
      features: ['معالج Intel Core i7', 'ذاكرة 16GB RAM', 'تخزين SSD 512GB', 'شاشة 13.3 بوصة'],
      specifications: {
        'المعالج': 'Intel Core i7-1165G7',
        'الذاكرة': '16GB LPDDR4x',
        'التخزين': '512GB SSD',
        'الشاشة': '13.3" FHD+ (1920x1200)',
        'نظام التشغيل': 'Windows 11'
      },
      discount: 10,
      isNew: false,
      isFeatured: true
    },
    {
      id: '2',
      name: 'هاتف iPhone 15 Pro',
      description: 'أحدث هاتف من Apple مع كاميرا متطورة ومعالج A17 Pro',
      price: 4200,
      category: 'electronics',
      brand: 'Apple',
      rating: 4.9,
      reviewsCount: 892,
      inStock: true,
      stockQuantity: 8,
      images: ['/api/placeholder/400/300'],
      features: ['معالج A17 Pro', 'كاميرا 48MP', 'شاشة 6.1 بوصة', 'مقاوم للماء'],
      specifications: {
        'المعالج': 'Apple A17 Pro',
        'الذاكرة': '128GB',
        'الشاشة': '6.1" Super Retina XDR',
        'الكاميرا': '48MP + 12MP + 12MP',
        'البطارية': 'حتى 23 ساعة فيديو'
      },
      isNew: true,
      isFeatured: true
    },
    {
      id: '3',
      name: 'سماعات Sony WH-1000XM5',
      description: 'سماعات لاسلكية مع إلغاء الضوضاء المتقدم',
      price: 1200,
      originalPrice: 1400,
      category: 'electronics',
      brand: 'Sony',
      rating: 4.7,
      reviewsCount: 156,
      inStock: true,
      stockQuantity: 25,
      images: ['/api/placeholder/400/300'],
      features: ['إلغاء الضوضاء', 'بطارية 30 ساعة', 'شحن سريع', 'صوت عالي الجودة'],
      specifications: {
        'النوع': 'لاسلكية',
        'البطارية': '30 ساعة',
        'الشحن': 'USB-C',
        'الوزن': '250 جرام',
        'المقاومة': 'مقاومة للعرق'
      },
      discount: 14,
      isNew: false,
      isFeatured: false
    },
    {
      id: '4',
      name: 'ساعة Apple Watch Series 9',
      description: 'ساعة ذكية متطورة مع مراقبة الصحة والرياضة',
      price: 1800,
      category: 'electronics',
      brand: 'Apple',
      rating: 4.6,
      reviewsCount: 324,
      inStock: false,
      stockQuantity: 0,
      images: ['/api/placeholder/400/300'],
      features: ['مراقبة الصحة', 'GPS مدمج', 'مقاوم للماء', 'شاشة Always-On'],
      specifications: {
        'الحجم': '45mm',
        'الشاشة': 'Retina LTPO OLED',
        'البطارية': '18 ساعة',
        'المقاومة': '50 متر تحت الماء',
        'الاتصال': 'GPS + Cellular'
      },
      isNew: true,
      isFeatured: false
    }
  ]);

  const categories = [
    { id: 'all', name: 'جميع المنتجات' },
    { id: 'electronics', name: 'إلكترونيات' },
    { id: 'clothing', name: 'ملابس' },
    { id: 'home', name: 'منزل ومطبخ' },
    { id: 'sports', name: 'رياضة' },
    { id: 'books', name: 'كتب' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'المنتجات المميزة' },
    { id: 'price-low', name: 'السعر: من الأقل للأعلى' },
    { id: 'price-high', name: 'السعر: من الأعلى للأقل' },
    { id: 'rating', name: 'الأعلى تقييماً' },
    { id: 'newest', name: 'الأحدث' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
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

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            خصم {product.discount}%
          </Badge>
        )}
        {product.isNew && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white">
            جديد
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            className={`h-4 w-4 ${
              wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
          />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-600 mr-1">
            ({product.reviewsCount})
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-blue-600">
            {product.price.toLocaleString()} ريال
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice.toLocaleString()} ريال
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <Badge variant="secondary" className="text-green-600">
                متوفر ({product.stockQuantity})
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-red-600">
                غير متوفر
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              disabled={!product.inStock}
              onClick={() => addToCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              أضف للسلة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            المتجر الإلكتروني
          </h1>
          <p className="text-gray-600 mt-2">تسوق أفضل المنتجات بأسعار مميزة</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            المفضلة ({wishlist.length})
          </Button>
          <Button className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            السلة ({getCartItemsCount()})
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث عن المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Products Banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">عروض خاصة</h2>
              <p className="text-blue-100 mb-4">خصومات تصل إلى 50% على المنتجات المختارة</p>
              <Button variant="secondary">
                تسوق الآن
                <ArrowRight className="h-4 w-4 mr-2" />
              </Button>
            </div>
            <div className="hidden md:block">
              <Package className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            المنتجات ({sortedProducts.length})
          </h2>
        </div>
        
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardContent className="p-6 text-center">
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">شحن مجاني</h3>
            <p className="text-sm text-gray-600">شحن مجاني للطلبات أكثر من 200 ريال</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">ضمان الجودة</h3>
            <p className="text-sm text-gray-600">ضمان على جميع المنتجات لمدة سنة</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <CreditCard className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">دفع آمن</h3>
            <p className="text-sm text-gray-600">طرق دفع متعددة وآمنة</p>
          </CardContent>
        </Card>
      </div>

      {/* Newsletter Signup */}
      <Card className="bg-gray-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">اشترك في النشرة الإخبارية</h3>
          <p className="text-gray-600 mb-4">احصل على أحدث العروض والمنتجات الجديدة</p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input placeholder="أدخل بريدك الإلكتروني" className="flex-1" />
            <Button>اشتراك</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcommerceStore;

