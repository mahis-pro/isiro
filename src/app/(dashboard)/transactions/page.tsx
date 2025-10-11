import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TransactionsTable from "@/components/transactions-table";
import type { Transaction } from "@/components/transactions-table";

// Mock data for now
const mockTransactions: Transaction[] = [
  {
    id: "txn_1",
    date: "2024-06-15",
    description: "Sale of Product A",
    amount: 150.0,
    type: "sale",
  },
  {
    id: "txn_2",
    date: "2024-06-14",
    description: "Office Supplies",
    amount: -45.5,
    type: "expense",
  },
  {
    id: "txn_3",
    date: "2024-06-14",
    description: "Client Payment - Project X",
    amount: 2500.0,
    type: "sale",
  },
  {
    id: "txn_4",
    date: "2024-06-13",
    description: "Software Subscription",
    amount: -29.99,
    type: "expense",
  },
  {
    id: "txn_5",
    date: "2024-06-12",
    description: "Consulting Fee",
    amount: 750.0,
    type: "sale",
  },
];

export default function TransactionsPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Transaction
            </span>
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
            <TransactionsTable transactions={mockTransactions} />
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
              transactions={mockTransactions.filter((t) => t.type === "sale")}
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
              transactions={mockTransactions.filter((t) => t.type === "expense")}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}