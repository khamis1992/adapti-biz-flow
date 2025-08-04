import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, BarChart3, Building2, Target, Layers } from 'lucide-react';

interface OrganicHeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const OrganicHeroSection = ({ onStartFree, onLogin }: OrganicHeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl"
          style={{
            clipPath: "ellipse(70% 80% at 30% 20%)"
          }}
        />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-20 right-10 w-[500px] h-[400px] bg-gradient-to-tl from-success/10 to-success/5 rounded-full blur-2xl"
          style={{
            clipPath: "ellipse(80% 60% at 70% 80%)"
          }}
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-warning/10 to-warning/5 blur-3xl"
          style={{
            clipPath: "ellipse(90% 50% at 50% 50%)",
            borderRadius: "50% 30% 70% 40%"
          }}
        />
      </div>

      {/* Floating business icons */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-20 text-primary/60"
      >
        <TrendingUp size={80} />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-40 left-32 text-success/60"
      >
        <BarChart3 size={60} />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 right-40 text-warning/60"
      >
        <Users size={50} />
      </motion.div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 shadow-lg"
            >
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">نظام إدارة الأعمال المتكامل</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h1 className="text-6xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  أدابتي
                </span>
              </h1>
              <div className="text-2xl lg:text-3xl text-foreground font-light leading-relaxed mb-6">
                حلول ERP شاملة ومتطورة
                <br />
                <span className="text-success font-medium">لإدارة جميع جوانب عملك</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              نظام متكامل يجمع جميع عمليات عملك في مكان واحد - من المحاسبة والمخزون إلى إدارة العملاء والموظفين
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={onStartFree}
                className="bg-gradient-to-r from-success to-success-light hover:from-success-light hover:to-active text-white border-0 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                style={{
                  borderRadius: "25px"
                }}
              >
                ابدأ التجربة المجانية
                <TrendingUp className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={onLogin}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  borderRadius: "25px"
                }}
              >
                تسجيل الدخول
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-success">+500</div>
                <div className="text-sm text-muted-foreground">شركة ناجحة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">رضا العملاء</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">30</div>
                <div className="text-sm text-muted-foreground">يوم تجربة مجانية</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Main organic shape */}
            <motion.div
              animate={{ 
                rotate: [0, 5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-[600px] bg-white/90 backdrop-blur-lg border border-border shadow-2xl"
              style={{
                borderRadius: "50% 30% 70% 40%"
              }}
            >
              {/* Inner content cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 shadow-lg border border-border/50"
                style={{
                  borderRadius: "30px 10px 30px 10px"
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">إدارة متكاملة</h3>
                    <p className="text-sm text-muted-foreground">نظام شامل لجميع العمليات</p>
                  </div>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="h-full bg-gradient-to-r from-success to-success-light rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 shadow-lg border border-border/50"
                style={{
                  borderRadius: "10px 30px 10px 30px"
                }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">40%</div>
                    <div className="text-xs text-muted-foreground">توفير التكاليف</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">60%</div>
                    <div className="text-xs text-muted-foreground">زيادة الكفاءة</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">90%</div>
                    <div className="text-xs text-muted-foreground">سهولة الاستخدام</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating mini elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-warning/40 to-warning/20 rounded-full"
              />
              
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-success/40 to-success/20"
                style={{
                  borderRadius: "50% 30% 70% 40%"
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganicHeroSection;