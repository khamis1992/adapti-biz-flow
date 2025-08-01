import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  X,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PaymentNotification {
  id: string;
  type: 'payment_received' | 'payment_overdue' | 'payment_reminder' | 'payment_partial';
  title: string;
  message: string;
  amount?: number;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface PaymentNotificationsProps {
  notifications?: PaymentNotification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export const PaymentNotifications: React.FC<PaymentNotificationsProps> = ({
  notifications = [],
  onMarkAsRead,
  onDismiss,
  className = ""
}) => {
  const [localNotifications, setLocalNotifications] = useState<PaymentNotification[]>(notifications);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock notifications for demo
  useEffect(() => {
    if (notifications.length === 0) {
      const mockNotifications: PaymentNotification[] = [
        {
          id: '1',
          type: 'payment_received',
          title: 'تم استلام دفعة جديدة',
          message: 'تم استلام دفعة من أحمد محمد الكندري',
          amount: 500.00,
          invoiceId: 'inv-001',
          invoiceNumber: 'INV-202501-0001',
          customerName: 'أحمد محمد الكندري',
          timestamp: new Date().toISOString(),
          isRead: false,
          priority: 'high'
        },
        {
          id: '2',
          type: 'payment_overdue',
          title: 'فاتورة متأخرة',
          message: 'الفاتورة INV-202501-0002 متأخرة منذ 5 أيام',
          amount: 750.00,
          invoiceId: 'inv-002',
          invoiceNumber: 'INV-202501-0002',
          customerName: 'سارة أحمد العنزي',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          priority: 'high'
        },
        {
          id: '3',
          type: 'payment_reminder',
          title: 'تذكير بموعد الدفع',
          message: 'تستحق الفاتورة INV-202501-0003 خلال 3 أيام',
          amount: 1200.00,
          invoiceId: 'inv-003',
          invoiceNumber: 'INV-202501-0003',
          customerName: 'محمد خالد الرشيد',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          priority: 'medium'
        }
      ];
      setLocalNotifications(mockNotifications);
    }
  }, [notifications]);

  const getNotificationIcon = (type: PaymentNotification['type']) => {
    switch (type) {
      case 'payment_received':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'payment_overdue':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'payment_reminder':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'payment_partial':
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: PaymentNotification['type'], priority: PaymentNotification['priority']) => {
    if (type === 'payment_received') {
      return 'border-l-green-500 bg-green-50';
    }
    if (type === 'payment_overdue') {
      return 'border-l-red-500 bg-red-50';
    }
    if (priority === 'high') {
      return 'border-l-orange-500 bg-orange-50';
    }
    return 'border-l-blue-500 bg-blue-50';
  };

  const getPriorityBadge = (priority: PaymentNotification['priority']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    const labels = {
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية'
    };

    return (
      <Badge className={colors[priority]} variant="secondary">
        {labels[priority]}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'منذ أقل من ساعة';
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `منذ ${diffInDays} يوم`;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    onMarkAsRead?.(id);
  };

  const handleDismiss = (id: string) => {
    setLocalNotifications(prev => prev.filter(notif => notif.id !== id));
    onDismiss?.(id);
    toast({
      title: "تم حذف الإشعار",
      description: "تم حذف الإشعار بنجاح"
    });
  };

  const handleViewInvoice = (invoiceId: string) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const unreadCount = localNotifications.filter(n => !n.isRead).length;

  if (localNotifications.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">لا توجد إشعارات دفع جديدة</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            إشعارات الدفع
            {unreadCount > 0 && (
              <Badge variant="destructive" className="mr-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localNotifications.forEach(n => {
                  if (!n.isRead) handleMarkAsRead(n.id);
                });
              }}
            >
              تحديد الكل كمقروء
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {localNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                p-4 border-l-4 border-b border-b-gray-100 hover:bg-gray-50 transition-colors
                ${getNotificationColor(notification.type, notification.priority)}
                ${!notification.isRead ? 'font-medium' : 'opacity-75'}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 space-x-reverse flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <span>فاتورة: {notification.invoiceNumber}</span>
                        <span>العميل: {notification.customerName}</span>
                        {notification.amount && (
                          <span className="font-medium">
                            {formatCurrency(notification.amount)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {getPriorityBadge(notification.priority)}
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse ml-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewInvoice(notification.invoiceId)}
                    className="h-6 w-6 p-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="h-6 w-6 p-0"
                    >
                      <CheckCircle className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismiss(notification.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};