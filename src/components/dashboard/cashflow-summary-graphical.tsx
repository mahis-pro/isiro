"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTransactions } from "@/contexts/transactions-context";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { Skeleton } from "@/components/ui/skeleton";

export function CashflowSummaryGraphical() {
  const [timeRange, setTimeRange] = useState("monthly");
  const { transactions, isLoadingTransactions } = useTransactions();
  const { formatCurrency } = useCurrencyFormatter();

  const { totalInflow, totalOutflow, netCashFlow, periodDescription } = useMemo(() => {
    if (isLoadingTransactions || !transactions.length) {
      return { totalInflow: 0, totalOutflow: 0, netCashFlow: 0, periodDescription: "" };
    }

    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    let periodLabel: string;

    switch (timeRange) {
      case "daily":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6); // Last 7 days
        endDate = now;
        periodLabel = "last 7 days";
        break;
      case "weekly":
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1); // Last 3 months for weekly view
        endDate = now;
        periodLabel = "last few weeks";
        break;
      case "monthly":
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1); // Last 6 months
        endDate = endOfMonth(now);
        periodLabel = "last 6 months";
        break;
    }

    let currentInflow = 0;
    let currentOutflow = 0;

    transactions.forEach(t => {
      const transactionDate = new Date(t.date);
      if (transactionDate >= startDate && transactionDate <= endDate) {
        if (t.type === "income") {
          currentInflow += t.amount;
        } else {
          // Expenses are stored as negative numbers, use Math.abs for outflow
          currentOutflow += Math.abs(t.amount);
        }
      }
    });

    const currentNetCashFlow = currentInflow - currentOutflow;

    return {
      totalInflow: currentInflow,
      totalOutflow: currentOutflow,
      netCashFlow: currentNetCashFlow,
      periodDescription: periodLabel,
    };
  }, [transactions, timeRange, isLoadingTransactions]);

  const isPositive = netCashFlow >= 0;
  const arrowIcon = isPositive ? <ArrowUpRight className="h-6 w-6 text-primary" /> : <ArrowDownLeft className="h-6 w-6 text-destructive" />;
  const netCashFlowColor = isPositive ? "text-primary" : "text-destructive";

  if (isLoadingTransactions) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Snapshot</CardTitle>
          <CardDescription>Your money in and out</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
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
            <CardDescription>Your money in and out</CardDescription>
          </div>
          <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)} size="sm">
            <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
            <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          {arrowIcon}
          <div className="text-5xl font-bold font-poppins">
            <span className={netCashFlowColor}>{formatCurrency(Math.abs(netCashFlow))}</span>
          </div>
        </div>
        <p className="text-center text-muted-foreground text-sm">
          Your cash balance {isPositive ? "increased" : "decreased"} by{" "}
          <span className={cn("font-semibold", netCashFlowColor)}>
            {formatCurrency(Math.abs(netCashFlow))}
          </span>{" "}
          over the {periodDescription}.
        </p>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Money In</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(totalInflow)}</p>
          </div>
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Money Out</p>
            <p className="text-xl font-bold text-destructive">{formatCurrency(totalOutflow)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}