import React, { useState } from "react";
import Header from "./layout/Header";
import ServiceOverview from "./dashboard/ServiceOverview";
import ServiceCalendar from "./dashboard/ServiceCalendar";
import ServiceBayStatus from "./dashboard/ServiceBayStatus";
import ServiceHistory from "./service/ServiceHistory";
import ServiceDetails from "./service/ServiceDetails";
import PartsInventory from "./inventory/PartsInventory";
import VehicleSelector from "./vehicles/VehicleSelector";
import AppointmentScheduler from "./service/AppointmentScheduler";

interface HomeProps {
  userName?: string;
  userAvatar?: string;
  notifications?: number;
  isAdmin?: boolean;
  metrics?: {
    appointments: number;
    activeServices: number;
    inventoryAlerts: number;
    completionRate: number;
  };
}

const Home = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  notifications = 3,
  isAdmin = true,
  metrics = {
    appointments: 12,
    activeServices: 8,
    inventoryAlerts: 3,
    completionRate: 94,
  },
}: HomeProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedServiceRecord, setSelectedServiceRecord] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        userName={userName}
        userAvatar={userAvatar}
        notifications={notifications}
        isAdmin={isAdmin}
      />

      <main className="pt-20 px-6 pb-6">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Service Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Service Overview</h2>
            <ServiceOverview metrics={metrics} />
          </section>

          {/* Vehicle Selection Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Vehicle Selection</h2>
            <VehicleSelector onSelect={setSelectedVehicle} />
          </section>

          {/* Appointment Scheduling Section */}
          {selectedVehicle && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Schedule Service</h2>
              <AppointmentScheduler selectedVehicle={selectedVehicle} />
            </section>
          )}

          {/* Service Management Section */}
          <section className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Service Calendar</h2>
              <ServiceCalendar />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Service Bay Status</h2>
              <ServiceBayStatus />
            </div>
          </section>

          {/* Service History Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Service History</h2>
            <ServiceHistory onViewDetails={setSelectedServiceRecord} />
          </section>

          {/* Parts Inventory Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Parts Inventory</h2>
            <PartsInventory />
          </section>
        </div>
      </main>

      {/* Service Details Modal */}
      {selectedServiceRecord && (
        <ServiceDetails
          record={selectedServiceRecord}
          open={!!selectedServiceRecord}
          onClose={() => setSelectedServiceRecord(null)}
        />
      )}
    </div>
  );
};

export default Home;
