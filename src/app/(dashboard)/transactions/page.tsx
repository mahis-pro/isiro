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

function TransactionsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";
  const { transactions } = useTransactions();
  const { loans } = useLoans();

  const sales = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

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
            {transactions.length > 0 ? (
              <TransactionsTable transactions={transactions} />
            ) : (
              <EmptyState
                title="No Transactions Yet"
                description="Get started by adding your first sale or expense."
                action={{ label: "Add New Entry", href: "/transactions/new" }}
              />
            )}
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
            {sales.length > 0 ? (
              <TransactionsTable transactions={sales} />
            ) : (
              <EmptyState
                title="No Sales Recorded"
                description="Your sales will appear here once you add them."
                action={{ label: "Add New Sale", href: "/transactions/new?tab=income" }}
              />
            )}
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
            {expenses.length > 0 ? (
              <TransactionsTable transactions={expenses} />
            ) : (
              <EmptyState
                title="No Expenses Recorded"
                description="Your expenses will appear here once you add them."
                action={{ label: "Add New Expense", href: "/transactions/new?tab=expense" }}
              />
            )}
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
            {loans.length > 0 ? (
              <LoansTable loans={loans} />
            ) : (
              <EmptyState
                title="No Loans Recorded"
                description="Your loans will appear here once you add them."
                action={{ label: "Add New Loan", href: "/transactions/new?tab=loan" }}
              />
            )}
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