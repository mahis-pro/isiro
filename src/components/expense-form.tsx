"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { expenseSchema, ExpenseFormValues } from "@/lib/schemas";
import { DatePicker } from "./date-picker";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { useAccounts } from "@/contexts/accounts-context";
import { CategorySelectWithAdd } from "./category-select-with-add"; // Import new component

const paymentMethods = ["Cash", "Bank Transfer", "POS", "Wallet"];

interface ExpenseFormProps {
  initialValues?: Partial<ExpenseFormValues>;
  onSubmit: (values: ExpenseFormValues) => void;
  submitButtonText?: string;
}

export function ExpenseForm({
  initialValues,
  onSubmit,
  submitButtonText = "Save Expense",
}: ExpenseFormProps) {
  const { userCurrency } = useCurrencyFormatter();
  const { expenseCategories, isLoadingAccounts } = useAccounts(); // Get loading state

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialValues || {
      description: "",
      amount: 0,
      date: new Date(),
      category: expenseCategories[0]?.account_name || "",
      paymentMethod: "",
      vendor: "",
      taxPaid: 0,
      notes: "",
      paymentStatus: "paid",
    },
  });

  // Ensure default category is set if initialValues didn't provide one and categories loaded later
  React.useEffect(() => {
    if (!initialValues?.category && expenseCategories.length > 0 && !form.getValues('category')) {
      form.setValue('category', expenseCategories[0].account_name);
    }
  }, [expenseCategories, form, initialValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ({userCurrency.toUpperCase()})</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Bought fuel for delivery bike" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelectWithAdd
                  categories={expenseCategories}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a category"
                  type="expense"
                  disabled={isLoadingAccounts}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Who was paid?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxPaid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Paid (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <DatePicker value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="due">Due</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="invoice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Invoice (Optional)</FormLabel>
              <FormControl>
                <Input type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Internal remarks..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">{submitButtonText}</Button>
      </form>
    </Form>
  );
}