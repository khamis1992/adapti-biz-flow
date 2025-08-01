import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface InvoiceItem {
  id: string;
  item_name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  tax_percentage: number;
  line_total: number;
}

interface Customer {
  full_name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
}

interface InvoicePrintViewProps {
  invoice: {
    id: string;
    invoice_number: string;
    status: string;
    issue_date: string;
    due_date: string;
    subtotal: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
    paid_amount: number;
    currency: string;
    payment_terms?: string;
    notes?: string;
    terms_conditions?: string;
    customer: Customer;
    items: InvoiceItem[];
  };
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email?: string;
    logo?: string;
  };
}

export const InvoicePrintView: React.FC<InvoicePrintViewProps> = ({ 
  invoice, 
  companyInfo = {
    name: 'شركة تأجير السيارات',
    address: 'شارع الخليج العربي، الكويت',
    phone: '+965 2222 3333',
    email: 'info@carrental.com'
  }
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: invoice.currency || 'KWD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: 'مسودة',
      sent: 'مرسلة',
      paid: 'مدفوعة',
      overdue: 'متأخرة',
      cancelled: 'ملغاة'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-600'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div id="invoice-print-view" className="bg-white p-8 max-w-4xl mx-auto text-black print:shadow-none">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center mb-4">
            {companyInfo.logo && (
              <img src={companyInfo.logo} alt="Company Logo" className="h-12 mr-4" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-primary">{companyInfo.name}</h1>
            </div>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>{companyInfo.address}</p>
            <p>هاتف: {companyInfo.phone}</p>
            {companyInfo.email && <p>البريد: {companyInfo.email}</p>}
          </div>
        </div>

        {/* Invoice Info */}
        <div className="text-right">
          <h2 className="text-3xl font-bold mb-4 text-primary">فاتورة</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">رقم الفاتورة:</span>
              <span className="font-bold">{invoice.invoice_number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">الحالة:</span>
              <Badge className={getStatusColor(invoice.status)}>
                {getStatusLabel(invoice.status)}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">تاريخ الإصدار:</span>
              <span>{formatDate(invoice.issue_date)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">تاريخ الاستحقاق:</span>
              <span className="font-medium">{formatDate(invoice.due_date)}</span>
            </div>
            {invoice.payment_terms && (
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">شروط الدفع:</span>
                <span>{invoice.payment_terms}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-3 text-primary border-b border-gray-200 pb-2">
          بيانات العميل
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-lg">{invoice.customer.full_name}</p>
              <div className="space-y-1 text-sm text-gray-600 mt-2">
                <p>هاتف: {invoice.customer.phone}</p>
                {invoice.customer.email && <p>البريد: {invoice.customer.email}</p>}
                {invoice.customer.address && <p>العنوان: {invoice.customer.address}</p>}
                {invoice.customer.city && <p>المدينة: {invoice.customer.city}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-3 text-primary border-b border-gray-200 pb-2">
          تفاصيل الفاتورة
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-right font-bold">الوصف</th>
                <th className="border border-gray-300 p-3 text-center font-bold w-20">الكمية</th>
                <th className="border border-gray-300 p-3 text-center font-bold w-24">السعر</th>
                <th className="border border-gray-300 p-3 text-center font-bold w-20">الخصم</th>
                <th className="border border-gray-300 p-3 text-center font-bold w-20">الضريبة</th>
                <th className="border border-gray-300 p-3 text-right font-bold w-28">المجموع</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 p-3">
                    <div>
                      <p className="font-medium">{item.item_name}</p>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    {formatCurrency(item.unit_price)}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {item.discount_percentage}%
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {item.tax_percentage}%
                  </td>
                  <td className="border border-gray-300 p-3 text-right font-medium">
                    {formatCurrency(item.line_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="mb-8">
        <div className="flex justify-end">
          <div className="w-80">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">المجموع الفرعي:</span>
                  <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                </div>
                
                {invoice.discount_amount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span className="font-medium">إجمالي الخصم:</span>
                    <span className="font-medium">-{formatCurrency(invoice.discount_amount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="font-medium">إجمالي الضريبة:</span>
                  <span className="font-medium">{formatCurrency(invoice.tax_amount)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>المجموع الكلي:</span>
                  <span>{formatCurrency(invoice.total_amount)}</span>
                </div>
                
                {invoice.paid_amount > 0 && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span className="font-medium">المدفوع:</span>
                      <span className="font-medium">{formatCurrency(invoice.paid_amount)}</span>
                    </div>
                    <div className="flex justify-between text-red-600 font-bold">
                      <span>المتبقي:</span>
                      <span>{formatCurrency(invoice.total_amount - invoice.paid_amount)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      {(invoice.notes || invoice.terms_conditions) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {invoice.notes && (
            <div>
              <h4 className="font-bold mb-2 text-primary">ملاحظات:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {invoice.notes}
              </div>
            </div>
          )}
          
          {invoice.terms_conditions && (
            <div>
              <h4 className="font-bold mb-2 text-primary">الشروط والأحكام:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {invoice.terms_conditions}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
        <p>شكراً لاختياركم خدماتنا</p>
        <p className="mt-2">
          تم إنشاء هذه الفاتورة في {formatDate(new Date().toISOString())}
        </p>
      </div>
    </div>
  );
};