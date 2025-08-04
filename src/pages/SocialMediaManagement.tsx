import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Share2, 
  MessageSquare, 
  Heart, 
  Eye, 
  Users, 
  TrendingUp, 
  Calendar, 
  Clock, 
  BarChart3, 
  PieChart, 
  Target, 
  Zap, 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Repeat, 
  Send, 
  Image, 
  Video, 
  FileText, 
  Link, 
  Hash, 
  AtSign, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Plus, 
  Edit, 
  Trash2, 
  Filter, 
  Search, 
  Download, 
  Upload, 
  Settings, 
  Bell, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info 
} from 'lucide-react';

const SocialMediaManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات نموذجية للمنصات الاجتماعية
  const platforms = [
    {
      id: 1,
      name: 'فيسبوك',
      icon: '📘',
      followers: 125000,
      engagement: 4.2,
      posts: 156,
      reach: 890000,
      growth: 12.5,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'تويتر',
      icon: '🐦',
      followers: 89000,
      engagement: 3.8,
      posts: 234,
      reach: 650000,
      growth: 8.3,
      color: 'bg-sky-500'
    },
    {
      id: 3,
      name: 'إنستغرام',
      icon: '📷',
      followers: 156000,
      engagement: 5.1,
      posts: 189,
      reach: 1200000,
      growth: 18.7,
      color: 'bg-pink-500'
    },
    {
      id: 4,
      name: 'لينكد إن',
      icon: '💼',
      followers: 45000,
      engagement: 2.9,
      posts: 78,
      reach: 320000,
      growth: 15.2,
      color: 'bg-blue-700'
    },
    {
      id: 5,
      name: 'يوتيوب',
      icon: '📺',
      followers: 67000,
      engagement: 6.3,
      posts: 45,
      reach: 2100000,
      growth: 22.1,
      color: 'bg-red-500'
    },
    {
      id: 6,
      name: 'تيك توك',
      icon: '🎵',
      followers: 198000,
      engagement: 8.7,
      posts: 123,
      reach: 3500000,
      growth: 35.4,
      color: 'bg-black'
    }
  ];

  // بيانات المنشورات المجدولة
  const scheduledPosts = [
    {
      id: 1,
      content: 'إطلاق منتج جديد - نظام إدارة الأعمال المتكامل',
      platform: 'فيسبوك',
      type: 'صورة',
      scheduledTime: '2024-01-25 10:00',
      status: 'مجدول',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 2,
      content: 'نصائح لتحسين إنتاجية فريق العمل',
      platform: 'لينكد إن',
      type: 'مقال',
      scheduledTime: '2024-01-25 14:30',
      status: 'مجدول',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 3,
      content: 'فيديو تعريفي بخدماتنا الجديدة',
      platform: 'يوتيوب',
      type: 'فيديو',
      scheduledTime: '2024-01-26 09:00',
      status: 'مجدول',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 4,
      content: 'مسابقة للفوز بخدمات مجانية',
      platform: 'إنستغرام',
      type: 'صورة',
      scheduledTime: '2024-01-24 18:00',
      status: 'منشور',
      engagement: { likes: 245, comments: 32, shares: 18 }
    }
  ];

  // بيانات التحليلات
  const analytics = {
    totalFollowers: 680000,
    totalEngagement: 5.2,
    totalReach: 8660000,
    totalPosts: 825,
    averageGrowth: 18.9,
    topPerformingPost: 'إطلاق خدمة جديدة',
    bestTime: '18:00 - 20:00',
    bestDay: 'الخميس'
  };

  // بيانات الحملات
  const campaigns = [
    {
      id: 1,
      name: 'حملة إطلاق المنتج الجديد',
      platforms: ['فيسبوك', 'إنستغرام', 'تويتر'],
      budget: 15000,
      spent: 8500,
      reach: 450000,
      engagement: 6.8,
      conversions: 234,
      status: 'نشطة',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 2,
      name: 'حملة زيادة الوعي بالعلامة التجارية',
      platforms: ['لينكد إن', 'يوتيوب'],
      budget: 12000,
      spent: 12000,
      reach: 320000,
      engagement: 4.2,
      conversions: 156,
      status: 'مكتملة',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: 3,
      name: 'حملة التفاعل مع العملاء',
      platforms: ['تيك توك', 'إنستغرام'],
      budget: 8000,
      spent: 3200,
      reach: 890000,
      engagement: 9.1,
      conversions: 89,
      status: 'نشطة',
      startDate: '2024-01-20',
      endDate: '2024-02-20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشطة': return 'bg-green-100 text-green-800';
      case 'مكتملة': return 'bg-blue-100 text-blue-800';
      case 'متوقفة': return 'bg-red-100 text-red-800';
      case 'مجدول': return 'bg-yellow-100 text-yellow-800';
      case 'منشور': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'صورة': return <Image className="h-4 w-4" />;
      case 'فيديو': return <Video className="h-4 w-4" />;
      case 'مقال': return <FileText className="h-4 w-4" />;
      case 'رابط': return <Link className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                إدارة وسائل التواصل الاجتماعي
              </h1>
              <p className="text-gray-600">
                إدارة شاملة ومتطورة لجميع منصات التواصل الاجتماعي
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 ml-2" />
                منشور جديد
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 ml-2" />
                جدولة المنشورات
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تقرير شامل
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المتابعين</p>
                  <p className="text-2xl font-bold text-gray-900">{(analytics.totalFollowers / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +{analytics.averageGrowth}% هذا الشهر
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">معدل التفاعل</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalEngagement}%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +0.8% من الأسبوع الماضي
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الوصول</p>
                  <p className="text-2xl font-bold text-gray-900">{(analytics.totalReach / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +12.4% هذا الشهر
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المنشورات</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalPosts}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    هذا الشهر: 156 منشور
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="platforms">المنصات</TabsTrigger>
            <TabsTrigger value="posts">المنشورات</TabsTrigger>
            <TabsTrigger value="campaigns">الحملات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 ml-2" />
                    أداء المنصات
                  </CardTitle>
                  <CardDescription>مقارنة أداء المنصات المختلفة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platforms.slice(0, 4).map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="text-2xl">{platform.icon}</div>
                          <div>
                            <p className="font-medium text-gray-900">{platform.name}</p>
                            <p className="text-sm text-gray-600">{(platform.followers / 1000).toFixed(0)}K متابع</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">{platform.engagement}%</p>
                          <p className="text-xs text-green-600">+{platform.growth}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 ml-2" />
                    المنشورات الحديثة
                  </CardTitle>
                  <CardDescription>آخر المنشورات المجدولة والمنشورة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduledPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {getPostTypeIcon(post.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{post.content}</p>
                          <div className="flex items-center space-x-2 space-x-reverse mt-1">
                            <span className="text-xs text-gray-600">{post.platform}</span>
                            <Badge className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 ml-2" />
                  اتجاه التفاعل الأسبوعي
                </CardTitle>
                <CardDescription>تطور معدل التفاعل خلال الأسابيع الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 space-x-reverse">
                  {[
                    { week: 'الأسبوع 1', engagement: 4.2 },
                    { week: 'الأسبوع 2', engagement: 4.8 },
                    { week: 'الأسبوع 3', engagement: 3.9 },
                    { week: 'الأسبوع 4', engagement: 5.1 },
                    { week: 'الأسبوع 5', engagement: 4.6 },
                    { week: 'الأسبوع 6', engagement: 5.3 }
                  ].map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t-md mb-2 transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${data.engagement * 40}px` }}
                      ></div>
                      <p className="text-xs text-gray-600 text-center">{data.week}</p>
                      <p className="text-xs font-medium text-gray-900">{data.engagement}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <Card key={platform.id} className="border-t-4" style={{ borderTopColor: platform.color.replace('bg-', '#') }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="text-3xl">{platform.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                          <p className="text-sm text-gray-600">منصة اجتماعية</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">المتابعون:</span>
                        <span className="font-medium text-gray-900">
                          {(platform.followers / 1000).toFixed(0)}K
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">معدل التفاعل:</span>
                        <span className="font-medium text-green-600">{platform.engagement}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">المنشورات:</span>
                        <span className="font-medium text-gray-900">{platform.posts}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الوصول:</span>
                        <span className="font-medium text-blue-600">
                          {(platform.reach / 1000).toFixed(0)}K
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">النمو:</span>
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 text-green-600 ml-1" />
                          <span className="text-sm font-medium text-green-600">
                            +{platform.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="h-4 w-4 ml-2" />
                        تحليل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 ml-2" />
                    المنشورات المجدولة
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 ml-2" />
                      فلترة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 ml-2" />
                      بحث
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="flex items-start space-x-4 space-x-reverse p-4 border rounded-lg hover:bg-gray-50">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getPostTypeIcon(post.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 truncate">{post.content}</h4>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Globe className="h-4 w-4 ml-1" />
                          <span className="ml-3">{post.platform}</span>
                          <Clock className="h-4 w-4 mr-3 ml-1" />
                          <span>{post.scheduledTime}</span>
                        </div>
                        
                        {post.status === 'منشور' && (
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 ml-1" />
                              <span>{post.engagement.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 ml-1" />
                              <span>{post.engagement.comments}</span>
                            </div>
                            <div className="flex items-center">
                              <Repeat className="h-4 w-4 ml-1" />
                              <span>{post.engagement.shares}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 ml-2" />
                    الحملات الإعلانية
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 ml-2" />
                    حملة جديدة
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {campaign.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {campaign.platforms.join(' • ')}
                            </p>
                          </div>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">الميزانية:</span>
                            <span className="font-medium text-gray-900">
                              {campaign.budget.toLocaleString()} ريال
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">المصروف:</span>
                            <span className="font-medium text-orange-600">
                              {campaign.spent.toLocaleString()} ريال
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">الوصول:</span>
                            <span className="font-medium text-blue-600">
                              {(campaign.reach / 1000).toFixed(0)}K
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">التفاعل:</span>
                            <span className="font-medium text-green-600">
                              {campaign.engagement}%
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">التحويلات:</span>
                            <span className="font-medium text-purple-600">
                              {campaign.conversions}
                            </span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>{campaign.startDate}</span>
                            <span>{campaign.endDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <BarChart3 className="h-4 w-4 ml-2" />
                            تحليل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 ml-2" />
                    توزيع المتابعين
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platforms.map((platform, index) => {
                      const percentage = ((platform.followers / analytics.totalFollowers) * 100).toFixed(1);
                      return (
                        <div key={platform.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${platform.color} ml-3`}></div>
                            <span className="font-medium text-gray-900">{platform.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 ml-3">
                              {(platform.followers / 1000).toFixed(0)}K
                            </span>
                            <span className="font-medium text-gray-900">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Best Performance Times */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 ml-2" />
                    أفضل أوقات النشر
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">أفضل وقت</span>
                        <span className="text-blue-600 font-semibold">{analytics.bestTime}</span>
                      </div>
                      <p className="text-sm text-gray-600">أعلى معدل تفاعل خلال هذا الوقت</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">أفضل يوم</span>
                        <span className="text-green-600 font-semibold">{analytics.bestDay}</span>
                      </div>
                      <p className="text-sm text-gray-600">أعلى معدل وصول في هذا اليوم</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">أفضل منشور</span>
                        <span className="text-purple-600 font-semibold">8.9%</span>
                      </div>
                      <p className="text-sm text-gray-600">{analytics.topPerformingPost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 ml-2" />
                  مؤشرات الأداء الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      +{analytics.averageGrowth}%
                    </div>
                    <div className="text-sm text-gray-600">نمو المتابعين</div>
                    <div className="text-xs text-green-600 mt-1">مقارنة بالشهر الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {analytics.totalEngagement}%
                    </div>
                    <div className="text-sm text-gray-600">متوسط التفاعل</div>
                    <div className="text-xs text-green-600 mt-1">+0.8% من الأسبوع الماضي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {(analytics.totalReach / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600">إجمالي الوصول</div>
                    <div className="text-xs text-green-600 mt-1">+12.4% هذا الشهر</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      {analytics.totalPosts}
                    </div>
                    <div className="text-sm text-gray-600">إجمالي المنشورات</div>
                    <div className="text-xs text-blue-600 mt-1">156 منشور هذا الشهر</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialMediaManagement;

