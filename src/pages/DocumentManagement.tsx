import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Share2,
  Lock,
  Unlock,
  Clock,
  User,
  Folder,
  FolderOpen,
  Plus,
  Archive,
  Star,
  Tag,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  History,
  Copy,
  Move,
  Paperclip,
  Image,
  Video,
  Music,
  File,
  Database,
  Shield,
  Users,
  Globe,
  Link
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات تجريبية للوثائق
  const documents = [
    {
      id: 1,
      name: 'عقد توريد قطع غيار 2024',
      type: 'PDF',
      size: '2.5 MB',
      category: 'عقود',
      tags: ['توريد', 'قطع غيار', '2024'],
      createdBy: 'أحمد محمد',
      createdDate: '2024-08-01',
      modifiedDate: '2024-08-05',
      status: 'نشط',
      version: '1.2',
      accessLevel: 'محدود',
      downloads: 15,
      views: 45,
      description: 'عقد توريد قطع غيار المحركات للعام 2024'
    },
    {
      id: 2,
      name: 'تقرير الجودة الشهري - يوليو',
      type: 'DOCX',
      size: '1.8 MB',
      category: 'تقارير',
      tags: ['جودة', 'شهري', 'يوليو'],
      createdBy: 'سارة أحمد',
      createdDate: '2024-07-31',
      modifiedDate: '2024-08-01',
      status: 'مراجعة',
      version: '2.0',
      accessLevel: 'عام',
      downloads: 8,
      views: 23,
      description: 'تقرير شامل عن أداء الجودة لشهر يوليو'
    },
    {
      id: 3,
      name: 'دليل إجراءات السلامة',
      type: 'PDF',
      size: '5.2 MB',
      category: 'إجراءات',
      tags: ['سلامة', 'إجراءات', 'دليل'],
      createdBy: 'محمد علي',
      createdDate: '2024-06-15',
      modifiedDate: '2024-07-20',
      status: 'معتمد',
      version: '3.1',
      accessLevel: 'عام',
      downloads: 32,
      views: 89,
      description: 'دليل شامل لإجراءات السلامة في المصنع'
    },
    {
      id: 4,
      name: 'مخططات المنتج الجديد',
      type: 'DWG',
      size: '12.8 MB',
      category: 'مخططات',
      tags: ['مخططات', 'منتج جديد', 'تصميم'],
      createdBy: 'فاطمة حسن',
      createdDate: '2024-08-03',
      modifiedDate: '2024-08-05',
      status: 'مسودة',
      version: '1.0',
      accessLevel: 'سري',
      downloads: 3,
      views: 12,
      description: 'مخططات تقنية للمنتج الجديد قيد التطوير'
    }
  ];

  // بيانات المجلدات
  const folders = [
    {
      id: 1,
      name: 'العقود والاتفاقيات',
      documentsCount: 25,
      subFolders: 3,
      createdDate: '2024-01-15',
      accessLevel: 'محدود',
      description: 'جميع العقود والاتفاقيات التجارية'
    },
    {
      id: 2,
      name: 'التقارير المالية',
      documentsCount: 48,
      subFolders: 5,
      createdDate: '2024-01-10',
      accessLevel: 'محدود',
      description: 'التقارير المالية الشهرية والسنوية'
    },
    {
      id: 3,
      name: 'إجراءات الجودة',
      documentsCount: 15,
      subFolders: 2,
      createdDate: '2024-02-01',
      accessLevel: 'عام',
      description: 'وثائق وإجراءات ضمان الجودة'
    },
    {
      id: 4,
      name: 'الموارد البشرية',
      documentsCount: 67,
      subFolders: 8,
      createdDate: '2024-01-05',
      accessLevel: 'سري',
      description: 'ملفات الموظفين والسياسات'
    }
  ];

  // بيانات سير العمل
  const workflows = [
    {
      id: 1,
      name: 'مراجعة واعتماد العقود',
      description: 'سير عمل لمراجعة واعتماد العقود الجديدة',
      steps: [
        { step: 1, name: 'إنشاء العقد', assignee: 'قسم المشتريات', status: 'مكتمل' },
        { step: 2, name: 'مراجعة قانونية', assignee: 'القسم القانوني', status: 'قيد التنفيذ' },
        { step: 3, name: 'مراجعة مالية', assignee: 'القسم المالي', status: 'معلق' },
        { step: 4, name: 'اعتماد نهائي', assignee: 'الإدارة العليا', status: 'معلق' }
      ],
      currentStep: 2,
      progress: 50,
      dueDate: '2024-08-15',
      priority: 'عالية'
    },
    {
      id: 2,
      name: 'إعداد التقارير الشهرية',
      description: 'سير عمل لإعداد ومراجعة التقارير الشهرية',
      steps: [
        { step: 1, name: 'جمع البيانات', assignee: 'فريق التحليل', status: 'مكتمل' },
        { step: 2, name: 'إعداد التقرير', assignee: 'محلل البيانات', status: 'مكتمل' },
        { step: 3, name: 'مراجعة المحتوى', assignee: 'مدير القسم', status: 'قيد التنفيذ' },
        { step: 4, name: 'نشر التقرير', assignee: 'إدارة المعلومات', status: 'معلق' }
      ],
      currentStep: 3,
      progress: 75,
      dueDate: '2024-08-10',
      priority: 'متوسطة'
    }
  ];

  // بيانات التكاملات
  const integrations = [
    {
      id: 1,
      name: 'Microsoft Office 365',
      type: 'مجموعة مكتبية',
      status: 'متصل',
      lastSync: '2024-08-05 14:30',
      description: 'تكامل مع Word, Excel, PowerPoint',
      features: ['تحرير مباشر', 'مزامنة تلقائية', 'مشاركة الملفات']
    },
    {
      id: 2,
      name: 'Google Drive',
      type: 'تخزين سحابي',
      status: 'متصل',
      lastSync: '2024-08-05 15:45',
      description: 'نسخ احتياطي وتخزين سحابي',
      features: ['نسخ احتياطي تلقائي', 'مزامنة الملفات', 'مشاركة خارجية']
    },
    {
      id: 3,
      name: 'DocuSign',
      type: 'توقيع إلكتروني',
      status: 'متصل',
      lastSync: '2024-08-05 12:15',
      description: 'توقيع الوثائق إلكترونياً',
      features: ['توقيع آمن', 'تتبع الحالة', 'أرشفة تلقائية']
    },
    {
      id: 4,
      name: 'SharePoint',
      type: 'إدارة محتوى',
      status: 'غير متصل',
      lastSync: '2024-08-03 09:20',
      description: 'إدارة المحتوى والتعاون',
      features: ['إدارة الإصدارات', 'التعاون الجماعي', 'البحث المتقدم']
    }
  ];

  // بيانات تحليل الاستخدام
  const usageAnalytics = [
    { month: 'يناير', uploads: 45, downloads: 120, views: 350 },
    { month: 'فبراير', uploads: 52, downloads: 135, views: 420 },
    { month: 'مارس', uploads: 48, downloads: 142, views: 380 },
    { month: 'أبريل', uploads: 61, downloads: 158, views: 450 },
    { month: 'مايو', uploads: 55, downloads: 165, views: 480 },
    { month: 'يونيو', uploads: 68, downloads: 178, views: 520 }
  ];

  // بيانات توزيع أنواع الملفات
  const fileTypeDistribution = [
    { type: 'PDF', count: 125, percentage: 45 },
    { type: 'DOCX', count: 85, percentage: 30 },
    { type: 'XLSX', count: 42, percentage: 15 },
    { type: 'أخرى', count: 28, percentage: 10 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'مراجعة': return 'bg-yellow-100 text-yellow-800';
      case 'معتمد': return 'bg-blue-100 text-blue-800';
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      case 'مؤرشف': return 'bg-purple-100 text-purple-800';
      case 'متصل': return 'bg-green-100 text-green-800';
      case 'غير متصل': return 'bg-red-100 text-red-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'عام': return 'bg-green-100 text-green-800';
      case 'محدود': return 'bg-yellow-100 text-yellow-800';
      case 'سري': return 'bg-red-100 text-red-800';
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

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-600" />;
      case 'docx': case 'doc': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'xlsx': case 'xls': return <Database className="h-5 w-5 text-green-600" />;
      case 'jpg': case 'png': case 'gif': return <Image className="h-5 w-5 text-purple-600" />;
      case 'mp4': case 'avi': return <Video className="h-5 w-5 text-orange-600" />;
      case 'mp3': case 'wav': return <Music className="h-5 w-5 text-pink-600" />;
      default: return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الوثائق</h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة وتنظيم الوثائق والملفات</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Upload className="w-4 h-4 ml-2" />
            رفع ملف
          </Button>
          <Button variant="outline">
            <Folder className="w-4 h-4 ml-2" />
            مجلد جديد
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 ml-2" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الوثائق</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <FileText className="w-3 h-3 ml-1" />
                  +23 هذا الأسبوع
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المساحة المستخدمة</p>
                <p className="text-2xl font-bold text-gray-900">2.8 GB</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Database className="w-3 h-3 ml-1" />
                  من أصل 10 GB
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Database className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التحميلات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Download className="w-3 h-3 ml-1" />
                  +12% من أمس
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">سير العمل النشط</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Clock className="w-3 h-3 ml-1" />
                  3 معلقة
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
          <TabsTrigger value="folders">المجلدات</TabsTrigger>
          <TabsTrigger value="workflows">سير العمل</TabsTrigger>
          <TabsTrigger value="integrations">التكاملات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>نشاط الوثائق الشهري</CardTitle>
                <CardDescription>الرفع والتحميل والمشاهدات</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uploads" fill="#3b82f6" name="رفع" />
                    <Bar dataKey="downloads" fill="#10b981" name="تحميل" />
                    <Bar dataKey="views" fill="#f59e0b" name="مشاهدة" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع أنواع الملفات</CardTitle>
                <CardDescription>الأنواع الأكثر استخداماً</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fileTypeDistribution.map((fileType, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{fileType.type}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${fileType.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-left ml-4">
                        <p className="font-bold text-blue-600">{fileType.count}</p>
                        <p className="text-sm text-gray-600">{fileType.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* الوثائق الحديثة */}
          <Card>
            <CardHeader>
              <CardTitle>الوثائق المضافة حديثاً</CardTitle>
              <CardDescription>آخر الوثائق المرفوعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.slice(0, 3).map((document) => (
                  <div key={document.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getFileIcon(document.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{document.name}</h3>
                          <p className="text-gray-600">{document.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>بواسطة: {document.createdBy}</span>
                            <span>الحجم: {document.size}</span>
                            <span>الإصدار: {document.version}</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
                          <Badge className={getAccessLevelColor(document.accessLevel)} variant="outline">
                            {document.accessLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الوثائق */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة الوثائق</CardTitle>
                  <CardDescription>جميع الوثائق والملفات</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Upload className="w-4 h-4 ml-2" />
                    رفع ملف
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
                  <Input placeholder="البحث في الوثائق..." className="w-full" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 ml-2" />
                  فلترة
                </Button>
                <Button variant="outline">
                  <Tag className="w-4 h-4 ml-2" />
                  العلامات
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3 font-medium">الاسم</th>
                      <th className="text-right p-3 font-medium">النوع</th>
                      <th className="text-right p-3 font-medium">الحجم</th>
                      <th className="text-right p-3 font-medium">الفئة</th>
                      <th className="text-right p-3 font-medium">المنشئ</th>
                      <th className="text-right p-3 font-medium">تاريخ الإنشاء</th>
                      <th className="text-right p-3 font-medium">الحالة</th>
                      <th className="text-right p-3 font-medium">مستوى الوصول</th>
                      <th className="text-right p-3 font-medium">المشاهدات</th>
                      <th className="text-right p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((document) => (
                      <tr key={document.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getFileIcon(document.type)}
                            <span className="font-medium">{document.name}</span>
                          </div>
                        </td>
                        <td className="p-3">{document.type}</td>
                        <td className="p-3">{document.size}</td>
                        <td className="p-3">{document.category}</td>
                        <td className="p-3">{document.createdBy}</td>
                        <td className="p-3">{document.createdDate}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getAccessLevelColor(document.accessLevel)} variant="outline">
                            {document.accessLevel}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">{document.views}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="w-4 h-4" />
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

        {/* المجلدات */}
        <TabsContent value="folders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إدارة المجلدات</CardTitle>
                  <CardDescription>تنظيم الوثائق في مجلدات</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  مجلد جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {folders.map((folder) => (
                  <Card key={folder.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Folder className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{folder.name}</h3>
                            <p className="text-sm text-gray-600">{folder.description}</p>
                          </div>
                        </div>
                        <Badge className={getAccessLevelColor(folder.accessLevel)} variant="outline">
                          {folder.accessLevel}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">الوثائق:</span>
                          <span className="font-medium">{folder.documentsCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">المجلدات الفرعية:</span>
                          <span className="font-medium">{folder.subFolders}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">تاريخ الإنشاء:</span>
                          <span className="font-medium">{folder.createdDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <FolderOpen className="w-4 h-4 ml-2" />
                          فتح
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* سير العمل */}
        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>سير العمل</CardTitle>
                  <CardDescription>إدارة مسارات اعتماد الوثائق</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  سير عمل جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workflows.map((workflow) => (
                  <Card key={workflow.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{workflow.name}</CardTitle>
                          <CardDescription>{workflow.description}</CardDescription>
                        </div>
                        <div className="text-left">
                          <Badge className={getPriorityColor(workflow.priority)}>
                            {workflow.priority}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            موعد الانتهاء: {workflow.dueDate}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>التقدم</span>
                          <span>{workflow.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${workflow.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {workflow.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              step.status === 'مكتمل' ? 'bg-green-100 text-green-600' :
                              step.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{step.name}</h4>
                              <p className="text-sm text-gray-600">المسؤول: {step.assignee}</p>
                            </div>
                            <Badge className={getStatusColor(step.status)}>
                              {step.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 ml-2" />
                          تعديل
                        </Button>
                        <Button size="sm" variant="outline">
                          <History className="w-4 h-4 ml-2" />
                          السجل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التكاملات */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>التكاملات الخارجية</CardTitle>
                  <CardDescription>ربط النظام مع الخدمات الخارجية</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  تكامل جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((integration) => (
                  <Card key={integration.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.type}</p>
                          <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          آخر مزامنة: {integration.lastSync}
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">الميزات:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {integration.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Settings className="w-4 h-4 ml-2" />
                          إعدادات
                        </Button>
                        <Button size="sm" variant="outline">
                          <Link className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <History className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التحليلات */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه استخدام النظام</CardTitle>
                <CardDescription>نشاط المستخدمين عبر الوقت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#f59e0b" name="المشاهدات" />
                    <Line type="monotone" dataKey="downloads" stroke="#10b981" name="التحميلات" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء سير العمل</CardTitle>
                <CardDescription>إحصائيات مسارات الاعتماد</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>مكتملة</span>
                    </div>
                    <span className="font-bold text-green-600">15</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span>قيد التنفيذ</span>
                    </div>
                    <span className="font-bold text-blue-600">8</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span>معلقة</span>
                    </div>
                    <span className="font-bold text-yellow-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>ملخص شامل لأداء إدارة الوثائق</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                  <p className="text-sm text-gray-600">إجمالي الوثائق</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">28%</p>
                  <p className="text-sm text-gray-600">المساحة المستخدمة</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">178</p>
                  <p className="text-sm text-gray-600">التحميلات الشهرية</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">92%</p>
                  <p className="text-sm text-gray-600">معدل إكمال سير العمل</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentManagement;

