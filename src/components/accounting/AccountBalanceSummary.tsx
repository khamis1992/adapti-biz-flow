import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingUp, TrendingDown, Activity, Calendar, DollarSign } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface Account {
  id: string;
  account_code: string;
  account_name_ar: string;
  account_name_en: string;
  account_type: string;
  level: number;
  balance: number;
  allow_posting: boolean;
  is_active: boolean;
}

interface LedgerEntry {
  id: string;
  entry_date: string;
  description: string;
  reference: string;
  debit_amount: number;
  credit_amount: number;
  running_balance: number;
  journal_entry_number: string;
}

interface AccountBalanceSummaryProps {
  account: Account;
  entries: LedgerEntry[];
  dateRange?: DateRange;
}

export function AccountBalanceSummary({ account, entries, dateRange }: AccountBalanceSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(value);
  };

  const getAccountTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      assets: 'أصول',
      liabilities: 'خصوم',
      equity: 'حقوق الملكية',
      revenue: 'إيرادات',
      expenses: 'مصروفات',
    };
    return types[type] || type;
  };

  const getAccountTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      assets: 'bg-green-100 text-green-800',
      liabilities: 'bg-red-100 text-red-800',
      equity: 'bg-blue-100 text-blue-800',
      revenue: 'bg-purple-100 text-purple-800',
      expenses: 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  // Calculate summary statistics
  const totalDebits = entries.reduce((sum, entry) => sum + entry.debit_amount, 0);
  const totalCredits = entries.reduce((sum, entry) => sum + entry.credit_amount, 0);
  const currentBalance = entries.length > 0 ? entries[entries.length - 1].running_balance : account.balance;
  const openingBalance = entries.length > 0 ? 
    entries[0].running_balance - (entries[0].debit_amount - entries[0].credit_amount) : 
    account.balance;

  const netMovement = totalDebits - totalCredits;
  const transactionCount = entries.length;

  // Calculate period info
  const periodInfo = dateRange?.from && dateRange?.to ? 
    `من ${dateRange.from.toLocaleDateString('ar-KW')} إلى ${dateRange.to.toLocaleDateString('ar-KW')}` :
    'جميع الفترات';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Account Info Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            معلومات الحساب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <Badge className={getAccountTypeColor(account.account_type)}>
                {getAccountTypeLabel(account.account_type)}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              المستوى: {account.level}
            </div>
            <div className="text-xs text-muted-foreground">
              {account.allow_posting ? 'يسمح بالقيد' : 'لا يسمح بالقيد'}
            </div>
            <div className="text-xs text-muted-foreground">
              الحالة: {account.is_active ? 'نشط' : 'غير نشط'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Balance Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            الرصيد الحالي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(currentBalance)}
            </div>
            <div className="text-xs text-muted-foreground">
              الرصيد الافتتاحي: {formatCurrency(openingBalance)}
            </div>
            <div className={`text-xs font-medium ${
              netMovement > 0 ? 'text-green-600' : netMovement < 0 ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              صافي الحركة: {formatCurrency(netMovement)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debits Summary Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            إجمالي المدين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalDebits)}
            </div>
            <div className="text-xs text-muted-foreground">
              عدد القيود المدينة: {entries.filter(e => e.debit_amount > 0).length}
            </div>
            <div className="text-xs text-muted-foreground">
              متوسط القيد: {totalDebits > 0 ? formatCurrency(totalDebits / entries.filter(e => e.debit_amount > 0).length) : '0.000 د.ك'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits Summary Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-500" />
            إجمالي الدائن
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalCredits)}
            </div>
            <div className="text-xs text-muted-foreground">
              عدد القيود الدائنة: {entries.filter(e => e.credit_amount > 0).length}
            </div>
            <div className="text-xs text-muted-foreground">
              متوسط القيد: {totalCredits > 0 ? formatCurrency(totalCredits / entries.filter(e => e.credit_amount > 0).length) : '0.000 د.ك'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Period & Activity Info - Full Width */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" />
            ملخص النشاط
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">الفترة:</span>
              <span className="font-medium">{periodInfo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">عدد الحركات:</span>
              <span className="font-medium">{transactionCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">آخر حركة:</span>
              <span className="font-medium">
                {entries.length > 0 ? 
                  new Date(entries[entries.length - 1].entry_date).toLocaleDateString('ar-KW') : 
                  'لا توجد حركات'
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}