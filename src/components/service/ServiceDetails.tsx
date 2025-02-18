import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Car, User, Clock, Receipt, FileText } from "lucide-react";

interface ServiceRecord {
  id: string;
  vehicleModel: string;
  customerName: string;
  serviceType: string;
  completedAt: string;
  technician: string;
  cost: number;
  status: "completed" | "warranty" | "follow-up";
  notes: string;
  partsUsed: Array<{
    name: string;
    quantity: number;
    cost: number;
  }>;
}

interface ServiceDetailsProps {
  record: ServiceRecord;
  open: boolean;
  onClose: () => void;
}

export default function ServiceDetails({
  record,
  open,
  onClose,
}: ServiceDetailsProps) {
  const getStatusBadge = (status: ServiceRecord["status"]) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      warranty: "bg-blue-100 text-blue-800",
      "follow-up": "bg-yellow-100 text-yellow-800",
    };
    return styles[status];
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Service Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Car className="h-4 w-4" />
                <span>Vehicle</span>
              </div>
              <p className="font-medium">{record.vehicleModel}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Customer</span>
              </div>
              <p className="font-medium">{record.customerName}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tools className="h-4 w-4" />
                <span>Service Type</span>
              </div>
              <p className="font-medium">{record.serviceType}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Completed</span>
              </div>
              <p className="font-medium">
                {format(new Date(record.completedAt), "PPP")}
              </p>
            </div>
          </div>

          <Separator />

          {/* Service Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge className={getStatusBadge(record.status)}>
                  {record.status.charAt(0).toUpperCase() +
                    record.status.slice(1)}
                </Badge>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-sm text-muted-foreground">Total Cost</div>
                <p className="text-lg font-bold">${record.cost.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Service Notes</span>
              </div>
              <p className="text-sm">{record.notes}</p>
            </div>
          </div>

          <Separator />

          {/* Parts Used */}
          <div className="space-y-4">
            <h4 className="font-medium">Parts Used</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {record.partsUsed.map((part, index) => (
                  <TableRow key={index}>
                    <TableCell>{part.name}</TableCell>
                    <TableCell>{part.quantity}</TableCell>
                    <TableCell>${part.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      ${(part.quantity * part.cost).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
