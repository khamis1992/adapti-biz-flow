import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Building2,
  BarChart3,
  Sparkles,
  Globe,
  Clock
} from 'lucide-react';

const SaaSHeroSection = ({ onStartFree, onLogin, onRequestDemo }) => {

  const features = [
    "إدارة شاملة للأعمال",
    "تكامل ذكي بين الوحدات", 
    "تقارير متقدمة وتحليلات",
    "أمان عالي المستوى"
  ];

  const stats = [
    { value: "500+", label: "شركة تثق بنا" },
    { value: "99.9%", label: "وقت تشغيل" },
    { value: "24/7", label: "دعم فني" },
    { value: "15+", label: "وحدة متكاملة" }
  ];

  const floatingCards = [
    {
      icon: TrendingUp,
      title: "نمو الإيرادات",
      value: "+67%",
      subtitle: "متوسط النمو السنوي",
      position: { top: "10%", right: "15%" },
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "أمان البيانات",
      value: "100%",
      subtitle: "حماية متقدمة",
      position: { top: "35%", left: "5%" },
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "رضا العملاء",
      value: "98.5%",
      subtitle: "تقييم العملاء",
      position: { bottom: "20%", right: "8%" },
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Clock,
      title: "توفير الوقت",
      value: "75%",
      subtitle: "تقليل المهام اليدوية",
      position: { bottom: "45%", left: "12%" },
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100 via-transparent to-transparent opacity-60"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Floating Cards */}
      {floatingCards.map((card, index) => (
        <div
          key={index}
          className="absolute hidden lg:block animate-float"
          style={{
            ...card.position,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${3 + index * 0.5}s`
          }}
        >
          <div className={`bg-gradient-to-r ${card.color} p-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <card.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="text-sm opacity-90">{card.title}</div>
                <div className="text-xs opacity-75">{card.subtitle}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Content Section */}
            <div className="text-center lg:text-right space-y-8">
              
              {/* Badge */}
              <div className="flex justify-center lg:justify-end">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Sparkles className="w-4 h-4 ml-2" />
                  نظام إدارة الأعمال الأكثر تطوراً
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    أدابتي
                  </span>
                  <br />
                  <span className="text-gray-800">بيز فلو</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  نظام إدارة الأعمال المتكامل الذي يجمع جميع عملياتك في منصة واحدة ذكية ومرنة
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Button 
                  onClick={onStartFree}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  ابدأ مجاناً الآن
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  onClick={onRequestDemo}
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl transition-all duration-300 group"
                >
                  <PlayCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  شاهد العرض التوضيحي
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Section */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Dashboard Preview */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-white text-sm font-medium">أدابتي بيز فلو - لوحة التحكم</div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">مرحباً بك في نظامك</h3>
                      <Badge className="bg-green-100 text-green-800">متصل</Badge>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">1,247</div>
                            <div className="text-sm text-gray-600">إجمالي العملاء</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">125K</div>
                            <div className="text-sm text-gray-600">الإيرادات (د.ك)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">معدل الإنجاز</span>
                          <span className="text-gray-900 font-medium">94%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{width: '94%'}}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">استخدام النظام</span>
                          <span className="text-gray-900 font-medium">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '87%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decorations */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default SaaSHeroSection;

