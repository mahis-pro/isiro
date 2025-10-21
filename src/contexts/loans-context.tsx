"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "./session-context"; // Import useSession
import { toast } from "sonner";
import { LoanFormValues } from "@/lib/schemas";

export type Loan = {
  id: string;
  loan_amount: number; // Changed to loan_amount to match DB
  lender_name: string; // Changed to lender_name to match DB
  disbursement_date: string; // Changed to disbursement_date to match DB
  repayment_start_date: string; // Changed to repayment_start_date to match DB
  interest_rate?: number; // Changed to interest_rate to match DB
  loan_duration?: string; // Changed to loan_duration to match DB
  repayment_frequency?: string; // Changed to repayment_frequency to match DB
  purpose?: string;
  status: "Active" | "Closed";
};

interface LoansContextType {
  loans: Loan[];
  addLoan: (loan: LoanFormValues) => Promise<void>;
  updateLoan: (id: string, loan: LoanFormValues) => Promise<void>;
  deleteLoan: (id: string) => Promise<void>;
  isLoadingLoans: boolean;
}

const LoansContext = createContext<LoansContextType | undefined>(undefined);

export function LoansProvider({ children }: { children: ReactNode }) {
  const { session, isLoading: isLoadingSession } = useSession();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoadingLoans, setIsLoadingLoans] = useState(true);

  const fetchLoans = async () => {
    if (!session?.user?.id) {
      setLoans([]);
      setIsLoadingLoans(false);
      return;
    }

    setIsLoadingLoans(true);
    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("user_id", session.user.id)
      .order("disbursement_date", { ascending: false });

    if (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to load loans.");
      setLoans([]);
    } else {
      setLoans(data as Loan[]);
    }
    setIsLoadingLoans(false);
  };

  useEffect(() => {
    if (!isLoadingSession) {
      fetchLoans();
    }
  }, [session?.user?.id, isLoadingSession]);

  const addLoan = async (loanData: LoanFormValues) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to add a loan.");
      return;
    }

    const newLoan: Omit<Loan, "id"> & { user_id: string } = {
      user_id: session.user.id,
      loan_amount: loanData.loanAmount,
      lender_name: loanData.lenderName,
      disbursement_date: loanData.disbursementDate.toISOString(),
      repayment_start_date: loanData.repaymentStartDate.toISOString(),
      interest_rate: loanData.interestRate,
      loan_duration: loanData.loanDuration,
      repayment_frequency: loanData.repaymentFrequency,
      purpose: loanData.purpose,
      status: loanData.status,
    };

    const { data, error } = await supabase
      .from("loans")
      .insert(newLoan)
      .select()
      .single();

    if (error) {
      console.error("Error adding loan:", error);
      toast.error("Failed to add loan.");
      throw error;
    } else if (data) {
      setLoans((prev) => [data as Loan, ...prev]);
    }
  };

  const updateLoan = async (id: string, loanData: LoanFormValues) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update a loan.");
      return;
    }

    const updatedLoanData = {
      loan_amount: loanData.loanAmount,
      lender_name: loanData.lenderName,
      disbursement_date: loanData.disbursementDate.toISOString(),
      repayment_start_date: loanData.repaymentStartDate.toISOString(),
      interest_rate: loanData.interestRate,
      loan_duration: loanData.loanDuration,
      repayment_frequency: loanData.repaymentFrequency,
      purpose: loanData.purpose,
      status: loanData.status,
    };

    const { data: updatedData, error } = await supabase
      .from("loans")
      .update(updatedLoanData)
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating loan:", error);
      toast.error("Failed to update loan.");
      throw error;
    } else if (updatedData) {
      setLoans((prev) => prev.map((l) => (l.id === id ? updatedData as Loan : l)));
    }
  };

  const deleteLoan = async (id: string) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to delete a loan.");
      return;
    }

    const { error } = await supabase
      .from("loans")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error deleting loan:", error);
      toast.error("Failed to delete loan.");
      throw error;
    } else {
      setLoans((prev) => prev.filter((l) => l.id !== id));
    }
  };

  return (
    <LoansContext.Provider value={{ loans, addLoan, updateLoan, deleteLoan, isLoadingLoans }}>
      {children}
    </LoansContext.Provider>
  );
}

export function useLoans() {
  const context = useContext(LoansContext);
  if (context === undefined) {
    throw new Error("useLoans must be used within a LoansProvider");
  }
  return context;
}