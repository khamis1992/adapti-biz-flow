import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, Leaf, Sprout, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrganicCTASectionProps {
  onStartFree: () => void;
  onRequestDemo: () => void;
}

const OrganicCTASection = ({ onStartFree, onRequestDemo }: OrganicCTASectionProps) => {
  const benefits = [
    'بداية طبيعية في أقل من 10 دقائق',
    'نمو مدعوم مجاناً لمدة 30 يوماً',
    'مرونة كاملة بدون التزامات',
    'إنهاء الخدمة في أي وقت',
    'تدريب تدريجي ومجاني للفريق',
    'انتقال سلس للبيانات مجاناً'
  ];

  const growthSteps = [
    { icon: Sprout, title: 'البذرة', description: 'ابدأ مجاناً' },
    { icon: Leaf, title: 'النمو', description: 'تطور مع الوقت' },
    { icon: TreePine, title: 'الازدهار', description: 'حقق أهدافك' }
  ];

  const decorativeElements = [
    { icon: Leaf, position: { top: '15%', left: '10%' }, color: 'emerald', delay: 0 },
    { icon: Sprout, position: { top: '25%', right: '15%' }, color: 'teal', delay: 1 },
    { icon: TreePine, position: { bottom: '20%', left: '8%' }, color: 'green', delay: 2 }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-teal-50 via-emerald-50 to-green-50 relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-emerald-300 via-teal-300 to-green-300 blur-3xl"
          style={{
            clipPath: "ellipse(70% 50% at 50% 30%)",
            borderRadius: "50% 30% 70% 40%"
          }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 4.5, ease: "easeOut", delay: 0.5 }}
          className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-lime-300 to-emerald-300 blur-3xl"
          style={{
            clipPath: "ellipse(80% 60% at 20% 80%)",
            borderRadius: "40% 60% 30% 70%"
          }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.06 }}
          transition={{ duration: 5, ease: "easeOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-gradient-to-tl from-green-300 to-teal-300 blur-3xl"
          style={{
            clipPath: "ellipse(75% 55% at 80% 70%)",
            borderRadius: "30% 70% 40% 60%"
          }}
        />
      </div>

      {/* Floating decorative elements */}
      {decorativeElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
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
              y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: element.delay },
              x: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: element.delay }
            }}
            className={`absolute text-${element.color}-400`}
            style={element.position}
          >
            <Icon size={50} />
          </motion.div>
        );
      })}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">ابدأ رحلة النمو الطبيعي</span>
          </motion.div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              جاهز للنمو؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            انضم إلى رحلة النمو الطبيعي مع أدابتي واكتشف كيف يمكن لأعمالك أن تزدهر بطريقة مستدامة
          </p>
        </motion.div>

        {/* Growth Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {growthSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  viewport={{ once: true }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    style={{
                      borderRadius: "50% 30% 50% 30%"
                    }}
                  >
                    <Icon size={32} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main CTA Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-lg border border-white/60 shadow-2xl p-8 lg:p-12 relative overflow-hidden group"
              style={{
                borderRadius: "50px 30px 50px 30px",
                boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  borderRadius: "50px 30px 50px 30px"
                }}
              />

              {/* Floating background icon */}
              <div className="absolute -top-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-emerald-500">
                <TreePine size={150} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg"
                    style={{
                      borderRadius: "50% 30% 50% 30%"
                    }}
                  >
                    <Leaf size={28} />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      ابدأ نموك الطبيعي الآن
                    </h3>
                    <p className="text-gray-600">
                      30 يوماً من النمو المجاني والمدعوم
                    </p>
                  </div>
                </div>

                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  احصل على وصول كامل لجميع ميزات أدابتي واستمتع بتجربة نمو طبيعية ومستدامة. 
                  لا حاجة لبطاقة ائتمان ولا التزامات مسبقة.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    onClick={onStartFree}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    style={{
                      borderRadius: "25px",
                      boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
                    }}
                  >
                    ابدأ رحلة النمو مجاناً
                    <ArrowRight className="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    onClick={onRequestDemo}
                    variant="outline"
                    className="border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      borderRadius: "25px"
                    }}
                  >
                    اطلب عرضاً توضيحياً
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.slice(0, 4).map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Side Cards */}
            <div className="space-y-6">
              
              {/* Demo Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm border border-white/60 shadow-xl p-6 relative overflow-hidden group cursor-pointer"
                onClick={onRequestDemo}
                style={{
                  borderRadius: "30px 60px 30px 60px",
                  boxShadow: "0 15px 35px rgba(20, 184, 166, 0.12)"
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-100 to-emerald-100 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    borderRadius: "30px 60px 30px 60px"
                  }}
                />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-14 h-14 bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white mb-4 shadow-lg"
                    style={{
                      borderRadius: "50% 30% 50% 30%"
                    }}
                  >
                    <Sparkles size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">عرض شخصي مخصص</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    احجز جلسة مع خبرائنا لاستكشاف كيف ينمو أدابتي مع أعمالك
                  </p>
                  <div className="text-teal-600 font-medium group-hover:text-teal-700 transition-colors duration-300">
                    احجز الآن ←
                  </div>
                </div>
              </motion.div>

              {/* Support Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm border border-white/60 shadow-xl p-6 relative overflow-hidden group"
                style={{
                  borderRadius: "60px 30px 60px 30px",
                  boxShadow: "0 15px 35px rgba(34, 197, 94, 0.12)"
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-gradient-to-br from-green-100 to-lime-100 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    borderRadius: "60px 30px 60px 30px"
                  }}
                />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-14 h-14 bg-gradient-to-br from-green-400 to-lime-500 flex items-center justify-center text-white mb-4 shadow-lg"
                    style={{
                      borderRadius: "50% 30% 50% 30%"
                    }}
                  >
                    <Leaf size={24} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">دعم مستمر ومجاني</h3>
                  <p className="text-gray-600 text-sm">
                    30 يوماً من الدعم الكامل + تدريب تدريجي للفريق مجاناً
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {benefits.slice(4).map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="flex items-center gap-4 bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg p-4 group cursor-pointer"
              style={{
                borderRadius: "25px 50px 25px 50px",
                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.1)"
              }}
            >
              <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                {benefit}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg">
            🌱 <span className="text-emerald-600 font-medium">+500 شركة</span> تنمو مع أدابتي • 
            <span className="text-teal-600 font-medium"> 99% رضا طبيعي</span> • 
            <span className="text-green-600 font-medium">نمو مستدام 24/7</span> 🌿
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganicCTASection;