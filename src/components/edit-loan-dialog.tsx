"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loan, useLoans } from "@/contexts/loans-context";
import { LoanForm } from "./loan-form";
import { LoanFormValues } from "@/lib/schemas";
import { toast } from "sonner";

interface EditLoanDialogProps {
  loan: Loan | null;
  onOpenChange: (open: boolean) => void;
}

export function EditLoanDialog({ loan, onOpenChange }: EditLoanDialogProps) {
  const { updateLoan } = useLoans();

  const handleUpdateLoan = (values: LoanFormValues) => {
    if (!loan) return;
    updateLoan(loan.id, values);
    toast.success("Loan updated successfully!");
    onOpenChange(false);
  };

  const initialValues = loan ? {
    ...loan,
    disbursementDate: new Date(loan.disbursementDate),
    repaymentStartDate: new Date(loan.repaymentStartDate),
  } : undefined;

  return (
    <Dialog open={!!loan} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Loan</DialogTitle>
          <DialogDescription>
            Make changes to your loan here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          {loan && (
            <LoanForm
              initialValues={initialValues}
              onSubmit={handleUpdateLoan}
              submitButtonText="Save Changes"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}