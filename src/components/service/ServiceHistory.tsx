import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Search, Filter, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceRecord {
  id: string;
  vehicleModel: string;
  customerName: string;
  serviceType: string;
  completedAt: string;
  technician: string;
  cost: number;
  status: "completed" | "warranty" | "follow-up";
  notes: string;
  partsUsed: Array<{
    name: string;
    quantity: number;
    cost: number;
  }>;
}

interface ServiceHistoryProps {
  records?: ServiceRecord[];
  onViewDetails?: (record: ServiceRecord) => void;
}

export default function ServiceHistory({
  records = [
    {
      id: "1",
      vehicleModel: "Mercedes-Benz C-Class",
      customerName: "John Smith",
      serviceType: "Regular Maintenance",
      completedAt: "2024-03-15T10:30:00Z",
      technician: "Mike Johnson",
      cost: 450.0,
      status: "completed",
      notes: "Regular maintenance completed. All systems checked.",
      partsUsed: [
        { name: "Oil Filter", quantity: 1, cost: 25.0 },
        { name: "Engine Oil", quantity: 5, cost: 75.0 },
      ],
    },
    {
      id: "2",
      vehicleModel: "Mercedes-Benz GLE",
      customerName: "Alice Johnson",
      serviceType: "Brake Service",
      completedAt: "2024-03-14T15:45:00Z",
      technician: "David Wilson",
      cost: 850.0,
      status: "warranty",
      notes: "Brake pad replacement under warranty.",
      partsUsed: [
        { name: "Brake Pads", quantity: 4, cost: 200.0 },
        { name: "Brake Fluid", quantity: 1, cost: 45.0 },
      ],
    },
  ] as ServiceRecord[],
  onViewDetails = (record: ServiceRecord) =>
    console.log("View details:", record),
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<Date>();
  const [statusFilter, setStatusFilter] = useState<string>("");

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      searchQuery === "" ||
      record.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.serviceType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate =
      !dateFilter ||
      format(new Date(record.completedAt), "yyyy-MM-dd") ===
        format(dateFilter, "yyyy-MM-dd");

    const matchesStatus = !statusFilter || record.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  const getStatusBadge = (status: ServiceRecord["status"]) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      warranty: "bg-blue-100 text-blue-800",
      "follow-up": "bg-yellow-100 text-yellow-800",
    };
    return styles[status];
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Service History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by vehicle, customer, or service type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !dateFilter && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? (
                    format(dateFilter, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="warranty">Warranty</SelectItem>
                <SelectItem value="follow-up">Follow-up Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ScrollArea className="h-[600px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {format(new Date(record.completedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{record.vehicleModel}</TableCell>
                  <TableCell>{record.customerName}</TableCell>
                  <TableCell>{record.serviceType}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(record.status)}>
                      {record.status.charAt(0).toUpperCase() +
                        record.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>${record.cost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(record)}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
