import { motion } from 'framer-motion';
import { 
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Award,
  Clock
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "المنتج",
      links: [
        { name: "المميزات", href: "#features" },
        { name: "التسعير", href: "#pricing" },
        { name: "العروض التوضيحية", href: "#demo" },
        { name: "التحديثات", href: "#updates" }
      ]
    },
    {
      title: "الشركة",
      links: [
        { name: "من نحن", href: "#about" },
        { name: "فريق العمل", href: "#team" },
        { name: "الوظائف", href: "#careers" },
        { name: "الأخبار", href: "#news" }
      ]
    },
    {
      title: "الدعم",
      links: [
        { name: "مركز المساعدة", href: "#help" },
        { name: "التوثيق", href: "#docs" },
        { name: "تواصل معنا", href: "#contact" },
        { name: "حالة النظام", href: "#status" }
      ]
    },
    {
      title: "قانوني",
      links: [
        { name: "سياسة الخصوصية", href: "#privacy" },
        { name: "شروط الاستخدام", href: "#terms" },
        { name: "ملفات تعريف الارتباط", href: "#cookies" },
        { name: "اتفاقية المستوى", href: "#sla" }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "الهاتف",
      value: "+966 11 234 5678"
    },
    {
      icon: Mail,
      label: "البريد الإلكتروني",
      value: "info@adaptibiz.com"
    },
    {
      icon: MapPin,
      label: "العنوان",
      value: "الرياض، المملكة العربية السعودية"
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "فيسبوك" },
    { icon: Twitter, href: "#", label: "تويتر" },
    { icon: Instagram, href: "#", label: "إنستغرام" },
    { icon: Linkedin, href: "#", label: "لينكد إن" }
  ];

  const trustBadges = [
    {
      icon: Shield,
      label: "أمان البيانات",
      description: "تشفير SSL 256-bit"
    },
    {
      icon: Award,
      label: "شهادة ISO",
      description: "ISO 27001 معتمد"
    },
    {
      icon: Clock,
      label: "دعم 24/7",
      description: "متاح طوال الوقت"
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary">AdaptiBiz</h3>
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                نظام ERP متكامل يساعد الشركات على إدارة أعمالها بكفاءة وذكاء. 
                حلول تقنية متطورة لمستقبل رقمي أفضل.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-foreground font-medium">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
              >
                <h4 className="text-lg font-semibold text-foreground mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          className="py-8 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground text-sm">{badge.label}</h5>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="py-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm">
                © {currentYear} AdaptiBiz. جميع الحقوق محفوظة.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted/20 hover:bg-primary/10 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;