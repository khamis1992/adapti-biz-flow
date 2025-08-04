import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Activity, 
  Server, 
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Minus,
  X,
  Check,
  Star,
  Flag,
  Target,
  Users,
  Globe,
  Smartphone,
  Tablet,
  Laptop,
  Network,
  Cloud,
  Shield,
  Lock,
  Key,
  Fingerprint,
  QrCode,
  Scan,
  Award,
  Gift,
  Tag,
  Percent,
  DollarSign,
  CreditCard,
  Truck,
  Home,
  Building,
  Car,
  Plane,
  Coffee,
  Book,
  Music,
  Camera,
  Gamepad2,
  Shirt,
  Watch,
  Headphones,
  Tv,
  Battery,
  Bluetooth,
  Usb,
  Package,
  Box,
  Layers,
  Grid,
  List,
  Table,
  Columns,
  Rows,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Maximize,
  Minimize,
  FullScreen,
  ExitFullScreen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Mic,
  MicOff,
  Video,
  Image,
  Film,
  Newspaper,
  FileImage,
  FileVideo,
  FileAudio,
  Folder,
  FolderOpen,
  Archive,
  Calendar,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Share,
  Bookmark,
  Copy,
  Trash2,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Edit,
  Info,
  HelpCircle
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  category: 'cpu' | 'memory' | 'disk' | 'network' | 'database' | 'application';
  currentValue: number;
  unit: string;
  threshold: {
    warning: number;
    critical: number;
  };
  trend: 'up' | 'down' | 'stable';
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
  history: number[];
}

interface PerformanceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'availability' | 'security' | 'capacity';
  source: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolution?: string;
}

interface SystemComponent {
  id: string;
  name: string;
  type: 'server' | 'database' | 'application' | 'service' | 'network';
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  location: string;
  version: string;
  dependencies: string[];
}

interface PerformanceReport {
  id: string;
  name: string;
  description: string;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  generatedDate: string;
  metrics: {
    availability: number;
    performance: number;
    errors: number;
    capacity: number;
  };
  recommendations: string[];
}

const PerformanceMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock system metrics
  const [systemMetrics] = useState<SystemMetric[]>([
    {
      id: '1',
      name: 'استخدام المعالج',
      category: 'cpu',
      currentValue: 65,
      unit: '%',
      threshold: { warning: 70, critical: 85 },
      trend: 'up',
      status: 'normal',
      lastUpdated: '2024-08-04T14:30:00',
      history: [45, 52, 58, 62, 65, 68, 65, 63, 65]
    },
    {
      id: '2',
      name: 'استخدام الذاكرة',
      category: 'memory',
      currentValue: 78,
      unit: '%',
      threshold: { warning: 75, critical: 90 },
      trend: 'up',
      status: 'warning',
      lastUpdated: '2024-08-04T14:30:00',
      history: [65, 68, 72, 75, 78, 76, 78, 80, 78]
    },
    {
      id: '3',
      name: 'مساحة القرص الصلب',
      category: 'disk',
      currentValue: 45,
      unit: '%',
      threshold: { warning: 80, critical: 95 },
      trend: 'stable',
      status: 'normal',
      lastUpdated: '2024-08-04T14:30:00',
      history: [42, 43, 44, 45, 45, 46, 45, 44, 45]
    },
    {
      id: '4',
      name: 'حركة الشبكة',
      category: 'network',
      currentValue: 125,
      unit: 'Mbps',
      threshold: { warning: 800, critical: 950 },
      trend: 'down',
      status: 'normal',
      lastUpdated: '2024-08-04T14:30:00',
      history: [150, 140, 135, 130, 125, 120, 125, 128, 125]
    },
    {
      id: '5',
      name: 'استعلامات قاعدة البيانات',
      category: 'database',
      currentValue: 450,
      unit: 'QPS',
      threshold: { warning: 800, critical: 1000 },
      trend: 'up',
      status: 'normal',
      lastUpdated: '2024-08-04T14:30:00',
      history: [380, 400, 420, 435, 450, 445, 450, 455, 450]
    },
    {
      id: '6',
      name: 'زمن الاستجابة',
      category: 'application',
      currentValue: 250,
      unit: 'ms',
      threshold: { warning: 500, critical: 1000 },
      trend: 'stable',
      status: 'normal',
      lastUpdated: '2024-08-04T14:30:00',
      history: [240, 245, 250, 248, 250, 252, 250, 248, 250]
    }
  ]);

  // Mock alerts
  const [alerts] = useState<PerformanceAlert[]>([
    {
      id: '1',
      title: 'استخدام الذاكرة مرتفع',
      description: 'استخدام الذاكرة تجاوز الحد المسموح في الخادم الرئيسي',
      severity: 'high',
      category: 'performance',
      source: 'Server-01',
      timestamp: '2024-08-04T14:25:00',
      status: 'active',
      assignedTo: 'فريق البنية التحتية'
    },
    {
      id: '2',
      title: 'بطء في قاعدة البيانات',
      description: 'زمن استجابة قاعدة البيانات أعلى من المعتاد',
      severity: 'medium',
      category: 'performance',
      source: 'Database-Primary',
      timestamp: '2024-08-04T13:45:00',
      status: 'acknowledged',
      assignedTo: 'مدير قاعدة البيانات'
    },
    {
      id: '3',
      title: 'انقطاع في الخدمة',
      description: 'خدمة المصادقة غير متاحة مؤقتاً',
      severity: 'critical',
      category: 'availability',
      source: 'Auth-Service',
      timestamp: '2024-08-04T12:30:00',
      status: 'resolved',
      assignedTo: 'فريق التطوير',
      resolution: 'تم إعادة تشغيل الخدمة وحل المشكلة'
    },
    {
      id: '4',
      title: 'مساحة التخزين منخفضة',
      description: 'مساحة التخزين في خادم الملفات أقل من 20%',
      severity: 'medium',
      category: 'capacity',
      source: 'File-Server',
      timestamp: '2024-08-04T11:15:00',
      status: 'active'
    }
  ]);

  // Mock system components
  const [systemComponents] = useState<SystemComponent[]>([
    {
      id: '1',
      name: 'الخادم الرئيسي',
      type: 'server',
      status: 'online',
      uptime: 99.8,
      responseTime: 45,
      lastCheck: '2024-08-04T14:30:00',
      location: 'مركز البيانات الأساسي',
      version: 'Ubuntu 22.04 LTS',
      dependencies: ['database', 'storage']
    },
    {
      id: '2',
      name: 'قاعدة البيانات الرئيسية',
      type: 'database',
      status: 'online',
      uptime: 99.9,
      responseTime: 12,
      lastCheck: '2024-08-04T14:30:00',
      location: 'مركز البيانات الأساسي',
      version: 'PostgreSQL 15.3',
      dependencies: ['storage', 'backup']
    },
    {
      id: '3',
      name: 'تطبيق الويب',
      type: 'application',
      status: 'online',
      uptime: 99.5,
      responseTime: 250,
      lastCheck: '2024-08-04T14:30:00',
      location: 'السحابة - AWS',
      version: 'v2.1.5',
      dependencies: ['database', 'auth-service']
    },
    {
      id: '4',
      name: 'خدمة المصادقة',
      type: 'service',
      status: 'degraded',
      uptime: 98.2,
      responseTime: 180,
      lastCheck: '2024-08-04T14:30:00',
      location: 'السحابة - Azure',
      version: 'v1.8.2',
      dependencies: ['database']
    },
    {
      id: '5',
      name: 'موازن الأحمال',
      type: 'network',
      status: 'online',
      uptime: 99.9,
      responseTime: 5,
      lastCheck: '2024-08-04T14:30:00',
      location: 'مركز البيانات الأساسي',
      version: 'NGINX 1.22',
      dependencies: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': case 'online': case 'resolved': return 'bg-green-100 text-green-800';
      case 'warning': case 'degraded': case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'critical': case 'offline': case 'active': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'طبيعي';
      case 'warning': return 'تحذير';
      case 'critical': return 'حرج';
      case 'online': return 'متصل';
      case 'offline': return 'غير متصل';
      case 'degraded': return 'متدهور';
      case 'maintenance': return 'صيانة';
      case 'active': return 'نشط';
      case 'acknowledged': return 'مؤكد';
      case 'resolved': return 'محلول';
      default: return status;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'منخفض';
      case 'medium': return 'متوسط';
      case 'high': return 'عالي';
      case 'critical': return 'حرج';
      default: return severity;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cpu': return <Cpu className="h-5 w-5" />;
      case 'memory': return <Activity className="h-5 w-5" />;
      case 'disk': return <HardDrive className="h-5 w-5" />;
      case 'network': return <Wifi className="h-5 w-5" />;
      case 'database': return <Database className="h-5 w-5" />;
      case 'application': return <Monitor className="h-5 w-5" />;
      case 'server': return <Server className="h-5 w-5" />;
      case 'service': return <Zap className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-600" />;
      case 'stable': return <Activity className="h-4 w-4 text-gray-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">حالة النظام</p>
                <p className="text-2xl font-bold text-green-600">صحي</p>
                <p className="text-xs text-green-600">جميع الخدمات تعمل</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">وقت التشغيل</p>
                <p className="text-2xl font-bold text-blue-600">99.8%</p>
                <p className="text-xs text-blue-600">آخر 30 يوم</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">التنبيهات النشطة</p>
                <p className="text-2xl font-bold text-orange-600">
                  {alerts.filter(a => a.status === 'active').length}
                </p>
                <p className="text-xs text-orange-600">تحتاج اهتمام</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الاستجابة</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(systemMetrics.find(m => m.category === 'application')?.currentValue || 0)}ms
                </p>
                <p className="text-xs text-purple-600">زمن الاستجابة</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            المؤشرات الرئيسية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemMetrics.map((metric) => (
              <div key={metric.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(metric.category)}
                    <h4 className="font-medium">{metric.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <Badge className={getStatusColor(metric.status)}>
                      {getStatusText(metric.status)}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {metric.currentValue}{metric.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    تحذير: {metric.threshold.warning}{metric.unit} | 
                    حرج: {metric.threshold.critical}{metric.unit}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        metric.currentValue >= metric.threshold.critical ? 'bg-red-600' :
                        metric.currentValue >= metric.threshold.warning ? 'bg-yellow-600' : 'bg-green-600'
                      }`}
                      style={{ 
                        width: `${Math.min((metric.currentValue / metric.threshold.critical) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  آخر تحديث: {new Date(metric.lastUpdated).toLocaleString('ar-SA')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            التنبيهات الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>المصدر: {alert.source}</span>
                    <span>الوقت: {new Date(alert.timestamp).toLocaleString('ar-SA')}</span>
                    {alert.assignedTo && <span>المسؤول: {alert.assignedTo}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {getSeverityText(alert.severity)}
                  </Badge>
                  <Badge className={getStatusColor(alert.status)}>
                    {getStatusText(alert.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      {/* Metrics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مؤشرات الأداء</h2>
          <p className="text-gray-600">مراقبة مفصلة لجميع مؤشرات النظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات
          </Button>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {systemMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(metric.category)}
                  <div>
                    <h3 className="font-semibold text-lg">{metric.name}</h3>
                    <p className="text-sm text-gray-600">
                      {metric.category === 'cpu' && 'معالج النظام'}
                      {metric.category === 'memory' && 'ذاكرة النظام'}
                      {metric.category === 'disk' && 'مساحة التخزين'}
                      {metric.category === 'network' && 'شبكة الاتصال'}
                      {metric.category === 'database' && 'قاعدة البيانات'}
                      {metric.category === 'application' && 'التطبيق'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <Badge className={getStatusColor(metric.status)}>
                    {getStatusText(metric.status)}
                  </Badge>
                </div>
              </div>
              
              {/* Current Value */}
              <div className="mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {metric.currentValue}{metric.unit}
                </div>
                <div className="text-sm text-gray-500">
                  الحد الأدنى للتحذير: {metric.threshold.warning}{metric.unit} | 
                  الحد الحرج: {metric.threshold.critical}{metric.unit}
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>الاستخدام الحالي</span>
                  <span>
                    {Math.round((metric.currentValue / metric.threshold.critical) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      metric.currentValue >= metric.threshold.critical ? 'bg-red-600' :
                      metric.currentValue >= metric.threshold.warning ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ 
                      width: `${Math.min((metric.currentValue / metric.threshold.critical) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              {/* History Chart Placeholder */}
              <div className="mb-4">
                <Label className="text-sm font-medium">الاتجاه (آخر 9 قراءات)</Label>
                <div className="flex items-end gap-1 mt-2 h-16">
                  {metric.history.map((value, index) => (
                    <div
                      key={index}
                      className="bg-blue-600 rounded-t flex-1"
                      style={{ 
                        height: `${(value / Math.max(...metric.history)) * 100}%`,
                        minHeight: '4px'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  تفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  تقرير
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  إعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      {/* Alerts Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التنبيهات والإشعارات</h2>
          <p className="text-gray-600">إدارة ومتابعة جميع تنبيهات النظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{alert.title}</h3>
                  <p className="text-gray-600 mt-1">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>المصدر: {alert.source}</span>
                    <span>الوقت: {new Date(alert.timestamp).toLocaleString('ar-SA')}</span>
                    {alert.assignedTo && <span>المسؤول: {alert.assignedTo}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {getSeverityText(alert.severity)}
                  </Badge>
                  <Badge className={getStatusColor(alert.status)}>
                    {getStatusText(alert.status)}
                  </Badge>
                </div>
              </div>
              
              {alert.resolution && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Label className="text-sm font-medium text-green-800">الحل:</Label>
                  <p className="text-sm text-green-700 mt-1">{alert.resolution}</p>
                </div>
              )}
              
              <div className="flex gap-2">
                {alert.status === 'active' && (
                  <>
                    <Button variant="outline" size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      تأكيد
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      تعيين
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  تفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  تعليق
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderComponents = () => (
    <div className="space-y-6">
      {/* Components Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مكونات النظام</h2>
          <p className="text-gray-600">حالة ومراقبة جميع مكونات النظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            إضافة مكون
          </Button>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemComponents.map((component) => (
          <Card key={component.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(component.type)}
                  <div>
                    <h3 className="font-semibold text-lg">{component.name}</h3>
                    <p className="text-sm text-gray-600">{component.version}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(component.status)}>
                  {getStatusText(component.status)}
                </Badge>
              </div>
              
              {/* Component Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>وقت التشغيل:</span>
                  <span className="font-medium">{component.uptime}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>زمن الاستجابة:</span>
                  <span className="font-medium">{component.responseTime}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الموقع:</span>
                  <span className="font-medium">{component.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>آخر فحص:</span>
                  <span className="font-medium">
                    {new Date(component.lastCheck).toLocaleString('ar-SA')}
                  </span>
                </div>
              </div>
              
              {/* Dependencies */}
              {component.dependencies.length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium">التبعيات:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {component.dependencies.map((dep, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Uptime Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>وقت التشغيل</span>
                  <span>{component.uptime}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      component.uptime >= 99 ? 'bg-green-600' :
                      component.uptime >= 95 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${component.uptime}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  تفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  إعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Monitor className="h-8 w-8 text-blue-600" />
            مراقبة الأداء
          </h1>
          <p className="text-gray-600 mt-2">مراقبة شاملة لأداء النظام والخدمات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="metrics">المؤشرات</TabsTrigger>
          <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
          <TabsTrigger value="components">المكونات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="metrics">
          {renderMetrics()}
        </TabsContent>

        <TabsContent value="alerts">
          {renderAlerts()}
        </TabsContent>

        <TabsContent value="components">
          {renderComponents()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMonitoring;

