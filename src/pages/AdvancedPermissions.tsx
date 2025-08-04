import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Key, 
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Settings,
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
  Copy,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Flag,
  Target,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Database,
  Server,
  Monitor,
  Globe,
  Wifi,
  Network,
  Cloud,
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
  Smartphone,
  Tv,
  Battery,
  Bluetooth,
  Usb,
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
  Clock,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Bookmark,
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
  HelpCircle,
  Cpu,
  HardDrive,
  Bell,
  BellRing
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  category: 'system' | 'business' | 'custom';
  permissions: string[];
  userCount: number;
  isActive: boolean;
  isDefault: boolean;
  createdDate: string;
  lastModified: string;
  createdBy: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'read' | 'write' | 'delete' | 'admin' | 'special';
  module: string;
  resource: string;
  action: string;
  isSystemLevel: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: string[];
  directPermissions: string[];
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: string;
  loginCount: number;
  department: string;
  position: string;
  manager?: string;
}

interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  permission: string;
  result: 'granted' | 'denied';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  riskScore: number;
}

interface PermissionGroup {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
  icon: string;
}

const AdvancedPermissions = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock roles
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'مدير النظام',
      description: 'صلاحيات كاملة لإدارة النظام',
      category: 'system',
      permissions: ['system.admin', 'users.manage', 'roles.manage', 'settings.modify'],
      userCount: 3,
      isActive: true,
      isDefault: true,
      createdDate: '2024-01-15',
      lastModified: '2024-07-20',
      createdBy: 'النظام'
    },
    {
      id: '2',
      name: 'مدير المبيعات',
      description: 'إدارة عمليات المبيعات والعملاء',
      category: 'business',
      permissions: ['sales.read', 'sales.write', 'customers.manage', 'reports.sales'],
      userCount: 8,
      isActive: true,
      isDefault: false,
      createdDate: '2024-02-10',
      lastModified: '2024-08-01',
      createdBy: 'أحمد محمد'
    },
    {
      id: '3',
      name: 'محاسب',
      description: 'إدارة العمليات المالية والمحاسبية',
      category: 'business',
      permissions: ['accounting.read', 'accounting.write', 'invoices.manage', 'reports.financial'],
      userCount: 5,
      isActive: true,
      isDefault: false,
      createdDate: '2024-02-15',
      lastModified: '2024-07-25',
      createdBy: 'فاطمة أحمد'
    },
    {
      id: '4',
      name: 'موظف خدمة العملاء',
      description: 'التعامل مع استفسارات وشكاوى العملاء',
      category: 'business',
      permissions: ['customers.read', 'tickets.manage', 'support.respond'],
      userCount: 12,
      isActive: true,
      isDefault: false,
      createdDate: '2024-03-01',
      lastModified: '2024-07-30',
      createdBy: 'سارة علي'
    },
    {
      id: '5',
      name: 'مراجع مالي',
      description: 'مراجعة وتدقيق العمليات المالية',
      category: 'custom',
      permissions: ['accounting.read', 'reports.financial', 'audit.access'],
      userCount: 2,
      isActive: true,
      isDefault: false,
      createdDate: '2024-04-10',
      lastModified: '2024-07-15',
      createdBy: 'محمد خالد'
    }
  ]);

  // Mock permissions
  const [permissions] = useState<Permission[]>([
    {
      id: 'system.admin',
      name: 'إدارة النظام',
      description: 'صلاحية كاملة لإدارة النظام',
      category: 'admin',
      module: 'النظام',
      resource: 'جميع الموارد',
      action: 'جميع العمليات',
      isSystemLevel: true,
      riskLevel: 'critical',
      dependencies: []
    },
    {
      id: 'users.manage',
      name: 'إدارة المستخدمين',
      description: 'إضافة وتعديل وحذف المستخدمين',
      category: 'admin',
      module: 'المستخدمين',
      resource: 'حسابات المستخدمين',
      action: 'إنشاء، تعديل، حذف',
      isSystemLevel: true,
      riskLevel: 'high',
      dependencies: ['users.read']
    },
    {
      id: 'users.read',
      name: 'عرض المستخدمين',
      description: 'عرض قائمة المستخدمين ومعلوماتهم',
      category: 'read',
      module: 'المستخدمين',
      resource: 'حسابات المستخدمين',
      action: 'عرض',
      isSystemLevel: false,
      riskLevel: 'low',
      dependencies: []
    },
    {
      id: 'roles.manage',
      name: 'إدارة الأدوار',
      description: 'إنشاء وتعديل أدوار المستخدمين',
      category: 'admin',
      module: 'الأدوار',
      resource: 'أدوار النظام',
      action: 'إنشاء، تعديل، حذف',
      isSystemLevel: true,
      riskLevel: 'critical',
      dependencies: ['roles.read']
    },
    {
      id: 'sales.read',
      name: 'عرض المبيعات',
      description: 'عرض بيانات المبيعات والطلبات',
      category: 'read',
      module: 'المبيعات',
      resource: 'بيانات المبيعات',
      action: 'عرض',
      isSystemLevel: false,
      riskLevel: 'low',
      dependencies: []
    },
    {
      id: 'sales.write',
      name: 'تعديل المبيعات',
      description: 'إضافة وتعديل بيانات المبيعات',
      category: 'write',
      module: 'المبيعات',
      resource: 'بيانات المبيعات',
      action: 'إنشاء، تعديل',
      isSystemLevel: false,
      riskLevel: 'medium',
      dependencies: ['sales.read']
    },
    {
      id: 'customers.manage',
      name: 'إدارة العملاء',
      description: 'إدارة كاملة لبيانات العملاء',
      category: 'admin',
      module: 'العملاء',
      resource: 'بيانات العملاء',
      action: 'جميع العمليات',
      isSystemLevel: false,
      riskLevel: 'medium',
      dependencies: ['customers.read']
    },
    {
      id: 'accounting.read',
      name: 'عرض المحاسبة',
      description: 'عرض البيانات المالية والمحاسبية',
      category: 'read',
      module: 'المحاسبة',
      resource: 'البيانات المالية',
      action: 'عرض',
      isSystemLevel: false,
      riskLevel: 'medium',
      dependencies: []
    },
    {
      id: 'accounting.write',
      name: 'تعديل المحاسبة',
      description: 'إضافة وتعديل البيانات المالية',
      category: 'write',
      module: 'المحاسبة',
      resource: 'البيانات المالية',
      action: 'إنشاء، تعديل',
      isSystemLevel: false,
      riskLevel: 'high',
      dependencies: ['accounting.read']
    },
    {
      id: 'reports.financial',
      name: 'التقارير المالية',
      description: 'إنشاء وعرض التقارير المالية',
      category: 'read',
      module: 'التقارير',
      resource: 'التقارير المالية',
      action: 'عرض، إنشاء',
      isSystemLevel: false,
      riskLevel: 'medium',
      dependencies: ['accounting.read']
    }
  ]);

  // Mock users
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@company.com',
      roles: ['1', '2'],
      directPermissions: [],
      status: 'active',
      lastLogin: '2024-08-04T14:30:00',
      loginCount: 245,
      department: 'تقنية المعلومات',
      position: 'مدير النظام',
      manager: 'محمد علي'
    },
    {
      id: '2',
      name: 'فاطمة أحمد',
      email: 'fatima@company.com',
      roles: ['3'],
      directPermissions: ['reports.financial'],
      status: 'active',
      lastLogin: '2024-08-04T13:45:00',
      loginCount: 189,
      department: 'المالية',
      position: 'محاسب أول',
      manager: 'خالد سعد'
    },
    {
      id: '3',
      name: 'سارة علي',
      email: 'sara@company.com',
      roles: ['4'],
      directPermissions: ['customers.read'],
      status: 'active',
      lastLogin: '2024-08-04T12:20:00',
      loginCount: 156,
      department: 'خدمة العملاء',
      position: 'ممثل خدمة العملاء',
      manager: 'نورا حسن'
    },
    {
      id: '4',
      name: 'محمد خالد',
      email: 'mohamed@company.com',
      roles: ['5'],
      directPermissions: [],
      status: 'inactive',
      lastLogin: '2024-08-02T16:15:00',
      loginCount: 78,
      department: 'المالية',
      position: 'مراجع مالي',
      manager: 'خالد سعد'
    },
    {
      id: '5',
      name: 'نورا حسن',
      email: 'nora@company.com',
      roles: ['2', '4'],
      directPermissions: ['users.read'],
      status: 'active',
      lastLogin: '2024-08-04T11:30:00',
      loginCount: 203,
      department: 'المبيعات',
      position: 'مدير المبيعات',
      manager: 'أحمد محمد'
    }
  ]);

  // Mock access logs
  const [accessLogs] = useState<AccessLog[]>([
    {
      id: '1',
      userId: '1',
      userName: 'أحمد محمد',
      action: 'عرض',
      resource: 'قائمة المستخدمين',
      permission: 'users.read',
      result: 'granted',
      timestamp: '2024-08-04T14:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0',
      riskScore: 2
    },
    {
      id: '2',
      userId: '2',
      userName: 'فاطمة أحمد',
      action: 'تعديل',
      resource: 'فاتورة رقم 1234',
      permission: 'accounting.write',
      result: 'granted',
      timestamp: '2024-08-04T13:45:00',
      ipAddress: '192.168.1.105',
      userAgent: 'Firefox/89.0',
      riskScore: 3
    },
    {
      id: '3',
      userId: '3',
      userName: 'سارة علي',
      action: 'حذف',
      resource: 'بيانات عميل',
      permission: 'customers.delete',
      result: 'denied',
      timestamp: '2024-08-04T12:20:00',
      ipAddress: '192.168.1.110',
      userAgent: 'Chrome/91.0',
      riskScore: 7
    },
    {
      id: '4',
      userId: '5',
      userName: 'نورا حسن',
      action: 'إنشاء',
      resource: 'تقرير مبيعات',
      permission: 'reports.sales',
      result: 'granted',
      timestamp: '2024-08-04T11:30:00',
      ipAddress: '192.168.1.115',
      userAgent: 'Safari/14.0',
      riskScore: 1
    },
    {
      id: '5',
      userId: '4',
      userName: 'محمد خالد',
      action: 'تسجيل دخول',
      resource: 'النظام',
      permission: 'system.login',
      result: 'denied',
      timestamp: '2024-08-04T10:15:00',
      ipAddress: '192.168.1.120',
      userAgent: 'Chrome/91.0',
      riskScore: 8
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system': return 'bg-red-100 text-red-800';
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'custom': return 'bg-purple-100 text-purple-800';
      case 'read': return 'bg-green-100 text-green-800';
      case 'write': return 'bg-yellow-100 text-yellow-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'special': return 'bg-orange-100 text-orange-800';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'granted': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'suspended': return 'معلق';
      case 'pending': return 'في الانتظار';
      case 'granted': return 'مسموح';
      case 'denied': return 'مرفوض';
      default: return status;
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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                <p className="text-xs text-blue-600">
                  {users.filter(u => u.status === 'active').length} نشط
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
                <p className="text-sm font-medium text-gray-600">الأدوار النشطة</p>
                <p className="text-2xl font-bold text-green-600">
                  {roles.filter(r => r.isActive).length}
                </p>
                <p className="text-xs text-green-600">من {roles.length} إجمالي</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الصلاحيات</p>
                <p className="text-2xl font-bold text-purple-600">{permissions.length}</p>
                <p className="text-xs text-purple-600">
                  {permissions.filter(p => p.riskLevel === 'critical').length} حرجة
                </p>
              </div>
              <Key className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">محاولات الوصول</p>
                <p className="text-2xl font-bold text-orange-600">{accessLogs.length}</p>
                <p className="text-xs text-orange-600">
                  {accessLogs.filter(l => l.result === 'denied').length} مرفوضة
                </p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Access Attempts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            محاولات الوصول الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accessLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{log.userName}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {log.action} - {log.resource}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>الصلاحية: {log.permission}</span>
                    <span>IP: {log.ipAddress}</span>
                    <span>الوقت: {new Date(log.timestamp).toLocaleString('ar-SA')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(log.result)}>
                    {getStatusText(log.result)}
                  </Badge>
                  <Badge className={log.riskScore > 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    خطر: {log.riskScore}/10
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              تحليل المخاطر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['critical', 'high', 'medium', 'low'].map((risk) => {
                const count = permissions.filter(p => p.riskLevel === risk).length;
                const percentage = Math.round((count / permissions.length) * 100);
                return (
                  <div key={risk} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(risk)}>
                        {getRiskText(risk)}
                      </Badge>
                      <span className="text-sm">{count} صلاحية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            risk === 'critical' ? 'bg-red-600' :
                            risk === 'high' ? 'bg-orange-600' :
                            risk === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              توزيع الأدوار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => {
                const percentage = Math.round((role.userCount / users.length) * 100);
                return (
                  <div key={role.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(role.category)}>
                        {role.name}
                      </Badge>
                      <span className="text-sm">{role.userCount} مستخدم</span>
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
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-6">
      {/* Roles Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة الأدوار</h2>
          <p className="text-gray-600">إنشاء وإدارة أدوار المستخدمين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            دور جديد
          </Button>
        </div>
      </div>

      {/* Roles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{role.name}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getCategoryColor(role.category)}>
                    {role.category === 'system' ? 'نظام' : 
                     role.category === 'business' ? 'أعمال' : 'مخصص'}
                  </Badge>
                  {role.isDefault && (
                    <Badge variant="outline" className="text-xs">
                      افتراضي
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Role Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>عدد المستخدمين:</span>
                  <span className="font-medium">{role.userCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>عدد الصلاحيات:</span>
                  <span className="font-medium">{role.permissions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>تاريخ الإنشاء:</span>
                  <span className="font-medium">
                    {new Date(role.createdDate).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>آخر تعديل:</span>
                  <span className="font-medium">
                    {new Date(role.lastModified).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
              
              {/* Permissions Preview */}
              <div className="mb-4">
                <Label className="text-sm font-medium">الصلاحيات</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {role.permissions.slice(0, 3).map((permId, index) => {
                    const perm = permissions.find(p => p.id === permId);
                    return (
                      <Badge key={index} variant="outline" className="text-xs">
                        {perm?.name || permId}
                      </Badge>
                    );
                  })}
                  {role.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 3} أخرى
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Status */}
              <div className="mb-4">
                <Badge className={role.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {role.isActive ? 'نشط' : 'غير نشط'}
                </Badge>
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
                  <Copy className="h-4 w-4 mr-2" />
                  نسخ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Users Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
          <p className="text-gray-600">إدارة حسابات المستخدمين وصلاحياتهم</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            مستخدم جديد
          </Button>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.position} - {user.department}</p>
                    {user.manager && (
                      <p className="text-sm text-gray-500">المدير: {user.manager}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(user.status)}>
                    {getStatusText(user.status)}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    آخر دخول: {new Date(user.lastLogin).toLocaleString('ar-SA')}
                  </div>
                </div>
              </div>
              
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">الأدوار</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.roles.map((roleId, index) => {
                      const role = roles.find(r => r.id === roleId);
                      return (
                        <Badge key={index} variant="outline" className="text-xs">
                          {role?.name || roleId}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">الصلاحيات المباشرة</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.directPermissions.length > 0 ? (
                      user.directPermissions.map((permId, index) => {
                        const perm = permissions.find(p => p.id === permId);
                        return (
                          <Badge key={index} variant="outline" className="text-xs">
                            {perm?.name || permId}
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-sm text-gray-500">لا توجد</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">إحصائيات</Label>
                  <div className="text-sm text-gray-600 mt-1">
                    <div>عدد مرات الدخول: {user.loginCount}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير الصلاحيات
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  سجل النشاط
                </Button>
                {user.status === 'active' ? (
                  <Button variant="outline" size="sm">
                    <UserX className="h-4 w-4 mr-2" />
                    إيقاف
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <UserCheck className="h-4 w-4 mr-2" />
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

  const renderPermissions = () => (
    <div className="space-y-6">
      {/* Permissions Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة الصلاحيات</h2>
          <p className="text-gray-600">تكوين وإدارة صلاحيات النظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            صلاحية جديدة
          </Button>
        </div>
      </div>

      {/* Permissions List */}
      <div className="space-y-4">
        {permissions.map((permission) => (
          <Card key={permission.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{permission.name}</h3>
                  <p className="text-gray-600 mt-1">{permission.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>الوحدة: {permission.module}</span>
                    <span>المورد: {permission.resource}</span>
                    <span>العملية: {permission.action}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getCategoryColor(permission.category)}>
                    {permission.category === 'read' ? 'قراءة' :
                     permission.category === 'write' ? 'كتابة' :
                     permission.category === 'delete' ? 'حذف' :
                     permission.category === 'admin' ? 'إدارة' : 'خاص'}
                  </Badge>
                  <Badge className={getRiskColor(permission.riskLevel)}>
                    {getRiskText(permission.riskLevel)}
                  </Badge>
                  {permission.isSystemLevel && (
                    <Badge variant="outline" className="text-xs">
                      مستوى النظام
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Dependencies */}
              {permission.dependencies.length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium">التبعيات</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {permission.dependencies.map((depId, index) => {
                      const dep = permissions.find(p => p.id === depId);
                      return (
                        <Badge key={index} variant="outline" className="text-xs">
                          {dep?.name || depId}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض الاستخدام
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  المستخدمين
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  نسخ
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
            إدارة الصلاحيات المتقدمة
          </h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة المستخدمين والأدوار والصلاحيات</p>
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
          <TabsTrigger value="roles">الأدوار</TabsTrigger>
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="roles">
          {renderRoles()}
        </TabsContent>

        <TabsContent value="users">
          {renderUsers()}
        </TabsContent>

        <TabsContent value="permissions">
          {renderPermissions()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPermissions;

