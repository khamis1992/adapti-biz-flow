import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Scissors, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Users, 
  Star,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Timer,
  TrendingUp,
  Award,
  Heart,
  Palette,
  Zap
} from 'lucide-react';

const SalonServices = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // بيانات تجريبية للخدمات
  const services = [
    {
      id: 'SRV-001',
      name: 'قص شعر رجالي كلاسيكي',
      category: 'hair-men',
      duration: 30,
      price: 50.00,
      description: 'قص شعر رجالي احترافي مع تشذيب اللحية',
      popularity: 95,
      rating: 4.8,
      bookingsToday: 12,
      revenue: 600.00,
      specialist: 'أحمد الحلاق',
      tools: ['مقص احترافي', 'ماكينة حلاقة', 'مشط'],
      image: '/images/mens-haircut.jpg'
    },
    {
      id: 'SRV-002',
      name: 'صبغة شعر نسائية',
      category: 'hair-women',
      duration: 120,
      price: 200.00,
      description: 'صبغة شعر احترافية بألوان متنوعة',
      popularity: 88,
      rating: 4.9,
      bookingsToday: 8,
      revenue: 1600.00,
      specialist: 'فاطمة المصففة',
      tools: ['صبغة احترافية', 'فرشاة صبغ', 'قفازات'],
      image: '/images/hair-coloring.jpg'
    },
    {
      id: 'SRV-003',
      name: 'تنظيف بشرة عميق',
      category: 'skincare',
      duration: 60,
      price: 150.00,
      description: 'تنظيف عميق للبشرة مع ماسك مغذي',
      popularity: 92,
      rating: 4.7,
      bookingsToday: 6,
      revenue: 900.00,
      specialist: 'سارة خبيرة التجميل',
      tools: ['منظف عميق', 'ماسك طبيعي', 'مرطب'],
      image: '/images/facial-treatment.jpg'
    },
    {
      id: 'SRV-004',
      name: 'مانيكير وباديكير',
      category: 'nails',
      duration: 45,
      price: 80.00,
      description: 'عناية كاملة بالأظافر مع طلاء احترافي',
      popularity: 85,
      rating: 4.6,
      bookingsToday: 10,
      revenue: 800.00,
      specialist: 'نورا فنانة الأظافر',
      tools: ['مبرد أظافر', 'طلاء أظافر', 'كريم مرطب'],
      image: '/images/manicure.jpg'
    },
    {
      id: 'SRV-005',
      name: 'مساج استرخاء',
      category: 'massage',
      duration: 90,
      price: 250.00,
      description: 'مساج استرخاء كامل للجسم بالزيوت الطبيعية',
      popularity: 78,
      rating: 4.9,
      bookingsToday: 4,
      revenue: 1000.00,
      specialist: 'ليلى أخصائية المساج',
      tools: ['زيوت طبيعية', 'منشفة دافئة', 'موسيقى هادئة'],
      image: '/images/massage.jpg'
    }
  ];

  // بيانات الفئات
  const categories = [
    { id: 'hair-men', name: 'شعر رجالي', icon: <Scissors className="h-5 w-5" />, color: 'blue' },
    { id: 'hair-women', name: 'شعر نسائي', icon: <Sparkles className="h-5 w-5" />, color: 'pink' },
    { id: 'skincare', name: 'العناية بالبشرة', icon: <Heart className="h-5 w-5" />, color: 'green' },
    { id: 'nails', name: 'الأظافر', icon: <Palette className="h-5 w-5" />, color: 'purple' },
    { id: 'massage', name: 'المساج', icon: <Zap className="h-5 w-5" />, color: 'orange' }
  ];

  const serviceStats = {
    totalServices: 25,
    activeServices: 22,
    bookingsToday: 45,
    revenueToday: 5250.00,
    avgRating: 4.7,
    popularService: 'قص شعر رجالي',
    busyHours: '14:00 - 18:00',
    specialists: 8
  };

  const getCategoryColor = (category) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.color : 'gray';
  };

  const getCategoryName = (category) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.name : category;
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const ServiceCard = ({ service }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{service.name}</CardTitle>
            <CardDescription className="mt-1">{service.description}</CardDescription>
          </div>
          <Badge variant="outline" className={`bg-${getCategoryColor(service.category)}-100 text-${getCategoryColor(service.category)}-800`}>
            {getCategoryName(service.category)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* معلومات أساسية */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-green-600">{service.price.toFixed(2)} ر.س</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{service.duration} دقيقة</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{service.rating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span>{service.popularity}% شعبية</span>
            </div>
          </div>

          {/* الأخصائي */}
          <div className="bg-blue-50 p-3 rounded">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-medium">الأخصائي: {service.specialist}</span>
            </div>
          </div>

          {/* إحصائيات اليوم */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">حجوزات اليوم:</span>
              <span className="font-semibold ml-2">{service.bookingsToday}</span>
            </div>
            <div>
              <span className="text-gray-600">إيرادات اليوم:</span>
              <span className="font-semibold ml-2 text-green-600">{service.revenue.toFixed(0)} ر.س</span>
            </div>
          </div>

          {/* الأدوات المطلوبة */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">الأدوات المطلوبة:</h4>
            <div className="flex flex-wrap gap-1">
              {service.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              عرض
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
              تعديل
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-1" />
              حجز
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CategoryCard = ({ category }) => {
    const categoryServices = services.filter(service => service.category === category.id);
    const totalRevenue = categoryServices.reduce((sum, service) => sum + service.revenue, 0);
    const totalBookings = categoryServices.reduce((sum, service) => sum + service.bookingsToday, 0);
    
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
              {category.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <CardDescription>{categoryServices.length} خدمة</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">حجوزات اليوم:</span>
                <span className="font-semibold ml-2">{totalBookings}</span>
              </div>
              <div>
                <span className="text-gray-600">الإيرادات:</span>
                <span className="font-semibold ml-2 text-green-600">{totalRevenue.toFixed(0)} ر.س</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">الخدمات الأكثر طلباً:</h4>
              {categoryServices
                .sort((a, b) => b.bookingsToday - a.bookingsToday)
                .slice(0, 3)
                .map((service, index) => (
                  <div key={service.id} className="flex justify-between items-center text-sm">
                    <span>{service.name}</span>
                    <span className="text-blue-600">{service.bookingsToday} حجز</span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">خدمات الصالون</h1>
          <p className="text-gray-600">إدارة خدمات التجميل والعناية</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          إضافة خدمة جديدة
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الخدمات</p>
                <p className="text-2xl font-bold text-blue-600">{serviceStats.totalServices}</p>
              </div>
              <Scissors className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">حجوزات اليوم</p>
                <p className="text-2xl font-bold text-green-600">{serviceStats.bookingsToday}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إيرادات اليوم</p>
                <p className="text-2xl font-bold text-purple-600">{serviceStats.revenueToday.toFixed(0)} ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold text-yellow-600">{serviceStats.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">الخدمات</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
          <TabsTrigger value="specialists">الأخصائيين</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في الخدمات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="فئة الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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

          {/* قائمة الخدمات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specialists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* بيانات الأخصائيين */}
            {['أحمد الحلاق', 'فاطمة المصففة', 'سارة خبيرة التجميل', 'نورا فنانة الأظافر', 'ليلى أخصائية المساج'].map((specialist, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{specialist}</CardTitle>
                  <CardDescription>أخصائي معتمد</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>تقييم: 4.8/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>حجوزات اليوم: {Math.floor(Math.random() * 10) + 5}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      <span>خبرة: {Math.floor(Math.random() * 10) + 3} سنوات</span>
                    </div>
                    <Button size="sm" className="w-full">
                      عرض الجدول
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>أداء الخدمات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>الخدمة الأكثر طلباً</span>
                    <span className="font-semibold">{serviceStats.popularService}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط التقييم</span>
                    <span className="font-semibold text-yellow-600">{serviceStats.avgRating}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الساعات الأكثر ازدحاماً</span>
                    <span className="font-semibold">{serviceStats.busyHours}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>عدد الأخصائيين</span>
                    <span className="font-semibold">{serviceStats.specialists}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإيرادات والحجوزات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي الحجوزات اليوم</span>
                    <span className="font-semibold">{serviceStats.bookingsToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>إجمالي الإيرادات اليوم</span>
                    <span className="font-semibold text-green-600">{serviceStats.revenueToday.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط قيمة الخدمة</span>
                    <span className="font-semibold">{(serviceStats.revenueToday / serviceStats.bookingsToday).toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل الإشغال</span>
                    <span className="font-semibold text-blue-600">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalonServices;

