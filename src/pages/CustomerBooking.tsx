import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageCircle,
  CreditCard,
  Bell,
  Settings
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  provider: string;
  rating: number;
  reviewsCount: number;
  image: string;
  availableSlots: string[];
  features: string[];
}

interface Booking {
  id: string;
  bookingNumber: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  provider: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'rescheduled';
  location: string;
  notes?: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  bookingId: string;
  serviceName: string;
  provider: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

const CustomerBooking = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock customer data
  const customerInfo = {
    name: 'أحمد محمد الأحمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    totalBookings: 28,
    completedBookings: 24,
    upcomingBookings: 2,
    cancelledBookings: 2
  };

  // Mock services data
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'قص شعر رجالي',
      description: 'قص شعر احترافي مع تشذيب اللحية',
      duration: 45,
      price: 80,
      category: 'salon',
      provider: 'صالون الأناقة',
      rating: 4.8,
      reviewsCount: 156,
      image: '/api/placeholder/300/200',
      availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      features: ['قص شعر', 'تشذيب لحية', 'غسيل شعر', 'تصفيف']
    },
    {
      id: '2',
      name: 'تنظيف أسنان',
      description: 'تنظيف شامل للأسنان مع الفحص الدوري',
      duration: 60,
      price: 200,
      category: 'medical',
      provider: 'عيادة الأسنان المتقدمة',
      rating: 4.9,
      reviewsCount: 89,
      image: '/api/placeholder/300/200',
      availableSlots: ['08:00', '09:30', '11:00', '13:00', '15:30'],
      features: ['تنظيف أسنان', 'فحص شامل', 'استشارة', 'تلميع']
    },
    {
      id: '3',
      name: 'جلسة مساج',
      description: 'جلسة مساج استرخائي لتخفيف التوتر',
      duration: 90,
      price: 300,
      category: 'wellness',
      provider: 'سبا الاسترخاء',
      rating: 4.7,
      reviewsCount: 234,
      image: '/api/placeholder/300/200',
      availableSlots: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      features: ['مساج كامل', 'زيوت طبيعية', 'موسيقى هادئة', 'أجواء مريحة']
    }
  ]);

  // Mock bookings data
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      bookingNumber: 'BK-2024-001',
      serviceId: '1',
      serviceName: 'قص شعر رجالي',
      serviceImage: '/api/placeholder/100/100',
      provider: 'صالون الأناقة',
      date: '2024-08-05',
      time: '10:00',
      duration: 45,
      price: 80,
      status: 'confirmed',
      location: 'شارع الملك فهد، الرياض',
      notes: 'يرجى الوصول قبل 10 دقائق من الموعد',
      createdAt: '2024-08-01T09:00:00',
      updatedAt: '2024-08-01T09:00:00'
    },
    {
      id: '2',
      bookingNumber: 'BK-2024-002',
      serviceId: '2',
      serviceName: 'تنظيف أسنان',
      serviceImage: '/api/placeholder/100/100',
      provider: 'عيادة الأسنان المتقدمة',
      date: '2024-08-07',
      time: '09:30',
      duration: 60,
      price: 200,
      status: 'pending',
      location: 'طريق الملك عبدالعزيز، الرياض',
      customerNotes: 'أعاني من حساسية الأسنان',
      createdAt: '2024-08-02T14:30:00',
      updatedAt: '2024-08-02T14:30:00'
    },
    {
      id: '3',
      bookingNumber: 'BK-2024-003',
      serviceId: '3',
      serviceName: 'جلسة مساج',
      serviceImage: '/api/placeholder/100/100',
      provider: 'سبا الاسترخاء',
      date: '2024-07-30',
      time: '14:00',
      duration: 90,
      price: 300,
      status: 'completed',
      location: 'حي العليا، الرياض',
      createdAt: '2024-07-28T11:00:00',
      updatedAt: '2024-07-30T15:30:00'
    }
  ]);

  // Mock reviews data
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      bookingId: '3',
      serviceName: 'جلسة مساج',
      provider: 'سبا الاسترخاء',
      rating: 5,
      comment: 'خدمة ممتازة وأجواء مريحة جداً. أنصح بشدة!',
      date: '2024-07-30',
      response: 'شكراً لك على التقييم الرائع. نتطلع لخدمتك مرة أخرى!'
    }
  ]);

  const categories = [
    { id: 'all', name: 'جميع الخدمات' },
    { id: 'salon', name: 'صالونات' },
    { id: 'medical', name: 'طبية' },
    { id: 'wellness', name: 'عافية' },
    { id: 'automotive', name: 'سيارات' },
    { id: 'home', name: 'منزلية' }
  ];

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'في الانتظار';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      case 'rescheduled': return 'تم إعادة الجدولة';
      default: return status;
    }
  };

  const getBookingStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'rescheduled': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'pending'
  );

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

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            لوحة تحكم الحجوزات
          </h1>
          <p className="text-gray-600 mt-2">مرحباً {customerInfo.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الحجوزات</p>
                <p className="text-2xl font-bold text-gray-900">{customerInfo.totalBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold text-green-600">{customerInfo.completedBookings}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قادمة</p>
                <p className="text-2xl font-bold text-blue-600">{customerInfo.upcomingBookings}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ملغية</p>
                <p className="text-2xl font-bold text-red-600">{customerInfo.cancelledBookings}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookings">حجوزاتي</TabsTrigger>
          <TabsTrigger value="services">الخدمات المتاحة</TabsTrigger>
          <TabsTrigger value="reviews">تقييماتي</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
        </TabsList>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>الحجوزات القادمة</CardTitle>
              <CardDescription>حجوزاتك المؤكدة والمعلقة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.serviceImage}
                          alt={booking.serviceName}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{booking.serviceName}</h3>
                          <p className="text-sm text-gray-600">{booking.provider}</p>
                        </div>
                      </div>
                      <Badge className={getBookingStatusColor(booking.status)}>
                        <div className="flex items-center gap-1">
                          {getBookingStatusIcon(booking.status)}
                          {getBookingStatusText(booking.status)}
                        </div>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {new Date(booking.date).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{booking.time} ({booking.duration} دقيقة)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{booking.location}</span>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-blue-800">
                          <strong>ملاحظات مقدم الخدمة:</strong> {booking.notes}
                        </p>
                      </div>
                    )}
                    
                    {booking.customerNotes && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-700">
                          <strong>ملاحظاتك:</strong> {booking.customerNotes}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        {booking.price.toLocaleString()} ريال
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          التفاصيل
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          تواصل
                        </Button>
                        {booking.status === 'confirmed' && (
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            إلغاء
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Bookings History */}
          <Card>
            <CardHeader>
              <CardTitle>سجل الحجوزات</CardTitle>
              <CardDescription>جميع حجوزاتك السابقة والحالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{booking.serviceName}</h3>
                        <p className="text-sm text-gray-600">
                          {booking.bookingNumber} | {booking.provider}
                        </p>
                      </div>
                      <Badge className={getBookingStatusColor(booking.status)}>
                        {getBookingStatusText(booking.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        {new Date(booking.date).toLocaleDateString('ar-SA')} في {booking.time}
                      </span>
                      <span className="font-bold text-blue-600">
                        {booking.price.toLocaleString()} ريال
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث عن الخدمات..."
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
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <p className="text-sm text-blue-600 font-medium">{service.provider}</p>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(service.rating)}
                    <span className="text-sm text-gray-600 mr-1">
                      ({service.reviewsCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{service.duration} دقيقة</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      {service.price.toLocaleString()} ريال
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">المواعيد المتاحة:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.availableSlots.slice(0, 3).map((slot) => (
                        <Badge key={slot} variant="secondary" className="text-xs">
                          {slot}
                        </Badge>
                      ))}
                      {service.availableSlots.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{service.availableSlots.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    احجز الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تقييماتي ومراجعاتي</CardTitle>
              <CardDescription>التقييمات التي قدمتها للخدمات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{review.serviceName}</h3>
                        <p className="text-sm text-gray-600">{review.provider}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-600 mr-1">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    
                    {review.response && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-blue-800">
                          <strong>رد مقدم الخدمة:</strong> {review.response}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{new Date(review.date).toLocaleDateString('ar-SA')}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تقويم الحجوزات</CardTitle>
              <CardDescription>عرض حجوزاتك على التقويم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day) => (
                  <div key={day} className="text-center font-medium p-2 bg-gray-100 rounded">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid - Simplified for demo */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i + 1;
                  const hasBooking = [5, 7, 15, 22].includes(day);
                  return (
                    <div
                      key={i}
                      className={`aspect-square p-2 border rounded text-center cursor-pointer hover:bg-gray-50 ${
                        hasBooking ? 'bg-blue-100 border-blue-300' : ''
                      }`}
                    >
                      <div className="text-sm">{day <= 31 ? day : ''}</div>
                      {hasBooking && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mt-1"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm">يوم به حجز</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm">يوم فارغ</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerBooking;

