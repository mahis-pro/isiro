"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { LoanFormValues } from "@/lib/schemas";

export type Loan = {
  id: string;
  loanAmount: number;
  lenderName: string;
  disbursementDate: string;
  repaymentStartDate: string;
  interestRate?: number;
  loanDuration?: string;
  repaymentFrequency?: string;
  purpose?: string;
  status: "Active" | "Closed";
};

interface LoansContextType {
  loans: Loan[];
  addLoan: (loan: LoanFormValues) => void;
  updateLoan: (id: string, loan: LoanFormValues) => void;
  deleteLoan: (id: string) => void;
}

const LoansContext = createContext<LoansContextType | undefined>(undefined);

const mockLoans: Loan[] = [
  {
    id: "loan_1",
    loanAmount: 500000,
    lenderName: "UBA Bank",
    disbursementDate: new Date("2024-05-01").toISOString(),
    repaymentStartDate: new Date("2024-06-01").toISOString(),
    interestRate: 10,
    loanDuration: "12 months",
    repaymentFrequency: "Monthly",
    purpose: "Working capital",
    status: "Active",
  },
];

export function LoansProvider({ children }: { children: ReactNode }) {
  const [loans, setLoans] = useState<Loan[]>(mockLoans);

  const addLoan = (loanData: LoanFormValues) => {
    const newLoan: Loan = {
      ...loanData,
      id: uuidv4(),
      disbursementDate: loanData.disbursementDate.toISOString(),
      repaymentStartDate: loanData.repaymentStartDate.toISOString(),
    };
    setLoans((prev) => [newLoan, ...prev]);
  };

  const updateLoan = (id: string, loanData: LoanFormValues) => {
    const updatedLoan: Loan = {
      ...loanData,
      id,
      disbursementDate: loanData.disbursementDate.toISOString(),
      repaymentStartDate: loanData.repaymentStartDate.toISOString(),
    };
    setLoans((prev) => prev.map((l) => (l.id === id ? updatedLoan : l)));
  };

  const deleteLoan = (id: string) => {
    setLoans((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <LoansContext.Provider value={{ loans, addLoan, updateLoan, deleteLoan }}>
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