"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { useTransactions } from "@/contexts/transactions-context";
import { useLoans } from "@/contexts/loans-context";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function CashFlowReport() {
  const { transactions, isLoadingTransactions } = useTransactions();
  const { loans, isLoadingLoans } = useLoans();
  const { formatCurrency } = useCurrencyFormatter();

  const { cashFlowData, netCashFlow } = useMemo(() => {
    if (isLoadingTransactions || isLoadingLoans) {
      return { cashFlowData: [], netCashFlow: 0 };
    }

    // 1. Operating Activities (Net Income - Net Expense)
    const operatingCashFlow = transactions.reduce((sum, t) => sum + t.amount, 0);

    // 2. Financing Activities (Loan Disbursements - Repayments, simplified to just disbursements for now)
    // Note: We assume loan amounts are positive cash inflows upon disbursement.
    const financingCashFlow = loans
      .filter(l => l.status === 'Active') // Only consider active loans as current financing
      .reduce((sum, l) => sum + l.loan_amount, 0);

    // 3. Investing Activities (Kept at 0 for simplicity in a minimalist app)
    const investingCashFlow = 0;

    const data = [
      { category: "Operating Activities", value: operatingCashFlow, fill: "hsl(var(--primary))" },
      { category: "Financing Activities", value: financingCashFlow, fill: "hsl(var(--secondary))" },
      { category: "Investing Activities", value: investingCashFlow, fill: "hsl(var(--accent))" },
    ].filter(item => item.value !== 0); // Filter out zero values

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return { cashFlowData: data, netCashFlow: total };
  }, [transactions, loans, isLoadingTransactions, isLoadingLoans]);

  // Chart data uses absolute values for the pie chart visualization
  const chartData = cashFlowData.map(item => ({ ...item, value: Math.abs(item.value) }));

  if (isLoadingTransactions || isLoadingLoans) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Statement</CardTitle>
          <CardDescription>Money in and out of your business</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (cashFlowData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Statement</CardTitle>
          <CardDescription>Money in and out of your business</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-lg font-semibold">No Cash Flow Data</p>
            <p className="text-muted-foreground mt-2">Add transactions and loans to see your cash movements.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cashflow Statement</CardTitle>
        <CardDescription>Money in and out of your business</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full h-[250px] md:w-1/3">
          <ChartContainer config={{}} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel formatter={(value) => formatCurrency(value as number)} />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="category"
                  innerRadius={50}
                  outerRadius={80}
                  strokeWidth={5}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <div className="space-y-2">
            {cashFlowData.map((item) => (
              <div key={item.category} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <p className="text-muted-foreground">{item.category}</p>
                </div>
                <p className={item.value < 0 ? "text-destructive" : ""}>{formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between items-center font-bold">
            <p>Net Cashflow</p>
            <p className={netCashFlow < 0 ? "text-destructive" : ""}>{formatCurrency(netCashFlow)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}