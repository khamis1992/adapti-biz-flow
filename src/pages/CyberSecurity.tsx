import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Key,
  Fingerprint,
  Smartphone,
  Globe,
  Server,
  Database,
  FileText,
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  MapPin,
  Wifi,
  Monitor,
  HardDrive,
  Network,
  Zap,
  Bug,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Bell,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'data_access' | 'system_change' | 'threat_detected' | 'vulnerability' | 'breach_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  source: string;
  user?: string;
  ipAddress: string;
  location: string;
  status: 'active' | 'resolved' | 'investigating' | 'false_positive';
  actions: string[];
}

interface SecurityMetric {
  name: string;
  value: number;
  change: number;
  status: 'good' | 'warning' | 'danger';
  icon: React.ReactNode;
}

interface VulnerabilityReport {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  affectedSystems: string[];
  discoveredDate: string;
  status: 'open' | 'in_progress' | 'resolved' | 'accepted_risk';
  cvssScore: number;
  remediation: string;
}

const CyberSecurity = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock security events
  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'threat_detected',
      severity: 'high',
      title: 'محاولة اختراق مشبوهة',
      description: 'تم اكتشاف محاولات دخول متعددة فاشلة من عنوان IP مشبوه',
      timestamp: '2024-08-04T15:30:00',
      source: 'Firewall',
      ipAddress: '192.168.1.100',
      location: 'الرياض، السعودية',
      status: 'investigating',
      actions: ['حظر IP', 'تحليل السجلات', 'إشعار الفريق']
    },
    {
      id: '2',
      type: 'login_attempt',
      severity: 'medium',
      title: 'محاولة دخول من موقع جديد',
      description: 'محاولة دخول من عنوان IP جديد للمستخدم admin@company.com',
      timestamp: '2024-08-04T14:15:00',
      source: 'Authentication System',
      user: 'admin@company.com',
      ipAddress: '203.0.113.45',
      location: 'جدة، السعودية',
      status: 'resolved',
      actions: ['تأكيد الهوية', 'تسجيل النشاط']
    },
    {
      id: '3',
      type: 'vulnerability',
      severity: 'critical',
      title: 'ثغرة أمنية في النظام',
      description: 'تم اكتشاف ثغرة أمنية عالية الخطورة في مكتبة JavaScript',
      timestamp: '2024-08-04T12:00:00',
      source: 'Vulnerability Scanner',
      ipAddress: 'N/A',
      location: 'النظام الداخلي',
      status: 'active',
      actions: ['تحديث المكتبة', 'تطبيق التصحيح', 'اختبار الأمان']
    }
  ]);

  // Mock vulnerabilities
  const [vulnerabilities] = useState<VulnerabilityReport[]>([
    {
      id: 'CVE-2024-001',
      title: 'ثغرة في نظام المصادقة',
      severity: 'critical',
      category: 'Authentication',
      description: 'ثغرة تسمح بتجاوز نظام المصادقة في ظروف معينة',
      affectedSystems: ['Web Application', 'API Gateway'],
      discoveredDate: '2024-08-01',
      status: 'in_progress',
      cvssScore: 9.1,
      remediation: 'تحديث مكتبة المصادقة إلى الإصدار الأحدث'
    },
    {
      id: 'CVE-2024-002',
      title: 'ثغرة XSS في واجهة المستخدم',
      severity: 'high',
      category: 'Web Security',
      description: 'إمكانية تنفيذ كود JavaScript ضار عبر حقول الإدخال',
      affectedSystems: ['Frontend Application'],
      discoveredDate: '2024-07-28',
      status: 'resolved',
      cvssScore: 7.4,
      remediation: 'تطبيق فلترة وتنظيف البيانات المدخلة'
    }
  ]);

  // Security metrics
  const securityMetrics: SecurityMetric[] = [
    {
      name: 'محاولات الاختراق المحظورة',
      value: 1247,
      change: -12,
      status: 'good',
      icon: <Shield className="h-6 w-6" />
    },
    {
      name: 'الثغرات الأمنية النشطة',
      value: 3,
      change: -2,
      status: 'warning',
      icon: <Bug className="h-6 w-6" />
    },
    {
      name: 'نقاط الضعف عالية الخطورة',
      value: 1,
      change: 0,
      status: 'danger',
      icon: <AlertTriangle className="h-6 w-6" />
    },
    {
      name: 'معدل الأمان العام',
      value: 94,
      change: 2,
      status: 'good',
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'accepted_risk': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'resolved': return 'محلول';
      case 'investigating': return 'قيد التحقيق';
      case 'false_positive': return 'إنذار كاذب';
      case 'in_progress': return 'قيد المعالجة';
      case 'accepted_risk': return 'مخاطرة مقبولة';
      case 'open': return 'مفتوح';
      default: return status;
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderSecurityDashboard = () => (
    <div className="space-y-6">
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
                  <p className={`text-xs flex items-center gap-1 ${getMetricStatusColor(metric.status)}`}>
                    {metric.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(metric.change)}% من الأسبوع الماضي
                  </p>
                </div>
                <div className={getMetricStatusColor(metric.status)}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              التهديدات الأمنية (آخر 7 أيام)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">محاولات اختراق</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-medium">156</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">محاولات دخول مشبوهة</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">89</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">برمجيات خبيثة</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">انتهاكات البيانات</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-sm font-medium">0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الثغرات الأمنية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">حرجة</span>
                </div>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">عالية</span>
                </div>
                <span className="text-sm font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">متوسطة</span>
                </div>
                <span className="text-sm font-medium">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">منخفضة</span>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            الأحداث الأمنية الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <Badge className={getSeverityColor(event.severity)}>
                    {getSeverityText(event.severity)}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(event.timestamp).toLocaleString('ar-SA')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {event.ipAddress}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Badge className={getStatusColor(event.status)}>
                    {getStatusText(event.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderThreatMonitoring = () => (
    <div className="space-y-6">
      {/* Real-time Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              مراقبة الشبكة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">حركة البيانات</span>
                <span className="text-sm font-medium text-green-600">طبيعية</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">الاتصالات المشبوهة</span>
                <span className="text-sm font-medium text-red-600">3 محظورة</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">معدل البيانات</span>
                <span className="text-sm font-medium">2.4 GB/s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              مراقبة الخوادم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">استخدام المعالج</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">استخدام الذاكرة</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">مساحة القرص</span>
                <span className="text-sm font-medium text-yellow-600">82%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              مراقبة قواعد البيانات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">الاستعلامات النشطة</span>
                <span className="text-sm font-medium">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">محاولات الوصول</span>
                <span className="text-sm font-medium text-green-600">مصرح بها</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">النسخ الاحتياطية</span>
                <span className="text-sm font-medium text-green-600">محدثة</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            استخبارات التهديدات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">التهديدات الناشئة</h4>
              <div className="space-y-2">
                <div className="p-3 border border-red-200 bg-red-50 rounded">
                  <p className="text-sm font-medium text-red-800">برمجية خبيثة جديدة</p>
                  <p className="text-xs text-red-600">تستهدف أنظمة ERP</p>
                </div>
                <div className="p-3 border border-orange-200 bg-orange-50 rounded">
                  <p className="text-sm font-medium text-orange-800">حملة تصيد إلكتروني</p>
                  <p className="text-xs text-orange-600">تستهدف الشركات السعودية</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">مؤشرات الاختراق (IOCs)</h4>
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 rounded">
                  <p className="text-sm font-medium">عناوين IP مشبوهة</p>
                  <p className="text-xs text-gray-600 font-mono">192.168.1.100, 203.0.113.45</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <p className="text-sm font-medium">نطاقات ضارة</p>
                  <p className="text-xs text-gray-600 font-mono">malicious-domain.com</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVulnerabilityManagement = () => (
    <div className="space-y-6">
      {/* Vulnerability Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">1</div>
            <div className="text-sm text-gray-600">ثغرات حرجة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
            <div className="text-sm text-gray-600">ثغرات عالية</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">5</div>
            <div className="text-sm text-gray-600">ثغرات متوسطة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">12</div>
            <div className="text-sm text-gray-600">ثغرات منخفضة</div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerability List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>تقارير الثغرات الأمنية</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                فحص جديد
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{vuln.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{vuln.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>ID: {vuln.id}</span>
                      <span>CVSS: {vuln.cvssScore}</span>
                      <span>اكتُشفت: {new Date(vuln.discoveredDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={getSeverityColor(vuln.severity)}>
                      {getSeverityText(vuln.severity)}
                    </Badge>
                    <Badge className={getStatusColor(vuln.status)}>
                      {getStatusText(vuln.status)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium">الأنظمة المتأثرة</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vuln.affectedSystems.map((system, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">خطة المعالجة</Label>
                    <p className="text-sm text-gray-600 mt-1">{vuln.remediation}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    إدارة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccessControl = () => (
    <div className="space-y-6">
      {/* Access Control Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              المستخدمون النشطون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">247</div>
            <div className="text-sm text-gray-600">مستخدم متصل حالياً</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>مديرون</span>
                <span>12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>موظفون</span>
                <span>198</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>عملاء</span>
                <span>37</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              الصلاحيات والأدوار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">مدير النظام</span>
                <Badge variant="secondary">5 مستخدمين</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">مدير المبيعات</span>
                <Badge variant="secondary">12 مستخدم</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">موظف</span>
                <Badge variant="secondary">198 مستخدم</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">عميل</span>
                <Badge variant="secondary">1,247 مستخدم</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5" />
              المصادقة المتعددة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">مفعل</span>
                <span className="text-sm font-medium text-green-600">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS</span>
                <span className="text-sm">156 مستخدم</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">تطبيق المصادقة</span>
                <span className="text-sm">89 مستخدم</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">البصمة</span>
                <span className="text-sm">23 مستخدم</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            إدارة الجلسات النشطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">أحمد محمد</p>
                  <p className="text-sm text-gray-600">admin@company.com</p>
                  <p className="text-xs text-gray-500">192.168.1.50 - الرياض</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">متصل منذ 2 ساعة</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">فاطمة علي</p>
                  <p className="text-sm text-gray-600">fatima@company.com</p>
                  <p className="text-xs text-gray-500">203.0.113.45 - جدة</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">متصلة منذ 45 دقيقة</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
            <Shield className="h-8 w-8 text-blue-600" />
            الأمان السيبراني
          </h1>
          <p className="text-gray-600 mt-2">مراقبة وحماية شاملة للنظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="threats">مراقبة التهديدات</TabsTrigger>
          <TabsTrigger value="vulnerabilities">إدارة الثغرات</TabsTrigger>
          <TabsTrigger value="access">التحكم في الوصول</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderSecurityDashboard()}
        </TabsContent>

        <TabsContent value="threats">
          {renderThreatMonitoring()}
        </TabsContent>

        <TabsContent value="vulnerabilities">
          {renderVulnerabilityManagement()}
        </TabsContent>

        <TabsContent value="access">
          {renderAccessControl()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CyberSecurity;

