"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { format, getMonth } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter"; // Import the hook

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--destructive))",
  },
};

export function ProfitLossReport() {
  const { transactions, isLoadingTransactions } = useTransactions();
  const { formatCurrency } = useCurrencyFormatter(); // Use the hook

  const { chartData, totalRevenue, totalExpenses, netProfit } = useMemo(() => {
    if (isLoadingTransactions || !transactions.length) {
      return { chartData: [], totalRevenue: 0, totalExpenses: 0, netProfit: 0 };
    }

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: format(new Date(0, i), "MMM"),
      revenue: 0,
      expenses: 0,
    }));

    let totalRevenue = 0;
    let totalExpenses = 0;

    transactions.forEach((t) => {
      const monthIndex = getMonth(new Date(t.date));
      if (t.type === "income") {
        monthlyData[monthIndex].revenue += t.amount;
        totalRevenue += t.amount;
      } else {
        const expenseAmount = Math.abs(t.amount);
        monthlyData[monthIndex].expenses += expenseAmount;
        totalExpenses += expenseAmount;
      }
    });

    const netProfit = totalRevenue - totalExpenses;

    const currentMonth = getMonth(new Date());
    const relevantMonths = monthlyData.slice(0, currentMonth + 1); // Show data up to current month

    return { chartData: relevantMonths, totalRevenue, totalExpenses, netProfit };
  }, [transactions, isLoadingTransactions]);

  if (isLoadingTransactions) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss Statement</CardTitle>
            <CardDescription>Revenue and expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[350px] w-full" />
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardContent className="p-4"><Skeleton className="h-8 w-3/4" /></CardContent></Card>
          <Card><CardContent className="p-4"><Skeleton className="h-8 w-3/4" /></CardContent></Card>
          <Card><CardContent className="p-4"><Skeleton className="h-8 w-3/4" /></CardContent></Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profit & Loss Statement</CardTitle>
          <CardDescription>Revenue and expenses over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(Number(value))} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-secondary/10 border-secondary">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {formatCurrency(netProfit)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}