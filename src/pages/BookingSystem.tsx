import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  DollarSign,
  TrendingUp,
  Timer,
  Star,
  MapPin,
  Bell,
  CreditCard,
  Mail,
  FileText,
  Zap
} from 'lucide-react';

const BookingSystem = () => {
  const [activeTab, setActiveTab] = useState('all-bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // بيانات تجريبية للحجوزات
  const bookings = [
    {
      id: 'BK-001',
      type: 'salon',
      service: 'قص شعر وتصفيف',
      customerName: 'سارة أحمد',
      customerPhone: '+966501234567',
      customerEmail: 'sara@example.com',
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      price: 80.00,
      status: 'confirmed',
      specialist: 'فاطمة المصففة',
      location: 'صالون الجمال الراقي',
      notes: 'قص قصير عصري',
      paymentMethod: 'card',
      paymentStatus: 'paid',
      reminderSent: true,
      createdAt: '2024-01-14 15:30'
    },
    {
      id: 'BK-002',
      type: 'yacht',
      service: 'رحلة يخت فاخر',
      customerName: 'أحمد محمد',
      customerPhone: '+966507654321',
      customerEmail: 'ahmed@example.com',
      date: '2024-01-20',
      time: '09:00',
      duration: 480,
      price: 5000.00,
      status: 'pending',
      yacht: 'الأمير الأزرق',
      guests: 15,
      location: 'مارينا جدة',
      notes: 'احتفال عيد ميلاد',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      reminderSent: false,
      createdAt: '2024-01-15 12:00'
    },
    {
      id: 'BK-003',
      type: 'restaurant',
      service: 'حجز طاولة',
      customerName: 'نورا علي',
      customerPhone: '+966509876543',
      customerEmail: 'nora@example.com',
      date: '2024-01-16',
      time: '19:00',
      duration: 120,
      price: 0.00,
      status: 'confirmed',
      tableNumber: 'T-05',
      guests: 4,
      location: 'مطعم الذواقة',
      notes: 'طاولة بجانب النافذة',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      reminderSent: true,
      createdAt: '2024-01-15 18:45'
    },
    {
      id: 'BK-004',
      type: 'vehicle',
      service: 'تأجير سيارة',
      customerName: 'محمد خالد',
      customerPhone: '+966508765432',
      customerEmail: 'mohammed@example.com',
      date: '2024-01-18',
      time: '08:00',
      duration: 1440,
      price: 200.00,
      status: 'confirmed',
      vehicle: 'تويوتا كامري 2023',
      location: 'فرع الرياض الرئيسي',
      notes: 'تأجير ليوم واحد',
      paymentMethod: 'card',
      paymentStatus: 'paid',
      reminderSent: true,
      createdAt: '2024-01-16 10:20'
    }
  ];

  const bookingStats = {
    totalBookings: 156,
    todayBookings: 23,
    confirmedBookings: 134,
    pendingBookings: 15,
    cancelledBookings: 7,
    revenueToday: 8750.00,
    revenueThisMonth: 125000.00,
    avgBookingValue: 285.50,
    noShowRate: 3.2
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'in-progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      case 'no-show': return 'لم يحضر';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case 'paid': return 'مدفوع';
      case 'pending': return 'في الانتظار';
      case 'failed': return 'فشل';
      case 'refunded': return 'مسترد';
      default: return status;
    }
  };

  const getServiceTypeText = (type) => {
    switch (type) {
      case 'salon': return 'صالون';
      case 'yacht': return 'يخت';
      case 'restaurant': return 'مطعم';
      case 'vehicle': return 'مركبة';
      default: return type;
    }
  };

  const getServiceTypeIcon = (type) => {
    switch (type) {
      case 'salon': return '💄';
      case 'yacht': return '🛥️';
      case 'restaurant': return '🍽️';
      case 'vehicle': return '🚗';
      default: return '📋';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.type === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const BookingCard = ({ booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>{getServiceTypeIcon(booking.type)}</span>
              {booking.customerName}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <span>{booking.id}</span>
              <span>•</span>
              <span>{getServiceTypeText(booking.type)}</span>
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={getStatusColor(booking.status)}>
              {getStatusText(booking.status)}
            </Badge>
            <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
              {getPaymentStatusText(booking.paymentStatus)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* معلومات الخدمة */}
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="font-medium">{booking.service}</h4>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="h-4 w-4" />
                <span>{booking.duration > 60 ? `${Math.floor(booking.duration / 60)}س ${booking.duration % 60}د` : `${booking.duration}د`}</span>
              </div>
            </div>
          </div>

          {/* معلومات الاتصال */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{booking.customerPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{booking.customerEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{booking.location}</span>
            </div>
          </div>

          {/* تفاصيل إضافية */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {booking.specialist && (
              <div>
                <span className="text-gray-600">الأخصائي:</span>
                <span className="font-medium ml-2">{booking.specialist}</span>
              </div>
            )}
            {booking.yacht && (
              <div>
                <span className="text-gray-600">اليخت:</span>
                <span className="font-medium ml-2">{booking.yacht}</span>
              </div>
            )}
            {booking.tableNumber && (
              <div>
                <span className="text-gray-600">الطاولة:</span>
                <span className="font-medium ml-2">{booking.tableNumber}</span>
              </div>
            )}
            {booking.vehicle && (
              <div>
                <span className="text-gray-600">المركبة:</span>
                <span className="font-medium ml-2">{booking.vehicle}</span>
              </div>
            )}
            {booking.guests && (
              <div>
                <span className="text-gray-600">الضيوف:</span>
                <span className="font-medium ml-2">{booking.guests}</span>
              </div>
            )}
            <div>
              <span className="text-gray-600">السعر:</span>
              <span className="font-medium ml-2 text-green-600">
                {booking.price > 0 ? `${booking.price.toFixed(2)} ر.س` : 'مجاني'}
              </span>
            </div>
          </div>

          {/* ملاحظات */}
          {booking.notes && (
            <div className="bg-yellow-50 p-2 rounded text-sm">
              <strong>ملاحظات:</strong> {booking.notes}
            </div>
          )}

          {/* معلومات الدفع */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <span>
                {booking.paymentMethod === 'card' ? 'بطاقة' :
                 booking.paymentMethod === 'cash' ? 'نقدي' :
                 booking.paymentMethod === 'bank_transfer' ? 'تحويل بنكي' : booking.paymentMethod}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Bell className={`h-4 w-4 ${booking.reminderSent ? 'text-green-500' : 'text-gray-400'}`} />
              <span>{booking.reminderSent ? 'تم التذكير' : 'لم يتم التذكير'}</span>
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
            {booking.status === 'pending' && (
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                تأكيد
              </Button>
            )}
            {!booking.reminderSent && (
              <Button size="sm" variant="outline">
                <Bell className="h-4 w-4 mr-1" />
                تذكير
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
          <h1 className="text-3xl font-bold">نظام الحجوزات</h1>
          <p className="text-gray-600">إدارة جميع الحجوزات عبر الخدمات المختلفة</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          حجز جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الحجوزات</p>
                <p className="text-2xl font-bold text-blue-600">{bookingStats.totalBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">حجوزات اليوم</p>
                <p className="text-2xl font-bold text-green-600">{bookingStats.todayBookings}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إيرادات الشهر</p>
                <p className="text-2xl font-bold text-purple-600">{bookingStats.revenueThisMonth.toFixed(0)} ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط قيمة الحجز</p>
                <p className="text-2xl font-bold text-orange-600">{bookingStats.avgBookingValue.toFixed(0)} ر.س</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-bookings">جميع الحجوزات</TabsTrigger>
          <TabsTrigger value="today">اليوم</TabsTrigger>
          <TabsTrigger value="pending">في الانتظار</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="all-bookings" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في الحجوزات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة الحجز" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">في الانتظار</SelectItem>
                    <SelectItem value="confirmed">مؤكد</SelectItem>
                    <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="نوع الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الخدمات</SelectItem>
                    <SelectItem value="salon">صالون</SelectItem>
                    <SelectItem value="yacht">يخت</SelectItem>
                    <SelectItem value="restaurant">مطعم</SelectItem>
                    <SelectItem value="vehicle">مركبة</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة جميع الحجوزات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          {/* حجوزات اليوم */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.filter(booking => booking.date === '2024-01-15').map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {/* الحجوزات في الانتظار */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.filter(booking => booking.status === 'pending').map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الحجوزات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي الحجوزات</span>
                    <span className="font-semibold">{bookingStats.totalBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مؤكدة</span>
                    <span className="font-semibold text-green-600">{bookingStats.confirmedBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>في الانتظار</span>
                    <span className="font-semibold text-yellow-600">{bookingStats.pendingBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ملغية</span>
                    <span className="font-semibold text-red-600">{bookingStats.cancelledBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل عدم الحضور</span>
                    <span className="font-semibold text-orange-600">{bookingStats.noShowRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الأداء المالي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إيرادات اليوم</span>
                    <span className="font-semibold text-green-600">{bookingStats.revenueToday.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>إيرادات الشهر</span>
                    <span className="font-semibold text-green-600">{bookingStats.revenueThisMonth.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط قيمة الحجز</span>
                    <span className="font-semibold">{bookingStats.avgBookingValue.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل النمو الشهري</span>
                    <span className="font-semibold text-blue-600">+15.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* توزيع الحجوزات حسب النوع */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>توزيع الحجوزات حسب نوع الخدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['salon', 'yacht', 'restaurant', 'vehicle'].map(type => {
                    const typeBookings = bookings.filter(booking => booking.type === type);
                    const typeRevenue = typeBookings.reduce((sum, booking) => sum + booking.price, 0);
                    
                    return (
                      <div key={type} className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-2xl mb-2">{getServiceTypeIcon(type)}</div>
                        <h4 className="font-medium">{getServiceTypeText(type)}</h4>
                        <p className="text-sm text-gray-600">{typeBookings.length} حجز</p>
                        <p className="text-sm font-semibold text-green-600">{typeRevenue.toFixed(0)} ر.س</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingSystem;

