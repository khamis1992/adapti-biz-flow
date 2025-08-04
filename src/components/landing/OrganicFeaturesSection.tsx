import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Database, 
  Shield, 
  Settings,
  Building,
  Briefcase,
  Target,
  Lightbulb,
  Rocket
} from 'lucide-react';

const OrganicFeaturesSection = () => {
  const erpFeatures = [
    {
      icon: Database,
      title: "إدارة المخزون الذكية",
      description: "تتبع شامل للمخزون مع تنبيهات تلقائية للمستويات المنخفضة وتقارير تفصيلية",
      color: "primary",
      size: "large"
    },
    {
      icon: TrendingUp,
      title: "المحاسبة المتقدمة", 
      description: "نظام محاسبي متكامل مع إدارة الفواتير والتقارير المالية التلقائية",
      color: "success",
      size: "medium"
    },
    {
      icon: Users,
      title: "إدارة الموارد البشرية",
      description: "متابعة شاملة للموظفين، الرواتب، الإجازات والأداء",
      color: "accent",
      size: "medium"
    },
    {
      icon: BarChart3,
      title: "تقارير ذكية",
      description: "لوحات تحكم تفاعلية وتقارير مخصصة لجميع أقسام الشركة",
      color: "warning",
      size: "large"
    },
    {
      icon: Settings,
      title: "إدارة العمليات",
      description: "أتمتة العمليات التجارية وتحسين الكفاءة التشغيلية",
      color: "primary",
      size: "medium"
    },
    {
      icon: Shield,
      title: "الأمان والامتثال",
      description: "حماية متقدمة للبيانات مع ضمان الامتثال للمعايير المحلية والدولية",
      color: "destructive",
      size: "large"
    }
  ];

  const businessElements = [
    { icon: Building, position: { top: '10%', left: '5%' } },
    { icon: Briefcase, position: { top: '20%', right: '10%' } },
    { icon: Target, position: { bottom: '30%', left: '8%' } },
    { icon: Lightbulb, position: { bottom: '15%', right: '15%' } },
    { icon: Rocket, position: { top: '50%', left: '3%' } }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 3 }}
          className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-br from-primary/20 to-success/20 rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 3.5, delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-gradient-to-tl from-warning/20 to-accent/20 rounded-full blur-3xl"
        />
      </div>

      {/* Background Elements */}
      {businessElements.map(({ icon: Icon, position }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/10"
          style={position}
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            y: [0, -15, 0],
          }}
          transition={{
            delay: index * 0.2,
            duration: 1,
            y: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }
          }}
        >
          <Icon size={32} />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
          }}
        >
          <Badge 
            variant="secondary" 
            className="mb-4 bg-primary/10 text-primary border-primary/20"
          >
            🚀 حلول ERP متطورة
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            منصة شاملة لإدارة أعمالك
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            اكتشف قوة نظام ERP المتكامل الذي يجمع جميع عمليات شركتك في منصة واحدة - 
            من المحاسبة إلى إدارة المخزون والموارد البشرية
          </p>
        </motion.div>

        {/* ERP Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {erpFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                className={`
                  group relative p-8 rounded-2xl border border-border
                  bg-card/50 backdrop-blur-sm
                  hover:bg-card/80 hover:shadow-elegant hover:border-primary/20
                  transition-all duration-300
                  ${feature.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Icon */}
                <div className={`
                  inline-flex p-4 rounded-xl mb-6
                  ${feature.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                  ${feature.color === 'success' ? 'bg-success/10 text-success' : ''}
                  ${feature.color === 'accent' ? 'bg-accent/10 text-accent' : ''}
                  ${feature.color === 'warning' ? 'bg-warning/10 text-warning' : ''}
                  ${feature.color === 'destructive' ? 'bg-destructive/10 text-destructive' : ''}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon size={28} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ERP Benefits Statistics */}
        <motion.div 
          className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-success/5 border border-primary/10"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">
              فوائد نظام ERP
            </h3>
            <p className="text-muted-foreground text-lg">
              أرقام حقيقية تظهر تأثير نظامنا على أداء الشركات
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "40%", label: "تحسن في الكفاءة", color: "success" },
              { number: "60%", label: "توفير في الوقت", color: "primary" },
              { number: "25%", label: "تقليل التكاليف", color: "warning" },
              { number: "99%", label: "دقة البيانات", color: "accent" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`
                    text-4xl lg:text-5xl font-bold mb-2
                    ${stat.color === 'success' ? 'text-success' : ''}
                    ${stat.color === 'primary' ? 'text-primary' : ''}
                    ${stat.color === 'warning' ? 'text-warning' : ''}
                    ${stat.color === 'accent' ? 'text-accent' : ''}
                    group-hover:scale-110 transition-transform duration-300
                  `}
                  whileInView={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    delay: index * 0.2 + 0.5,
                    duration: 0.6 
                  }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganicFeaturesSection;