import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  PieChart, 
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Zap,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Filter,
  Search,
  Calendar,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  Building,
  Globe,
  Smartphone,
  Monitor,
  Database,
  Server,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Award,
  Briefcase,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Share,
  Bookmark,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  X,
  Check,
  Info,
  HelpCircle
} from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  description: string;
  lastUpdated: string;
}

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'sales' | 'financial' | 'operational' | 'customer' | 'inventory';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  lastGenerated: string;
  status: 'ready' | 'generating' | 'scheduled' | 'error';
  size: string;
  recipients: string[];
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: Widget[];
  isDefault: boolean;
  createdBy: string;
  lastModified: string;
  views: number;
}

interface Widget {
  id: string;
  type: 'chart' | 'kpi' | 'table' | 'gauge' | 'map';
  title: string;
  data: any;
  position: { x: number; y: number; width: number; height: number };
}

const BusinessIntelligence = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock KPIs
  const [kpis] = useState<KPI[]>([
    {
      id: '1',
      name: 'إجمالي الإيرادات',
      value: 2450000,
      target: 2500000,
      unit: 'ريال',
      change: 12.5,
      trend: 'up',
      category: 'المالية',
      description: 'إجمالي الإيرادات المحققة خلال الفترة المحددة',
      lastUpdated: '2024-08-04T10:30:00'
    },
    {
      id: '2',
      name: 'عدد العملاء الجدد',
      value: 247,
      target: 300,
      unit: 'عميل',
      change: -5.2,
      trend: 'down',
      category: 'العملاء',
      description: 'عدد العملاء الجدد المسجلين خلال الفترة',
      lastUpdated: '2024-08-04T09:15:00'
    },
    {
      id: '3',
      name: 'معدل الرضا',
      value: 4.7,
      target: 4.5,
      unit: '/5',
      change: 0.3,
      trend: 'up',
      category: 'العملاء',
      description: 'متوسط تقييم رضا العملاء',
      lastUpdated: '2024-08-04T08:45:00'
    },
    {
      id: '4',
      name: 'معدل التحويل',
      value: 3.2,
      target: 3.5,
      unit: '%',
      change: 0.0,
      trend: 'stable',
      category: 'المبيعات',
      description: 'نسبة تحويل الزوار إلى عملاء',
      lastUpdated: '2024-08-04T07:20:00'
    },
    {
      id: '5',
      name: 'متوسط قيمة الطلب',
      value: 850,
      target: 800,
      unit: 'ريال',
      change: 8.1,
      trend: 'up',
      category: 'المبيعات',
      description: 'متوسط قيمة الطلب الواحد',
      lastUpdated: '2024-08-04T06:10:00'
    },
    {
      id: '6',
      name: 'دوران المخزون',
      value: 4.2,
      target: 4.0,
      unit: 'مرة/شهر',
      change: 5.0,
      trend: 'up',
      category: 'العمليات',
      description: 'معدل دوران المخزون شهرياً',
      lastUpdated: '2024-08-04T05:30:00'
    }
  ]);

  // Mock reports
  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'تقرير المبيعات الشهري',
      description: 'تحليل شامل لأداء المبيعات والاتجاهات الشهرية',
      type: 'sales',
      frequency: 'monthly',
      lastGenerated: '2024-08-01T09:00:00',
      status: 'ready',
      size: '2.4 MB',
      recipients: ['sales@company.com', 'manager@company.com']
    },
    {
      id: '2',
      title: 'التقرير المالي الربع سنوي',
      description: 'تحليل الأداء المالي والربحية للربع',
      type: 'financial',
      frequency: 'quarterly',
      lastGenerated: '2024-07-01T10:00:00',
      status: 'ready',
      size: '5.1 MB',
      recipients: ['finance@company.com', 'ceo@company.com']
    },
    {
      id: '3',
      title: 'تحليل سلوك العملاء',
      description: 'دراسة أنماط وسلوكيات العملاء وتفضيلاتهم',
      type: 'customer',
      frequency: 'weekly',
      lastGenerated: '2024-08-03T14:00:00',
      status: 'generating',
      size: '1.8 MB',
      recipients: ['marketing@company.com', 'crm@company.com']
    },
    {
      id: '4',
      title: 'تقرير حالة المخزون',
      description: 'تحليل مستويات المخزون وحركة المنتجات',
      type: 'inventory',
      frequency: 'daily',
      lastGenerated: '2024-08-04T06:00:00',
      status: 'ready',
      size: '890 KB',
      recipients: ['inventory@company.com', 'operations@company.com']
    }
  ]);

  // Mock dashboards
  const [dashboards] = useState<Dashboard[]>([
    {
      id: '1',
      name: 'لوحة المدير التنفيذي',
      description: 'نظرة شاملة على أداء الشركة والمؤشرات الرئيسية',
      widgets: [],
      isDefault: true,
      createdBy: 'النظام',
      lastModified: '2024-08-04T10:00:00',
      views: 1247
    },
    {
      id: '2',
      name: 'لوحة المبيعات',
      description: 'تتبع أداء المبيعات والأهداف والاتجاهات',
      widgets: [],
      isDefault: false,
      createdBy: 'أحمد محمد',
      lastModified: '2024-08-03T15:30:00',
      views: 456
    },
    {
      id: '3',
      name: 'لوحة العمليات',
      description: 'مراقبة العمليات التشغيلية والكفاءة',
      widgets: [],
      isDefault: false,
      createdBy: 'فاطمة علي',
      lastModified: '2024-08-02T11:20:00',
      views: 234
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'جاهز';
      case 'generating': return 'قيد الإنشاء';
      case 'scheduled': return 'مجدول';
      case 'error': return 'خطأ';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return <ShoppingCart className="h-4 w-4" />;
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'operational': return <Settings className="h-4 w-4" />;
      case 'customer': return <Users className="h-4 w-4" />;
      case 'inventory': return <Package className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'sales': return 'المبيعات';
      case 'financial': return 'المالية';
      case 'operational': return 'العمليات';
      case 'customer': return 'العملاء';
      case 'inventory': return 'المخزون';
      default: return type;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.slice(0, 6).map((kpi) => (
          <Card key={kpi.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {kpi.value.toLocaleString()} {kpi.unit}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 ${getTrendColor(kpi.trend)}`}>
                    {getTrendIcon(kpi.trend)}
                    <span className="text-sm font-medium">
                      {Math.abs(kpi.change)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    الهدف: {kpi.target.toLocaleString()} {kpi.unit}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${kpi.value >= kpi.target ? 'bg-green-600' : 'bg-blue-600'}`}
                  style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{kpi.category}</span>
                <span>
                  آخر تحديث: {new Date(kpi.lastUpdated).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              اتجاهات المبيعات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">رسم بياني لاتجاهات المبيعات</p>
                <p className="text-sm text-gray-500">البيانات من آخر 6 أشهر</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الإيرادات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">توزيع الإيرادات حسب الفئة</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>الإلكترونيات</span>
                    </div>
                    <span>45%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>الملابس</span>
                    </div>
                    <span>30%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>المنزل والحديقة</span>
                    </div>
                    <span>25%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            ملخص الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">94%</div>
              <div className="text-sm text-gray-600">تحقيق الأهداف</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">+12%</div>
              <div className="text-sm text-gray-600">نمو الإيرادات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">4.7</div>
              <div className="text-sm text-gray-600">رضا العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">89%</div>
              <div className="text-sm text-gray-600">كفاءة العمليات</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التقارير الذكية</h2>
          <p className="text-gray-600">إنشاء وإدارة التقارير التحليلية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            استيراد
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            تقرير جديد
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getTypeIcon(report.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{report.title}</h3>
                    <p className="text-gray-600 mt-1">{report.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.frequency === 'daily' ? 'يومي' : 
                         report.frequency === 'weekly' ? 'أسبوعي' :
                         report.frequency === 'monthly' ? 'شهري' :
                         report.frequency === 'quarterly' ? 'ربع سنوي' : 'سنوي'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {report.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {report.recipients.length} مستلم
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(report.status)}>
                    {getStatusText(report.status)}
                  </Badge>
                  <Badge variant="secondary">
                    {getTypeText(report.type)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>
                  آخر إنشاء: {new Date(report.lastGenerated).toLocaleDateString('ar-SA')}
                </span>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>إرسال إلى: {report.recipients.join(', ')}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  تحميل
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  إعادة إنشاء
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  إعدادات
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  مشاركة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDashboards = () => (
    <div className="space-y-6">
      {/* Dashboards Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">لوحات التحكم</h2>
          <p className="text-gray-600">إنشاء وتخصيص لوحات التحكم التفاعلية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            استيراد لوحة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            لوحة جديدة
          </Button>
        </div>
      </div>

      {/* Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dashboard) => (
          <Card key={dashboard.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{dashboard.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{dashboard.description}</p>
                </div>
                {dashboard.isDefault && (
                  <Badge className="bg-blue-100 text-blue-800">
                    افتراضي
                  </Badge>
                )}
              </div>
              
              {/* Dashboard Preview */}
              <div className="h-32 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">معاينة اللوحة</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>بواسطة: {dashboard.createdBy}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {dashboard.views.toLocaleString()} مشاهدة
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                آخر تعديل: {new Date(dashboard.lastModified).toLocaleDateString('ar-SA')}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">47</div>
            <div className="text-sm text-gray-600">نموذج تحليلي</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">2.4M</div>
            <div className="text-sm text-gray-600">نقطة بيانات</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">98.5%</div>
            <div className="text-sm text-gray-600">دقة التنبؤ</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">156</div>
            <div className="text-sm text-gray-600">تحليل نشط</div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              التحليل التنبؤي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">توقعات المبيعات</h4>
                <p className="text-sm text-blue-700">
                  من المتوقع زيادة المبيعات بنسبة 15% في الشهر القادم بناءً على الاتجاهات الحالية
                </p>
                <div className="mt-2 text-xs text-blue-600">دقة: 94%</div>
              </div>
              
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">تحليل الطلب</h4>
                <p className="text-sm text-green-700">
                  ارتفاع متوقع في الطلب على فئة الإلكترونيات خلال الأسبوعين القادمين
                </p>
                <div className="mt-2 text-xs text-green-600">دقة: 91%</div>
              </div>
              
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">تحليل المخزون</h4>
                <p className="text-sm text-orange-700">
                  توقع نفاد مخزون 3 منتجات خلال 5 أيام بناءً على معدل الاستهلاك الحالي
                </p>
                <div className="mt-2 text-xs text-orange-600">دقة: 97%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              تحليل الأداء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">كفاءة المبيعات</span>
                  <span className="text-sm text-green-600">+8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">رضا العملاء</span>
                  <span className="text-sm text-blue-600">+2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">كفاءة العمليات</span>
                  <span className="text-sm text-purple-600">+5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">الربحية</span>
                  <span className="text-sm text-orange-600">+12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            مصادر البيانات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">قاعدة بيانات المبيعات</span>
              </div>
              <p className="text-sm text-gray-600">متصلة - آخر تحديث: منذ 5 دقائق</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">نظام إدارة العملاء</span>
              </div>
              <p className="text-sm text-gray-600">متصل - آخر تحديث: منذ 2 دقيقة</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">نظام المخزون</span>
              </div>
              <p className="text-sm text-gray-600">تحديث جاري - منذ 15 دقيقة</p>
            </div>
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
            <Brain className="h-8 w-8 text-blue-600" />
            ذكاء الأعمال
          </h1>
          <p className="text-gray-600 mt-2">تحليلات متقدمة ورؤى ذكية لاتخاذ قرارات مدروسة</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="7d">آخر 7 أيام</option>
            <option value="30d">آخر 30 يوم</option>
            <option value="90d">آخر 90 يوم</option>
            <option value="1y">آخر سنة</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="dashboards">لوحات التحكم</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات المتقدمة</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="reports">
          {renderReports()}
        </TabsContent>

        <TabsContent value="dashboards">
          {renderDashboards()}
        </TabsContent>

        <TabsContent value="analytics">
          {renderAnalytics()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessIntelligence;

