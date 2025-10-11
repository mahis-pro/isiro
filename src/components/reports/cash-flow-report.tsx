"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { Separator } from "@/components/ui/separator";

const cashFlowData = [
  { category: "Operating", value: 1200000, fill: "hsl(var(--primary))" },
  { category: "Investing", value: -300000, fill: "hsl(var(--accent))" },
  { category: "Financing", value: 500000, fill: "hsl(var(--secondary))" },
];

const chartData = cashFlowData.map(item => ({ ...item, value: Math.abs(item.value) }));
const netCashFlow = cashFlowData.reduce((sum, item) => sum + item.value, 0);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

export function CashFlowReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cashflow Statement</CardTitle>
        <CardDescription>Money in and out of your business</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8 items-center">
        <div className="w-full h-[250px]">
          <ChartContainer config={{}} className="w-full h-full">
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel formatter={(value) => formatCurrency(value as number)} />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            {cashFlowData.map((item) => (
              <div key={item.category} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <p className="text-muted-foreground">{item.category}</p>
                </div>
                <p className={item.value < 0 ? "text-destructive" : ""}>{formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between items-center font-bold">
            <p>Net Cashflow</p>
            <p>{formatCurrency(netCashFlow)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}