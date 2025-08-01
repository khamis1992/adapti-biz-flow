import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, User, Building, Hash, Receipt } from 'lucide-react';

interface JournalEntry {
  id: string;
  entry_number: string;
  entry_date: string;
  description: string;
  reference?: string;
  total_amount: number;
  created_at: string;
  created_by: string;
  cost_center: {
    code: string;
    name_ar: string;
  };
  journal_entry_lines: Array<{
    id: string;
    account: {
      account_code: string;
      account_name_ar: string;
    };
    description?: string;
    debit_amount: number;
    credit_amount: number;
  }>;
}

interface JournalEntryDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  journalEntry: JournalEntry | null;
}

export const JournalEntryDetails = ({ open, onOpenChange, journalEntry }: JournalEntryDetailsProps) => {
  if (!journalEntry) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-KW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  const totalDebits = journalEntry.journal_entry_lines.reduce((sum, line) => sum + line.debit_amount, 0);
  const totalCredits = journalEntry.journal_entry_lines.reduce((sum, line) => sum + line.credit_amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            تفاصيل القيد المحاسبي
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Journal Entry Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>معلومات القيد</span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {journalEntry.entry_number}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">تاريخ القيد:</span>
                    <span className="font-medium">{formatDate(journalEntry.entry_date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">مركز التكلفة:</span>
                    <Badge variant="secondary">
                      {journalEntry.cost_center.code} - {journalEntry.cost_center.name_ar}
                    </Badge>
                  </div>

                  {journalEntry.reference && (
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Receipt className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">المرجع:</span>
                      <span className="font-mono">{journalEntry.reference}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">إجمالي المبلغ:</span>
                    <span className="font-mono font-bold text-lg">
                      {formatCurrency(journalEntry.total_amount)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">تاريخ الإنشاء:</span>
                    <span className="text-sm">{formatDate(journalEntry.created_at)}</span>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">الوصف:</h4>
                <p className="text-muted-foreground bg-muted p-3 rounded-md">
                  {journalEntry.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Journal Entry Lines */}
          <Card>
            <CardHeader>
              <CardTitle>بنود القيد</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الحساب</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead className="text-right">مدين</TableHead>
                    <TableHead className="text-right">دائن</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journalEntry.journal_entry_lines.map((line, index) => (
                    <TableRow key={line.id}>
                      <TableCell>
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">
                            {line.account.account_code}
                          </div>
                          <div className="font-medium">
                            {line.account.account_name_ar}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {line.description ? (
                          <span className="text-sm">{line.description}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {line.debit_amount > 0 ? (
                          <span className="text-blue-600 font-medium">
                            {formatCurrency(line.debit_amount)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {line.credit_amount > 0 ? (
                          <span className="text-green-600 font-medium">
                            {formatCurrency(line.credit_amount)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totals */}
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">إجمالي المدين</p>
                      <p className="text-xl font-bold text-blue-600 font-mono">
                        {formatCurrency(totalDebits)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">إجمالي الدائن</p>
                      <p className="text-xl font-bold text-green-600 font-mono">
                        {formatCurrency(totalCredits)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Balance Check */}
              <div className="mt-4 p-3 rounded-lg bg-muted text-center">
                <p className="text-sm text-muted-foreground">حالة القيد:</p>
                <Badge 
                  variant={Math.abs(totalDebits - totalCredits) < 0.001 ? "default" : "destructive"}
                  className="mt-1"
                >
                  {Math.abs(totalDebits - totalCredits) < 0.001 ? 'متوازن' : 'غير متوازن'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};