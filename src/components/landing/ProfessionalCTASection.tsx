import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight,
  Calendar,
  CheckCircle,
  Zap,
  Shield,
  HeadphonesIcon,
  Rocket,
  Star,
  Users,
  Clock
} from 'lucide-react';

interface ProfessionalCTASectionProps {
  onStartFree: () => void;
  onRequestDemo: () => void;
}

const ProfessionalCTASection = ({ onStartFree, onRequestDemo }: ProfessionalCTASectionProps) => {
  const benefits = [
    "تجربة مجانية لمدة 30 يوم",
    "إعداد مجاني للنظام",
    "تدريب شامل للفريق",
    "دعم فني مجاني لمدة 6 أشهر",
    "ترحيل البيانات مجاناً",
    "ضمان استرداد المال"
  ];

  const ctaOptions = [
    {
      icon: Rocket,
      title: "ابدأ مجاناً",
      subtitle: "تجربة فورية",
      description: "احصل على حساب تجريبي كامل لمدة 30 يوم مع جميع المميزات",
      action: onStartFree,
      buttonText: "ابدأ التجربة المجانية",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      icon: Calendar,
      title: "احجز عرض توضيحي",
      subtitle: "جلسة شخصية",
      description: "احجز جلسة مع خبرائنا لمعرفة كيف يمكن للنظام خدمة أعمالك",
      action: onRequestDemo,
      buttonText: "احجز موعد",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const trustedFeatures = [
    { icon: Shield, text: "أمان مضمون" },
    { icon: Zap, text: "أداء سريع" },
    { icon: HeadphonesIcon, text: "دعم 24/7" },
    { icon: Users, text: "فريق خبراء" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-success/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-success/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0">
        {[Rocket, Shield, Zap, Star, Clock].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/20"
            style={{
              top: `${20 + index * 15}%`,
              left: `${10 + index * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            <Icon size={32} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge 
            variant="secondary" 
            className="mb-6 bg-success/10 text-success border-success/20 px-4 py-2"
          >
            <Rocket className="w-4 h-4 mr-2" />
            ابدأ رحلتك الرقمية اليوم
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-primary">جاهز لتحويل</span>
            <br />
            <span className="bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">
              أعمالك رقمياً؟
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            انضم إلى أكثر من 500 شركة تستخدم نظامنا لإدارة أعمالها بكفاءة عالية. 
            ابدأ تجربتك المجانية اليوم ولا تدفع شيئاً حتى تقتنع بالنتائج.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {trustedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              >
                <feature.icon className="w-5 h-5 text-success" />
                <span className="text-muted-foreground font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Options */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {ctaOptions.map((option, index) => (
            <motion.div
              key={index}
              className={`
                relative group cursor-pointer
                ${option.popular ? 'order-first lg:order-none' : ''}
              `}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {option.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-success text-white border-success">
                    <Star className="w-3 h-3 mr-1" />
                    الأكثر شعبية
                  </Badge>
                </div>
              )}
              
              <div className={`
                bg-card border rounded-2xl p-8 h-full transition-all duration-300
                ${option.popular 
                  ? 'border-success shadow-lg hover:shadow-xl ring-2 ring-success/20' 
                  : 'border-border hover:border-primary/20 hover:shadow-lg'
                }
              `}>
                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center mb-6
                  ${option.popular 
                    ? 'bg-success/10 text-success' 
                    : 'bg-primary/10 text-primary'
                  }
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <option.icon size={32} />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className={`
                    text-sm font-medium mb-4
                    ${option.popular ? 'text-success' : 'text-primary'}
                  `}>
                    {option.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Button */}
                <Button
                  className={`
                    w-full
                    ${option.popular 
                      ? 'bg-success hover:bg-success/90 text-white' 
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                    }
                  `}
                  variant={option.buttonVariant}
                  size="lg"
                  onClick={option.action}
                >
                  {option.buttonText}
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>

                {/* Hover Effect */}
                <div className={`
                  absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
                  ${option.popular 
                    ? 'bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100' 
                    : 'bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100'
                  }
                `} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits List */}
        <motion.div
          className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-center text-primary mb-8">
            ما الذي تحصل عليه عند انضمامك؟
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Trust Message */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-warning fill-warning" />
              ))}
            </div>
            <span>•</span>
            <span>يثق بنا أكثر من 500 شركة</span>
            <span>•</span>
            <span>ضمان استرداد المال خلال 30 يوم</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalCTASection;