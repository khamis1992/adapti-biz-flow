import { motion } from 'framer-motion';
import companyLogo from '@/assets/logo_rukn_1-removebg-preview.png';

export default function OnboardingHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary-foreground min-h-[200px]">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-2xl"
          animate={{
            x: [30, -30, 30],
            y: [20, -20, 20],
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ transform: 'translate(50%, 50%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10" />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10" dir="rtl">
        <motion.div 
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
              <img 
                src={companyLogo} 
                alt="رُكن Logo" 
                className="h-16 w-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>
          
          <div className="flex-1">
            <motion.h1 
              className="text-4xl lg:text-5xl font-display font-bold text-white mb-3 leading-tight"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-l from-white via-white/95 to-white/90 bg-clip-text text-transparent">
                نظام إدارة الأعمال المتكامل
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-white/80 text-xl font-medium mb-2">
                إعداد النظام لأول مرة
              </p>
              <div className="flex items-center gap-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-transparent rounded-full" />
                <p className="text-white/60 text-sm">
                  خطوات بسيطة لتخصيص نظامك
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}