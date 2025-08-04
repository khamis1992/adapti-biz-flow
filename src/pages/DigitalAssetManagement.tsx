import React, { useState } from 'react';
import { 
  FolderOpen, 
  Image, 
  Video, 
  FileText, 
  Music, 
  Download, 
  Upload, 
  Search, 
  Filter,
  Grid,
  List,
  Eye,
  Edit,
  Trash2,
  Share2,
  Tag,
  Calendar,
  User,
  HardDrive,
  TrendingUp,
  Activity,
  BarChart3
} from 'lucide-react';

const DigitalAssetManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات نموذجية للأصول الرقمية
  const assetStats = {
    totalAssets: 8450,
    totalSize: '2.4 TB',
    monthlyGrowth: '+15.2%',
    activeUsers: 156
  };

  const categories = [
    { id: 'all', name: 'جميع الأصول', count: 8450, icon: FolderOpen },
    { id: 'images', name: 'الصور', count: 3200, icon: Image },
    { id: 'videos', name: 'الفيديوهات', count: 1850, icon: Video },
    { id: 'documents', name: 'المستندات', count: 2100, icon: FileText },
    { id: 'audio', name: 'الملفات الصوتية', count: 1300, icon: Music }
  ];

  const assets = [
    {
      id: 1,
      name: 'عرض تقديمي للمنتجات الجديدة',
      type: 'presentation',
      size: '15.2 MB',
      format: 'PPTX',
      uploadDate: '2024-01-15',
      uploadedBy: 'أحمد محمد',
      tags: ['تسويق', 'منتجات', 'عرض'],
      downloads: 45,
      views: 128,
      thumbnail: '/api/placeholder/150/100'
    },
    {
      id: 2,
      name: 'فيديو ترويجي للحملة الصيفية',
      type: 'video',
      size: '245 MB',
      format: 'MP4',
      uploadDate: '2024-01-14',
      uploadedBy: 'سارة أحمد',
      tags: ['فيديو', 'ترويج', 'صيف'],
      downloads: 23,
      views: 89,
      thumbnail: '/api/placeholder/150/100'
    },
    {
      id: 3,
      name: 'تصميم شعار الشركة الجديد',
      type: 'image',
      size: '2.8 MB',
      format: 'PNG',
      uploadDate: '2024-01-13',
      uploadedBy: 'محمد علي',
      tags: ['شعار', 'تصميم', 'هوية'],
      downloads: 67,
      views: 234,
      thumbnail: '/api/placeholder/150/100'
    },
    {
      id: 4,
      name: 'دليل المستخدم النهائي',
      type: 'document',
      size: '8.5 MB',
      format: 'PDF',
      uploadDate: '2024-01-12',
      uploadedBy: 'فاطمة حسن',
      tags: ['دليل', 'مستخدم', 'تعليمات'],
      downloads: 156,
      views: 445,
      thumbnail: '/api/placeholder/150/100'
    },
    {
      id: 5,
      name: 'موسيقى خلفية للإعلانات',
      type: 'audio',
      size: '12.3 MB',
      format: 'MP3',
      uploadDate: '2024-01-11',
      uploadedBy: 'عمر خالد',
      tags: ['موسيقى', 'خلفية', 'إعلان'],
      downloads: 34,
      views: 78,
      thumbnail: '/api/placeholder/150/100'
    },
    {
      id: 6,
      name: 'كتالوج المنتجات 2024',
      type: 'document',
      size: '25.7 MB',
      format: 'PDF',
      uploadDate: '2024-01-10',
      uploadedBy: 'نور الدين',
      tags: ['كتالوج', 'منتجات', '2024'],
      downloads: 89,
      views: 267,
      thumbnail: '/api/placeholder/150/100'
    }
  ];

  const storageUsage = [
    { type: 'الصور', used: 850, total: 1000, color: 'bg-blue-500' },
    { type: 'الفيديوهات', used: 650, total: 800, color: 'bg-green-500' },
    { type: 'المستندات', used: 420, total: 600, color: 'bg-yellow-500' },
    { type: 'الملفات الصوتية', used: 280, total: 400, color: 'bg-purple-500' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-green-500" />;
      case 'document': 
      case 'presentation': return <FileText className="w-5 h-5 text-yellow-500" />;
      case 'audio': return <Music className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'images' && asset.type === 'image') ||
      (selectedCategory === 'videos' && asset.type === 'video') ||
      (selectedCategory === 'documents' && (asset.type === 'document' || asset.type === 'presentation')) ||
      (selectedCategory === 'audio' && asset.type === 'audio');
    
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      {/* العنوان الرئيسي */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الأصول الرقمية</h1>
        <p className="text-gray-600">إدارة وتنظيم جميع الأصول الرقمية للشركة</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الأصول</p>
              <p className="text-2xl font-bold text-gray-900">{assetStats.totalAssets.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الحجم الإجمالي</p>
              <p className="text-2xl font-bold text-gray-900">{assetStats.totalSize}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <HardDrive className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">النمو الشهري</p>
              <p className="text-2xl font-bold text-green-600">{assetStats.monthlyGrowth}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المستخدمون النشطون</p>
              <p className="text-2xl font-bold text-gray-900">{assetStats.activeUsers}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* الشريط الجانبي */}
        <div className="lg:col-span-1">
          {/* الفئات */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">الفئات</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 ml-3" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* استخدام التخزين */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">استخدام التخزين</h3>
            <div className="space-y-4">
              {storageUsage.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.type}</span>
                    <span className="text-gray-500">{item.used}GB / {item.total}GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.used / item.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="lg:col-span-3">
          {/* شريط البحث والأدوات */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الأصول..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  رفع ملف
                </button>
                
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* عرض الأصول */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <div key={asset.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      {getFileIcon(asset.type)}
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{asset.name}</h4>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>{asset.format}</span>
                      <span>•</span>
                      <span>{asset.size}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{asset.uploadDate}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {asset.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {asset.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{asset.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{asset.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{asset.downloads}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Eye className="w-4 h-4" />
                        عرض
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">الاسم</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">النوع</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">الحجم</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">تاريخ الرفع</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">المرفوع بواسطة</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">المشاهدات</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {getFileIcon(asset.type)}
                            <div>
                              <div className="font-medium text-gray-900">{asset.name}</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {asset.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{asset.format}</td>
                        <td className="py-3 px-4 text-gray-600">{asset.size}</td>
                        <td className="py-3 px-4 text-gray-600">{asset.uploadDate}</td>
                        <td className="py-3 px-4 text-gray-600">{asset.uploadedBy}</td>
                        <td className="py-3 px-4 text-gray-600">{asset.views}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalAssetManagement;

