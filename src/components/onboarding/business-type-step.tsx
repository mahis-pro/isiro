"use client";

import {
  Store,
  Wrench,
  ShoppingBag,
  Briefcase,
} from "lucide-react";
import { SelectionCard } from "./selection-card";

const businessTypes = [
  { id: "vendor", label: "Vendor", icon: <Store className="h-8 w-8" /> },
  { id: "artisan", label: "Artisan", icon: <Wrench className="h-8 w-8" /> },
  { id: "retail", label: "Retail", icon: <ShoppingBag className="h-8 w-8" /> },
  { id: "other", label: "Other", icon: <Briefcase className="h-8 w-8" /> },
];

interface BusinessTypeStepProps {
  value: string;
  onSelect: (value: string) => void;
}

export function BusinessTypeStep({ value, onSelect }: BusinessTypeStepProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold font-poppins">
        What type of business do you run?
      </h1>
      <p className="mt-2 text-muted-foreground">
        Help us customize your experience
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {businessTypes.map((type) => (
          <SelectionCard
            key={type.id}
            isSelected={value === type.id}
            onClick={() => onSelect(type.id)}
          >
            <div className="text-primary">{type.icon}</div>
            <span className="font-medium">{type.label}</span>
          </SelectionCard>
        ))}
      </div>
    </div>
  );
}