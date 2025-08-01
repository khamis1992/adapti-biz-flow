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
  ShoppingCart, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Package,
  Truck,
  User,
  Building2,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_name: string;
  supplier_contact: string;
  total_amount: number;
  status: 'draft' | 'sent' | 'approved' | 'received' | 'completed' | 'cancelled';
  order_date: string;
  expected_delivery: string;
  created_by: string;
  items_count: number;
  notes?: string;
}

interface Supplier {
  id: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  payment_terms: string;
}

const Purchasing = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock purchase orders data
  const mockPurchaseOrders: PurchaseOrder[] = [
    {
      id: '1',
      po_number: 'PO-2024-001',
      supplier_name: 'شركة الإطارات المتحدة',
      supplier_contact: 'أحمد المطيري',
      total_amount: 2250.500,
      status: 'approved',
      order_date: '2024-01-20',
      expected_delivery: '2024-01-25',
      created_by: 'مدير المشتريات',
      items_count: 8,
      notes: 'طلب عاجل للإطارات'
    },
    {
      id: '2',
      po_number: 'PO-2024-002',
      supplier_name: 'مؤسسة قطع الغيار',
      supplier_contact: 'سارة العتيبي',
      total_amount: 1450.250,
      status: 'sent',
      order_date: '2024-01-22',
      expected_delivery: '2024-01-28',
      created_by: 'مدير المشتريات',
      items_count: 15
    },
    {
      id: '3',
      po_number: 'PO-2024-003',
      supplier_name: 'شركة الفلاتر الحديثة',
      supplier_contact: 'محمد الرشيد',
      total_amount: 680.750,
      status: 'received',
      order_date: '2024-01-18',
      expected_delivery: '2024-01-23',
      created_by: 'مدير المشتريات',
      items_count: 12
    }
  ];

  // Mock suppliers data
  const mockSuppliers: Supplier[] = [
    {
      id: '1',
      name: 'شركة الإطارات المتحدة',
      contact_person: 'أحمد المطيري',
      phone: '+965 2222 1111',
      email: 'info@unitedtires.com',
      address: 'الشويخ الصناعية، قطعة 5',
      category: 'إطارات ومطاط',
      status: 'active',
      payment_terms: '30 يوم'
    },
    {
      id: '2',
      name: 'مؤسسة قطع الغيار',
      contact_person: 'سارة العتيبي',
      phone: '+965 2333 2222',
      email: 'orders@spareparts.com',
      address: 'الري، شارع بيروت',
      category: 'قطع غيار عامة',
      status: 'active',
      payment_terms: '15 يوم'
    },
    {
      id: '3',
      name: 'شركة الفلاتر الحديثة',
      contact_person: 'محمد الرشيد',
      phone: '+965 2444 3333',
      email: 'sales@modernfilters.com',
      address: 'الفروانية، منطقة اليرموك',
      category: 'فلاتر وزيوت',
      status: 'active',
      payment_terms: '45 يوم'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPurchaseOrders(mockPurchaseOrders);
      setSuppliers(mockSuppliers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      received: 'bg-purple-100 text-purple-800',
      completed: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: 'مسودة',
      sent: 'مرسل',
      approved: 'معتمد',
      received: 'مستلم',
      completed: 'مكتمل',
      cancelled: 'ملغي'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'sent':
        return <Truck className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'received':
        return <Package className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPurchaseOrders = purchaseOrders.filter(po => {
    const matchesSearch = po.po_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.supplier_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
    return matchesSearch && matchesStatus;
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
  const totalOrders = purchaseOrders.length;
  const totalValue = purchaseOrders.reduce((sum, po) => sum + po.total_amount, 0);
  const pendingOrders = purchaseOrders.filter(po => ['sent', 'approved'].includes(po.status)).length;
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري تحميل المشتريات...</p>
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
              <ShoppingCart className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">إدارة المشتريات</h1>
                <p className="text-sm text-muted-foreground">طلبات الشراء والموردين</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => navigate('/purchasing/suppliers')}>
                <Building2 className="w-4 h-4 mr-2" />
                الموردين
              </Button>
              <Button onClick={() => navigate('/purchasing/new-order')}>
                <Plus className="w-4 h-4 mr-2" />
                طلب شراء جديد
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="purchase-orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="purchase-orders" className="flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              طلبات الشراء
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              الموردين
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              تقارير المشتريات
            </TabsTrigger>
          </TabsList>

          {/* Purchase Orders */}
          <TabsContent value="purchase-orders" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                      <p className="text-2xl font-bold">{totalOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">القيمة الإجمالية</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                      <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">الموردين النشطين</p>
                      <p className="text-2xl font-bold text-blue-600">{activeSuppliers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في طلبات الشراء..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="حالة الطلب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="draft">مسودة</SelectItem>
                        <SelectItem value="sent">مرسل</SelectItem>
                        <SelectItem value="approved">معتمد</SelectItem>
                        <SelectItem value="received">مستلم</SelectItem>
                        <SelectItem value="completed">مكتمل</SelectItem>
                        <SelectItem value="cancelled">ملغي</SelectItem>
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

            {/* Purchase Orders List */}
            <Card>
              <CardHeader>
                <CardTitle>طلبات الشراء ({filteredPurchaseOrders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPurchaseOrders.map((po) => (
                    <div
                      key={po.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getStatusIcon(po.status)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <p className="font-medium">{po.po_number}</p>
                            <Badge className={getStatusColor(po.status)}>
                              {getStatusLabel(po.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Building2 className="w-3 h-3 mr-1" />
                              {po.supplier_name}
                            </span>
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {po.supplier_contact}
                            </span>
                            <span className="flex items-center">
                              <Package className="w-3 h-3 mr-1" />
                              {po.items_count} صنف
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(po.order_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatCurrency(po.total_amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            التسليم المتوقع: {formatDate(po.expected_delivery)}
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

          {/* Suppliers */}
          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  الموردين
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة مورد جديد
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suppliers.map((supplier) => (
                    <Card key={supplier.id} className="hover:shadow-medium transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                            {supplier.status === 'active' ? 'نشط' : 'غير نشط'}
                          </Badge>
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        <CardDescription>{supplier.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{supplier.contact_person}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-sm">{supplier.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-sm text-muted-foreground">شروط الدفع:</span>
                            <span className="text-sm">{supplier.payment_terms}</span>
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
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
                  <CardTitle className="text-lg">تقرير المشتريات الشهري</CardTitle>
                  <CardDescription>إجمالي المشتريات والموردين الرئيسيين</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تحليل الموردين</CardTitle>
                  <CardDescription>أداء الموردين والتقييم</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير التكاليف</CardTitle>
                  <CardDescription>تحليل تكاليف المشتريات</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">تقرير الطلبات المتأخرة</CardTitle>
                  <CardDescription>الطلبات المتأخرة والتأخيرات</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">مقارنة الأسعار</CardTitle>
                  <CardDescription>مقارنة أسعار نفس الأصناف بين الموردين</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">اتجاهات المشتريات</CardTitle>
                  <CardDescription>توجهات المشتريات والتنبؤات</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Purchasing;