"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { useLoans } from "@/contexts/loans-context";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function BalanceSheetReport() {
  const { transactions, isLoadingTransactions } = useTransactions();
  const { loans, isLoadingLoans } = useLoans();
  const { formatCurrency } = useCurrencyFormatter();

  const { totalAssets, totalLiabilities, assets, liabilities, totalEquity } = useMemo(() => {
    if (isLoadingTransactions || isLoadingLoans) {
      return { totalAssets: 0, totalLiabilities: 0, assets: [], liabilities: [], totalEquity: 0 };
    }

    // 1. Calculate Cash/Bank (Net Balance)
    const netCash = transactions.reduce((sum, t) => sum + t.amount, 0);

    // 2. Calculate Accounts Receivable (Outstanding Income)
    const accountsReceivable = transactions
      .filter(t => t.type === 'income' && t.payment_status === 'outstanding')
      .reduce((sum, t) => sum + t.amount, 0);

    // 3. Calculate Accounts Payable (Due Expenses)
    const accountsPayable = transactions
      .filter(t => t.type === 'expense' && t.payment_status === 'due')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // 4. Calculate Total Active Loans
    const activeLoans = loans
      .filter(l => l.status === 'Active')
      .reduce((sum, l) => sum + l.loan_amount, 0);

    // --- Assemble Report Data ---

    const currentAssets = [
      { item: "Cash & Bank", amount: netCash },
      { item: "Accounts Receivable", amount: accountsReceivable },
    ].filter(a => a.amount !== 0);

    const currentLiabilities = [
      { item: "Accounts Payable", amount: accountsPayable },
      { item: "Loans Payable", amount: activeLoans },
    ].filter(l => l.amount !== 0);

    const calculatedTotalAssets = currentAssets.reduce((sum, asset) => sum + asset.amount, 0);
    const calculatedTotalLiabilities = currentLiabilities.reduce((sum, liability) => sum + liability.amount, 0);
    const calculatedTotalEquity = calculatedTotalAssets - calculatedTotalLiabilities;

    return {
      totalAssets: calculatedTotalAssets,
      totalLiabilities: calculatedTotalLiabilities,
      assets: currentAssets,
      liabilities: currentLiabilities,
      totalEquity: calculatedTotalEquity,
    };
  }, [transactions, loans, isLoadingTransactions, isLoadingLoans]);

  if (isLoadingTransactions || isLoadingLoans) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance Sheet</CardTitle>
          <CardDescription>Assets, Liabilities, and Equity overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[100px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Handle empty state if no data exists
  if (totalAssets === 0 && totalLiabilities === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance Sheet</CardTitle>
          <CardDescription>Assets, Liabilities, and Equity overview</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-lg font-semibold">No Balance Sheet Data</p>
            <p className="text-muted-foreground mt-2">Add transactions and loans to see your current financial position.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Sheet</CardTitle>
        <CardDescription>Assets, Liabilities, and Equity overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Assets */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Assets</h3>
            <div className="space-y-2">
              {assets.length > 0 ? assets.map((asset) => (
                <div key={asset.item} className="flex justify-between items-center py-1 border-b">
                  <p className="text-muted-foreground">{asset.item}</p>
                  <p className={asset.amount < 0 ? "text-destructive" : ""}>{formatCurrency(asset.amount)}</p>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No recorded assets.</p>
              )}
            </div>
            <div className="flex justify-between items-center font-bold pt-2">
              <p>Total Assets</p>
              <p>{formatCurrency(totalAssets)}</p>
            </div>
          </div>

          {/* Liabilities */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liabilities</h3>
            <div className="space-y-2">
              {liabilities.length > 0 ? liabilities.map((liability) => (
                <div key={liability.item} className="flex justify-between items-center py-1 border-b">
                  <p className="text-muted-foreground">{liability.item}</p>
                  <p>{formatCurrency(liability.amount)}</p>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No recorded liabilities.</p>
              )}
            </div>
            <div className="flex justify-between items-center font-bold pt-2">
              <p>Total Liabilities</p>
              <p>{formatCurrency(totalLiabilities)}</p>
            </div>
          </div>
        </div>

        {/* Total Equity */}
        <div className={cn(
          "border-2 rounded-lg p-4 flex items-center justify-between",
          totalEquity >= 0 ? "bg-primary/10 border-primary/20" : "bg-destructive/10 border-destructive/20"
        )}>
          <div className="flex items-center gap-4">
            <div className={cn("p-2 rounded-full", totalEquity >= 0 ? "bg-primary/20" : "bg-destructive/20")}>
              <FileText className={cn("h-6 w-6", totalEquity >= 0 ? "text-primary" : "text-destructive")} />
            </div>
            <div>
              <p className={cn("text-sm font-semibold", totalEquity >= 0 ? "text-primary" : "text-destructive")}>Total Equity</p>
              <p className={cn("text-2xl font-bold", totalEquity >= 0 ? "text-primary" : "text-destructive")}>{formatCurrency(totalEquity)}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Assets - Liabilities</p>
        </div>
      </CardContent>
    </Card>
  );
}