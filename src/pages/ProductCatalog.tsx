import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Search, 
  Filter, 
  Grid, 
  List,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Image as ImageIcon,
  Tag,
  Barcode,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  MoreHorizontal
} from 'lucide-react';

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  costPrice: number;
  salePrice?: number;
  category: string;
  subcategory: string;
  brand: string;
  tags: string[];
  images: string[];
  specifications: { [key: string]: string };
  features: string[];
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  status: 'active' | 'inactive' | 'draft' | 'out_of_stock';
  isDigital: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: string;
  updatedAt: string;
  salesCount: number;
  viewsCount: number;
  rating: number;
  reviewsCount: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  image?: string;
  productsCount: number;
}

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock categories data
  const [categories] = useState<Category[]>([
    {
      id: '1',
      name: 'إلكترونيات',
      description: 'أجهزة إلكترونية ومعدات تقنية',
      productsCount: 156
    },
    {
      id: '2',
      name: 'ملابس',
      description: 'ملابس رجالية ونسائية وأطفال',
      productsCount: 89
    },
    {
      id: '3',
      name: 'منزل ومطبخ',
      description: 'أدوات منزلية ومطبخية',
      productsCount: 234
    },
    {
      id: '4',
      name: 'رياضة',
      description: 'معدات وملابس رياضية',
      productsCount: 67
    },
    {
      id: '5',
      name: 'كتب',
      description: 'كتب ومجلات ومواد تعليمية',
      productsCount: 123
    }
  ]);

  // Mock products data
  const [products] = useState<Product[]>([
    {
      id: '1',
      sku: 'LAPTOP-DELL-001',
      name: 'لابتوب Dell XPS 13',
      description: 'لابتوب عالي الأداء مع معالج Intel Core i7 الجيل الحادي عشر وذاكرة 16GB RAM وتخزين SSD بسعة 512GB. يتميز بشاشة 13.3 بوصة عالية الدقة وتصميم نحيف وخفيف الوزن.',
      shortDescription: 'لابتوب عالي الأداء مع معالج Intel Core i7 وذاكرة 16GB RAM',
      price: 4500,
      costPrice: 3200,
      salePrice: 4200,
      category: '1',
      subcategory: 'laptops',
      brand: 'Dell',
      tags: ['لابتوب', 'Dell', 'Intel', 'عالي الأداء'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      specifications: {
        'المعالج': 'Intel Core i7-1165G7',
        'الذاكرة': '16GB LPDDR4x',
        'التخزين': '512GB SSD',
        'الشاشة': '13.3" FHD+ (1920x1200)',
        'نظام التشغيل': 'Windows 11',
        'البطارية': 'حتى 12 ساعة',
        'الوزن': '1.2 كيلو'
      },
      features: ['معالج Intel Core i7', 'ذاكرة 16GB RAM', 'تخزين SSD 512GB', 'شاشة عالية الدقة'],
      stockQuantity: 15,
      minStockLevel: 5,
      maxStockLevel: 50,
      weight: 1.2,
      dimensions: { length: 30, width: 20, height: 2 },
      status: 'active',
      isDigital: false,
      isFeatured: true,
      isOnSale: true,
      seoTitle: 'لابتوب Dell XPS 13 - عالي الأداء',
      seoDescription: 'اشتر لابتوب Dell XPS 13 عالي الأداء بأفضل سعر',
      seoKeywords: ['لابتوب', 'Dell', 'XPS', 'Intel Core i7'],
      createdAt: '2024-01-15T10:00:00',
      updatedAt: '2024-08-01T14:30:00',
      salesCount: 45,
      viewsCount: 1250,
      rating: 4.8,
      reviewsCount: 23
    },
    {
      id: '2',
      sku: 'PHONE-IPHONE-001',
      name: 'هاتف iPhone 15 Pro',
      description: 'أحدث هاتف من Apple مع معالج A17 Pro وكاميرا متطورة بدقة 48MP. يتميز بتصميم من التيتانيوم وشاشة Super Retina XDR مقاس 6.1 بوصة.',
      shortDescription: 'أحدث هاتف من Apple مع معالج A17 Pro وكاميرا 48MP',
      price: 4200,
      costPrice: 3000,
      category: '1',
      subcategory: 'smartphones',
      brand: 'Apple',
      tags: ['هاتف', 'iPhone', 'Apple', 'جديد'],
      images: ['/api/placeholder/400/300'],
      specifications: {
        'المعالج': 'Apple A17 Pro',
        'الذاكرة': '128GB',
        'الشاشة': '6.1" Super Retina XDR',
        'الكاميرا': '48MP + 12MP + 12MP',
        'البطارية': 'حتى 23 ساعة فيديو',
        'نظام التشغيل': 'iOS 17',
        'المقاومة': 'IP68'
      },
      features: ['معالج A17 Pro', 'كاميرا 48MP', 'شاشة 6.1 بوصة', 'مقاوم للماء'],
      stockQuantity: 8,
      minStockLevel: 3,
      maxStockLevel: 30,
      weight: 0.187,
      dimensions: { length: 14.7, width: 7.1, height: 0.8 },
      status: 'active',
      isDigital: false,
      isFeatured: true,
      isOnSale: false,
      createdAt: '2024-02-01T09:00:00',
      updatedAt: '2024-08-02T11:15:00',
      salesCount: 28,
      viewsCount: 2100,
      rating: 4.9,
      reviewsCount: 15
    },
    {
      id: '3',
      sku: 'HEADPHONES-SONY-001',
      name: 'سماعات Sony WH-1000XM5',
      description: 'سماعات لاسلكية متطورة مع تقنية إلغاء الضوضاء الرائدة في الصناعة وجودة صوت عالية الدقة.',
      shortDescription: 'سماعات لاسلكية مع إلغاء الضوضاء المتقدم',
      price: 1200,
      costPrice: 800,
      salePrice: 1050,
      category: '1',
      subcategory: 'audio',
      brand: 'Sony',
      tags: ['سماعات', 'Sony', 'لاسلكية', 'إلغاء الضوضاء'],
      images: ['/api/placeholder/400/300'],
      specifications: {
        'النوع': 'لاسلكية',
        'البطارية': '30 ساعة',
        'الشحن': 'USB-C',
        'الوزن': '250 جرام',
        'المقاومة': 'مقاومة للعرق',
        'الاتصال': 'Bluetooth 5.2',
        'إلغاء الضوضاء': 'نشط'
      },
      features: ['إلغاء الضوضاء', 'بطارية 30 ساعة', 'شحن سريع', 'صوت عالي الجودة'],
      stockQuantity: 25,
      minStockLevel: 10,
      maxStockLevel: 100,
      weight: 0.25,
      dimensions: { length: 25, width: 20, height: 8 },
      status: 'active',
      isDigital: false,
      isFeatured: false,
      isOnSale: true,
      createdAt: '2024-01-20T15:30:00',
      updatedAt: '2024-07-28T09:45:00',
      salesCount: 67,
      viewsCount: 890,
      rating: 4.7,
      reviewsCount: 34
    },
    {
      id: '4',
      sku: 'WATCH-APPLE-001',
      name: 'ساعة Apple Watch Series 9',
      description: 'ساعة ذكية متطورة مع مراقبة الصحة والرياضة وشاشة Always-On Retina.',
      shortDescription: 'ساعة ذكية متطورة مع مراقبة الصحة والرياضة',
      price: 1800,
      costPrice: 1200,
      category: '1',
      subcategory: 'wearables',
      brand: 'Apple',
      tags: ['ساعة ذكية', 'Apple Watch', 'صحة', 'رياضة'],
      images: ['/api/placeholder/400/300'],
      specifications: {
        'الحجم': '45mm',
        'الشاشة': 'Retina LTPO OLED',
        'البطارية': '18 ساعة',
        'المقاومة': '50 متر تحت الماء',
        'الاتصال': 'GPS + Cellular',
        'المعالج': 'S9 SiP',
        'التخزين': '64GB'
      },
      features: ['مراقبة الصحة', 'GPS مدمج', 'مقاوم للماء', 'شاشة Always-On'],
      stockQuantity: 0,
      minStockLevel: 5,
      maxStockLevel: 40,
      weight: 0.045,
      dimensions: { length: 4.5, width: 3.8, height: 1.1 },
      status: 'out_of_stock',
      isDigital: false,
      isFeatured: false,
      isOnSale: false,
      createdAt: '2024-03-10T12:00:00',
      updatedAt: '2024-08-03T16:20:00',
      salesCount: 12,
      viewsCount: 456,
      rating: 4.6,
      reviewsCount: 8
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'draft': return 'مسودة';
      case 'out_of_stock': return 'نفد المخزون';
      default: return status;
    }
  };

  const getStockStatus = (product: Product) => {
    if (product.stockQuantity === 0) return { color: 'text-red-600', text: 'نفد المخزون' };
    if (product.stockQuantity <= product.minStockLevel) return { color: 'text-orange-600', text: 'مخزون منخفض' };
    return { color: 'text-green-600', text: 'متوفر' };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'stock':
        return b.stockQuantity - a.stockQuantity;
      case 'sales':
        return b.salesCount - a.salesCount;
      case 'rating':
        return b.rating - a.rating;
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

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

  const ProductCard = ({ product }: { product: Product }) => {
    const stockStatus = getStockStatus(product);
    
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFeatured && (
              <Badge className="bg-purple-500 text-white">مميز</Badge>
            )}
            {product.isOnSale && (
              <Badge className="bg-red-500 text-white">خصم</Badge>
            )}
          </div>
          <Badge className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}>
            {getStatusText(product.status)}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600 mr-1">
              ({product.reviewsCount})
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold text-blue-600">
              {product.price.toLocaleString()} ريال
            </span>
            {product.salePrice && product.salePrice < product.price && (
              <span className="text-sm text-gray-500 line-through">
                {product.salePrice.toLocaleString()} ريال
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.text} ({product.stockQuantity})
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>{product.salesCount} مبيعات</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              عرض
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              تعديل
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProductListItem = ({ product }: { product: Product }) => {
    const stockStatus = getStockStatus(product);
    
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                </div>
                <div className="flex items-center gap-2">
                  {product.isFeatured && (
                    <Badge className="bg-purple-500 text-white">مميز</Badge>
                  )}
                  {product.isOnSale && (
                    <Badge className="bg-red-500 text-white">خصم</Badge>
                  )}
                  <Badge className={getStatusColor(product.status)}>
                    {getStatusText(product.status)}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 mr-1">
                    ({product.reviewsCount})
                  </span>
                </div>
                <span className={`text-sm font-medium ${stockStatus.color}`}>
                  {stockStatus.text} ({product.stockQuantity})
                </span>
                <span className="text-sm text-gray-600">
                  {product.salesCount} مبيعات
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-600">
                    {product.price.toLocaleString()} ريال
                  </span>
                  {product.salePrice && product.salePrice < product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.salePrice.toLocaleString()} ريال
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-8 w-8 text-blue-600" />
            كتالوج المنتجات
          </h1>
          <p className="text-gray-600 mt-2">إدارة وعرض جميع المنتجات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            استيراد
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            منتج جديد
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المنتجات</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المنتجات النشطة</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">نفد المخزون</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.stockQuantity === 0).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المنتجات المميزة</p>
                <p className="text-2xl font-bold text-purple-600">
                  {products.filter(p => p.isFeatured).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
          <TabsTrigger value="bulk-actions">العمليات المجمعة</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                    <option value="all">جميع الفئات</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="draft">مسودة</option>
                    <option value="out_of_stock">نفد المخزون</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="name">الاسم</option>
                    <option value="price">السعر</option>
                    <option value="stock">المخزون</option>
                    <option value="sales">المبيعات</option>
                    <option value="rating">التقييم</option>
                    <option value="created">تاريخ الإنشاء</option>
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
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>عرض {sortedProducts.length} من {products.length} منتج</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid/List */}
          <div className="space-y-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div>
                {sortedProducts.map(product => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>فئات المنتجات</CardTitle>
                  <CardDescription>إدارة فئات وتصنيفات المنتجات</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  فئة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{category.name}</h3>
                        <Badge variant="secondary">
                          {category.productsCount} منتج
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bulk Actions Tab */}
        <TabsContent value="bulk-actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>استيراد المنتجات</CardTitle>
                <CardDescription>استيراد منتجات متعددة من ملف Excel أو CSV</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">اسحب وأفلت الملف هنا أو</p>
                  <Button variant="outline">اختر ملف</Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>الصيغ المدعومة: Excel (.xlsx), CSV (.csv)</p>
                  <p>الحد الأقصى: 1000 منتج لكل ملف</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تصدير المنتجات</CardTitle>
                <CardDescription>تصدير بيانات المنتجات إلى ملف</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="export-format">صيغة التصدير</Label>
                  <select id="export-format" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV (.csv)</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="export-filter">فلتر التصدير</Label>
                  <select id="export-filter" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="all">جميع المنتجات</option>
                    <option value="active">المنتجات النشطة فقط</option>
                    <option value="featured">المنتجات المميزة فقط</option>
                    <option value="low-stock">المنتجات قليلة المخزون</option>
                  </select>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير المنتجات
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bulk Operations */}
          <Card>
            <CardHeader>
              <CardTitle>العمليات المجمعة</CardTitle>
              <CardDescription>تنفيذ عمليات على منتجات متعددة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="p-4 h-auto flex-col">
                  <Tag className="h-8 w-8 mb-2" />
                  <span>تحديث الأسعار</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex-col">
                  <Package className="h-8 w-8 mb-2" />
                  <span>تحديث المخزون</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex-col">
                  <CheckCircle className="h-8 w-8 mb-2" />
                  <span>تغيير الحالة</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductCatalog;

