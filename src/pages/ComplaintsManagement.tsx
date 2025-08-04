import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  User,
  Calendar,
  Phone,
  Mail,
  FileText,
  Plus,
  Search,
  Filter,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  Timer
} from 'lucide-react';

interface Complaint {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  description: string;
  category: 'product' | 'service' | 'billing' | 'technical' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in_progress' | 'resolved' | 'closed' | 'escalated';
  assignedTo: string;
  createdDate: string;
  updatedDate: string;
  resolutionDate?: string;
  rating?: number;
  feedback?: string;
}

interface ComplaintResponse {
  id: string;
  complaintId: string;
  message: string;
  author: string;
  authorType: 'customer' | 'agent';
  timestamp: string;
  attachments?: string[];
}

const ComplaintsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  // Mock data for complaints
  const [complaints] = useState<Complaint[]>([
    {
      id: '1',
      ticketNumber: 'CMP-2024-001',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      subject: 'تأخير في التسليم',
      description: 'تم تأخير تسليم الطلب رقم ORD-2024-001 لأكثر من أسبوع دون إشعار مسبق',
      category: 'service',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'سارة أحمد',
      createdDate: '2024-08-01T10:00:00',
      updatedDate: '2024-08-04T14:30:00'
    },
    {
      id: '2',
      ticketNumber: 'CMP-2024-002',
      customerName: 'فاطمة علي',
      customerEmail: 'fatima@example.com',
      customerPhone: '+966509876543',
      subject: 'خطأ في الفاتورة',
      description: 'تم إصدار فاتورة بمبلغ خاطئ للطلب رقم ORD-2024-002',
      category: 'billing',
      priority: 'medium',
      status: 'resolved',
      assignedTo: 'محمد خالد',
      createdDate: '2024-08-02T09:15:00',
      updatedDate: '2024-08-03T16:45:00',
      resolutionDate: '2024-08-03T16:45:00',
      rating: 5,
      feedback: 'تم حل المشكلة بسرعة ومهنية عالية'
    },
    {
      id: '3',
      ticketNumber: 'CMP-2024-003',
      customerName: 'خالد السعد',
      customerEmail: 'khalid@example.com',
      customerPhone: '+966512345678',
      subject: 'عيب في المنتج',
      description: 'المنتج المستلم به عيب في التصنيع ولا يعمل بشكل صحيح',
      category: 'product',
      priority: 'urgent',
      status: 'escalated',
      assignedTo: 'نورا الأحمد',
      createdDate: '2024-08-03T11:30:00',
      updatedDate: '2024-08-04T10:15:00'
    },
    {
      id: '4',
      ticketNumber: 'CMP-2024-004',
      customerName: 'مريم الزهراني',
      customerEmail: 'mariam@example.com',
      customerPhone: '+966587654321',
      subject: 'مشكلة في تسجيل الدخول',
      description: 'لا أستطيع تسجيل الدخول إلى حسابي رغم إدخال البيانات الصحيحة',
      category: 'technical',
      priority: 'low',
      status: 'new',
      assignedTo: 'أحمد الشمري',
      createdDate: '2024-08-04T08:20:00',
      updatedDate: '2024-08-04T08:20:00'
    }
  ]);

  // Mock data for responses
  const [responses] = useState<ComplaintResponse[]>([
    {
      id: '1',
      complaintId: '1',
      message: 'شكراً لتواصلك معنا. نحن نتابع حالة طلبك مع قسم الشحن وسنعود إليك خلال 24 ساعة.',
      author: 'سارة أحمد',
      authorType: 'agent',
      timestamp: '2024-08-01T14:30:00'
    },
    {
      id: '2',
      complaintId: '2',
      message: 'تم مراجعة فاتورتك وتصحيح الخطأ. ستصلك الفاتورة المحدثة خلال ساعة.',
      author: 'محمد خالد',
      authorType: 'agent',
      timestamp: '2024-08-03T16:45:00'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديدة';
      case 'in_progress': return 'قيد المعالجة';
      case 'resolved': return 'تم الحل';
      case 'closed': return 'مغلقة';
      case 'escalated': return 'مصعدة';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return priority;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'product': return 'منتج';
      case 'service': return 'خدمة';
      case 'billing': return 'فوترة';
      case 'technical': return 'تقني';
      case 'other': return 'أخرى';
      default: return category;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || complaint.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || complaint.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  // Statistics
  const totalComplaints = complaints.length;
  const newComplaints = complaints.filter(c => c.status === 'new').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;
  const escalatedComplaints = complaints.filter(c => c.status === 'escalated').length;
  const avgRating = complaints
    .filter(c => c.rating)
    .reduce((sum, c) => sum + (c.rating || 0), 0) / complaints.filter(c => c.rating).length || 0;

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            إدارة الشكاوى
          </h1>
          <p className="text-gray-600 mt-2">إدارة ومتابعة شكاوى العملاء</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          شكوى جديدة
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الشكاوى</p>
                <p className="text-2xl font-bold text-gray-900">{totalComplaints}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">جديدة</p>
                <p className="text-2xl font-bold text-blue-600">{newComplaints}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المعالجة</p>
                <p className="text-2xl font-bold text-yellow-600">{inProgressComplaints}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تم الحل</p>
                <p className="text-2xl font-bold text-green-600">{resolvedComplaints}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold text-purple-600">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="complaints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="complaints">الشكاوى</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Complaints Tab */}
        <TabsContent value="complaints" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">البحث</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="البحث برقم التذكرة، اسم العميل، أو الموضوع..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">الحالة</Label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="new">جديدة</option>
                    <option value="in_progress">قيد المعالجة</option>
                    <option value="resolved">تم الحل</option>
                    <option value="closed">مغلقة</option>
                    <option value="escalated">مصعدة</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">جميع الفئات</option>
                    <option value="product">منتج</option>
                    <option value="service">خدمة</option>
                    <option value="billing">فوترة</option>
                    <option value="technical">تقني</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="priority">الأولوية</Label>
                  <select
                    id="priority"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">جميع الأولويات</option>
                    <option value="urgent">عاجل</option>
                    <option value="high">عالي</option>
                    <option value="medium">متوسط</option>
                    <option value="low">منخفض</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complaints List */}
          <div className="grid gap-6">
            {filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{complaint.subject}</CardTitle>
                        <CardDescription>
                          تذكرة رقم: {complaint.ticketNumber} | العميل: {complaint.customerName}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {getPriorityText(complaint.priority)}
                      </Badge>
                      <Badge className={getStatusColor(complaint.status)}>
                        {getStatusText(complaint.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-gray-700">{complaint.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">العميل</p>
                        <p className="font-medium text-sm">{complaint.customerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                        <p className="font-medium text-sm">{complaint.customerEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">تاريخ الإنشاء</p>
                        <p className="font-medium text-sm">
                          {new Date(complaint.createdDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">مُسند إلى</p>
                        <p className="font-medium text-sm">{complaint.assignedTo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Rating and Feedback for resolved complaints */}
                  {complaint.status === 'resolved' && complaint.rating && (
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">تقييم العميل: {complaint.rating}/5</span>
                      </div>
                      {complaint.feedback && (
                        <p className="text-sm text-gray-700">{complaint.feedback}</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm">
                      إضافة رد
                    </Button>
                    {complaint.status === 'new' && (
                      <Button size="sm">
                        بدء المعالجة
                      </Button>
                    )}
                    {complaint.status === 'in_progress' && (
                      <Button size="sm">
                        وضع علامة كمحلولة
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  توزيع الشكاوى حسب الفئة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>منتج</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm">1</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>خدمة</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm">1</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>فوترة</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm">1</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>تقني</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm">1</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  معدل الحل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">75%</div>
                    <p className="text-sm text-gray-600">معدل الحل الإجمالي</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>متوسط وقت الحل</span>
                      <span className="font-medium">2.5 يوم</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>متوسط وقت الاستجابة</span>
                      <span className="font-medium">4 ساعات</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>رضا العملاء</span>
                      <span className="font-medium">4.5/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                أداء الفريق
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">سارة أحمد</span>
                      <Badge variant="secondary">نشط</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>الشكاوى المُسندة:</span>
                        <span>5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تم الحل:</span>
                        <span>3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>متوسط التقييم:</span>
                        <span>4.8/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">محمد خالد</span>
                      <Badge variant="secondary">نشط</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>الشكاوى المُسندة:</span>
                        <span>4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تم الحل:</span>
                        <span>4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>متوسط التقييم:</span>
                        <span>5.0/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">نورا الأحمد</span>
                      <Badge variant="secondary">نشط</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>الشكاوى المُسندة:</span>
                        <span>3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تم الحل:</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>متوسط التقييم:</span>
                        <span>4.5/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقرير الأداء الشهري</CardTitle>
                <CardDescription>إحصائيات شهر أغسطس 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>إجمالي الشكاوى الواردة:</span>
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تم حلها:</span>
                    <span className="font-bold text-green-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيد المعالجة:</span>
                    <span className="font-bold text-yellow-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مصعدة:</span>
                    <span className="font-bold text-red-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط وقت الحل:</span>
                    <span className="font-bold">1 يوم</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تقرير رضا العملاء</CardTitle>
                <CardDescription>تقييمات العملاء للشكاوى المحلولة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>متوسط التقييم:</span>
                    <span className="font-bold">5.0/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5 نجوم:</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4 نجوم:</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3 نجوم:</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نسبة الرضا:</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>تكوين إشعارات الشكاوى</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعار الشكاوى الجديدة</p>
                    <p className="text-sm text-gray-600">إرسال إشعار عند وصول شكوى جديدة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعار الشكاوى العاجلة</p>
                    <p className="text-sm text-gray-600">إشعار فوري للشكاوى العاجلة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">تذكير المتابعة</p>
                    <p className="text-sm text-gray-600">تذكير بالشكاوى التي تحتاج متابعة</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات التصعيد</CardTitle>
                <CardDescription>قواعد تصعيد الشكاوى</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="escalation-time">وقت التصعيد (ساعات)</Label>
                  <Input id="escalation-time" type="number" defaultValue="24" />
                </div>
                <div>
                  <Label htmlFor="urgent-escalation">تصعيد الشكاوى العاجلة (ساعات)</Label>
                  <Input id="urgent-escalation" type="number" defaultValue="2" />
                </div>
                <div>
                  <Label htmlFor="escalation-manager">مدير التصعيد</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>أحمد المدير</option>
                    <option>فاطمة الإشراف</option>
                    <option>محمد القسم</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplaintsManagement;

