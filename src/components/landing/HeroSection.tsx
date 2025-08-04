import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, TrendingUp, Shield, Sparkles } from 'lucide-react';
import erpHeroLogo from '@/assets/erp-hero-logo.jpg';

interface HeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const StatCard = ({ icon: Icon, value, label, delay }: { 
  icon: any, 
  value: string, 
  label: string, 
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="relative group"
  >
    <div className="glass rounded-xl p-6 hover-lift">
      <div className="absolute inset-0 bg-gradient-card rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <Icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
        <div className="text-fluid-2xl font-bold text-gradient mb-1">{value}</div>
        <div className="text-fluid-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default function HeroSection({ onStartFree, onLogin }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated Background Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-success/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content Side */}
          <div className="space-y-8">
            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Badge 
                variant="secondary" 
                className="glass px-4 py-2 text-sm font-medium hover-glow"
              >
                <Check className="h-4 w-4 mr-2 text-success" />
                معتمد ISO 27001
              </Badge>
              <Badge 
                variant="secondary"
                className="glass px-4 py-2 text-sm font-medium hover-glow"
              >
                <Star className="h-4 w-4 mr-2 text-warning" />
                تقييم 4.9/5
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-fluid-5xl md:text-fluid-6xl font-display font-bold leading-tight">
                <span className="text-gradient">نظام إدارة الأعمال</span>
                <br />
                <span className="text-foreground">المتكامل الأحدث</span>
              </h1>
              
              <div className="text-fluid-xl text-muted-foreground font-light leading-relaxed">
                حلول ERP شاملة ومبتكرة لإدارة جميع جوانب أعمالك بكفاءة استثنائية وذكاء اصطناعي متطور
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onStartFree}
                size="lg"
                className="group relative overflow-hidden bg-gradient-primary hover:bg-gradient-primary-soft text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-glow-primary hover-lift"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  ابدأ الآن مجاناً
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button
                onClick={onLogin}
                variant="outline"
                size="lg"
                className="glass border-2 border-primary/20 text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold rounded-xl hover-lift"
              >
                تسجيل الدخول
              </Button>
            </motion.div>

            {/* Trust Proof */}
            <motion.div variants={itemVariants} className="pt-6">
              <div className="text-fluid-sm text-muted-foreground mb-3">
                يثق بنا أكثر من 1000+ شركة حول العالم
              </div>
              <div className="flex items-center space-x-6 opacity-60">
                <div className="text-fluid-sm font-semibold">Microsoft Partner</div>
                <div className="w-px h-4 bg-border" />
                <div className="text-fluid-sm font-semibold">AWS Certified</div>
                <div className="w-px h-4 bg-border" />
                <div className="text-fluid-sm font-semibold">ISO 27001</div>
              </div>
            </motion.div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Hero Image */}
            <motion.div
              variants={itemVariants}
              className="relative z-10"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <img
                  src={erpHeroLogo}
                  alt="ERP System Dashboard"
                  className="relative w-full max-w-lg mx-auto rounded-2xl shadow-lift hover-lift transition-all duration-500"
                />
              </div>
            </motion.div>

            {/* Floating Stats */}
            <div className="absolute -top-8 -right-8 grid grid-cols-1 gap-4 z-20">
              <StatCard
                icon={Users}
                value="1000+"
                label="عميل راضٍ"
                delay={0.8}
              />
            </div>

            <div className="absolute -bottom-8 -left-8 grid grid-cols-2 gap-4 z-20">
              <StatCard
                icon={TrendingUp}
                value="50+"
                label="وحدة متخصصة"
                delay={1.0}
              />
              <StatCard
                icon={Shield}
                value="99.9%"
                label="وقت التشغيل"
                delay={1.2}
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}