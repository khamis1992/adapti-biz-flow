import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Brain,
  Lightbulb,
  TrendingUp,
  BarChart3,
  PieChart,
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Bookmark,
  Clock,
  User,
  Zap,
  Target,
  AlertCircle,
  CheckCircle,
  Info,
  HelpCircle,
  Sparkles,
  Cpu,
  Database,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Building,
  Briefcase
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  attachments?: Attachment[];
  actions?: QuickAction[];
}

interface Attachment {
  type: 'chart' | 'report' | 'image' | 'document';
  title: string;
  url: string;
  description?: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface AIInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  category: string;
  timestamp: string;
  data?: any;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'مرحباً! أنا مساعدك الذكي في نظام adapti-biz-flow. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date().toISOString(),
      suggestions: [
        'أظهر لي تقرير المبيعات لهذا الشهر',
        'ما هي أهم التوصيات لتحسين الأداء؟',
        'كيف يمكنني إضافة عميل جديد؟',
        'أريد تحليل اتجاهات السوق'
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock AI insights
  const [aiInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'trend',
      title: 'ارتفاع في المبيعات',
      description: 'تشهد المبيعات ارتفاعاً بنسبة 23% مقارنة بالشهر الماضي، خاصة في فئة الإلكترونيات',
      confidence: 95,
      impact: 'high',
      category: 'المبيعات',
      timestamp: '2024-08-04T10:30:00',
      data: { growth: 23, category: 'electronics', revenue: 125000 }
    },
    {
      id: '2',
      type: 'anomaly',
      title: 'انخفاض غير طبيعي في الطلبات',
      description: 'انخفاض مفاجئ في طلبات منطقة الرياض بنسبة 15% في آخر 3 أيام',
      confidence: 87,
      impact: 'medium',
      category: 'الطلبات',
      timestamp: '2024-08-04T09:15:00',
      data: { decline: -15, region: 'riyadh', days: 3 }
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'توصية لتحسين المخزون',
      description: 'يُنصح بزيادة مخزون منتج "لابتوب Dell XPS" بناءً على الطلب المتزايد',
      confidence: 92,
      impact: 'high',
      category: 'المخزون',
      timestamp: '2024-08-04T08:45:00',
      data: { product: 'Dell XPS Laptop', recommendedStock: 50, currentStock: 12 }
    },
    {
      id: '4',
      type: 'alert',
      title: 'تحذير من نفاد المخزون',
      description: 'منتج "ساعة Apple Watch" على وشك النفاد (متبقي 3 قطع فقط)',
      confidence: 100,
      impact: 'high',
      category: 'المخزون',
      timestamp: '2024-08-04T07:20:00',
      data: { product: 'Apple Watch', remainingStock: 3, threshold: 5 }
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): ChatMessage => {
    const lowerInput = userInput.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];
    let actions: QuickAction[] = [];

    if (lowerInput.includes('مبيعات') || lowerInput.includes('sales')) {
      response = 'إليك تحليل شامل للمبيعات:\n\n📈 المبيعات الحالية: 125,000 ريال\n📊 النمو: +23% مقارنة بالشهر الماضي\n🏆 أفضل منتج: لابتوب Dell XPS\n📍 أفضل منطقة: الرياض\n\nهل تريد تفاصيل أكثر حول فئة معينة؟';
      suggestions = [
        'أظهر تفاصيل مبيعات الإلكترونيات',
        'ما هي المنتجات الأكثر مبيعاً؟',
        'مقارنة المبيعات بالأشهر السابقة',
        'تحليل مبيعات المناطق'
      ];
    } else if (lowerInput.includes('عميل') || lowerInput.includes('customer')) {
      response = 'يمكنني مساعدتك في إدارة العملاء:\n\n👥 إجمالي العملاء: 1,247\n✨ عملاء جدد هذا الشهر: 89\n⭐ معدل الرضا: 4.7/5\n💰 متوسط قيمة الطلب: 850 ريال\n\nما الذي تريد فعله؟';
      suggestions = [
        'إضافة عميل جديد',
        'البحث عن عميل',
        'تحليل سلوك العملاء',
        'إدارة شكاوى العملاء'
      ];
      actions = [
        {
          id: 'add_customer',
          title: 'إضافة عميل جديد',
          description: 'إنشاء ملف عميل جديد',
          icon: <Users className="h-4 w-4" />,
          action: () => console.log('Navigate to add customer')
        }
      ];
    } else if (lowerInput.includes('مخزون') || lowerInput.includes('inventory')) {
      response = 'حالة المخزون الحالية:\n\n📦 إجمالي المنتجات: 1,456\n⚠️ منتجات قريبة من النفاد: 12\n📈 قيمة المخزون: 2,340,000 ريال\n🔄 معدل دوران المخزون: 4.2\n\nهناك تحذيرات مهمة تحتاج انتباهك!';
      suggestions = [
        'أظهر المنتجات قريبة من النفاد',
        'تحليل حركة المخزون',
        'إضافة منتج جديد',
        'تقرير قيمة المخزون'
      ];
    } else if (lowerInput.includes('تقرير') || lowerInput.includes('report')) {
      response = 'يمكنني إنشاء تقارير مخصصة لك:\n\n📊 التقارير المتاحة:\n• تقرير المبيعات الشهري\n• تحليل أداء العملاء\n• تقرير المخزون والحركة\n• تحليل الربحية\n• تقرير الموظفين\n\nأي تقرير تريد إنشاؤه؟';
      suggestions = [
        'تقرير المبيعات الشهري',
        'تحليل أداء العملاء',
        'تقرير المخزون',
        'تحليل الربحية'
      ];
    } else {
      response = 'أفهم استفسارك. يمكنني مساعدتك في:\n\n🔍 تحليل البيانات والتقارير\n📊 مراقبة الأداء والمؤشرات\n💡 تقديم التوصيات الذكية\n🚀 أتمتة المهام الروتينية\n📈 التنبؤ بالاتجاهات\n\nما الذي تحتاج مساعدة فيه تحديداً؟';
      suggestions = [
        'أظهر لي لوحة التحكم الرئيسية',
        'ما هي أهم التحديثات اليوم؟',
        'كيف يمكنني تحسين الأداء؟',
        'أريد تحليل مفصل للبيانات'
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
      suggestions,
      actions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setInputMessage('أظهر لي تقرير المبيعات لهذا الشهر');
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      // Simulate text-to-speech
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    } else {
      setIsSpeaking(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'anomaly': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend': return 'border-green-200 bg-green-50';
      case 'anomaly': return 'border-orange-200 bg-orange-50';
      case 'recommendation': return 'border-blue-200 bg-blue-50';
      case 'alert': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return 'تأثير عالي';
      case 'medium': return 'تأثير متوسط';
      case 'low': return 'تأثير منخفض';
      default: return impact;
    }
  };

  const renderChatInterface = () => (
    <div className="flex flex-col h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-4`}>
              {message.type === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-600">المساعد الذكي</span>
                </div>
              )}
              
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {message.type === 'assistant' && (
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTextToSpeech(message.content)}
                    className="text-gray-600"
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium mb-2">اقتراحات:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {message.actions && message.actions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium mb-2">إجراءات سريعة:</p>
                  <div className="space-y-2">
                    {message.actions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className="w-full justify-start"
                      >
                        {action.icon}
                        <span className="mr-2">{action.title}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-xs opacity-70 mt-2">
                {new Date(message.timestamp).toLocaleTimeString('ar-SA')}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-600">المساعد الذكي</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-sm text-gray-600 mr-2">يكتب...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${isListening ? 'text-red-600' : 'text-gray-400'}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm">أستمع...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="space-y-6">
      {/* Insights Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600">اتجاهات إيجابية</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">شذوذ في البيانات</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">توصيات ذكية</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">تحذيرات عاجلة</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            الرؤى الذكية
          </CardTitle>
          <CardDescription>
            تحليلات وتوصيات مدعومة بالذكاء الاصطناعي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className={`border rounded-lg p-4 ${getInsightColor(insight.type)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={getImpactColor(insight.impact)}>
                      {getImpactText(insight.impact)}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      ثقة: {insight.confidence}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(insight.timestamp).toLocaleString('ar-SA')}
                  </span>
                  <span className="bg-white px-2 py-1 rounded text-xs">
                    {insight.category}
                  </span>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    تطبيق التوصية
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    حفظ
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAutomation = () => (
    <div className="space-y-6">
      {/* Automation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              المهام المؤتمتة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">24</div>
            <div className="text-sm text-gray-600">مهمة نشطة</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>تقارير يومية</span>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>إشعارات المخزون</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>متابعة العملاء</span>
                <Badge variant="secondary">11</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              الوقت المُوفر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">127</div>
            <div className="text-sm text-gray-600">ساعة هذا الشهر</div>
            <div className="mt-4">
              <div className="text-sm text-green-600">
                +15% من الشهر الماضي
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              معدل النجاح
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">98.5%</div>
            <div className="text-sm text-gray-600">من المهام المؤتمتة</div>
            <div className="mt-4">
              <div className="text-sm text-green-600">
                أداء ممتاز
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <CardTitle>قواعد الأتمتة</CardTitle>
          <CardDescription>
            إدارة وتخصيص قواعد الأتمتة الذكية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">تنبيه نفاد المخزون</h4>
                <Badge className="bg-green-100 text-green-800">نشط</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                إرسال تنبيه تلقائي عندما ينخفض المخزون عن 10 قطع
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض السجل
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">تقرير المبيعات اليومي</h4>
                <Badge className="bg-green-100 text-green-800">نشط</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                إنشاء وإرسال تقرير المبيعات اليومي في الساعة 6 مساءً
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض السجل
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">متابعة العملاء الجدد</h4>
                <Badge className="bg-blue-100 text-blue-800">مجدول</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                إرسال رسالة ترحيب للعملاء الجدد بعد 24 ساعة من التسجيل
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض السجل
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full">
              <Sparkles className="h-4 w-4 mr-2" />
              إنشاء قاعدة أتمتة جديدة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-600" />
            المساعد الذكي
          </h1>
          <p className="text-gray-600 mt-2">مساعد ذكي مدعوم بالذكاء الاصطناعي لتحسين إنتاجيتك</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير المحادثات
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">المحادثة الذكية</TabsTrigger>
          <TabsTrigger value="insights">الرؤى الذكية</TabsTrigger>
          <TabsTrigger value="automation">الأتمتة الذكية</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                المحادثة مع المساعد الذكي
              </CardTitle>
              <CardDescription>
                اطرح أسئلتك واحصل على إجابات ذكية وتحليلات مفصلة
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {renderChatInterface()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          {renderAIInsights()}
        </TabsContent>

        <TabsContent value="automation">
          {renderAutomation()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;

