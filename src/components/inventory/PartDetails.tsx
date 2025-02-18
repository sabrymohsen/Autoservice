import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Part } from "@/types/inventory";

interface PartDetailsProps {
  part: Part;
  open: boolean;
  onClose: () => void;
}

export default function PartDetails({ part, open, onClose }: PartDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Part Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{part.name}</h3>
            <p className="text-sm text-muted-foreground">{part.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Part Number</p>
              <p className="text-sm text-muted-foreground">
                {part.part_number}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Category</p>
              <Badge variant="secondary">{part.category}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Manufacturer</p>
              <p className="text-sm text-muted-foreground">
                {part.manufacturer}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Unit Price</p>
              <p className="text-sm text-muted-foreground">
                ${part.unit_price.toFixed(2)}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">Compatible Models</p>
            <div className="flex flex-wrap gap-2">
              {part.model_compatibility.map((model) => (
                <Badge key={model} variant="outline">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
