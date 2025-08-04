import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Shield, 
  Zap, 
  CheckCircle,
  DollarSign,
  Clock,
  Target,
  Star
} from 'lucide-react';
// import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface EnhancedHeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const performanceData = [
  { month: 'Jan', revenue: 4000, efficiency: 85 },
  { month: 'Feb', revenue: 5200, efficiency: 88 },
  { month: 'Mar', revenue: 6800, efficiency: 92 },
  { month: 'Apr', revenue: 8400, efficiency: 95 },
  { month: 'May', revenue: 9600, efficiency: 97 },
  { month: 'Jun', revenue: 12000, efficiency: 99 }
];

const stats = [
  { label: 'نمو الإيرادات', value: '+187%', icon: TrendingUp, color: 'text-green-400' },
  { label: 'رضا العملاء', value: '99.8%', icon: Star, color: 'text-yellow-400' },
  { label: 'توفير الوقت', value: '75%', icon: Clock, color: 'text-blue-400' },
  { label: 'دقة البيانات', value: '99.9%', icon: Target, color: 'text-purple-400' }
];

const EnhancedHeroSection = ({ onStartFree, onLogin }: EnhancedHeroSectionProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
          
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full glass border-0 bg-primary/10"
              >
                <Zap className="w-4 h-4 text-primary ml-2" />
                <span className="text-sm font-medium text-primary">نظام ERP متقدم</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-gradient">أنشئ مؤسستك</span>
                <br />
                <span className="text-foreground">الرقمية</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                نظام إدارة موارد المؤسسات الأكثر تطوراً في المنطقة. 
                يدمج جميع عمليات مؤسستك في منصة واحدة ذكية وآمنة.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <div>
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={onStartFree}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-glow-primary hover:shadow-glow-primary/80 transition-all duration-300 hover:scale-105"
              >
                <CheckCircle className="w-5 h-5 ml-2" />
                ابدأ مجاناً الآن
              </Button>
              <Button 
                onClick={onLogin}
                variant="outline" 
                size="lg"
                className="glass-card border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                شاهد العرض التوضيحي
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Interactive Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="space-y-6">
              
              {/* Enhanced Main Dashboard Card */}
              <Card className="glass-strong p-8 rounded-3xl border-primary/30 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                  <div className="absolute top-4 right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl" />
                </div>
                
                <div className="relative z-10 space-y-8">
                  {/* Header with Status Indicators */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">لوحة المؤشرات الرئيسية</h3>
                      <p className="text-sm text-muted-foreground">تحديث مباشر - آخر تحديث منذ دقيقتين</p>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 bg-green-400 rounded-full shadow-glow-success"
                      />
                      <span className="text-sm text-green-400 font-medium">متصل</span>
                    </div>
                  </div>
                  
                  {/* Performance Chart with Better Design */}
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-foreground">نمو الإيرادات الشهرية</h4>
                      <div className="flex items-center space-x-2 space-x-reverse text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+187%</span>
                      </div>
                    </div>
                    <div className="h-40 bg-gradient-to-br from-background/50 to-background/80 rounded-xl p-4 flex items-end justify-between space-x-2 space-x-reverse">
                      {performanceData.map((data, index) => (
                        <div 
                          key={data.month}
                          className="flex flex-col items-center space-y-2 flex-1"
                        >
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                              height: `${(data.revenue / 12000) * 80 + 20}%`,
                              opacity: 1 
                            }}
                            transition={{ 
                              delay: index * 0.15, 
                              duration: 0.8,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="w-full bg-gradient-to-t from-primary via-primary-light to-secondary rounded-t-lg min-h-[20px] shadow-glow cursor-pointer relative"
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity">
                              <div className="glass px-2 py-1 rounded-lg text-xs text-foreground">
                                ${(data.revenue / 1000).toFixed(1)}K
                              </div>
                            </div>
                          </motion.div>
                          <span className="text-xs text-muted-foreground font-medium">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="glass p-5 rounded-2xl text-center relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <DollarSign className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-green-400 mb-1">$12.4K</div>
                        <div className="text-sm text-muted-foreground">الإيرادات الشهرية</div>
                        <div className="text-xs text-green-400 mt-1">+23% هذا الشهر</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="glass p-5 rounded-2xl text-center relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-blue-400 mb-1">2,543</div>
                        <div className="text-sm text-muted-foreground">العملاء النشطون</div>
                        <div className="text-xs text-blue-400 mt-1">+156 جديد</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="glass p-5 rounded-2xl text-center relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <BarChart3 className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">99.8%</div>
                        <div className="text-sm text-muted-foreground">معدل الكفاءة</div>
                        <div className="text-xs text-purple-400 mt-1">ممتاز</div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-3 space-x-reverse pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 glass-strong hover:bg-primary/20 border-primary/30"
                    >
                      <BarChart3 className="w-4 h-4 ml-2" />
                      عرض التقرير الكامل
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 glass border-primary/30 hover:bg-primary/10"
                    >
                      تصدير البيانات
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Enhanced Floating Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-6 rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">أمان متقدم</h4>
                    <p className="text-sm text-muted-foreground mb-3">حماية عالمية للبيانات مع تشفير 256-bit</p>
                    <div className="flex items-center space-x-2 space-x-reverse text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">محمي بالكامل</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-6 rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">أتمتة ذكية</h4>
                    <p className="text-sm text-muted-foreground mb-3">ذكاء اصطناعي لتحسين جميع العمليات</p>
                    <div className="flex items-center space-x-2 space-x-reverse text-blue-400">
                      <Zap className="w-4 h-4" />
                      <span className="text-xs">AI متقدم</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Animated Performance Indicators */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -left-4 glass-strong p-3 rounded-xl"
            >
              <TrendingUp className="w-6 h-6 text-green-400" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -right-4 glass-strong p-3 rounded-xl"
            >
              <Star className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroSection;