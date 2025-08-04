import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Calculator, 
  Users, 
  BarChart3, 
  Shield, 
  Cloud, 
  Smartphone,
  Headphones,
  Zap,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Globe,
  Lock
} from 'lucide-react';

const coreModules = [
  {
    icon: Package,
    title: 'إدارة المخزون',
    description: 'تتبع شامل ودقيق لجميع المخزون مع تحليلات ذكية للمبيعات والمشتريات',
    features: ['تتبع المخزون في الوقت الفعلي', 'تنبيهات نقص المخزون', 'تحليل أداء المنتجات', 'إدارة الموردين'],
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    size: 'medium' // Changed from 'large' to 'medium'
  },
  {
    icon: Calculator,
    title: 'النظام المحاسبي',
    description: 'محاسبة متقدمة متوافقة مع المعايير المحلية والدولية',
    features: ['القيود المحاسبية الآلية', 'التقارير المالية', 'إدارة الفواتير', 'متابعة المدفوعات'],
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    size: 'medium' // Changed from 'large' to 'medium'
  },
  {
    icon: Users,
    title: 'إدارة العملاء',
    description: 'نظام CRM متطور لبناء علاقات قوية مع العملاء',
    features: ['ملفات العملاء الشاملة', 'تتبع التفاعلات', 'حملات التسويق', 'خدمة العملاء'],
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
    size: 'medium'
  },
  {
    icon: BarChart3,
    title: 'التحليلات المتقدمة',
    description: 'ذكاء اصطناعي لتحليل البيانات والتنبؤ بالاتجاهات',
    features: ['تقارير تفاعلية', 'تحليل الأداء', 'التنبؤ بالمبيعات', 'مؤشرات الأداء الرئيسية'],
    color: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
    size: 'medium'
  },
  {
    icon: Shield,
    title: 'الأمان والحماية',
    description: 'أحدث تقنيات الأمان لحماية بيانات مؤسستك',
    features: ['تشفير البيانات', 'مصادقة ثنائية', 'نسخ احتياطي آمن', 'مراقبة الأنشطة'],
    color: 'from-red-500/20 to-pink-500/20',
    iconColor: 'text-red-400',
    size: 'medium'
  },
  {
    icon: Cloud,
    title: 'التكامل السحابي',
    description: 'وصول آمن من أي مكان مع أداء عالي وموثوقية',
    features: ['وصول عالمي', 'نسخ احتياطي تلقائي', 'مزامنة فورية', 'أداء عالي'],
    color: 'from-indigo-500/20 to-purple-500/20',
    iconColor: 'text-indigo-400',
    size: 'small'
  }
];

const additionalFeatures = [
  { icon: Smartphone, title: 'تطبيق جوال', description: 'تطبيقات مخصصة لأجهزة iOS و Android' },
  { icon: Headphones, title: 'دعم 24/7', description: 'فريق دعم متخصص متاح على مدار الساعة' },
  { icon: Globe, title: 'متعدد اللغات', description: 'واجهة بالعربية والإنجليزية مع دعم لغات إضافية' },
  { icon: Lock, title: 'امتثال كامل', description: 'متوافق مع جميع اللوائح المحلية والدولية' }
];

const getGridClasses = (size: string, index: number) => {
  switch (size) {
    case 'large':
      return 'lg:col-span-2 lg:row-span-2';
    case 'medium':
      return 'lg:col-span-1 lg:row-span-1';
    case 'small':
      return 'lg:col-span-1 lg:row-span-1';
    default:
      return 'lg:col-span-1';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const EnhancedFeaturesSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border-0 bg-primary/10">
            <Zap className="w-4 h-4 text-primary ml-2" />
            <span className="text-sm font-medium text-primary">الميزات الأساسية</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold">
            <span className="text-gradient">نظام متكامل</span>
            <br />
            <span className="text-foreground">لجميع احتياجاتك</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعة شاملة من الأدوات والميزات المصممة خصيصاً لتلبية جميع متطلبات مؤسستك 
            من إدارة المخزون إلى التحليلات المتقدمة
          </p>
        </motion.div>

        {/* Core Modules Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-4 lg:grid-rows-3 gap-6 mb-20"
        >
          {coreModules.map((module, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
              className={`group ${getGridClasses(module.size, index)}`}
            >
              <Card className={`glass-card h-full bg-gradient-to-br ${module.color} border-primary/20 hover:border-primary/40 transition-all duration-500`}>
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl glass ${module.iconColor} bg-background/10`}>
                      <module.icon className="w-8 h-8" />
                    </div>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="p-2 rounded-full glass-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </motion.div>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground mb-2">
                      {module.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    اعرف المزيد
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ميزات إضافية
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تقنيات متقدمة ودعم شامل لضمان نجاح مؤسستك
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card p-6 text-center h-full border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { number: '10,000+', label: 'مؤسسة تثق بنا', icon: TrendingUp },
            { number: '99.9%', label: 'وقت التشغيل', icon: Shield },
            { number: '50+', label: 'دولة حول العالم', icon: Globe },
            { number: '24/7', label: 'دعم فني متاح', icon: Headphones }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 text-center rounded-2xl border-primary/20"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedFeaturesSection;