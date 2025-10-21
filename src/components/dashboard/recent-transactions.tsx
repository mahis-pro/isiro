"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { useLoans } from "@/contexts/loans-context";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state"; // Import EmptyState

export function RecentTransactions() {
  const { transactions, isLoadingTransactions } = useTransactions();
  const { loans, isLoadingLoans } = useLoans();
  const { formatCurrency } = useCurrencyFormatter();

  const recentActivity = useMemo(() => {
    const combined = [
      ...transactions.map(t => ({
        id: t.id,
        type: t.type,
        description: t.description,
        amount: t.amount,
        date: new Date(t.date),
      })),
      ...loans.map(l => ({
        id: l.id,
        type: 'loan' as const,
        description: `Loan from ${l.lender_name}`,
        amount: l.loan_amount,
        date: new Date(l.disbursement_date),
      })),
    ];

    return combined.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  }, [transactions, loans]);

  const ICONS = {
    income: <ArrowUpRight className="h-5 w-5 text-primary" />,
    expense: <ArrowDownLeft className="h-5 w-5 text-destructive" />,
    loan: <Banknote className="h-5 w-5 text-secondary" />,
  };

  if (isLoadingTransactions || isLoadingLoans) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your last 5 financial activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 py-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24 mt-1" />
                  </div>
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your last 5 financial activities.</CardDescription>
      </CardHeader>
      <CardContent>
        {recentActivity.length > 0 ? (
          <ul className="space-y-4">
            {recentActivity.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("rounded-full p-2 bg-muted")}>
                    {ICONS[item.type]}
                  </div>
                  <div>
                    <p className="font-medium truncate max-w-[150px] sm:max-w-xs">{item.description}</p>
                    <p className="text-sm text-muted-foreground">{item.date.toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={cn(
                  "font-semibold",
                  item.type === 'income' && "text-primary",
                  item.type === 'expense' && "text-destructive",
                  item.type === 'loan' && "text-secondary"
                )}>
                  {formatCurrency(Math.abs(item.amount))}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No Recent Activity"
            description="Add your first transaction or loan to see it here."
            action={{ label: "Add New Entry", href: "/transactions/new" }}
          />
        )}
      </CardContent>
    </Card>
  );
}