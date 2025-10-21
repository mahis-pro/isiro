"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsTable from "@/components/transactions-table";
import LoansTable from "@/components/loans-table";
import { useTransactions } from "@/contexts/transactions-context";
import { useLoans } from "@/contexts/loans-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

function TransactionsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";
  const { transactions, isLoadingTransactions } = useTransactions();
  const { loans, isLoadingLoans } = useLoans();

  const sales = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  const renderTableContent = (data: any[], type: "transactions" | "loans") => {
    const isLoading = type === "transactions" ? isLoadingTransactions : isLoadingLoans;
    const EmptyComponent = (
      <EmptyState
        title={`No ${type === "transactions" ? "Transactions" : "Loans"} Yet`}
        description={`Get started by adding your first ${type === "transactions" ? "sale or expense" : "loan"}.`}
        action={{ label: `Add New ${type === "transactions" ? "Entry" : "Loan"}`, href: "/transactions/new" }}
      />
    );

    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }

    if (data.length === 0) {
      return EmptyComponent;
    }

    return type === "transactions" ? (
      <TransactionsTable transactions={data} />
    ) : (
      <LoansTable loans={data} />
    );
  };

  return (
    <Tabs defaultValue={tab}>
      <div className="flex flex-wrap items-center gap-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/transactions/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Entry
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              A list of all your recent sales and expenses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderTableContent(transactions, "transactions")}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sales">
        <Card>
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <CardDescription>A list of all your recent sales.</CardDescription>
          </CardHeader>
          <CardContent>
            {renderTableContent(sales, "transactions")}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="expenses">
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>
              A list of all your recent expenses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderTableContent(expenses, "transactions")}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="loans">
        <Card>
          <CardHeader>
            <CardTitle>Loans</CardTitle>
            <CardDescription>
              A list of all your business loans.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderTableContent(loans, "loans")}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsContent />
    </Suspense>
  );
}