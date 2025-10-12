"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { useMemo } from "react";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { CashflowChart } from "@/components/dashboard/cashflow-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Insights } from "@/components/dashboard/insights";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
};

export default function DashboardPage() {
  const { transactions } = useTransactions();

  const summary = useMemo(() => {
    const totalSales = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const balance = totalSales - totalExpenses;

    return { totalSales, totalExpenses, balance };
  }, [transactions]);

  return (
    <div className="space-y-8">
      {/* 1. Summary Bar */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Sales"
          value={formatCurrency(summary.totalSales)}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend="+20.1% from last month"
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(summary.totalExpenses)}
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
          trend="+15.3% from last month"
        />
        <SummaryCard
          title="Balance"
          value={formatCurrency(summary.balance)}
          icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
          className={summary.balance >= 0 ? "bg-primary/10 border-primary" : "bg-destructive/10 border-destructive"}
        />
      </div>

      {/* 2. Quick Actions */}
      <QuickActions />

      {/* 3. Cashflow Snapshot */}
      <CashflowChart />

      {/* 4. Recent Transactions */}
      <RecentTransactions />

      {/* 5. Insights */}
      <Insights />
    </div>
  );
}