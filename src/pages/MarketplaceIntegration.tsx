import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star, 
  Eye, 
  Heart, 
  MessageSquare, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Settings, 
  RefreshCw as Sync, 
  Upload, 
  Download, 
  Link, 
  Unlink, 
  Plus, 
  Edit, 
  Trash2, 
  Filter, 
  Search, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Target, 
  Zap, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Coins, 
  Receipt, 
  FileText, 
  Image, 
  Video, 
  Tag, 
  Tags, 
  Hash, 
  AtSign, 
  Percent, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  MoreVertical, 
  Info, 
  HelpCircle as Help, 
  HelpCircle, 
  HelpCircle as Question, 
  AlertTriangle as Warning,
  Check, 
  X, 
  Minus, 
  Copy, 
  Share, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  Home, 
  Car, 
  Plane, 
  Ship, 
  Train 
} from 'lucide-react';

const MarketplaceIntegration = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات نموذجية للمتاجر المتكاملة
  const marketplaces = [
    {
      id: 1,
      name: 'أمازون',
      logo: '📦',
      status: 'متصل',
      products: 245,
      orders: 1250,
      revenue: 185000,
      rating: 4.6,
      commission: 15,
      lastSync: '2024-01-20 14:30',
      color: 'bg-orange-500'
    },
    {
      id: 2,
      name: 'نون',
      logo: '🛍️',
      status: 'متصل',
      products: 189,
      orders: 890,
      revenue: 125000,
      rating: 4.4,
      commission: 12,
      lastSync: '2024-01-20 15:15',
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      name: 'سوق.كوم',
      logo: '🏪',
      status: 'متصل',
      products: 156,
      orders: 675,
      revenue: 95000,
      rating: 4.2,
      commission: 10,
      lastSync: '2024-01-20 13:45',
      color: 'bg-blue-500'
    },
    {
      id: 4,
      name: 'جوميا',
      logo: '🛒',
      status: 'غير متصل',
      products: 78,
      orders: 234,
      revenue: 35000,
      rating: 3.9,
      commission: 8,
      lastSync: '2024-01-18 10:20',
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'علي إكسبريس',
      logo: '🎁',
      status: 'متصل',
      products: 312,
      orders: 1580,
      revenue: 220000,
      rating: 4.7,
      commission: 18,
      lastSync: '2024-01-20 16:00',
      color: 'bg-red-500'
    },
    {
      id: 6,
      name: 'إيباي',
      logo: '🏷️',
      status: 'متصل',
      products: 198,
      orders: 567,
      revenue: 78000,
      rating: 4.1,
      commission: 13,
      lastSync: '2024-01-20 12:30',
      color: 'bg-purple-500'
    }
  ];

  // بيانات المنتجات المتزامنة
  const syncedProducts = [
    {
      id: 1,
      name: 'لابتوب Dell XPS 13',
      sku: 'DELL-XPS-13-2024',
      price: 4500,
      stock: 25,
      marketplaces: ['أمازون', 'نون', 'سوق.كوم'],
      status: 'متزامن',
      lastUpdate: '2024-01-20 14:30',
      sales: 45
    },
    {
      id: 2,
      name: 'هاتف iPhone 15 Pro',
      sku: 'APPLE-IP15-PRO',
      price: 5200,
      stock: 18,
      marketplaces: ['أمازون', 'علي إكسبريس'],
      status: 'متزامن',
      lastUpdate: '2024-01-20 15:15',
      sales: 67
    },
    {
      id: 3,
      name: 'ساعة Apple Watch Series 9',
      sku: 'APPLE-AW-S9',
      price: 1800,
      stock: 0,
      marketplaces: ['نون', 'إيباي'],
      status: 'نفد المخزون',
      lastUpdate: '2024-01-20 13:45',
      sales: 23
    },
    {
      id: 4,
      name: 'سماعات Sony WH-1000XM5',
      sku: 'SONY-WH1000XM5',
      price: 1200,
      stock: 42,
      marketplaces: ['أمازون', 'جوميا'],
      status: 'خطأ في المزامنة',
      lastUpdate: '2024-01-19 16:20',
      sales: 31
    }
  ];

  // بيانات الطلبات
  const orders = [
    {
      id: 'ORD-2024-001',
      marketplace: 'أمازون',
      customer: 'أحمد محمد',
      product: 'لابتوب Dell XPS 13',
      quantity: 1,
      amount: 4500,
      status: 'تم الشحن',
      date: '2024-01-20',
      tracking: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      marketplace: 'نون',
      customer: 'فاطمة علي',
      product: 'هاتف iPhone 15 Pro',
      quantity: 2,
      amount: 10400,
      status: 'قيد المعالجة',
      date: '2024-01-20',
      tracking: null
    },
    {
      id: 'ORD-2024-003',
      marketplace: 'سوق.كوم',
      customer: 'خالد السعد',
      product: 'ساعة Apple Watch Series 9',
      quantity: 1,
      amount: 1800,
      status: 'ملغي',
      date: '2024-01-19',
      tracking: null
    },
    {
      id: 'ORD-2024-004',
      marketplace: 'علي إكسبريس',
      customer: 'نورا الحسن',
      product: 'سماعات Sony WH-1000XM5',
      quantity: 3,
      amount: 3600,
      status: 'تم التسليم',
      date: '2024-01-18',
      tracking: 'TRK987654321'
    }
  ];

  // بيانات التحليلات
  const analytics = {
    totalRevenue: 738000,
    totalOrders: 5196,
    totalProducts: 1178,
    averageRating: 4.3,
    topMarketplace: 'علي إكسبريس',
    bestSellingProduct: 'هاتف iPhone 15 Pro',
    conversionRate: 3.2,
    returnRate: 2.8
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'متصل': return 'bg-green-100 text-green-800';
      case 'غير متصل': return 'bg-red-100 text-red-800';
      case 'متزامن': return 'bg-green-100 text-green-800';
      case 'نفد المخزون': return 'bg-yellow-100 text-yellow-800';
      case 'خطأ في المزامنة': return 'bg-red-100 text-red-800';
      case 'تم الشحن': return 'bg-blue-100 text-blue-800';
      case 'قيد المعالجة': return 'bg-yellow-100 text-yellow-800';
      case 'تم التسليم': return 'bg-green-100 text-green-800';
      case 'ملغي': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'متصل': return <CheckCircle className="h-4 w-4" />;
      case 'غير متصل': return <XCircle className="h-4 w-4" />;
      case 'متزامن': return <CheckCircle className="h-4 w-4" />;
      case 'نفد المخزون': return <AlertCircle className="h-4 w-4" />;
      case 'خطأ في المزامنة': return <XCircle className="h-4 w-4" />;
      case 'تم الشحن': return <Truck className="h-4 w-4" />;
      case 'قيد المعالجة': return <Clock className="h-4 w-4" />;
      case 'تم التسليم': return <CheckCircle className="h-4 w-4" />;
      case 'ملغي': return <XCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                تكامل المتاجر الإلكترونية
              </h1>
              <p className="text-gray-600">
                إدارة شاملة ومتطورة لجميع المتاجر الإلكترونية والمنصات التجارية
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة متجر
              </Button>
              <Button variant="outline">
                <Sync className="h-4 w-4 ml-2" />
                مزامنة الكل
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تقرير شامل
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                  <p className="text-2xl font-bold text-gray-900">{(analytics.totalRevenue / 1000).toFixed(0)}K ريال</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +22.5% هذا الشهر
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +18.3% هذا الشهر
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المنتجات</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalProducts.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    عبر 6 متاجر
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}/5.0</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(analytics.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="marketplaces">المتاجر</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Marketplaces */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="h-5 w-5 ml-2" />
                    أفضل المتاجر أداءً
                  </CardTitle>
                  <CardDescription>المتاجر ذات الإيرادات الأعلى</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketplaces.slice(0, 4).map((marketplace) => (
                      <div key={marketplace.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="text-2xl">{marketplace.logo}</div>
                          <div>
                            <p className="font-medium text-gray-900">{marketplace.name}</p>
                            <p className="text-sm text-gray-600">{marketplace.products} منتج</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-green-600">
                            {(marketplace.revenue / 1000).toFixed(0)}K ريال
                          </p>
                          <Badge className={getStatusColor(marketplace.status)}>
                            {marketplace.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="h-5 w-5 ml-2" />
                    الطلبات الحديثة
                  </CardTitle>
                  <CardDescription>آخر الطلبات من جميع المتاجر</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.marketplace} • {order.customer}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{order.amount.toLocaleString()} ريال</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 ml-2" />
                  الإيرادات الشهرية حسب المتجر
                </CardTitle>
                <CardDescription>مقارنة أداء المتاجر خلال الأشهر الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 space-x-reverse">
                  {marketplaces.slice(0, 6).map((marketplace, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full ${marketplace.color} rounded-t-md mb-2 transition-all duration-300 hover:opacity-80`}
                        style={{ height: `${(marketplace.revenue / 2500)}px` }}
                      ></div>
                      <p className="text-xs text-gray-600 text-center">{marketplace.name}</p>
                      <p className="text-xs font-medium text-gray-900">
                        {(marketplace.revenue / 1000).toFixed(0)}K
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplaces Tab */}
          <TabsContent value="marketplaces" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaces.map((marketplace) => (
                <Card key={marketplace.id} className="border-t-4" style={{ borderTopColor: marketplace.color.replace('bg-', '#') }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="text-3xl">{marketplace.logo}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{marketplace.name}</h3>
                          <p className="text-sm text-gray-600">متجر إلكتروني</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge className={getStatusColor(marketplace.status)}>
                          {marketplace.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">المنتجات:</span>
                        <span className="font-medium text-gray-900">{marketplace.products}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الطلبات:</span>
                        <span className="font-medium text-blue-600">{marketplace.orders.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الإيرادات:</span>
                        <span className="font-medium text-green-600">
                          {(marketplace.revenue / 1000).toFixed(0)}K ريال
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">التقييم:</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 ml-1">
                            {marketplace.rating}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(marketplace.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">العمولة:</span>
                        <span className="text-sm font-medium text-orange-600">{marketplace.commission}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">آخر مزامنة:</span>
                        <span className="text-xs text-gray-500">{marketplace.lastSync}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Sync className="h-4 w-4 ml-2" />
                        مزامنة
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 ml-2" />
                    المنتجات المتزامنة
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 ml-2" />
                      فلترة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 ml-2" />
                      بحث
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 ml-2" />
                      رفع منتجات
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4 font-medium text-gray-900">المنتج</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">السعر</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">المخزون</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">المتاجر</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">المبيعات</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">آخر تحديث</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-900">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {syncedProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.sku}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {product.price.toLocaleString()} ريال
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {product.marketplaces.map((marketplace, index) => (
                                <Badge key={index} variant="secondary">
                                  {marketplace}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(product.status)}>
                              {product.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-medium text-blue-600">
                            {product.sales}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {product.lastUpdate}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button variant="ghost" size="sm">
                                <Sync className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
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

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 ml-2" />
                    طلبات المتاجر
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 ml-2" />
                      فلترة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 ml-2" />
                      بحث
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getStatusIcon(order.status)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{order.id}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><span className="font-medium">المتجر:</span> {order.marketplace}</p>
                              <p><span className="font-medium">العميل:</span> {order.customer}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">المنتج:</span> {order.product}</p>
                              <p><span className="font-medium">الكمية:</span> {order.quantity}</p>
                            </div>
                          </div>
                          
                          {order.tracking && (
                            <div className="mt-2 text-sm text-blue-600">
                              <span className="font-medium">رقم التتبع:</span> {order.tracking}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <p className="text-lg font-bold text-gray-900 mb-1">
                          {order.amount.toLocaleString()} ريال
                        </p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        
                        <div className="flex items-center space-x-2 space-x-reverse mt-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {order.tracking && (
                            <Button variant="ghost" size="sm">
                              <Truck className="h-4 w-4" />
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 ml-2" />
                    توزيع الإيرادات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketplaces.slice(0, 5).map((marketplace, index) => {
                      const percentage = ((marketplace.revenue / analytics.totalRevenue) * 100).toFixed(1);
                      return (
                        <div key={marketplace.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${marketplace.color} ml-3`}></div>
                            <span className="font-medium text-gray-900">{marketplace.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 ml-3">
                              {(marketplace.revenue / 1000).toFixed(0)}K
                            </span>
                            <span className="font-medium text-gray-900">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 ml-2" />
                    مؤشرات الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">أفضل متجر</span>
                        <span className="text-blue-600 font-semibold">{analytics.topMarketplace}</span>
                      </div>
                      <p className="text-sm text-gray-600">أعلى إيرادات هذا الشهر</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">أفضل منتج</span>
                        <span className="text-green-600 font-semibold">67 مبيعة</span>
                      </div>
                      <p className="text-sm text-gray-600">{analytics.bestSellingProduct}</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">معدل التحويل</span>
                        <span className="text-purple-600 font-semibold">{analytics.conversionRate}%</span>
                      </div>
                      <p className="text-sm text-gray-600">من الزيارات إلى المبيعات</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">معدل الإرجاع</span>
                        <span className="text-yellow-600 font-semibold">{analytics.returnRate}%</span>
                      </div>
                      <p className="text-sm text-gray-600">من إجمالي الطلبات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 ml-2" />
                  الأداء الشهري
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {(analytics.totalRevenue / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">إجمالي الإيرادات</div>
                    <div className="text-xs text-green-600 mt-1">+22.5% من الشهر الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {analytics.totalOrders.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">إجمالي الطلبات</div>
                    <div className="text-xs text-green-600 mt-1">+18.3% من الشهر الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {analytics.conversionRate}%
                    </div>
                    <div className="text-sm text-gray-600">معدل التحويل</div>
                    <div className="text-xs text-green-600 mt-1">+0.8% من الشهر الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      {analytics.averageRating}
                    </div>
                    <div className="text-sm text-gray-600">متوسط التقييم</div>
                    <div className="text-xs text-green-600 mt-1">+0.2 من الشهر الماضي</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplaceIntegration;

