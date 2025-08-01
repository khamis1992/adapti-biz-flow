import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, User, Calendar, MapPin, Wrench } from "lucide-react";
import { WorkOrder } from "@/hooks/useWorkOrders";
import { format } from "date-fns";

interface WorkOrdersListProps {
  workOrders: WorkOrder[];
  isLoading: boolean;
  onSelectWorkOrder: (id: string) => void;
  selectedWorkOrder: string | null;
  getPriorityColor: (priority: string) => string;
  getStatusColor: (status: string) => string;
}

export function WorkOrdersList({ 
  workOrders, 
  isLoading, 
  onSelectWorkOrder, 
  selectedWorkOrder,
  getPriorityColor,
  getStatusColor 
}: WorkOrdersListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-4" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (workOrders.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          <Wrench className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Work Orders Found</h3>
          <p>Get started by creating your first work order.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {workOrders.map((workOrder) => (
        <Card 
          key={workOrder.id} 
          className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
            selectedWorkOrder === workOrder.id ? 'border-primary bg-primary/5' : ''
          }`}
          onClick={() => onSelectWorkOrder(workOrder.id)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-sm">{workOrder.work_order_number}</h3>
                <Badge variant={getPriorityColor(workOrder.priority) as any}>
                  {workOrder.priority}
                </Badge>
                <Badge variant={getStatusColor(workOrder.status) as any}>
                  {workOrder.status.replace('_', ' ')}
                </Badge>
              </div>
              <h4 className="font-medium text-foreground mb-2">{workOrder.title}</h4>
              {workOrder.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {workOrder.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              {workOrder.due_date && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {format(new Date(workOrder.due_date), 'MMM dd')}</span>
                </div>
              )}
              
              {workOrder.estimated_hours && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{workOrder.estimated_hours}h est.</span>
                </div>
              )}

              {workOrder.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{workOrder.location}</span>
                </div>
              )}
            </div>

            <div className="text-xs">
              Created: {format(new Date(workOrder.created_at), 'MMM dd, yyyy')}
            </div>
          </div>

          {workOrder.estimated_cost && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Estimated Cost:</span>
                <span className="font-medium">${workOrder.estimated_cost}</span>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}