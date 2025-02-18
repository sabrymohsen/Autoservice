import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, Wrench, User } from "lucide-react";

interface Appointment {
  id: string;
  time: string;
  customerName: string;
  serviceType: string;
  status: "scheduled" | "in-progress" | "completed";
}

interface ServiceCalendarProps {
  appointments?: Appointment[];
  selectedDate?: Date;
  onDateSelect?: (date: Date | undefined) => void;
}

const ServiceCalendar = ({
  appointments = [
    {
      id: "1",
      time: "09:00 AM",
      customerName: "John Smith",
      serviceType: "Regular Maintenance",
      status: "scheduled",
    },
    {
      id: "2",
      time: "11:30 AM",
      customerName: "Alice Johnson",
      serviceType: "Brake Inspection",
      status: "in-progress",
    },
    {
      id: "3",
      time: "02:00 PM",
      customerName: "Bob Wilson",
      serviceType: "Oil Change",
      status: "completed",
    },
  ],
  selectedDate = new Date(),
  onDateSelect = () => {},
}: ServiceCalendarProps) => {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <Card className="w-full max-w-[800px] h-[500px] bg-white overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Service Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 h-[calc(100%-5rem)]">
        <div className="w-1/2 border-r pr-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border"
          />
        </div>
        <div className="w-1/2 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Appointments</h3>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                  <Badge className={statusColors[appointment.status]}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-left">
                          <span className="truncate block max-w-[200px]">
                            {appointment.customerName}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{appointment.customerName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {appointment.serviceType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCalendar;
