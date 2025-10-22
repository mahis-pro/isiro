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

  const handleUpdateLoan = async (values: LoanFormValues) => {
    if (!loan) return;
    try {
      await updateLoan(loan.id, values);
      toast.success("Loan updated successfully!");
      onOpenChange(false);
    } catch (error) {
      // Error handled in context
    }
  };

  const initialValues = loan ? {
    loanAmount: loan.loan_amount,
    lenderName: loan.lender_name,
    disbursementDate: new Date(loan.disbursement_date),
    repaymentStartDate: new Date(loan.repayment_start_date),
    interestRate: loan.interest_rate ?? undefined, // Convert null to undefined
    loanDuration: loan.loan_duration ?? undefined, // Convert null to undefined
    repaymentFrequency: loan.repayment_frequency ?? undefined, // Convert null to undefined
    purpose: loan.purpose ?? undefined, // Convert null to undefined
    status: loan.status,
    loanType: loan.loan_type ?? undefined, // New field
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