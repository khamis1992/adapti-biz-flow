import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, TrendingUp, TrendingDown, Calendar, Hash } from 'lucide-react';

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

interface AccountTransactionHistoryProps {
  entries: LedgerEntry[];
  loading: boolean;
  accountType: string;
}

export function AccountTransactionHistory({ entries, loading, accountType }: AccountTransactionHistoryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 3,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-KW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) {
      return accountType === 'assets' || accountType === 'expenses' 
        ? 'text-green-600' 
        : 'text-red-600';
    } else if (balance < 0) {
      return accountType === 'assets' || accountType === 'expenses' 
        ? 'text-red-600' 
        : 'text-green-600';
    }
    return 'text-muted-foreground';
  };

  const getTransactionTypeIcon = (debit: number, credit: number) => {
    if (debit > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (credit > 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            سجل الحركات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-muted-foreground">جاري تحميل الحركات...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            سجل الحركات ({entries.length} حركة)
          </CardTitle>
          {entries.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                من {formatDate(entries[entries.length - 1]?.entry_date)} 
                إلى {formatDate(entries[0]?.entry_date)}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد حركات</h3>
            <p className="text-muted-foreground">لا توجد حركات مسجلة لهذا الحساب في الفترة المحددة</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">رقم القيد</TableHead>
                  <TableHead className="text-right">البيان</TableHead>
                  <TableHead className="text-right">المرجع</TableHead>
                  <TableHead className="text-right">مدين</TableHead>
                  <TableHead className="text-right">دائن</TableHead>
                  <TableHead className="text-right">الرصيد الجاري</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(entry.entry_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline" className="font-mono">
                          {entry.journal_entry_number}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={entry.description}>
                        {entry.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {entry.reference && (
                        <Badge variant="secondary">
                          {entry.reference}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {entry.debit_amount > 0 && (
                        <div className="flex items-center gap-2 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-medium">
                            {formatCurrency(entry.debit_amount)}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {entry.credit_amount > 0 && (
                        <div className="flex items-center gap-2 text-red-600">
                          <TrendingDown className="h-4 w-4" />
                          <span className="font-medium">
                            {formatCurrency(entry.credit_amount)}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${getBalanceColor(entry.running_balance)}`}>
                        {formatCurrency(entry.running_balance)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}