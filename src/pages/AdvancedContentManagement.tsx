import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Folder, Image, Settings } from 'lucide-react';

const AdvancedContentManagement = () => {
  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            نظام إدارة المحتوى المتقدم
          </h1>
          <p className="text-gray-600 mt-2">نظام شامل لإدارة المحتوى والملفات والوسائط</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            محتوى جديد
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              إدارة المحتوى
            </CardTitle>
            <CardDescription>
              إنشاء وتحرير ونشر المحتوى
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              أدوات متقدمة لإنشاء وتحرير ونشر المحتوى مع دعم متعدد الوسائط.
            </p>
            <Button className="mt-4 w-full">إدارة المحتوى</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              إدارة الملفات
            </CardTitle>
            <CardDescription>
              تنظيم وأرشفة الملفات والمجلدات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              نظام متقدم لتنظيم وأرشفة الملفات مع إمكانيات البحث المتقدم.
            </p>
            <Button className="mt-4 w-full">إدارة الملفات</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              مكتبة الوسائط
            </CardTitle>
            <CardDescription>
              إدارة الصور والفيديوهات والملفات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              مكتبة شاملة لإدارة الوسائط مع أدوات التحرير والتحسين.
            </p>
            <Button className="mt-4 w-full">مكتبة الوسائط</Button>
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

export default AdvancedContentManagement;