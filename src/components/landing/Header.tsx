import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Building2,
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

interface HeaderProps {
  onStartFree: () => void;
  onLogin: () => void;
}

const Header = ({ onStartFree, onLogin }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "الرئيسية", href: "#home" },
    { name: "المميزات", href: "#features" },
    { name: "التسعير", href: "#pricing" },
    { name: "من نحن", href: "#about" },
    { name: "تواصل معنا", href: "#contact" }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary">AdaptiBiz</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={onLogin}
              className="bg-success hover:bg-success/90 text-white group"
            >
              تسجيل الدخول
              <ArrowRight className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
            
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-6 border-t border-border">
            {/* Mobile Navigation */}
            <nav className="space-y-4 mb-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0, 
                    x: isMenuOpen ? 0 : -20 
                  }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA Buttons */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0, 
                y: isMenuOpen ? 0 : 20 
              }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={onLogin}
                className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-white"
              >
                تسجيل الدخول
              </Button>
              
              <Button
                onClick={onStartFree}
                className="w-full justify-center bg-success hover:bg-success/90 text-white group"
              >
                ابدأ مجاناً
                <ArrowRight className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="mt-6 pt-6 border-t border-border space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isMenuOpen ? 1 : 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+966 11 234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@adaptibiz.com</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;