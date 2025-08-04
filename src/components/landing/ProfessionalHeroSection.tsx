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
  const stats = [
    { value: "500+", label: "شركة تثق بنا" },
    { value: "99.9%", label: "وقت التشغيل" },
    { value: "24/7", label: "دعم فني" },
  ];

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
      position: { top: "20%", right: "10%" }
    },
    {
      icon: Shield,
      title: "أمان البيانات",
      value: "100%",
      position: { top: "60%", right: "5%" }
    },
    {
      icon: Users,
      title: "رضا العملاء",
      value: "98%",
      position: { bottom: "30%", right: "15%" }
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

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge 
                variant="secondary" 
                className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
              >
                <Building2 className="w-4 h-4 mr-2" />
                نظام ERP الأكثر تطوراً في المنطقة
              </Badge>
            </motion.div>

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
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg group"
                onClick={onLogin}
              >
                <PlayCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                شاهد العرض التوضيحي
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
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
              <div className="bg-card border border-border rounded-3xl p-8 shadow-elegant backdrop-blur-sm">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">لوحة التحكم</h3>
                      <p className="text-sm text-muted-foreground">إحصائيات مباشرة</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-xs text-success font-medium">+12%</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">₪245K</div>
                    <div className="text-sm text-muted-foreground">إجمالي المبيعات</div>
                  </div>
                  
                  <div className="bg-success/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-5 h-5 text-success" />
                      <span className="text-xs text-primary font-medium">+8%</span>
                    </div>
                    <div className="text-2xl font-bold text-success">1,248</div>
                    <div className="text-sm text-muted-foreground">عملاء نشطين</div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-muted/30 rounded-xl p-4 h-40 flex items-end justify-center gap-2">
                  {[45, 70, 55, 85, 65, 90, 75].map((height, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-t from-primary to-success rounded-sm"
                      style={{ width: '12px' }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className="absolute bg-card border border-border rounded-2xl p-4 shadow-lg backdrop-blur-sm"
                style={card.position}
              initial={{ x: 50, opacity: 0 }}
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
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success">{card.value}</div>
                    <div className="text-xs text-muted-foreground">{card.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Rating */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-16 pt-8 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 text-warning fill-warning" />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            تقييم <span className="font-semibold text-foreground">4.9/5</span> من أكثر من 
            <span className="font-semibold text-foreground"> 500 شركة</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalHeroSection;