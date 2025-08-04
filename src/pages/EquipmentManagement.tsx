import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  Clock, 
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MapPin,
  User,
  FileText,
  BarChart3,
  Timer,
  Zap,
  Shield,
  Activity
} from 'lucide-react';

const EquipmentManagement = () => {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // بيانات تجريبية للمعدات
  const equipment = [
    {
      id: 'EQ-001',
      name: 'مولد كهربائي 500 كيلو وات',
      category: 'power',
      model: 'CAT-500KW',
      serialNumber: 'SN123456789',
      location: 'المستودع الرئيسي - الرياض',
      status: 'operational',
      condition: 'excellent',
      purchaseDate: '2023-01-15',
      purchasePrice: 150000.00,
      currentValue: 135000.00,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      maintenanceCost: 5000.00,
      operatingHours: 2450,
      maxOperatingHours: 8000,
      assignedTo: 'أحمد المهندس',
      warranty: 'ساري حتى 2025-01-15',
      specifications: {
        power: '500 كيلو وات',
        fuel: 'ديزل',
        weight: '2500 كجم',
        dimensions: '3x2x2 متر'
      }
    },
    {
      id: 'EQ-002',
      name: 'رافعة شوكية 3 طن',
      category: 'lifting',
      model: 'Toyota-3T',
      serialNumber: 'SN987654321',
      location: 'المستودع الفرعي - جدة',
      status: 'maintenance',
      condition: 'good',
      purchaseDate: '2022-06-20',
      purchasePrice: 85000.00,
      currentValue: 70000.00,
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05',
      maintenanceCost: 2500.00,
      operatingHours: 3200,
      maxOperatingHours: 10000,
      assignedTo: 'محمد العامل',
      warranty: 'منتهي',
      maintenanceIssue: 'تغيير زيت الهيدروليك',
      specifications: {
        capacity: '3 طن',
        liftHeight: '4.5 متر',
        fuelType: 'غاز البترول المسال',
        weight: '4200 كجم'
      }
    },
    {
      id: 'EQ-003',
      name: 'ضاغط هواء 100 حصان',
      category: 'compressor',
      model: 'Atlas-100HP',
      serialNumber: 'SN456789123',
      location: 'ورشة الصيانة - الدمام',
      status: 'operational',
      condition: 'fair',
      purchaseDate: '2021-03-10',
      purchasePrice: 45000.00,
      currentValue: 30000.00,
      lastMaintenance: '2023-12-20',
      nextMaintenance: '2024-03-20',
      maintenanceCost: 1800.00,
      operatingHours: 5500,
      maxOperatingHours: 12000,
      assignedTo: 'سالم الفني',
      warranty: 'منتهي',
      specifications: {
        power: '100 حصان',
        pressure: '8 بار',
        airFlow: '500 لتر/دقيقة',
        weight: '850 كجم'
      }
    },
    {
      id: 'EQ-004',
      name: 'جهاز لحام أوتوماتيكي',
      category: 'welding',
      model: 'Lincoln-Auto',
      serialNumber: 'SN789123456',
      location: 'ورشة التصنيع - الرياض',
      status: 'out-of-service',
      condition: 'poor',
      purchaseDate: '2020-08-15',
      purchasePrice: 25000.00,
      currentValue: 8000.00,
      lastMaintenance: '2023-11-15',
      nextMaintenance: '2024-02-15',
      maintenanceCost: 3500.00,
      operatingHours: 7800,
      maxOperatingHours: 8000,
      assignedTo: 'خالد اللحام',
      warranty: 'منتهي',
      outOfServiceReason: 'عطل في الدائرة الكهربائية',
      specifications: {
        weldingType: 'MIG/MAG',
        current: '300 أمبير',
        voltage: '380 فولت',
        weight: '120 كجم'
      }
    }
  ];

  const equipmentStats = {
    totalEquipment: 45,
    operational: 38,
    maintenance: 5,
    outOfService: 2,
    totalValue: 2500000.00,
    maintenanceCostThisMonth: 25000.00,
    utilizationRate: 78,
    avgAge: 3.2
  };

  const categories = [
    { id: 'power', name: 'معدات الطاقة', icon: <Zap className="h-5 w-5" />, color: 'yellow' },
    { id: 'lifting', name: 'معدات الرفع', icon: <TrendingUp className="h-5 w-5" />, color: 'blue' },
    { id: 'compressor', name: 'ضواغط', icon: <Activity className="h-5 w-5" />, color: 'green' },
    { id: 'welding', name: 'معدات اللحام', icon: <Zap className="h-5 w-5" />, color: 'orange' },
    { id: 'transport', name: 'معدات النقل', icon: <Settings className="h-5 w-5" />, color: 'purple' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-service': return 'bg-red-100 text-red-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'تشغيلي';
      case 'maintenance': return 'صيانة';
      case 'out-of-service': return 'خارج الخدمة';
      case 'retired': return 'متقاعد';
      default: return status;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionText = (condition) => {
    switch (condition) {
      case 'excellent': return 'ممتاز';
      case 'good': return 'جيد';
      case 'fair': return 'مقبول';
      case 'poor': return 'ضعيف';
      default: return condition;
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const EquipmentCard = ({ item }) => {
    const utilizationPercentage = (item.operatingHours / item.maxOperatingHours) * 100;
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <span>{item.model}</span>
                <span>•</span>
                <span>{getCategoryName(item.category)}</span>
              </CardDescription>
            </div>
            <div className="flex flex-col gap-1">
              <Badge className={getStatusColor(item.status)}>
                {getStatusText(item.status)}
              </Badge>
              <Badge className={getConditionColor(item.condition)}>
                {getConditionText(item.condition)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* معلومات أساسية */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4 text-gray-400" />
                <span>{item.serialNumber}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="truncate">{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-green-500" />
                <span>{item.assignedTo}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-purple-500" />
                <span>{item.currentValue.toFixed(0)} ر.س</span>
              </div>
            </div>

            {/* ساعات التشغيل */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Timer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">ساعات التشغيل</span>
                </div>
                <span className="text-sm font-medium">{item.operatingHours}/{item.maxOperatingHours}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${utilizationPercentage > 80 ? 'bg-red-500' : utilizationPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${utilizationPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600">
                معدل الاستخدام: {utilizationPercentage.toFixed(1)}%
              </div>
            </div>

            {/* معلومات الصيانة */}
            <div className="bg-blue-50 p-3 rounded">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">آخر صيانة:</span>
                  <div className="font-medium">{item.lastMaintenance}</div>
                </div>
                <div>
                  <span className="text-gray-600">الصيانة القادمة:</span>
                  <div className="font-medium">{item.nextMaintenance}</div>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-600">تكلفة الصيانة:</span>
                <span className="font-medium ml-2 text-green-600">{item.maintenanceCost.toFixed(0)} ر.س</span>
              </div>
            </div>

            {/* المواصفات الفنية */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">المواصفات الفنية:</h4>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries(item.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-1 rounded">
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* معلومات إضافية */}
            {item.status === 'maintenance' && item.maintenanceIssue && (
              <div className="bg-yellow-50 p-2 rounded text-sm">
                <strong>سبب الصيانة:</strong> {item.maintenanceIssue}
              </div>
            )}

            {item.status === 'out-of-service' && item.outOfServiceReason && (
              <div className="bg-red-50 p-2 rounded text-sm">
                <strong>سبب التوقف:</strong> {item.outOfServiceReason}
              </div>
            )}

            {/* معلومات الضمان */}
            <div className="text-xs text-gray-600">
              <div>تاريخ الشراء: {item.purchaseDate}</div>
              <div>الضمان: {item.warranty}</div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                عرض
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                تعديل
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Wrench className="h-4 w-4 mr-1" />
                صيانة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CategoryCard = ({ category }) => {
    const categoryEquipment = equipment.filter(item => item.category === category.id);
    const totalValue = categoryEquipment.reduce((sum, item) => sum + item.currentValue, 0);
    const operationalCount = categoryEquipment.filter(item => item.status === 'operational').length;
    
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
              {category.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <CardDescription>{categoryEquipment.length} معدة</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">تشغيلي:</span>
                <span className="font-semibold ml-2 text-green-600">{operationalCount}</span>
              </div>
              <div>
                <span className="text-gray-600">القيمة الإجمالية:</span>
                <span className="font-semibold ml-2">{totalValue.toFixed(0)} ر.س</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">المعدات الأكثر قيمة:</h4>
              {categoryEquipment
                .sort((a, b) => b.currentValue - a.currentValue)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="truncate">{item.name}</span>
                    <span className="text-green-600">{item.currentValue.toFixed(0)} ر.س</span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة المعدات</h1>
          <p className="text-gray-600">إدارة وصيانة المعدات والآلات</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          إضافة معدة جديدة
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المعدات</p>
                <p className="text-2xl font-bold text-blue-600">{equipmentStats.totalEquipment}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تشغيلي</p>
                <p className="text-2xl font-bold text-green-600">{equipmentStats.operational}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                <p className="text-2xl font-bold text-purple-600">{(equipmentStats.totalValue / 1000000).toFixed(1)}م ر.س</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معدل الاستخدام</p>
                <p className="text-2xl font-bold text-orange-600">{equipmentStats.utilizationRate}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="equipment">المعدات</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
          <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-4">
          {/* أدوات البحث والفلترة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في المعدات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="حالة المعدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="operational">تشغيلي</SelectItem>
                    <SelectItem value="maintenance">صيانة</SelectItem>
                    <SelectItem value="out-of-service">خارج الخدمة</SelectItem>
                    <SelectItem value="retired">متقاعد</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="فئة المعدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلاتر متقدمة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة المعدات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEquipment.map(item => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          {/* جدول الصيانة */}
          <Card>
            <CardHeader>
              <CardTitle>جدول الصيانة</CardTitle>
              <CardDescription>مواعيد الصيانة الدورية والطارئة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipment.map(item => {
                  const daysUntilMaintenance = Math.ceil((new Date(item.nextMaintenance).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isOverdue = daysUntilMaintenance < 0;
                  const isUpcoming = daysUntilMaintenance <= 7 && daysUntilMaintenance >= 0;
                  
                  return (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.location}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm">الصيانة القادمة:</p>
                        <p className="font-medium">{item.nextMaintenance}</p>
                        <p className="text-xs text-gray-600">
                          {isOverdue ? `متأخر ${Math.abs(daysUntilMaintenance)} يوم` :
                           isUpcoming ? `خلال ${daysUntilMaintenance} أيام` :
                           `بعد ${daysUntilMaintenance} يوم`}
                        </p>
                      </div>
                      <Badge className={
                        isOverdue ? 'bg-red-100 text-red-800' :
                        isUpcoming ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'maintenance' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {isOverdue ? 'متأخر' :
                         isUpcoming ? 'قريب' :
                         item.status === 'maintenance' ? 'في الصيانة' :
                         'مجدول'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المعدات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي المعدات</span>
                    <span className="font-semibold">{equipmentStats.totalEquipment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>تشغيلي</span>
                    <span className="font-semibold text-green-600">{equipmentStats.operational}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>في الصيانة</span>
                    <span className="font-semibold text-yellow-600">{equipmentStats.maintenance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>خارج الخدمة</span>
                    <span className="font-semibold text-red-600">{equipmentStats.outOfService}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل الاستخدام</span>
                    <span className="font-semibold text-blue-600">{equipmentStats.utilizationRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التكاليف والقيم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>القيمة الإجمالية</span>
                    <span className="font-semibold text-green-600">{equipmentStats.totalValue.toFixed(0)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>تكلفة الصيانة الشهرية</span>
                    <span className="font-semibold text-orange-600">{equipmentStats.maintenanceCostThisMonth.toFixed(0)} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط عمر المعدات</span>
                    <span className="font-semibold">{equipmentStats.avgAge} سنوات</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط قيمة المعدة</span>
                    <span className="font-semibold">{(equipmentStats.totalValue / equipmentStats.totalEquipment).toFixed(0)} ر.س</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentManagement;

