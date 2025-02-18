export interface VehicleModel {
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

export interface VehicleService {
  id: string;
  vehicleId: string;
  serviceName: string;
  description: string;
  estimatedDuration: string;
  estimatedCost: number;
  requiredParts: string[];
}
