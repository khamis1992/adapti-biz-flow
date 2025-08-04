import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  Star,
  Quote,
  Building2,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

const ProfessionalTestimonialsSection = () => {
  const testimonials = [
    {
      name: "أحمد محمد",
      position: "المدير التنفيذي",
      company: "شركة الأطلس للتجارة",
      content: "نظام ERP ممتاز ساعدنا في تحسين كفاءة العمليات بنسبة 40%. الواجهة سهلة الاستخدام والدعم الفني متميز.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      stats: { metric: "تحسن الكفاءة", value: "40%" }
    },
    {
      name: "سارة أحمد",
      position: "مديرة المحاسبة",
      company: "مجموعة النور التجارية",
      content: "النظام المحاسبي متكامل ودقيق. وفر علينا ساعات عمل كثيرة وقلل الأخطاء إلى الصفر تقريباً.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      stats: { metric: "توفير الوقت", value: "60%" }
    },
    {
      name: "محمد علي",
      position: "مدير المخزون",
      company: "شركة الخليج للتوزيع",
      content: "إدارة المخزون أصبحت أسهل بكثير. التنبيهات الذكية والتقارير التفصيلية ساعدت في تحسين التحكم بالمخزون.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      stats: { metric: "دقة المخزون", value: "98%" }
    }
  ];

  const businessMetrics = [
    {
      icon: Building2,
      value: "500+",
      label: "شركة تستخدم النظام",
      description: "من الشركات الصغيرة إلى المؤسسات الكبيرة"
    },
    {
      icon: Users,
      value: "10,000+",
      label: "مستخدم نشط",
      description: "يعتمدون على النظام يومياً"
    },
    {
      icon: TrendingUp,
      value: "45%",
      label: "متوسط تحسن الأداء",
      description: "في الشركات التي تستخدم النظام"
    },
    {
      icon: Award,
      value: "99%",
      label: "معدل رضا العملاء",
      description: "تقييمات إيجابية من المستخدمين"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-24 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23272874' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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
            <Star className="w-4 h-4 mr-2" />
            آراء العملاء
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            ماذا يقول عملاؤنا؟
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            تجارب حقيقية من شركات تستخدم نظامنا وحققت نتائج مميزة
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-elegant transition-all duration-300 hover:border-primary/20">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-warning" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>

                {/* Stats Badge */}
                <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{testimonial.stats.value}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.stats.metric}</div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Business Metrics */}
        <motion.div
          className="bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10 rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">
              أرقام تتحدث عن نفسها
            </h3>
            <p className="text-muted-foreground text-lg">
              إحصائيات حقيقية توضح تأثير نظامنا على الأعمال
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {businessMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <metric.icon className="w-8 h-8 text-primary" />
                </div>
                
                <motion.div
                  className="text-4xl lg:text-5xl font-bold text-primary mb-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {metric.value}
                </motion.div>
                
                <h4 className="font-semibold text-foreground mb-2">
                  {metric.label}
                </h4>
                
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <span className="text-muted-foreground">تقييم 4.9/5</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-success" />
              <span className="text-muted-foreground">شهادة ISO 27001</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">موثوق من 500+ شركة</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalTestimonialsSection;