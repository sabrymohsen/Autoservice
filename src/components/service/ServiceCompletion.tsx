import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

interface ServiceCompletionProps {
  open: boolean;
  onClose: () => void;
  onComplete: (data: ServiceCompletionData) => void;
  serviceDetails: {
    id: string;
    vehicleModel: string;
    customerName: string;
    serviceType: string;
  };
}

export interface ServiceCompletionData {
  serviceId: string;
  completionNotes: string;
  sendNotification: boolean;
  completedAt: string;
}

export default function ServiceCompletion({
  open,
  onClose,
  onComplete,
  serviceDetails,
}: ServiceCompletionProps) {
  const [completionNotes, setCompletionNotes] = React.useState("");
  const [sendNotification, setSendNotification] = React.useState(true);

  const handleComplete = () => {
    onComplete({
      serviceId: serviceDetails.id,
      completionNotes,
      sendNotification,
      completedAt: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Complete Service
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">{serviceDetails.vehicleModel}</h3>
            <p className="text-sm text-muted-foreground">
              Customer: {serviceDetails.customerName}
            </p>
            <p className="text-sm text-muted-foreground">
              Service: {serviceDetails.serviceType}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Completion Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter service completion notes..."
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              className="h-32"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="notify"
              checked={sendNotification}
              onCheckedChange={(checked) => setSendNotification(!!checked)}
            />
            <Label htmlFor="notify">
              Send completion notification to customer
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            Mark as Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
