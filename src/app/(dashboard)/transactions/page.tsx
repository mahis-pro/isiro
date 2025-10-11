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
import { NewTransactionDialog } from "@/components/new-transaction-dialog";

export default function TransactionsPage() {
  const { transactions } = useTransactions();

  return (
    <Tabs defaultValue="all">
      <div className="flex flex-wrap items-center gap-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <NewTransactionDialog />
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
            <TransactionsTable transactions={transactions} />
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
            <TransactionsTable
              transactions={transactions.filter((t) => t.type === "sale")}
            />
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
            <TransactionsTable
              transactions={transactions.filter((t) => t.type === "expense")}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}