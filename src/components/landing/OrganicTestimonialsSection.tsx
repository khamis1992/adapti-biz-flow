import { motion } from 'framer-motion';
import { Star, Quote, Leaf, Flower2, TreePine } from 'lucide-react';

const OrganicTestimonialsSection = () => {
  const testimonials = [
    {
      name: 'أحمد محمد الأحمري',
      position: 'مدير عام',
      company: 'شركة الخليج الأخضر لتأجير السيارات',
      content: 'أدابتي نما مع شركتنا بطريقة طبيعية ومتوازنة. النظام لا يجبرنا على تغيير طريقة عملنا، بل يتكيف مع احتياجاتنا ويطور من أدائنا تدريجياً.',
      rating: 5,
      avatar: '🌱',
      color: 'emerald',
      size: 'large'
    },
    {
      name: 'فاطمة الزهراء',
      position: 'صاحبة مطاعم',
      company: 'مطاعم الواحة الخضراء',
      content: 'إدارة مطاعمنا أصبحت تتدفق بسلاسة طبيعية. كل شيء متصل ومتناغم من المخزون إلى المحاسبة.',
      rating: 5,
      avatar: '🌿',
      color: 'teal',
      size: 'medium'
    },
    {
      name: 'خالد بن سعد',
      position: 'مدير مالي',
      company: 'مجموعة النخيل للاستثمار',
      content: 'التقارير والتحليلات تأتي بطريقة طبيعية ومفهومة، مما ساعدنا في اتخاذ قرارات مدروسة ومستدامة.',
      rating: 5,
      avatar: '🌳',
      color: 'green',
      size: 'medium'
    },
    {
      name: 'نورا العتيبي',
      position: 'مديرة صالون',
      company: 'صالون الطبيعة للجمال',
      content: 'النظام بديهي وطبيعي في الاستخدام. عملائي يحبون السرعة والتنظيم الجديد.',
      rating: 5,
      avatar: '🌺',
      color: 'lime',
      size: 'small'
    },
    {
      name: 'محمد الدوسري',
      position: 'مدير عمليات',
      company: 'شركة الأرض الخضراء للمعدات',
      content: 'تتبع المعدات والصيانة يتم بطريقة تلقائية ومنظمة. وفرنا كثيراً من الوقت والجهد.',
      rating: 5,
      avatar: '🍃',
      color: 'amber',
      size: 'small'
    },
    {
      name: 'ليلى حسن النوري',
      position: 'مديرة تنفيذية',
      company: 'مجموعة الريحان التجارية',
      content: 'التكامل بين جميع أقسام الشركة يحدث بطريقة طبيعية وسلسة. النظام ينمو مع نمو أعمالنا.',
      rating: 5,
      avatar: '🌾',
      color: 'orange',
      size: 'medium'
    }
  ];

  const decorativeIcons = [
    { icon: Leaf, position: { top: '10%', left: '5%' }, color: 'emerald', delay: 0 },
    { icon: Flower2, position: { top: '20%', right: '8%' }, color: 'teal', delay: 1 },
    { icon: TreePine, position: { bottom: '25%', left: '3%' }, color: 'green', delay: 2 },
    { icon: Leaf, position: { bottom: '15%', right: '6%' }, color: 'lime', delay: 3 }
  ];

  const getCardStyles = (size: string, index: number) => {
    const baseRadius = index % 3 === 0 ? "40px 20px 40px 20px" : 
                     index % 3 === 1 ? "20px 40px 20px 40px" : 
                     "30px 60px 30px 60px";
    
    return {
      borderRadius: baseRadius,
      gridColumn: size === 'large' ? 'span 2' : 'span 1',
      minHeight: size === 'large' ? '300px' : size === 'medium' ? '250px' : '200px'
    };
  };

  return (
    <div className="py-24 bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="absolute top-1/4 left-0 w-[600px] h-[400px] bg-gradient-to-br from-emerald-300 to-teal-300 blur-3xl"
          style={{
            clipPath: "ellipse(80% 60% at 20% 40%)",
            borderRadius: "50% 30% 70% 40%"
          }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.06 }}
          transition={{ duration: 4.5, ease: "easeOut", delay: 0.5 }}
          className="absolute bottom-1/4 right-0 w-[700px] h-[500px] bg-gradient-to-tl from-green-300 to-lime-300 blur-3xl"
          style={{
            clipPath: "ellipse(70% 50% at 80% 60%)",
            borderRadius: "40% 60% 30% 70%"
          }}
        />
      </div>

      {/* Floating decorative elements */}
      {decorativeIcons.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ 
              opacity: 0.2, 
              scale: 1, 
              y: 0,
              rotate: [0, 10, 0]
            }}
            transition={{
              opacity: { duration: 1, delay: element.delay },
              scale: { duration: 1, delay: element.delay },
              y: { duration: 1, delay: element.delay },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: element.delay }
            }}
            className={`absolute text-${element.color}-400`}
            style={element.position}
          >
            <Icon size={40} />
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
            <Quote className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">شهادات نمو طبيعي</span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              قصص نجاح حقيقية
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشف كيف ساعد أدابتي الشركات على النمو بطريقة طبيعية ومستدامة
          </p>
        </motion.div>

        {/* Testimonials Organic Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.03, 
                  rotate: index % 2 === 0 ? 1 : -1,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                className={`bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg overflow-hidden group cursor-pointer relative`}
                style={{
                  ...getCardStyles(testimonial.size, index),
                  boxShadow: `0 15px 35px rgba(${
                    testimonial.color === 'emerald' ? '16, 185, 129' :
                    testimonial.color === 'teal' ? '20, 184, 166' :
                    testimonial.color === 'green' ? '34, 197, 94' :
                    testimonial.color === 'lime' ? '132, 204, 22' :
                    testimonial.color === 'amber' ? '245, 158, 11' :
                    '249, 115, 22'
                  }, 0.12)`
                }}
              >
                {/* Background gradient overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`absolute inset-0 bg-gradient-to-br from-${testimonial.color}-100 to-${testimonial.color}-200 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Floating background emoji */}
                <div className="absolute -top-4 -right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  {testimonial.avatar}
                </div>

                <div className={`relative z-10 p-6 ${testimonial.size === 'large' ? 'p-8' : 'p-6'} h-full flex flex-col`}>
                  {/* Rating and Quote */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: (index * 0.1) + (i * 0.05) }}
                          viewport={{ once: true }}
                        >
                          <Star className="w-5 h-5 text-amber-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <blockquote className={`text-gray-700 leading-relaxed flex-grow ${
                      testimonial.size === 'large' ? 'text-lg' : 'text-base'
                    }`}>
                      "{testimonial.content}"
                    </blockquote>
                  </div>

                  {/* Customer Info */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 bg-gradient-to-br from-${testimonial.color}-400 to-${testimonial.color}-600 flex items-center justify-center text-2xl text-white shadow-lg`}
                        style={{
                          borderRadius: "50% 30% 50% 30%"
                        }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className={`font-bold text-gray-800 group-hover:text-${testimonial.color}-700 transition-colors duration-300 ${
                          testimonial.size === 'large' ? 'text-lg' : 'text-base'
                        }`}>
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-sm">{testimonial.position}</p>
                        <p className={`text-${testimonial.color}-600 text-sm font-medium`}>
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Growth indicator for large cards */}
                  {testimonial.size === 'large' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="mt-6 pt-6 border-t border-emerald-200/50"
                    >
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-emerald-600">40%</div>
                          <div className="text-xs text-gray-500">نمو الأرباح</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-teal-600">6</div>
                          <div className="text-xs text-gray-500">أشهر استخدام</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">95%</div>
                          <div className="text-xs text-gray-500">توفير وقت</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Organic border animation */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`absolute inset-0 border-2 border-${testimonial.color}-300 pointer-events-none group-hover:border-${testimonial.color}-400 transition-colors duration-500`}
                  style={getCardStyles(testimonial.size, index)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="bg-white/60 backdrop-blur-lg border border-white/50 shadow-2xl p-12 max-w-5xl mx-auto"
            style={{
              borderRadius: "60px 30px 60px 30px",
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.1)"
            }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">نمو مشترك ومستدام</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '4.9/5', label: 'تقييم طبيعي', color: 'emerald' },
                { number: '+500', label: 'شركة تنمو معنا', color: 'teal' },
                { number: '99%', label: 'معدل الاستمرار', color: 'green' },
                { number: '30', label: 'يوم نمو مجاني', color: 'lime' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3,
                    transition: { duration: 0.3 }
                  }}
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

export default OrganicTestimonialsSection;