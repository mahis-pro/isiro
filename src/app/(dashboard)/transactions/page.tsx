"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsTable from "@/components/transactions-table";
import { useTransactions } from "@/contexts/transactions-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

export default function TransactionsPage() {
  const { transactions } = useTransactions();

  const sales = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  const emptyStateAction = {
    label: "Add New Transaction",
    href: "/transactions/new",
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex flex-wrap items-center gap-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/transactions/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Transaction
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
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
                action={emptyStateAction}
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
                action={emptyStateAction}
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
                action={emptyStateAction}
              />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}