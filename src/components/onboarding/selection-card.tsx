"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface SelectionCardProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export function SelectionCard({
  children,
  isSelected,
  onClick,
}: SelectionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-primary",
        isSelected && "border-primary ring-2 ring-primary/50"
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center gap-3 p-6 min-h-[120px]">
        {children}
      </CardContent>
    </Card>
  );
}