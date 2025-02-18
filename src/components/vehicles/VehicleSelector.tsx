import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Search, Car, Info, Calendar, Tool, ChevronRight } from "lucide-react";

interface VehicleModel {
  id: string;
  name: string;
  class: string;
  year: number;
  engineTypes: string[];
  specifications: {
    engine: string;
    power: string;
    transmission: string;
    acceleration: string;
  };
  maintenanceSchedule: Array<{
    mileage: string;
    services: string[];
  }>;
}

const MERCEDES_MODELS: VehicleModel[] = [
  {
    id: "1",
    name: "C-Class Sedan",
    class: "Sedan",
    year: 2024,
    engineTypes: ["C300", "C300 4MATIC", "AMG C43", "AMG C63 S"],
    specifications: {
      engine: "2.0L Inline-4 Turbo",
      power: "255 hp @ 5,800 rpm",
      transmission: "9G-TRONIC 9-speed",
      acceleration: "0-60 mph in 5.9 sec",
    },
    maintenanceSchedule: [
      {
        mileage: "10,000 miles",
        services: ["Oil Change", "Tire Rotation", "Brake Inspection"],
      },
      {
        mileage: "20,000 miles",
        services: ["Full Inspection", "Filter Replacement", "Fluid Check"],
      },
    ],
  },
  {
    id: "2",
    name: "E-Class Sedan",
    class: "Sedan",
    year: 2024,
    engineTypes: ["E350", "E350 4MATIC", "AMG E53", "AMG E63 S"],
    specifications: {
      engine: "3.0L Inline-6 Turbo",
      power: "362 hp @ 5,500 rpm",
      transmission: "9G-TRONIC 9-speed",
      acceleration: "0-60 mph in 4.4 sec",
    },
    maintenanceSchedule: [
      {
        mileage: "10,000 miles",
        services: ["Oil Change", "Tire Rotation", "Brake Inspection"],
      },
      {
        mileage: "20,000 miles",
        services: ["Full Inspection", "Filter Replacement", "Fluid Check"],
      },
    ],
  },
  {
    id: "3",
    name: "GLE SUV",
    class: "SUV",
    year: 2024,
    engineTypes: ["GLE350", "GLE450 4MATIC", "AMG GLE53", "AMG GLE63 S"],
    specifications: {
      engine: "3.0L Inline-6 Turbo",
      power: "375 hp @ 5,500 rpm",
      transmission: "9G-TRONIC 9-speed",
      acceleration: "0-60 mph in 5.3 sec",
    },
    maintenanceSchedule: [
      {
        mileage: "10,000 miles",
        services: ["Oil Change", "Tire Rotation", "Brake Inspection"],
      },
      {
        mileage: "20,000 miles",
        services: ["Full Inspection", "Filter Replacement", "Fluid Check"],
      },
    ],
  },
];

interface VehicleSelectorProps {
  onSelect?: (vehicle: VehicleModel) => void;
}

export default function VehicleSelector({ onSelect }: VehicleSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(
    null,
  );

  const filteredModels = MERCEDES_MODELS.filter((model) => {
    const matchesSearch =
      searchQuery === "" ||
      model.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = !classFilter || model.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleVehicleClick = (vehicle: VehicleModel) => {
    setSelectedVehicle(vehicle);
    onSelect?.(vehicle);
  };

  return (
    <>
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Mercedes-Benz Vehicle Selector
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Mercedes-Benz models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Classes</SelectItem>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Coupe">Coupe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModels.map((model) => (
                <Card
                  key={model.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleVehicleClick(model)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {model.year}
                        </p>
                      </div>
                      <Badge variant="secondary">{model.class}</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">{model.specifications.engine}</p>
                      <div className="flex items-center gap-1">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {model.engineTypes.length} variants available
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedVehicle}
        onOpenChange={() => setSelectedVehicle(null)}
      >
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedVehicle?.name}</DialogTitle>
          </DialogHeader>

          {selectedVehicle && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Specifications</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedVehicle.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm text-muted-foreground capitalize">
                            {key}
                          </span>
                          <span className="text-sm font-medium">{value}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Available Engine Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVehicle.engineTypes.map((engine) => (
                      <Badge key={engine} variant="outline">
                        {engine}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Maintenance Schedule</h4>
                <div className="space-y-4">
                  {selectedVehicle.maintenanceSchedule.map(
                    (schedule, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {schedule.mileage}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="space-y-2">
                                {schedule.services.map(
                                  (service, serviceIndex) => (
                                    <div
                                      key={serviceIndex}
                                      className="flex items-center gap-2"
                                    >
                                      <Tool className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{service}</span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
