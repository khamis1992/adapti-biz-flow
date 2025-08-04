import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'أحمد محمد',
    position: 'مدير شركة الخليج للتأجير',
    content: 'النظام غير طريقة إدارتنا للأعمال بشكل كامل. المحاسبة أصبحت أسهل والتقارير دقيقة ومفصلة.',
    rating: 5,
    company: 'الخليج للتأجير'
  },
  {
    name: 'فاطمة الأحمد',
    position: 'مديرة مطعم الذواقة',
    content: 'أفضل استثمار قمنا به. إدارة المخزون والطلبات أصبحت سهلة جداً ووفرنا الكثير من الوقت.',
    rating: 5,
    company: 'مطعم الذواقة'
  },
  {
    name: 'عبدالله الراشد',
    position: 'مالك صالون الفخامة',
    content: 'النظام ساعدنا في تنظيم المواعيد وإدارة العملاء بطريقة احترافية. التقارير ممتازة.',
    rating: 5,
    company: 'صالون الفخامة'
  }
];

export default function TestimonialsSection() {
  return (
    <div className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6 text-primary">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            اكتشف كيف ساعد نظامنا المتطور آلاف الشركات في تحقيق النجاح والنمو
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-medium hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -right-2 w-8 h-8 text-primary/20" />
                  <p className="text-foreground mb-6 text-lg leading-relaxed pr-6">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <div className="font-semibold text-primary mb-1">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground mb-1">{testimonial.position}</div>
                  <div className="text-xs text-primary/70 font-medium">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}