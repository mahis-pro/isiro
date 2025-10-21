"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTransactions } from "@/contexts/transactions-context";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, getMonth, getDate, getWeek } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

export function CashflowChart() {
  const [timeRange, setTimeRange] = useState("monthly");
  const { transactions, isLoadingTransactions } = useTransactions();

  const chartData = useMemo(() => {
    if (isLoadingTransactions || !transactions.length) return [];

    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    let interval: Date[];
    let dateFormat: string;
    let groupBy: (date: Date) => string;

    switch (timeRange) {
      case "daily":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6); // Last 7 days
        endDate = now;
        interval = eachDayOfInterval({ start: startDate, end: endDate });
        dateFormat = "EEE"; // Mon, Tue
        groupBy = (date) => format(date, "yyyy-MM-dd");
        break;
      case "weekly":
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1); // Last 3 months
        endDate = now;
        interval = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 }); // Monday start
        dateFormat = "MMM dd"; // Jan 01
        groupBy = (date) => format(date, "yyyy-MM-ww");
        break;
      case "monthly":
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1); // Last 6 months
        endDate = endOfMonth(now);
        interval = eachMonthOfInterval({ start: startDate, end: endDate });
        dateFormat = "MMM"; // Jan, Feb
        groupBy = (date) => format(date, "yyyy-MM");
        break;
    }

    const aggregatedData: { [key: string]: { inflow: number; outflow: number } } = {};

    interval.forEach(date => {
      const key = groupBy(date);
      aggregatedData[key] = { inflow: 0, outflow: 0 };
    });

    transactions.forEach(t => {
      const transactionDate = new Date(t.date);
      if (transactionDate >= startDate && transactionDate <= endDate) {
        const key = groupBy(transactionDate);
        if (!aggregatedData[key]) {
          aggregatedData[key] = { inflow: 0, outflow: 0 };
        }
        if (t.type === "income") {
          aggregatedData[key].inflow += t.amount;
        } else {
          aggregatedData[key].outflow += Math.abs(t.amount);
        }
      }
    });

    return interval.map(date => ({
      date: format(date, dateFormat),
      inflow: aggregatedData[groupBy(date)]?.inflow || 0,
      outflow: aggregatedData[groupBy(date)]?.outflow || 0,
    }));
  }, [transactions, timeRange, isLoadingTransactions]);

  if (isLoadingTransactions) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Snapshot</CardTitle>
          <CardDescription>Inflow vs. Outflow</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    );
  }

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
              <Tooltip cursor={false} content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
              <Bar dataKey="inflow" fill="hsl(var(--primary))" radius={4} />
              <Bar dataKey="outflow" fill="hsl(var(--destructive))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}