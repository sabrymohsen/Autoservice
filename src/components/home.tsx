import React from "react";
import Header from "./layout/Header";
import ServiceOverview from "./dashboard/ServiceOverview";
import ServiceCalendar from "./dashboard/ServiceCalendar";
import ServiceBayStatus from "./dashboard/ServiceBayStatus";

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
        </div>
      </main>
    </div>
  );
};

export default Home;
