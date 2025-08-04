import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sun, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrganicHeroSectionProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const OrganicHeroSection = ({ onStartFree, onLogin }: OrganicHeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"
          style={{
            clipPath: "ellipse(70% 80% at 30% 20%)"
          }}
        />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-20 right-10 w-[500px] h-[400px] bg-gradient-to-tl from-amber-200/30 to-orange-200/30 rounded-full blur-2xl"
          style={{
            clipPath: "ellipse(80% 60% at 70% 80%)"
          }}
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-lime-200/20 to-emerald-200/20 blur-3xl"
          style={{
            clipPath: "ellipse(90% 50% at 50% 50%)",
            borderRadius: "50% 30% 70% 40%"
          }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-20 text-emerald-300/40"
      >
        <Leaf size={80} />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-40 left-32 text-amber-300/40"
      >
        <Sun size={60} />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 right-40 text-teal-300/40"
      >
        <Droplets size={50} />
      </motion.div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-emerald-200/50 rounded-full px-6 py-3 shadow-lg"
              style={{
                boxShadow: "0 8px 32px rgba(16, 185, 129, 0.15)"
              }}
            >
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">نظام إدارة أعمال طبيعي ومتطور</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h1 className="text-6xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                  أدابتي
                </span>
              </h1>
              <div className="text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed mb-6">
                حلول إدارية تنمو مع أعمالك
                <br />
                <span className="text-emerald-600 font-medium">بطريقة طبيعية ومستدامة</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              اكتشف كيف يمكن لنظام أدابتي أن ينمي أعمالك بشكل طبيعي ومتوازن، 
              مع حلول ذكية تتكيف مع احتياجاتك وتتطور معك.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={onStartFree}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                style={{
                  borderRadius: "25px",
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
                }}
              >
                ابدأ رحلتك المجانية
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={onLogin}
                variant="outline"
                className="border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  borderRadius: "25px"
                }}
              >
                تسجيل الدخول
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">+500</div>
                <div className="text-sm text-gray-500">شركة تنمو معنا</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">99%</div>
                <div className="text-sm text-gray-500">رضا طبيعي</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">30</div>
                <div className="text-sm text-gray-500">يوم نمو مجاني</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Main organic shape */}
            <motion.div
              animate={{ 
                rotate: [0, 5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-[600px] bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-lg border border-white/50 shadow-2xl"
              style={{
                borderRadius: "50% 30% 70% 40%",
                boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
              }}
            >
              {/* Inner content cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 shadow-lg"
                style={{
                  borderRadius: "30px 10px 30px 10px",
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)"
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">نمو مستدام</h3>
                    <p className="text-sm text-gray-600">إدارة تنمو مع الوقت</p>
                  </div>
                </div>
                <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 shadow-lg"
                style={{
                  borderRadius: "10px 30px 10px 30px",
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)"
                }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">40%</div>
                    <div className="text-xs text-gray-500">زيادة الكفاءة</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-600">60%</div>
                    <div className="text-xs text-gray-500">توفير الوقت</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">90%</div>
                    <div className="text-xs text-gray-500">سهولة الاستخدام</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating mini elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-80"
              />
              
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-teal-200 to-emerald-200 opacity-70"
                style={{
                  borderRadius: "50% 30% 70% 40%"
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganicHeroSection;