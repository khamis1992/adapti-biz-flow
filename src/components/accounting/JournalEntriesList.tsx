import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { JournalEntryDialog } from './JournalEntryDialog';
import { JournalEntryDetails } from './JournalEntryDetails';

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

interface JournalEntriesListProps {
  onCreateNew: () => void;
}

export const JournalEntriesList = ({ onCreateNew }: JournalEntriesListProps) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select(`
          *,
          cost_center:cost_centers!cost_center_id(code, name_ar),
          journal_entry_lines(
            id,
            description,
            debit_amount,
            credit_amount,
            account:accounts!account_id(account_code, account_name_ar)
          )
        `)
        .order('entry_date', { ascending: false })
        .order('entry_number', { ascending: false });

      if (error) throw error;
      setJournalEntries(data || []);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل القيود المحاسبية',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (entry: JournalEntry) => {
    if (!confirm('هل أنت متأكد من حذف هذا القيد؟')) return;

    try {
      // Delete journal entry lines first
      await supabase
        .from('journal_entry_lines')
        .delete()
        .eq('journal_entry_id', entry.id);

      // Then delete the journal entry
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entry.id);

      if (error) throw error;

      toast({
        title: 'تم حذف القيد بنجاح',
        description: `رقم القيد: ${entry.entry_number}`
      });

      fetchJournalEntries();
    } catch (error: any) {
      toast({
        title: 'خطأ في حذف القيد',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const filteredEntries = journalEntries.filter(entry =>
    entry.entry_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.cost_center.name_ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-KW');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">جاري تحميل القيود المحاسبية...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              القيود المحاسبية
            </span>
            <Button onClick={onCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              قيد جديد
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في القيود المحاسبية..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {filteredEntries.length} قيد
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي القيود</p>
                <p className="text-2xl font-bold">{journalEntries.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قيود هذا الشهر</p>
                <p className="text-2xl font-bold">
                  {journalEntries.filter(entry => {
                    const entryDate = new Date(entry.entry_date);
                    const now = new Date();
                    return entryDate.getMonth() === now.getMonth() && 
                           entryDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبالغ</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(journalEntries.reduce((sum, entry) => sum + entry.total_amount, 0))}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries Table */}
      {filteredEntries.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'لا توجد قيود مطابقة لمعايير البحث' : 'لا توجد قيود محاسبية حتى الآن'}
              </p>
              <Button onClick={onCreateNew} variant="outline">
                إنشاء أول قيد محاسبي
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم القيد</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>مركز التكلفة</TableHead>
                  <TableHead>المرجع</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono font-medium">
                      {entry.entry_number}
                    </TableCell>
                    <TableCell>{formatDate(entry.entry_date)}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="truncate">{entry.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.journal_entry_lines.length} بند
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {entry.cost_center.code}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {entry.reference ? (
                        <span className="text-sm">{entry.reference}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono font-medium">
                      {formatCurrency(entry.total_amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEntry(entry);
                            setShowDetailsDialog(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEntry(entry);
                            setShowEditDialog(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(entry)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <JournalEntryDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        journalEntry={null} // We'll handle editing separately since we need to fetch the full data with IDs
        onSuccess={() => {
          fetchJournalEntries();
          setSelectedEntry(null);
        }}
      />

      <JournalEntryDetails
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        journalEntry={selectedEntry}
      />
    </div>
  );
};