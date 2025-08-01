import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft,
  Package, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Box,
  ShoppingCart,
  Truck
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  min_quantity: number;
  unit_price: number;
  supplier: string;
  location: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  last_updated: string;
}

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock inventory data - في التطبيق الحقيقي سيتم جلبها من قاعدة البيانات
  const mockInventory: InventoryItem[] = [
    {
      id: '1',
      name: 'إطارات سيارة - ميشلان',
      category: 'إطارات',
      sku: 'TIRE-MCH-001',
      quantity: 45,
      min_quantity: 20,
      unit_price: 75.500,
      supplier: 'شركة الإطارات المتحدة',
      location: 'مخزن أ - رف 12',
      status: 'in_stock',
      last_updated: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      name: 'زيت محرك - كاسترول',
      category: 'زيوت ومواد التشحيم',
      sku: 'OIL-CST-002',
      quantity: 12,
      min_quantity: 15,
      unit_price: 8.750,
      supplier: 'مؤسسة قطع الغيار',
      location: 'مخزن ب - رف 5',
      status: 'low_stock',
      last_updated: '2024-01-18T14:15:00Z'
    },
    {
      id: '3',
      name: 'فلتر هواء',
      category: 'فلاتر',
      sku: 'FLT-AIR-003',
      quantity: 0,
      min_quantity: 10,
      unit_price: 12.250,
      supplier: 'شركة الفلاتر الحديثة',
      location: 'مخزن أ - رف 8',
      status: 'out_of_stock',
      last_updated: '2024-01-15T09:45:00Z'
    },
    {
      id: '4',
      name: 'بطارية سيارة - 12 فولت',
      category: 'بطاريات',
      sku: 'BAT-12V-004',
      quantity: 28,
      min_quantity: 10,
      unit_price: 45.000,
      supplier: 'مجموعة البطاريات الكويتية',
      location: 'مخزن ج - رف 3',
      status: 'in_stock',
      last_updated: '2024-01-22T16:20:00Z'
    },
    {
      id: '5',
      name: 'مساحات زجاج أمامي',
      category: 'قطع غيار خارجية',
      sku: 'WIP-FRT-005',
      quantity: 8,
      min_quantity: 12,
      unit_price: 15.750,
      supplier: 'شركة الإكسسوارات',
      location: 'مخزن ب - رف 10',
      status: 'low_stock',
      last_updated: '2024-01-19T11:30:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setInventoryItems(mockInventory);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      in_stock: 'bg-green-100 text-green-800',
      low_stock: 'bg-yellow-100 text-yellow-800',
      out_of_stock: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      in_stock: 'متوفر',
      low_stock: 'مخزون منخفض',
      out_of_stock: 'نفد المخزون'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'low_stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'out_of_stock':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
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
  const totalItems = inventoryItems.length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const lowStockItems = inventoryItems.filter(item => item.status === 'low_stock').length;
  const outOfStockItems = inventoryItems.filter(item => item.status === 'out_of_stock').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل المخزون...</p>
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
              <Package className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">إدارة المخزون</h1>
                <p className="text-sm text-muted-foreground">مراقبة وإدارة مخزون قطع الغيار والمواد</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => navigate('/inventory/purchase-order')}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                طلب شراء
              </Button>
              <Button onClick={() => navigate('/inventory/new-item')}>
                <Plus className="w-4 h-4 mr-2" />
                صنف جديد
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
              <Package className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center">
              <Box className="w-4 h-4 mr-2" />
              الأصناف
            </TabsTrigger>
            <TabsTrigger value="movements" className="flex items-center">
              <Truck className="w-4 h-4 mr-2" />
              حركة المخزون
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
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
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الأصناف</p>
                      <p className="text-2xl font-bold">{totalItems}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Box className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">قيمة المخزون</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">مخزون منخفض</p>
                      <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <TrendingDown className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">نفد المخزون</p>
                      <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-600">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    تنبيهات المخزون المنخفض
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inventoryItems.filter(item => item.status === 'low_stock').map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">الكمية: {item.quantity} من {item.min_quantity}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          طلب شراء
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <TrendingDown className="w-5 h-5 mr-2" />
                    أصناف نفد مخزونها
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inventoryItems.filter(item => item.status === 'out_of_stock').map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">آخر تحديث: {formatDate(item.last_updated)}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          طلب عاجل
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Items List */}
          <TabsContent value="items" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في المخزون..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الفئات</SelectItem>
                        <SelectItem value="إطارات">إطارات</SelectItem>
                        <SelectItem value="زيوت ومواد التشحيم">زيوت ومواد التشحيم</SelectItem>
                        <SelectItem value="فلاتر">فلاتر</SelectItem>
                        <SelectItem value="بطاريات">بطاريات</SelectItem>
                        <SelectItem value="قطع غيار خارجية">قطع غيار خارجية</SelectItem>
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
                        <SelectItem value="in_stock">متوفر</SelectItem>
                        <SelectItem value="low_stock">مخزون منخفض</SelectItem>
                        <SelectItem value="out_of_stock">نفد المخزون</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-medium transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusLabel(item.status)}
                      </Badge>
                      {getStatusIcon(item.status)}
                    </div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">رمز الصنف:</span>
                        <span className="font-mono text-sm">{item.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الكمية:</span>
                        <span className="font-medium">{item.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">سعر الوحدة:</span>
                        <span className="font-medium">{formatCurrency(item.unit_price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">المورد:</span>
                        <span className="text-sm">{item.supplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الموقع:</span>
                        <span className="text-sm">{item.location}</span>
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
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Movements */}
          <TabsContent value="movements">
            <Card>
              <CardHeader>
                <CardTitle>حركة المخزون</CardTitle>
                <CardDescription>سجل جميع حركات الدخول والخروج للمخزون</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد حركات مخزون مسجلة حتى الآن</p>
                  <Button className="mt-4" variant="outline">
                    تسجيل حركة جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير حالة المخزون</CardTitle>
                  <CardDescription>عرض شامل لجميع الأصناف وحالتها</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير الأصناف البطيئة الحركة</CardTitle>
                  <CardDescription>الأصناف التي لم تتحرك لفترة طويلة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير قيمة المخزون</CardTitle>
                  <CardDescription>القيمة المالية للمخزون حسب الفئات</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير حركة الأصناف</CardTitle>
                  <CardDescription>تحليل حركة دخول وخروج الأصناف</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير المردودات</CardTitle>
                  <CardDescription>الأصناف المردودة والتالفة</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">توقعات إعادة الطلب</CardTitle>
                  <CardDescription>متى يجب إعادة طلب كل صنف</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Inventory;