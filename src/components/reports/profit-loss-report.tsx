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
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { cn } from "@/lib/utils";

export function ProfitLossReport() {
  const { transactions, isLoadingTransactions } = useTransactions();
  const { formatCurrency } = useCurrencyFormatter();

  const { totalRevenue, totalExpenses, netProfit } = useMemo(() => {
    if (isLoadingTransactions || !transactions.length) {
      return { totalRevenue: 0, totalExpenses: 0, netProfit: 0 };
    }

    let currentTotalRevenue = 0;
    let currentTotalExpenses = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        currentTotalRevenue += t.amount;
      } else {
        currentTotalExpenses += Math.abs(t.amount);
      }
    });

    const currentNetProfit = currentTotalRevenue - currentTotalExpenses;

    return { totalRevenue: currentTotalRevenue, totalExpenses: currentTotalExpenses, netProfit: currentNetProfit };
  }, [transactions, isLoadingTransactions]);

  const isProfitable = netProfit >= 0;
  const totalMagnitude = totalRevenue + totalExpenses; // For calculating relative widths
  const revenuePercentage = totalMagnitude > 0 ? (totalRevenue / totalMagnitude) * 100 : 0;
  const expensesPercentage = totalMagnitude > 0 ? (totalExpenses / totalMagnitude) * 100 : 0;

  if (isLoadingTransactions) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss Statement</CardTitle>
            <CardDescription>Revenue and expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
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
          <CardDescription>Your business's financial report card.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative h-8 w-full rounded-lg overflow-hidden bg-muted">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${revenuePercentage}%` }}
            />
            <div
              className="absolute right-0 top-0 h-full bg-destructive transition-all duration-500 ease-out"
              style={{ width: `${expensesPercentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground">
              {totalRevenue > 0 && totalExpenses > 0 && (
                <span className="z-10">
                  {revenuePercentage.toFixed(0)}% Revenue / {expensesPercentage.toFixed(0)}% Expenses
                </span>
              )}
              {totalRevenue > 0 && totalExpenses === 0 && <span className="z-10">100% Revenue</span>}
              {totalRevenue === 0 && totalExpenses > 0 && <span className="z-10">100% Expenses</span>}
            </div>
          </div>

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
            <Card className={cn("border-2", isProfitable ? "bg-secondary/10 border-secondary" : "bg-destructive/10 border-destructive")}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", isProfitable ? "text-secondary" : "text-destructive")}>
                  {formatCurrency(netProfit)}
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Your **Net Profit** (or **Net Loss**) is the ultimate measure of your business's financial success over a period. It shows how much money your business truly earned after all sales are counted and all expenses are paid. A positive Net Profit means your business is profitable, while a negative number indicates a loss for the period.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}