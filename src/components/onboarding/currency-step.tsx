"use client";

import { SelectionCard } from "./selection-card";

const currencies = [
  { id: "ngn", label: "₦" },
  { id: "usd", label: "$" },
  { id: "gbp", label: "£" },
  { id: "eur", label: "€" },
];

interface CurrencyStepProps {
  value: string;
  onSelect: (value: string) => void;
}

export function CurrencyStep({ value, onSelect }: CurrencyStepProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold font-poppins">Choose your currency</h1>
      <p className="mt-2 text-muted-foreground">
        Select your primary business currency
      </p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {currencies.map((currency) => (
          <SelectionCard
            key={currency.id}
            isSelected={value === currency.id}
            onClick={() => onSelect(currency.id)}
          >
            <span className="text-3xl font-bold text-foreground">{currency.label}</span>
          </SelectionCard>
        ))}
      </div>
    </div>
  );
}