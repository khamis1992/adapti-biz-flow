import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, Zap, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BentoCTASectionProps {
  onStartFree: () => void;
  onRequestDemo: () => void;
}

const BentoCTASection = ({ onStartFree, onRequestDemo }: BentoCTASectionProps) => {
  const benefits = [
    'إعداد مجاني في أقل من 10 دقائق',
    'دعم مجاني لمدة 30 يوماً',
    'بدون التزامات طويلة المدى',
    'إلغاء في أي وقت',
    'تدريب مجاني للفريق',
    'ترحيل البيانات مجاناً'
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-8">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">ابدأ رحلتك الآن</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            جاهز للبدء؟
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            انضم إلى المئات من الشركات التي تثق بأدابتي لإدارة أعمالها بكفاءة ونجاح
          </p>
        </motion.div>

        {/* Bento Grid CTA */}
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8 bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/40 rounded-3xl p-8 lg:p-12 relative overflow-hidden group"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  ابدأ تجربتك المجانية الآن
                </div>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                احصل على وصول كامل لجميع ميزات أدابتي لمدة 30 يوماً بدون أي تكلفة. 
                لا حاجة لبطاقة ائتمان ولا التزامات.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={onStartFree}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-4 rounded-2xl font-semibold text-lg group/btn"
                >
                  ابدأ مجاناً الآن
                  <ArrowRight className="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={onRequestDemo}
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 px-8 py-4 rounded-2xl font-semibold text-lg"
                >
                  طلب عرض توضيحي
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Side Cards */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Demo Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
              onClick={onRequestDemo}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">عرض توضيحي مخصص</h3>
                <p className="text-gray-300 text-sm mb-4">
                  احجز جلسة مع خبرائنا لاستكشاف كيف يمكن لأدابتي أن يلائم احتياجات عملك
                </p>
                <div className="text-blue-300 text-sm font-medium group-hover:text-blue-200 transition-colors duration-300">
                  احجز الآن ←
                </div>
              </div>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">دعم مجاني كامل</h3>
                <p className="text-gray-300 text-sm">
                  30 يوماً من الدعم المجاني الكامل + تدريب الفريق مجاناً
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {benefits.slice(4).map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 1 }}
              className="flex items-center gap-3 bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-gray-600/30 rounded-2xl p-4 group cursor-pointer"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg">
            ✨ <span className="text-purple-300">+500 شركة</span> تثق بأدابتي لإدارة أعمالها • 
            <span className="text-pink-300"> 99% رضا العملاء</span> • 
            <span className="text-cyan-300">دعم 24/7</span> ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoCTASection;