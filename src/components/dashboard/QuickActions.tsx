import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  Users, 
  Car, 
  FolderKanban,
  DollarSign,
  Calendar,
  Package
} from 'lucide-react';

export const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'فاتورة جديدة',
      description: 'إنشاء فاتورة جديدة للعميل',
      icon: <FileText className="h-5 w-5" />,
      action: () => navigate('/invoices/new'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'عميل جديد',
      description: 'إضافة عميل جديد للنظام',
      icon: <Users className="h-5 w-5" />,
      action: () => navigate('/customers/new'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'عقد جديد',
      description: 'إنشاء عقد إيجار جديد',
      icon: <FileText className="h-5 w-5" />,
      action: () => navigate('/contracts/new'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'مشروع جديد',
      description: 'بدء مشروع جديد',
      icon: <FolderKanban className="h-5 w-5" />,
      action: () => navigate('/projects/new'),
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'إضافة مركبة',
      description: 'تسجيل مركبة جديدة في الأسطول',
      icon: <Car className="h-5 w-5" />,
      action: () => navigate('/fleet/add-vehicle'),
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      title: 'دفعة جديدة',
      description: 'تسجيل دفعة مالية',
      icon: <DollarSign className="h-5 w-5" />,
      action: () => navigate('/payments'),
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: 'طلب إجازة',
      description: 'تقديم طلب إجازة جديد',
      icon: <Calendar className="h-5 w-5" />,
      action: () => navigate('/leaves'),
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      title: 'إضافة منتج',
      description: 'إضافة منتج جديد للمخزون',
      icon: <Package className="h-5 w-5" />,
      action: () => navigate('/inventory'),
      color: 'bg-teal-500 hover:bg-teal-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          إجراءات سريعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-20 flex flex-col gap-2 text-white border-0 ${action.color}`}
              onClick={action.action}
            >
              {action.icon}
              <span className="text-xs font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

