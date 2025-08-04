import React, { useState } from 'react';
import { 
  Users, MessageCircle, Video, Share2, Edit, Eye,
  Clock, Bell, CheckCircle, AlertCircle, User,
  Calendar, FileText, Folder, Settings, Search,
  Plus, Filter, Download, Upload, Send, Phone,
  Monitor, Mic, MicOff, VideoOff, MoreHorizontal
} from 'lucide-react';

const RealtimeCollaboration = () => {
  const [activeTab, setActiveTab] = useState('workspace');
  const [selectedProject, setSelectedProject] = useState('erp-development');

  // Active users data
  const activeUsers = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'مدير المشروع',
      status: 'online',
      avatar: '👨‍💼',
      lastActive: 'الآن',
      currentTask: 'مراجعة التقارير المالية'
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      role: 'مطور واجهات',
      status: 'online',
      avatar: '👩‍💻',
      lastActive: 'الآن',
      currentTask: 'تطوير واجهة العملاء'
    },
    {
      id: 3,
      name: 'محمد علي',
      role: 'محلل أعمال',
      status: 'away',
      avatar: '👨‍💻',
      lastActive: 'منذ 5 دقائق',
      currentTask: 'تحليل متطلبات النظام'
    },
    {
      id: 4,
      name: 'سارة خالد',
      role: 'مصمم UX/UI',
      status: 'online',
      avatar: '👩‍🎨',
      lastActive: 'الآن',
      currentTask: 'تصميم لوحة التحكم'
    },
    {
      id: 5,
      name: 'عبدالله سعد',
      role: 'مهندس قواعد البيانات',
      status: 'busy',
      avatar: '👨‍🔧',
      lastActive: 'منذ دقيقتين',
      currentTask: 'تحسين أداء قاعدة البيانات'
    }
  ];

  const projects = [
    {
      id: 'erp-development',
      name: 'تطوير نظام ERP',
      members: 12,
      progress: 78,
      deadline: '2025-09-15',
      status: 'active'
    },
    {
      id: 'mobile-app',
      name: 'تطبيق الهاتف المحمول',
      members: 8,
      progress: 45,
      deadline: '2025-10-30',
      status: 'active'
    },
    {
      id: 'website-redesign',
      name: 'إعادة تصميم الموقع',
      members: 6,
      progress: 92,
      deadline: '2025-08-20',
      status: 'review'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'أحمد محمد',
      action: 'قام بتحديث',
      target: 'تقرير المبيعات الشهري',
      time: 'منذ 2 دقيقة',
      type: 'edit'
    },
    {
      id: 2,
      user: 'فاطمة أحمد',
      action: 'أضافت تعليق على',
      target: 'واجهة إدارة العملاء',
      time: 'منذ 5 دقائق',
      type: 'comment'
    },
    {
      id: 3,
      user: 'محمد علي',
      action: 'رفع ملف',
      target: 'متطلبات النظام v2.1',
      time: 'منذ 10 دقائق',
      type: 'upload'
    },
    {
      id: 4,
      user: 'سارة خالد',
      action: 'شاركت',
      target: 'نماذج التصميم الجديدة',
      time: 'منذ 15 دقيقة',
      type: 'share'
    },
    {
      id: 5,
      user: 'عبدالله سعد',
      action: 'أكمل مهمة',
      target: 'تحسين استعلامات قاعدة البيانات',
      time: 'منذ 20 دقيقة',
      type: 'complete'
    }
  ];

  const chatMessages = [
    {
      id: 1,
      user: 'أحمد محمد',
      message: 'مرحباً جميعاً، هل يمكننا مراجعة التقرير المالي اليوم؟',
      time: '14:30',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      user: 'فاطمة أحمد',
      message: 'بالطبع، لقد أنهيت العمل على واجهة العملاء',
      time: '14:32',
      avatar: '👩‍💻'
    },
    {
      id: 3,
      user: 'محمد علي',
      message: 'ممتاز! سأرسل تحديث المتطلبات خلال ساعة',
      time: '14:35',
      avatar: '👨‍💻'
    },
    {
      id: 4,
      user: 'سارة خالد',
      message: 'النماذج الجديدة جاهزة للمراجعة 🎨',
      time: '14:38',
      avatar: '👩‍🎨'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'خطة المشروع الرئيسية',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2025-08-04 14:30',
      collaborators: ['أحمد محمد', 'محمد علي'],
      status: 'editing'
    },
    {
      id: 2,
      name: 'تصميم قاعدة البيانات',
      type: 'Excel',
      size: '1.8 MB',
      lastModified: '2025-08-04 13:45',
      collaborators: ['عبدالله سعد', 'محمد علي'],
      status: 'review'
    },
    {
      id: 3,
      name: 'واجهات المستخدم',
      type: 'Figma',
      size: '5.2 MB',
      lastModified: '2025-08-04 15:20',
      collaborators: ['سارة خالد', 'فاطمة أحمد'],
      status: 'completed'
    },
    {
      id: 4,
      name: 'دليل المستخدم',
      type: 'Word',
      size: '3.1 MB',
      lastModified: '2025-08-04 12:15',
      collaborators: ['أحمد محمد'],
      status: 'draft'
    }
  ];

  const renderWorkspace = () => (
    <div className="space-y-6">
      {/* Active Users */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">المستخدمون النشطون ({activeUsers.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-3 space-x-reverse p-3 border rounded-lg hover:bg-gray-50">
              <div className="relative">
                <span className="text-2xl">{user.avatar}</span>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  user.status === 'online' ? 'bg-green-500' :
                  user.status === 'away' ? 'bg-yellow-500' :
                  user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.role}</p>
                <p className="text-xs text-gray-400 truncate">{user.currentTask}</p>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <button className="text-blue-600 hover:text-blue-800">
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Video className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">المشاريع النشطة</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.members} أعضاء • الموعد النهائي: {project.deadline}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'active' ? 'bg-green-100 text-green-800' :
                  project.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status === 'active' ? 'نشط' :
                   project.status === 'review' ? 'مراجعة' : 'مكتمل'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 ml-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>التقدم</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">الأنشطة الأخيرة</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${
                activity.type === 'edit' ? 'bg-blue-100' :
                activity.type === 'comment' ? 'bg-green-100' :
                activity.type === 'upload' ? 'bg-purple-100' :
                activity.type === 'share' ? 'bg-orange-100' :
                'bg-gray-100'
              }`}>
                {activity.type === 'edit' && <Edit className="h-4 w-4 text-blue-600" />}
                {activity.type === 'comment' && <MessageCircle className="h-4 w-4 text-green-600" />}
                {activity.type === 'upload' && <Upload className="h-4 w-4 text-purple-600" />}
                {activity.type === 'share' && <Share2 className="h-4 w-4 text-orange-600" />}
                {activity.type === 'complete' && <CheckCircle className="h-4 w-4 text-gray-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="space-y-6">
      {/* Team Chat */}
      <div className="bg-white rounded-lg shadow-sm border h-96 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">محادثة الفريق</h3>
          <p className="text-sm text-gray-600">5 أعضاء متصلين</p>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {chatMessages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3 space-x-reverse">
              <span className="text-xl">{message.avatar}</span>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">{message.user}</p>
                  <p className="text-sm text-gray-700 mt-1">{message.message}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2 space-x-reverse">
            <input 
              type="text" 
              placeholder="اكتب رسالة..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-green-100 rounded-lg">
              <Video className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <p className="font-medium">بدء مكالمة فيديو</p>
              <p className="text-sm text-gray-600">اجتماع سريع مع الفريق</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Monitor className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="font-medium">مشاركة الشاشة</p>
              <p className="text-sm text-gray-600">عرض العمل للفريق</p>
            </div>
          </div>
        </button>
        
        <button className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-right">
              <p className="font-medium">جدولة اجتماع</p>
              <p className="text-sm text-gray-600">تحديد موعد للفريق</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Document Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">المستندات المشتركة</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="البحث في المستندات..."
                className="pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Plus className="h-4 w-4 ml-2" />
              مستند جديد
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size} • {doc.lastModified}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'editing' ? 'bg-blue-100 text-blue-800' :
                    doc.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                    doc.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.status === 'editing' ? 'قيد التحرير' :
                     doc.status === 'review' ? 'مراجعة' :
                     doc.status === 'completed' ? 'مكتمل' : 'مسودة'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-gray-600">المتعاونون:</span>
                  <div className="flex -space-x-1 space-x-reverse">
                    {doc.collaborators.map((collaborator, index) => (
                      <div key={index} className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                        {collaborator.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-800">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="text-purple-600 hover:text-purple-800">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMeetings = () => (
    <div className="space-y-6">
      {/* Video Conference */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مؤتمر الفيديو</h3>
        <div className="bg-gray-900 rounded-lg p-8 text-center text-white mb-4">
          <div className="mb-4">
            <Video className="h-16 w-16 mx-auto text-gray-400" />
          </div>
          <p className="text-lg mb-2">لا يوجد اجتماع نشط حالياً</p>
          <p className="text-gray-400 mb-4">ابدأ اجتماعاً جديداً أو انضم إلى اجتماع موجود</p>
          <div className="flex justify-center space-x-3 space-x-reverse">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Video className="h-4 w-4 ml-2" />
              بدء اجتماع جديد
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 flex items-center">
              <Phone className="h-4 w-4 ml-2" />
              الانضمام لاجتماع
            </button>
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="flex justify-center space-x-4 space-x-reverse">
          <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
            <Mic className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
            <Video className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
            <Monitor className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-3 bg-red-100 rounded-full hover:bg-red-200">
            <Phone className="h-5 w-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Scheduled Meetings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">الاجتماعات المجدولة</h3>
        <div className="space-y-4">
          {[
            {
              title: 'مراجعة التقدم الأسبوعي',
              time: '2025-08-05 10:00',
              duration: '60 دقيقة',
              attendees: 8,
              status: 'upcoming'
            },
            {
              title: 'عرض النماذج الجديدة',
              time: '2025-08-05 14:30',
              duration: '45 دقيقة',
              attendees: 5,
              status: 'upcoming'
            },
            {
              title: 'اجتماع فريق التطوير',
              time: '2025-08-04 15:00',
              duration: '90 دقيقة',
              attendees: 12,
              status: 'completed'
            }
          ].map((meeting, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{meeting.title}</h4>
                  <p className="text-sm text-gray-600">{meeting.time} • {meeting.duration} • {meeting.attendees} مشارك</p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {meeting.status === 'upcoming' ? 'قادم' : 'مكتمل'}
                  </span>
                  {meeting.status === 'upcoming' && (
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      انضمام
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'workspace', name: 'مساحة العمل', icon: Users },
    { id: 'chat', name: 'المحادثة', icon: MessageCircle },
    { id: 'documents', name: 'المستندات', icon: FileText },
    { id: 'meetings', name: 'الاجتماعات', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">التعاون في الوقت الفعلي</h1>
              <p className="text-gray-600 mt-2">منصة تعاون شاملة للفرق والمشاريع</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="erp-development">تطوير نظام ERP</option>
                <option value="mobile-app">تطبيق الهاتف المحمول</option>
                <option value="website-redesign">إعادة تصميم الموقع</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Bell className="h-4 w-4 ml-2" />
                الإشعارات
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 ml-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'workspace' && renderWorkspace()}
          {activeTab === 'chat' && renderChat()}
          {activeTab === 'documents' && renderDocuments()}
          {activeTab === 'meetings' && renderMeetings()}
        </div>
      </div>
    </div>
  );
};

export default RealtimeCollaboration;

