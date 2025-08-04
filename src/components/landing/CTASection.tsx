import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Building2, Globe, CheckCircle, Phone } from 'lucide-react';

interface CTASectionProps {
  onStartFree: () => void;
  onRequestDemo: () => void;
}

export default function CTASection({ onStartFree, onRequestDemo }: CTASectionProps) {
  const benefits = [
    'إعداد مجاني في أقل من 10 دقائق',
    'دعم فني مجاني لمدة 30 يوم',
    'تدريب مجاني لفريقك',
    'ضمان استرداد المال لمدة 30 يوم'
  ];

  return (
    <div className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <Card className="border-0 shadow-elegant bg-white overflow-hidden">
            <div className="bg-gradient-primary text-white p-12 text-center">
              <CardHeader className="pb-8">
                <CardTitle className="font-display text-4xl lg:text-5xl font-semibold mb-6">
                  جاهز لتطوير أعمالك؟
                </CardTitle>
                <CardDescription className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  انضم إلى آلاف الشركات الناجحة واكتشف كيف يمكن لنظامنا المتطور أن يحول طريقة إدارتك لأعمالك
                </CardDescription>
              </CardHeader>
            </div>
            
            <CardContent className="p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-8">
                    ما الذي ستحصل عليه:
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                        <span className="text-foreground text-lg">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="text-center lg:text-right">
                  <div className="space-y-4 mb-8">
                    <Button 
                      size="lg" 
                      onClick={onStartFree}
                      className="w-full lg:w-auto text-xl px-12 py-6 h-auto bg-success hover:bg-success/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
                    >
                      <Building2 className="w-6 h-6 mr-3" />
                      ابدأ الآن مجاناً
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={onRequestDemo}
                      className="w-full lg:w-auto text-xl px-12 py-6 h-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium"
                    >
                      <Phone className="w-6 h-6 mr-3" />
                      طلب عرض تجريبي
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">💡 بدون بطاقة ائتمان مطلوبة</p>
                    <p>📞 دعم فني مجاني باللغة العربية</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}