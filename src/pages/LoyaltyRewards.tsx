import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gift, 
  Star, 
  Award, 
  Trophy, 
  Crown, 
  Heart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Zap, 
  PlusCircle, 
  MoreHorizontal, 
  Filter, 
  Calendar, 
  Download, 
  RefreshCw, 
  Settings, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  MessageSquare, 
  Share, 
  Bookmark, 
  Tag, 
  Hash, 
  Percent, 
  CreditCard, 
  Coins, 
  Wallet, 
  Receipt, 
  Calculator, 
  PiggyBank, 
  ShoppingCart, 
  Package, 
  Box, 
  Layers, 
  Grid, 
  List, 
  Table, 
  BarChart3, 
  PieChart, 
  LineChart 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart, 
  Area, 
  Pie, 
  Cell, 
  Line 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const loyaltyTiers = [
  { id: 1, name: 'برونزي', minPoints: 0, maxPoints: 999, benefits: ['خصم 5%', 'شحن مجاني للطلبات فوق $50'], color: '#CD7F32', members: 2500 },
  { id: 2, name: 'فضي', minPoints: 1000, maxPoints: 4999, benefits: ['خصم 10%', 'شحن مجاني للطلبات فوق $30', 'دعم أولوية'], color: '#C0C0C0', members: 1200 },
  { id: 3, name: 'ذهبي', minPoints: 5000, maxPoints: 9999, benefits: ['خصم 15%', 'شحن مجاني دائماً', 'دعم VIP', 'عروض حصرية'], color: '#FFD700', members: 450 },
  { id: 4, name: 'بلاتيني', minPoints: 10000, maxPoints: 19999, benefits: ['خصم 20%', 'شحن مجاني دائماً', 'دعم VIP', 'عروض حصرية', 'هدايا شهرية'], color: '#E5E4E2', members: 180 },
  { id: 5, name: 'ماسي', minPoints: 20000, maxPoints: null, benefits: ['خصم 25%', 'شحن مجاني دائماً', 'دعم VIP', 'عروض حصرية', 'هدايا شهرية', 'مدير حساب شخصي'], color: '#B9F2FF', members: 70 },
];

const rewardsData = [
  { id: 1, name: 'خصم 10%', type: 'خصم', cost: 500, category: 'تسوق', status: 'نشط', usage: 1250 },
  { id: 2, name: 'شحن مجاني', type: 'خدمة', cost: 200, category: 'شحن', status: 'نشط', usage: 2100 },
  { id: 3, name: 'منتج مجاني', type: 'منتج', cost: 1000, category: 'هدية', status: 'نشط', usage: 450 },
  { id: 4, name: 'دعوة صديق', type: 'إحالة', cost: 300, category: 'اجتماعي', status: 'نشط', usage: 680 },
  { id: 5, name: 'ترقية VIP', type: 'ترقية', cost: 2000, category: 'خدمة', status: 'محدود', usage: 120 },
];

const pointsActivityData = [
  { name: 'يناير', earned: 45000, redeemed: 32000, net: 13000 },
  { name: 'فبراير', earned: 52000, redeemed: 38000, net: 14000 },
  { name: 'مارس', earned: 48000, redeemed: 35000, net: 13000 },
  { name: 'أبريل', earned: 61000, redeemed: 42000, net: 19000 },
  { name: 'مايو', earned: 58000, redeemed: 45000, net: 13000 },
  { name: 'يونيو', earned: 65000, redeemed: 48000, net: 17000 },
];

const tierDistributionData = loyaltyTiers.map(tier => ({
  name: tier.name,
  value: tier.members,
  color: tier.color
}));

const LoyaltyRewards = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأعضاء</p>
                <p className="text-2xl font-bold text-blue-600">{loyaltyTiers.reduce((acc, tier) => acc + tier.members, 0).toLocaleString()}</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +15.3% عن الشهر الماضي
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">النقاط المكتسبة هذا الشهر</p>
                <p className="text-2xl font-bold text-green-600">65,000</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +12.1% عن الشهر الماضي
                </p>
              </div>
              <Star className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">النقاط المستبدلة</p>
                <p className="text-2xl font-bold text-purple-600">48,000</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8.7% عن الشهر الماضي
                </p>
              </div>
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الاستبدال</p>
                <p className="text-2xl font-bold text-orange-600">73.8%</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +2.4% عن الشهر الماضي
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
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
              نشاط النقاط الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={pointsActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="earned" fill="#8884d8" name="النقاط المكتسبة" />
                <Bar dataKey="redeemed" fill="#82ca9d" name="النقاط المستبدلة" />
                <Line type="monotone" dataKey="net" stroke="#ff7300" name="صافي النقاط" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المستويات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tierDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tierDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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

  const renderTiers = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>مستويات الولاء</CardTitle>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              إضافة مستوى جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loyaltyTiers.map((tier) => (
              <Card key={tier.id} className="border-2" style={{ borderColor: tier.color }}>
                <CardHeader className="text-center" style={{ backgroundColor: `${tier.color}20` }}>
                  <div className="flex items-center justify-center mb-2">
                    {tier.name === 'برونزي' && <Award className="h-8 w-8" style={{ color: tier.color }} />}
                    {tier.name === 'فضي' && <Star className="h-8 w-8" style={{ color: tier.color }} />}
                    {tier.name === 'ذهبي' && <Trophy className="h-8 w-8" style={{ color: tier.color }} />}
                    {tier.name === 'بلاتيني' && <Crown className="h-8 w-8" style={{ color: tier.color }} />}
                    {tier.name === 'ماسي' && <Gift className="h-8 w-8" style={{ color: tier.color }} />}
                  </div>
                  <CardTitle style={{ color: tier.color }}>{tier.name}</CardTitle>
                  <CardDescription>
                    {tier.minPoints} - {tier.maxPoints ? tier.maxPoints : '∞'} نقطة
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{tier.members.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">عضو</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">المزايا:</p>
                      <ul className="space-y-1">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRewards = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>كتالوج المكافآت</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              إضافة مكافأة جديدة
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المكافأة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التكلفة (نقطة)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مرات الاستخدام</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rewardsData.map((reward) => (
                <tr key={reward.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reward.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reward.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reward.cost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reward.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={reward.status === 'نشط' ? 'default' : 'secondary'}
                      className={`${reward.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {reward.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reward.usage.toLocaleString()}</td>
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
            <Gift className="h-8 w-8 text-blue-600" />
            نظام المكافآت والولاء
          </h1>
          <p className="text-gray-600 mt-2">بناء علاقات قوية مع العملاء من خلال برنامج مكافآت شامل</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="tiers">مستويات الولاء</TabsTrigger>
          <TabsTrigger value="rewards">كتالوج المكافآت</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="tiers">
          {renderTiers()}
        </TabsContent>

        <TabsContent value="rewards">
          {renderRewards()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltyRewards;

