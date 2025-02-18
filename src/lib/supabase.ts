import { createClient } from "@supabase/supabase-js";

// Mock database for development
const mockDb = {
  appointments: [] as any[],
  parts: [
    {
      id: "1",
      part_number: "MOCK-001",
      name: "Mock Part",
      description: "Mock Description",
      category: "Mock Category",
      manufacturer: "Mock Manufacturer",
      model_compatibility: ["Model A", "Model B"],
      unit_price: 99.99,
      quantity: 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

// Mock Supabase client for development
const mockSupabase = {
  from: (table: string) => ({
    select: (query: string = "*") => ({
      order: (column: string) => ({
        or: (filters: string) => ({
          eq: (column: string, value: any) =>
            Promise.resolve({
              data: mockDb[table].filter((item: any) =>
                Object.entries(item).some(([key, val]) =>
                  String(val)
                    .toLowerCase()
                    .includes(String(value).toLowerCase()),
                ),
              ),
              error: null,
            }),
        }),
        eq: (column: string, value: any) =>
          Promise.resolve({
            data: mockDb[table].filter((item: any) => item[column] === value),
            error: null,
          }),
      }),
      eq: (column: string, value: any) =>
        Promise.resolve({
          data: mockDb[table].filter((item: any) => item[column] === value),
          error: null,
        }),
    }),
    insert: (items: any[]) => {
      const newItems = items.map((item) => ({
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        ...item,
      }));
      mockDb[table].push(...newItems);
      return Promise.resolve({ data: newItems, error: null });
    },
  }),
};

// Use mock client for development
export const supabase = mockSupabase as any;
