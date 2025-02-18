import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, ArrowDownRight, AlertCircle } from "lucide-react";

interface StatusCardProps {
  title?: string;
  value?: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  status?: "success" | "warning" | "error";
  description?: string;
}

const StatusCard = ({
  title = "Status Metric",
  value = "0",
  trend = "neutral",
  trendValue = "0%",
  status = "success",
  description = "Default status description",
}: StatusCardProps) => {
  const statusColors = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  const trendIcons = {
    up: <ArrowUpRight className="h-4 w-4 text-green-600" />,
    down: <ArrowDownRight className="h-4 w-4 text-red-600" />,
    neutral: null,
  };

  return (
    <Card className="w-[280px] h-[160px] bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500">
            {title}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">{value}</span>
            {trend !== "neutral" && (
              <div className="flex items-center space-x-1">
                {trendIcons[trend]}
                <span
                  className={`text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <Badge className={`${statusColors[status]} px-2 py-1`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
