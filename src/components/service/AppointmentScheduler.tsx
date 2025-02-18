import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  format,
  addHours,
  isBefore,
  isAfter,
  setHours,
  setMinutes,
} from "date-fns";
import { CalendarClock, Car, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentSchedulerProps {
  selectedVehicle?: {
    id: string;
    name: string;
    model: string;
  };
  onScheduled?: (appointment: any) => void;
}

export default function AppointmentScheduler({
  selectedVehicle,
  onScheduled,
}: AppointmentSchedulerProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedService, setSelectedService] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Available service types
  const serviceTypes = [
    { id: "maintenance", name: "Regular Maintenance", duration: 120 },
    { id: "repair", name: "Repair Service", duration: 180 },
    { id: "inspection", name: "Vehicle Inspection", duration: 60 },
    { id: "diagnostic", name: "Diagnostic Check", duration: 90 },
  ];

  // Generate time slots between 8 AM and 5 PM
  const generateTimeSlots = async (date: Date) => {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 17;

    try {
      // Get existing appointments for the selected date
      const { data: existingAppointments } = await supabase
        .from("appointments")
        .select("*")
        .eq("date", format(date, "yyyy-MM-dd"));

      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
          const slotTime = setMinutes(setHours(date, hour), minute);

          // Check if slot conflicts with existing appointments
          const isConflict = existingAppointments?.some((appointment) => {
            const appointmentStart = new Date(appointment.startTime);
            const appointmentEnd = addHours(
              appointmentStart,
              appointment.duration / 60,
            );
            const slotEnd = addHours(slotTime, 1); // Assume 1-hour default slot

            return (
              (isBefore(slotTime, appointmentEnd) &&
                isAfter(slotTime, appointmentStart)) ||
              (isBefore(slotEnd, appointmentEnd) &&
                isAfter(slotEnd, appointmentStart))
            );
          });

          slots.push({
            time: timeString,
            available: !isConflict,
          });
        }
      }

      return slots;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return slots;
    }
  };

  const handleScheduleAppointment = async () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedService ||
      !selectedVehicle
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const serviceType = serviceTypes.find((s) => s.id === selectedService);
      const startTime = new Date(
        `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`,
      );

      // Validate business hours
      const hour = startTime.getHours();
      if (hour < 8 || hour >= 17) {
        throw new Error("Selected time is outside business hours");
      }

      // Check for conflicts
      const endTime = addHours(startTime, (serviceType?.duration || 60) / 60);
      const { data: conflicts } = await supabase
        .from("appointments")
        .select("*")
        .eq("date", format(selectedDate, "yyyy-MM-dd"));

      const hasConflict = conflicts?.some((appointment) => {
        const appointmentStart = new Date(appointment.startTime);
        const appointmentEnd = addHours(
          appointmentStart,
          appointment.duration / 60,
        );
        return (
          (isBefore(startTime, appointmentEnd) &&
            isAfter(startTime, appointmentStart)) ||
          (isBefore(endTime, appointmentEnd) &&
            isAfter(endTime, appointmentStart))
        );
      });

      if (hasConflict) {
        throw new Error("Selected time slot is no longer available");
      }

      // Create appointment
      const { data, error } = await supabase.from("appointments").insert([
        {
          vehicleId: selectedVehicle.id,
          serviceType: selectedService,
          startTime: startTime.toISOString(),
          duration: serviceType?.duration || 60,
          status: "scheduled",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Appointment Scheduled",
        description: `Your appointment has been scheduled for ${format(startTime, "PPP")} at ${format(startTime, "p")}`,
      });

      onScheduled?.(data);
    } catch (error: any) {
      toast({
        title: "Scheduling Failed",
        description: error.message || "Failed to schedule appointment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-[800px] mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Schedule Service Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {selectedVehicle && (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <Car className="h-5 w-5" />
              <span className="font-medium">{selectedVehicle.name}</span>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                onSelect={(date) => {
                  setSelectedDate(date);
                  if (date) {
                    generateTimeSlots(date).then(setTimeSlots);
                  }
                }}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    date < today || date.getDay() === 0 || date.getDay() === 6
                  );
                }}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} ({service.duration} min)
                      </SelectItem>
                    ))}
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem
                        key={slot.time}
                        value={slot.time}
                        disabled={!slot.available}
                      >
                        {slot.time}
                        {!slot.available && " (Unavailable)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                            {!slot.available && " (Unavailable)"}
                          </SelectItem>
                        )),
                      )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            onClick={handleScheduleAppointment}
            disabled={
              loading || !selectedDate || !selectedTime || !selectedService
            }
            className="w-full sm:w-auto"
          >
            {loading ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
