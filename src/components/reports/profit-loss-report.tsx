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
import { Info } from "lucide-react"; // Import the Info icon

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

          <div className="space-y-4 mt-6 p-4 bg-muted/50 rounded-lg border border-muted">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              Understanding Your Profit & Loss
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Your **Profit & Loss Statement** is like a report card for your business, showing how much money you truly earned over a specific period.
              </p>
              <p>
                <span className="font-semibold text-foreground">Total Revenue:</span> This is all the money your business brought in from selling products or services. It's the starting point of your earnings.
              </p>
              <p>
                <span className="font-semibold text-foreground">Total Expenses:</span> This includes all the costs of running your business, from supplies to salaries. These are the funds that went out to keep things moving.
              </p>
              {/* Changed <p> to <div> to allow <ul> nesting */}
              <div>
                <span className="font-semibold text-foreground">Net Profit (or Loss):</span> This is the most important number! It's what's left after all your expenses are subtracted from your revenue.
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>If positive, your business is profitable – you earned more than you spent!</li>
                  <li>If negative, your business experienced a loss – you spent more than you earned.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}