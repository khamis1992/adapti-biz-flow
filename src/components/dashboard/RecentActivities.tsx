import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity,
  FileText, 
  Users, 
  Car, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'invoice' | 'customer' | 'contract' | 'payment' | 'vehicle' | 'project' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
  amount?: number;
}

export const RecentActivities = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'invoice',
      title: 'فاتورة جديدة',
      description: 'تم إنشاء فاتورة INV-2024-001 للعميل أحمد الكندري',
      timestamp: '2024-01-22T10:30:00Z',
      status: 'success',
      amount: 175.000
    },
    {
      id: '2',
      type: 'payment',
      title: 'دفعة مستلمة',
      description: 'تم استلام دفعة من شركة الخليج للتجارة',
      timestamp: '2024-01-22T09:15:00Z',
      status: 'success',
      amount: 1500.000
    },
    {
      id: '3',
      type: 'customer',
      title: 'عميل جديد',
      description: 'تم تسجيل عميل جديد: محمد سالم الرشيد',
      timestamp: '2024-01-22T08:45:00Z',
      status: 'info'
    },
    {
      id: '4',
      type: 'vehicle',
      title: 'صيانة مركبة',
      description: 'تم جدولة صيانة للمركبة ABC-123',
      timestamp: '2024-01-21T16:20:00Z',
      status: 'warning'
    },
    {
      id: '5',
      type: 'contract',
      title: 'عقد منتهي الصلاحية',
      description: 'العقد CNT-2024-005 سينتهي خلال 3 أيام',
      timestamp: '2024-01-21T14:10:00Z',
      status: 'warning'
    },
    {
      id: '6',
      type: 'project',
      title: 'مشروع مكتمل',
      description: 'تم إكمال مشروع تطوير النظام المحاسبي',
      timestamp: '2024-01-21T11:30:00Z',
      status: 'success'
    },
    {
      id: '7',
      type: 'alert',
      title: 'تنبيه مخزون',
      description: 'مستوى المخزون منخفض لقطع الغيار',
      timestamp: '2024-01-21T09:00:00Z',
      status: 'error'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileText className="h-4 w-4" />;
      case 'customer':
        return <Users className="h-4 w-4" />;
      case 'contract':
        return <FileText className="h-4 w-4" />;
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      case 'vehicle':
        return <Car className="h-4 w-4" />;
      case 'project':
        return <Calendar className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-3 w-3" />;
      case 'warning':
      case 'error':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Activity className="h-3 w-3" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'منذ قليل';
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `منذ ${diffInDays} يوم`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          الأنشطة الحديثة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</span>
                  {activity.amount && (
                    <span className="text-xs font-medium text-green-600">
                      {formatCurrency(activity.amount)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

