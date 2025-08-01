import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Edit, Clock, Calendar, MapPin, DollarSign, User, FileText } from "lucide-react";
import { format } from "date-fns";
import { WorkOrder } from "@/hooks/useWorkOrders";

interface WorkOrderDetailsProps {
  workOrderId: string;
  onClose: () => void;
}

export function WorkOrderDetails({ workOrderId, onClose }: WorkOrderDetailsProps) {
  // Mock data for now until we implement the actual hook
  const workOrder: WorkOrder = {
    id: workOrderId,
    tenant_id: "tenant-1",
    work_order_number: "WO-202501-0001",
    title: "Vehicle Maintenance - Oil Change",
    description: "Regular oil change for vehicle ABC-123. Include oil filter replacement and general inspection.",
    priority: "medium",
    status: "open",
    work_order_type: "maintenance",
    requested_by: "user-1",
    estimated_hours: 2,
    actual_hours: 0,
    estimated_cost: 150,
    actual_cost: 0,
    due_date: "2025-01-10",
    location: "Main Garage",
    notes: "Customer requested synthetic oil",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const isLoading = false;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'default';
      case 'in_progress': return 'secondary';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!workOrder) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Work Order Not Found</h3>
          <p>The selected work order could not be loaded.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Work Order Details</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Header Info */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-mono text-muted-foreground">
              {workOrder.work_order_number}
            </span>
            <Badge variant={getPriorityColor(workOrder.priority) as any}>
              {workOrder.priority}
            </Badge>
            <Badge variant={getStatusColor(workOrder.status) as any}>
              {workOrder.status.replace('_', ' ')}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold mb-2">{workOrder.title}</h3>
          {workOrder.description && (
            <p className="text-muted-foreground">{workOrder.description}</p>
          )}
        </div>

        <Separator />

        {/* Work Order Info */}
        <div className="space-y-4">
          <h4 className="font-medium">Work Order Information</h4>
          
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="capitalize">{workOrder.work_order_type}</span>
            </div>
            
            {workOrder.due_date && (
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due Date:
                </span>
                <span>{format(new Date(workOrder.due_date), 'MMM dd, yyyy')}</span>
              </div>
            )}

            {workOrder.location && (
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location:
                </span>
                <span>{workOrder.location}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span>{format(new Date(workOrder.created_at), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Time & Cost */}
        <div className="space-y-4">
          <h4 className="font-medium">Time & Cost</h4>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center text-muted-foreground mb-1">
                <Clock className="h-4 w-4 mr-1" />
                Estimated Hours
              </div>
              <div className="font-medium">{workOrder.estimated_hours || 0}h</div>
            </div>
            
            <div>
              <div className="flex items-center text-muted-foreground mb-1">
                <Clock className="h-4 w-4 mr-1" />
                Actual Hours
              </div>
              <div className="font-medium">{workOrder.actual_hours || 0}h</div>
            </div>
            
            <div>
              <div className="flex items-center text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4 mr-1" />
                Estimated Cost
              </div>
              <div className="font-medium">${workOrder.estimated_cost || 0}</div>
            </div>
            
            <div>
              <div className="flex items-center text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4 mr-1" />
                Actual Cost
              </div>
              <div className="font-medium">${workOrder.actual_cost || 0}</div>
            </div>
          </div>
        </div>

        {workOrder.notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground">{workOrder.notes}</p>
            </div>
          </>
        )}

        <Separator />

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Start Work
          </Button>
        </div>
      </div>
    </Card>
  );
}