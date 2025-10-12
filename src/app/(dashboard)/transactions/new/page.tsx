"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IncomeForm } from "@/components/income-form";
import { ExpenseForm } from "@/components/expense-form";
import { LoanForm } from "@/components/loan-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function NewTransactionContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "income";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/transactions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transactions
          </Link>
        </Button>
      </div>
      <Tabs defaultValue={tab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="loan">Loan</TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Add Income</CardTitle>
              <CardDescription>
                Record a new sale or any other income.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IncomeForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expense">
          <Card>
            <CardHeader>
              <CardTitle>Add Expense</CardTitle>
              <CardDescription>
                Record a new business expense.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="loan">
          <Card>
            <CardHeader>
              <CardTitle>Add Loan</CardTitle>
              <CardDescription>
                Record a new loan taken for the business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoanForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function NewTransactionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewTransactionContent />
    </Suspense>
  );
}