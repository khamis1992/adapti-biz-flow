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
  Car, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Fuel,
  Wrench
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Vehicle {
  id: string;
  plate_number: string;
  make: string;
  model: string;
  year: number;
  color: string;
  status: 'available' | 'rented' | 'maintenance' | 'out_of_service';
  daily_rate: number;
  monthly_rate: number;
  current_location: string;
  last_maintenance: string;
  next_maintenance: string;
  mileage: number;
  fuel_level: number;
  features: string[];
}

interface Contract {
  id: string;
  contract_number: string;
  vehicle_id: string;
  customer_name: string;
  start_date: string;
  end_date: string;
  daily_rate: number;
  total_amount: number;
  status: 'active' | 'completed' | 'cancelled';
  payment_status: 'paid' | 'pending' | 'overdue';
}

const Fleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [makeFilter, setMakeFilter] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock vehicles data
  const mockVehicles: Vehicle[] = [
    {
      id: '1',
      plate_number: 'ABC-123',
      make: 'تويوتا',
      model: 'كامري',
      year: 2022,
      color: 'أبيض',
      status: 'available',
      daily_rate: 25.000,
      monthly_rate: 600.000,
      current_location: 'المكتب الرئيسي',
      last_maintenance: '2024-01-15',
      next_maintenance: '2024-04-15',
      mileage: 45000,
      fuel_level: 80,
      features: ['مكيف', 'نظام ملاحة GPS', 'مقاعد جلدية']
    },
    {
      id: '2',
      plate_number: 'DEF-456',
      make: 'نيسان',
      model: 'سنترا',
      year: 2021,
      color: 'رمادي',
      status: 'rented',
      daily_rate: 20.000,
      monthly_rate: 500.000,
      current_location: 'مع العميل',
      last_maintenance: '2024-01-10',
      next_maintenance: '2024-04-10',
      mileage: 52000,
      fuel_level: 60,
      features: ['مكيف', 'راديو']
    },
    {
      id: '3',
      plate_number: 'GHI-789',
      make: 'كيا',
      model: 'سيراتو',
      year: 2023,
      color: 'أحمر',
      status: 'maintenance',
      daily_rate: 22.000,
      monthly_rate: 550.000,
      current_location: 'ورشة الصيانة',
      last_maintenance: '2024-01-20',
      next_maintenance: '2024-04-20',
      mileage: 28000,
      fuel_level: 30,
      features: ['مكيف', 'نظام ملاحة GPS', 'كاميرا خلفية']
    }
  ];

  // Mock contracts data
  const mockContracts: Contract[] = [
    {
      id: '1',
      contract_number: 'CNT-2024-001',
      vehicle_id: '2',
      customer_name: 'أحمد محمد الكندري',
      start_date: '2024-01-20',
      end_date: '2024-01-27',
      daily_rate: 20.000,
      total_amount: 140.000,
      status: 'active',
      payment_status: 'paid'
    }
  ];

  useEffect(() => {
    fetchVehicles();
    // Simulate loading contracts
    setTimeout(() => {
      setContracts(mockContracts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('plate_number');

      if (error) throw error;
      
      // If no data from database, use mock data
      if (!data || data.length === 0) {
        setVehicles(mockVehicles);
      } else {
        // Map database data to interface format
        const mappedData = data.map(vehicle => ({
          id: vehicle.id,
          plate_number: vehicle.plate_number,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          color: vehicle.color,
          status: vehicle.status === 'unavailable' ? 'out_of_service' : 
                 vehicle.status === 'reserved' ? 'rented' : 
                 vehicle.status as 'available' | 'rented' | 'maintenance' | 'out_of_service',
          daily_rate: vehicle.daily_rate || 0,
          monthly_rate: vehicle.monthly_rate || 0,
          current_location: vehicle.current_location || 'غير محدد',
          last_maintenance: vehicle.created_at || new Date().toISOString(),
          next_maintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          mileage: 50000,
          fuel_level: 75,
          features: ['مكيف', 'راديو']
        }));
        setVehicles(mappedData);
      }
    } catch (error: any) {
      // Use mock data on error
      setVehicles(mockVehicles);
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
      available: 'bg-green-100 text-green-800',
      rented: 'bg-blue-100 text-blue-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      out_of_service: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      available: 'متاح',
      rented: 'مؤجر',
      maintenance: 'في الصيانة',
      out_of_service: 'خارج الخدمة'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rented':
        return <Car className="w-4 h-4 text-blue-600" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-yellow-600" />;
      case 'out_of_service':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plate_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesMake = makeFilter === 'all' || vehicle.make === makeFilter;
    return matchesSearch && matchesStatus && matchesMake;
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
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === 'available').length;
  const rentedVehicles = vehicles.filter(v => v.status === 'rented').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance').length;
  const occupancyRate = totalVehicles > 0 ? Math.round((rentedVehicles / totalVehicles) * 100) : 0;
  const totalFleetValue = vehicles.reduce((sum, v) => sum + (v.daily_rate * 365), 0); // Estimated annual value

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Car className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل الأسطول...</p>
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
              <Car className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">إدارة الأسطول</h1>
                <p className="text-sm text-muted-foreground">مراقبة وإدارة أسطول المركبات</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => navigate('/fleet/maintenance')}>
                <Wrench className="w-4 h-4 mr-2" />
                الصيانة
              </Button>
              <Button onClick={() => navigate('/fleet/new-vehicle')}>
                <Plus className="w-4 h-4 mr-2" />
                مركبة جديدة
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
              <Car className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              المركبات
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              العقود النشطة
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center">
              <Wrench className="w-4 h-4 mr-2" />
              الصيانة
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Car className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي المركبات</p>
                      <p className="text-2xl font-bold">{totalVehicles}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">متاحة للإيجار</p>
                      <p className="text-2xl font-bold text-green-600">{availableVehicles}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Car className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">مؤجرة حالياً</p>
                      <p className="text-2xl font-bold text-blue-600">{rentedVehicles}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{occupancyRate}%</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">معدل الإشغال</p>
                      <p className="text-2xl font-bold">{occupancyRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fleet Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>حالة الأسطول</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">متاحة للإيجار</span>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {availableVehicles} مركبة
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Car className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">مؤجرة حالياً</span>
                      </div>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        {rentedVehicles} مركبة
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Wrench className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium">في الصيانة</span>
                      </div>
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                        {maintenanceVehicles} مركبة
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>تنبيهات الصيانة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vehicles.filter(v => {
                      const nextMaintenance = new Date(v.next_maintenance);
                      const today = new Date();
                      const daysDiff = Math.ceil((nextMaintenance.getTime() - today.getTime()) / (1000 * 3600 * 24));
                      return daysDiff <= 30;
                    }).map(vehicle => (
                      <div key={vehicle.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <p className="font-medium">{vehicle.plate_number} - {vehicle.make} {vehicle.model}</p>
                          <p className="text-sm text-muted-foreground">
                            صيانة مستحقة: {formatDate(vehicle.next_maintenance)}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          جدولة
                        </Button>
                      </div>
                    ))}
                    {vehicles.filter(v => {
                      const nextMaintenance = new Date(v.next_maintenance);
                      const today = new Date();
                      const daysDiff = Math.ceil((nextMaintenance.getTime() - today.getTime()) / (1000 * 3600 * 24));
                      return daysDiff <= 30;
                    }).length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        لا توجد تنبيهات صيانة حالياً
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vehicles List */}
          <TabsContent value="vehicles" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في المركبات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="available">متاح</SelectItem>
                        <SelectItem value="rented">مؤجر</SelectItem>
                        <SelectItem value="maintenance">في الصيانة</SelectItem>
                        <SelectItem value="out_of_service">خارج الخدمة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={makeFilter} onValueChange={setMakeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="الماركة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الماركات</SelectItem>
                        <SelectItem value="تويوتا">تويوتا</SelectItem>
                        <SelectItem value="نيسان">نيسان</SelectItem>
                        <SelectItem value="كيا">كيا</SelectItem>
                        <SelectItem value="هيونداي">هيونداي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-medium transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(vehicle.status)}>
                        {getStatusLabel(vehicle.status)}
                      </Badge>
                      {getStatusIcon(vehicle.status)}
                    </div>
                    <CardTitle className="text-lg">{vehicle.plate_number}</CardTitle>
                    <CardDescription>{vehicle.make} {vehicle.model} {vehicle.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">اللون:</span>
                        <span className="text-sm">{vehicle.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الإيجار اليومي:</span>
                        <span className="font-medium">{formatCurrency(vehicle.daily_rate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الإيجار الشهري:</span>
                        <span className="font-medium">{formatCurrency(vehicle.monthly_rate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الموقع الحالي:</span>
                        <span className="text-sm">{vehicle.current_location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">عداد المسافة:</span>
                        <span className="text-sm">{vehicle.mileage?.toLocaleString()} كم</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">مستوى الوقود:</span>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Fuel className="w-3 h-3" />
                          <span className="text-sm">{vehicle.fuel_level}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse mt-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Contracts */}
          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>العقود النشطة</CardTitle>
                <CardDescription>العقود الحالية والمستحقة</CardDescription>
              </CardHeader>
              <CardContent>
                {contracts.length > 0 ? (
                  <div className="space-y-4">
                    {contracts.map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <Car className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-medium">{contract.contract_number}</p>
                            <p className="text-sm text-muted-foreground">{contract.customer_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(contract.start_date)} - {formatDate(contract.end_date)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(contract.total_amount)}</p>
                          <Badge variant={contract.payment_status === 'paid' ? 'default' : 'destructive'}>
                            {contract.payment_status === 'paid' ? 'مدفوع' : 'معلق'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">لا توجد عقود نشطة حالياً</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance */}
          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>جدولة الصيانة</CardTitle>
                <CardDescription>الصيانة المجدولة والسجلات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">سيتم عرض جدول الصيانة هنا</p>
                  <Button className="mt-4" variant="outline">
                    جدولة صيانة جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Fleet;