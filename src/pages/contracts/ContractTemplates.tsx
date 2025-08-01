import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Copy, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  description: string;
  type: string;
  defaultRate: number;
  defaultTerms: string;
  isActive: boolean;
}

export default function ContractTemplates() {
  const navigate = useNavigate();
  const [templates] = useState<Template[]>([
    {
      id: '1',
      name: 'Standard Daily Rental',
      description: 'Default template for daily car rentals',
      type: 'daily',
      defaultRate: 50,
      defaultTerms: 'Standard terms for daily rental agreements including insurance, fuel policy, and return conditions.',
      isActive: true,
    },
    {
      id: '2',
      name: 'Monthly Corporate',
      description: 'Template for monthly corporate rentals',
      type: 'monthly',
      defaultRate: 800,
      defaultTerms: 'Corporate rental agreement with extended terms, volume discounts, and business insurance coverage.',
      isActive: true,
    },
    {
      id: '3',
      name: 'Weekly Tourism',
      description: 'Template for weekly tourist rentals',
      type: 'weekly',
      defaultRate: 300,
      defaultTerms: 'Tourist-friendly rental agreement with GPS, international license acceptance, and tourism insurance.',
      isActive: false,
    },
  ]);

  const getTypeBadge = (type: string) => {
    const colors = {
      daily: 'bg-blue-500',
      weekly: 'bg-green-500',
      monthly: 'bg-purple-500',
      yearly: 'bg-orange-500',
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-500'}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contract Templates</h1>
          <p className="text-muted-foreground">Manage reusable contract templates</p>
        </div>
        <Button onClick={() => navigate('/contracts/templates/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeBadge(template.type)}
                    <Badge variant={template.isActive ? 'default' : 'secondary'}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Default Rate:</span>
                  <span className="font-semibold">${template.defaultRate}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Default Terms:</p>
                <p className="text-xs bg-muted p-2 rounded text-ellipsis overflow-hidden">
                  {template.defaultTerms.substring(0, 100)}...
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first contract template to streamline your rental process.
          </p>
          <Button onClick={() => navigate('/contracts/templates/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}
    </div>
  );
}