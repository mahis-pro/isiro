import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["sale", "expense"], {
    required_error: "Please select a transaction type.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.coerce
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .positive({ message: "Amount must be a positive number." }),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;