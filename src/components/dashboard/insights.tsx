"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const insights = [
  "You spent 30% more on supplies this week.",
  "Your best day for sales was Wednesday.",
  "You’re ₦10,000 away from breaking even this month.",
];

interface InsightsProps {
  isLoading: boolean;
}

export function Insights({ isLoading }: InsightsProps) {
  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Insights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-start gap-4">
                <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Insights</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((text, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-start gap-4">
              <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}