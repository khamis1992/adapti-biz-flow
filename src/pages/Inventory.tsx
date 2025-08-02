import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Filter, Plus, AlertTriangle, TrendingUp, BarChart3, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/hooks/useTenant';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  item_code: string;
  name_ar: string;
  name_en: string;
  description?: string;
  category_name?: string;
  unit_of_measure: string;
  current_quantity: number;
  min_quantity: number;
  max_quantity?: number;
  unit_cost: number;
  total_value: number;
  location?: string;
  supplier_name?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface InventoryCategory {
  id: string;
  name_ar: string;
  name_en: string;
}

export default function Inventory() {
  const navigate = useNavigate();
  const { tenant } = useTenant();
  const { toast } = useToast();
  
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Statistics
  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + item.total_value, 0);
  const lowStockItems = items.filter(item => item.status === 'low_stock').length;
  const outOfStockItems = items.filter(item => item.status === 'out_of_stock').length;

  useEffect(() => {
    if (tenant?.id) {
      fetchData();
    }
  }, [tenant?.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Mock data for now until the database types are updated
      const mockItems: InventoryItem[] = [
        {
          id: '1',
          item_code: 'ITM-001',
          name_ar: 'إطارات سيارة ميشلان',
          name_en: 'Michelin Car Tires',
          description: 'إطارات عالية الجودة للسيارات',
          category_name: 'إطارات',
          unit_of_measure: 'قطعة',
          current_quantity: 45,
          min_quantity: 20,
          max_quantity: 100,
          unit_cost: 75.500,
          total_value: 3397.5,
          location: 'مخزن أ - رف 12',
          supplier_name: 'شركة الإطارات المتحدة',
          status: 'in_stock'
        },
        {
          id: '2',
          item_code: 'ITM-002',
          name_ar: 'زيت محرك كاسترول',
          name_en: 'Castrol Engine Oil',
          description: 'زيت محرك عالي الجودة',
          category_name: 'زيوت ومواد التشحيم',
          unit_of_measure: 'لتر',
          current_quantity: 12,
          min_quantity: 15,
          max_quantity: 50,
          unit_cost: 8.750,
          total_value: 105,
          location: 'مخزن ب - رف 5',
          supplier_name: 'مؤسسة قطع الغيار',
          status: 'low_stock'
        },
        {
          id: '3',
          item_code: 'ITM-003',
          name_ar: 'فلتر هواء',
          name_en: 'Air Filter',
          description: 'فلتر هواء للمحرك',
          category_name: 'فلاتر',
          unit_of_measure: 'قطعة',
          current_quantity: 0,
          min_quantity: 10,
          max_quantity: 30,
          unit_cost: 12.250,
          total_value: 0,
          location: 'مخزن أ - رف 8',
          supplier_name: 'شركة الفلاتر الحديثة',
          status: 'out_of_stock'
        }
      ];

      const mockCategories: InventoryCategory[] = [
        { id: '1', name_ar: 'إطارات', name_en: 'Tires' },
        { id: '2', name_ar: 'زيوت ومواد التشحيم', name_en: 'Oils and Lubricants' },
        { id: '3', name_ar: 'فلاتر', name_en: 'Filters' },
        { id: '4', name_ar: 'بطاريات', name_en: 'Batteries' },
        { id: '5', name_ar: 'قطع غيار خارجية', name_en: 'External Parts' }
      ];

      setItems(mockItems);
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل بيانات المخزون",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category_name === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'default';
      case 'low_stock': return 'secondary';
      case 'out_of_stock': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock': return 'متوفر';
      case 'low_stock': return 'مخزون منخفض';
      case 'out_of_stock': return 'غير متوفر';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Package className="h-8 w-8 animate-spin text-primary" />
          <span className="text-lg">جاري تحميل بيانات المخزون...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للرئيسية
          </Button>
          <div>
            <h1 className="text-3xl font-bold">إدارة المخزون</h1>
            <p className="text-muted-foreground">إدارة المواد والأصناف والكميات</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate('/inventory/new-item')}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة صنف جديد
          </Button>
          <Button variant="outline" onClick={() => navigate('/inventory/purchase-orders')}>
            <FileText className="h-4 w-4 ml-2" />
            أوامر الشراء
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="items">الأصناف</TabsTrigger>
          <TabsTrigger value="movements">حركات المخزون</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الأصناف</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalItems}</div>
                <p className="text-xs text-muted-foreground">
                  صنف في المخزون
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي القيمة</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
                <p className="text-xs text-muted-foreground">
                  قيمة المخزون الحالية
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">مخزون منخفض</CardTitle>
                <AlertTriangle className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{lowStockItems}</div>
                <p className="text-xs text-muted-foreground">
                  صنف يحتاج إعادة تزويد
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">غير متوفر</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{outOfStockItems}</div>
                <p className="text-xs text-muted-foreground">
                  صنف غير متوفر حالياً
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          {(lowStockItems > 0 || outOfStockItems > 0) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">تنبيهات المخزون</h3>
              
              {outOfStockItems > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    يوجد {outOfStockItems} صنف غير متوفر في المخزون ويحتاج إعادة تزويد فوري
                  </AlertDescription>
                </Alert>
              )}
              
              {lowStockItems > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    يوجد {lowStockItems} صنف بمخزون منخفض ويحتاج إعادة تزويد قريباً
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في الأصناف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.name_en}>
                    {category.name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="in_stock">متوفر</SelectItem>
                <SelectItem value="low_stock">مخزون منخفض</SelectItem>
                <SelectItem value="out_of_stock">غير متوفر</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Items Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map(item => (
              <Card key={item.id} className="hover:shadow-medium transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{item.name_ar}</CardTitle>
                    <Badge variant={getStatusColor(item.status)}>
                      {getStatusLabel(item.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.name_en}</p>
                  <p className="text-xs text-muted-foreground">رمز الصنف: {item.item_code}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">الكمية الحالية:</span>
                      <p className="font-medium">{item.current_quantity} {item.unit_of_measure}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الحد الأدنى:</span>
                      <p className="font-medium">{item.min_quantity} {item.unit_of_measure}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">سعر الوحدة:</span>
                      <p className="font-medium">{formatCurrency(item.unit_cost)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">القيمة الإجمالية:</span>
                      <p className="font-medium">{formatCurrency(item.total_value)}</p>
                    </div>
                  </div>
                  
                  {item.category_name && (
                    <p className="text-xs text-muted-foreground">
                      الفئة: {item.category_name}
                    </p>
                  )}
                  
                  {item.location && (
                    <p className="text-xs text-muted-foreground">
                      الموقع: {item.location}
                    </p>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/inventory/items/${item.id}`)}>
                      عرض التفاصيل
                    </Button>
                    <Button size="sm" onClick={() => navigate(`/inventory/items/${item.id}/edit`)}>
                      تعديل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">لا توجد أصناف</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
                  ? 'لا توجد أصناف تطابق معايير البحث'
                  : 'لا توجد أصناف في المخزون حالياً'
                }
              </p>
              <Button onClick={() => navigate('/inventory/new-item')}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة صنف جديد
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 ml-2" />
                حركات المخزون
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم تطوير هذا القسم لعرض تفاصيل حركات دخول وخروج المخزون
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 ml-2" />
                تقارير المخزون
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                سيتم تطوير هذا القسم لعرض تقارير شاملة عن المخزون والقيم والحركات
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}