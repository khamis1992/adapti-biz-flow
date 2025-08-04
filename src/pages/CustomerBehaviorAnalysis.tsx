import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  Eye,
  ShoppingCart,
  Heart,
  Star,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Globe,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Zap,
  Brain,
  Activity,
  Calendar,
  DollarSign,
  Package,
  Mail,
  Phone,
  MessageSquare,
  Share,
  Bookmark,
  Award,
  Gift,
  Tag,
  Percent,
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
  Database,
  Server,
  Network,
  Shield,
  Lock,
  Key,
  Fingerprint,
  QrCode,
  Scan,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Plus,
  Minus,
  X,
  Check,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  percentage: number;
  avgValue: number;
  avgFrequency: number;
  characteristics: string[];
  behaviors: string[];
  preferences: string[];
  color: string;
}

interface BehaviorPattern {
  id: string;
  name: string;
  description: string;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
  trend: 'increasing' | 'decreasing' | 'stable';
  segments: string[];
  triggers: string[];
  outcomes: string[];
}

interface CustomerJourney {
  id: string;
  name: string;
  stages: JourneyStage[];
  conversionRate: number;
  avgDuration: number;
  dropOffPoints: string[];
  optimizationOpportunities: string[];
}

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  conversionRate: number;
  avgTimeSpent: number;
  commonActions: string[];
  painPoints: string[];
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly';
  priority: 'high' | 'medium' | 'low';
  impact: number;
  confidence: number;
  recommendations: string[];
  dataPoints: any[];
}

const CustomerBehaviorAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  // Mock customer segments
  const [segments] = useState<CustomerSegment[]>([
    {
      id: '1',
      name: 'العملاء المميزون',
      description: 'عملاء عالي القيمة مع ولاء قوي للعلامة التجارية',
      size: 1247,
      percentage: 15.2,
      avgValue: 2850,
      avgFrequency: 8.5,
      characteristics: ['دخل عالي', 'تعليم عالي', 'عمر 35-50'],
      behaviors: ['شراء منتجات مميزة', 'تكرار الشراء', 'إحالة أصدقاء'],
      preferences: ['جودة عالية', 'خدمة مميزة', 'منتجات حصرية'],
      color: '#8B5CF6'
    },
    {
      id: '2',
      name: 'المتسوقون الذكيون',
      description: 'يبحثون عن أفضل العروض والقيمة مقابل المال',
      size: 2156,
      percentage: 26.3,
      avgValue: 485,
      avgFrequency: 3.2,
      characteristics: ['حساسون للسعر', 'يقارنون الأسعار', 'عمر 25-40'],
      behaviors: ['البحث عن العروض', 'مقارنة الأسعار', 'استخدام الكوبونات'],
      preferences: ['أسعار منافسة', 'عروض خاصة', 'شحن مجاني'],
      color: '#10B981'
    },
    {
      id: '3',
      name: 'العملاء الجدد',
      description: 'عملاء حديثو التسجيل يستكشفون المنتجات',
      size: 3421,
      percentage: 41.7,
      avgValue: 125,
      avgFrequency: 1.1,
      characteristics: ['أول مرة', 'متحفظون', 'يحتاجون إرشاد'],
      behaviors: ['تصفح المنتجات', 'قراءة المراجعات', 'شراء منتجات صغيرة'],
      preferences: ['سهولة الاستخدام', 'دعم العملاء', 'ضمان الإرجاع'],
      color: '#F59E0B'
    },
    {
      id: '4',
      name: 'العملاء غير النشطين',
      description: 'عملاء لم يقوموا بشراء لفترة طويلة',
      size: 1376,
      percentage: 16.8,
      avgValue: 0,
      avgFrequency: 0,
      characteristics: ['غير نشطين', 'فقدوا الاهتمام', 'يحتاجون إعادة تفعيل'],
      behaviors: ['عدم فتح الإيميلات', 'عدم زيارة الموقع', 'عدم الشراء'],
      preferences: ['عروض إعادة التفعيل', 'محتوى جديد', 'تحديثات المنتجات'],
      color: '#EF4444'
    }
  ]);

  // Mock behavior patterns
  const [patterns] = useState<BehaviorPattern[]>([
    {
      id: '1',
      name: 'التسوق في عطلة نهاية الأسبوع',
      description: 'زيادة كبيرة في النشاط التسويقي خلال عطلة نهاية الأسبوع',
      frequency: 68,
      impact: 'high',
      trend: 'increasing',
      segments: ['العملاء المميزون', 'المتسوقون الذكيون'],
      triggers: ['وقت فراغ أكثر', 'عروض نهاية الأسبوع'],
      outcomes: ['زيادة المبيعات 45%', 'زيادة متوسط سلة الشراء']
    },
    {
      id: '2',
      name: 'التسوق عبر الجوال',
      description: 'تفضيل متزايد للتسوق عبر التطبيقات المحمولة',
      frequency: 72,
      impact: 'high',
      trend: 'increasing',
      segments: ['العملاء الجدد', 'المتسوقون الذكيون'],
      triggers: ['سهولة الاستخدام', 'إشعارات العروض'],
      outcomes: ['زيادة التحويلات 28%', 'تحسن تجربة المستخدم']
    },
    {
      id: '3',
      name: 'البحث عن المراجعات',
      description: 'قراءة مراجعات المنتجات قبل اتخاذ قرار الشراء',
      frequency: 89,
      impact: 'medium',
      trend: 'stable',
      segments: ['العملاء الجدد', 'المتسوقون الذكيون'],
      triggers: ['عدم اليقين', 'رغبة في التأكد'],
      outcomes: ['زيادة الثقة', 'تقليل المرتجعات']
    }
  ]);

  // Mock customer journey
  const [journey] = useState<CustomerJourney>({
    id: '1',
    name: 'رحلة العميل الأساسية',
    stages: [
      {
        id: '1',
        name: 'الوعي',
        description: 'اكتشاف العلامة التجارية والمنتجات',
        conversionRate: 25,
        avgTimeSpent: 45,
        commonActions: ['زيارة الموقع', 'تصفح المنتجات', 'قراءة المحتوى'],
        painPoints: ['صعوبة العثور على المعلومات', 'بطء تحميل الصفحات']
      },
      {
        id: '2',
        name: 'الاهتمام',
        description: 'إظهار اهتمام بمنتجات محددة',
        conversionRate: 45,
        avgTimeSpent: 120,
        commonActions: ['مقارنة المنتجات', 'قراءة المراجعات', 'إضافة للمفضلة'],
        painPoints: ['نقص المعلومات التقنية', 'عدم وضوح الأسعار']
      },
      {
        id: '3',
        name: 'الرغبة',
        description: 'اتخاذ قرار الشراء وإضافة للسلة',
        conversionRate: 65,
        avgTimeSpent: 180,
        commonActions: ['إضافة للسلة', 'حساب التكلفة', 'البحث عن كوبونات'],
        painPoints: ['رسوم الشحن العالية', 'عملية دفع معقدة']
      },
      {
        id: '4',
        name: 'الإجراء',
        description: 'إتمام عملية الشراء والدفع',
        conversionRate: 78,
        avgTimeSpent: 300,
        commonActions: ['إدخال بيانات الدفع', 'اختيار طريقة الشحن', 'تأكيد الطلب'],
        painPoints: ['مشاكل في الدفع', 'عدم وضوح سياسة الإرجاع']
      },
      {
        id: '5',
        name: 'الاحتفاظ',
        description: 'تجربة ما بعد الشراء والولاء',
        conversionRate: 35,
        avgTimeSpent: 0,
        commonActions: ['تقييم المنتج', 'التواصل مع الدعم', 'إعادة الشراء'],
        painPoints: ['تأخير الشحن', 'صعوبة الإرجاع']
      }
    ],
    conversionRate: 8.2,
    avgDuration: 7.5,
    dropOffPoints: ['صفحة الدفع', 'رسوم الشحن', 'إنشاء الحساب'],
    optimizationOpportunities: [
      'تبسيط عملية الدفع',
      'تقليل رسوم الشحن',
      'تحسين سرعة الموقع',
      'إضافة المزيد من المراجعات'
    ]
  });

  // Mock insights
  const [insights] = useState<Insight[]>([
    {
      id: '1',
      title: 'فرصة زيادة المبيعات للعملاء المميزين',
      description: 'العملاء المميزون يظهرون اهتماماً متزايداً بالمنتجات الجديدة',
      type: 'opportunity',
      priority: 'high',
      impact: 85,
      confidence: 92,
      recommendations: [
        'إطلاق مجموعة منتجات حصرية للعملاء المميزين',
        'تقديم عروض مبكرة للمنتجات الجديدة',
        'إنشاء برنامج ولاء متقدم'
      ],
      dataPoints: []
    },
    {
      id: '2',
      title: 'انخفاض في نشاط العملاء الجدد',
      description: 'معدل تحويل العملاء الجدد انخفض بنسبة 15% في الشهر الماضي',
      type: 'risk',
      priority: 'high',
      impact: 78,
      confidence: 88,
      recommendations: [
        'تحسين تجربة الإعداد الأولي',
        'إضافة دليل تفاعلي للمنتجات',
        'تقديم عروض ترحيبية أكثر جاذبية'
      ],
      dataPoints: []
    },
    {
      id: '3',
      title: 'اتجاه متزايد نحو التسوق المحمول',
      description: 'زيادة 35% في المبيعات عبر التطبيق المحمول خلال 3 أشهر',
      type: 'trend',
      priority: 'medium',
      impact: 65,
      confidence: 95,
      recommendations: [
        'تحسين واجهة التطبيق المحمول',
        'إضافة ميزات حصرية للتطبيق',
        'تطوير إشعارات ذكية مخصصة'
      ],
      dataPoints: []
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Activity className="h-4 w-4 text-gray-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-4 w-4 text-green-600" />;
      case 'risk': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'trend': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'anomaly': return <Zap className="h-4 w-4 text-purple-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'trend': return 'bg-blue-100 text-blue-800';
      case 'anomaly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightTypeText = (type: string) => {
    switch (type) {
      case 'opportunity': return 'فرصة';
      case 'risk': return 'مخاطرة';
      case 'trend': return 'اتجاه';
      case 'anomaly': return 'شذوذ';
      default: return type;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return priority;
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
                <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                <p className="text-2xl font-bold text-blue-600">8,200</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% من الشهر الماضي
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التحويل</p>
                <p className="text-2xl font-bold text-green-600">8.2%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.8% من الشهر الماضي
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط قيمة العميل</p>
                <p className="text-2xl font-bold text-purple-600">1,245 ريال</p>
                <p className="text-xs text-purple-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5% من الشهر الماضي
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الاحتفاظ</p>
                <p className="text-2xl font-bold text-orange-600">76%</p>
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3% من الشهر الماضي
                </p>
              </div>
              <Heart className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            شرائح العملاء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((segment) => (
              <div key={segment.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <h4 className="font-medium">{segment.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{segment.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>العدد:</span>
                    <span className="font-medium">{segment.size.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>النسبة:</span>
                    <span className="font-medium">{segment.percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط القيمة:</span>
                    <span className="font-medium">{segment.avgValue} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التكرار:</span>
                    <span className="font-medium">{segment.avgFrequency}/شهر</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behavior Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              اتجاهات السلوك
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">رسم بياني لاتجاهات سلوك العملاء</p>
                <p className="text-sm text-gray-500">البيانات من آخر 6 أشهر</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              قنوات التفاعل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">التطبيق المحمول</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-green-600" />
                  <span className="text-sm">الموقع الإلكتروني</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">البريد الإلكتروني</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">وسائل التواصل</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <span className="text-sm font-medium">28%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="space-y-6">
      {/* Segments Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">شرائح العملاء</h2>
          <p className="text-gray-600">تحليل مفصل لشرائح العملاء وخصائصهم</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            شريحة جديدة
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            تحليل ذكي
          </Button>
        </div>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segments.map((segment) => (
          <Card key={segment.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                ></div>
                <h3 className="font-semibold text-lg">{segment.name}</h3>
                <Badge variant="secondary">{segment.percentage}%</Badge>
              </div>
              
              <p className="text-gray-600 mb-4">{segment.description}</p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">{segment.size.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">عدد العملاء</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{segment.avgValue}</div>
                  <div className="text-xs text-gray-600">متوسط القيمة (ريال)</div>
                </div>
              </div>
              
              {/* Characteristics */}
              <div className="mb-4">
                <Label className="text-sm font-medium">الخصائص</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {segment.characteristics.map((char, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Behaviors */}
              <div className="mb-4">
                <Label className="text-sm font-medium">السلوكيات</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {segment.behaviors.map((behavior, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {behavior}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Preferences */}
              <div className="mb-4">
                <Label className="text-sm font-medium">التفضيلات</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {segment.preferences.map((pref, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  تفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  استهداف
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

  const renderPatterns = () => (
    <div className="space-y-6">
      {/* Patterns Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">أنماط السلوك</h2>
          <p className="text-gray-600">تحليل الأنماط السلوكية المتكررة للعملاء</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث التحليل
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            اكتشاف أنماط جديدة
          </Button>
        </div>
      </div>

      {/* Patterns List */}
      <div className="space-y-4">
        {patterns.map((pattern) => (
          <Card key={pattern.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{pattern.name}</h3>
                  <p className="text-gray-600 mt-1">{pattern.description}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(pattern.trend)}
                    <Badge className={`${getImpactColor(pattern.impact)} bg-opacity-10`}>
                      تأثير {pattern.impact === 'high' ? 'عالي' : pattern.impact === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    تكرار: {pattern.frequency}%
                  </div>
                </div>
              </div>
              
              {/* Pattern Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">الشرائح المتأثرة</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pattern.segments.map((segment, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">المحفزات</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pattern.triggers.map((trigger, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">النتائج</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pattern.outcomes.map((outcome, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  تفاصيل النمط
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  استراتيجية التسويق
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  تحليل عميق
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderJourney = () => (
    <div className="space-y-6">
      {/* Journey Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">رحلة العميل</h2>
          <p className="text-gray-600">تحليل مفصل لرحلة العميل ونقاط التحسين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            تخصيص الرحلة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            رحلة جديدة
          </Button>
        </div>
      </div>

      {/* Journey Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{journey.name}</CardTitle>
          <CardDescription>
            معدل التحويل الإجمالي: {journey.conversionRate}% | متوسط المدة: {journey.avgDuration} أيام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {journey.stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                <div className="p-4 border border-gray-200 rounded-lg text-center">
                  <h4 className="font-medium mb-2">{stage.name}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {stage.conversionRate}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {stage.avgTimeSpent} ثانية
                  </div>
                </div>
                {index < journey.stages.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Drop-off Points */}
          <div className="mb-6">
            <Label className="text-sm font-medium">نقاط التسرب الرئيسية</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {journey.dropOffPoints.map((point, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {point}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Optimization Opportunities */}
          <div>
            <Label className="text-sm font-medium">فرص التحسين</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {journey.optimizationOpportunities.map((opportunity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {opportunity}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stages */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">تفاصيل المراحل</h3>
        {journey.stages.map((stage) => (
          <Card key={stage.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{stage.name}</h4>
                  <p className="text-gray-600 mt-1">{stage.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{stage.conversionRate}%</div>
                  <div className="text-sm text-gray-500">معدل التحويل</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">الإجراءات الشائعة</Label>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                    {stage.commonActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">نقاط الألم</Label>
                  <ul className="list-disc list-inside text-sm text-red-600 mt-1 space-y-1">
                    {stage.painPoints.map((pain, index) => (
                      <li key={index}>{pain}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      {/* Insights Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الرؤى الذكية</h2>
          <p className="text-gray-600">رؤى مدعومة بالذكاء الاصطناعي لتحسين تجربة العملاء</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث الرؤى
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            تحليل جديد
          </Button>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getInsightTypeIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{insight.title}</h3>
                    <p className="text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getInsightTypeColor(insight.type)}>
                    {getInsightTypeText(insight.type)}
                  </Badge>
                  <Badge className={getPriorityColor(insight.priority)}>
                    أولوية {getPriorityText(insight.priority)}
                  </Badge>
                </div>
              </div>
              
              {/* Impact and Confidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">التأثير المتوقع</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${insight.impact}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{insight.impact}%</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">مستوى الثقة</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="mb-4">
                <Label className="text-sm font-medium">التوصيات</Label>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                  {insight.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  تفاصيل الرؤية
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  تطبيق التوصيات
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  مشاركة
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  حفظ
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
            <Users className="h-8 w-8 text-blue-600" />
            تحليل سلوك العملاء
          </h1>
          <p className="text-gray-600 mt-2">فهم عميق لسلوك العملاء وتفضيلاتهم لتحسين التجربة</p>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="segments">الشرائح</TabsTrigger>
          <TabsTrigger value="patterns">الأنماط</TabsTrigger>
          <TabsTrigger value="journey">رحلة العميل</TabsTrigger>
          <TabsTrigger value="insights">الرؤى الذكية</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="segments">
          {renderSegments()}
        </TabsContent>

        <TabsContent value="patterns">
          {renderPatterns()}
        </TabsContent>

        <TabsContent value="journey">
          {renderJourney()}
        </TabsContent>

        <TabsContent value="insights">
          {renderInsights()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerBehaviorAnalysis;

