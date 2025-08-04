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
              <div className="relative bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-3xl p-8 h-full hover:shadow-lift backdrop-blur-sm transition-all duration-500 hover:border-primary/30 group overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-success/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                
                {/* Module Icon & Title */}
                <div className="relative z-10 flex items-start gap-4 mb-6">
                  <div className={`
                    relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow-primary transition-all duration-500
                    ${module.color === 'primary' ? 'bg-gradient-to-br from-primary/15 to-primary/5 text-primary' : ''}
                    ${module.color === 'success' ? 'bg-gradient-to-br from-success/15 to-success/5 text-success' : ''}
                    ${module.color === 'accent' ? 'bg-gradient-to-br from-accent/15 to-accent/5 text-accent' : ''}
                    ${module.color === 'warning' ? 'bg-gradient-to-br from-warning/15 to-warning/5 text-warning' : ''}
                    group-hover:scale-110 group-hover:rotate-3 transform-gpu
                  `}>
                    <module.icon size={28} className="relative z-10" />
                    {/* Icon background glow */}
                    <div className={`
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg
                      ${module.color === 'primary' ? 'bg-primary/20' : ''}
                      ${module.color === 'success' ? 'bg-success/20' : ''}
                      ${module.color === 'accent' ? 'bg-accent/20' : ''}
                      ${module.color === 'warning' ? 'bg-warning/20' : ''}
                    `} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="relative z-10 space-y-3 mb-6">
                  {module.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/30 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-foreground group-hover:text-primary transition-colors duration-200">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div className="relative z-10">
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 p-3 px-4 h-auto font-medium group/btn rounded-xl transition-all duration-300 hover:shadow-glow-primary"
                  >
                    تعرف على المزيد
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:-translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>

                {/* Animated particles on hover */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="absolute bottom-8 left-8 w-1 h-1 bg-success/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default ProfessionalFeaturesSection;