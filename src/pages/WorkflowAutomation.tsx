import React, { useState } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Activity,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Target,
  Workflow
} from 'lucide-react';

const WorkflowAutomation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // إحصائيات سير العمل
  const workflowStats = {
    totalWorkflows: 24,
    activeWorkflows: 18,
    completedTasks: 1247,
    timeSaved: '156 ساعة'
  };

  // سير العمل النشط
  const workflows = [
    {
      id: 1,
      name: 'معالجة طلبات العملاء الجدد',
      description: 'أتمتة عملية تسجيل العملاء الجدد والموافقة عليهم',
      status: 'active',
      trigger: 'عند تسجيل عميل جديد',
      steps: 5,
      completedRuns: 89,
      successRate: 94.5,
      avgExecutionTime: '3.2 دقيقة',
      lastRun: '2024-01-15 14:30',
      category: 'عملاء'
    },
    {
      id: 2,
      name: 'إرسال تذكيرات الفواتير',
      description: 'إرسال تذكيرات آلية للفواتير المستحقة',
      status: 'active',
      trigger: 'يومياً في الساعة 9:00 ص',
      steps: 3,
      completedRuns: 156,
      successRate: 98.7,
      avgExecutionTime: '45 ثانية',
      lastRun: '2024-01-15 09:00',
      category: 'مالية'
    },
    {
      id: 3,
      name: 'تحديث حالة المخزون',
      description: 'مراقبة مستويات المخزون وإرسال تنبيهات عند النفاد',
      status: 'active',
      trigger: 'عند تغيير كمية المخزون',
      steps: 4,
      completedRuns: 234,
      successRate: 96.2,
      avgExecutionTime: '1.8 دقيقة',
      lastRun: '2024-01-15 13:45',
      category: 'مخزون'
    },
    {
      id: 4,
      name: 'موافقة طلبات الإجازات',
      description: 'معالجة طلبات الإجازات وإرسالها للموافقة',
      status: 'paused',
      trigger: 'عند تقديم طلب إجازة',
      steps: 6,
      completedRuns: 67,
      successRate: 91.0,
      avgExecutionTime: '2.5 دقيقة',
      lastRun: '2024-01-14 16:20',
      category: 'موارد بشرية'
    },
    {
      id: 5,
      name: 'تقرير المبيعات الأسبوعي',
      description: 'إنشاء وإرسال تقرير المبيعات الأسبوعي تلقائياً',
      status: 'active',
      trigger: 'كل يوم أحد في الساعة 8:00 ص',
      steps: 7,
      completedRuns: 12,
      successRate: 100.0,
      avgExecutionTime: '4.1 دقيقة',
      lastRun: '2024-01-14 08:00',
      category: 'تقارير'
    }
  ];

  // قوالب سير العمل
  const workflowTemplates = [
    {
      id: 1,
      name: 'ترحيب بالعملاء الجدد',
      description: 'سلسلة رسائل ترحيبية للعملاء الجدد',
      category: 'عملاء',
      steps: 4,
      estimatedTime: '2 دقيقة'
    },
    {
      id: 2,
      name: 'متابعة الطلبات المتأخرة',
      description: 'تتبع الطلبات المتأخرة وإرسال تنبيهات',
      category: 'مبيعات',
      steps: 5,
      estimatedTime: '3 دقيقة'
    },
    {
      id: 3,
      name: 'تقييم أداء الموظفين',
      description: 'عملية تقييم دورية لأداء الموظفين',
      category: 'موارد بشرية',
      steps: 8,
      estimatedTime: '10 دقيقة'
    }
  ];

  // إحصائيات الأداء
  const performanceData = [
    { month: 'يناير', completed: 245, failed: 12 },
    { month: 'فبراير', completed: 289, failed: 8 },
    { month: 'مارس', completed: 312, failed: 15 },
    { month: 'أبريل', completed: 298, failed: 7 },
    { month: 'مايو', completed: 334, failed: 11 },
    { month: 'يونيو', completed: 356, failed: 9 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'paused': return 'متوقف';
      case 'error': return 'خطأ';
      default: return 'غير محدد';
    }
  };

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      {/* العنوان الرئيسي */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">أتمتة سير العمل</h1>
        <p className="text-gray-600">إدارة وأتمتة العمليات التجارية لتحسين الكفاءة</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي سير العمل</p>
              <p className="text-2xl font-bold text-gray-900">{workflowStats.totalWorkflows}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Workflow className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">سير العمل النشط</p>
              <p className="text-2xl font-bold text-green-600">{workflowStats.activeWorkflows}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المهام المكتملة</p>
              <p className="text-2xl font-bold text-gray-900">{workflowStats.completedTasks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الوقت المُوفر</p>
              <p className="text-2xl font-bold text-blue-600">{workflowStats.timeSaved}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* التبويبات */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'نظرة عامة', icon: Activity },
              { id: 'workflows', name: 'سير العمل', icon: Workflow },
              { id: 'templates', name: 'القوالب', icon: Plus },
              { id: 'analytics', name: 'التحليلات', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* محتوى التبويبات */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* أداء سير العمل */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء سير العمل</h3>
            <div className="space-y-4">
              {performanceData.slice(-3).map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{data.completed} مكتمل</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{data.failed} فاشل</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أحدث الأنشطة */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">أحدث الأنشطة</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">تم تنفيذ سير عمل "معالجة طلبات العملاء"</p>
                  <p className="text-xs text-gray-500">منذ 5 دقائق</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Play className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">بدء تشغيل "تقرير المبيعات الأسبوعي"</p>
                  <p className="text-xs text-gray-500">منذ 15 دقيقة</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Pause className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">تم إيقاف "موافقة طلبات الإجازات"</p>
                  <p className="text-xs text-gray-500">منذ ساعة</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Plus className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">تم إنشاء سير عمل جديد "تحديث المخزون"</p>
                  <p className="text-xs text-gray-500">منذ 3 ساعات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'workflows' && (
        <div>
          {/* شريط البحث والأدوات */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في سير العمل..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  إنشاء سير عمل
                </button>
              </div>
            </div>
          </div>

          {/* قائمة سير العمل */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الاسم</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الحالة</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الفئة</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">معدل النجاح</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">التشغيلات</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">آخر تشغيل</th>
                    <th className="text-right py-3 px-6 font-semibold text-gray-900">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkflows.map((workflow) => (
                    <tr key={workflow.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">{workflow.name}</div>
                          <div className="text-sm text-gray-500">{workflow.description}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workflow.status)}`}>
                          {getStatusIcon(workflow.status)}
                          {getStatusText(workflow.status)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {workflow.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${workflow.successRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{workflow.successRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{workflow.completedRuns}</td>
                      <td className="py-4 px-6 text-gray-600">{workflow.lastRun}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Settings className="w-4 h-4" />
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
          </div>
        </div>
      )}

      {selectedTab === 'templates' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">قوالب سير العمل</h3>
            <p className="text-gray-600">ابدأ بسرعة باستخدام القوالب الجاهزة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Workflow className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {template.category}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{template.steps} خطوات</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{template.estimatedTime}</span>
                  </div>
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  استخدام القالب
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* رسم بياني للأداء */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء سير العمل الشهري</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {performanceData.map((data, index) => {
                const total = data.completed + data.failed;
                const maxTotal = Math.max(...performanceData.map(d => d.completed + d.failed));
                const height = (total / maxTotal) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col justify-end" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${(data.completed / maxTotal) * 200}px` }}
                      ></div>
                      <div
                        className="w-full bg-red-500"
                        style={{ height: `${(data.failed / maxTotal) * 200}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">مكتمل</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">فاشل</span>
              </div>
            </div>
          </div>

          {/* إحصائيات الفئات */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع سير العمل حسب الفئة</h3>
            <div className="space-y-4">
              {[
                { category: 'عملاء', count: 8, color: 'bg-blue-500' },
                { category: 'مالية', count: 6, color: 'bg-green-500' },
                { category: 'مخزون', count: 4, color: 'bg-yellow-500' },
                { category: 'موارد بشرية', count: 3, color: 'bg-purple-500' },
                { category: 'تقارير', count: 3, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                    <span className="text-gray-700">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / 24) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowAutomation;

