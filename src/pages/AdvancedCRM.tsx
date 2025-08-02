import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare,
  Target,
  TrendingUp,
  Star,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Heart,
  ThumbsUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const AdvancedCRM = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية للعملاء
  const customers = [
    {
      id: 1,
      name: 'شركة الأمل للتجارة',
      contact: 'أحمد السعد',
      email: 'ahmed@amal.com',
      phone: '+966501234567',
      segment: 'عميل مميز',
      value: 450000,
      lastContact: '2024-08-01',
      status: 'نشط',
      satisfaction: 4.8,
      deals: 12,
      source: 'موقع إلكتروني'
    },
    {
      id: 2,
      name: 'مؤسسة النور',
      contact: 'سارة محمد',
      email: 'sara@noor.com',
      phone: '+966507654321',
      segment: 'عميل عادي',
      value: 280000,
      lastContact: '2024-07-28',
      status: 'نشط',
      satisfaction: 4.2,
      deals: 8,
      source: 'إحالة'
    },
    {
      id: 3,
      name: 'شركة الفجر',
      contact: 'محمد علي',
      email: 'mohammed@fajr.com',
      phone: '+966509876543',
      segment: 'عميل جديد',
      value: 120000,
      lastContact: '2024-08-03',
      status: 'محتمل',
      satisfaction: 3.9,
      deals: 3,
      source: 'معرض تجاري'
    }
  ];

  // بيانات الأنشطة والتفاعلات
  const activities = [
    {
      id: 1,
      type: 'مكالمة',
      customer: 'شركة الأمل للتجارة',
      description: 'مناقشة متطلبات المشروع الجديد',
      date: '2024-08-05',
      time: '10:30',
      duration: '45 دقيقة',
      outcome: 'إيجابي',
      assignedTo: 'أحمد محمد'
    },
    {
      id: 2,
      type: 'بريد إلكتروني',
      customer: 'مؤسسة النور',
      description: 'إرسال عرض سعر محدث',
      date: '2024-08-05',
      time: '14:15',
      duration: '-',
      outcome: 'في الانتظار',
      assignedTo: 'سارة أحمد'
    },
    {
      id: 3,
      type: 'اجتماع',
      customer: 'شركة الفجر',
      description: 'عرض تقديمي للمنتجات',
      date: '2024-08-04',
      time: '11:00',
      duration: '90 دقيقة',
      outcome: 'إيجابي',
      assignedTo: 'محمد علي'
    }
  ];

  // بيانات الحملات التسويقية
  const campaigns = [
    {
      id: 1,
      name: 'حملة العروض الصيفية',
      type: 'بريد إلكتروني',
      status: 'نشطة',
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      budget: 25000,
      spent: 18500,
      leads: 145,
      conversions: 23,
      roi: 185
    },
    {
      id: 2,
      name: 'حملة العملاء الجدد',
      type: 'وسائل التواصل',
      status: 'مكتملة',
      startDate: '2024-06-01',
      endDate: '2024-07-31',
      budget: 35000,
      spent: 32000,
      leads: 220,
      conversions: 45,
      roi: 220
    },
    {
      id: 3,
      name: 'حملة إعادة التفعيل',
      type: 'مختلط',
      status: 'مجدولة',
      startDate: '2024-09-01',
      endDate: '2024-10-31',
      budget: 40000,
      spent: 0,
      leads: 0,
      conversions: 0,
      roi: 0
    }
  ];

  // بيانات خدمة العملاء
  const supportTickets = [
    {
      id: 1,
      ticketNumber: 'TK-2024-001',
      customer: 'شركة الأمل للتجارة',
      subject: 'مشكلة في النظام',
      priority: 'عالية',
      status: 'مفتوح',
      assignedTo: 'فريق الدعم التقني',
      createdDate: '2024-08-05',
      lastUpdate: '2024-08-05'
    },
    {
      id: 2,
      ticketNumber: 'TK-2024-002',
      customer: 'مؤسسة النور',
      subject: 'طلب تدريب',
      priority: 'متوسطة',
      status: 'قيد المعالجة',
      assignedTo: 'فريق التدريب',
      createdDate: '2024-08-04',
      lastUpdate: '2024-08-05'
    },
    {
      id: 3,
      ticketNumber: 'TK-2024-003',
      customer: 'شركة الفجر',
      subject: 'استفسار عن الفاتورة',
      priority: 'منخفضة',
      status: 'مغلق',
      assignedTo: 'فريق المحاسبة',
      createdDate: '2024-08-03',
      lastUpdate: '2024-08-04'
    }
  ];

  // بيانات تحليل العملاء
  const customerAnalytics = [
    { month: 'يناير', newCustomers: 12, activeCustomers: 85, churnRate: 2.1 },
    { month: 'فبراير', newCustomers: 15, activeCustomers: 92, churnRate: 1.8 },
    { month: 'مارس', newCustomers: 18, activeCustomers: 98, churnRate: 1.5 },
    { month: 'أبريل', newCustomers: 14, activeCustomers: 105, churnRate: 2.3 },
    { month: 'مايو', newCustomers: 20, activeCustomers: 115, churnRate: 1.9 },
    { month: 'يونيو', newCustomers: 22, activeCustomers: 125, churnRate: 1.6 }
  ];

  // بيانات رضا العملاء
  const satisfactionData = [
    { rating: '5 نجوم', count: 45, percentage: 60 },
    { rating: '4 نجوم', count: 20, percentage: 27 },
    { rating: '3 نجوم', count: 8, percentage: 11 },
    { rating: '2 نجوم', count: 2, percentage: 2 },
    { rating: '1 نجمة', count: 0, percentage: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'محتمل': return 'bg-yellow-100 text-yellow-800';
      case 'غير نشط': return 'bg-gray-100 text-gray-800';
      case 'نشطة': return 'bg-green-100 text-green-800';
      case 'مكتملة': return 'bg-blue-100 text-blue-800';
      case 'مجدولة': return 'bg-purple-100 text-purple-800';
      case 'مفتوح': return 'bg-red-100 text-red-800';
      case 'قيد المعالجة': return 'bg-yellow-100 text-yellow-800';
      case 'مغلق': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'bg-red-100 text-red-800';
      case 'متوسطة': return 'bg-yellow-100 text-yellow-800';
      case 'منخفضة': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'عميل مميز': return 'bg-purple-100 text-purple-800';
      case 'عميل عادي': return 'bg-blue-100 text-blue-800';
      case 'عميل جديد': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">نظام إدارة علاقات العملاء CRM</h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لعلاقات العملاء والأنشطة التسويقية</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <UserPlus className="w-4 h-4 ml-2" />
            عميل جديد
          </Button>
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 ml-2" />
            حملة جديدة
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير البيانات
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                <p className="text-2xl font-bold text-gray-900">125</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +8 عملاء جدد هذا الشهر
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل رضا العملاء</p>
                <p className="text-2xl font-bold text-gray-900">4.6</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Star className="w-3 h-3 ml-1" />
                  من أصل 5 نجوم
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الحملات النشطة</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Target className="w-3 h-3 ml-1" />
                  معدل تحويل 18.5%
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تذاكر الدعم</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <AlertCircle className="w-3 h-3 ml-1" />
                  3 تذاكر مفتوحة
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="customers">العملاء</TabsTrigger>
          <TabsTrigger value="activities">الأنشطة</TabsTrigger>
          <TabsTrigger value="campaigns">الحملات</TabsTrigger>
          <TabsTrigger value="support">خدمة العملاء</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>نمو قاعدة العملاء</CardTitle>
                <CardDescription>تطور عدد العملاء الجدد والنشطين</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newCustomers" fill="#10b981" name="عملاء جدد" />
                    <Bar dataKey="activeCustomers" fill="#3b82f6" name="عملاء نشطون" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع رضا العملاء</CardTitle>
                <CardDescription>تقييمات العملاء حسب عدد النجوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {satisfactionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < parseInt(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{item.count}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* الأنشطة الحديثة */}
          <Card>
            <CardHeader>
              <CardTitle>الأنشطة الحديثة</CardTitle>
              <CardDescription>آخر التفاعلات مع العملاء</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {activity.type === 'مكالمة' && <Phone className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'بريد إلكتروني' && <Mail className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'اجتماع' && <Calendar className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.customer}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.date} - {activity.time}</p>
                    </div>
                    <div className="text-left">
                      <Badge className={activity.outcome === 'إيجابي' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {activity.outcome}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{activity.assignedTo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* العملاء */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة العملاء</CardTitle>
                  <CardDescription>قاعدة بيانات شاملة للعملاء</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <UserPlus className="w-4 h-4 ml-2" />
                    عميل جديد
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input placeholder="البحث في العملاء..." className="w-full" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 ml-2" />
                  فلترة
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم الشركة</th>
                      <th className="text-right p-3 font-medium">جهة الاتصال</th>
                      <th className="text-right p-3 font-medium">الفئة</th>
                      <th className="text-right p-3 font-medium">القيمة الإجمالية</th>
                      <th className="text-right p-3 font-medium">آخر تواصل</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">التقييم</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{customer.name}</td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{customer.contact}</p>
                            <p className="text-sm text-gray-600">{customer.phone}</p>
                            <p className="text-sm text-gray-600">{customer.email}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getSegmentColor(customer.segment)}>
                            {customer.segment}
                          </Badge>
                        </td>
                        <td className="p-3 font-mono">{customer.value.toLocaleString()} ر.س</td>
                        <td className="p-3">{customer.lastContact}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{customer.satisfaction}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
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

        {/* الأنشطة */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>سجل الأنشطة</CardTitle>
                  <CardDescription>جميع التفاعلات مع العملاء</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    نشاط جديد
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 ml-2" />
                    جدولة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">مكالمات اليوم</p>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">رسائل بريد إلكتروني</p>
                      <p className="text-2xl font-bold text-green-600">15</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">اجتماعات مجدولة</p>
                      <p className="text-2xl font-bold text-purple-600">5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متابعات مطلوبة</p>
                      <p className="text-2xl font-bold text-yellow-600">12</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {activity.type === 'مكالمة' && <Phone className="h-6 w-6 text-blue-600" />}
                          {activity.type === 'بريد إلكتروني' && <Mail className="h-6 w-6 text-blue-600" />}
                          {activity.type === 'اجتماع' && <Calendar className="h-6 w-6 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{activity.type} مع {activity.customer}</h3>
                              <p className="text-gray-600 mt-1">{activity.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span>{activity.date} - {activity.time}</span>
                                {activity.duration !== '-' && <span>المدة: {activity.duration}</span>}
                                <span>المسؤول: {activity.assignedTo}</span>
                              </div>
                            </div>
                            <Badge className={activity.outcome === 'إيجابي' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {activity.outcome}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الحملات */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>الحملات التسويقية</CardTitle>
                  <CardDescription>إدارة ومتابعة الحملات التسويقية</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  حملة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">اسم الحملة</th>
                      <th className="text-right p-3 font-medium">النوع</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">الفترة</th>
                      <th className="text-right p-3 font-medium">الميزانية</th>
                      <th className="text-right p-3 font-medium">العملاء المحتملون</th>
                      <th className="text-right p-3 font-medium">التحويلات</th>
                      <th className="text-right p-3 font-medium">عائد الاستثمار</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{campaign.name}</td>
                        <td className="p-3">{campaign.type}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <div>
                            <p>من: {campaign.startDate}</p>
                            <p>إلى: {campaign.endDate}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p className="font-medium">{campaign.budget.toLocaleString()} ر.س</p>
                            <p className="text-gray-600">مُنفق: {campaign.spent.toLocaleString()} ر.س</p>
                          </div>
                        </td>
                        <td className="p-3 font-mono">{campaign.leads}</td>
                        <td className="p-3 font-mono">{campaign.conversions}</td>
                        <td className="p-3">
                          <span className={`font-medium ${campaign.roi > 150 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {campaign.roi}%
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="w-4 h-4" />
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

        {/* خدمة العملاء */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>تذاكر خدمة العملاء</CardTitle>
                  <CardDescription>إدارة طلبات ومشاكل العملاء</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  تذكرة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">تذاكر مفتوحة</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">قيد المعالجة</p>
                      <p className="text-2xl font-bold text-yellow-600">5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">مغلقة</p>
                      <p className="text-2xl font-bold text-green-600">18</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">متوسط وقت الحل</p>
                      <p className="text-2xl font-bold text-blue-600">4.2 ساعة</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">رقم التذكرة</th>
                      <th className="text-right p-3 font-medium">العميل</th>
                      <th className="text-right p-3 font-medium">الموضوع</th>
                      <th className="text-right p-3 font-medium">الأولوية</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">المسؤول</th>
                      <th className="text-right p-3 font-medium">تاريخ الإنشاء</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono">{ticket.ticketNumber}</td>
                        <td className="p-3 font-medium">{ticket.customer}</td>
                        <td className="p-3">{ticket.subject}</td>
                        <td className="p-3">
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="p-3">{ticket.assignedTo}</td>
                        <td className="p-3">{ticket.createdDate}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
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

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>معدل الاحتفاظ بالعملاء</CardTitle>
                <CardDescription>تطور معدل الاحتفاظ ومعدل الفقدان</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={customerAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="churnRate" stroke="#ef4444" name="معدل الفقدان %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الحملات التسويقية</CardTitle>
                <CardDescription>مقارنة عائد الاستثمار للحملات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.filter(c => c.roi > 0).map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{campaign.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">عملاء محتملون: {campaign.leads}</span>
                          <span className="text-sm text-gray-600">تحويلات: {campaign.conversions}</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className={`text-lg font-bold ${campaign.roi > 200 ? 'text-green-600' : 'text-blue-600'}`}>
                          {campaign.roi}%
                        </p>
                        <p className="text-xs text-gray-500">عائد الاستثمار</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>ملخص شامل لأداء نظام CRM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">87%</p>
                  <p className="text-sm text-gray-600">معدل الاحتفاظ بالعملاء</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">18.5%</p>
                  <p className="text-sm text-gray-600">معدل تحويل العملاء المحتملين</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">4.2 ساعة</p>
                  <p className="text-sm text-gray-600">متوسط وقت الاستجابة</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">195%</p>
                  <p className="text-sm text-gray-600">متوسط عائد الاستثمار</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedCRM;

