import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, Shield, Activity } from "lucide-react";

interface AdminDashboardProps {
  stats?: {
    totalUsers: number;
    activeSessions: number;
    pendingApprovals: number;
    systemHealth: string;
  };
}

const AdminDashboard = ({
  stats = {
    totalUsers: 45,
    activeSessions: 12,
    pendingApprovals: 5,
    systemHealth: "Healthy",
  },
}: AdminDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Sessions
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSessions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{stats.systemHealth}</div>
              <Badge
                variant="secondary"
                className={
                  stats.systemHealth === "Healthy"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {stats.systemHealth}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {[
                  "User login from new IP",
                  "System backup completed",
                  "New user registration",
                  "Service bay configuration updated",
                  "Inventory threshold modified",
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span>{activity}</span>
                    <Badge variant="secondary">Just now</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {[
                  { name: "CPU Usage", value: "45%" },
                  { name: "Memory Usage", value: "60%" },
                  { name: "Disk Space", value: "75%" },
                  { name: "Network Load", value: "30%" },
                  { name: "Database Connections", value: "85/100" },
                ].map((metric, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span>{metric.name}</span>
                    <Badge>{metric.value}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
