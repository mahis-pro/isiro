"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { useLoans } from "@/contexts/loans-context";
import { useMemo } from "react";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Insights } from "@/components/dashboard/insights";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { CashflowSummaryGraphical } from "@/components/dashboard/cashflow-summary-graphical"; // Import the new component

export default function DashboardPage() {
  const { transactions, isLoadingTransactions } = useTransactions();
  const { loans, isLoadingLoans } = useLoans();
  const { formatCurrency } = useCurrencyFormatter();

  const summary = useMemo(() => {
    if (isLoadingTransactions) {
      return { totalSales: 0, totalExpenses: 0, balance: 0 };
    }

    const totalSales = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const balance = totalSales - totalExpenses;

    return { totalSales, totalExpenses, balance };
  }, [transactions, isLoadingTransactions]);

  const isLoadingDashboard = isLoadingTransactions || isLoadingLoans;

  return (
    <div className="space-y-8">
      {/* 1. Summary Bar */}
      <div className="grid gap-4 md:grid-cols-3">
        {isLoadingDashboard ? (
          <>
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </>
        ) : (
          <>
            <SummaryCard
              title="Total Sales"
              value={formatCurrency(summary.totalSales)}
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              trend="+20.1% from last month" // Placeholder trend, can be made dynamic later
            />
            <SummaryCard
              title="Total Expenses"
              value={formatCurrency(summary.totalExpenses)}
              icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
              trend="+15.3% from last month" // Placeholder trend, can be made dynamic later
            />
            <SummaryCard
              title="Balance"
              value={formatCurrency(summary.balance)}
              icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
              className={summary.balance >= 0 ? "bg-primary/10 border-primary" : "bg-destructive/10 border-destructive"}
              isBalanceCard={true} // Mark as balance card
            />
          </>
        )}
      </div>

      {/* 2. Quick Actions */}
      <QuickActions />

      {/* 3. Cashflow Snapshot and Recent Transactions (side-by-side on larger screens) */}
      <div className="grid gap-8 lg:grid-cols-2">
        <CashflowSummaryGraphical /> {/* Replaced CashflowChart */}
        <RecentTransactions />
      </div>

      {/* 4. Insights */}
      <Insights isLoading={isLoadingDashboard} />
    </div>
  );
}