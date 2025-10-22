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
      await updateTransaction(transaction.id, { ...values, type: "income", paymentMethod: values.paymentMethod, paymentStatus: values.paymentStatus });
      toast.success("Transaction updated successfully!");
      onOpenChange(false);
    } catch (error) {
      // Error handled in context
    }
  };

  const handleUpdateExpense = async (values: ExpenseFormValues) => {
    if (!transaction) return;
    try {
      await updateTransaction(transaction.id, { ...values, type: "expense", tax: values.taxPaid, paymentMethod: values.paymentMethod, paymentStatus: values.paymentStatus });
      toast.success("Transaction updated successfully!");
      onOpenChange(false);
    } catch (error) {
      // Error handled in context
    }
  };

  // Create separate initialValues objects for income and expense forms
  const incomeInitialValues: Partial<IncomeFormValues> | undefined = transaction?.type === "income" ? {
    amount: Math.abs(transaction.amount),
    description: transaction.description,
    category: transaction.category,
    paymentMethod: transaction.payment_method,
    customer: transaction.customer,
    tax: transaction.tax,
    date: new Date(transaction.date),
    paymentStatus: transaction.payment_status as "received" | "outstanding",
    receipt: undefined, // File inputs are typically not pre-filled
  } : undefined;

  const expenseInitialValues: Partial<ExpenseFormValues> | undefined = transaction?.type === "expense" ? {
    amount: Math.abs(transaction.amount),
    description: transaction.description,
    category: transaction.category,
    vendor: transaction.vendor,
    paymentMethod: transaction.payment_method,
    taxPaid: transaction.tax, // Mapped from transaction.tax
    date: new Date(transaction.date),
    paymentStatus: transaction.payment_status as "paid" | "due",
    invoice: undefined, // File inputs are typically not pre-filled
    notes: transaction.notes,
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
              initialValues={incomeInitialValues}
              onSubmit={handleUpdateIncome}
              submitButtonText="Save Changes"
            />
          )}
          {transaction?.type === "expense" && (
            <ExpenseForm
              initialValues={expenseInitialValues}
              onSubmit={handleUpdateExpense}
              submitButtonText="Save Changes"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}