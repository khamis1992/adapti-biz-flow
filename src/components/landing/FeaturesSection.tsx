import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Shield, Users, BarChart3, Clock, Globe } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'متعدد الأنشطة',
    description: 'يدعم تأجير السيارات، اليخوت، المعدات، المطاعم، الصالونات، والعديد من الأنشطة التجارية الأخرى',
    color: 'primary'
  },
  {
    icon: Shield,
    title: 'نظام محاسبي احترافي',
    description: 'دليل حسابات متكامل، قيود تلقائية، تقارير مالية شاملة، ومراكز تكلفة متقدمة',
    color: 'success'
  },
  {
    icon: Users,
    title: 'إدارة شاملة ومتطورة',
    description: 'إدارة العملاء، الموظفين، الأسطول، العقود، والمخالفات في منصة واحدة موحدة',
    color: 'active'
  },
  {
    icon: BarChart3,
    title: 'تقارير وتحليلات ذكية',
    description: 'لوحات تحكم تفاعلية وتقارير تحليلية متقدمة لاتخاذ قرارات مدروسة',
    color: 'warning'
  },
  {
    icon: Clock,
    title: 'أتمتة العمليات',
    description: 'تبسيط وأتمتة العمليات اليومية لزيادة الكفاءة وتوفير الوقت',
    color: 'primary'
  },
  {
    icon: Globe,
    title: 'دعم متعدد اللغات',
    description: 'واجهة باللغتين العربية والإنجليزية مع دعم كامل للتخصيص المحلي',
    color: 'success'
  }
];

export default function FeaturesSection() {
  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6 text-primary">
            مميزات النظام المتطور
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            حلول متكاملة وذكية لإدارة جميع جوانب أعمالك بكفاءة ودقة عالية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group bg-gradient-subtle border-0 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-6 p-4 rounded-2xl bg-${feature.color}/10 w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary mb-3">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}