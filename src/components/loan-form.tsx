"use client";

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
import { loanSchema, LoanFormValues } from "@/lib/schemas";
import { DatePicker } from "./date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter"; // Import the hook

const repaymentFrequencies = ["Weekly", "Monthly", "Quarterly"];
const loanTypes = ["Bank Loan", "Microfinance Loan", "Personal Loan", "Other"];

interface LoanFormProps {
  initialValues?: Partial<LoanFormValues>;
  onSubmit: (values: LoanFormValues) => void;
  submitButtonText?: string;
}

export function LoanForm({
  initialValues,
  onSubmit,
  submitButtonText = "Save Loan",
}: LoanFormProps) {
  const { userCurrency } = useCurrencyFormatter(); // Use the hook
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanSchema),
    defaultValues: initialValues || {
      lenderName: "",
      loanAmount: 0,
      disbursementDate: new Date(),
      repaymentStartDate: undefined,
      interestRate: 0,
      loanDuration: "",
      repaymentFrequency: undefined,
      purpose: "",
      status: "Active",
      loanType: undefined, // New field
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="loanAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount ({userCurrency.toUpperCase()})</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lenderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lender Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., UBA Bank or John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose / Description</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Loan to buy new sewing machine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="disbursementDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Disbursement Date</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repaymentStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Repayment Start Date</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loanDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 6 months" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="repaymentFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repayment Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {repaymentFrequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loanType" // New field
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Type (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loanTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Active" />
                    </FormControl>
                    <FormLabel className="font-normal">Active</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Closed" />
                    </FormControl>
                    <FormLabel className="font-normal">Closed</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Agreement (Optional)</FormLabel>
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