import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Languages, 
  FileText, 
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  BarChart3,
  PieChart,
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
  Map,
  Compass,
  Navigation,
  MapPin,
  Calendar,
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
  Info,
  HelpCircle,
  AlertCircle,
  Zap,
  Target,
  Award,
  Shield,
  Lock,
  Key,
  Database,
  Server,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  Headphones,
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
  Camera,
  Video,
  Image,
  Film,
  Music,
  Book,
  BookOpen,
  Newspaper,
  FileImage,
  FileVideo,
  FileAudio,
  Folder,
  FolderOpen,
  Archive,
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
  ExitFullScreen
} from 'lucide-react';

interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  status: 'active' | 'inactive' | 'in_progress' | 'pending';
  completionPercentage: number;
  totalStrings: number;
  translatedStrings: number;
  lastUpdated: string;
  translators: string[];
  regions: string[];
}

interface TranslationProject {
  id: string;
  name: string;
  description: string;
  sourceLanguage: string;
  targetLanguages: string[];
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  progress: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  assignedTranslators: string[];
  totalWords: number;
  translatedWords: number;
  reviewedWords: number;
}

interface TranslationString {
  id: string;
  key: string;
  sourceText: string;
  context: string;
  category: string;
  translations: { [languageCode: string]: Translation };
  lastModified: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'translated' | 'reviewed' | 'approved';
}

interface Translation {
  text: string;
  translator: string;
  reviewedBy?: string;
  status: 'pending' | 'translated' | 'reviewed' | 'approved';
  lastModified: string;
  comments: string[];
}

interface Translator {
  id: string;
  name: string;
  email: string;
  languages: string[];
  specializations: string[];
  rating: number;
  completedProjects: number;
  wordsTranslated: number;
  status: 'active' | 'inactive' | 'busy';
  joinDate: string;
}

const MultiLanguageSupport = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  // Mock languages
  const [languages] = useState<Language[]>([
    {
      id: '1',
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      direction: 'rtl',
      status: 'active',
      completionPercentage: 100,
      totalStrings: 2450,
      translatedStrings: 2450,
      lastUpdated: '2024-08-04T10:00:00',
      translators: ['أحمد محمد', 'فاطمة علي'],
      regions: ['السعودية', 'الإمارات', 'مصر', 'الأردن']
    },
    {
      id: '2',
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      direction: 'ltr',
      status: 'active',
      completionPercentage: 100,
      totalStrings: 2450,
      translatedStrings: 2450,
      lastUpdated: '2024-08-04T09:30:00',
      translators: ['John Smith', 'Sarah Johnson'],
      regions: ['United States', 'United Kingdom', 'Canada', 'Australia']
    },
    {
      id: '3',
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      direction: 'ltr',
      status: 'in_progress',
      completionPercentage: 75,
      totalStrings: 2450,
      translatedStrings: 1838,
      lastUpdated: '2024-08-03T14:20:00',
      translators: ['Marie Dubois', 'Pierre Martin'],
      regions: ['France', 'Canada', 'Belgium', 'Switzerland']
    },
    {
      id: '4',
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      direction: 'ltr',
      status: 'in_progress',
      completionPercentage: 60,
      totalStrings: 2450,
      translatedStrings: 1470,
      lastUpdated: '2024-08-02T16:45:00',
      translators: ['Carlos Rodriguez', 'Ana Garcia'],
      regions: ['Spain', 'Mexico', 'Argentina', 'Colombia']
    },
    {
      id: '5',
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      direction: 'ltr',
      status: 'pending',
      completionPercentage: 0,
      totalStrings: 2450,
      translatedStrings: 0,
      lastUpdated: '2024-08-01T12:00:00',
      translators: [],
      regions: ['Germany', 'Austria', 'Switzerland']
    },
    {
      id: '6',
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      direction: 'ltr',
      status: 'pending',
      completionPercentage: 0,
      totalStrings: 2450,
      translatedStrings: 0,
      lastUpdated: '2024-08-01T12:00:00',
      translators: [],
      regions: ['China', 'Taiwan', 'Hong Kong', 'Singapore']
    }
  ]);

  // Mock translation projects
  const [projects] = useState<TranslationProject[]>([
    {
      id: '1',
      name: 'ترجمة واجهة المستخدم الرئيسية',
      description: 'ترجمة جميع عناصر واجهة المستخدم الأساسية للنظام',
      sourceLanguage: 'ar',
      targetLanguages: ['en', 'fr', 'es'],
      status: 'active',
      progress: 78,
      deadline: '2024-08-15',
      priority: 'high',
      assignedTranslators: ['John Smith', 'Marie Dubois', 'Carlos Rodriguez'],
      totalWords: 15420,
      translatedWords: 12028,
      reviewedWords: 9856
    },
    {
      id: '2',
      name: 'ترجمة وثائق المساعدة',
      description: 'ترجمة دليل المستخدم والأسئلة الشائعة',
      sourceLanguage: 'ar',
      targetLanguages: ['en', 'fr'],
      status: 'in_progress',
      progress: 45,
      deadline: '2024-08-30',
      priority: 'medium',
      assignedTranslators: ['Sarah Johnson', 'Pierre Martin'],
      totalWords: 8750,
      translatedWords: 3938,
      reviewedWords: 2156
    },
    {
      id: '3',
      name: 'ترجمة المحتوى التسويقي',
      description: 'ترجمة المواد التسويقية والإعلانية',
      sourceLanguage: 'ar',
      targetLanguages: ['en', 'es', 'de', 'zh'],
      status: 'pending',
      progress: 0,
      deadline: '2024-09-15',
      priority: 'low',
      assignedTranslators: [],
      totalWords: 5200,
      translatedWords: 0,
      reviewedWords: 0
    }
  ]);

  // Mock translators
  const [translators] = useState<Translator[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      languages: ['ar', 'en'],
      specializations: ['تقنية', 'أعمال', 'قانونية'],
      rating: 4.9,
      completedProjects: 45,
      wordsTranslated: 125000,
      status: 'active',
      joinDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@example.com',
      languages: ['en', 'ar', 'fr'],
      specializations: ['Technical', 'Business', 'Marketing'],
      rating: 4.8,
      completedProjects: 38,
      wordsTranslated: 98000,
      status: 'active',
      joinDate: '2023-03-20'
    },
    {
      id: '3',
      name: 'Marie Dubois',
      email: 'marie@example.com',
      languages: ['fr', 'en', 'ar'],
      specializations: ['Technique', 'Juridique', 'Médical'],
      rating: 4.7,
      completedProjects: 32,
      wordsTranslated: 87500,
      status: 'busy',
      joinDate: '2023-05-10'
    },
    {
      id: '4',
      name: 'Carlos Rodriguez',
      email: 'carlos@example.com',
      languages: ['es', 'en', 'ar'],
      specializations: ['Técnico', 'Negocios', 'Marketing'],
      rating: 4.6,
      completedProjects: 28,
      wordsTranslated: 76000,
      status: 'active',
      joinDate: '2023-07-05'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'busy': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'in_progress': return 'قيد التقدم';
      case 'pending': return 'معلق';
      case 'completed': return 'مكتمل';
      case 'paused': return 'متوقف';
      case 'cancelled': return 'ملغي';
      case 'busy': return 'مشغول';
      default: return status;
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
                <p className="text-sm font-medium text-gray-600">اللغات المدعومة</p>
                <p className="text-2xl font-bold text-blue-600">{languages.length}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2 هذا الشهر
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
                <p className="text-sm font-medium text-gray-600">معدل الإكمال</p>
                <p className="text-2xl font-bold text-green-600">73%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% من الأسبوع الماضي
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
                <p className="text-sm font-medium text-gray-600">المشاريع النشطة</p>
                <p className="text-2xl font-bold text-purple-600">
                  {projects.filter(p => p.status === 'active').length}
                </p>
                <p className="text-xs text-purple-600">
                  {projects.filter(p => p.status === 'in_progress').length} قيد التقدم
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المترجمون النشطون</p>
                <p className="text-2xl font-bold text-orange-600">
                  {translators.filter(t => t.status === 'active').length}
                </p>
                <p className="text-xs text-orange-600">
                  {translators.filter(t => t.status === 'busy').length} مشغول
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Language Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            حالة اللغات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {languages.map((language) => (
              <div key={language.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{language.flag}</div>
                  <div>
                    <h4 className="font-medium">{language.nativeName}</h4>
                    <p className="text-sm text-gray-600">{language.name} ({language.code})</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(language.status)}>
                        {getStatusText(language.status)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {language.direction === 'rtl' ? 'من اليمين لليسار' : 'من اليسار لليمين'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600 mb-1">
                    {language.completionPercentage}%
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${language.completionPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {language.translatedStrings} / {language.totalStrings} نص
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            النشاط الحديث
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">تم إكمال ترجمة الواجهة الفرنسية</p>
                <p className="text-sm text-gray-600">أكمل Marie Dubois ترجمة 150 نص جديد للواجهة الفرنسية</p>
                <p className="text-xs text-gray-500 mt-1">منذ ساعتين - بواسطة Marie Dubois</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">بدء مشروع ترجمة جديد</p>
                <p className="text-sm text-gray-600">تم إنشاء مشروع ترجمة المحتوى التسويقي لـ 4 لغات</p>
                <p className="text-xs text-gray-500 mt-1">منذ 4 ساعات - بواسطة مدير المشروع</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">مراجعة الترجمة الإسبانية</p>
                <p className="text-sm text-gray-600">تم مراجعة وتصحيح 85 نص في الترجمة الإسبانية</p>
                <p className="text-xs text-gray-500 mt-1">أمس - بواسطة Carlos Rodriguez</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLanguages = () => (
    <div className="space-y-6">
      {/* Languages Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة اللغات</h2>
          <p className="text-gray-600">إدارة وتكوين اللغات المدعومة في النظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            استيراد ترجمات
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة لغة
          </Button>
        </div>
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((language) => (
          <Card key={language.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{language.flag}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{language.nativeName}</h3>
                    <p className="text-sm text-gray-600">{language.name}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(language.status)}>
                  {getStatusText(language.status)}
                </Badge>
              </div>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>التقدم</span>
                  <span className="font-medium">{language.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      language.completionPercentage === 100 ? 'bg-green-600' :
                      language.completionPercentage >= 50 ? 'bg-blue-600' : 'bg-yellow-600'
                    }`}
                    style={{ width: `${language.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="font-medium text-blue-600">{language.translatedStrings}</div>
                  <div className="text-gray-600">نص مترجم</div>
                </div>
                <div>
                  <div className="font-medium text-purple-600">{language.translators.length}</div>
                  <div className="text-gray-600">مترجم</div>
                </div>
              </div>
              
              {/* Regions */}
              <div className="mb-4">
                <Label className="text-sm font-medium">المناطق</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {language.regions.slice(0, 3).map((region, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {region}
                    </Badge>
                  ))}
                  {language.regions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{language.regions.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Last Updated */}
              <div className="text-xs text-gray-500 mb-4">
                آخر تحديث: {new Date(language.lastUpdated).toLocaleDateString('ar-SA')}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض
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

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Projects Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مشاريع الترجمة</h2>
          <p className="text-gray-600">إدارة ومتابعة مشاريع الترجمة المختلفة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            مشروع جديد
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      موعد التسليم: {new Date(project.deadline).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.assignedTranslators.length} مترجم
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {project.totalWords.toLocaleString()} كلمة
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusText(project.status)}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    أولوية {getPriorityText(project.priority)}
                  </Badge>
                </div>
              </div>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>التقدم الإجمالي</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Languages */}
              <div className="mb-4">
                <Label className="text-sm font-medium">اللغات المستهدفة</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    المصدر: {project.sourceLanguage}
                  </Badge>
                  {project.targetLanguages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {project.translatedWords.toLocaleString()}
                  </div>
                  <div className="text-xs text-blue-600">كلمة مترجمة</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {project.reviewedWords.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600">كلمة مراجعة</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {project.assignedTranslators.length}
                  </div>
                  <div className="text-xs text-purple-600">مترجم مكلف</div>
                </div>
              </div>
              
              {/* Assigned Translators */}
              <div className="mb-4">
                <Label className="text-sm font-medium">المترجمون المكلفون</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.assignedTranslators.map((translator, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {translator}
                    </Badge>
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
                  تحرير المشروع
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  إدارة الفريق
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTranslators = () => (
    <div className="space-y-6">
      {/* Translators Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المترجمين</h2>
          <p className="text-gray-600">إدارة فريق المترجمين وتتبع أدائهم</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            البحث عن مترجمين
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة مترجم
          </Button>
        </div>
      </div>

      {/* Translators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {translators.map((translator) => (
          <Card key={translator.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{translator.name}</h3>
                  <p className="text-sm text-gray-600">{translator.email}</p>
                </div>
                <Badge className={getStatusColor(translator.status)}>
                  {getStatusText(translator.status)}
                </Badge>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(translator.rating) 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{translator.rating}</span>
              </div>
              
              {/* Languages */}
              <div className="mb-4">
                <Label className="text-sm font-medium">اللغات</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {translator.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Specializations */}
              <div className="mb-4">
                <Label className="text-sm font-medium">التخصصات</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {translator.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="font-medium text-blue-600">{translator.completedProjects}</div>
                  <div className="text-gray-600">مشروع مكتمل</div>
                </div>
                <div>
                  <div className="font-medium text-green-600">
                    {translator.wordsTranslated.toLocaleString()}
                  </div>
                  <div className="text-gray-600">كلمة مترجمة</div>
                </div>
              </div>
              
              {/* Join Date */}
              <div className="text-xs text-gray-500 mb-4">
                انضم في: {new Date(translator.joinDate).toLocaleDateString('ar-SA')}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  الملف الشخصي
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  مراسلة
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

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            دعم اللغات المتعددة
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للغات والترجمات في النظام</p>
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
          <TabsTrigger value="languages">اللغات</TabsTrigger>
          <TabsTrigger value="projects">المشاريع</TabsTrigger>
          <TabsTrigger value="translators">المترجمون</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="languages">
          {renderLanguages()}
        </TabsContent>

        <TabsContent value="projects">
          {renderProjects()}
        </TabsContent>

        <TabsContent value="translators">
          {renderTranslators()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiLanguageSupport;

