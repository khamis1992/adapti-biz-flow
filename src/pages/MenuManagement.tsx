import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Download,
  ChefHat,
  Clock,
  DollarSign,
  Star,
  AlertCircle,
  TrendingUp,
  Users,
  Utensils
} from 'lucide-react';

const MenuManagement = () => {
  const [activeTab, setActiveTab] = useState('menu-items');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // بيانات تجريبية للمنيو
  const menuItems = [
    {
      id: 1,
      name: 'برجر كلاسيكي',
      nameEn: 'Classic Burger',
      category: 'برجر',
      price: 45.00,
      cost: 25.00,
      description: 'برجر لحم بقري مع الخضار الطازجة',
      ingredients: ['لحم بقري', 'خس', 'طماطم', 'بصل', 'جبن'],
      preparationTime: 15,
      calories: 650,
      isAvailable: true,
      isPopular: true,
      allergens: ['جلوتين', 'ألبان'],
      image: '/api/placeholder/300/200',
      sales: 156,
      rating: 4.5
    },
    {
      id: 2,
      name: 'سلطة قيصر',
      nameEn: 'Caesar Salad',
      category: 'سلطات',
      price: 35.00,
      cost: 15.00,
      description: 'سلطة قيصر كلاسيكية مع الدجاج المشوي',
      ingredients: ['خس روماني', 'دجاج مشوي', 'جبن بارميزان', 'خبز محمص'],
      preparationTime: 10,
      calories: 420,
      isAvailable: true,
      isPopular: false,
      allergens: ['جلوتين', 'ألبان'],
      image: '/api/placeholder/300/200',
      sales: 89,
      rating: 4.2
    },
    {
      id: 3,
      name: 'بيتزا مارجريتا',
      nameEn: 'Margherita Pizza',
      category: 'بيتزا',
      price: 55.00,
      cost: 20.00,
      description: 'بيتزا كلاسيكية بالطماطم والجبن والريحان',
      ingredients: ['عجينة بيتزا', 'صلصة طماطم', 'جبن موزاريلا', 'ريحان'],
      preparationTime: 20,
      calories: 800,
      isAvailable: false,
      isPopular: true,
      allergens: ['جلوتين', 'ألبان'],
      image: '/api/placeholder/300/200',
      sales: 203,
      rating: 4.7
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الفئات', count: menuItems.length },
    { id: 'برجر', name: 'برجر', count: 1 },
    { id: 'سلطات', name: 'سلطات', count: 1 },
    { id: 'بيتزا', name: 'بيتزا', count: 1 },
    { id: 'مشروبات', name: 'مشروبات', count: 0 },
    { id: 'حلويات', name: 'حلويات', count: 0 }
  ];

  const menuAnalytics = {
    totalItems: 156,
    activeItems: 142,
    popularItems: 23,
    avgPrice: 42.50,
    avgRating: 4.3,
    totalSales: 15420,
    topCategory: 'برجر'
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const MenuItemCard = ({ item }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{item.nameEn}</CardDescription>
          </div>
          <div className="flex gap-2">
            {item.isPopular && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">شائع</Badge>}
            <Badge variant={item.isAvailable ? "default" : "destructive"}>
              {item.isAvailable ? 'متوفر' : 'غير متوفر'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">{item.price} ر.س</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{item.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">{item.description}</p>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{item.preparationTime} دقيقة</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <span>{item.sales} مبيعة</span>
            </div>
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4 text-gray-400" />
              <span>{item.calories} سعرة</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {item.ingredients.slice(0, 3).map((ingredient, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ingredient}
              </Badge>
            ))}
            {item.ingredients.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.ingredients.length - 3} أكثر
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-1" />
                عرض
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-1" />
                تعديل
              </Button>
            </div>
            <Button size="sm" variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة المنيو</h1>
          <p className="text-gray-600">إدارة شاملة لقائمة الطعام والمشروبات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير المنيو
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة صنف جديد
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الأصناف</p>
                <p className="text-2xl font-bold">{menuAnalytics.totalItems}</p>
              </div>
              <ChefHat className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الأصناف النشطة</p>
                <p className="text-2xl font-bold text-green-600">{menuAnalytics.activeItems}</p>
              </div>
              <Utensils className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط السعر</p>
                <p className="text-2xl font-bold">{menuAnalytics.avgPrice} ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold">{menuAnalytics.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menu-items">أصناف المنيو</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="menu-items" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في المنيو..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة الأصناف */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد أصناف</h3>
                <p className="text-gray-600">لم يتم العثور على أصناف تطابق معايير البحث</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إدارة فئات المنيو</CardTitle>
              <CardDescription>إضافة وتعديل فئات الأصناف</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.filter(cat => cat.id !== 'all').map(category => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.count} صنف</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed">
                  <CardContent className="p-4 text-center">
                    <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">إضافة فئة جديدة</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>الأصناف الأكثر مبيعاً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {menuItems.sort((a, b) => b.sales - a.sales).slice(0, 5).map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.sales} مبيعة</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الأصناف الأعلى تقييماً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {menuItems.sort((a, b) => b.rating - a.rating).slice(0, 5).map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المنيو</CardTitle>
              <CardDescription>تخصيص إعدادات إدارة المنيو</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">عرض الأسعار للعملاء</Label>
                  <p className="text-sm text-gray-600">إظهار أسعار الأصناف في المنيو العام</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">إشعارات نفاد المخزون</Label>
                  <p className="text-sm text-gray-600">تنبيه عند نفاد مكونات الأصناف</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">تحديث تلقائي للأسعار</Label>
                  <p className="text-sm text-gray-600">تحديث الأسعار بناءً على تكلفة المكونات</p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Label>عملة الأسعار</Label>
                <Select defaultValue="sar">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sar">ريال سعودي (ر.س)</SelectItem>
                    <SelectItem value="usd">دولار أمريكي ($)</SelectItem>
                    <SelectItem value="eur">يورو (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagement;

