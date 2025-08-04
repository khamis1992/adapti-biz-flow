import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  MapPin, 
  Building, 
  Users,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Map,
  Compass,
  Navigation,
  Plane,
  Car,
  Truck,
  Ship,
  Train,
  Home,
  Store,
  Warehouse,
  Factory,
  Settings,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Download,
  Upload,
  Share,
  Copy,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Star,
  Flag,
  Award,
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Package,
  Box,
  Layers,
  Grid,
  List,
  Table,
  Activity,
  Zap,
  Network,
  Wifi,
  Signal,
  Satellite,
  Radio,
  Tv,
  Monitor,
  Laptop,
  Smartphone,
  Tablet,
  Camera,
  Video,
  Image,
  Music,
  Headphones,
  Mic,
  Volume2,
  Bell,
  BellRing,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  CreditCard,
  Banknote,
  Coins,
  Wallet,
  Receipt,
  Calculator,
  PiggyBank,
  TrendingDown,
  BarChart,
  BarChart2,
  BarChart4,
  BarChart3 as Area,
  BarChart3 as Scatter,
  Radar,
  Donut,
  Gauge,
  Thermometer,
  Battery,
  Fuel,
  Zap as Lightning,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Umbrella,
  Rainbow,
  Sunrise,
  Sunset,
  Mountain,
  Trees,
  Flower,
  Leaf,
  Sprout,
  Sprout as Seedling,
  Apple,
  Cherry,
  Grape,
  Apple as Orange,
  Banana,
  Apple as Strawberry,
  Coffee,
  Wine,
  Beer,
  Milk,
  Egg,
  Fish,
  Beef,
  Beef as Chicken,
  Pizza,
  Sandwich,
  Cake,
  Cookie,
  IceCream,
  Candy,
  Lollipop,
  Donut as DonutIcon,
  Croissant,
  Cookie as Bagel,
  Cookie as Pretzel,
  Popcorn,
  Nut,
  Coffee as Honey,
  Coffee as Jam,
  Cookie as Bread,
  Cookie as Cheese,
  Salad,
  Soup,
  Fish as Sushi,
  Sandwich as Taco,
  Sandwich as Burrito,
  Sandwich as Hotdog,
  Coffee as Fries,
  Popcorn as PopcornIcon
} from 'lucide-react';

interface Region {
  id: string;
  name: string;
  country: string;
  continent: string;
  status: 'active' | 'planning' | 'launching' | 'suspended';
  launchDate: string;
  population: number;
  marketSize: number;
  revenue: number;
  customers: number;
  branches: number;
  employees: number;
  marketShare: number;
  growthRate: number;
  profitability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  currency: string;
  language: string;
  timezone: string;
  manager: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  competitors: string[];
  opportunities: string[];
  challenges: string[];
  regulations: string[];
}

interface ExpansionPlan {
  id: string;
  name: string;
  targetRegion: string;
  status: 'draft' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  timeline: {
    start: string;
    end: string;
    phases: {
      name: string;
      start: string;
      end: string;
      status: string;
      progress: number;
    }[];
  };
  objectives: string[];
  resources: {
    human: number;
    financial: number;
    technical: string[];
  };
  risks: {
    description: string;
    probability: number;
    impact: number;
    mitigation: string;
  }[];
  milestones: {
    name: string;
    date: string;
    status: string;
    description: string;
  }[];
  roi: {
    expected: number;
    actual?: number;
    paybackPeriod: number;
  };
}

interface MarketAnalysis {
  region: string;
  marketSize: number;
  growthRate: number;
  competitorCount: number;
  marketShare: number;
  customerSegments: {
    name: string;
    size: number;
    potential: number;
    characteristics: string[];
  }[];
  trends: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    probability: number;
    description: string;
  }[];
  barriers: {
    type: 'regulatory' | 'cultural' | 'economic' | 'technical';
    description: string;
    severity: number;
    solution: string;
  }[];
}

const GeographicExpansion = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Mock regions data
  const [regions] = useState<Region[]>([
    {
      id: '1',
      name: 'الرياض',
      country: 'السعودية',
      continent: 'آسيا',
      status: 'active',
      launchDate: '2020-01-15',
      population: 7000000,
      marketSize: 50000000000,
      revenue: 25000000,
      customers: 15000,
      branches: 12,
      employees: 180,
      marketShare: 15.5,
      growthRate: 12.3,
      profitability: 18.7,
      riskLevel: 'low',
      currency: 'SAR',
      language: 'العربية',
      timezone: 'GMT+3',
      manager: 'أحمد محمد',
      contact: {
        phone: '+966-11-1234567',
        email: 'riyadh@company.com',
        address: 'شارع الملك فهد، الرياض'
      },
      coordinates: { lat: 24.7136, lng: 46.6753 },
      competitors: ['منافس أ', 'منافس ب', 'منافس ج'],
      opportunities: ['نمو السوق الرقمي', 'رؤية 2030', 'الاستثمار الحكومي'],
      challenges: ['المنافسة الشديدة', 'تكاليف التشغيل', 'نقص المواهب'],
      regulations: ['نظام الشركات', 'لوائح البنك المركزي', 'قوانين العمل']
    },
    {
      id: '2',
      name: 'دبي',
      country: 'الإمارات',
      continent: 'آسيا',
      status: 'active',
      launchDate: '2021-03-10',
      population: 3500000,
      marketSize: 35000000000,
      revenue: 18000000,
      customers: 8500,
      branches: 8,
      employees: 120,
      marketShare: 8.2,
      growthRate: 15.8,
      profitability: 22.1,
      riskLevel: 'low',
      currency: 'AED',
      language: 'العربية/الإنجليزية',
      timezone: 'GMT+4',
      manager: 'فاطمة أحمد',
      contact: {
        phone: '+971-4-1234567',
        email: 'dubai@company.com',
        address: 'شارع الشيخ زايد، دبي'
      },
      coordinates: { lat: 25.2048, lng: 55.2708 },
      competitors: ['منافس د', 'منافس هـ'],
      opportunities: ['مركز تجاري عالمي', 'السياحة', 'التكنولوجيا المالية'],
      challenges: ['تكلفة المعيشة', 'التنوع الثقافي', 'التنظيم المصرفي'],
      regulations: ['قوانين دبي المالية', 'لوائح البنك المركزي', 'قوانين التجارة']
    },
    {
      id: '3',
      name: 'القاهرة',
      country: 'مصر',
      continent: 'أفريقيا',
      status: 'launching',
      launchDate: '2024-09-01',
      population: 20000000,
      marketSize: 25000000000,
      revenue: 0,
      customers: 0,
      branches: 0,
      employees: 25,
      marketShare: 0,
      growthRate: 0,
      profitability: 0,
      riskLevel: 'medium',
      currency: 'EGP',
      language: 'العربية',
      timezone: 'GMT+2',
      manager: 'محمد علي',
      contact: {
        phone: '+20-2-1234567',
        email: 'cairo@company.com',
        address: 'وسط البلد، القاهرة'
      },
      coordinates: { lat: 30.0444, lng: 31.2357 },
      competitors: ['منافس و', 'منافس ز', 'منافس ح', 'منافس ط'],
      opportunities: ['سوق كبير', 'نمو اقتصادي', 'دعم حكومي'],
      challenges: ['عدم الاستقرار الاقتصادي', 'البيروقراطية', 'المنافسة المحلية'],
      regulations: ['قانون البنك المركزي', 'قوانين الاستثمار', 'لوائح الضرائب']
    },
    {
      id: '4',
      name: 'الدوحة',
      country: 'قطر',
      continent: 'آسيا',
      status: 'planning',
      launchDate: '2025-01-15',
      population: 2800000,
      marketSize: 20000000000,
      revenue: 0,
      customers: 0,
      branches: 0,
      employees: 0,
      marketShare: 0,
      growthRate: 0,
      profitability: 0,
      riskLevel: 'low',
      currency: 'QAR',
      language: 'العربية/الإنجليزية',
      timezone: 'GMT+3',
      manager: 'سارة خالد',
      contact: {
        phone: '+974-1234567',
        email: 'doha@company.com',
        address: 'الخليج الغربي، الدوحة'
      },
      coordinates: { lat: 25.2854, lng: 51.5310 },
      competitors: ['منافس ي', 'منافس ك'],
      opportunities: ['اقتصاد قوي', 'استقرار سياسي', 'استثمارات ضخمة'],
      challenges: ['سوق صغير', 'منافسة إقليمية', 'اعتماد على النفط'],
      regulations: ['قوانين مصرف قطر المركزي', 'لوائح الاستثمار', 'قوانين العمل']
    },
    {
      id: '5',
      name: 'الكويت',
      country: 'الكويت',
      continent: 'آسيا',
      status: 'planning',
      launchDate: '2025-06-01',
      population: 4200000,
      marketSize: 18000000000,
      revenue: 0,
      customers: 0,
      branches: 0,
      employees: 0,
      marketShare: 0,
      growthRate: 0,
      profitability: 0,
      riskLevel: 'medium',
      currency: 'KWD',
      language: 'العربية/الإنجليزية',
      timezone: 'GMT+3',
      manager: 'خالد سعد',
      contact: {
        phone: '+965-1234567',
        email: 'kuwait@company.com',
        address: 'مدينة الكويت'
      },
      coordinates: { lat: 29.3117, lng: 47.4818 },
      competitors: ['منافس ل', 'منافس م', 'منافس ن'],
      opportunities: ['ثروة نفطية', 'موقع استراتيجي', 'استقرار اقتصادي'],
      challenges: ['بيروقراطية', 'منافسة محلية', 'تقلبات أسعار النفط'],
      regulations: ['قوانين بنك الكويت المركزي', 'لوائح الاستثمار الأجنبي', 'قوانين الشركات']
    }
  ]);

  // Mock expansion plans
  const [expansionPlans] = useState<ExpansionPlan[]>([
    {
      id: '1',
      name: 'خطة التوسع في مصر',
      targetRegion: 'القاهرة',
      status: 'in_progress',
      priority: 'high',
      budget: 5000000,
      timeline: {
        start: '2024-06-01',
        end: '2024-12-31',
        phases: [
          { name: 'دراسة السوق', start: '2024-06-01', end: '2024-07-15', status: 'completed', progress: 100 },
          { name: 'الحصول على التراخيص', start: '2024-07-16', end: '2024-08-31', status: 'in_progress', progress: 75 },
          { name: 'إعداد الفريق', start: '2024-08-01', end: '2024-09-15', status: 'in_progress', progress: 60 },
          { name: 'الإطلاق التجريبي', start: '2024-09-16', end: '2024-10-31', status: 'pending', progress: 0 },
          { name: 'الإطلاق الكامل', start: '2024-11-01', end: '2024-12-31', status: 'pending', progress: 0 }
        ]
      },
      objectives: [
        'الحصول على 5% من حصة السوق في السنة الأولى',
        'تحقيق 10,000 عميل جديد',
        'فتح 5 فروع في المدن الرئيسية',
        'توظيف 100 موظف محلي'
      ],
      resources: {
        human: 100,
        financial: 5000000,
        technical: ['نظام إدارة العملاء', 'منصة الدفع الإلكتروني', 'تطبيق الجوال']
      },
      risks: [
        {
          description: 'تقلبات سعر الصرف',
          probability: 70,
          impact: 8,
          mitigation: 'استخدام أدوات التحوط المالي'
        },
        {
          description: 'تأخير في الحصول على التراخيص',
          probability: 40,
          impact: 6,
          mitigation: 'العمل مع مستشارين قانونيين محليين'
        },
        {
          description: 'منافسة شديدة من اللاعبين المحليين',
          probability: 80,
          impact: 7,
          mitigation: 'تطوير استراتيجية تسعير تنافسية'
        }
      ],
      milestones: [
        { name: 'إكمال دراسة السوق', date: '2024-07-15', status: 'completed', description: 'تحليل شامل للسوق المصري' },
        { name: 'الحصول على الترخيص الأولي', date: '2024-08-15', status: 'in_progress', description: 'ترخيص مزاولة النشاط' },
        { name: 'توظيف المدير الإقليمي', date: '2024-08-30', status: 'pending', description: 'تعيين مدير العمليات في مصر' },
        { name: 'افتتاح أول فرع', date: '2024-10-01', status: 'pending', description: 'افتتاح الفرع الرئيسي في القاهرة' }
      ],
      roi: {
        expected: 25,
        paybackPeriod: 36
      }
    },
    {
      id: '2',
      name: 'خطة التوسع في قطر',
      targetRegion: 'الدوحة',
      status: 'approved',
      priority: 'medium',
      budget: 3000000,
      timeline: {
        start: '2025-01-01',
        end: '2025-08-31',
        phases: [
          { name: 'دراسة الجدوى', start: '2025-01-01', end: '2025-02-15', status: 'pending', progress: 0 },
          { name: 'الحصول على التراخيص', start: '2025-02-16', end: '2025-04-30', status: 'pending', progress: 0 },
          { name: 'إعداد البنية التحتية', start: '2025-05-01', end: '2025-06-30', status: 'pending', progress: 0 },
          { name: 'الإطلاق', start: '2025-07-01', end: '2025-08-31', status: 'pending', progress: 0 }
        ]
      },
      objectives: [
        'الحصول على 3% من حصة السوق',
        'تحقيق 5,000 عميل جديد',
        'فتح 3 فروع',
        'توظيف 50 موظف'
      ],
      resources: {
        human: 50,
        financial: 3000000,
        technical: ['نظام إدارة العملاء', 'منصة الدفع']
      },
      risks: [
        {
          description: 'تنظيمات صارمة',
          probability: 60,
          impact: 7,
          mitigation: 'التعاون مع مستشارين محليين'
        }
      ],
      milestones: [
        { name: 'إكمال دراسة الجدوى', date: '2025-02-15', status: 'pending', description: 'تحليل السوق القطري' },
        { name: 'الحصول على الترخيص', date: '2025-04-30', status: 'pending', description: 'ترخيص العمل في قطر' }
      ],
      roi: {
        expected: 20,
        paybackPeriod: 42
      }
    }
  ]);

  // Mock market analysis
  const [marketAnalysis] = useState<MarketAnalysis[]>([
    {
      region: 'مصر',
      marketSize: 25000000000,
      growthRate: 8.5,
      competitorCount: 15,
      marketShare: 0,
      customerSegments: [
        {
          name: 'الشركات الكبيرة',
          size: 2000,
          potential: 85,
          characteristics: ['ميزانيات ضخمة', 'احتياجات معقدة', 'عمليات متعددة']
        },
        {
          name: 'الشركات المتوسطة',
          size: 15000,
          potential: 70,
          characteristics: ['نمو سريع', 'مرونة في التطبيق', 'حساسية للسعر']
        },
        {
          name: 'الشركات الصغيرة',
          size: 50000,
          potential: 45,
          characteristics: ['ميزانيات محدودة', 'حلول بسيطة', 'دعم مكثف']
        }
      ],
      trends: [
        {
          name: 'التحول الرقمي',
          impact: 'positive',
          probability: 90,
          description: 'تزايد الطلب على الحلول الرقمية'
        },
        {
          name: 'نمو القطاع المصرفي',
          impact: 'positive',
          probability: 75,
          description: 'توسع الخدمات المصرفية الرقمية'
        },
        {
          name: 'تقلبات اقتصادية',
          impact: 'negative',
          probability: 60,
          description: 'عدم استقرار في الأوضاع الاقتصادية'
        }
      ],
      barriers: [
        {
          type: 'regulatory',
          description: 'تعقيدات في الحصول على التراخيص',
          severity: 7,
          solution: 'التعاون مع مستشارين قانونيين محليين'
        },
        {
          type: 'cultural',
          description: 'مقاومة التغيير في بعض القطاعات',
          severity: 5,
          solution: 'برامج توعية وتدريب مكثفة'
        },
        {
          type: 'economic',
          description: 'تقلبات سعر الصرف',
          severity: 8,
          solution: 'استراتيجيات التحوط المالي'
        }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'launching': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-purple-100 text-purple-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'planning': return 'في التخطيط';
      case 'launching': return 'قيد الإطلاق';
      case 'suspended': return 'معلق';
      case 'completed': return 'مكتمل';
      case 'in_progress': return 'قيد التنفيذ';
      case 'approved': return 'معتمد';
      case 'draft': return 'مسودة';
      case 'cancelled': return 'ملغي';
      case 'pending': return 'في الانتظار';
      default: return status;
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

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'منخفض';
      case 'medium': return 'متوسط';
      case 'high': return 'عالي';
      case 'critical': return 'حرج';
      default: return risk;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency === 'SAR' ? 'SAR' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأسواق</p>
                <p className="text-2xl font-bold text-blue-600">{regions.length}</p>
                <p className="text-xs text-blue-600">
                  {regions.filter(r => r.status === 'active').length} نشط
                </p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(regions.reduce((sum, r) => sum + r.revenue, 0), 'USD')}
                </p>
                <p className="text-xs text-green-600">من جميع الأسواق</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatNumber(regions.reduce((sum, r) => sum + r.customers, 0))}
                </p>
                <p className="text-xs text-purple-600">عبر جميع الأسواق</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">خطط التوسع</p>
                <p className="text-2xl font-bold text-orange-600">{expansionPlans.length}</p>
                <p className="text-xs text-orange-600">
                  {expansionPlans.filter(p => p.status === 'in_progress').length} قيد التنفيذ
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            أداء الأسواق الإقليمية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regions.filter(r => r.status === 'active').map((region) => (
              <div key={region.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-lg">{region.name}</h4>
                    <Badge className={getStatusColor(region.status)}>
                      {getStatusText(region.status)}
                    </Badge>
                    <Badge className={getRiskColor(region.riskLevel)}>
                      {getRiskText(region.riskLevel)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{region.country} - {region.continent}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">الإيرادات:</span>
                      <span className="font-medium ml-2">{formatCurrency(region.revenue, region.currency)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">العملاء:</span>
                      <span className="font-medium ml-2">{formatNumber(region.customers)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">حصة السوق:</span>
                      <span className="font-medium ml-2">{region.marketShare}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">معدل النمو:</span>
                      <span className="font-medium ml-2 text-green-600">+{region.growthRate}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-end">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">الربحية</div>
                    <div className="text-lg font-bold text-green-600">{region.profitability}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">الفروع</div>
                    <div className="text-lg font-bold text-blue-600">{region.branches}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expansion Plans Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            تقدم خطط التوسع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {expansionPlans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{plan.name}</h4>
                    <p className="text-gray-600">الهدف: {plan.targetRegion}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(plan.status)}>
                      {getStatusText(plan.status)}
                    </Badge>
                    <Badge className={getPriorityColor(plan.priority)}>
                      {getPriorityText(plan.priority)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">الميزانية:</span>
                    <span className="font-medium ml-2">{formatCurrency(plan.budget, 'USD')}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">العائد المتوقع:</span>
                    <span className="font-medium ml-2 text-green-600">{plan.roi.expected}%</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">فترة الاسترداد:</span>
                    <span className="font-medium ml-2">{plan.roi.paybackPeriod} شهر</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقدم الإجمالي</span>
                    <span>{Math.round(plan.timeline.phases.reduce((sum, phase) => sum + phase.progress, 0) / plan.timeline.phases.length)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.round(plan.timeline.phases.reduce((sum, phase) => sum + phase.progress, 0) / plan.timeline.phases.length)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium mb-2">المراحل:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {plan.timeline.phases.map((phase, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Badge className={getStatusColor(phase.status)} variant="outline">
                          {getStatusText(phase.status)}
                        </Badge>
                        <span>{phase.name}</span>
                        <span className="text-gray-500">({phase.progress}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRegions = () => (
    <div className="space-y-6">
      {/* Regions Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة الأسواق الإقليمية</h2>
          <p className="text-gray-600">مراقبة وإدارة العمليات في جميع الأسواق</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            سوق جديد
          </Button>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => (
          <Card key={region.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{region.name}</h3>
                  <p className="text-sm text-gray-600">{region.country}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getStatusColor(region.status)}>
                    {getStatusText(region.status)}
                  </Badge>
                  <Badge className={getRiskColor(region.riskLevel)}>
                    {getRiskText(region.riskLevel)}
                  </Badge>
                </div>
              </div>
              
              {/* Region Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>السكان:</span>
                  <span className="font-medium">{formatNumber(region.population)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>حجم السوق:</span>
                  <span className="font-medium">{formatCurrency(region.marketSize, region.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الإيرادات:</span>
                  <span className="font-medium text-green-600">{formatCurrency(region.revenue, region.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>العملاء:</span>
                  <span className="font-medium">{formatNumber(region.customers)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الفروع:</span>
                  <span className="font-medium">{region.branches}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الموظفين:</span>
                  <span className="font-medium">{region.employees}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>حصة السوق:</span>
                  <span className="font-medium text-blue-600">{region.marketShare}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>معدل النمو:</span>
                  <span className="font-medium text-green-600">+{region.growthRate}%</span>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-sm mb-2">معلومات الاتصال</h5>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>المدير: {region.manager}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{region.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span>{region.contact.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  تقارير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderExpansionPlans = () => (
    <div className="space-y-6">
      {/* Plans Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">خطط التوسع</h2>
          <p className="text-gray-600">إدارة ومتابعة خطط التوسع الجغرافي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            خطة جديدة
          </Button>
        </div>
      </div>

      {/* Plans List */}
      <div className="space-y-6">
        {expansionPlans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-3">السوق المستهدف: {plan.targetRegion}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">الميزانية:</span>
                      <span className="font-medium ml-2">{formatCurrency(plan.budget, 'USD')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">العائد المتوقع:</span>
                      <span className="font-medium ml-2 text-green-600">{plan.roi.expected}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">فترة الاسترداد:</span>
                      <span className="font-medium ml-2">{plan.roi.paybackPeriod} شهر</span>
                    </div>
                    <div>
                      <span className="text-gray-500">الموارد البشرية:</span>
                      <span className="font-medium ml-2">{plan.resources.human} موظف</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(plan.status)}>
                    {getStatusText(plan.status)}
                  </Badge>
                  <Badge className={getPriorityColor(plan.priority)}>
                    {getPriorityText(plan.priority)}
                  </Badge>
                </div>
              </div>
              
              {/* Timeline Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">تقدم المراحل</h5>
                  <span className="text-sm text-gray-500">
                    {Math.round(plan.timeline.phases.reduce((sum, phase) => sum + phase.progress, 0) / plan.timeline.phases.length)}% مكتمل
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.round(plan.timeline.phases.reduce((sum, phase) => sum + phase.progress, 0) / plan.timeline.phases.length)}%` 
                    }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plan.timeline.phases.map((phase, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium text-sm">{phase.name}</h6>
                        <Badge className={getStatusColor(phase.status)} variant="outline">
                          {getStatusText(phase.status)}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {new Date(phase.start).toLocaleDateString('ar-SA')} - {new Date(phase.end).toLocaleDateString('ar-SA')}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">التقدم</span>
                        <span className="text-xs font-medium">{phase.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full" 
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Objectives */}
              <div className="mb-6">
                <h5 className="font-medium mb-2">الأهداف</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {plan.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span>{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Risks */}
              <div className="mb-6">
                <h5 className="font-medium mb-2">المخاطر الرئيسية</h5>
                <div className="space-y-2">
                  {plan.risks.slice(0, 2).map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{risk.description}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          احتمالية: {risk.probability}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          تأثير: {risk.impact}/10
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {plan.risks.length > 2 && (
                    <div className="text-sm text-gray-500">
                      +{plan.risks.length - 2} مخاطر أخرى
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير الخطة
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  التقارير
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  الجدولة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMarketAnalysis = () => (
    <div className="space-y-6">
      {/* Analysis Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">تحليل الأسواق</h2>
          <p className="text-gray-600">تحليل شامل للأسواق المستهدفة والفرص المتاحة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث البيانات
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            تحليل جديد
          </Button>
        </div>
      </div>

      {/* Market Analysis Cards */}
      <div className="space-y-6">
        {marketAnalysis.map((analysis, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-xl">{analysis.region}</h3>
                <div className="flex gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    حجم السوق: {formatCurrency(analysis.marketSize, 'USD')}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    نمو: +{analysis.growthRate}%
                  </Badge>
                </div>
              </div>
              
              {/* Market Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(analysis.marketSize, 'USD')}</div>
                  <div className="text-sm text-gray-600">حجم السوق</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analysis.growthRate}%</div>
                  <div className="text-sm text-gray-600">معدل النمو</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{analysis.competitorCount}</div>
                  <div className="text-sm text-gray-600">عدد المنافسين</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{analysis.marketShare}%</div>
                  <div className="text-sm text-gray-600">حصتنا الحالية</div>
                </div>
              </div>
              
              {/* Customer Segments */}
              <div className="mb-6">
                <h5 className="font-medium mb-3">شرائح العملاء</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analysis.customerSegments.map((segment, segIndex) => (
                    <div key={segIndex} className="border border-gray-200 rounded-lg p-4">
                      <h6 className="font-medium mb-2">{segment.name}</h6>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>الحجم:</span>
                          <span className="font-medium">{formatNumber(segment.size)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الإمكانات:</span>
                          <span className="font-medium text-green-600">{segment.potential}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">الخصائص:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {segment.characteristics.map((char, charIndex) => (
                              <Badge key={charIndex} variant="outline" className="text-xs">
                                {char}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Market Trends */}
              <div className="mb-6">
                <h5 className="font-medium mb-3">اتجاهات السوق</h5>
                <div className="space-y-3">
                  {analysis.trends.map((trend, trendIndex) => (
                    <div key={trendIndex} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h6 className="font-medium">{trend.name}</h6>
                        <p className="text-sm text-gray-600 mt-1">{trend.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={
                          trend.impact === 'positive' ? 'bg-green-100 text-green-800' :
                          trend.impact === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {trend.impact === 'positive' ? 'إيجابي' :
                           trend.impact === 'negative' ? 'سلبي' : 'محايد'}
                        </Badge>
                        <Badge variant="outline">
                          {trend.probability}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Market Barriers */}
              <div className="mb-6">
                <h5 className="font-medium mb-3">حواجز الدخول</h5>
                <div className="space-y-3">
                  {analysis.barriers.map((barrier, barrierIndex) => (
                    <div key={barrierIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium">{barrier.description}</h6>
                        <div className="flex gap-2">
                          <Badge className={
                            barrier.type === 'regulatory' ? 'bg-red-100 text-red-800' :
                            barrier.type === 'cultural' ? 'bg-blue-100 text-blue-800' :
                            barrier.type === 'economic' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'
                          }>
                            {barrier.type === 'regulatory' ? 'تنظيمي' :
                             barrier.type === 'cultural' ? 'ثقافي' :
                             barrier.type === 'economic' ? 'اقتصادي' : 'تقني'}
                          </Badge>
                          <Badge variant="outline">
                            شدة: {barrier.severity}/10
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">الحل المقترح:</span> {barrier.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير التحليل
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  تحديث البيانات
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

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            التوسع الجغرافي
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للتوسع في الأسواق الجديدة وتحليل الفرص الاستثمارية</p>
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
          <TabsTrigger value="regions">الأسواق الإقليمية</TabsTrigger>
          <TabsTrigger value="expansion">خطط التوسع</TabsTrigger>
          <TabsTrigger value="analysis">تحليل الأسواق</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="regions">
          {renderRegions()}
        </TabsContent>

        <TabsContent value="expansion">
          {renderExpansionPlans()}
        </TabsContent>

        <TabsContent value="analysis">
          {renderMarketAnalysis()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeographicExpansion;

