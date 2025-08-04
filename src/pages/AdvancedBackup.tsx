import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  HardDrive, 
  Cloud, 
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Archive,
  Server,
  Monitor,
  AlertTriangle,
  Info,
  Calendar,
  FileText,
  Folder,
  FolderOpen,
  Package,
  Layers,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  QrCode,
  Scan,
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
  Users,
  Mail,
  Phone,
  MessageSquare,
  Bookmark,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Globe,
  Wifi,
  Battery,
  Bluetooth,
  Usb,
  Network,
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  Headphones,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  Video,
  Image,
  Film,
  Music,
  Book,
  Newspaper,
  FileImage,
  FileVideo,
  FileAudio,
  Box,
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
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
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
  Gamepad2,
  Shirt,
  Watch
} from 'lucide-react';

interface BackupJob {
  id: string;
  name: string;
  description: string;
  type: 'full' | 'incremental' | 'differential' | 'snapshot';
  source: string;
  destination: string;
  schedule: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'paused';
  lastRun: string;
  nextRun: string;
  duration: number;
  dataSize: number;
  compressionRatio: number;
  retentionDays: number;
  encryption: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface BackupStorage {
  id: string;
  name: string;
  type: 'local' | 'cloud' | 'network' | 'tape';
  provider: string;
  location: string;
  totalCapacity: number;
  usedCapacity: number;
  availableCapacity: number;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  encryption: boolean;
  compression: boolean;
  deduplication: boolean;
  lastSync: string;
}

interface RestorePoint {
  id: string;
  jobId: string;
  name: string;
  description: string;
  createdDate: string;
  dataSize: number;
  type: 'full' | 'incremental' | 'differential';
  status: 'available' | 'corrupted' | 'expired' | 'archived';
  verificationStatus: 'verified' | 'failed' | 'pending';
  retentionExpiry: string;
}

interface BackupPolicy {
  id: string;
  name: string;
  description: string;
  schedule: {
    full: string;
    incremental: string;
    differential: string;
  };
  retention: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  encryption: boolean;
  compression: boolean;
  verification: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  applicableTypes: string[];
}

const AdvancedBackup = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock backup jobs
  const [backupJobs] = useState<BackupJob[]>([
    {
      id: '1',
      name: 'نسخ احتياطي يومي لقاعدة البيانات',
      description: 'نسخ احتياطي كامل لقاعدة البيانات الرئيسية',
      type: 'full',
      source: 'Database Server (Primary)',
      destination: 'Cloud Storage - AWS S3',
      schedule: 'يومياً في 2:00 ص',
      status: 'completed',
      lastRun: '2024-08-04T02:00:00',
      nextRun: '2024-08-05T02:00:00',
      duration: 45,
      dataSize: 2.5,
      compressionRatio: 65,
      retentionDays: 30,
      encryption: true,
      priority: 'critical'
    },
    {
      id: '2',
      name: 'نسخ احتياطي تزايدي للملفات',
      description: 'نسخ احتياطي تزايدي لملفات النظام والمستندات',
      type: 'incremental',
      source: 'File Server',
      destination: 'Local NAS Storage',
      schedule: 'كل 4 ساعات',
      status: 'running',
      lastRun: '2024-08-04T12:00:00',
      nextRun: '2024-08-04T16:00:00',
      duration: 15,
      dataSize: 0.8,
      compressionRatio: 45,
      retentionDays: 14,
      encryption: true,
      priority: 'high'
    },
    {
      id: '3',
      name: 'نسخ احتياطي أسبوعي للنظام',
      description: 'نسخ احتياطي كامل للنظام والتطبيقات',
      type: 'full',
      source: 'Application Servers',
      destination: 'Cloud Storage - Azure',
      schedule: 'أسبوعياً يوم الأحد',
      status: 'scheduled',
      lastRun: '2024-07-28T01:00:00',
      nextRun: '2024-08-04T01:00:00',
      duration: 120,
      dataSize: 5.2,
      compressionRatio: 55,
      retentionDays: 90,
      encryption: true,
      priority: 'high'
    },
    {
      id: '4',
      name: 'نسخ احتياطي للتكوينات',
      description: 'نسخ احتياطي لملفات التكوين والإعدادات',
      type: 'differential',
      source: 'Configuration Files',
      destination: 'Local Storage',
      schedule: 'يومياً في 6:00 م',
      status: 'failed',
      lastRun: '2024-08-03T18:00:00',
      nextRun: '2024-08-04T18:00:00',
      duration: 5,
      dataSize: 0.1,
      compressionRatio: 80,
      retentionDays: 7,
      encryption: false,
      priority: 'medium'
    }
  ]);

  // Mock storage locations
  const [storageLocations] = useState<BackupStorage[]>([
    {
      id: '1',
      name: 'AWS S3 Primary',
      type: 'cloud',
      provider: 'Amazon Web Services',
      location: 'us-east-1',
      totalCapacity: 1000,
      usedCapacity: 650,
      availableCapacity: 350,
      status: 'online',
      encryption: true,
      compression: true,
      deduplication: true,
      lastSync: '2024-08-04T14:30:00'
    },
    {
      id: '2',
      name: 'Local NAS Storage',
      type: 'network',
      provider: 'Synology',
      location: 'Data Center - Rack 3',
      totalCapacity: 500,
      usedCapacity: 320,
      availableCapacity: 180,
      status: 'online',
      encryption: true,
      compression: false,
      deduplication: true,
      lastSync: '2024-08-04T14:25:00'
    },
    {
      id: '3',
      name: 'Azure Blob Storage',
      type: 'cloud',
      provider: 'Microsoft Azure',
      location: 'West Europe',
      totalCapacity: 2000,
      usedCapacity: 450,
      availableCapacity: 1550,
      status: 'online',
      encryption: true,
      compression: true,
      deduplication: false,
      lastSync: '2024-08-04T14:20:00'
    },
    {
      id: '4',
      name: 'Tape Library',
      type: 'tape',
      provider: 'IBM TS4500',
      location: 'Archive Room',
      totalCapacity: 10000,
      usedCapacity: 2500,
      availableCapacity: 7500,
      status: 'maintenance',
      encryption: true,
      compression: true,
      deduplication: false,
      lastSync: '2024-08-03T10:00:00'
    }
  ]);

  // Mock restore points
  const [restorePoints] = useState<RestorePoint[]>([
    {
      id: '1',
      jobId: '1',
      name: 'Database Full Backup - 2024-08-04',
      description: 'نسخة احتياطية كاملة لقاعدة البيانات',
      createdDate: '2024-08-04T02:00:00',
      dataSize: 2.5,
      type: 'full',
      status: 'available',
      verificationStatus: 'verified',
      retentionExpiry: '2024-09-03T02:00:00'
    },
    {
      id: '2',
      jobId: '2',
      name: 'Files Incremental - 2024-08-04 12:00',
      description: 'نسخة احتياطية تزايدية للملفات',
      createdDate: '2024-08-04T12:00:00',
      dataSize: 0.8,
      type: 'incremental',
      status: 'available',
      verificationStatus: 'verified',
      retentionExpiry: '2024-08-18T12:00:00'
    },
    {
      id: '3',
      jobId: '3',
      name: 'System Full Backup - 2024-07-28',
      description: 'نسخة احتياطية كاملة للنظام',
      createdDate: '2024-07-28T01:00:00',
      dataSize: 5.2,
      type: 'full',
      status: 'available',
      verificationStatus: 'verified',
      retentionExpiry: '2024-10-26T01:00:00'
    },
    {
      id: '4',
      jobId: '4',
      name: 'Config Differential - 2024-08-02',
      description: 'نسخة احتياطية تفاضلية للتكوينات',
      createdDate: '2024-08-02T18:00:00',
      dataSize: 0.1,
      type: 'differential',
      status: 'corrupted',
      verificationStatus: 'failed',
      retentionExpiry: '2024-08-09T18:00:00'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'corrupted': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-blue-100 text-blue-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return 'قيد التشغيل';
      case 'completed': return 'مكتمل';
      case 'failed': return 'فشل';
      case 'scheduled': return 'مجدول';
      case 'paused': return 'متوقف';
      case 'online': return 'متصل';
      case 'offline': return 'غير متصل';
      case 'maintenance': return 'صيانة';
      case 'error': return 'خطأ';
      case 'available': return 'متاح';
      case 'corrupted': return 'تالف';
      case 'expired': return 'منتهي الصلاحية';
      case 'archived': return 'مؤرشف';
      case 'verified': return 'محقق';
      case 'pending': return 'معلق';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-blue-100 text-blue-800';
      case 'incremental': return 'bg-green-100 text-green-800';
      case 'differential': return 'bg-purple-100 text-purple-800';
      case 'snapshot': return 'bg-orange-100 text-orange-800';
      case 'local': return 'bg-gray-100 text-gray-800';
      case 'cloud': return 'bg-blue-100 text-blue-800';
      case 'network': return 'bg-green-100 text-green-800';
      case 'tape': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'full': return 'كامل';
      case 'incremental': return 'تزايدي';
      case 'differential': return 'تفاضلي';
      case 'snapshot': return 'لقطة';
      case 'local': return 'محلي';
      case 'cloud': return 'سحابي';
      case 'network': return 'شبكة';
      case 'tape': return 'شريط';
      default: return type;
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

  const formatSize = (sizeInGB: number) => {
    if (sizeInGB >= 1000) {
      return `${(sizeInGB / 1000).toFixed(1)} TB`;
    }
    return `${sizeInGB.toFixed(1)} GB`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مهام النسخ النشطة</p>
                <p className="text-2xl font-bold text-blue-600">{backupJobs.length}</p>
                <p className="text-xs text-blue-600">
                  {backupJobs.filter(j => j.status === 'running').length} قيد التشغيل
                </p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((backupJobs.filter(j => j.status === 'completed').length / backupJobs.length) * 100)}%
                </p>
                <p className="text-xs text-green-600">آخر 30 يوم</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي البيانات</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatSize(backupJobs.reduce((sum, j) => sum + j.dataSize, 0))}
                </p>
                <p className="text-xs text-purple-600">محفوظة</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مواقع التخزين</p>
                <p className="text-2xl font-bold text-orange-600">{storageLocations.length}</p>
                <p className="text-xs text-orange-600">
                  {storageLocations.filter(s => s.status === 'online').length} متصل
                </p>
              </div>
              <Cloud className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Backup Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            مهام النسخ الاحتياطي الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{job.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>المصدر: {job.source}</span>
                    <span>الحجم: {formatSize(job.dataSize)}</span>
                    <span>المدة: {formatDuration(job.duration)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(job.status)}>
                    {getStatusText(job.status)}
                  </Badge>
                  <Badge className={getTypeColor(job.type)}>
                    {getTypeText(job.type)}
                  </Badge>
                  <Badge className={getPriorityColor(job.priority)}>
                    {getPriorityText(job.priority)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            نظرة عامة على التخزين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storageLocations.map((storage) => (
              <div key={storage.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{storage.name}</h4>
                  <Badge className={getStatusColor(storage.status)}>
                    {getStatusText(storage.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>النوع:</span>
                    <Badge className={getTypeColor(storage.type)}>
                      {getTypeText(storage.type)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>المزود:</span>
                    <span>{storage.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الموقع:</span>
                    <span>{storage.location}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>المساحة المستخدمة</span>
                    <span>{Math.round((storage.usedCapacity / storage.totalCapacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(storage.usedCapacity / storage.totalCapacity) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatSize(storage.usedCapacity)} مستخدم</span>
                    <span>{formatSize(storage.availableCapacity)} متاح</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3 text-xs">
                  {storage.encryption && (
                    <Badge variant="outline" className="text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      مشفر
                    </Badge>
                  )}
                  {storage.compression && (
                    <Badge variant="outline" className="text-xs">
                      <Archive className="h-3 w-3 mr-1" />
                      مضغوط
                    </Badge>
                  )}
                  {storage.deduplication && (
                    <Badge variant="outline" className="text-xs">
                      <Copy className="h-3 w-3 mr-1" />
                      إلغاء تكرار
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      {/* Jobs Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مهام النسخ الاحتياطي</h2>
          <p className="text-gray-600">إدارة ومراقبة جميع مهام النسخ الاحتياطي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            مهمة جديدة
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {backupJobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{job.name}</h3>
                  <p className="text-gray-600 mt-1">{job.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>الجدولة: {job.schedule}</span>
                    <span>آخر تشغيل: {new Date(job.lastRun).toLocaleString('ar-SA')}</span>
                    <span>التشغيل القادم: {new Date(job.nextRun).toLocaleString('ar-SA')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(job.status)}>
                    {getStatusText(job.status)}
                  </Badge>
                  <Badge className={getPriorityColor(job.priority)}>
                    أولوية {getPriorityText(job.priority)}
                  </Badge>
                </div>
              </div>
              
              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">النوع</Label>
                  <Badge className={getTypeColor(job.type)}>
                    {getTypeText(job.type)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">حجم البيانات</Label>
                  <div className="text-sm font-medium">{formatSize(job.dataSize)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">نسبة الضغط</Label>
                  <div className="text-sm font-medium">{job.compressionRatio}%</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">مدة الاحتفاظ</Label>
                  <div className="text-sm font-medium">{job.retentionDays} يوم</div>
                </div>
              </div>
              
              {/* Source and Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">المصدر</Label>
                  <div className="text-sm text-gray-600 mt-1">{job.source}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">الوجهة</Label>
                  <div className="text-sm text-gray-600 mt-1">{job.destination}</div>
                </div>
              </div>
              
              {/* Features */}
              <div className="flex items-center gap-2 mb-4">
                {job.encryption && (
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    مشفر
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDuration(job.duration)}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  تشغيل الآن
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  السجلات
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  الإعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStorage = () => (
    <div className="space-y-6">
      {/* Storage Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مواقع التخزين</h2>
          <p className="text-gray-600">إدارة ومراقبة مواقع تخزين النسخ الاحتياطية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            موقع جديد
          </Button>
        </div>
      </div>

      {/* Storage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storageLocations.map((storage) => (
          <Card key={storage.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {storage.type === 'cloud' && <Cloud className="h-6 w-6 text-blue-600" />}
                  {storage.type === 'local' && <HardDrive className="h-6 w-6 text-gray-600" />}
                  {storage.type === 'network' && <Server className="h-6 w-6 text-green-600" />}
                  {storage.type === 'tape' && <Archive className="h-6 w-6 text-orange-600" />}
                  <div>
                    <h3 className="font-semibold text-lg">{storage.name}</h3>
                    <p className="text-sm text-gray-600">{storage.provider}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(storage.status)}>
                  {getStatusText(storage.status)}
                </Badge>
              </div>
              
              {/* Storage Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>النوع:</span>
                  <Badge className={getTypeColor(storage.type)}>
                    {getTypeText(storage.type)}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الموقع:</span>
                  <span>{storage.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>آخر مزامنة:</span>
                  <span>{new Date(storage.lastSync).toLocaleString('ar-SA')}</span>
                </div>
              </div>
              
              {/* Capacity */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>السعة المستخدمة</span>
                  <span>{Math.round((storage.usedCapacity / storage.totalCapacity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      (storage.usedCapacity / storage.totalCapacity) > 0.8 ? 'bg-red-600' :
                      (storage.usedCapacity / storage.totalCapacity) > 0.6 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${(storage.usedCapacity / storage.totalCapacity) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatSize(storage.usedCapacity)} / {formatSize(storage.totalCapacity)}</span>
                  <span>{formatSize(storage.availableCapacity)} متاح</span>
                </div>
              </div>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {storage.encryption && (
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    تشفير
                  </Badge>
                )}
                {storage.compression && (
                  <Badge variant="outline" className="text-xs">
                    <Archive className="h-3 w-3 mr-1" />
                    ضغط
                  </Badge>
                )}
                {storage.deduplication && (
                  <Badge variant="outline" className="text-xs">
                    <Copy className="h-3 w-3 mr-1" />
                    إلغاء تكرار
                  </Badge>
                )}
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
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  مزامنة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRestore = () => (
    <div className="space-y-6">
      {/* Restore Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">نقاط الاستعادة</h2>
          <p className="text-gray-600">إدارة واستعادة النسخ الاحتياطية المحفوظة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            البحث
          </Button>
          <Button>
            <RotateCcw className="h-4 w-4 mr-2" />
            استعادة جديدة
          </Button>
        </div>
      </div>

      {/* Restore Points List */}
      <div className="space-y-4">
        {restorePoints.map((point) => (
          <Card key={point.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{point.name}</h3>
                  <p className="text-gray-600 mt-1">{point.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>تاريخ الإنشاء: {new Date(point.createdDate).toLocaleString('ar-SA')}</span>
                    <span>انتهاء الصلاحية: {new Date(point.retentionExpiry).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(point.status)}>
                    {getStatusText(point.status)}
                  </Badge>
                  <Badge className={getStatusColor(point.verificationStatus)}>
                    {getStatusText(point.verificationStatus)}
                  </Badge>
                </div>
              </div>
              
              {/* Point Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">النوع</Label>
                  <Badge className={getTypeColor(point.type)}>
                    {getTypeText(point.type)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">حجم البيانات</Label>
                  <div className="text-sm font-medium">{formatSize(point.dataSize)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">حالة التحقق</Label>
                  <div className="flex items-center gap-1">
                    {point.verificationStatus === 'verified' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {point.verificationStatus === 'failed' && <XCircle className="h-4 w-4 text-red-600" />}
                    {point.verificationStatus === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                    <span className="text-sm">{getStatusText(point.verificationStatus)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={point.status !== 'available'}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  استعادة
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض المحتوى
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  تحميل
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  تحقق
                </Button>
                {point.status === 'corrupted' && (
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    حذف
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
            <Shield className="h-8 w-8 text-blue-600" />
            النسخ الاحتياطي المتقدم
          </h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة النسخ الاحتياطية والاستعادة</p>
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
          <TabsTrigger value="jobs">المهام</TabsTrigger>
          <TabsTrigger value="storage">التخزين</TabsTrigger>
          <TabsTrigger value="restore">الاستعادة</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="jobs">
          {renderJobs()}
        </TabsContent>

        <TabsContent value="storage">
          {renderStorage()}
        </TabsContent>

        <TabsContent value="restore">
          {renderRestore()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedBackup;

