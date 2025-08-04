import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Handshake, 
  Target, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  PlusCircle, 
  MoreHorizontal, 
  Star, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  BarChart3, 
  LineChart 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart, 
  Area, 
  PieChart,
  Pie, 
  Cell 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const partnersData = [
  { id: 1, name: 'شريك ألفا', type: 'تكنولوجي', status: 'نشط', performance: 85, revenue: 120000, deals: 15, joinDate: '2023-01-15' },
  { id: 2, name: 'شريك بيتا', type: 'توزيع', status: 'نشط', performance: 92, revenue: 250000, deals: 28, joinDate: '2022-11-20' },
  { id: 3, name: 'شريك جاما', type: 'تسويق', status: 'في انتظار', performance: 0, revenue: 0, deals: 0, joinDate: '2024-03-10' },
  { id: 4, name: 'شريك دلتا', type: 'استراتيجي', status: 'غير نشط', performance: 60, revenue: 50000, deals: 8, joinDate: '2023-05-01' },
  { id: 5, name: 'شريك إبسيلون', type: 'تكنولوجي', status: 'نشط', performance: 88, revenue: 180000, deals: 22, joinDate: '2023-08-22' },
];

const performanceData = [
  { name: 'شريك ألفا', performance: 85 },
  { name: 'شريك بيتا', performance: 92 },
  { name: 'شريك دلتا', performance: 60 },
  { name: 'شريك إبسيلون', performance: 88 },
];

const revenueData = [
  { name: 'شريك ألفا', revenue: 120000 },
  { name: 'شريك بيتا', revenue: 250000 },
  { name: 'شريك دلتا', revenue: 50000 },
  { name: 'شريك إبسيلون', revenue: 180000 },
];

const partnerTypesData = [
  { name: 'تكنولوجي', value: 2 },
  { name: 'توزيع', value: 1 },
  { name: 'تسويق', value: 1 },
  { name: 'استراتيجي', value: 1 },
];

const PartnershipManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الشركاء</p>
                <p className="text-2xl font-bold text-blue-600">{partnersData.length}</p>
              </div>
              <Handshake className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الشركاء النشطون</p>
                <p className="text-2xl font-bold text-green-600">{partnersData.filter(p => p.status === 'نشط').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات من الشركاء</p>
                <p className="text-2xl font-bold text-purple-600">${partnersData.reduce((acc, p) => acc + p.revenue, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الأداء</p>
                <p className="text-2xl font-bold text-orange-600">{Math.round(partnersData.filter(p => p.status === 'نشط').reduce((acc, p, _, arr) => acc + p.performance / arr.length, 0))}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء الشركاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#8884d8" name="الأداء" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              أنواع الشركاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={partnerTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {partnerTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPartnersList = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>قائمة الشركاء</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              إضافة شريك جديد
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الأداء</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإيرادات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصفقات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الانضمام</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partnersData.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{partner.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={partner.status === 'نشط' ? 'default' : partner.status === 'في انتظار' ? 'secondary' : 'destructive'}
                      className={`${partner.status === 'نشط' ? 'bg-green-100 text-green-800' : partner.status === 'في انتظار' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {partner.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.performance}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${partner.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.deals}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Handshake className="h-8 w-8 text-blue-600" />
            إدارة الشراكات
          </h1>
          <p className="text-gray-600 mt-2">بناء وإدارة علاقات قوية مع شركائك لتحقيق النجاح المشترك</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="partners">قائمة الشركاء</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="partners">
          {renderPartnersList()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnershipManagement;

