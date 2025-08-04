import { motion } from 'framer-motion';
import { 
  Building2, 
  Shield, 
  Users, 
  BarChart3, 
  Clock, 
  Globe,
  Leaf,
  Flower,
  TreePine,
  Sprout
} from 'lucide-react';

const OrganicFeaturesSection = () => {
  const features = [
    {
      icon: Building2,
      title: 'متعدد الأنشطة',
      description: 'نظام ينمو ويتكيف مع جميع أنواع الأعمال من تأجير السيارات واليخوت إلى المطاعم والصالونات',
      color: 'emerald',
      position: { x: 0, y: 0 },
      size: 'large'
    },
    {
      icon: Shield,
      title: 'نظام محاسبي متقدم',
      description: 'دليل حسابات شامل ومراكز تكلفة ذكية تنمو مع نمو أعمالك',
      color: 'teal',
      position: { x: 1, y: 0 },
      size: 'medium'
    },
    {
      icon: Users,
      title: 'إدارة شاملة ومرنة',
      description: 'إدارة العملاء والموظفين والأسطول بطريقة طبيعية ومتدفقة',
      color: 'green',
      position: { x: 2, y: 0 },
      size: 'medium'
    },
    {
      icon: BarChart3,
      title: 'تحليلات ذكية ونامية',
      description: 'رؤى عميقة وتقارير تفاعلية تساعدك على اتخاذ قرارات مستنيرة',
      color: 'lime',
      position: { x: 0, y: 1 },
      size: 'medium'
    },
    {
      icon: Clock,
      title: 'أتمتة طبيعية',
      description: 'تبسيط العمليات بطريقة تلقائية وسلسة',
      color: 'amber',
      position: { x: 1, y: 1 },
      size: 'small'
    },
    {
      icon: Globe,
      title: 'تعدد اللغات',
      description: 'دعم كامل للعربية والإنجليزية',
      color: 'orange',
      position: { x: 2, y: 1 },
      size: 'small'
    }
  ];

  const decorativeElements = [
    { icon: Leaf, color: 'emerald', position: { top: '10%', left: '5%' }, size: 40, delay: 0 },
    { icon: Flower, color: 'teal', position: { top: '20%', right: '10%' }, size: 35, delay: 1 },
    { icon: TreePine, color: 'green', position: { bottom: '30%', left: '8%' }, size: 45, delay: 2 },
    { icon: Sprout, color: 'lime', position: { bottom: '15%', right: '5%' }, size: 30, delay: 3 }
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
    <div className="py-24 bg-gradient-to-b from-teal-50 via-emerald-50 to-green-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full blur-3xl"
          style={{
            clipPath: "ellipse(60% 40% at 40% 60%)"
          }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 3.5, ease: "easeOut", delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-gradient-to-tl from-green-300 to-lime-300 rounded-full blur-3xl"
          style={{
            clipPath: "ellipse(70% 50% at 60% 40%)"
          }}
        />
      </div>

      {/* Floating decorative icons */}
      {decorativeElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: 0.3, 
              scale: 1, 
              rotate: 0,
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              opacity: { duration: 1, delay: element.delay },
              scale: { duration: 1, delay: element.delay },
              rotate: { duration: 1, delay: element.delay },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: element.delay },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: element.delay }
            }}
            className={`absolute text-${element.color}-300`}
            style={element.position}
          >
            <Icon size={element.size} />
          </motion.div>
        );
      })}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-emerald-200/60 rounded-full px-6 py-3 mb-8 shadow-lg"
            style={{
              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.15)"
            }}
          >
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">مميزات طبيعية ومتطورة</span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              حلول تنمو معك
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشف كيف تتكامل ميزات أدابتي بطريقة طبيعية ومتوازنة لتحقق أقصى استفادة من أعمالك
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: Math.random() > 0.5 ? 2 : -2,
                    transition: { duration: 0.3 }
                  }}
                  className={`
                    relative overflow-hidden shadow-xl transition-all duration-500 group cursor-pointer
                    ${feature.size === 'large' ? 'md:col-span-2 lg:col-span-3 p-12' : 
                      feature.size === 'medium' ? 'p-8' : 'p-6'}
                    bg-white/80 backdrop-blur-sm border border-white/50
                  `}
                  style={{
                    borderRadius: index % 2 === 0 ? "50px 20px 50px 20px" : "20px 50px 20px 50px",
                    boxShadow: `0 15px 35px rgba(${
                      feature.color === 'emerald' ? '16, 185, 129' :
                      feature.color === 'teal' ? '20, 184, 166' :
                      feature.color === 'green' ? '34, 197, 94' :
                      feature.color === 'lime' ? '132, 204, 22' :
                      feature.color === 'amber' ? '245, 158, 11' :
                      '249, 115, 22'
                    }, 0.15)`
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 group-hover:opacity-20 transition-opacity duration-500`}
                    style={{
                      borderRadius: index % 2 === 0 ? "50px 20px 50px 20px" : "20px 50px 20px 50px"
                    }}
                  />

                  {/* Floating background icon */}
                  <div className={`absolute -top-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-${feature.color}-500`}>
                    <Icon size={120} />
                  </div>

                  <div className="relative z-10">
                    {/* Icon with organic background */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className={`inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 text-white shadow-lg`}
                      style={{
                        borderRadius: "50% 30% 50% 30%"
                      }}
                    >
                      <Icon size={28} />
                    </motion.div>

                    <h3 className={`text-2xl font-bold mb-4 text-gray-800 group-hover:text-${feature.color}-700 transition-colors duration-300 ${
                      feature.size === 'large' ? 'text-3xl' : ''
                    }`}>
                      {feature.title}
                    </h3>

                    <p className={`text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 ${
                      feature.size === 'large' ? 'text-lg' : 'text-base'
                    }`}>
                      {feature.description}
                    </p>

                    {feature.size === 'large' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-8 grid grid-cols-3 gap-6"
                      >
                        {[
                          { value: '+50', label: 'نوع نشاط' },
                          { value: '24/7', label: 'دعم مستمر' },
                          { value: '99%', label: 'وقت تشغيل' }
                        ].map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className={`text-2xl font-bold text-${feature.color}-600 mb-1`}>
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Organic border animation */}
                  <motion.div
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`absolute inset-0 pointer-events-none border-2 border-${feature.color}-300 opacity-30`}
                    style={{
                      borderRadius: index % 2 === 0 ? "50px 20px 50px 20px" : "20px 50px 20px 50px"
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Growth Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="bg-white/60 backdrop-blur-lg border border-white/50 shadow-2xl p-12 max-w-4xl mx-auto"
            style={{
              borderRadius: "60px 30px 60px 30px",
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.1)"
            }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">نمو طبيعي ومستدام</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '+500', label: 'شركة تنمو معنا', color: 'emerald' },
                { number: '40%', label: 'زيادة في الكفاءة', color: 'teal' },
                { number: '60%', label: 'توفير في الوقت', color: 'green' },
                { number: '99%', label: 'رضا العملاء', color: 'lime' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="group cursor-pointer"
                >
                  <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 bg-clip-text text-transparent mb-2 group-hover:from-${stat.color}-600 group-hover:to-${stat.color}-700 transition-all duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganicFeaturesSection;