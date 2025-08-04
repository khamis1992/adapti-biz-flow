import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  BellRing, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Settings,
  Users,
  Calendar,
  Clock,
  Target,
  Zap,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Flag,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  X,
  Check,
  Search,
  Filter,
  RefreshCw,
  Download,
  Upload,
  Share,
  Bookmark,
  Copy,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Database,
  Server,
  Monitor,
  Globe,
  Wifi,
  Battery,
  Bluetooth,
  Usb,
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
  Laptop,
  Tablet,
  Tv,
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
  FileText,
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
  Maximize as FullScreen,
  Minimize as ExitFullScreen,
  Phone,
  HelpCircle,
  Cpu,
  HardDrive
} from 'lucide-react';

interface NotificationRule {
  id: string;
  name: string;
  description: string;
  category: 'system' | 'business' | 'security' | 'performance' | 'user' | 'custom';
  trigger: {
    type: 'threshold' | 'event' | 'schedule' | 'pattern' | 'ai_prediction';
    condition: string;
    value?: number;
    operator?: 'greater' | 'less' | 'equal' | 'contains' | 'pattern';
  };
  channels: ('email' | 'sms' | 'push' | 'slack' | 'teams' | 'webhook')[];
  recipients: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  isActive: boolean;
  aiEnabled: boolean;
  smartFiltering: boolean;
  createdDate: string;
  lastTriggered?: string;
  triggerCount: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'business' | 'security' | 'performance' | 'user' | 'custom';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'unread' | 'read' | 'archived' | 'dismissed';
  timestamp: string;
  source: string;
  channels: string[];
  recipients: string[];
  ruleId?: string;
  metadata?: {
    [key: string]: any;
  };
  actions?: NotificationAction[];
}

interface NotificationAction {
  id: string;
  label: string;
  type: 'button' | 'link' | 'api_call';
  action: string;
  style: 'primary' | 'secondary' | 'danger';
}

interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  subject: string;
  body: string;
  variables: string[];
  channels: string[];
  isDefault: boolean;
}

interface NotificationAnalytics {
  totalSent: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  topCategories: { category: string; count: number }[];
  channelPerformance: { channel: string; deliveryRate: number; openRate: number }[];
  timeDistribution: { hour: number; count: number }[];
}

const SmartNotifications = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  // Mock notification rules
  const [notificationRules] = useState<NotificationRule[]>([
    {
      id: '1',
      name: 'تنبيه استخدام الذاكرة العالي',
      description: 'إرسال تنبيه عند تجاوز استخدام الذاكرة 80%',
      category: 'performance',
      trigger: {
        type: 'threshold',
        condition: 'memory_usage',
        value: 80,
        operator: 'greater'
      },
      channels: ['email', 'sms', 'push'],
      recipients: ['admin@company.com', 'ops-team@company.com'],
      priority: 'high',
      frequency: 'immediate',
      isActive: true,
      aiEnabled: true,
      smartFiltering: true,
      createdDate: '2024-07-15',
      lastTriggered: '2024-08-04T14:25:00',
      triggerCount: 12
    },
    {
      id: '2',
      name: 'تنبيه تسجيل دخول مشبوه',
      description: 'إرسال تنبيه عند اكتشاف محاولة تسجيل دخول مشبوهة',
      category: 'security',
      trigger: {
        type: 'event',
        condition: 'suspicious_login',
        operator: 'pattern'
      },
      channels: ['email', 'sms', 'slack'],
      recipients: ['security@company.com', 'admin@company.com'],
      priority: 'critical',
      frequency: 'immediate',
      isActive: true,
      aiEnabled: true,
      smartFiltering: true,
      createdDate: '2024-06-20',
      lastTriggered: '2024-08-03T09:15:00',
      triggerCount: 5
    },
    {
      id: '3',
      name: 'تقرير المبيعات اليومي',
      description: 'إرسال تقرير يومي بإحصائيات المبيعات',
      category: 'business',
      trigger: {
        type: 'schedule',
        condition: 'daily_sales_report'
      },
      channels: ['email'],
      recipients: ['sales@company.com', 'management@company.com'],
      priority: 'medium',
      frequency: 'daily',
      isActive: true,
      aiEnabled: false,
      smartFiltering: false,
      createdDate: '2024-05-10',
      lastTriggered: '2024-08-04T08:00:00',
      triggerCount: 85
    },
    {
      id: '4',
      name: 'تنبؤ بانخفاض المبيعات',
      description: 'تنبيه ذكي بناءً على تحليل الذكاء الاصطناعي لتوقع انخفاض المبيعات',
      category: 'business',
      trigger: {
        type: 'ai_prediction',
        condition: 'sales_decline_prediction'
      },
      channels: ['email', 'teams', 'push'],
      recipients: ['sales@company.com', 'ceo@company.com'],
      priority: 'high',
      frequency: 'immediate',
      isActive: true,
      aiEnabled: true,
      smartFiltering: true,
      createdDate: '2024-07-01',
      lastTriggered: '2024-08-02T16:30:00',
      triggerCount: 3
    },
    {
      id: '5',
      name: 'تنبيه عميل جديد مهم',
      description: 'إرسال تنبيه عند تسجيل عميل جديد بقيمة عالية',
      category: 'user',
      trigger: {
        type: 'event',
        condition: 'high_value_customer_signup',
        value: 10000,
        operator: 'greater'
      },
      channels: ['email', 'slack', 'push'],
      recipients: ['sales@company.com', 'account-managers@company.com'],
      priority: 'medium',
      frequency: 'immediate',
      isActive: true,
      aiEnabled: false,
      smartFiltering: true,
      createdDate: '2024-06-05',
      lastTriggered: '2024-08-01T11:45:00',
      triggerCount: 8
    }
  ]);

  // Mock notifications
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'استخدام الذاكرة مرتفع',
      message: 'استخدام الذاكرة في الخادم الرئيسي وصل إلى 85%. يرجى اتخاذ الإجراء المناسب.',
      category: 'performance',
      priority: 'high',
      status: 'unread',
      timestamp: '2024-08-04T14:25:00',
      source: 'نظام المراقبة',
      channels: ['email', 'sms', 'push'],
      recipients: ['admin@company.com', 'ops-team@company.com'],
      ruleId: '1',
      actions: [
        {
          id: '1',
          label: 'عرض التفاصيل',
          type: 'link',
          action: '/monitoring/memory',
          style: 'primary'
        },
        {
          id: '2',
          label: 'إعادة تشغيل الخدمة',
          type: 'api_call',
          action: 'restart_service',
          style: 'danger'
        }
      ]
    },
    {
      id: '2',
      title: 'تسجيل دخول مشبوه',
      message: 'تم اكتشاف محاولة تسجيل دخول مشبوهة من عنوان IP: 192.168.1.100',
      category: 'security',
      priority: 'critical',
      status: 'read',
      timestamp: '2024-08-03T09:15:00',
      source: 'نظام الأمان',
      channels: ['email', 'sms', 'slack'],
      recipients: ['security@company.com', 'admin@company.com'],
      ruleId: '2',
      actions: [
        {
          id: '1',
          label: 'حظر IP',
          type: 'api_call',
          action: 'block_ip',
          style: 'danger'
        },
        {
          id: '2',
          label: 'عرض السجلات',
          type: 'link',
          action: '/security/logs',
          style: 'secondary'
        }
      ]
    },
    {
      id: '3',
      title: 'تقرير المبيعات اليومي',
      message: 'تقرير المبيعات ليوم 2024-08-04: إجمالي المبيعات 125,000 ريال، 45 طلب جديد.',
      category: 'business',
      priority: 'medium',
      status: 'read',
      timestamp: '2024-08-04T08:00:00',
      source: 'نظام المبيعات',
      channels: ['email'],
      recipients: ['sales@company.com', 'management@company.com'],
      ruleId: '3'
    },
    {
      id: '4',
      title: 'تنبؤ بانخفاض المبيعات',
      message: 'الذكاء الاصطناعي يتوقع انخفاض المبيعات بنسبة 15% في الأسبوع القادم.',
      category: 'business',
      priority: 'high',
      status: 'unread',
      timestamp: '2024-08-02T16:30:00',
      source: 'محرك الذكاء الاصطناعي',
      channels: ['email', 'teams', 'push'],
      recipients: ['sales@company.com', 'ceo@company.com'],
      ruleId: '4',
      actions: [
        {
          id: '1',
          label: 'عرض التحليل',
          type: 'link',
          action: '/analytics/sales-prediction',
          style: 'primary'
        }
      ]
    },
    {
      id: '5',
      title: 'عميل جديد مهم',
      message: 'تم تسجيل عميل جديد بقيمة متوقعة 25,000 ريال - شركة التقنية المتقدمة.',
      category: 'user',
      priority: 'medium',
      status: 'read',
      timestamp: '2024-08-01T11:45:00',
      source: 'نظام إدارة العملاء',
      channels: ['email', 'slack', 'push'],
      recipients: ['sales@company.com', 'account-managers@company.com'],
      ruleId: '5'
    }
  ]);

  // Mock analytics
  const [analytics] = useState<NotificationAnalytics>({
    totalSent: 1250,
    deliveryRate: 98.5,
    openRate: 75.2,
    clickRate: 25.8,
    unsubscribeRate: 0.5,
    topCategories: [
      { category: 'performance', count: 450 },
      { category: 'business', count: 380 },
      { category: 'security', count: 220 },
      { category: 'user', count: 150 },
      { category: 'system', count: 50 }
    ],
    channelPerformance: [
      { channel: 'email', deliveryRate: 99.2, openRate: 78.5 },
      { channel: 'push', deliveryRate: 97.8, openRate: 65.2 },
      { channel: 'sms', deliveryRate: 99.8, openRate: 95.5 },
      { channel: 'slack', deliveryRate: 98.5, openRate: 88.2 },
      { channel: 'teams', deliveryRate: 97.2, openRate: 82.1 }
    ],
    timeDistribution: [
      { hour: 0, count: 15 }, { hour: 1, count: 8 }, { hour: 2, count: 12 },
      { hour: 3, count: 5 }, { hour: 4, count: 3 }, { hour: 5, count: 7 },
      { hour: 6, count: 25 }, { hour: 7, count: 45 }, { hour: 8, count: 85 },
      { hour: 9, count: 120 }, { hour: 10, count: 95 }, { hour: 11, count: 110 },
      { hour: 12, count: 75 }, { hour: 13, count: 90 }, { hour: 14, count: 105 },
      { hour: 15, count: 85 }, { hour: 16, count: 70 }, { hour: 17, count: 55 },
      { hour: 18, count: 40 }, { hour: 19, count: 30 }, { hour: 20, count: 25 },
      { hour: 21, count: 20 }, { hour: 22, count: 15 }, { hour: 23, count: 10 }
    ]
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system': return 'bg-blue-100 text-blue-800';
      case 'business': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'user': return 'bg-purple-100 text-purple-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'system': return 'نظام';
      case 'business': return 'أعمال';
      case 'security': return 'أمان';
      case 'performance': return 'أداء';
      case 'user': return 'مستخدم';
      case 'custom': return 'مخصص';
      default: return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'منخفض';
      case 'medium': return 'متوسط';
      case 'high': return 'عالي';
      case 'critical': return 'حرج';
      default: return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-purple-100 text-purple-800';
      case 'dismissed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread': return 'غير مقروء';
      case 'read': return 'مقروء';
      case 'archived': return 'مؤرشف';
      case 'dismissed': return 'مرفوض';
      default: return status;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'push': return <Smartphone className="h-4 w-4" />;
      case 'slack': return <MessageSquare className="h-4 w-4" />;
      case 'teams': return <Users className="h-4 w-4" />;
      case 'webhook': return <Globe className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإشعارات</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.totalSent}</p>
                <p className="text-xs text-blue-600">آخر 30 يوم</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التسليم</p>
                <p className="text-2xl font-bold text-green-600">{analytics.deliveryRate}%</p>
                <p className="text-xs text-green-600">نسبة عالية</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الفتح</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.openRate}%</p>
                <p className="text-xs text-purple-600">معدل ممتاز</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل النقر</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.clickRate}%</p>
                <p className="text-xs text-orange-600">تفاعل جيد</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            الإشعارات الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>المصدر: {notification.source}</span>
                    <span>الوقت: {new Date(notification.timestamp).toLocaleString('ar-SA')}</span>
                    <div className="flex items-center gap-1">
                      <span>القنوات:</span>
                      {notification.channels.map((channel, index) => (
                        <span key={index} className="flex items-center gap-1">
                          {getChannelIcon(channel)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getPriorityColor(notification.priority)}>
                    {getPriorityText(notification.priority)}
                  </Badge>
                  <Badge className={getCategoryColor(notification.category)}>
                    {getCategoryText(notification.category)}
                  </Badge>
                  <Badge className={getStatusColor(notification.status)}>
                    {getStatusText(notification.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الإشعارات حسب الفئة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topCategories.map((item) => {
                const percentage = Math.round((item.count / analytics.totalSent) * 100);
                return (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(item.category)}>
                        {getCategoryText(item.category)}
                      </Badge>
                      <span className="text-sm">{item.count} إشعار</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء القنوات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.channelPerformance.map((channel) => (
                <div key={channel.channel} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getChannelIcon(channel.channel)}
                      <span className="font-medium">{channel.channel}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      تسليم: {channel.deliveryRate}% | فتح: {channel.openRate}%
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">معدل التسليم</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${channel.deliveryRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">معدل الفتح</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${channel.openRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Notifications Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الإشعارات</h2>
          <p className="text-gray-600">إدارة ومتابعة جميع الإشعارات</p>
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

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في الإشعارات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">جميع الفئات</option>
          <option value="system">نظام</option>
          <option value="business">أعمال</option>
          <option value="security">أمان</option>
          <option value="performance">أداء</option>
          <option value="user">مستخدم</option>
        </select>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">جميع الأولويات</option>
          <option value="critical">حرج</option>
          <option value="high">عالي</option>
          <option value="medium">متوسط</option>
          <option value="low">منخفض</option>
        </select>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>المصدر: {notification.source}</span>
                    <span>الوقت: {new Date(notification.timestamp).toLocaleString('ar-SA')}</span>
                    <span>المستلمون: {notification.recipients.length}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getPriorityColor(notification.priority)}>
                    {getPriorityText(notification.priority)}
                  </Badge>
                  <Badge className={getCategoryColor(notification.category)}>
                    {getCategoryText(notification.category)}
                  </Badge>
                  <Badge className={getStatusColor(notification.status)}>
                    {getStatusText(notification.status)}
                  </Badge>
                </div>
              </div>
              
              {/* Channels */}
              <div className="mb-4">
                <Label className="text-sm font-medium">قنوات الإرسال</Label>
                <div className="flex items-center gap-2 mt-1">
                  {notification.channels.map((channel, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {getChannelIcon(channel)}
                      <span className="mr-1">{channel}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              {notification.actions && notification.actions.length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium">الإجراءات المتاحة</Label>
                  <div className="flex gap-2 mt-2">
                    {notification.actions.map((action) => (
                      <Button 
                        key={action.id} 
                        variant={action.style === 'primary' ? 'default' : 'outline'} 
                        size="sm"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  تعليم كمقروء
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  أرشفة
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

  const renderRules = () => (
    <div className="space-y-6">
      {/* Rules Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">قواعد الإشعارات</h2>
          <p className="text-gray-600">إدارة وتكوين قواعد الإشعارات الذكية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات عامة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            قاعدة جديدة
          </Button>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {notificationRules.map((rule) => (
          <Card key={rule.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{rule.name}</h3>
                  <p className="text-gray-600 mt-1">{rule.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>تاريخ الإنشاء: {new Date(rule.createdDate).toLocaleDateString('ar-SA')}</span>
                    <span>عدد التفعيلات: {rule.triggerCount}</span>
                    {rule.lastTriggered && (
                      <span>آخر تفعيل: {new Date(rule.lastTriggered).toLocaleString('ar-SA')}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {rule.isActive ? 'نشط' : 'غير نشط'}
                  </Badge>
                  <Badge className={getPriorityColor(rule.priority)}>
                    {getPriorityText(rule.priority)}
                  </Badge>
                  <Badge className={getCategoryColor(rule.category)}>
                    {getCategoryText(rule.category)}
                  </Badge>
                </div>
              </div>
              
              {/* Rule Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">نوع المحفز</Label>
                  <div className="text-sm text-gray-600 mt-1">
                    {rule.trigger.type === 'threshold' && 'حد أدنى/أقصى'}
                    {rule.trigger.type === 'event' && 'حدث'}
                    {rule.trigger.type === 'schedule' && 'جدولة'}
                    {rule.trigger.type === 'pattern' && 'نمط'}
                    {rule.trigger.type === 'ai_prediction' && 'تنبؤ ذكي'}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">التكرار</Label>
                  <div className="text-sm text-gray-600 mt-1">
                    {rule.frequency === 'immediate' && 'فوري'}
                    {rule.frequency === 'hourly' && 'كل ساعة'}
                    {rule.frequency === 'daily' && 'يومي'}
                    {rule.frequency === 'weekly' && 'أسبوعي'}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">عدد المستلمين</Label>
                  <div className="text-sm text-gray-600 mt-1">{rule.recipients.length} مستلم</div>
                </div>
              </div>
              
              {/* Channels */}
              <div className="mb-4">
                <Label className="text-sm font-medium">قنوات الإرسال</Label>
                <div className="flex items-center gap-2 mt-1">
                  {rule.channels.map((channel, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {getChannelIcon(channel)}
                      <span className="mr-1">{channel}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* AI Features */}
              <div className="mb-4">
                <Label className="text-sm font-medium">الميزات الذكية</Label>
                <div className="flex items-center gap-2 mt-1">
                  {rule.aiEnabled && (
                    <Badge variant="outline" className="text-xs">
                      <Brain className="h-3 w-3 mr-1" />
                      ذكاء اصطناعي
                    </Badge>
                  )}
                  {rule.smartFiltering && (
                    <Badge variant="outline" className="text-xs">
                      <Filter className="h-3 w-3 mr-1" />
                      فلترة ذكية
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  اختبار
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  نسخ
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  إعدادات
                </Button>
                {rule.isActive ? (
                  <Button variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    إيقاف
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-2" />
                    تفعيل
                  </Button>
                )}
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
            <Brain className="h-8 w-8 text-blue-600" />
            التنبيهات الذكية
          </h1>
          <p className="text-gray-600 mt-2">نظام إشعارات ذكي مدعوم بالذكاء الاصطناعي</p>
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="rules">القواعد</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="notifications">
          {renderNotifications()}
        </TabsContent>

        <TabsContent value="rules">
          {renderRules()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartNotifications;

