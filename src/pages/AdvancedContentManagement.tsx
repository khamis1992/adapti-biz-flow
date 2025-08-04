import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Image, 
  Video, 
  Mic, 
  Camera, 
  Edit, 
  Eye, 
  Share, 
  Download, 
  Upload, 
  Folder, 
  FolderOpen, 
  File, 
  Files, 
  Archive, 
  Search, 
  Filter, 
  Tag, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  Star, 
  Heart, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Mail, 
  Globe, 
  Link, 
  Hash, 
  AtSign, 
  Bookmark, 
  Flag, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock3, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  FullScreen, 
  ExitFullScreen, 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  Crop, 
  Scissors, 
  Palette, 
  Brush, 
  Eraser, 
  Type, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link2, 
  Unlink, 
  Table, 
  Columns, 
  Rows, 
  Grid, 
  Layout, 
  Sidebar, 
  PanelLeft, 
  PanelRight, 
  PanelTop, 
  PanelBottom, 
  Settings, 
  MoreHorizontal, 
  PlusCircle, 
  Trash2, 
  Copy, 
  Move3D, 
  RefreshCw, 
  Save, 
  SaveAll, 
  FolderPlus, 
  FilePlus, 
  FileEdit, 
  FileCheck, 
  FileX, 
  FileClock, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileCode, 
  FilePdf, 
  FileSpreadsheet, 
  FilePresentation, 
  FileArchive, 
  Database, 
  Server, 
  Cloud, 
  CloudUpload, 
  CloudDownload, 
  HardDrive, 
  Wifi, 
  WifiOff, 
  Signal, 
  SignalHigh, 
  SignalLow, 
  SignalMedium, 
  SignalZero, 
  Battery, 
  BatteryCharging, 
  BatteryFull, 
  BatteryLow, 
  BatteryMedium, 
  Power, 
  PowerOff, 
  Zap, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart, 
  Area, 
  Pie, 
  Cell, 
  Line 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const contentData = [
  { id: 1, title: 'مقال: أفضل الممارسات في التجارة الإلكترونية', type: 'مقال', status: 'منشور', author: 'أحمد محمد', category: 'تجارة إلكترونية', views: 2500, likes: 180, comments: 45, publishDate: '2024-06-15', lastModified: '2024-06-20' },
  { id: 2, title: 'فيديو: شرح نظام إدارة المخزون', type: 'فيديو', status: 'مراجعة', author: 'فاطمة أحمد', category: 'تعليمي', views: 1200, likes: 95, comments: 28, publishDate: null, lastModified: '2024-06-22' },
  { id: 3, title: 'انفوجرافيك: إحصائيات المبيعات 2024', type: 'صورة', status: 'منشور', author: 'محمد علي', category: 'تحليلات', views: 3200, likes: 250, comments: 67, publishDate: '2024-06-10', lastModified: '2024-06-12' },
  { id: 4, title: 'بودكاست: مستقبل التكنولوجيا المالية', type: 'صوت', status: 'مسودة', author: 'سارة خالد', category: 'تكنولوجيا', views: 0, likes: 0, comments: 0, publishDate: null, lastModified: '2024-06-23' },
  { id: 5, title: 'دليل: كيفية استخدام النظام', type: 'مستند', status: 'منشور', author: 'عمر حسن', category: 'دعم', views: 4500, likes: 320, comments: 89, publishDate: '2024-05-28', lastModified: '2024-06-18' },
];

const contentTypesData = [
  { name: 'مقالات', value: 35, color: '#0088FE' },
  { name: 'فيديوهات', value: 25, color: '#00C49F' },
  { name: 'صور', value: 20, color: '#FFBB28' },
  { name: 'صوتيات', value: 12, color: '#FF8042' },
  { name: 'مستندات', value: 8, color: '#AF19FF' },
];

const performanceData = [
  { name: 'يناير', views: 45000, likes: 3200, comments: 890, shares: 450 },
  { name: 'فبراير', views: 52000, likes: 3800, comments: 1050, shares: 520 },
  { name: 'مارس', views: 48000, likes: 3500, comments: 980, shares: 480 },
  { name: 'أبريل', views: 61000, likes: 4200, comments: 1180, shares: 610 },
  { name: 'مايو', views: 58000, likes: 4000, comments: 1120, shares: 580 },
  { name: 'يونيو', views: 65000, likes: 4500, comments: 1250, shares: 650 },
];

const categoryPerformanceData = [
  { name: 'تجارة إلكترونية', views: 85000, engagement: 12.5 },
  { name: 'تعليمي', views: 72000, engagement: 15.2 },
  { name: 'تحليلات', views: 68000, engagement: 18.7 },
  { name: 'تكنولوجيا', views: 54000, engagement: 14.3 },
  { name: 'دعم', views: 91000, engagement: 22.1 },
];

const AdvancedContentManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المحتوى</p>
                <p className="text-2xl font-bold text-blue-600">1,250</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +18.5% عن الشهر الماضي
                </p>
              </div>
              <Files className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المشاهدات الشهرية</p>
                <p className="text-2xl font-bold text-green-600">65K</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +12.1% عن الشهر الماضي
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التفاعل</p>
                <p className="text-2xl font-bold text-purple-600">16.2%</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +2.3% عن الشهر الماضي
                </p>
              </div>
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المحتوى المنشور</p>
                <p className="text-2xl font-bold text-orange-600">890</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +15.7% عن الشهر الماضي
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              أنواع المحتوى
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contentTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء الفئات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={categoryPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" name="المشاهدات" />
                <Line type="monotone" dataKey="engagement" stroke="#ff7300" name="معدل التفاعل %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            اتجاهات الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="views" fill="#8884d8" stroke="#8884d8" name="المشاهدات" />
              <Bar dataKey="likes" fill="#82ca9d" name="الإعجابات" />
              <Line type="monotone" dataKey="comments" stroke="#ff7300" name="التعليقات" />
              <Line type="monotone" dataKey="shares" stroke="#af19ff" name="المشاركات" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentLibrary = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>مكتبة المحتوى</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              بحث
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              إضافة محتوى جديد
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المؤلف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المشاهدات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التفاعل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ النشر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contentData.map((content) => (
                <tr key={content.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      {content.type === 'مقال' && <FileText className="h-4 w-4 text-blue-500 mr-2" />}
                      {content.type === 'فيديو' && <Video className="h-4 w-4 text-red-500 mr-2" />}
                      {content.type === 'صورة' && <Image className="h-4 w-4 text-green-500 mr-2" />}
                      {content.type === 'صوت' && <Mic className="h-4 w-4 text-purple-500 mr-2" />}
                      {content.type === 'مستند' && <File className="h-4 w-4 text-orange-500 mr-2" />}
                      {content.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={content.status === 'منشور' ? 'default' : content.status === 'مراجعة' ? 'secondary' : 'outline'}
                      className={`${
                        content.status === 'منشور' ? 'bg-green-100 text-green-800' : 
                        content.status === 'مراجعة' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {content.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.views.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {content.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {content.comments}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {content.publishDate || 'غير منشور'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
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
  );

  const renderMediaLibrary = () => (
    <div className="space-y-6">
      {/* Media Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            رفع الملفات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">اسحب وأفلت الملفات هنا</p>
            <p className="text-sm text-gray-600 mb-4">أو انقر لتحديد الملفات</p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              اختيار الملفات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>مكتبة الوسائط</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4 mr-2" />
                شبكة
              </Button>
              <Button variant="outline" size="sm">
                <List className="h-4 w-4 mr-2" />
                قائمة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div key={item} className="relative group">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    {item % 3 === 0 ? (
                      <Video className="h-8 w-8 text-gray-400" />
                    ) : item % 2 === 0 ? (
                      <FileText className="h-8 w-8 text-gray-400" />
                    ) : (
                      <Image className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            إدارة المحتوى المتقدمة
          </h1>
          <p className="text-gray-600 mt-2">إنشاء وإدارة ونشر المحتوى الرقمي بكفاءة عالية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            جدولة النشر
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="content">مكتبة المحتوى</TabsTrigger>
          <TabsTrigger value="media">مكتبة الوسائط</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="content">
          {renderContentLibrary()}
        </TabsContent>

        <TabsContent value="media">
          {renderMediaLibrary()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedContentManagement;

