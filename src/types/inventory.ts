export interface Part {
  id: string;
  part_number: string;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
  model_compatibility: string[];
  unit_price: number;
  created_at: string;
  updated_at: string;
}

export interface InventoryLevel {
  id: string;
  part_id: string;
  quantity: number;
  min_threshold: number;
  max_threshold: number;
  location: string;
  last_restock_date: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryAlert {
  id: string;
  part_id: string;
  alert_type: "low_stock" | "overstock" | "expiring";
  status: "active" | "resolved";
  message: string;
  created_at: string;
  resolved_at?: string;
}

export interface PartCategory {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrder {
  id: string;
  supplier_id: string;
  status: "draft" | "pending" | "approved" | "received" | "cancelled";
  order_date: string;
  expected_delivery: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  part_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}
