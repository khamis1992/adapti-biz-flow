import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Minus,
  X,
  Check,
  Star,
  Flag,
  Target,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  Users,
  FileText,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle,
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
  Database,
  Server,
  Monitor,
  Smartphone,
  Globe,
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
  Wifi,
  Battery,
  Bluetooth,
  Usb,
  HardDrive,
  Network,
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
  Archive
} from 'lucide-react';

interface Risk {
  id: string;
  title: string;
  description: string;
  category: 'operational' | 'financial' | 'strategic' | 'compliance' | 'technology' | 'reputation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: 'low' | 'medium' | 'high' | 'very_high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  status: 'identified' | 'assessed' | 'mitigated' | 'monitored' | 'closed';
  owner: string;
  identifiedDate: string;
  lastReviewed: string;
  nextReview: string;
  mitigationActions: MitigationAction[];
  indicators: RiskIndicator[];
  relatedRisks: string[];
}

interface MitigationAction {
  id: string;
  title: string;
  description: string;
  type: 'preventive' | 'detective' | 'corrective' | 'directive';
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  effectiveness: number;
  cost: number;
}

interface RiskIndicator {
  id: string;
  name: string;
  description: string;
  type: 'leading' | 'lagging';
  currentValue: number;
  threshold: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

interface RiskAssessment {
  id: string;
  riskId: string;
  assessmentDate: string;
  assessor: string;
  methodology: string;
  inherentRisk: number;
  residualRisk: number;
  controlEffectiveness: number;
  recommendations: string[];
  nextAssessmentDate: string;
}

const RiskManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  // Mock risks data
  const [risks] = useState<Risk[]>([
    {
      id: '1',
      title: 'انقطاع الخدمة السحابية',
      description: 'احتمالية انقطاع الخدمات السحابية الرئيسية مما يؤثر على عمليات النظام',
      category: 'technology',
      severity: 'high',
      probability: 'medium',
      impact: 'high',
      riskScore: 75,
      status: 'assessed',
      owner: 'مدير تقنية المعلومات',
      identifiedDate: '2024-07-15',
      lastReviewed: '2024-08-01',
      nextReview: '2024-09-01',
      mitigationActions: [
        {
          id: '1',
          title: 'إعداد نظام احتياطي',
          description: 'تطوير نظام احتياطي في مزود خدمة مختلف',
          type: 'preventive',
          status: 'in_progress',
          priority: 'high',
          assignedTo: 'فريق البنية التحتية',
          dueDate: '2024-08-30',
          effectiveness: 85,
          cost: 50000
        }
      ],
      indicators: [
        {
          id: '1',
          name: 'وقت التشغيل',
          description: 'نسبة وقت تشغيل النظام',
          type: 'lagging',
          currentValue: 99.5,
          threshold: 99.9,
          trend: 'stable',
          lastUpdated: '2024-08-04',
          frequency: 'daily'
        }
      ],
      relatedRisks: ['2', '3']
    },
    {
      id: '2',
      title: 'انتهاك أمان البيانات',
      description: 'خطر تسريب أو انتهاك بيانات العملاء الحساسة',
      category: 'technology',
      severity: 'critical',
      probability: 'medium',
      impact: 'critical',
      riskScore: 90,
      status: 'mitigated',
      owner: 'مسؤول الأمان',
      identifiedDate: '2024-06-20',
      lastReviewed: '2024-08-03',
      nextReview: '2024-08-20',
      mitigationActions: [
        {
          id: '2',
          title: 'تشفير البيانات المتقدم',
          description: 'تطبيق تشفير متقدم لجميع البيانات الحساسة',
          type: 'preventive',
          status: 'completed',
          priority: 'critical',
          assignedTo: 'فريق الأمان',
          dueDate: '2024-07-31',
          completedDate: '2024-07-28',
          effectiveness: 95,
          cost: 75000
        }
      ],
      indicators: [
        {
          id: '2',
          name: 'محاولات الاختراق',
          description: 'عدد محاولات الاختراق المكتشفة',
          type: 'leading',
          currentValue: 12,
          threshold: 20,
          trend: 'decreasing',
          lastUpdated: '2024-08-04',
          frequency: 'daily'
        }
      ],
      relatedRisks: ['1', '4']
    },
    {
      id: '3',
      title: 'تقلبات أسعار الصرف',
      description: 'تأثير تقلبات أسعار الصرف على الإيرادات والتكاليف',
      category: 'financial',
      severity: 'medium',
      probability: 'high',
      impact: 'medium',
      riskScore: 60,
      status: 'monitored',
      owner: 'المدير المالي',
      identifiedDate: '2024-05-10',
      lastReviewed: '2024-07-30',
      nextReview: '2024-08-30',
      mitigationActions: [
        {
          id: '3',
          title: 'التحوط المالي',
          description: 'استخدام أدوات التحوط المالي لتقليل المخاطر',
          type: 'preventive',
          status: 'planned',
          priority: 'medium',
          assignedTo: 'فريق الخزينة',
          dueDate: '2024-09-15',
          effectiveness: 70,
          cost: 25000
        }
      ],
      indicators: [
        {
          id: '3',
          name: 'تقلب العملة',
          description: 'نسبة تقلب أسعار الصرف',
          type: 'leading',
          currentValue: 5.2,
          threshold: 8.0,
          trend: 'increasing',
          lastUpdated: '2024-08-04',
          frequency: 'daily'
        }
      ],
      relatedRisks: ['5']
    },
    {
      id: '4',
      title: 'عدم الامتثال التنظيمي',
      description: 'خطر عدم الامتثال للوائح والقوانين الجديدة',
      category: 'compliance',
      severity: 'high',
      probability: 'medium',
      impact: 'high',
      riskScore: 72,
      status: 'identified',
      owner: 'مسؤول الامتثال',
      identifiedDate: '2024-08-01',
      lastReviewed: '2024-08-04',
      nextReview: '2024-08-18',
      mitigationActions: [
        {
          id: '4',
          title: 'مراجعة السياسات',
          description: 'مراجعة وتحديث جميع السياسات والإجراءات',
          type: 'corrective',
          status: 'planned',
          priority: 'high',
          assignedTo: 'فريق الامتثال',
          dueDate: '2024-08-25',
          effectiveness: 80,
          cost: 30000
        }
      ],
      indicators: [
        {
          id: '4',
          name: 'معدل الامتثال',
          description: 'نسبة الامتثال للمتطلبات التنظيمية',
          type: 'lagging',
          currentValue: 92,
          threshold: 95,
          trend: 'stable',
          lastUpdated: '2024-08-04',
          frequency: 'monthly'
        }
      ],
      relatedRisks: ['2']
    },
    {
      id: '5',
      title: 'فقدان العملاء الرئيسيين',
      description: 'خطر فقدان العملاء الاستراتيجيين الكبار',
      category: 'strategic',
      severity: 'high',
      probability: 'low',
      impact: 'critical',
      riskScore: 65,
      status: 'assessed',
      owner: 'مدير المبيعات',
      identifiedDate: '2024-06-05',
      lastReviewed: '2024-07-25',
      nextReview: '2024-08-25',
      mitigationActions: [
        {
          id: '5',
          title: 'برنامج إدارة العلاقات',
          description: 'تطوير برنامج شامل لإدارة علاقات العملاء الاستراتيجيين',
          type: 'preventive',
          status: 'in_progress',
          priority: 'high',
          assignedTo: 'فريق المبيعات',
          dueDate: '2024-09-30',
          effectiveness: 75,
          cost: 40000
        }
      ],
      indicators: [
        {
          id: '5',
          name: 'رضا العملاء',
          description: 'مؤشر رضا العملاء الاستراتيجيين',
          type: 'leading',
          currentValue: 8.5,
          threshold: 9.0,
          trend: 'stable',
          lastUpdated: '2024-08-04',
          frequency: 'monthly'
        }
      ],
      relatedRisks: ['3']
    }
  ]);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'strategic': return 'bg-purple-100 text-purple-800';
      case 'compliance': return 'bg-orange-100 text-orange-800';
      case 'technology': return 'bg-red-100 text-red-800';
      case 'reputation': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'operational': return 'تشغيلي';
      case 'financial': return 'مالي';
      case 'strategic': return 'استراتيجي';
      case 'compliance': return 'امتثال';
      case 'technology': return 'تقني';
      case 'reputation': return 'سمعة';
      default: return category;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified': return 'bg-yellow-100 text-yellow-800';
      case 'assessed': return 'bg-blue-100 text-blue-800';
      case 'mitigated': return 'bg-green-100 text-green-800';
      case 'monitored': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'identified': return 'محدد';
      case 'assessed': return 'مقيم';
      case 'mitigated': return 'مخفف';
      case 'monitored': return 'مراقب';
      case 'closed': return 'مغلق';
      default: return status;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-600" />;
      case 'stable': return <Activity className="h-4 w-4 text-gray-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المخاطر</p>
                <p className="text-2xl font-bold text-blue-600">{risks.length}</p>
                <p className="text-xs text-blue-600">
                  {risks.filter(r => r.status === 'identified').length} جديد
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مخاطر حرجة</p>
                <p className="text-2xl font-bold text-red-600">
                  {risks.filter(r => r.severity === 'critical').length}
                </p>
                <p className="text-xs text-red-600">تحتاج اهتمام فوري</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مخاطر مخففة</p>
                <p className="text-2xl font-bold text-green-600">
                  {risks.filter(r => r.status === 'mitigated').length}
                </p>
                <p className="text-xs text-green-600">
                  {Math.round((risks.filter(r => r.status === 'mitigated').length / risks.length) * 100)}% من الإجمالي
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط النقاط</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(risks.reduce((sum, r) => sum + r.riskScore, 0) / risks.length)}
                </p>
                <p className="text-xs text-purple-600">من 100</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المخاطر حسب الفئة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['technology', 'financial', 'strategic', 'compliance', 'operational', 'reputation'].map((category) => {
                const count = risks.filter(r => r.category === category).length;
                const percentage = Math.round((count / risks.length) * 100);
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(category)}>
                        {getCategoryText(category)}
                      </Badge>
                      <span className="text-sm">{count} مخاطر</span>
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
              توزيع المخاطر حسب الشدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['critical', 'high', 'medium', 'low'].map((severity) => {
                const count = risks.filter(r => r.severity === severity).length;
                const percentage = Math.round((count / risks.length) * 100);
                return (
                  <div key={severity} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(severity)}>
                        {getSeverityText(severity)}
                      </Badge>
                      <span className="text-sm">{count} مخاطر</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            severity === 'critical' ? 'bg-red-600' :
                            severity === 'high' ? 'bg-orange-600' :
                            severity === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                          }`}
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
      </div>

      {/* Top Risks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            أهم المخاطر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {risks
              .sort((a, b) => b.riskScore - a.riskScore)
              .slice(0, 3)
              .map((risk) => (
                <div key={risk.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{risk.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getCategoryColor(risk.category)}>
                        {getCategoryText(risk.category)}
                      </Badge>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {getSeverityText(risk.severity)}
                      </Badge>
                      <Badge className={getStatusColor(risk.status)}>
                        {getStatusText(risk.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getRiskScoreColor(risk.riskScore)}`}>
                      {risk.riskScore}
                    </div>
                    <div className="text-xs text-gray-500">نقاط المخاطر</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRisks = () => (
    <div className="space-y-6">
      {/* Risks Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">سجل المخاطر</h2>
          <p className="text-gray-600">إدارة ومتابعة جميع المخاطر المحددة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة مخاطرة
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في المخاطر..."
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
          <option value="technology">تقني</option>
          <option value="financial">مالي</option>
          <option value="strategic">استراتيجي</option>
          <option value="compliance">امتثال</option>
          <option value="operational">تشغيلي</option>
          <option value="reputation">سمعة</option>
        </select>
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">جميع المستويات</option>
          <option value="critical">حرج</option>
          <option value="high">عالي</option>
          <option value="medium">متوسط</option>
          <option value="low">منخفض</option>
        </select>
      </div>

      {/* Risks List */}
      <div className="space-y-4">
        {risks.map((risk) => (
          <Card key={risk.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{risk.title}</h3>
                  <p className="text-gray-600 mt-1">{risk.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>المالك: {risk.owner}</span>
                    <span>تاريخ التحديد: {new Date(risk.identifiedDate).toLocaleDateString('ar-SA')}</span>
                    <span>المراجعة القادمة: {new Date(risk.nextReview).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className={`text-2xl font-bold ${getRiskScoreColor(risk.riskScore)}`}>
                    {risk.riskScore}
                  </div>
                  <div className="text-xs text-gray-500">نقاط المخاطر</div>
                </div>
              </div>
              
              {/* Risk Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">الفئة</Label>
                  <Badge className={getCategoryColor(risk.category)}>
                    {getCategoryText(risk.category)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">الشدة</Label>
                  <Badge className={getSeverityColor(risk.severity)}>
                    {getSeverityText(risk.severity)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">الاحتمالية</Label>
                  <Badge className={getSeverityColor(risk.probability)}>
                    {getSeverityText(risk.probability)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">الحالة</Label>
                  <Badge className={getStatusColor(risk.status)}>
                    {getStatusText(risk.status)}
                  </Badge>
                </div>
              </div>
              
              {/* Mitigation Actions */}
              <div className="mb-4">
                <Label className="text-sm font-medium">إجراءات التخفيف</Label>
                <div className="mt-2 space-y-2">
                  {risk.mitigationActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-sm">{action.title}</h5>
                        <p className="text-xs text-gray-600">{action.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {action.assignedTo}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            موعد الانتهاء: {new Date(action.dueDate).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(action.status)}>
                          {getStatusText(action.status)}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          فعالية: {action.effectiveness}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Risk Indicators */}
              <div className="mb-4">
                <Label className="text-sm font-medium">مؤشرات المخاطر</Label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {risk.indicators.map((indicator) => (
                    <div key={indicator.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm">{indicator.name}</h5>
                        {getTrendIcon(indicator.trend)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {indicator.currentValue}
                          </div>
                          <div className="text-xs text-gray-500">
                            الحد الأدنى: {indicator.threshold}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {indicator.type === 'leading' ? 'مؤشر قائد' : 'مؤشر متأخر'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  إضافة إجراء
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  تحليل
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
            <Shield className="h-8 w-8 text-blue-600" />
            إدارة المخاطر
          </h1>
          <p className="text-gray-600 mt-2">تحديد وتقييم ومراقبة المخاطر المؤسسية</p>
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="risks">سجل المخاطر</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="risks">
          {renderRisks()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskManagement;

