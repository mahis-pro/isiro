"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  paymentMethod: string;
  customer?: string;
  vendor?: string;
  tax?: number;
  notes?: string;
};

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "amount" | "date"> & { amount: number, date: Date }) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

// Mock data to start with
const mockTransactions: Transaction[] = [
    {
      id: "txn_1",
      date: new Date("2024-06-15").toISOString(),
      description: "Sale of Product A",
      amount: 150.0,
      type: "income",
      category: "Product Sales",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "txn_2",
      date: new Date("2024-06-14").toISOString(),
      description: "Office Supplies",
      amount: -45.5,
      type: "expense",
      category: "Utilities",
      paymentMethod: "Cash",
    },
    {
      id: "txn_3",
      date: new Date("2024-06-14").toISOString(),
      description: "Client Payment - Project X",
      amount: 2500.0,
      type: "income",
      category: "Service Revenue",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "txn_4",
      date: new Date("2024-06-13").toISOString(),
      description: "Software Subscription",
      amount: -29.99,
      type: "expense",
      category: "Miscellaneous",
      paymentMethod: "POS",
    },
    {
      id: "txn_5",
      date: new Date("2024-06-12").toISOString(),
      description: "Consulting Fee",
      amount: 750.0,
      type: "income",
      category: "Service Revenue",
      paymentMethod: "Bank Transfer",
    },
];


export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const addTransaction = (transaction: Omit<Transaction, "id" | "amount" | "date"> & { amount: number, date: Date }) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
      amount: transaction.type === 'expense' ? -Math.abs(transaction.amount) : Math.abs(transaction.amount),
      date: transaction.date.toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
}