import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle,
  Bell,
  Clock,
  DollarSign,
  Car,
  FileText,
  Package,
  Users,
  X
} from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  category: 'payment' | 'contract' | 'vehicle' | 'inventory' | 'system';
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
}

export const SystemAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'error',
      category: 'payment',
      title: 'دفعات متأخرة',
      message: '5 فواتير متأخرة السداد تتطلب متابعة فورية',
      timestamp: '2024-01-22T10:00:00Z',
      priority: 'high',
      actionRequired: true
    },
    {
      id: '2',
      type: 'warning',
      category: 'contract',
      title: 'عقود منتهية الصلاحية',
      message: '3 عقود ستنتهي خلال الأسبوع القادم',
      timestamp: '2024-01-22T09:30:00Z',
      priority: 'medium',
      actionRequired: true
    },
    {
      id: '3',
      type: 'warning',
      category: 'vehicle',
      title: 'صيانة مستحقة',
      message: '7 مركبات تحتاج صيانة دورية',
      timestamp: '2024-01-22T08:15:00Z',
      priority: 'medium',
      actionRequired: true
    },
    {
      id: '4',
      type: 'error',
      category: 'inventory',
      title: 'مخزون منخفض',
      message: 'نفاد مخزون قطع الغيار الأساسية',
      timestamp: '2024-01-21T16:45:00Z',
      priority: 'high',
      actionRequired: true
    },
    {
      id: '5',
      type: 'info',
      category: 'system',
      title: 'تحديث النظام',
      message: 'تحديث جديد متاح للنظام',
      timestamp: '2024-01-21T14:20:00Z',
      priority: 'low',
      actionRequired: false
    }
  ]);

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (category: string) => {
    switch (category) {
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      case 'contract':
        return <FileText className="h-4 w-4" />;
      case 'vehicle':
        return <Car className="h-4 w-4" />;
      case 'inventory':
        return <Package className="h-4 w-4" />;
      case 'system':
        return <Bell className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string, priority: string) => {
    if (type === 'error' || priority === 'high') {
      return 'border-red-200 bg-red-50 text-red-800';
    } else if (type === 'warning' || priority === 'medium') {
      return 'border-yellow-200 bg-yellow-50 text-yellow-800';
    } else {
      return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    
    const labels = {
      high: 'عالية',
      medium: 'متوسطة',
      low: 'منخفضة'
    };

    return (
      <Badge variant="outline" className={colors[priority as keyof typeof colors]}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
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

  const highPriorityCount = alerts.filter(alert => alert.priority === 'high').length;
  const actionRequiredCount = alerts.filter(alert => alert.actionRequired).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            تنبيهات النظام
            {alerts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {alerts.length}
              </Badge>
            )}
          </CardTitle>
          {highPriorityCount > 0 && (
            <Badge variant="destructive">
              {highPriorityCount} عالية الأولوية
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد تنبيهات حالياً</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type, alert.priority)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-1">
                      {getAlertIcon(alert.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        {getPriorityBadge(alert.priority)}
                        {alert.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            يتطلب إجراء
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm mb-2">{alert.message}</p>
                      <span className="text-xs opacity-75">{formatTime(alert.timestamp)}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="h-6 w-6 p-0 hover:bg-white/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {actionRequiredCount > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center">
              {actionRequiredCount} تنبيه يتطلب إجراءً فورياً
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

