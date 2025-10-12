"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTransactions } from "@/contexts/transactions-context";

const mockData = [
    { date: "Jan", inflow: 4000, outflow: 2400 },
    { date: "Feb", inflow: 3000, outflow: 1398 },
    { date: "Mar", inflow: 2000, outflow: 9800 },
    { date: "Apr", inflow: 2780, outflow: 3908 },
    { date: "May", inflow: 1890, outflow: 4800 },
    { date: "Jun", inflow: 2390, outflow: 3800 },
];

export function CashflowChart() {
  const [timeRange, setTimeRange] = useState("monthly");
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    // NOTE: Data processing logic for daily/weekly/monthly views will be added later.
    // Using mock data for now to build the UI.
    return mockData;
  }, [transactions, timeRange]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Cashflow Snapshot</CardTitle>
            <CardDescription>Inflow vs. Outflow</CardDescription>
          </div>
          <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)} size="sm">
            <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
            <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₦${Number(value) / 1000}k`} />
              <Tooltip cursor={false} content={<ChartTooltipContent formatter={(value) => `₦${Number(value).toLocaleString()}`} />} />
              <Bar dataKey="inflow" fill="hsl(var(--primary))" radius={4} />
              <Bar dataKey="outflow" fill="hsl(var(--destructive))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}