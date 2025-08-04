import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Globe, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BentoHeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const BentoHeroSection = ({ onStartFree, onLogin }: BentoHeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">نظام إدارة أعمال متطور</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            أدابتي
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            حلول ذكية ومتكاملة لإدارة جميع جوانب أعمالك بكفاءة ودقة عالية
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px] max-w-7xl mx-auto">
          
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="col-span-6 row-span-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-purple-300 font-semibold">ابدأ مجاناً</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                انطلق في رحلة النجاح
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                جرب النظام مجاناً لمدة 30 يوماً واكتشف كيف يمكن أن يغير أدابتي طريقة إدارة أعمالك
              </p>
              <Button 
                onClick={onStartFree}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3 rounded-2xl font-semibold group"
              >
                ابدأ الآن
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Features Mini Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="col-span-3 row-span-2 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl w-fit mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">متعدد الأنشطة</h4>
              <p className="text-gray-300 text-sm">
                يدعم تأجير السيارات، اليخوت، المطاعم، والمزيد
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="col-span-3 row-span-2 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl w-fit mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">نظام محاسبي</h4>
              <p className="text-gray-300 text-sm">
                دليل حسابات متكامل وتقارير مالية شاملة
              </p>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.03, rotate: -0.5 }}
            className="col-span-4 row-span-2 bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl w-fit mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">تحليلات ذكية</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">+500</div>
                  <div className="text-orange-300 text-sm">شركة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-orange-300 text-sm">رضا العملاء</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="col-span-2 row-span-2 bg-gradient-to-br from-gray-700/40 to-gray-800/40 border border-gray-600/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
            onClick={onLogin}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-center">
              <div className="text-lg font-bold text-white mb-2">تسجيل الدخول</div>
              <div className="text-gray-300 text-sm mb-4">للعملاء الحاليين</div>
              <Button variant="outline" className="border-gray-500/50 text-gray-300 hover:bg-gray-700/50">
                دخول
              </Button>
            </div>
          </motion.div>

          {/* Large Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02, rotate: -0.5 }}
            className="col-span-8 row-span-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  أتمتة العمليات والذكاء الاصطناعي
                </h4>
                <p className="text-gray-300">
                  تبسيط وأتمتة العمليات اليومية مع تحليلات ذكية لاتخاذ قرارات مدروسة
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small accent card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="col-span-4 row-span-1 bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/30 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-center">
              <div className="text-3xl font-bold text-white mb-1">30</div>
              <div className="text-pink-300 text-sm">يوماً تجربة مجانية</div>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            ✨ بدون رسوم إعداد • دعم مجاني لمدة 30 يوماً • إلغاء في أي وقت
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoHeroSection;