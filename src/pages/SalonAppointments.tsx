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
  Bell
} from 'lucide-react';

const SalonAppointments = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // بيانات تجريبية للمواعيد
  const appointments = [
    {
      id: 'APT-001',
      customerName: 'سارة أحمد',
      customerPhone: '+966501234567',
      service: 'صبغة شعر نسائية',
      specialist: 'فاطمة المصففة',
      date: '2024-01-15',
      time: '10:00',
      duration: 120,
      price: 200.00,
      status: 'confirmed',
      notes: 'لون بني فاتح',
      createdAt: '2024-01-14 15:30',
      reminderSent: true
    },
    {
      id: 'APT-002',
      customerName: 'نورا محمد',
      customerPhone: '+966507654321',
      service: 'قص شعر وتصفيف',
      specialist: 'أحمد الحلاق',
      date: '2024-01-15',
      time: '11:30',
      duration: 60,
      price: 80.00,
      status: 'in-progress',
      notes: 'قص قصير عصري',
      createdAt: '2024-01-15 09:00',
      reminderSent: true
    },
    {
      id: 'APT-003',
      customerName: 'ليلى علي',
      customerPhone: '+966509876543',
      service: 'تنظيف بشرة عميق',
      specialist: 'سارة خبيرة التجميل',
      date: '2024-01-15',
      time: '14:00',
      duration: 60,
      price: 150.00,
      status: 'pending',
      notes: 'بشرة حساسة',
      createdAt: '2024-01-15 12:00',
      reminderSent: false
    },
    {
      id: 'APT-004',
      customerName: 'فاطمة خالد',
      customerPhone: '+966508765432',
      service: 'مانيكير وباديكير',
      specialist: 'نورا فنانة الأظافر',
      date: '2024-01-15',
      time: '16:00',
      duration: 45,
      price: 80.00,
      status: 'completed',
      notes: 'طلاء أحمر',
      createdAt: '2024-01-14 20:15',
      reminderSent: true,
      rating: 5,
      completedAt: '16:45'
    },
    {
      id: 'APT-005',
      customerName: 'مريم سالم',
      customerPhone: '+966505432109',
      service: 'مساج استرخاء',
      specialist: 'ليلى أخصائية المساج',
      date: '2024-01-16',
      time: '10:00',
      duration: 90,
      price: 250.00,
      status: 'confirmed',
      notes: 'مساج بالزيوت الطبيعية',
      createdAt: '2024-01-15 14:30',
      reminderSent: false
    }
  ];

  const appointmentStats = {
    todayAppointments: 8,
    confirmedToday: 6,
    completedToday: 3,
    revenueToday: 560.00,
    avgRating: 4.8,
    noShowRate: 5,
    busyHours: '14:00 - 18:00',
    availableSlots: 12
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'no-show': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const AppointmentCard = ({ appointment }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{appointment.customerName}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4" />
              <span>{appointment.time} - {appointment.date}</span>
            </CardDescription>
          </div>
          <Badge className={getStatusColor(appointment.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(appointment.status)}
              {getStatusText(appointment.status)}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* معلومات الخدمة */}
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="font-medium">{appointment.service}</h4>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{appointment.specialist}</span>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="h-4 w-4" />
                <span>{appointment.duration} دقيقة</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{appointment.price.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>

          {/* معلومات الاتصال */}
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{appointment.customerPhone}</span>
          </div>

          {/* ملاحظات */}
          {appointment.notes && (
            <div className="bg-yellow-50 p-2 rounded text-sm">
              <strong>ملاحظات:</strong> {appointment.notes}
            </div>
          )}

          {/* التقييم للمواعيد المكتملة */}
          {appointment.status === 'completed' && appointment.rating && (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">تقييم العميل: {appointment.rating}/5</span>
            </div>
          )}

          {/* حالة التذكير */}
          <div className="flex items-center gap-2">
            <Bell className={`h-4 w-4 ${appointment.reminderSent ? 'text-green-500' : 'text-gray-400'}`} />
            <span className="text-sm">
              {appointment.reminderSent ? 'تم إرسال التذكير' : 'لم يتم إرسال التذكير'}
            </span>
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
            {appointment.status === 'pending' && (
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                تأكيد
              </Button>
            )}
            {appointment.status === 'confirmed' && (
              <Button size="sm" className="flex-1">
                <Clock className="h-4 w-4 mr-1" />
                بدء الخدمة
              </Button>
            )}
            {appointment.status === 'in-progress' && (
              <Button size="sm" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                إنهاء
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TimeSlot = ({ time, isBooked, appointment }) => (
    <div className={`p-3 rounded border ${isBooked ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{time}</span>
        {isBooked ? (
          <div className="text-sm">
            <div className="font-medium">{appointment?.customerName}</div>
            <div className="text-gray-600">{appointment?.service}</div>
          </div>
        ) : (
          <Badge variant="outline" className="text-green-600">متاح</Badge>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مواعيد الصالون</h1>
          <p className="text-gray-600">إدارة وتنظيم مواعيد العملاء</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          حجز موعد جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مواعيد اليوم</p>
                <p className="text-2xl font-bold text-blue-600">{appointmentStats.todayAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مؤكدة</p>
                <p className="text-2xl font-bold text-green-600">{appointmentStats.confirmedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إيرادات اليوم</p>
                <p className="text-2xl font-bold text-purple-600">{appointmentStats.revenueToday.toFixed(0)} ر.س</p>
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
                <p className="text-2xl font-bold text-yellow-600">{appointmentStats.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">اليوم</TabsTrigger>
          <TabsTrigger value="upcoming">القادمة</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في المواعيد..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة الموعد" />
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
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة مواعيد اليوم */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAppointments.filter(apt => apt.date === '2024-01-15').map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {/* قائمة المواعيد القادمة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAppointments.filter(apt => apt.date > '2024-01-15').map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          {/* عرض التقويم */}
          <Card>
            <CardHeader>
              <CardTitle>جدول المواعيد - اليوم</CardTitle>
              <CardDescription>عرض الأوقات المتاحة والمحجوزة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => {
                  const bookedAppointment = appointments.find(apt => apt.time === time && apt.date === '2024-01-15');
                  return (
                    <TimeSlot 
                      key={time} 
                      time={time} 
                      isBooked={!!bookedAppointment} 
                      appointment={bookedAppointment}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المواعيد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>مواعيد اليوم</span>
                    <span className="font-semibold">{appointmentStats.todayAppointments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مؤكدة</span>
                    <span className="font-semibold text-green-600">{appointmentStats.confirmedToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مكتملة</span>
                    <span className="font-semibold text-blue-600">{appointmentStats.completedToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل عدم الحضور</span>
                    <span className="font-semibold text-red-600">{appointmentStats.noShowRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الأداء والإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إيرادات اليوم</span>
                    <span className="font-semibold text-green-600">{appointmentStats.revenueToday.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط التقييم</span>
                    <span className="font-semibold text-yellow-600">{appointmentStats.avgRating}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الساعات الأكثر ازدحاماً</span>
                    <span className="font-semibold">{appointmentStats.busyHours}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الأوقات المتاحة</span>
                    <span className="font-semibold text-blue-600">{appointmentStats.availableSlots}</span>
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

export default SalonAppointments;

