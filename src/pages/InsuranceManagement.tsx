import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Plus, 
  Search, 
  Calendar, 
  AlertTriangle, 
  FileText, 
  Car, 
  Building, 
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Insurance {
  id: string;
  policyNumber: string;
  type: 'vehicle' | 'equipment' | 'building' | 'liability';
  provider: string;
  assetName: string;
  startDate: string;
  endDate: string;
  premium: number;
  coverage: number;
  status: 'active' | 'expired' | 'expiring_soon';
  claimsCount: number;
}

interface Claim {
  id: string;
  policyId: string;
  claimNumber: string;
  incidentDate: string;
  reportDate: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  description: string;
}

const InsuranceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock data for insurance policies
  const [insurances] = useState<Insurance[]>([
    {
      id: '1',
      policyNumber: 'POL-2024-001',
      type: 'vehicle',
      provider: 'شركة التأمين الوطنية',
      assetName: 'تويوتا كامري 2023',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      premium: 2500,
      coverage: 50000,
      status: 'active',
      claimsCount: 0
    },
    {
      id: '2',
      policyNumber: 'POL-2024-002',
      type: 'equipment',
      provider: 'شركة الحماية للتأمين',
      assetName: 'معدات البناء - حفار',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      premium: 5000,
      coverage: 150000,
      status: 'expiring_soon',
      claimsCount: 1
    },
    {
      id: '3',
      policyNumber: 'POL-2023-015',
      type: 'building',
      provider: 'التأمين العربي',
      assetName: 'مبنى المكاتب الرئيسي',
      startDate: '2023-06-01',
      endDate: '2024-06-01',
      premium: 8000,
      coverage: 500000,
      status: 'expired',
      claimsCount: 0
    }
  ]);

  // Mock data for claims
  const [claims] = useState<Claim[]>([
    {
      id: '1',
      policyId: '2',
      claimNumber: 'CLM-2024-001',
      incidentDate: '2024-07-15',
      reportDate: '2024-07-16',
      amount: 15000,
      status: 'approved',
      description: 'تلف في المعدات بسبب حادث'
    },
    {
      id: '2',
      policyId: '1',
      claimNumber: 'CLM-2024-002',
      incidentDate: '2024-08-01',
      reportDate: '2024-08-02',
      amount: 3000,
      status: 'pending',
      description: 'خدوش في السيارة'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'expiring_soon': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي';
      case 'expiring_soon': return 'ينتهي قريباً';
      case 'approved': return 'موافق عليه';
      case 'pending': return 'قيد المراجعة';
      case 'rejected': return 'مرفوض';
      case 'paid': return 'مدفوع';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vehicle': return <Car className="h-4 w-4" />;
      case 'equipment': return <Building className="h-4 w-4" />;
      case 'building': return <Building className="h-4 w-4" />;
      case 'liability': return <Users className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'vehicle': return 'مركبات';
      case 'equipment': return 'معدات';
      case 'building': return 'مباني';
      case 'liability': return 'مسؤولية';
      default: return type;
    }
  };

  const filteredInsurances = insurances.filter(insurance => {
    const matchesSearch = insurance.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insurance.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insurance.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || insurance.type === selectedType;
    return matchesSearch && matchesType;
  });

  const expiringPolicies = insurances.filter(insurance => insurance.status === 'expiring_soon');
  const expiredPolicies = insurances.filter(insurance => insurance.status === 'expired');
  const activePolicies = insurances.filter(insurance => insurance.status === 'active');
  const totalPremium = insurances.reduce((sum, insurance) => sum + insurance.premium, 0);
  const totalCoverage = insurances.reduce((sum, insurance) => sum + insurance.coverage, 0);

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            إدارة التأمينات
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع بوالص التأمين والمطالبات</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة بوليصة جديدة
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي البوالص</p>
                <p className="text-2xl font-bold text-gray-900">{insurances.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">البوالص النشطة</p>
                <p className="text-2xl font-bold text-green-600">{activePolicies.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تنتهي قريباً</p>
                <p className="text-2xl font-bold text-yellow-600">{expiringPolicies.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">منتهية</p>
                <p className="text-2xl font-bold text-red-600">{expiredPolicies.length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأقساط السنوية</p>
                <p className="text-2xl font-bold text-gray-900">{totalPremium.toLocaleString()} ريال</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي التغطية</p>
                <p className="text-2xl font-bold text-gray-900">{totalCoverage.toLocaleString()} ريال</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="policies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="policies">بوالص التأمين</TabsTrigger>
          <TabsTrigger value="claims">المطالبات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">البحث</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="البحث برقم البوليصة، اسم الأصل، أو شركة التأمين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">نوع التأمين</Label>
                  <select
                    id="type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">جميع الأنواع</option>
                    <option value="vehicle">مركبات</option>
                    <option value="equipment">معدات</option>
                    <option value="building">مباني</option>
                    <option value="liability">مسؤولية</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policies List */}
          <div className="grid gap-6">
            {filteredInsurances.map((insurance) => (
              <Card key={insurance.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(insurance.type)}
                      <div>
                        <CardTitle className="text-lg">{insurance.assetName}</CardTitle>
                        <CardDescription>
                          بوليصة رقم: {insurance.policyNumber} | {insurance.provider}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(insurance.status)}>
                      {getStatusText(insurance.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">تاريخ الانتهاء</p>
                        <p className="font-medium">{new Date(insurance.endDate).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">القسط السنوي</p>
                        <p className="font-medium">{insurance.premium.toLocaleString()} ريال</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">مبلغ التغطية</p>
                        <p className="font-medium">{insurance.coverage.toLocaleString()} ريال</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">المطالبات</p>
                        <p className="font-medium">{insurance.claimsCount} مطالبة</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm">
                      تجديد
                    </Button>
                    <Button variant="outline" size="sm">
                      إضافة مطالبة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إدارة المطالبات</CardTitle>
              <CardDescription>متابعة جميع مطالبات التأمين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">مطالبة رقم: {claim.claimNumber}</h3>
                        <p className="text-sm text-gray-600">{claim.description}</p>
                      </div>
                      <Badge className={getStatusColor(claim.status)}>
                        {getStatusText(claim.status)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">تاريخ الحادث: </span>
                        <span className="font-medium">{new Date(claim.incidentDate).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">تاريخ الإبلاغ: </span>
                        <span className="font-medium">{new Date(claim.reportDate).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">المبلغ المطالب: </span>
                        <span className="font-medium">{claim.amount.toLocaleString()} ريال</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        عرض التفاصيل
                      </Button>
                      <Button variant="outline" size="sm">
                        تحديث الحالة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقرير الأقساط</CardTitle>
                <CardDescription>ملخص الأقساط المدفوعة والمستحقة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>إجمالي الأقساط السنوية:</span>
                    <span className="font-bold">{totalPremium.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الأقساط المدفوعة:</span>
                    <span className="font-bold text-green-600">{(totalPremium * 0.8).toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الأقساط المستحقة:</span>
                    <span className="font-bold text-red-600">{(totalPremium * 0.2).toLocaleString()} ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تقرير المطالبات</CardTitle>
                <CardDescription>إحصائيات المطالبات والتعويضات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>إجمالي المطالبات:</span>
                    <span className="font-bold">{claims.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المطالبات المعتمدة:</span>
                    <span className="font-bold text-green-600">
                      {claims.filter(c => c.status === 'approved').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>قيد المراجعة:</span>
                    <span className="font-bold text-yellow-600">
                      {claims.filter(c => c.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>إجمالي المبالغ المطالبة:</span>
                    <span className="font-bold">
                      {claims.reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()} ريال
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expiring Policies Alert */}
          {expiringPolicies.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  تنبيه: بوالص تنتهي قريباً
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {expiringPolicies.map((policy) => (
                    <div key={policy.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium">{policy.assetName}</p>
                        <p className="text-sm text-gray-600">
                          ينتهي في: {new Date(policy.endDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        تجديد الآن
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceManagement;

