import React, { useState } from 'react';
import { 
  Mic, MicOff, Volume2, VolumeX, Settings, Play, Pause,
  MessageCircle, Brain, Zap, Globe, Clock, User,
  BarChart3, TrendingUp, Calendar, FileText, Search,
  Phone, Mail, Calculator, MapPin, Weather, Music,
  ShoppingCart, Car, Home, Briefcase, Heart, Star
} from 'lucide-react';

const VoiceAssistant = () => {
  const [activeTab, setActiveTab] = useState('assistant');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Voice commands history
  const commandHistory = [
    {
      id: 1,
      command: 'أظهر لي تقرير المبيعات لهذا الشهر',
      response: 'تم عرض تقرير المبيعات. إجمالي المبيعات 67,000 ريال بزيادة 8.2% عن الشهر الماضي',
      time: '2025-08-04 15:30',
      type: 'report'
    },
    {
      id: 2,
      command: 'اتصل بأحمد محمد من قسم المبيعات',
      response: 'جاري الاتصال بأحمد محمد... تم بدء المكالمة',
      time: '2025-08-04 14:45',
      type: 'call'
    },
    {
      id: 3,
      command: 'أضف مهمة جديدة: مراجعة العقود',
      response: 'تم إضافة مهمة "مراجعة العقود" إلى قائمة المهام لليوم',
      time: '2025-08-04 13:20',
      type: 'task'
    },
    {
      id: 4,
      command: 'ما هو عدد العملاء الجدد هذا الأسبوع؟',
      response: 'تم تسجيل 45 عميل جديد هذا الأسبوع، بزيادة 12% عن الأسبوع الماضي',
      time: '2025-08-04 12:15',
      type: 'query'
    },
    {
      id: 5,
      command: 'احجز اجتماع مع فريق التطوير غداً الساعة 10',
      response: 'تم حجز اجتماع مع فريق التطوير ليوم 5 أغسطس الساعة 10:00 صباحاً',
      time: '2025-08-04 11:30',
      type: 'calendar'
    }
  ];

  // Available voice commands
  const availableCommands = [
    {
      category: 'التقارير والتحليلات',
      icon: BarChart3,
      commands: [
        'أظهر تقرير المبيعات',
        'ما هي أرباح هذا الشهر؟',
        'عرض إحصائيات العملاء',
        'تقرير المخزون الحالي'
      ]
    },
    {
      category: 'إدارة المهام',
      icon: Calendar,
      commands: [
        'أضف مهمة جديدة',
        'ما هي مهامي اليوم؟',
        'احجز اجتماع',
        'ذكرني بالموعد'
      ]
    },
    {
      category: 'الاتصالات',
      icon: Phone,
      commands: [
        'اتصل بـ [اسم الشخص]',
        'أرسل رسالة إلى [اسم الشخص]',
        'عرض جهات الاتصال',
        'بحث في الرسائل'
      ]
    },
    {
      category: 'البحث والاستعلام',
      icon: Search,
      commands: [
        'ابحث عن [موضوع]',
        'أين ملف [اسم الملف]؟',
        'معلومات عن العميل [اسم العميل]',
        'حالة الطلب رقم [رقم الطلب]'
      ]
    },
    {
      category: 'الإعدادات والتحكم',
      icon: Settings,
      commands: [
        'غير اللغة إلى الإنجليزية',
        'اضبط مستوى الصوت',
        'فعل الوضع المظلم',
        'حفظ الإعدادات'
      ]
    }
  ];

  // Voice settings
  const voiceSettings = {
    language: 'ar-SA',
    voice: 'female',
    speed: 1.0,
    volume: 0.8,
    autoListen: true,
    wakeWord: 'مرحبا أدابتي'
  };

  // Statistics
  const stats = [
    {
      title: 'الأوامر الصوتية اليوم',
      value: '24',
      change: '+18%',
      icon: Mic,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'معدل الدقة',
      value: '96.8%',
      change: '+2.1%',
      icon: Brain,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'وقت الاستجابة',
      value: '0.8s',
      change: '-0.2s',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'اللغات المدعومة',
      value: '12',
      change: '+2',
      icon: Globe,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const renderAssistant = () => (
    <div className="space-y-6">
      {/* Voice Interface */}
      <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
        <div className="mb-6">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 ${
            isListening ? 'bg-blue-100 animate-pulse' : 'bg-gray-100'
          }`}>
            {isListening ? (
              <div className="flex space-x-1 space-x-reverse">
                <div className="w-2 h-8 bg-blue-600 rounded animate-bounce"></div>
                <div className="w-2 h-12 bg-blue-600 rounded animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-6 bg-blue-600 rounded animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-10 bg-blue-600 rounded animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            ) : (
              <Mic className="h-16 w-16 text-gray-400" />
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {isListening ? 'أستمع إليك...' : 'مرحباً! كيف يمكنني مساعدتك؟'}
          </h3>
          <p className="text-gray-600">
            {isListening ? 'تحدث الآن أو اضغط على الميكروفون للتوقف' : 'اضغط على الميكروفون وابدأ بالتحدث'}
          </p>
        </div>

        <div className="flex justify-center space-x-4 space-x-reverse mb-6">
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`p-4 rounded-full transition-colors ${
              isListening 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
          <button 
            onClick={() => setIsSpeaking(!isSpeaking)}
            className={`p-4 rounded-full transition-colors ${
              isSpeaking 
                ? 'bg-orange-600 text-white hover:bg-orange-700' 
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>
        </div>

        <div className="text-sm text-gray-500">
          قل "{voiceSettings.wakeWord}" لتفعيل المساعد الصوتي
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BarChart3, label: 'تقرير المبيعات', command: 'أظهر تقرير المبيعات' },
            { icon: Calendar, label: 'مهام اليوم', command: 'ما هي مهامي اليوم؟' },
            { icon: Phone, label: 'جهات الاتصال', command: 'عرض جهات الاتصال' },
            { icon: Search, label: 'بحث سريع', command: 'ابحث في النظام' },
            { icon: Mail, label: 'الرسائل', command: 'عرض الرسائل الجديدة' },
            { icon: Calculator, label: 'حاسبة', command: 'افتح الحاسبة' },
            { icon: Weather, label: 'الطقس', command: 'كيف الطقس اليوم؟' },
            { icon: Music, label: 'موسيقى', command: 'شغل موسيقى هادئة' }
          ].map((action, index) => (
            <button 
              key={index}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
              onClick={() => {
                // Simulate voice command
                console.log(`Voice command: ${action.command}`);
              }}
            >
              <action.icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Commands */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">الأوامر الأخيرة</h3>
        <div className="space-y-3">
          {commandHistory.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${
                item.type === 'report' ? 'bg-blue-100' :
                item.type === 'call' ? 'bg-green-100' :
                item.type === 'task' ? 'bg-purple-100' :
                item.type === 'query' ? 'bg-orange-100' :
                'bg-gray-100'
              }`}>
                {item.type === 'report' && <BarChart3 className="h-4 w-4 text-blue-600" />}
                {item.type === 'call' && <Phone className="h-4 w-4 text-green-600" />}
                {item.type === 'task' && <Calendar className="h-4 w-4 text-purple-600" />}
                {item.type === 'query' && <Search className="h-4 w-4 text-orange-600" />}
                {item.type === 'calendar' && <Calendar className="h-4 w-4 text-gray-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.command}</p>
                <p className="text-sm text-gray-600 mt-1">{item.response}</p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCommands = () => (
    <div className="space-y-6">
      {/* Available Commands */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">الأوامر المتاحة</h3>
        <div className="space-y-6">
          {availableCommands.map((category, index) => (
            <div key={index}>
              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                <category.icon className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">{category.category}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mr-7">
                {category.commands.map((command, cmdIndex) => (
                  <div key={cmdIndex} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">"{command}"</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Command History */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">سجل الأوامر</h3>
        <div className="space-y-4">
          {commandHistory.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className={`p-1 rounded-full ${
                    item.type === 'report' ? 'bg-blue-100' :
                    item.type === 'call' ? 'bg-green-100' :
                    item.type === 'task' ? 'bg-purple-100' :
                    item.type === 'query' ? 'bg-orange-100' :
                    'bg-gray-100'
                  }`}>
                    {item.type === 'report' && <BarChart3 className="h-3 w-3 text-blue-600" />}
                    {item.type === 'call' && <Phone className="h-3 w-3 text-green-600" />}
                    {item.type === 'task' && <Calendar className="h-3 w-3 text-purple-600" />}
                    {item.type === 'query' && <Search className="h-3 w-3 text-orange-600" />}
                    {item.type === 'calendar' && <Calendar className="h-3 w-3 text-gray-600" />}
                  </div>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  إعادة تشغيل
                </button>
              </div>
              <div className="space-y-2">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-900">🎤 {item.command}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-900">🤖 {item.response}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Voice Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">إعدادات الصوت</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option value="ar-SA">العربية (السعودية)</option>
              <option value="ar-EG">العربية (مصر)</option>
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع الصوت</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="voice" value="female" defaultChecked className="text-blue-600" />
                <span>صوت أنثوي</span>
              </label>
              <label className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="voice" value="male" className="text-blue-600" />
                <span>صوت ذكوري</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">سرعة الكلام</label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-gray-500">بطيء</span>
              <input 
                type="range" 
                min="0.5" 
                max="2.0" 
                step="0.1" 
                defaultValue="1.0" 
                className="flex-1"
              />
              <span className="text-sm text-gray-500">سريع</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">مستوى الصوت</label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <VolumeX className="h-4 w-4 text-gray-400" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                defaultValue="0.8" 
                className="flex-1"
              />
              <Volume2 className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">كلمة التفعيل</label>
            <input 
              type="text" 
              defaultValue="مرحبا أدابتي"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="أدخل كلمة التفعيل"
            />
            <p className="text-xs text-gray-500 mt-1">قل هذه الكلمة لتفعيل المساعد الصوتي</p>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">الإعدادات المتقدمة</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">الاستماع التلقائي</p>
              <p className="text-sm text-gray-600">تفعيل الاستماع عند سماع كلمة التفعيل</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">حفظ سجل الأوامر</p>
              <p className="text-sm text-gray-600">حفظ جميع الأوامر الصوتية للمراجعة</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">التأكيد الصوتي</p>
              <p className="text-sm text-gray-600">تأكيد الأوامر المهمة قبل التنفيذ</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">الوضع الآمن</p>
              <p className="text-sm text-gray-600">منع تنفيذ الأوامر الحساسة صوتياً</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end space-x-3 space-x-reverse">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          إلغاء
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} من الأمس
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">تحليلات الاستخدام</h3>
        <div className="space-y-4">
          {[
            { command: 'تقارير المبيعات', usage: 85, count: 34 },
            { command: 'إدارة المهام', usage: 72, count: 28 },
            { command: 'جهات الاتصال', usage: 68, count: 25 },
            { command: 'البحث والاستعلام', usage: 55, count: 19 },
            { command: 'الحاسبة', usage: 42, count: 14 },
            { command: 'الطقس', usage: 38, count: 12 }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{item.command}</span>
                  <span className="text-sm text-gray-500">{item.count} مرة</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.usage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">مؤشرات الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-4 bg-green-50 rounded-lg mb-3 inline-block">
              <Brain className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">96.8%</p>
            <p className="text-sm text-gray-600">دقة التعرف على الكلام</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-blue-50 rounded-lg mb-3 inline-block">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">0.8s</p>
            <p className="text-sm text-gray-600">متوسط وقت الاستجابة</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-purple-50 rounded-lg mb-3 inline-block">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8/5</p>
            <p className="text-sm text-gray-600">تقييم المستخدمين</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'assistant', name: 'المساعد الصوتي', icon: Mic },
    { id: 'commands', name: 'الأوامر', icon: MessageCircle },
    { id: 'settings', name: 'الإعدادات', icon: Settings },
    { id: 'analytics', name: 'التحليلات', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">المساعد الصوتي الذكي</h1>
              <p className="text-gray-600 mt-2">تحكم في النظام باستخدام الأوامر الصوتية</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">متصل</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Brain className="h-4 w-4 ml-2" />
                تدريب المساعد
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
          {activeTab === 'assistant' && renderAssistant()}
          {activeTab === 'commands' && renderCommands()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;

