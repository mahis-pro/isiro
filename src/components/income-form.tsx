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
import { incomeSchema, IncomeFormValues } from "@/lib/schemas";
import { DatePicker } from "./date-picker";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { useAccounts } from "@/contexts/accounts-context";
import { CategorySelectWithAdd } from "./category-select-with-add";
import { AccountSelect } from "./account-select"; // Import new component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Keep Select for payment status

interface IncomeFormProps {
  initialValues?: Partial<IncomeFormValues>;
  onSubmit: (values: IncomeFormValues) => void;
  submitButtonText?: string;
}

export function IncomeForm({
  initialValues,
  onSubmit,
  submitButtonText = "Save Income",
}: IncomeFormProps) {
  const { userCurrency } = useCurrencyFormatter();
  const { incomeCategories, assetAccounts, isLoadingAccounts } = useAccounts(); // Get assetAccounts

  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      description: initialValues?.description || "",
      amount: initialValues?.amount || 0,
      date: initialValues?.date || new Date(),
      category: initialValues?.category || "",
      paymentMethod: initialValues?.paymentMethod || "",
      customer: initialValues?.customer || "",
      tax: initialValues?.tax || 0,
      paymentStatus: initialValues?.paymentStatus || "received",
      receipt: initialValues?.receipt,
    },
  });

  // Ensure default category/payment method is set if initialValues didn't provide one and accounts loaded later
  React.useEffect(() => {
    if (incomeCategories.length > 0 && !form.getValues('category')) {
      form.setValue('category', incomeCategories[0].account_name);
    }
    // FIX: Set default payment method only if it's currently empty and accounts are loaded
    if (assetAccounts.length > 0 && !form.getValues('paymentMethod')) {
      form.setValue('paymentMethod', assetAccounts[0].account_name);
    }
  }, [incomeCategories, assetAccounts, form, initialValues]);

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
                <Textarea placeholder="e.g., Sales of 10 bags of rice" {...field} />
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
              <FormLabel>Category (Revenue Account)</FormLabel>
              <FormControl>
                <CategorySelectWithAdd
                  categories={incomeCategories}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a category"
                  type="income"
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
              <FormLabel>Received Into (Asset Account)</FormLabel>
              <FormControl>
                <AccountSelect
                  accounts={assetAccounts}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select an asset account"
                  disabled={isLoadingAccounts}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter customer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 7.5" {...field} />
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
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="outstanding">Outstanding (A/R)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receipt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Receipt (Optional)</FormLabel>
              <FormControl>
                <Input type="file" />
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