import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, Wrench, CheckCircle2 } from "lucide-react";

interface ServiceBayItem {
  id: string;
  vehicleModel: string;
  serviceType: string;
  startTime: string;
  estimatedCompletion: string;
  status: "in-progress" | "completed" | "waiting";
  bayNumber: number;
}

interface ServiceBayStatusProps {
  services?: ServiceBayItem[];
}

const ServiceBayStatus = ({
  services = [
    {
      id: "1",
      vehicleModel: "Mercedes-Benz C-Class",
      serviceType: "Regular Maintenance",
      startTime: "09:00 AM",
      estimatedCompletion: "11:30 AM",
      status: "in-progress",
      bayNumber: 1,
    },
    {
      id: "2",
      vehicleModel: "Mercedes-Benz GLE",
      serviceType: "Brake Service",
      startTime: "10:15 AM",
      estimatedCompletion: "12:45 PM",
      status: "waiting",
      bayNumber: 2,
    },
    {
      id: "3",
      vehicleModel: "Mercedes-Benz E-Class",
      serviceType: "Oil Change",
      startTime: "08:30 AM",
      estimatedCompletion: "09:30 AM",
      status: "completed",
      bayNumber: 3,
    },
  ],
}: ServiceBayStatusProps) => {
  const getStatusColor = (status: ServiceBayItem["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: ServiceBayItem["status"]) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card className="w-[360px] h-[500px] bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Service Bay Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id}>
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{service.vehicleModel}</h3>
                      <p className="text-sm text-gray-600">
                        {service.serviceType}
                      </p>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {getStatusText(service.status)}
                    </Badge>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Started: {service.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>ETA: {service.estimatedCompletion}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Bay #{service.bayNumber}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ServiceBayStatus;
