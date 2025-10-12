"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { useLoans } from "@/contexts/loans-context";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecentTransactions() {
  const { transactions } = useTransactions();
  const { loans } = useLoans();

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
        description: `Loan from ${l.lenderName}`,
        amount: l.loanAmount,
        date: new Date(l.disbursementDate),
      })),
    ];

    return combined.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  }, [transactions, loans]);

  const ICONS = {
    income: <ArrowUpRight className="h-5 w-5 text-primary" />,
    expense: <ArrowDownLeft className="h-5 w-5 text-destructive" />,
    loan: <Banknote className="h-5 w-5 text-secondary" />,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your last 5 financial activities.</CardDescription>
      </CardHeader>
      <CardContent>
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
                {`₦${Math.abs(item.amount).toLocaleString()}`}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}