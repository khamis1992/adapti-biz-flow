import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, CreditCard, Settings } from 'lucide-react';

const AdvancedEcommerce = () => {
  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            نظام التجارة الإلكترونية المتقدم
          </h1>
          <p className="text-gray-600 mt-2">نظام شامل للتجارة الإلكترونية والمبيعات أونلاين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
          <Button className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            منتج جديد
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              إدارة المنتجات
            </CardTitle>
            <CardDescription>
              إضافة وتحرير ومتابعة المنتجات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              نظام متقدم لإدارة المنتجات مع دعم الصور والتصنيفات والمخزون.
            </p>
            <Button className="mt-4 w-full">إدارة المنتجات</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              إدارة الطلبات
            </CardTitle>
            <CardDescription>
              متابعة الطلبات والشحن والتسليم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              نظام شامل لإدارة الطلبات من الإستلام إلى التسليم مع تتبع كامل.
            </p>
            <Button className="mt-4 w-full">إدارة الطلبات</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              معالجة المدفوعات
            </CardTitle>
            <CardDescription>
              بوابات الدفع والمعاملات المالية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              تكامل مع بوابات الدفع المختلفة لمعالجة آمنة للمدفوعات.
            </p>
            <Button className="mt-4 w-full">بوابات الدفع</Button>
          </CardContent>
        </Card>
      </div>

      {/* Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">قيد التطوير</h3>
          <p className="text-blue-800">
            هذا النظام قيد التطوير وسيتم إضافة المزيد من الميزات قريباً.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedEcommerce;