import { motion } from 'framer-motion';
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
  BarChart3
} from 'lucide-react';

interface ProfessionalHeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const ProfessionalHeroSection = ({ onStartFree, onLogin }: ProfessionalHeroSectionProps) => {

  const features = [
    "إدارة مخزون ذكية",
    "نظام محاسبي متكامل", 
    "تقارير تفاعلية",
    "أمان متطور"
  ];

  const floatingCards = [
    {
      icon: TrendingUp,
      title: "زيادة المبيعات",
      value: "+45%",
      position: { top: "15%", right: "45%" }
    },
    {
      icon: Shield,
      title: "أمان البيانات",
      value: "100%",
      position: { top: "45%", left: "8%" }
    },
    {
      icon: Users,
      title: "رضا العملاء",
      value: "98%",
      position: { bottom: "15%", right: "12%" }
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background to-muted/20 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23272874' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-success/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right Content (RTL) */}
          <motion.div
            className="space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary">أدر أعمالك</span>
                <br />
                <span className="text-foreground">بذكاء وكفاءة</span>
                <br />
                <span className="bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">
                  لا مثيل لها
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              منصة ERP متكاملة تجمع جميع عمليات شركتك في مكان واحد. 
              من إدارة المخزون والمحاسبة إلى الموارد البشرية والتقارير الذكية.
            </motion.p>

            {/* Features List */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-foreground font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-success hover:bg-success/90 text-white px-8 py-6 text-lg font-semibold group"
                onClick={onStartFree}
              >
                ابدأ مجاناً الآن
                <ArrowRight className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg group"
                onClick={onLogin}
              >
                <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                شاهد العرض التوضيحي
              </Button>
            </motion.div>

          </motion.div>

          {/* Left Visual (RTL) */}
          <motion.div
            className="relative h-[600px] flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Dashboard Card */}
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="relative bg-gradient-to-br from-card via-card/98 to-card/95 border border-border/30 rounded-3xl p-8 shadow-lift backdrop-blur-md overflow-hidden group">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-success/10 to-accent/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />
                
                {/* Dashboard Header */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow-primary transition-all duration-300 group-hover:scale-110">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">لوحة التحكم</h3>
                      <p className="text-sm text-muted-foreground">إحصائيات مباشرة</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-warning rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-4 border border-primary/10 hover:border-primary/20 transition-all duration-300 group/stat hover:shadow-glow-primary">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-5 h-5 text-primary group-hover/stat:scale-110 transition-transform duration-300" />
                      <span className="text-xs text-success font-medium bg-success/10 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <div className="text-2xl font-bold text-primary group-hover/stat:text-primary/90 transition-colors">₪245K</div>
                    <div className="text-sm text-muted-foreground">إجمالي المبيعات</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-success/10 via-success/5 to-transparent rounded-2xl p-4 border border-success/10 hover:border-success/20 transition-all duration-300 group/stat hover:shadow-glow-success">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-5 h-5 text-success group-hover/stat:scale-110 transition-transform duration-300" />
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <div className="text-2xl font-bold text-success group-hover/stat:text-success/90 transition-colors">1,248</div>
                    <div className="text-sm text-muted-foreground">عملاء نشطين</div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="relative z-10 bg-gradient-to-br from-muted/30 via-muted/20 to-transparent rounded-2xl p-4 h-40 flex items-end justify-center gap-2 border border-muted/20 group-hover:border-muted/30 transition-all duration-300">
                  {[45, 70, 55, 85, 65, 90, 75].map((height, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-t from-primary via-primary/80 to-success rounded-lg shadow-sm hover:shadow-medium transition-shadow duration-300"
                      style={{ width: '14px' }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${height}%`, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                      whileHover={{ 
                        scale: 1.1,
                        filter: 'brightness(1.2)'
                      }}
                    />
                  ))}
                  {/* Chart background glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className="absolute bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/30 rounded-2xl p-4 shadow-lift backdrop-blur-md group/float overflow-hidden"
                style={card.position}
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                y: [0, -10, 0]
              }}
              transition={{
                x: { delay: 1.2 + index * 0.2, duration: 0.6 },
                opacity: { delay: 1.2 + index * 0.2, duration: 0.6 },
                y: {
                  delay: 2,
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
                whileHover={{ scale: 1.1, rotateY: 5 }}
              >
                {/* Floating card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 opacity-0 group-hover/float:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-success/10 opacity-0 group-hover/float:opacity-50 transition-opacity duration-300 rounded-2xl blur-md -z-10" />
                
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center shadow-medium group-hover/float:shadow-glow-primary transition-all duration-300 group-hover/float:scale-110">
                    <card.icon className="w-4 h-4 text-primary group-hover/float:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success group-hover/float:text-success/90 transition-colors">{card.value}</div>
                    <div className="text-xs text-muted-foreground group-hover/float:text-foreground/60 transition-colors">{card.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ProfessionalHeroSection;