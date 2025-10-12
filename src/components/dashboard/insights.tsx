import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const insights = [
  "You spent 30% more on supplies this week.",
  "Your best day for sales was Wednesday.",
  "You’re ₦10,000 away from breaking even this month.",
];

export function Insights() {
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