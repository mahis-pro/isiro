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
import { incomeSchema, IncomeFormValues } from "@/lib/schemas";
import { DatePicker } from "./date-picker";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { useAccounts } from "@/contexts/accounts-context";
import { CategorySelectWithAdd } from "./category-select-with-add"; // Import new component

const paymentMethods = ["Cash", "Bank Transfer", "POS", "Wallet"];

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
  const { incomeCategories, isLoadingAccounts } = useAccounts(); // Get loading state

  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: initialValues || {
      description: "",
      amount: 0,
      date: new Date(),
      category: incomeCategories[0]?.account_name || "",
      paymentMethod: "",
      customer: "",
      tax: 0,
      paymentStatus: "received",
    },
  });

  // Ensure default category is set if initialValues didn't provide one and categories loaded later
  React.useEffect(() => {
    if (!initialValues?.category && incomeCategories.length > 0 && !form.getValues('category')) {
      form.setValue('category', incomeCategories[0].account_name);
    }
  }, [incomeCategories, form, initialValues]);

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
              <FormLabel>Category</FormLabel>
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
                  <SelectItem value="outstanding">Outstanding</SelectItem>
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