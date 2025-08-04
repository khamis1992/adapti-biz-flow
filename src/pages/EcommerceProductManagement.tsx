import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Upload,
  Download,
  MoreHorizontal,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Tag,
  Barcode,
  DollarSign,
  Percent,
  Calendar,
  Clock,
  Users,
  ShoppingCart,
  Heart,
  Share2,
  Copy,
  Settings,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  salePrice?: number;
  category: string;
  brand: string;
  images: string[];
  stockQuantity: number;
  minStockLevel: number;
  status: 'active' | 'inactive' | 'draft' | 'out_of_stock';
  isOnSale: boolean;
  isFeatured: boolean;
  salesCount: number;
  viewsCount: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
  profit: number;
  profitMargin: number;
}

interface Category {
  id: string;
  name: string;
  productsCount: number;
  totalSales: number;
}

const EcommerceProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Mock products data
  const [products] = useState<Product[]>([
    {
      id: '1',
      sku: 'LAPTOP-DELL-001',
      name: 'لابتوب Dell XPS 13',
      description: 'لابتوب عالي الأداء مع معالج Intel Core i7',
      price: 4200,
      costPrice: 3200,
      salePrice: 3990,
      category: 'electronics',
      brand: 'Dell',
      images: ['/api/placeholder/300/300'],
      stockQuantity: 15,
      minStockLevel: 5,
      status: 'active',
      isOnSale: true,
      isFeatured: true,
      salesCount: 45,
      viewsCount: 1250,
      rating: 4.8,
      reviewsCount: 23,
      createdAt: '2024-01-15',
      updatedAt: '2024-08-01',
      profit: 790,
      profitMargin: 19.8
    },
    {
      id: '2',
      sku: 'PHONE-IPHONE-001',
      name: 'هاتف iPhone 15 Pro',
      description: 'أحدث هاتف من Apple مع معالج A17 Pro',
      price: 4200,
      costPrice: 3000,
      category: 'electronics',
      brand: 'Apple',
      images: ['/api/placeholder/300/300'],
      stockQuantity: 8,
      minStockLevel: 3,
      status: 'active',
      isOnSale: false,
      isFeatured: true,
      salesCount: 28,
      viewsCount: 2100,
      rating: 4.9,
      reviewsCount: 15,
      createdAt: '2024-02-01',
      updatedAt: '2024-08-02',
      profit: 1200,
      profitMargin: 28.6
    },
    {
      id: '3',
      sku: 'HEADPHONES-SONY-001',
      name: 'سماعات Sony WH-1000XM5',
      description: 'سماعات لاسلكية مع إلغاء الضوضاء',
      price: 1200,
      costPrice: 800,
      salePrice: 1050,
      category: 'electronics',
      brand: 'Sony',
      images: ['/api/placeholder/300/300'],
      stockQuantity: 25,
      minStockLevel: 10,
      status: 'active',
      isOnSale: true,
      isFeatured: false,
      salesCount: 67,
      viewsCount: 890,
      rating: 4.7,
      reviewsCount: 34,
      createdAt: '2024-01-20',
      updatedAt: '2024-07-28',
      profit: 250,
      profitMargin: 23.8
    },
    {
      id: '4',
      sku: 'WATCH-APPLE-001',
      name: 'ساعة Apple Watch Series 9',
      description: 'ساعة ذكية متطورة مع مراقبة الصحة',
      price: 1800,
      costPrice: 1200,
      category: 'electronics',
      brand: 'Apple',
      images: ['/api/placeholder/300/300'],
      stockQuantity: 0,
      minStockLevel: 5,
      status: 'out_of_stock',
      isOnSale: false,
      isFeatured: false,
      salesCount: 12,
      viewsCount: 456,
      rating: 4.6,
      reviewsCount: 8,
      createdAt: '2024-03-10',
      updatedAt: '2024-08-03',
      profit: 600,
      profitMargin: 33.3
    }
  ]);

  // Mock categories
  const categories: Category[] = [
    { id: 'electronics', name: 'إلكترونيات', productsCount: 156, totalSales: 450000 },
    { id: 'clothing', name: 'ملابس', productsCount: 89, totalSales: 120000 },
    { id: 'home', name: 'منزل ومطبخ', productsCount: 234, totalSales: 200000 },
    { id: 'sports', name: 'رياضة', productsCount: 67, totalSales: 80000 }
  ];

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
    if (product.stockQuantity === 0) return { color: 'text-red-600', text: 'نفد المخزون', icon: <XCircle className="h-4 w-4" /> };
    if (product.stockQuantity <= product.minStockLevel) return { color: 'text-orange-600', text: 'مخزون منخفض', icon: <AlertTriangle className="h-4 w-4" /> };
    return { color: 'text-green-600', text: 'متوفر', icon: <CheckCircle className="h-4 w-4" /> };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'price': return a.price - b.price;
      case 'stock': return b.stockQuantity - a.stockQuantity;
      case 'sales': return b.salesCount - a.salesCount;
      case 'profit': return b.profit - a.profit;
      case 'rating': return b.rating - a.rating;
      case 'created': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: return 0;
    }
  });

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === sortedProducts.length 
        ? [] 
        : sortedProducts.map(p => p.id)
    );
  };

  const getTotalStats = () => {
    return {
      totalProducts: products.length,
      activeProducts: products.filter(p => p.status === 'active').length,
      outOfStock: products.filter(p => p.stockQuantity === 0).length,
      lowStock: products.filter(p => p.stockQuantity <= p.minStockLevel && p.stockQuantity > 0).length,
      totalSales: products.reduce((sum, p) => sum + p.salesCount, 0),
      totalRevenue: products.reduce((sum, p) => sum + (p.price * p.salesCount), 0),
      totalProfit: products.reduce((sum, p) => sum + (p.profit * p.salesCount), 0),
      avgRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length
    };
  };

  const stats = getTotalStats();

  const renderProductCard = (product: Product) => {
    const stockStatus = getStockStatus(product);
    const isSelected = selectedProducts.includes(product.id);
    
    return (
      <Card key={product.id} className={`hover:shadow-lg transition-shadow duration-300 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
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
          <div className="absolute bottom-2 left-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleSelectProduct(product.id)}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
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
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-gray-500" />
              <span className={stockStatus.color}>
                {product.stockQuantity} قطعة
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span>{product.salesCount} مبيعات</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-green-600">
                {product.profitMargin.toFixed(1)}% ربح
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{product.rating} ({product.reviewsCount})</span>
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
              <MoreHorizontal className="h-4 w-4" />
            </Button>
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
            إدارة منتجات المتجر
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لمنتجات المتجر الإلكتروني</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% من الشهر الماضي
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المبيعات</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalSales.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% من الشهر الماضي
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-purple-600">{(stats.totalRevenue / 1000).toFixed(0)}K ريال</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% من الشهر الماضي
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">نفد المخزون</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  يحتاج إعادة تخزين
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
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
                    <option value="profit">الربح</option>
                    <option value="rating">التقييم</option>
                    <option value="created">تاريخ الإنشاء</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>عرض {sortedProducts.length} من {products.length} منتج</span>
                  {selectedProducts.length > 0 && (
                    <span className="text-blue-600 font-medium">
                      تم تحديد {selectedProducts.length} منتج
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === sortedProducts.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>تحديد الكل</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-800">
                    تم تحديد {selectedProducts.length} منتج
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      تعديل مجمع
                    </Button>
                    <Button variant="outline" size="sm">
                      <Tag className="h-4 w-4 mr-2" />
                      تحديث الأسعار
                    </Button>
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      تحديث المخزون
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      حذف
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(renderProductCard)}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  أداء المبيعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.salesCount} مبيعات</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{(product.price * product.salesCount).toLocaleString()} ريال</p>
                        <p className="text-xs text-green-600">+{product.profitMargin.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  توزيع الفئات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.productsCount} منتج</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{(category.totalSales / 1000).toFixed(0)}K ريال</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(category.totalSales / 450000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">معدل التحويل</h3>
                <p className="text-3xl font-bold text-blue-600">3.2%</p>
                <p className="text-sm text-gray-600">من الزيارات إلى مبيعات</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">متوسط قيمة الطلب</h3>
                <p className="text-3xl font-bold text-green-600">850 ريال</p>
                <p className="text-sm text-gray-600">لكل طلب</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">متوسط التقييم</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)}</p>
                <p className="text-sm text-gray-600">من 5 نجوم</p>
              </CardContent>
            </Card>
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
                      <p className="text-sm text-gray-600 mb-3">
                        إجمالي المبيعات: {(category.totalSales / 1000).toFixed(0)}K ريال
                      </p>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <Button variant="outline" className="p-4 h-auto flex-col">
                  <Star className="h-8 w-8 mb-2" />
                  <span>إدارة المميزات</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EcommerceProductManagement;

