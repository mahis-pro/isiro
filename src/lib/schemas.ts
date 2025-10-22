import { z } from "zod";

const fileSchema = z.any().optional(); // Basic file schema, can be improved

export const incomeSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .positive({ message: "Amount must be a positive number." }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  category: z.string({ required_error: "Please select a category." }),
  paymentMethod: z.string({ required_error: "Please select a payment method." }),
  customer: z.string().optional(),
  tax: z.coerce.number().optional(),
  date: z.date({
    required_error: "A date is required.",
  }),
  paymentStatus: z.enum(["received", "outstanding"], { required_error: "Payment status is required." }), // New field
  receipt: fileSchema,
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;

export const expenseSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .positive({ message: "Amount must be a positive number." }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  category: z.string({ required_error: "Please select a category." }),
  vendor: z.string().optional(),
  paymentMethod: z.string({ required_error: "Please select a payment method." }),
  taxPaid: z.coerce.number().optional(), // Renamed from taxDeducted
  date: z.date({
    required_error: "A date is required.",
  }),
  paymentStatus: z.enum(["paid", "due"], { required_error: "Payment status is required." }), // New field
  invoice: fileSchema,
  notes: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

export const loanSchema = z.object({
  loanAmount: z.coerce
    .number({
      required_error: "Loan amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .positive({ message: "Amount must be a positive number." }),
  lenderName: z.string().min(2, { message: "Lender name is required." }),
  disbursementDate: z.date({ required_error: "Disbursement date is required." }),
  repaymentStartDate: z.date({ required_error: "Repayment start date is required." }),
  interestRate: z.coerce.number().positive().optional(),
  loanDuration: z.string().optional(),
  repaymentFrequency: z.string().optional(),
  purpose: z.string().optional(),
  status: z.enum(["Active", "Closed"]),
  loanType: z.string().optional(), // New field
  agreement: fileSchema,
});

export type LoanFormValues = z.infer<typeof loanSchema>;

export const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;