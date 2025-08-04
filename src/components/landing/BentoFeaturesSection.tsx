import { motion } from 'framer-motion';
import { 
  Building2, 
  Shield, 
  Users, 
  BarChart3, 
  Clock, 
  Globe,
  Smartphone,
  Database,
  Settings,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';

const BentoFeaturesSection = () => {
  const features = [
    {
      icon: Building2,
      title: 'متعدد الأنشطة',
      description: 'سيارات، يخوت، معدات، مطاعم، صالونات',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-600/20 to-pink-600/20',
      borderColor: 'border-purple-500/30',
      size: 'large'
    },
    {
      icon: Shield,
      title: 'نظام محاسبي',
      description: 'دليل حسابات متكامل ومراكز تكلفة',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-600/20 to-cyan-600/20',
      borderColor: 'border-blue-500/30',
      size: 'medium'
    },
    {
      icon: Users,
      title: 'إدارة شاملة',
      description: 'عملاء، موظفين، أسطول، عقود',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-600/20 to-teal-600/20',
      borderColor: 'border-emerald-500/30',
      size: 'medium'
    },
    {
      icon: BarChart3,
      title: 'تحليلات ذكية',
      description: 'لوحات تحكم تفاعلية وتقارير متقدمة',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-600/20 to-red-600/20',
      borderColor: 'border-orange-500/30',
      size: 'large'
    },
    {
      icon: Clock,
      title: 'أتمتة العمليات',
      description: 'تبسيط المهام اليومية',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-600/20 to-purple-600/20',
      borderColor: 'border-indigo-500/30',
      size: 'small'
    },
    {
      icon: Globe,
      title: 'متعدد اللغات',
      description: 'عربي وإنجليزي',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-600/20 to-emerald-600/20',
      borderColor: 'border-green-500/30',
      size: 'small'
    },
    {
      icon: Smartphone,
      title: 'تطبيق موبايل',
      description: 'إدارة أعمالك من أي مكان',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-600/20 to-rose-600/20',
      borderColor: 'border-pink-500/30',
      size: 'medium'
    },
    {
      icon: Database,
      title: 'أمان البيانات',
      description: 'حماية متقدمة ونسخ احتياطي',
      gradient: 'from-slate-500 to-gray-500',
      bgGradient: 'from-slate-600/20 to-gray-600/20',
      borderColor: 'border-slate-500/30',
      size: 'small'
    }
  ];

  const getGridClasses = (size: string, index: number) => {
    if (size === 'large') return 'col-span-6 row-span-2';
    if (size === 'medium') return 'col-span-4 row-span-2';
    return 'col-span-2 row-span-1';
  };

  return (
    <div className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
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
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">مميزات النظام</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            حلول متكاملة وذكية
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            اكتشف كيف يمكن لأدابتي أن يحول طريقة إدارة أعمالك بتقنيات متطورة وواجهة سهلة الاستخدام
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: Math.random() > 0.5 ? 1 : -1,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className={`
                  ${getGridClasses(feature.size, index)}
                  bg-gradient-to-br ${feature.bgGradient} 
                  border ${feature.borderColor} 
                  rounded-3xl p-6 relative overflow-hidden group cursor-pointer
                  ${feature.size === 'large' ? 'min-h-[200px]' : feature.size === 'medium' ? 'min-h-[160px]' : 'min-h-[120px]'}
                `}
              >
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                
                {/* Magnetic floating icons */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Icon className="w-16 h-16 text-white" />
                </div>

                <div className="relative z-10">
                  <div className={`p-3 bg-gradient-to-r ${feature.gradient} rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className={`font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text transition-all duration-300 ${
                    feature.size === 'large' ? 'text-2xl' : feature.size === 'medium' ? 'text-xl' : 'text-lg'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`text-gray-300 leading-relaxed ${
                    feature.size === 'large' ? 'text-base' : feature.size === 'medium' ? 'text-sm' : 'text-xs'
                  }`}>
                    {feature.description}
                  </p>

                  {feature.size === 'large' && (
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex gap-2">
                        {[1,2,3].map((i) => (
                          <div key={i} className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}></div>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">والمزيد...</span>
                    </div>
                  )}
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '+500', label: 'شركة تثق بنا' },
            { number: '99%', label: 'رضا العملاء' },
            { number: '24/7', label: 'دعم فني' },
            { number: '30', label: 'يوم تجربة مجانية' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="text-center group cursor-pointer"
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BentoFeaturesSection;