import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Users, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Star,
  MessageSquare,
  FileText,
  CreditCard
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTenant } from '@/hooks/useTenant';

interface Customer {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  civil_id?: string;
  address?: string;
  city?: string;
  customer_type: 'individual' | 'corporate';
  is_blacklisted: boolean;
  blacklist_reason?: string;
  notes?: string;
  created_at: string;
  total_contracts: number;
  total_spent: number;
  last_rental: string;
  rating: number;
}

interface CustomerActivity {
  id: string;
  customer_id: string;
  activity_type: 'rental' | 'payment' | 'complaint' | 'maintenance' | 'violation';
  description: string;
  amount?: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const Customers = () => {
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activities, setActivities] = useState<CustomerActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  // Mock customers data
  const mockCustomers: Customer[] = [
    {
      id: '1',
      full_name: 'أحمد محمد الكندري',
      phone: '+965 9999 1111',
      email: 'ahmed.alkandari@email.com',
      civil_id: '123456789012',
      address: 'السالمية، قطعة 4، شارع سالم المبارك',
      city: 'السالمية',
      customer_type: 'individual',
      is_blacklisted: false,
      notes: 'عميل مميز، يفضل السيارات الحديثة',
      created_at: '2023-06-15T10:00:00Z',
      total_contracts: 8,
      total_spent: 2450.500,
      last_rental: '2024-01-20',
      rating: 5
    },
    {
      id: '2',
      full_name: 'شركة الخليج للتجارة',
      phone: '+965 2222 3333',
      email: 'contracts@gulf-trading.com',
      civil_id: 'COM987654321',
      address: 'الشويخ الصناعية، قطعة 7',
      city: 'الشويخ',
      customer_type: 'corporate',
      is_blacklisted: false,
      notes: 'شركة كبيرة، عقود شهرية منتظمة',
      created_at: '2023-03-10T14:30:00Z',
      total_contracts: 15,
      total_spent: 12750.000,
      last_rental: '2024-01-22',
      rating: 4
    },
    {
      id: '3',
      full_name: 'سارة عبدالله العتيبي',
      phone: '+965 5555 7777',
      email: 'sara.alotaibi@email.com',
      civil_id: '234567890123',
      address: 'الفروانية، جابر الأحمد',
      city: 'الفروانية',
      customer_type: 'individual',
      is_blacklisted: true,
      blacklist_reason: 'تأخير في إرجاع المركبة أكثر من مرة',
      notes: 'عميل محظور مؤقتاً',
      created_at: '2023-08-22T09:15:00Z',
      total_contracts: 3,
      total_spent: 890.250,
      last_rental: '2023-12-10',
      rating: 2
    },
    {
      id: '4',
      full_name: 'محمد سالم الرشيد',
      phone: '+965 6666 8888',
      email: 'mohammed.rashid@email.com',
      civil_id: '345678901234',
      address: 'حولي، السلام',
      city: 'حولي',
      customer_type: 'individual',
      is_blacklisted: false,
      notes: 'عميل جديد، أول تجربة إيجابية',
      created_at: '2024-01-05T16:45:00Z',
      total_contracts: 1,
      total_spent: 175.000,
      last_rental: '2024-01-15',
      rating: 4
    }
  ];

  // Mock activities data
  const mockActivities: CustomerActivity[] = [
    {
      id: '1',
      customer_id: '1',
      activity_type: 'rental',
      description: 'إيجار مركبة ABC-123 لمدة 7 أيام',
      amount: 175.000,
      date: '2024-01-20T10:00:00Z',
      status: 'completed'
    },
    {
      id: '2',
      customer_id: '1',
      activity_type: 'payment',
      description: 'دفع فاتورة العقد CNT-2024-001',
      amount: 175.000,
      date: '2024-01-20T10:30:00Z',
      status: 'completed'
    },
    {
      id: '3',
      customer_id: '2',
      activity_type: 'rental',
      description: 'تجديد العقد الشهري للأسطول',
      amount: 1500.000,
      date: '2024-01-22T14:00:00Z',
      status: 'completed'
    }
  ];

  useEffect(() => {
    fetchCustomers();
    // Simulate loading activities
    setTimeout(() => {
      setActivities(mockActivities);
    }, 1000);
  }, [tenant]);

  const fetchCustomers = async () => {
    if (!tenant?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If no data from database, use mock data
      if (!data || data.length === 0) {
        setCustomers(mockCustomers);
        toast({
          title: 'لا توجد بيانات عملاء',
          description: 'يتم عرض بيانات تجريبية للمعاينة. يمكنك إضافة عملاء جدد.',
          variant: 'default'
        });
      } else {
        // Map database data to interface format
        const mappedData = data.map(customer => ({
          ...customer,
          customer_type: customer.customer_type === 'company' ? 'corporate' : customer.customer_type as 'individual' | 'corporate',
          total_contracts: Math.floor(Math.random() * 10) + 1,
          total_spent: Math.random() * 5000,
          last_rental: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          rating: Math.floor(Math.random() * 5) + 1
        }));
        setCustomers(mappedData);
      }
    } catch (error: any) {
      console.error('Error fetching customers:', error);
      setCustomers(mockCustomers);
      toast({
        title: 'خطأ في تحميل البيانات',
        description: 'تم استخدام البيانات التجريبية. تحقق من الاتصال.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerTypeLabel = (type: string) => {
    return type === 'individual' ? 'فرد' : 'شركة';
  };

  const getCustomerTypeColor = (type: string) => {
    return type === 'individual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'rental':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case 'complaint':
        return <MessageSquare className="w-4 h-4 text-red-600" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'violation':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || customer.customer_type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && !customer.is_blacklisted) ||
                         (statusFilter === 'blacklisted' && customer.is_blacklisted);
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  // Statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => !c.is_blacklisted).length;
  const blacklistedCustomers = customers.filter(c => c.is_blacklisted).length;
  const corporateCustomers = customers.filter(c => c.customer_type === 'corporate').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.total_spent, 0);
  const averageRating = customers.reduce((sum, c) => sum + c.rating, 0) / customers.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Users className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل العملاء...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة
              </Button>
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">إدارة العملاء</h1>
                <p className="text-sm text-muted-foreground">قاعدة بيانات العملاء والأنشطة</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => navigate('/customers/import')}>
                <FileText className="w-4 h-4 mr-2" />
                استيراد عملاء
              </Button>
              <Button onClick={() => navigate('/customers/new')}>
                <Plus className="w-4 h-4 mr-2" />
                عميل جديد
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              قائمة العملاء
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              أنشطة العملاء
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              تقارير العملاء
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي العملاء</p>
                      <p className="text-2xl font-bold">{totalCustomers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">عملاء نشطون</p>
                      <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Star className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">متوسط التقييم</p>
                      <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>توزيع العملاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">عملاء أفراد</span>
                      </div>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        {totalCustomers - corporateCustomers} عميل
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">عملاء الشركات</span>
                      </div>
                      <Badge variant="default" className="bg-purple-100 text-purple-800">
                        {corporateCustomers} شركة
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="font-medium">عملاء محظورون</span>
                      </div>
                      <Badge variant="default" className="bg-red-100 text-red-800">
                        {blacklistedCustomers} عميل
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أفضل العملاء</CardTitle>
                  <CardDescription>العملاء الأعلى إنفاقاً</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customers
                      .sort((a, b) => b.total_spent - a.total_spent)
                      .slice(0, 5)
                      .map((customer, index) => (
                        <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">#{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{customer.full_name}</p>
                              <div className="flex">{renderStars(customer.rating)}</div>
                            </div>
                          </div>
                          <span className="font-bold text-green-600">
                            {formatCurrency(customer.total_spent)}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customers List */}
          <TabsContent value="customers" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في العملاء..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="نوع العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        <SelectItem value="individual">أفراد</SelectItem>
                        <SelectItem value="corporate">شركات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="blacklisted">محظور</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className={`hover:shadow-medium transition-shadow ${customer.is_blacklisted ? 'border-red-200 bg-red-50/50' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCustomerTypeColor(customer.customer_type)}>
                        {getCustomerTypeLabel(customer.customer_type)}
                      </Badge>
                      {customer.is_blacklisted ? (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{customer.full_name}</CardTitle>
                    <div className="flex">{renderStars(customer.rating)}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                      {customer.email && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{customer.city}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">العقود:</span>
                        <span className="font-medium">{customer.total_contracts}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">إجمالي الإنفاق:</span>
                        <span className="font-medium text-green-600">{formatCurrency(customer.total_spent)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">آخر إيجار:</span>
                        <span className="font-medium">{formatDate(customer.last_rental)}</span>
                      </div>
                      {customer.is_blacklisted && (
                        <div className="p-2 bg-red-100 rounded text-sm text-red-800">
                          <strong>محظور:</strong> {customer.blacklist_reason}
                        </div>
                      )}
                    </div>
                     <div className="flex space-x-2 space-x-reverse mt-4">
                       <Button 
                         variant="ghost" 
                         size="sm"
                         onClick={() => navigate(`/customers/${customer.id}`)}
                       >
                         <Eye className="w-4 h-4" />
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="sm"
                         onClick={() => navigate(`/customers/${customer.id}/edit`)}
                       >
                         <Edit className="w-4 h-4" />
                       </Button>
                       <Button variant="ghost" size="sm">
                         <MessageSquare className="w-4 h-4" />
                       </Button>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activities */}
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>أنشطة العملاء</CardTitle>
                <CardDescription>سجل جميع أنشطة العملاء والمعاملات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        {getActivityTypeIcon(activity.activity_type)}
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {customers.find(c => c.id === activity.customer_id)?.full_name} - {formatDate(activity.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.amount && (
                          <p className="font-bold text-green-600">{formatCurrency(activity.amount)}</p>
                        )}
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                          {activity.status === 'completed' ? 'مكتمل' : activity.status === 'pending' ? 'معلق' : 'ملغي'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير العملاء الشهري</CardTitle>
                  <CardDescription>إحصائيات العملاء والنشاط الشهري</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل ولاء العملاء</CardTitle>
                  <CardDescription>معدل العودة وقيمة العميل الدائم</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير التقييمات</CardTitle>
                  <CardDescription>تقييمات العملاء ومستوى الرضا</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">العملاء المتأخرون</CardTitle>
                  <CardDescription>العملاء مع المدفوعات المتأخرة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل الأداء الجغرافي</CardTitle>
                  <CardDescription>توزيع العملاء حسب المناطق</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير النمو</CardTitle>
                  <CardDescription>نمو قاعدة العملاء والإيرادات</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Customers;