import React, { useState } from "react";
import PartsCatalog from "./PartsCatalog";
import PartDetails from "./PartDetails";
import type { Part } from "@/types/inventory";

export default function PartsInventory() {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Parts Inventory</h1>
      </div>

      <PartsCatalog onPartSelect={setSelectedPart} />

      {selectedPart && (
        <PartDetails
          part={selectedPart}
          open={!!selectedPart}
          onClose={() => setSelectedPart(null)}
        />
      )}
    </div>
  );
}
