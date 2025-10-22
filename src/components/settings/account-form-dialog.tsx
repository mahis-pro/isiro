"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Account } from "./account-management-tab";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/contexts/session-context";
import { useEffect } from "react";
import { useAccounts } from "@/contexts/accounts-context"; // Import useAccounts

const formSchema = z.object({
  accountName: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AccountFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAccount: Account | null;
  accountType: 'income' | 'expense' | null;
  onSuccess: () => void;
}

export function AccountFormDialog({
  open,
  onOpenChange,
  initialAccount,
  accountType,
  onSuccess,
}: AccountFormDialogProps) {
  const { session } = useSession();
  const { refreshAccounts } = useAccounts(); // Use refreshAccounts
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: initialAccount?.account_name || "",
    },
  });

  useEffect(() => {
    if (initialAccount) {
      form.reset({ accountName: initialAccount.account_name });
    } else {
      form.reset({ accountName: "" });
    }
  }, [initialAccount, form]);

  const onSubmit = async (values: FormValues) => {
    if (!session?.user?.id || !accountType) return;

    const baseData = {
      account_name: values.accountName,
      user_id: session.user.id,
      account_type: accountType === 'income' ? 'Revenue' : 'Expense',
    };

    try {
      if (initialAccount) {
        // Update existing account
        const { error } = await supabase
          .from("accounts")
          .update({ account_name: values.accountName })
          .eq("id", initialAccount.id)
          .eq("user_id", session.user.id);

        if (error) throw error;
        toast.success("Category updated successfully.");
      } else {
        // Add new account
        const { error } = await supabase
          .from("accounts")
          .insert(baseData);

        if (error) throw error;
        toast.success("New category added successfully.");
      }
      
      refreshAccounts(); // Refresh the global context state after successful operation
      onSuccess();
    } catch (error: any) {
      console.error("Error saving account:", error);
      if (error.code === '23505') { // Unique constraint violation
        toast.error("A category with this name already exists.");
      } else {
        toast.error(`Failed to save category: ${error.message || "Unknown error"}`);
      }
    }
  };

  const title = initialAccount ? "Edit Category" : `Add New ${accountType === 'income' ? 'Income' : 'Expense'} Category`;
  const description = initialAccount ? "Rename your category." : "Give your new category a simple, descriptive name.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Consulting Fees" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Category"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}