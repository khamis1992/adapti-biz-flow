import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Anchor, 
  Ship, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  Star,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Navigation,
  Waves,
  Fuel,
  Shield,
  AlertTriangle,
  CheckCircle,
  Timer,
  TrendingUp,
  Award,
  Compass
} from 'lucide-react';

const YachtManagement = () => {
  const [activeTab, setActiveTab] = useState('fleet');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // بيانات تجريبية لليخوت
  const yachts = [
    {
      id: 'YCH-001',
      name: 'الأمير الأزرق',
      type: 'luxury',
      length: 45,
      capacity: 20,
      crew: 5,
      location: 'مارينا جدة',
      status: 'available',
      dailyRate: 5000.00,
      weeklyRate: 30000.00,
      features: ['مطبخ مجهز', 'غرف نوم 4', 'صالة VIP', 'جاكوزي', 'نظام صوتي'],
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      fuelLevel: 85,
      bookingsThisMonth: 12,
      revenue: 60000.00,
      rating: 4.9,
      images: ['/images/yacht1.jpg', '/images/yacht1-2.jpg']
    },
    {
      id: 'YCH-002',
      name: 'نسيم البحر',
      type: 'sport',
      length: 35,
      capacity: 15,
      crew: 3,
      location: 'مارينا الخبر',
      status: 'rented',
      dailyRate: 3500.00,
      weeklyRate: 21000.00,
      features: ['مطبخ صغير', 'غرف نوم 2', 'منطقة شمس', 'معدات رياضية'],
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05',
      fuelLevel: 60,
      bookingsThisMonth: 18,
      revenue: 63000.00,
      rating: 4.7,
      currentRental: {
        customer: 'أحمد محمد',
        startDate: '2024-01-15',
        endDate: '2024-01-17',
        totalAmount: 7000.00
      },
      images: ['/images/yacht2.jpg']
    },
    {
      id: 'YCH-003',
      name: 'لؤلؤة الخليج',
      type: 'family',
      length: 40,
      capacity: 18,
      crew: 4,
      location: 'مارينا الدمام',
      status: 'maintenance',
      dailyRate: 4000.00,
      weeklyRate: 24000.00,
      features: ['مطبخ كامل', 'غرف نوم 3', 'منطقة أطفال', 'شواية', 'ثلاجة كبيرة'],
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-01-20',
      fuelLevel: 95,
      bookingsThisMonth: 8,
      revenue: 32000.00,
      rating: 4.8,
      maintenanceIssue: 'صيانة دورية للمحرك',
      images: ['/images/yacht3.jpg']
    }
  ];

  // بيانات الحجوزات
  const bookings = [
    {
      id: 'BKG-001',
      yachtId: 'YCH-001',
      yachtName: 'الأمير الأزرق',
      customerName: 'سارة أحمد',
      customerPhone: '+966501234567',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      duration: 3,
      guests: 15,
      totalAmount: 15000.00,
      status: 'confirmed',
      services: ['كابتن', 'طعام', 'مشروبات'],
      specialRequests: 'احتفال عيد ميلاد',
      createdAt: '2024-01-10'
    },
    {
      id: 'BKG-002',
      yachtId: 'YCH-002',
      yachtName: 'نسيم البحر',
      customerName: 'محمد علي',
      customerPhone: '+966507654321',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      duration: 2,
      guests: 12,
      totalAmount: 7000.00,
      status: 'pending',
      services: ['كابتن', 'معدات رياضية'],
      specialRequests: 'رحلة صيد',
      createdAt: '2024-01-14'
    }
  ];

  const yachtStats = {
    totalYachts: 8,
    availableYachts: 5,
    rentedYachts: 2,
    maintenanceYachts: 1,
    bookingsToday: 3,
    revenueThisMonth: 155000.00,
    avgRating: 4.8,
    occupancyRate: 75
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'rented': return 'مؤجر';
      case 'maintenance': return 'صيانة';
      case 'out-of-service': return 'خارج الخدمة';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'rented': return <Users className="h-4 w-4" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />;
      case 'out-of-service': return <AlertTriangle className="h-4 w-4" />;
      default: return <Ship className="h-4 w-4" />;
    }
  };

  const getYachtTypeText = (type) => {
    switch (type) {
      case 'luxury': return 'فاخر';
      case 'sport': return 'رياضي';
      case 'family': return 'عائلي';
      case 'fishing': return 'صيد';
      default: return type;
    }
  };

  const filteredYachts = yachts.filter(yacht => {
    const matchesSearch = yacht.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yacht.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || yacht.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const YachtCard = ({ yacht }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{yacht.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Ship className="h-4 w-4" />
              <span>{getYachtTypeText(yacht.type)} - {yacht.length} متر</span>
            </CardDescription>
          </div>
          <Badge className={getStatusColor(yacht.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(yacht.status)}
              {getStatusText(yacht.status)}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* معلومات أساسية */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span>سعة: {yacht.capacity} شخص</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-green-500" />
              <span>{yacht.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-purple-500" />
              <span>{yacht.dailyRate.toFixed(0)} ر.س/يوم</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>تقييم: {yacht.rating}/5</span>
            </div>
          </div>

          {/* مستوى الوقود */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Fuel className="h-4 w-4 text-orange-500" />
                <span className="text-sm">مستوى الوقود</span>
              </div>
              <span className="text-sm font-medium">{yacht.fuelLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${yacht.fuelLevel > 50 ? 'bg-green-500' : yacht.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${yacht.fuelLevel}%` }}
              ></div>
            </div>
          </div>

          {/* الميزات */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">الميزات:</h4>
            <div className="flex flex-wrap gap-1">
              {yacht.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {yacht.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{yacht.features.length - 3} المزيد
                </Badge>
              )}
            </div>
          </div>

          {/* إحصائيات الشهر */}
          <div className="bg-blue-50 p-3 rounded">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">حجوزات الشهر:</span>
                <span className="font-semibold ml-2">{yacht.bookingsThisMonth}</span>
              </div>
              <div>
                <span className="text-gray-600">الإيرادات:</span>
                <span className="font-semibold ml-2 text-green-600">{yacht.revenue.toFixed(0)} ر.س</span>
              </div>
            </div>
          </div>

          {/* معلومات الصيانة */}
          <div className="text-xs text-gray-600">
            <div>آخر صيانة: {yacht.lastMaintenance}</div>
            <div>الصيانة القادمة: {yacht.nextMaintenance}</div>
          </div>

          {/* معلومات الإيجار الحالي */}
          {yacht.status === 'rented' && yacht.currentRental && (
            <div className="bg-yellow-50 p-2 rounded text-sm">
              <strong>مؤجر حالياً:</strong>
              <div>العميل: {yacht.currentRental.customer}</div>
              <div>من {yacht.currentRental.startDate} إلى {yacht.currentRental.endDate}</div>
            </div>
          )}

          {/* مشكلة الصيانة */}
          {yacht.status === 'maintenance' && yacht.maintenanceIssue && (
            <div className="bg-red-50 p-2 rounded text-sm">
              <strong>سبب الصيانة:</strong> {yacht.maintenanceIssue}
            </div>
          )}

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
            {yacht.status === 'available' && (
              <Button size="sm" className="flex-1">
                <Calendar className="h-4 w-4 mr-1" />
                حجز
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BookingCard = ({ booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{booking.customerName}</CardTitle>
            <CardDescription>{booking.yachtName}</CardDescription>
          </div>
          <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
            {booking.status === 'confirmed' ? 'مؤكد' : 'في الانتظار'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{booking.startDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Timer className="h-4 w-4 text-purple-500" />
              <span>{booking.duration} أيام</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-green-500" />
              <span>{booking.guests} ضيف</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-orange-500" />
              <span>{booking.totalAmount.toFixed(0)} ر.س</span>
            </div>
          </div>

          {/* الخدمات المطلوبة */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">الخدمات:</h4>
            <div className="flex flex-wrap gap-1">
              {booking.services.map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* طلبات خاصة */}
          {booking.specialRequests && (
            <div className="bg-blue-50 p-2 rounded text-sm">
              <strong>طلبات خاصة:</strong> {booking.specialRequests}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              عرض
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
              تعديل
            </Button>
            {booking.status === 'pending' && (
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                تأكيد
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة اليخوت</h1>
          <p className="text-gray-600">إدارة أسطول اليخوت والحجوزات</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          إضافة يخت جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي اليخوت</p>
                <p className="text-2xl font-bold text-blue-600">{yachtStats.totalYachts}</p>
              </div>
              <Ship className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متاحة</p>
                <p className="text-2xl font-bold text-green-600">{yachtStats.availableYachts}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إيرادات الشهر</p>
                <p className="text-2xl font-bold text-purple-600">{yachtStats.revenueThisMonth.toFixed(0)} ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معدل الإشغال</p>
                <p className="text-2xl font-bold text-orange-600">{yachtStats.occupancyRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fleet">الأسطول</TabsTrigger>
          <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
          <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في اليخوت..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة اليخت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="available">متاح</SelectItem>
                    <SelectItem value="rented">مؤجر</SelectItem>
                    <SelectItem value="maintenance">صيانة</SelectItem>
                    <SelectItem value="out-of-service">خارج الخدمة</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة اليخوت */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredYachts.map(yacht => (
              <YachtCard key={yacht.id} yacht={yacht} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          {/* قائمة الحجوزات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          {/* جدول الصيانة */}
          <Card>
            <CardHeader>
              <CardTitle>جدول الصيانة</CardTitle>
              <CardDescription>مواعيد الصيانة الدورية والطارئة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {yachts.map(yacht => (
                  <div key={yacht.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <h4 className="font-medium">{yacht.name}</h4>
                      <p className="text-sm text-gray-600">آخر صيانة: {yacht.lastMaintenance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">الصيانة القادمة:</p>
                      <p className="font-medium">{yacht.nextMaintenance}</p>
                    </div>
                    <Badge className={yacht.status === 'maintenance' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {yacht.status === 'maintenance' ? 'في الصيانة' : 'جاهز'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>أداء الأسطول</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>معدل الإشغال</span>
                    <span className="font-semibold text-blue-600">{yachtStats.occupancyRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط التقييم</span>
                    <span className="font-semibold text-yellow-600">{yachtStats.avgRating}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>اليخوت المتاحة</span>
                    <span className="font-semibold text-green-600">{yachtStats.availableYachts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>اليخوت المؤجرة</span>
                    <span className="font-semibold text-blue-600">{yachtStats.rentedYachts}</span>
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
                    <span>إيرادات الشهر</span>
                    <span className="font-semibold text-green-600">{yachtStats.revenueThisMonth.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>حجوزات اليوم</span>
                    <span className="font-semibold">{yachtStats.bookingsToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط قيمة الحجز</span>
                    <span className="font-semibold">{(yachtStats.revenueThisMonth / 25).toFixed(0)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>اليخوت في الصيانة</span>
                    <span className="font-semibold text-orange-600">{yachtStats.maintenanceYachts}</span>
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

export default YachtManagement;

