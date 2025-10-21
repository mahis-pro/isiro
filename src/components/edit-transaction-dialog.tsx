"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction, useTransactions } from "@/contexts/transactions-context";
import { IncomeForm } from "./income-form";
import { ExpenseForm } from "./expense-form";
import { IncomeFormValues, ExpenseFormValues } from "@/lib/schemas";
import { toast } from "sonner";

interface EditTransactionDialogProps {
  transaction: Transaction | null;
  onOpenChange: (open: boolean) => void;
}

export function EditTransactionDialog({ transaction, onOpenChange }: EditTransactionDialogProps) {
  const { updateTransaction } = useTransactions();

  const handleUpdateIncome = async (values: IncomeFormValues) => {
    if (!transaction) return;
    try {
      await updateTransaction(transaction.id, { ...values, type: "income", paymentMethod: values.paymentMethod });
      toast.success("Transaction updated successfully!");
      onOpenChange(false);
    } catch (error) {
      // Error handled in context
    }
  };

  const handleUpdateExpense = async (values: ExpenseFormValues) => {
    if (!transaction) return;
    try {
      await updateTransaction(transaction.id, { ...values, type: "expense", tax: values.taxDeducted, paymentMethod: values.paymentMethod });
      toast.success("Transaction updated successfully!");
      onOpenChange(false);
    } catch (error) {
      // Error handled in context
    }
  };

  const initialValues = transaction ? {
    ...transaction,
    amount: Math.abs(transaction.amount),
    date: new Date(transaction.date),
    taxDeducted: transaction.tax,
    paymentMethod: transaction.payment_method, // Map payment_method to paymentMethod
  } : undefined;

  return (
    <Dialog open={!!transaction} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Make changes to your transaction here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          {transaction?.type === "income" && (
            <IncomeForm
              initialValues={initialValues}
              onSubmit={handleUpdateIncome}
              submitButtonText="Save Changes"
            />
          )}
          {transaction?.type === "expense" && (
            <ExpenseForm
              initialValues={initialValues}
              onSubmit={handleUpdateExpense}
              submitButtonText="Save Changes"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}