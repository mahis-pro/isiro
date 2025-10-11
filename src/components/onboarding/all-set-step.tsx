"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Track your transactions",
    description: "Record every sale and expense in seconds",
  },
  {
    title: "Understand your finances",
    description: "See your cash flow at a glance with visual charts",
  },
  {
    title: "Grow your business",
    description: "Make informed decisions with detailed reports",
  },
];

export function AllSetStep() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold font-poppins">You're all set!</h1>
      <p className="mt-2 text-muted-foreground">
        Here's how ÌṢIRÒ helps you succeed
      </p>
      <div className="mt-8 space-y-4 text-left">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="flex items-center gap-4 p-4">
              <CheckCircle className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}