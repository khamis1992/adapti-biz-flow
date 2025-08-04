import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';

const BentoTestimonialsSection = () => {
  const testimonials = [
    {
      name: 'أحمد محمد',
      position: 'مدير عام',
      company: 'شركة الخليج لتأجير السيارات',
      content: 'أدابتي غير طريقة عملنا تماماً. النظام المحاسبي المتكامل وإدارة الأسطول ساعدنا في زيادة الأرباح بنسبة 40%',
      rating: 5,
      avatar: '👨‍💼',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-600/20 to-pink-600/20',
      borderColor: 'border-purple-500/30'
    },
    {
      name: 'فاطمة الزهراء',
      position: 'صاحبة مطعم',
      company: 'مطاعم الأصالة',
      content: 'إدارة المطعم أصبحت أسهل بكثير. من المخزون إلى المحاسبة، كل شيء في مكان واحد',
      rating: 5,
      avatar: '👩‍🍳',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-600/20 to-cyan-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      name: 'خالد العتيبي',
      position: 'مدير مالي',
      company: 'مجموعة البحر الأزرق',
      content: 'التقارير المالية والتحليلات الذكية ساعدتنا في اتخاذ قرارات استراتيجية صحيحة',
      rating: 5,
      avatar: '👨‍💻',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-600/20 to-teal-600/20',
      borderColor: 'border-emerald-500/30'
    },
    {
      name: 'نورا السالم',
      position: 'مديرة صالون',
      company: 'صالون الجمال الراقي',
      content: 'حجز المواعيد وإدارة الخدمات أصبح أكثر تنظيماً. عملائي راضون جداً عن الخدمة السريعة',
      rating: 5,
      avatar: '💄',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-600/20 to-rose-600/20',
      borderColor: 'border-pink-500/30'
    },
    {
      name: 'محمد الأنصاري',
      position: 'مدير عمليات',
      company: 'شركة النخبة للمعدات',
      content: 'تتبع المعدات والصيانة أصبح دقيقاً جداً. وفرنا الكثير من التكاليف والوقت',
      rating: 5,
      avatar: '🔧',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-600/20 to-red-600/20',
      borderColor: 'border-orange-500/30'
    },
    {
      name: 'ليلى حسن',
      position: 'مديرة تنفيذية',
      company: 'مجموعة الياسمين',
      content: 'أدابتي حل جميع مشاكلنا الإدارية. التكامل بين جميع الأقسام رائع ومدهش',
      rating: 5,
      avatar: '👩‍💼',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-600/20 to-purple-600/20',
      borderColor: 'border-indigo-500/30'
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-8">
            <Quote className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">شهادات العملاء</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            اكتشف كيف ساعد أدابتي المئات من الشركات في تحقيق النجاح وزيادة الأرباح
          </p>
        </motion.div>

        {/* Bento Grid Testimonials */}
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Large featured testimonial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            viewport={{ once: true }}
            className={`col-span-12 md:col-span-8 row-span-2 bg-gradient-to-br ${testimonials[0].bgGradient} border ${testimonials[0].borderColor} rounded-3xl p-8 relative overflow-hidden group cursor-pointer`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[0].bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <div className="flex items-start gap-6 mb-6">
                <div className={`text-4xl p-4 bg-gradient-to-r ${testimonials[0].gradient} rounded-2xl`}>
                  {testimonials[0].avatar}
                </div>
                <div className="flex-1">
                  <div className="flex mb-3">
                    {[...Array(testimonials[0].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-white mb-4 leading-relaxed">
                    "{testimonials[0].content}"
                  </blockquote>
                  <div>
                    <div className="text-lg font-semibold text-white">{testimonials[0].name}</div>
                    <div className="text-gray-300">{testimonials[0].position}</div>
                    <div className={`text-transparent bg-gradient-to-r ${testimonials[0].gradient} bg-clip-text font-medium`}>
                      {testimonials[0].company}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors duration-300">
                <span className="text-sm">قراءة المزيد</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

          {/* Medium testimonials */}
          {testimonials.slice(1, 3).map((testimonial, index) => (
            <motion.div
              key={index + 1}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
              viewport={{ once: true }}
              className={`col-span-12 md:col-span-4 bg-gradient-to-br ${testimonial.bgGradient} border ${testimonial.borderColor} rounded-3xl p-6 relative overflow-hidden group cursor-pointer ${
                index === 0 ? 'row-span-1' : 'row-span-1'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`text-2xl p-2 bg-gradient-to-r ${testimonial.gradient} rounded-xl`}>
                    {testimonial.avatar}
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-white mb-4 text-sm leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                  <div className="text-gray-300 text-xs">{testimonial.position}</div>
                  <div className={`text-transparent bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-xs font-medium`}>
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Small testimonials */}
          {testimonials.slice(3).map((testimonial, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
              whileHover={{ scale: 1.1, rotate: Math.random() > 0.5 ? 2 : -2 }}
              viewport={{ once: true }}
              className={`col-span-6 md:col-span-4 bg-gradient-to-br ${testimonial.bgGradient} border ${testimonial.borderColor} rounded-3xl p-6 relative overflow-hidden group cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`text-xl p-2 bg-gradient-to-r ${testimonial.gradient} rounded-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-white mb-3 text-xs leading-relaxed">
                  "{testimonial.content.substring(0, 80)}..."
                </blockquote>
                <div>
                  <div className="font-semibold text-white text-xs">{testimonial.name}</div>
                  <div className={`text-transparent bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-xs font-medium`}>
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-gray-400 text-sm">تقييم العملاء</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400 text-sm">شركة راضية</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99%</div>
                <div className="text-gray-400 text-sm">معدل الاستمرار</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 text-sm">دعم مستمر</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoTestimonialsSection;