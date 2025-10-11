"use client";

import { NewTransactionForm } from "@/components/new-transaction-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewTransactionPage() {
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
      <Card>
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>
            Add a new sale or expense to your records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewTransactionForm />
        </CardContent>
      </Card>
    </div>
  );
}