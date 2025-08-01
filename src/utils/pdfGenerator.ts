import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceData {
  invoice_number: string;
  issue_date: string;
  due_date: string;
  status: string;
  customer: {
    full_name: string;
    email?: string;
    phone: string;
    address?: string;
    city?: string;
  };
  items: Array<{
    item_name: string;
    description?: string;
    quantity: number;
    unit_price: number;
    discount_percentage: number;
    tax_percentage: number;
    line_total: number;
  }>;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  currency: string;
  payment_terms?: string;
  notes?: string;
  terms_conditions?: string;
}

export const generateInvoicePDF = async (invoice: InvoiceData, companyInfo?: any) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // RTL support
  const isRTL = true;
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  
  // Add Arabic font support (this would need actual font file in production)
  pdf.setFont('helvetica');
  
  let currentY = margin;
  
  // Header - Company Info
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  if (isRTL) {
    pdf.text('فاتورة', pageWidth - margin, currentY, { align: 'right' });
  } else {
    pdf.text('INVOICE', margin, currentY);
  }
  
  currentY += 15;
  
  // Company details
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  const companyName = companyInfo?.name || 'شركة تأجير السيارات';
  const companyAddress = companyInfo?.address || 'شارع الخليج العربي، الكويت';
  const companyPhone = companyInfo?.phone || '+965 2222 3333';
  
  if (isRTL) {
    pdf.text(companyName, pageWidth - margin, currentY, { align: 'right' });
    currentY += 6;
    pdf.text(companyAddress, pageWidth - margin, currentY, { align: 'right' });
    currentY += 6;
    pdf.text(companyPhone, pageWidth - margin, currentY, { align: 'right' });
  } else {
    pdf.text(companyName, margin, currentY);
    currentY += 6;
    pdf.text(companyAddress, margin, currentY);
    currentY += 6;
    pdf.text(companyPhone, margin, currentY);
  }
  
  currentY += 20;
  
  // Invoice details box
  const boxY = currentY;
  pdf.rect(pageWidth - margin - 80, boxY, 80, 30);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  
  if (isRTL) {
    pdf.text('رقم الفاتورة:', pageWidth - margin - 5, boxY + 8, { align: 'right' });
    pdf.text('تاريخ الإصدار:', pageWidth - margin - 5, boxY + 16, { align: 'right' });
    pdf.text('تاريخ الاستحقاق:', pageWidth - margin - 5, boxY + 24, { align: 'right' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.text(invoice.invoice_number, pageWidth - margin - 45, boxY + 8, { align: 'right' });
    pdf.text(new Date(invoice.issue_date).toLocaleDateString('ar-SA'), pageWidth - margin - 45, boxY + 16, { align: 'right' });
    pdf.text(new Date(invoice.due_date).toLocaleDateString('ar-SA'), pageWidth - margin - 45, boxY + 24, { align: 'right' });
  }
  
  currentY += 40;
  
  // Customer information
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  if (isRTL) {
    pdf.text('بيانات العميل:', pageWidth - margin, currentY, { align: 'right' });
  } else {
    pdf.text('Bill To:', margin, currentY);
  }
  
  currentY += 10;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  if (isRTL) {
    pdf.text(invoice.customer.full_name, pageWidth - margin, currentY, { align: 'right' });
    currentY += 6;
    if (invoice.customer.email) {
      pdf.text(invoice.customer.email, pageWidth - margin, currentY, { align: 'right' });
      currentY += 6;
    }
    pdf.text(invoice.customer.phone, pageWidth - margin, currentY, { align: 'right' });
    currentY += 6;
    if (invoice.customer.address) {
      pdf.text(invoice.customer.address, pageWidth - margin, currentY, { align: 'right' });
      currentY += 6;
    }
  }
  
  currentY += 15;
  
  // Items table
  const tableStartY = currentY;
  const colWidths = [40, 20, 25, 20, 20, 30]; // Description, Qty, Price, Discount, Tax, Total
  let tableX = margin;
  
  // Table headers
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.rect(tableX, tableStartY, pageWidth - 2 * margin, 8);
  
  if (isRTL) {
    let headerX = pageWidth - margin;
    const headers = ['المجموع', 'الضريبة', 'الخصم', 'السعر', 'الكمية', 'الوصف'];
    headers.forEach((header, index) => {
      headerX -= colWidths[5 - index];
      pdf.text(header, headerX + colWidths[5 - index] / 2, tableStartY + 5, { align: 'center' });
    });
  }
  
  currentY = tableStartY + 8;
  
  // Table rows
  pdf.setFont('helvetica', 'normal');
  invoice.items.forEach((item) => {
    pdf.rect(tableX, currentY, pageWidth - 2 * margin, 12);
    
    if (isRTL) {
      let itemX = pageWidth - margin;
      const values = [
        formatCurrency(item.line_total, invoice.currency),
        `${item.tax_percentage}%`,
        `${item.discount_percentage}%`,
        formatCurrency(item.unit_price, invoice.currency),
        item.quantity.toString(),
        item.item_name
      ];
      
      values.forEach((value, index) => {
        itemX -= colWidths[5 - index];
        pdf.text(value, itemX + colWidths[5 - index] / 2, currentY + 8, { 
          align: index === 5 ? 'right' : 'center',
          maxWidth: colWidths[5 - index] - 2
        });
      });
    }
    
    currentY += 12;
  });
  
  currentY += 10;
  
  // Totals section
  const totalsX = pageWidth - margin - 60;
  const totalsWidth = 60;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  // Subtotal
  pdf.text('المجموع الفرعي:', totalsX, currentY, { align: 'right' });
  pdf.text(formatCurrency(invoice.subtotal, invoice.currency), totalsX + totalsWidth - 5, currentY, { align: 'right' });
  currentY += 6;
  
  // Discount
  if (invoice.discount_amount > 0) {
    pdf.text('الخصم:', totalsX, currentY, { align: 'right' });
    pdf.text(`-${formatCurrency(invoice.discount_amount, invoice.currency)}`, totalsX + totalsWidth - 5, currentY, { align: 'right' });
    currentY += 6;
  }
  
  // Tax
  pdf.text('الضريبة:', totalsX, currentY, { align: 'right' });
  pdf.text(formatCurrency(invoice.tax_amount, invoice.currency), totalsX + totalsWidth - 5, currentY, { align: 'right' });
  currentY += 6;
  
  // Line above total
  pdf.line(totalsX, currentY, totalsX + totalsWidth, currentY);
  currentY += 4;
  
  // Total
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('المجموع الكلي:', totalsX, currentY, { align: 'right' });
  pdf.text(formatCurrency(invoice.total_amount, invoice.currency), totalsX + totalsWidth - 5, currentY, { align: 'right' });
  
  if (invoice.paid_amount > 0) {
    currentY += 8;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('المدفوع:', totalsX, currentY, { align: 'right' });
    pdf.text(formatCurrency(invoice.paid_amount, invoice.currency), totalsX + totalsWidth - 5, currentY, { align: 'right' });
    
    currentY += 6;
    pdf.setFont('helvetica', 'bold');
    pdf.text('المتبقي:', totalsX, currentY, { align: 'right' });
    pdf.text(formatCurrency(invoice.total_amount - invoice.paid_amount, invoice.currency), totalsX + totalsWidth - 5, currentY, { align: 'right' });
  }
  
  // Notes and terms at bottom
  currentY = pageHeight - 40;
  
  if (invoice.notes) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('ملاحظات:', margin, currentY);
    currentY += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.text(invoice.notes, margin, currentY, { maxWidth: pageWidth - 2 * margin });
    currentY += 10;
  }
  
  if (invoice.terms_conditions) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('الشروط والأحكام:', margin, currentY);
    currentY += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.text(invoice.terms_conditions, margin, currentY, { maxWidth: pageWidth - 2 * margin });
  }
  
  return pdf;
};

export const generateInvoicePDFFromElement = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }
  
  // Configure html2canvas for better RTL support
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    width: element.scrollWidth,
    height: element.scrollHeight,
    backgroundColor: '#ffffff'
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const scaledWidth = imgWidth * ratio;
  const scaledHeight = imgHeight * ratio;
  
  const x = (pdfWidth - scaledWidth) / 2;
  const y = (pdfHeight - scaledHeight) / 2;
  
  pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
  
  return pdf;
};

const formatCurrency = (amount: number, currency: string = 'KWD') => {
  return new Intl.NumberFormat('ar-KW', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const downloadPDF = (pdf: jsPDF, filename: string) => {
  pdf.save(filename);
};

export const printPDF = (pdf: jsPDF) => {
  const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  const printWindow = window.open(url);
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
        URL.revokeObjectURL(url);
      }, 1000);
    };
  }
};