import React from "react";
import StatusCard from "./StatusCard";
import { Card } from "@/components/ui/card";

interface ServiceOverviewProps {
  metrics?: {
    appointments: number;
    activeServices: number;
    inventoryAlerts: number;
    completionRate: number;
  };
}

const ServiceOverview = ({
  metrics = {
    appointments: 12,
    activeServices: 8,
    inventoryAlerts: 3,
    completionRate: 94,
  },
}: ServiceOverviewProps) => {
  return (
    <Card className="p-6 bg-gray-50 w-full h-[300px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Today's Appointments"
          value={metrics.appointments}
          trend="up"
          trendValue="+15%"
          status="success"
          description="Total service appointments scheduled for today"
        />

        <StatusCard
          title="Active Services"
          value={metrics.activeServices}
          trend="neutral"
          status={metrics.activeServices > 10 ? "warning" : "success"}
          description="Current vehicles being serviced"
        />

        <StatusCard
          title="Inventory Alerts"
          value={metrics.inventoryAlerts}
          trend="up"
          trendValue="+2"
          status={metrics.inventoryAlerts > 5 ? "error" : "warning"}
          description="Parts requiring immediate attention"
        />

        <StatusCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          trend="up"
          trendValue="+2%"
          status={metrics.completionRate >= 90 ? "success" : "warning"}
          description="Service completion rate for this week"
        />
      </div>
    </Card>
  );
};

export default ServiceOverview;
