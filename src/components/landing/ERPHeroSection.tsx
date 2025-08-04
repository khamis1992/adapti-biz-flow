import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Database,
  Settings,
  PieChart,
  Shield,
  Zap
} from 'lucide-react';

interface ERPHeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const ERPHeroSection = ({ onStartFree, onLogin }: ERPHeroSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const floatingIcons = [
    { icon: BarChart3, position: { top: '15%', left: '10%' }, delay: 0 },
    { icon: Users, position: { top: '25%', right: '15%' }, delay: 0.5 },
    { icon: TrendingUp, position: { bottom: '30%', left: '8%' }, delay: 1 },
    { icon: Database, position: { top: '40%', left: '5%' }, delay: 1.5 },
    { icon: Settings, position: { bottom: '20%', right: '10%' }, delay: 2 },
    { icon: PieChart, position: { top: '60%', right: '5%' }, delay: 2.5 },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23272874' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ icon: Icon, position, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          style={position}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            y: [0, -20, 0],
          }}
          transition={{
            delay: delay,
            duration: 1,
            y: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }}
        >
          <Icon size={40} />
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center min-h-screen"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <Badge 
                variant="secondary" 
                className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
              >
                <Shield className="w-4 h-4 mr-2" />
                نظام ERP متطور ومتكامل
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                إدارة أعمالك
                <span className="block text-foreground">بذكاء وكفاءة</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                منصة ERP شاملة تجمع جميع عمليات شركتك في مكان واحد. 
                من إدارة المخزون إلى المحاسبة والموارد البشرية - كل ما تحتاجه لنمو أعمالك.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-success text-white hover:bg-success/90 px-8 py-6 text-lg font-semibold"
                onClick={onStartFree}
              >
                <Zap className="w-5 h-5 mr-2" />
                ابدأ مجاناً الآن
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg"
                onClick={onLogin}
              >
                تسجيل الدخول
              </Button>
            </motion.div>

            <motion.div 
              className="flex items-center gap-8 pt-8"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">شركة تثق بنا</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">وقت التشغيل</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">دعم فني</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div 
            className="relative lg:h-[600px] flex items-center justify-center"
            variants={itemVariants}
          >
            {/* Main Dashboard Preview */}
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Dashboard Container */}
              <div className="bg-white rounded-2xl shadow-elegant border border-border p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-primary">لوحة التحكم الرئيسية</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary mb-2" />
                    <div className="text-sm text-muted-foreground">إجمالي المبيعات</div>
                    <div className="text-lg font-bold text-primary">₪245,000</div>
                  </div>
                  <div className="bg-gradient-to-br from-success/5 to-success/10 p-4 rounded-lg">
                    <Users className="w-6 h-6 text-success mb-2" />
                    <div className="text-sm text-muted-foreground">العملاء النشطين</div>
                    <div className="text-lg font-bold text-success">1,248</div>
                  </div>
                </div>

                {/* Chart Preview */}
                <div className="bg-muted/30 rounded-lg p-4 h-32 flex items-end justify-center gap-2">
                  {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-t from-primary to-primary/60 rounded-sm"
                      style={{ width: '20px', height: `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 1 + i * 0.1 }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Module Cards */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-3 border"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Database className="w-6 h-6 text-warning mb-1" />
                <div className="text-xs font-medium">إدارة المخزون</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-3 border"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <PieChart className="w-6 h-6 text-accent mb-1" />
                <div className="text-xs font-medium">التقارير المالية</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <motion.div className="w-1 h-2 bg-primary rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ERPHeroSection;