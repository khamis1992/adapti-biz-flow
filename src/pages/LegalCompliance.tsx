import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scale, 
  FileText, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Building,
  Users,
  DollarSign,
  Globe,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Search,
  Filter,
  Bell,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Briefcase,
  BookOpen,
  Gavel,
  ScrollText,
  Award as Certificate,
  Lock,
  Key,
  Database,
  Server,
  Monitor,
  Smartphone,
  Wifi,
  HardDrive,
  Network,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Zap,
  Brain,
  Lightbulb,
  Info,
  HelpCircle,
  MessageSquare,
  Share,
  Bookmark,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  X,
  Check,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react';

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  category: 'tax' | 'labor' | 'commercial' | 'data_protection' | 'financial' | 'environmental' | 'health_safety';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'compliant' | 'non_compliant' | 'pending' | 'under_review';
  dueDate: string;
  lastReviewed: string;
  assignedTo: string;
  documents: string[];
  actions: string[];
  riskLevel: number;
}

interface LegalDocument {
  id: string;
  title: string;
  type: 'license' | 'permit' | 'certificate' | 'contract' | 'policy' | 'procedure';
  category: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending_renewal' | 'cancelled';
  issuingAuthority: string;
  documentNumber: string;
  renewalRequired: boolean;
  reminderDays: number;
  attachments: string[];
}

interface Audit {
  id: string;
  title: string;
  type: 'internal' | 'external' | 'regulatory' | 'compliance';
  auditor: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scope: string[];
  findings: AuditFinding[];
  recommendations: string[];
  followUpRequired: boolean;
  nextAuditDate?: string;
}

interface AuditFinding {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  status: 'open' | 'in_progress' | 'resolved' | 'accepted_risk';
  assignedTo: string;
  dueDate: string;
}

const LegalCompliance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock compliance requirements
  const [requirements] = useState<ComplianceRequirement[]>([
    {
      id: '1',
      title: 'تسجيل ضريبة القيمة المضافة',
      description: 'التأكد من تسجيل الشركة في نظام ضريبة القيمة المضافة وتقديم الإقرارات الدورية',
      category: 'tax',
      priority: 'critical',
      status: 'compliant',
      dueDate: '2024-08-15',
      lastReviewed: '2024-07-15',
      assignedTo: 'قسم المحاسبة',
      documents: ['شهادة التسجيل الضريبي', 'آخر إقرار ضريبي'],
      actions: ['تقديم الإقرار الشهري', 'مراجعة الفواتير'],
      riskLevel: 95
    },
    {
      id: '2',
      title: 'تراخيص العمل للموظفين الأجانب',
      description: 'التأكد من صحة وسريان تراخيص العمل لجميع الموظفين الأجانب',
      category: 'labor',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-08-30',
      lastReviewed: '2024-07-01',
      assignedTo: 'قسم الموارد البشرية',
      documents: ['تراخيص العمل', 'جوازات السفر', 'الإقامات'],
      actions: ['تجديد التراخيص المنتهية', 'متابعة الطلبات الجديدة'],
      riskLevel: 78
    },
    {
      id: '3',
      title: 'حماية البيانات الشخصية',
      description: 'الامتثال لقانون حماية البيانات الشخصية وضمان أمان معلومات العملاء',
      category: 'data_protection',
      priority: 'high',
      status: 'under_review',
      dueDate: '2024-09-01',
      lastReviewed: '2024-07-20',
      assignedTo: 'قسم تقنية المعلومات',
      documents: ['سياسة الخصوصية', 'إجراءات حماية البيانات'],
      actions: ['تحديث سياسة الخصوصية', 'تدريب الموظفين'],
      riskLevel: 85
    },
    {
      id: '4',
      title: 'السجل التجاري',
      description: 'تجديد السجل التجاري وتحديث البيانات حسب المطلوب',
      category: 'commercial',
      priority: 'medium',
      status: 'compliant',
      dueDate: '2024-12-31',
      lastReviewed: '2024-06-15',
      assignedTo: 'الشؤون القانونية',
      documents: ['السجل التجاري', 'شهادة التأسيس'],
      actions: ['مراجعة البيانات', 'تحديث النشاطات'],
      riskLevel: 60
    }
  ]);

  // Mock legal documents
  const [documents] = useState<LegalDocument[]>([
    {
      id: '1',
      title: 'السجل التجاري',
      type: 'license',
      category: 'تجاري',
      issueDate: '2023-01-15',
      expiryDate: '2024-12-31',
      status: 'active',
      issuingAuthority: 'وزارة التجارة',
      documentNumber: 'CR-2023-001234',
      renewalRequired: true,
      reminderDays: 60,
      attachments: ['commercial_register.pdf']
    },
    {
      id: '2',
      title: 'شهادة التسجيل الضريبي',
      type: 'certificate',
      category: 'ضريبي',
      issueDate: '2023-02-01',
      expiryDate: '2025-01-31',
      status: 'active',
      issuingAuthority: 'هيئة الزكاة والضريبة والجمارك',
      documentNumber: 'TAX-2023-567890',
      renewalRequired: true,
      reminderDays: 90,
      attachments: ['tax_certificate.pdf']
    },
    {
      id: '3',
      title: 'رخصة البلدية',
      type: 'license',
      category: 'بلدي',
      issueDate: '2024-01-01',
      expiryDate: '2024-08-15',
      status: 'pending_renewal',
      issuingAuthority: 'أمانة المنطقة',
      documentNumber: 'MUN-2024-112233',
      renewalRequired: true,
      reminderDays: 30,
      attachments: ['municipal_license.pdf']
    }
  ]);

  // Mock audits
  const [audits] = useState<Audit[]>([
    {
      id: '1',
      title: 'مراجعة الامتثال الضريبي',
      type: 'external',
      auditor: 'شركة المراجعة المعتمدة',
      startDate: '2024-07-01',
      endDate: '2024-07-15',
      status: 'completed',
      scope: ['ضريبة القيمة المضافة', 'ضريبة الدخل', 'الزكاة'],
      findings: [
        {
          id: '1',
          title: 'تأخير في تقديم إقرار يونيو',
          severity: 'medium',
          description: 'تم تقديم إقرار ضريبة القيمة المضافة لشهر يونيو بتأخير يومين',
          recommendation: 'تحسين عملية المراجعة الداخلية وتحديد مواعيد ثابتة للتقديم',
          status: 'resolved',
          assignedTo: 'قسم المحاسبة',
          dueDate: '2024-08-01'
        }
      ],
      recommendations: [
        'تطوير نظام تذكير آلي للمواعيد الضريبية',
        'تدريب فريق المحاسبة على التحديثات القانونية'
      ],
      followUpRequired: true,
      nextAuditDate: '2025-01-01'
    },
    {
      id: '2',
      title: 'مراجعة أمان البيانات',
      type: 'internal',
      auditor: 'فريق الأمان الداخلي',
      startDate: '2024-08-01',
      endDate: '2024-08-10',
      status: 'in_progress',
      scope: ['حماية البيانات الشخصية', 'أمان الشبكة', 'النسخ الاحتياطية'],
      findings: [],
      recommendations: [],
      followUpRequired: false
    }
  ]);

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'tax': return 'ضريبي';
      case 'labor': return 'عمالي';
      case 'commercial': return 'تجاري';
      case 'data_protection': return 'حماية البيانات';
      case 'financial': return 'مالي';
      case 'environmental': return 'بيئي';
      case 'health_safety': return 'الصحة والسلامة';
      default: return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical': return 'حرج';
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending_renewal': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'compliant': return 'ملتزم';
      case 'non_compliant': return 'غير ملتزم';
      case 'pending': return 'معلق';
      case 'under_review': return 'قيد المراجعة';
      case 'active': return 'نشط';
      case 'expired': return 'منتهي الصلاحية';
      case 'pending_renewal': return 'يحتاج تجديد';
      case 'cancelled': return 'ملغي';
      case 'scheduled': return 'مجدول';
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      default: return status;
    }
  };

  const getDocumentTypeText = (type: string) => {
    switch (type) {
      case 'license': return 'رخصة';
      case 'permit': return 'تصريح';
      case 'certificate': return 'شهادة';
      case 'contract': return 'عقد';
      case 'policy': return 'سياسة';
      case 'procedure': return 'إجراء';
      default: return type;
    }
  };

  const getAuditTypeText = (type: string) => {
    switch (type) {
      case 'internal': return 'داخلي';
      case 'external': return 'خارجي';
      case 'regulatory': return 'تنظيمي';
      case 'compliance': return 'امتثال';
      default: return type;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'حرج';
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return severity;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الامتثال</p>
                <p className="text-2xl font-bold text-green-600">94%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2% من الشهر الماضي
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
                <p className="text-sm font-medium text-gray-600">المتطلبات النشطة</p>
                <p className="text-2xl font-bold text-blue-600">24</p>
                <p className="text-xs text-blue-600">
                  3 عالية الأولوية
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الوثائق المنتهية</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
                <p className="text-xs text-orange-600">
                  تحتاج تجديد فوري
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المراجعات المكتملة</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-xs text-purple-600">
                  هذا العام
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Status Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع حالة الامتثال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">ملتزم</span>
                </div>
                <span className="text-sm font-medium">18 (75%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">معلق</span>
                </div>
                <span className="text-sm font-medium">4 (17%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">قيد المراجعة</span>
                </div>
                <span className="text-sm font-medium">2 (8%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              المتطلبات حسب الفئة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">ضريبي</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">عمالي</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium">6</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">تجاري</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm font-medium">4</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">حماية البيانات</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-sm font-medium">5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            الأنشطة الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">تم تجديد السجل التجاري</p>
                <p className="text-sm text-gray-600">تم تجديد السجل التجاري بنجاح لمدة عام إضافي</p>
                <p className="text-xs text-gray-500 mt-1">منذ ساعتين - بواسطة الشؤون القانونية</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">بدء مراجعة أمان البيانات</p>
                <p className="text-sm text-gray-600">بدأت عملية المراجعة الداخلية لأنظمة حماية البيانات</p>
                <p className="text-xs text-gray-500 mt-1">منذ 4 ساعات - بواسطة فريق الأمان</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">تذكير تجديد رخصة البلدية</p>
                <p className="text-sm text-gray-600">رخصة البلدية تنتهي خلال 15 يوم وتحتاج تجديد</p>
                <p className="text-xs text-gray-500 mt-1">أمس - تذكير آلي</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-6">
      {/* Requirements Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">متطلبات الامتثال</h2>
          <p className="text-gray-600">إدارة ومتابعة جميع متطلبات الامتثال القانوني</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            استيراد
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            متطلب جديد
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المتطلبات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">جميع الفئات</option>
                <option value="tax">ضريبي</option>
                <option value="labor">عمالي</option>
                <option value="commercial">تجاري</option>
                <option value="data_protection">حماية البيانات</option>
                <option value="financial">مالي</option>
                <option value="environmental">بيئي</option>
                <option value="health_safety">الصحة والسلامة</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements List */}
      <div className="space-y-4">
        {requirements.map((requirement) => (
          <Card key={requirement.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{requirement.title}</h3>
                  <p className="text-gray-600 mt-1">{requirement.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      استحقاق: {new Date(requirement.dueDate).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {requirement.assignedTo}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      آخر مراجعة: {new Date(requirement.lastReviewed).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(requirement.status)}>
                    {getStatusText(requirement.status)}
                  </Badge>
                  <Badge className={getPriorityColor(requirement.priority)}>
                    {getPriorityText(requirement.priority)}
                  </Badge>
                  <Badge variant="secondary">
                    {getCategoryText(requirement.category)}
                  </Badge>
                </div>
              </div>

              {/* Risk Level */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>مستوى المخاطر</span>
                  <span className="font-medium">{requirement.riskLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      requirement.riskLevel >= 80 ? 'bg-red-600' :
                      requirement.riskLevel >= 60 ? 'bg-orange-600' :
                      requirement.riskLevel >= 40 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${requirement.riskLevel}%` }}
                  ></div>
                </div>
              </div>

              {/* Documents and Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">الوثائق المطلوبة</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {requirement.documents.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">الإجراءات المطلوبة</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {requirement.actions.map((action, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحديث الحالة
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  الوثائق
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  تذكير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Documents Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الوثائق القانونية</h2>
          <p className="text-gray-600">إدارة جميع الوثائق والتراخيص القانونية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            رفع وثيقة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            وثيقة جديدة
          </Button>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((document) => (
          <Card key={document.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{document.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      رقم الوثيقة: {document.documentNumber}
                    </p>
                    <p className="text-gray-600 text-sm">
                      الجهة المصدرة: {document.issuingAuthority}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(document.status)}>
                    {getStatusText(document.status)}
                  </Badge>
                  <Badge variant="secondary">
                    {getDocumentTypeText(document.type)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">تاريخ الإصدار</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(document.issueDate).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">تاريخ الانتهاء</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(document.expiryDate).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">أيام التذكير</Label>
                  <p className="text-sm text-gray-600">
                    {document.reminderDays} يوم قبل الانتهاء
                  </p>
                </div>
              </div>

              {/* Expiry Warning */}
              {document.status === 'pending_renewal' && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      تحذير: هذه الوثيقة تحتاج تجديد فوري
                    </span>
                  </div>
                </div>
              )}

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
                  تجديد
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  تذكير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAudits = () => (
    <div className="space-y-6">
      {/* Audits Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">المراجعات والتدقيق</h2>
          <p className="text-gray-600">إدارة عمليات المراجعة والتدقيق الداخلية والخارجية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            جدولة مراجعة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            مراجعة جديدة
          </Button>
        </div>
      </div>

      {/* Audits List */}
      <div className="space-y-4">
        {audits.map((audit) => (
          <Card key={audit.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{audit.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    المدقق: {audit.auditor}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(audit.startDate).toLocaleDateString('ar-SA')} - {new Date(audit.endDate).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gavel className="h-3 w-3" />
                      {getAuditTypeText(audit.type)}
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(audit.status)}>
                  {getStatusText(audit.status)}
                </Badge>
              </div>

              {/* Scope */}
              <div className="mb-4">
                <Label className="text-sm font-medium">نطاق المراجعة</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {audit.scope.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Findings */}
              {audit.findings.length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium">النتائج والملاحظات</Label>
                  <div className="space-y-2 mt-2">
                    {audit.findings.map((finding) => (
                      <div key={finding.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-sm">{finding.title}</h5>
                          <Badge className={getSeverityColor(finding.severity)}>
                            {getSeverityText(finding.severity)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{finding.description}</p>
                        <p className="text-xs text-blue-600">التوصية: {finding.recommendation}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>مسند إلى: {finding.assignedTo}</span>
                          <Badge className={getStatusColor(finding.status)}>
                            {getStatusText(finding.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {audit.recommendations.length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium">التوصيات</Label>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                    {audit.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  التقرير
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحديث
                </Button>
                {audit.followUpRequired && (
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    متابعة
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
            <Scale className="h-8 w-8 text-blue-600" />
            الامتثال القانوني
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للامتثال القانوني والتنظيمي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تقرير شامل
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="requirements">المتطلبات</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
          <TabsTrigger value="audits">المراجعات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="requirements">
          {renderRequirements()}
        </TabsContent>

        <TabsContent value="documents">
          {renderDocuments()}
        </TabsContent>

        <TabsContent value="audits">
          {renderAudits()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalCompliance;

