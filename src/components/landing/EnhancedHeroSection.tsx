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
              
              {/* Main Dashboard Card */}
              <Card className="glass-strong p-6 rounded-2xl border-primary/20">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-foreground">لوحة المؤشرات الرئيسية</h3>
                    <div className="flex space-x-2 space-x-reverse">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  
                  {/* Simple Chart Visualization */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 flex items-end justify-between space-x-2 space-x-reverse">
                    {performanceData.map((data, index) => (
                      <div 
                        key={data.month}
                        className="flex flex-col items-center space-y-2 flex-1"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.revenue / 12000) * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg min-h-[20px]"
                        />
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="glass p-4 rounded-xl text-center"
                    >
                      <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-green-400">$12.4K</div>
                      <div className="text-sm text-muted-foreground">الإيرادات الشهرية</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="glass p-4 rounded-xl text-center"
                    >
                      <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-blue-400">2,543</div>
                      <div className="text-sm text-muted-foreground">العملاء النشطون</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="glass p-4 rounded-xl text-center"
                    >
                      <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-purple-400">99%</div>
                      <div className="text-sm text-muted-foreground">معدل الكفاءة</div>
                    </motion.div>
                  </div>
                </div>
              </Card>
              
              {/* Floating Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <Shield className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-foreground mb-1">أمان متقدم</h4>
                  <p className="text-sm text-muted-foreground">حماية عالمية للبيانات</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <Zap className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-semibold text-foreground mb-1">أتمتة ذكية</h4>
                  <p className="text-sm text-muted-foreground">AI لتحسين العمليات</p>
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