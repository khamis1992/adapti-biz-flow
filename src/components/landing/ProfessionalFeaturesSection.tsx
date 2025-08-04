import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Database,
  TrendingUp,
  Users,
  Settings,
  Shield,
  BarChart3,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  HeadphonesIcon
} from 'lucide-react';

const ProfessionalFeaturesSection = () => {
  const coreModules = [
    {
      icon: Database,
      title: "إدارة المخزون",
      description: "تتبع شامل للمخزون مع تنبيهات ذكية وإدارة المستودعات",
      features: ["تتبع المخزون المباشر", "تنبيهات الحد الأدنى", "باركود ذكي"],
      color: "primary"
    },
    {
      icon: TrendingUp,
      title: "النظام المحاسبي",
      description: "محاسبة متكاملة مع دليل حسابات ومراكز تكلفة",
      features: ["دليل حسابات شامل", "تقارير مالية تلقائية", "مراكز التكلفة"],
      color: "success"
    },
    {
      icon: Users,
      title: "الموارد البشرية",
      description: "إدارة شاملة للموظفين والرواتب والحضور",
      features: ["إدارة الموظفين", "نظام الرواتب", "تتبع الحضور"],
      color: "accent"
    },
    {
      icon: BarChart3,
      title: "التقارير والتحليلات",
      description: "لوحات تحكم تفاعلية وتقارير مخصصة",
      features: ["تقارير مباشرة", "تحليلات ذكية", "مؤشرات الأداء"],
      color: "warning"
    }
  ];

  const additionalFeatures = [
    { icon: Smartphone, title: "تطبيق موبايل", description: "إدارة أعمالك من أي مكان" },
    { icon: Shield, title: "أمان متطور", description: "حماية شاملة لبياناتك" },
    { icon: Globe, title: "دعم متعدد اللغات", description: "عربي وإنجليزي بالكامل" },
    { icon: HeadphonesIcon, title: "دعم فني 24/7", description: "فريق دعم متخصص دائماً" },
    { icon: Zap, title: "أداء سريع", description: "استجابة فورية لجميع العمليات" },
    { icon: Clock, title: "توفير الوقت", description: "أتمتة كاملة للعمليات المتكررة" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge 
            variant="secondary" 
            className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2"
          >
            <Settings className="w-4 h-4 ml-2" />
            وحدات النظام الأساسية
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            كل ما تحتاجه لإدارة أعمالك
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نظام ERP متكامل يغطي جميع جوانب أعمالك من المحاسبة إلى إدارة المخزون 
            والموارد البشرية مع تقارير ذكية وتحليلات متقدمة
          </p>
        </motion.div>

        {/* Core Modules Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {coreModules.map((module, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-elegant transition-all duration-300 hover:border-primary/20">
                {/* Module Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center
                    ${module.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                    ${module.color === 'success' ? 'bg-success/10 text-success' : ''}
                    ${module.color === 'accent' ? 'bg-accent/10 text-accent' : ''}
                    ${module.color === 'warning' ? 'bg-warning/10 text-warning' : ''}
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <module.icon size={28} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {module.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Learn More Link */}
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary hover:bg-primary/5 p-0 h-auto font-medium group/btn"
                >
                  تعرف على المزيد
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:-translate-x-1 transition-transform" />
                </Button>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>


        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              جاهز لتجربة النظام؟
            </h3>
            <p className="text-muted-foreground mb-6">
              ابدأ تجربتك المجانية اليوم واكتشف كيف يمكن لنظامنا تحسين أعمالك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-success hover:bg-success/90 text-white"
              >
                ابدأ التجربة المجانية
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                احجز عرض توضيحي
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalFeaturesSection;