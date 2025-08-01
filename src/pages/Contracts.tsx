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
  FileText, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  User,
  Car,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Contract {
  id: string;
  contract_number: string;
  customer_id: string;
  customer_name: string;
  vehicle_id: string;
  vehicle_info: string;
  contract_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  end_date: string;
  daily_rate: number;
  total_amount: number;
  security_deposit: number;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  payment_status: 'paid' | 'pending' | 'overdue';
  created_by: string;
  created_at: string;
  notes?: string;
  terms_conditions?: string;
}

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock contracts data
  const mockContracts: Contract[] = [
    {
      id: '1',
      contract_number: 'CNT-2024-001',
      customer_id: '1',
      customer_name: 'أحمد محمد الكندري',
      vehicle_id: '1',
      vehicle_info: 'تويوتا كامري 2022 - ABC-123',
      contract_type: 'daily',
      start_date: '2024-01-20',
      end_date: '2024-01-27',
      daily_rate: 25.000,
      total_amount: 175.000,
      security_deposit: 100.000,
      status: 'active',
      payment_status: 'paid',
      created_by: 'مدير المكتب',
      created_at: '2024-01-20T10:00:00Z',
      notes: 'عميل مميز، تم التوصيل للمنزل',
      terms_conditions: 'الشروط والأحكام العامة للإيجار'
    },
    {
      id: '2',
      contract_number: 'CNT-2024-002',
      customer_id: '2',
      customer_name: 'شركة الخليج للتجارة',
      vehicle_id: '2',
      vehicle_info: 'نيسان سنترا 2021 - DEF-456',
      contract_type: 'monthly',
      start_date: '2024-01-01',
      end_date: '2024-01-31',
      daily_rate: 20.000,
      total_amount: 600.000,
      security_deposit: 200.000,
      status: 'active',
      payment_status: 'paid',
      created_by: 'مدير المكتب',
      created_at: '2024-01-01T09:00:00Z',
      notes: 'عقد شهري متجدد',
      terms_conditions: 'شروط خاصة للشركات'
    },
    {
      id: '3',
      contract_number: 'CNT-2024-003',
      customer_id: '3',
      customer_name: 'سارة عبدالله العتيبي',
      vehicle_id: '3',
      vehicle_info: 'كيا سيراتو 2023 - GHI-789',
      contract_type: 'daily',
      start_date: '2023-12-10',
      end_date: '2023-12-15',
      daily_rate: 22.000,
      total_amount: 132.000,
      security_deposit: 80.000,
      status: 'completed',
      payment_status: 'paid',
      created_by: 'مدير المكتب',
      created_at: '2023-12-10T14:30:00Z',
      notes: 'تم إرجاع المركبة متأخراً يومين',
      terms_conditions: 'الشروط والأحكام العامة للإيجار'
    },
    {
      id: '4',
      contract_number: 'CNT-2024-004',
      customer_id: '4',
      customer_name: 'محمد سالم الرشيد',
      vehicle_id: '1',
      vehicle_info: 'تويوتا كامري 2022 - ABC-123',
      contract_type: 'weekly',
      start_date: '2024-01-15',
      end_date: '2024-01-22',
      daily_rate: 25.000,
      total_amount: 175.000,
      security_deposit: 100.000,
      status: 'completed',
      payment_status: 'paid',
      created_by: 'مدير المكتب',
      created_at: '2024-01-15T11:00:00Z',
      notes: 'عميل جديد، تجربة ممتازة',
      terms_conditions: 'الشروط والأحكام العامة للإيجار'
    },
    {
      id: '5',
      contract_number: 'CNT-2024-005',
      customer_id: '1',
      customer_name: 'أحمد محمد الكندري',
      vehicle_id: '2',
      vehicle_info: 'نيسان سنترا 2021 - DEF-456',
      contract_type: 'daily',
      start_date: '2024-01-25',
      end_date: '2024-01-28',
      daily_rate: 20.000,
      total_amount: 80.000,
      security_deposit: 80.000,
      status: 'active',
      payment_status: 'pending',
      created_by: 'مدير المكتب',
      created_at: '2024-01-25T16:00:00Z',
      notes: 'في انتظار الدفع',
      terms_conditions: 'الشروط والأحكام العامة للإيجار'
    }
  ];

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If no data from database, use mock data
      if (!data || data.length === 0) {
        setContracts(mockContracts);
      } else {
        // Map database data to interface format
        const mappedData = data.map(contract => ({
          ...contract,
          customer_name: 'عميل رقم ' + contract.customer_id,
          vehicle_info: 'مركبة رقم ' + contract.vehicle_id,
          created_by: 'مدير النظام',
          payment_status: 'paid' as 'paid' | 'pending' | 'overdue',
          status: contract.status === 'overdue' ? 'expired' : contract.status as 'active' | 'completed' | 'cancelled' | 'expired'
        }));
        setContracts(mappedData);
      }
    } catch (error: any) {
      // Use mock data on error
      setContracts(mockContracts);
      toast({
        title: 'تم استخدام البيانات التجريبية',
        description: 'يتم عرض بيانات تجريبية للمعاينة',
        variant: 'default'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'نشط',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      expired: 'منتهي'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'expired':
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels = {
      paid: 'مدفوع',
      pending: 'معلق',
      overdue: 'متأخر'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getContractTypeLabel = (type: string) => {
    const labels = {
      daily: 'يومي',
      weekly: 'أسبوعي',
      monthly: 'شهري',
      yearly: 'سنوي'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.contract_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.vehicle_info.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.contract_type === typeFilter;
    const matchesPayment = paymentFilter === 'all' || contract.payment_status === paymentFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPayment;
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

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Statistics
  const totalContracts = contracts.length;
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const completedContracts = contracts.filter(c => c.status === 'completed').length;
  const totalRevenue = contracts.reduce((sum, c) => sum + c.total_amount, 0);
  const pendingPayments = contracts.filter(c => c.payment_status === 'pending').length;
  const overduePayments = contracts.filter(c => c.payment_status === 'overdue').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل العقود...</p>
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
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">إدارة العقود</h1>
                <p className="text-sm text-muted-foreground">عقود الإيجار والمتابعة</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => navigate('/contracts/templates')}>
                <FileText className="w-4 h-4 mr-2" />
                قوالب العقود
              </Button>
              <Button onClick={() => navigate('/contracts/new')}>
                <Plus className="w-4 h-4 mr-2" />
                عقد جديد
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
              <FileText className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              العقود النشطة
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              جميع العقود
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center" onClick={() => navigate('/contracts/reports')}>
              <DollarSign className="w-4 h-4 mr-2" />
              التقارير
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي العقود</p>
                      <p className="text-2xl font-bold">{totalContracts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">عقود نشطة</p>
                      <p className="text-2xl font-bold text-green-600">{activeContracts}</p>
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
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">مدفوعات معلقة</p>
                      <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contract Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>حالة العقود</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">عقود نشطة</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {activeContracts} عقد
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">عقود مكتملة</span>
                      </div>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        {completedContracts} عقد
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium">مدفوعات معلقة</span>
                      </div>
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                        {pendingPayments} عقد
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>العقود المنتهية قريباً</CardTitle>
                  <CardDescription>العقود التي تنتهي خلال الأسبوع القادم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contracts
                      .filter(contract => {
                        const endDate = new Date(contract.end_date);
                        const today = new Date();
                        const daysDiff = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                        return daysDiff <= 7 && daysDiff >= 0 && contract.status === 'active';
                      })
                      .map(contract => (
                        <div key={contract.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <div>
                            <p className="font-medium">{contract.contract_number}</p>
                            <p className="text-sm text-muted-foreground">{contract.customer_name}</p>
                            <p className="text-sm text-muted-foreground">
                              ينتهي: {formatDate(contract.end_date)}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            تجديد
                          </Button>
                        </div>
                      ))}
                    {contracts.filter(contract => {
                      const endDate = new Date(contract.end_date);
                      const today = new Date();
                      const daysDiff = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                      return daysDiff <= 7 && daysDiff >= 0 && contract.status === 'active';
                    }).length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        لا توجد عقود تنتهي قريباً
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Active Contracts */}
          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>العقود النشطة ({activeContracts})</CardTitle>
                <CardDescription>العقود الحالية الجارية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contracts.filter(c => c.status === 'active').map((contract) => (
                    <div
                      key={contract.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <p className="font-medium">{contract.contract_number}</p>
                            <Badge className={getPaymentStatusColor(contract.payment_status)}>
                              {getPaymentStatusLabel(contract.payment_status)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {contract.customer_name}
                            </span>
                            <span className="flex items-center">
                              <Car className="w-3 h-3 mr-1" />
                              {contract.vehicle_info}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(contract.start_date)} - {formatDate(contract.end_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatCurrency(contract.total_amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {getContractTypeLabel(contract.contract_type)} - {calculateDuration(contract.start_date, contract.end_date)} يوم
                          </p>
                        </div>
                        <div className="flex space-x-1 space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Contracts */}
          <TabsContent value="all" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في العقود..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-40">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="completed">مكتمل</SelectItem>
                        <SelectItem value="cancelled">ملغي</SelectItem>
                        <SelectItem value="expired">منتهي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-40">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                        <SelectItem value="monthly">شهري</SelectItem>
                        <SelectItem value="yearly">سنوي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-40">
                    <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المدفوعات</SelectItem>
                        <SelectItem value="paid">مدفوع</SelectItem>
                        <SelectItem value="pending">معلق</SelectItem>
                        <SelectItem value="overdue">متأخر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    تصدير
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contracts List */}
            <Card>
              <CardHeader>
                <CardTitle>جميع العقود ({filteredContracts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getStatusIcon(contract.status)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <p className="font-medium">{contract.contract_number}</p>
                            <Badge className={getStatusColor(contract.status)}>
                              {getStatusLabel(contract.status)}
                            </Badge>
                            <Badge className={getPaymentStatusColor(contract.payment_status)}>
                              {getPaymentStatusLabel(contract.payment_status)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {contract.customer_name}
                            </span>
                            <span className="flex items-center">
                              <Car className="w-3 h-3 mr-1" />
                              {contract.vehicle_info}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(contract.start_date)} - {formatDate(contract.end_date)}
                            </span>
                            <span>
                              {getContractTypeLabel(contract.contract_type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatCurrency(contract.total_amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {calculateDuration(contract.start_date, contract.end_date)} يوم - {formatCurrency(contract.daily_rate)}/يوم
                          </p>
                        </div>
                        <div className="flex space-x-1 space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
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
                  <CardTitle className="text-lg">تقرير العقود الشهري</CardTitle>
                  <CardDescription>إحصائيات العقود والإيرادات الشهرية</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل أداء العقود</CardTitle>
                  <CardDescription>معدل التجديد ومدة العقود</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">العقود المتأخرة</CardTitle>
                  <CardDescription>المدفوعات المتأخرة والتحصيل</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير الإيرادات</CardTitle>
                  <CardDescription>إيرادات العقود حسب النوع والفترة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل العملاء</CardTitle>
                  <CardDescription>أداء العملاء وتكرار العقود</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير المركبات</CardTitle>
                  <CardDescription>استخدام المركبات ومعدل الإشغال</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Contracts;