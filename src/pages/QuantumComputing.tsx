import React, { useState } from 'react';
import { 
  Cpu, Zap, Brain, Globe, Shield, Clock,
  TrendingUp, BarChart3, Settings, Play, Pause,
  CheckCircle, AlertTriangle, Eye, Download, Upload,
  Database, Server, Key, Lock, Atom, Layers,
  Activity, RefreshCw, FileText, Code, Terminal
} from 'lucide-react';

const QuantumComputing = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isQuantumRunning, setIsQuantumRunning] = useState(false);

  // Quantum systems data
  const quantumSystems = [
    {
      id: 1,
      name: 'نظام الحوسبة الكمية الرئيسي',
      type: 'IBM Quantum',
      qubits: 127,
      status: 'online',
      uptime: '99.8%',
      temperature: '0.015K',
      coherenceTime: '100μs',
      gateError: '0.1%',
      location: 'مركز البيانات الرئيسي'
    },
    {
      id: 2,
      name: 'محاكي الحوسبة الكمية',
      type: 'Google Cirq',
      qubits: 72,
      status: 'online',
      uptime: '99.9%',
      temperature: 'N/A',
      coherenceTime: 'N/A',
      gateError: '0.05%',
      location: 'السحابة الهجينة'
    },
    {
      id: 3,
      name: 'نظام الكمية التجريبي',
      type: 'Rigetti Quantum',
      qubits: 32,
      status: 'maintenance',
      uptime: '95.2%',
      temperature: '0.012K',
      coherenceTime: '80μs',
      gateError: '0.2%',
      location: 'مختبر الأبحاث'
    }
  ];

  const stats = [
    {
      title: 'إجمالي الكيوبت',
      value: '231',
      change: '+32',
      icon: Atom,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'المهام المكتملة',
      value: '1,247',
      change: '+18.5%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'وقت التشغيل',
      value: '99.6%',
      change: '+0.2%',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'خوارزميات نشطة',
      value: '15',
      change: '+3',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Quantum algorithms
  const algorithms = [
    {
      id: 1,
      name: 'خوارزمية شور للتشفير',
      description: 'تحليل الأعداد الكبيرة لكسر التشفير',
      status: 'running',
      progress: 67,
      qubitsUsed: 45,
      estimatedTime: '2.5 ساعة',
      complexity: 'عالية',
      applications: ['الأمان السيبراني', 'التشفير']
    },
    {
      id: 2,
      name: 'خوارزمية جروفر للبحث',
      description: 'البحث السريع في قواعد البيانات الكبيرة',
      status: 'completed',
      progress: 100,
      qubitsUsed: 32,
      estimatedTime: 'مكتمل',
      complexity: 'متوسطة',
      applications: ['قواعد البيانات', 'البحث']
    },
    {
      id: 3,
      name: 'محاكاة الجزيئات الكيميائية',
      description: 'محاكاة التفاعلات الكيميائية المعقدة',
      status: 'queued',
      progress: 0,
      qubitsUsed: 89,
      estimatedTime: '4.2 ساعة',
      complexity: 'عالية جداً',
      applications: ['الأدوية', 'الكيمياء']
    },
    {
      id: 4,
      name: 'تحسين المحافظ المالية',
      description: 'تحسين توزيع الاستثمارات المالية',
      status: 'running',
      progress: 23,
      qubitsUsed: 28,
      estimatedTime: '1.8 ساعة',
      complexity: 'متوسطة',
      applications: ['المالية', 'الاستثمار']
    },
    {
      id: 5,
      name: 'تعلم الآلة الكمي',
      description: 'تدريب نماذج الذكاء الاصطناعي المتقدمة',
      status: 'paused',
      progress: 45,
      qubitsUsed: 67,
      estimatedTime: '3.1 ساعة',
      complexity: 'عالية',
      applications: ['الذكاء الاصطناعي', 'التعلم الآلي']
    }
  ];

  // Quantum applications
  const applications = [
    {
      category: 'الأمان والتشفير',
      icon: Shield,
      description: 'تطوير أنظمة تشفير غير قابلة للكسر',
      projects: [
        'تشفير المفاتيح الكمية',
        'التوقيع الرقمي الكمي',
        'شبكات الاتصال الآمنة',
        'حماية البيانات الحساسة'
      ],
      impact: 'ثوري',
      timeline: '2-3 سنوات'
    },
    {
      category: 'الذكاء الاصطناعي',
      icon: Brain,
      description: 'تسريع خوارزميات التعلم الآلي',
      projects: [
        'شبكات عصبية كمية',
        'معالجة اللغة الطبيعية',
        'رؤية الحاسوب المتقدمة',
        'التنبؤ بالسوق'
      ],
      impact: 'عالي',
      timeline: '1-2 سنة'
    },
    {
      category: 'التحسين والخدمات اللوجستية',
      icon: TrendingUp,
      description: 'حل مشاكل التحسين المعقدة',
      projects: [
        'تحسين سلاسل التوريد',
        'جدولة الموارد',
        'تخطيط المسارات',
        'إدارة المخزون'
      ],
      impact: 'متوسط',
      timeline: '6 أشهر - 1 سنة'
    },
    {
      category: 'المحاكاة العلمية',
      icon: Atom,
      description: 'محاكاة الأنظمة الفيزيائية المعقدة',
      projects: [
        'اكتشاف الأدوية',
        'تطوير المواد الجديدة',
        'محاكاة الطقس',
        'فيزياء الجسيمات'
      ],
      impact: 'ثوري',
      timeline: '3-5 سنوات'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quantum Control Panel */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">لوحة التحكم الكمية</h3>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse text-sm">
              <div className={`w-2 h-2 rounded-full ${isQuantumRunning ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="text-gray-600">{isQuantumRunning ? 'نشط' : 'متوقف'}</span>
            </div>
            <button 
              onClick={() => setIsQuantumRunning(!isQuantumRunning)}
              className={`px-4 py-2 rounded-lg flex items-center ${
                isQuantumRunning 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isQuantumRunning ? <Pause className="h-4 w-4 ml-2" /> : <Play className="h-4 w-4 ml-2" />}
              {isQuantumRunning ? 'إيقاف' : 'تشغيل'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quantumSystems.map((system) => (
            <div key={system.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{system.name}</h4>
                  <p className="text-sm text-gray-600">{system.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  system.status === 'online' ? 'bg-green-100 text-green-800' :
                  system.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {system.status === 'online' ? 'متصل' :
                   system.status === 'maintenance' ? 'صيانة' : 'غير متصل'}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الكيوبت:</span>
                  <span className="font-medium">{system.qubits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وقت التشغيل:</span>
                  <span className="font-medium">{system.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">درجة الحرارة:</span>
                  <span className="font-medium">{system.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">زمن التماسك:</span>
                  <span className="font-medium">{system.coherenceTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">خطأ البوابة:</span>
                  <span className="font-medium">{system.gateError}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500">{system.location}</p>
                <div className="flex space-x-1 space-x-reverse mt-2">
                  <button className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700">
                    مراقبة
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-1 px-2 rounded text-xs hover:bg-gray-50">
                    إعدادات
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum Visualization */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">تصور الحالة الكمية</h3>
        <div className="bg-gray-900 rounded-lg p-8 text-center text-white">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 border-2 border-blue-400 rounded-full mb-4 relative">
              <Atom className="h-16 w-16 text-blue-400" />
              <div className="absolute inset-0 border-2 border-purple-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <p className="text-lg mb-2">النظام الكمي نشط</p>
            <p className="text-gray-400">127 كيوبت في حالة تراكب</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-400">|0⟩</p>
              <p className="text-sm text-gray-400">الحالة الأساسية</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">|ψ⟩</p>
              <p className="text-sm text-gray-400">حالة التراكب</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">|1⟩</p>
              <p className="text-sm text-gray-400">الحالة المثارة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مؤشرات الأداء الكمي</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg mb-3 inline-block">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2.4 GHz</p>
            <p className="text-sm text-gray-600">تردد البوابة</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-green-50 rounded-lg mb-3 inline-block">
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">99.1%</p>
            <p className="text-sm text-gray-600">دقة البوابة</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-50 rounded-lg mb-3 inline-block">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">100 μs</p>
            <p className="text-sm text-gray-600">زمن التماسك</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-orange-50 rounded-lg mb-3 inline-block">
              <Layers className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">15</p>
            <p className="text-sm text-gray-600">عمق الدائرة</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlgorithms = () => (
    <div className="space-y-6">
      {/* Algorithm Queue */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">طابور الخوارزميات الكمية</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Code className="h-4 w-4 ml-2" />
            خوارزمية جديدة
          </button>
        </div>

        <div className="space-y-4">
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{algorithm.name}</h4>
                  <p className="text-sm text-gray-600">{algorithm.description}</p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    algorithm.status === 'running' ? 'bg-blue-100 text-blue-800' :
                    algorithm.status === 'completed' ? 'bg-green-100 text-green-800' :
                    algorithm.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {algorithm.status === 'running' ? 'قيد التشغيل' :
                     algorithm.status === 'completed' ? 'مكتمل' :
                     algorithm.status === 'paused' ? 'متوقف' : 'في الطابور'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    algorithm.complexity === 'عالية جداً' ? 'bg-red-100 text-red-800' :
                    algorithm.complexity === 'عالية' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {algorithm.complexity}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{algorithm.qubitsUsed}</p>
                  <p className="text-sm text-gray-600">كيوبت مستخدم</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{algorithm.estimatedTime}</p>
                  <p className="text-sm text-gray-600">الوقت المقدر</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{algorithm.progress}%</p>
                  <p className="text-sm text-gray-600">التقدم</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-1 space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Settings className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>التقدم</span>
                  <span>{algorithm.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      algorithm.status === 'completed' ? 'bg-green-600' :
                      algorithm.status === 'running' ? 'bg-blue-600' :
                      'bg-gray-400'
                    }`}
                    style={{ width: `${algorithm.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Applications */}
              <div>
                <p className="text-sm text-gray-600 mb-1">التطبيقات:</p>
                <div className="flex flex-wrap gap-1">
                  {algorithm.applications.map((app, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      {/* Quantum Applications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-6">تطبيقات الحوسبة الكمية</h3>
        <div className="space-y-6">
          {applications.map((app, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <app.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{app.category}</h4>
                    <p className="text-gray-600">{app.description}</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.impact === 'ثوري' ? 'bg-red-100 text-red-800' :
                    app.impact === 'عالي' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    تأثير {app.impact}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{app.timeline}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {app.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{project}</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">نشط</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      عرض التفاصيل
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                      تقرير التقدم
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    آخر تحديث: 2025-08-04
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResearch = () => (
    <div className="space-y-6">
      {/* Research Projects */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مشاريع البحث والتطوير</h3>
        <div className="space-y-4">
          {[
            {
              title: 'تطوير خوارزميات كمية جديدة',
              description: 'البحث في خوارزميات كمية مبتكرة لحل مشاكل الأعمال',
              progress: 78,
              team: 'فريق الخوارزميات',
              budget: '2.5M ريال',
              timeline: '18 شهر'
            },
            {
              title: 'تحسين زمن التماسك الكمي',
              description: 'تطوير تقنيات لإطالة زمن التماسك في الأنظمة الكمية',
              progress: 45,
              team: 'فريق الفيزياء',
              budget: '1.8M ريال',
              timeline: '24 شهر'
            },
            {
              title: 'تكامل الحوسبة الكمية مع الذكاء الاصطناعي',
              description: 'دمج التقنيات الكمية مع أنظمة الذكاء الاصطناعي الحالية',
              progress: 62,
              team: 'فريق الذكاء الاصطناعي',
              budget: '3.2M ريال',
              timeline: '12 شهر'
            },
            {
              title: 'تطوير بروتوكولات الأمان الكمي',
              description: 'إنشاء معايير أمان جديدة للحوسبة الكمية',
              progress: 33,
              team: 'فريق الأمان',
              budget: '1.5M ريال',
              timeline: '30 شهر'
            }
          ].map((project, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
                <span className="text-sm text-gray-500">{project.progress}%</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">الفريق</p>
                  <p className="font-medium">{project.team}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الميزانية</p>
                  <p className="font-medium">{project.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">المدة الزمنية</p>
                  <p className="font-medium">{project.timeline}</p>
                </div>
              </div>

              <div className="mb-3">
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

              <div className="flex justify-between items-center">
                <div className="flex space-x-2 space-x-reverse">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    عرض التفاصيل
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                    تقرير التقدم
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  آخر تحديث: منذ يومين
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publications and Patents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">المنشورات العلمية</h3>
          <div className="space-y-3">
            {[
              'خوارزميات التحسين الكمي للأعمال',
              'تطبيقات الحوسبة الكمية في المالية',
              'الأمان السيبراني الكمي: مستقبل الحماية',
              'تكامل الذكاء الاصطناعي مع الحوسبة الكمية'
            ].map((publication, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{publication}</span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">براءات الاختراع</h3>
          <div className="space-y-3">
            {[
              'نظام تشفير كمي متقدم',
              'خوارزمية تحسين كمية للخدمات اللوجستية',
              'معالج كمي هجين للذكاء الاصطناعي',
              'بروتوكول أمان كمي للشبكات'
            ].map((patent, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{patent}</span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  مسجل
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'algorithms', name: 'الخوارزميات', icon: Brain },
    { id: 'applications', name: 'التطبيقات', icon: Globe },
    { id: 'research', name: 'البحث والتطوير', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الحوسبة الكمية</h1>
              <p className="text-gray-600 mt-2">تقنيات الحوسبة المتقدمة للمستقبل</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Atom className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">231 كيوبت نشط</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث النظام
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} من الشهر الماضي
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
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
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'algorithms' && renderAlgorithms()}
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'research' && renderResearch()}
        </div>
      </div>
    </div>
  );
};

export default QuantumComputing;

