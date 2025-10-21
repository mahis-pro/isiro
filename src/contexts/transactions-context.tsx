"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "./session-context"; // Import useSession
import { toast } from "sonner";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  payment_method: string; // Changed to payment_method to match DB
  customer?: string;
  vendor?: string;
  tax?: number;
  notes?: string;
};

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "amount" | "date" | "payment_method"> & { amount: number, date: Date, paymentMethod: string }) => Promise<void>;
  updateTransaction: (id: string, data: Omit<Transaction, "id" | "amount" | "date" | "payment_method"> & { amount: number, date: Date, paymentMethod: string }) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  isLoadingTransactions: boolean;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const { session, isLoading: isLoadingSession } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  const fetchTransactions = async () => {
    if (!session?.user?.id) {
      setTransactions([]);
      setIsLoadingTransactions(false);
      return;
    }

    setIsLoadingTransactions(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", session.user.id)
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching transactions:", JSON.stringify(error, null, 2));
      toast.error("Failed to load transactions.");
      setTransactions([]);
    } else {
      setTransactions(data as Transaction[]);
    }
    setIsLoadingTransactions(false);
  };

  useEffect(() => {
    if (!isLoadingSession) {
      fetchTransactions();
    }
  }, [session?.user?.id, isLoadingSession]);

  const addTransaction = async (transaction: Omit<Transaction, "id" | "amount" | "date" | "payment_method"> & { amount: number, date: Date, paymentMethod: string }) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to add a transaction.");
      return;
    }

    const newTransactionData = {
      user_id: session.user.id,
      amount: transaction.type === 'expense' ? -Math.abs(transaction.amount) : Math.abs(transaction.amount),
      date: transaction.date.toISOString(),
      description: transaction.description,
      category: transaction.category,
      payment_method: transaction.paymentMethod, // Corrected: map camelCase to snake_case
      customer: transaction.customer || null,
      vendor: transaction.vendor || null,
      tax: transaction.tax === 0 ? null : transaction.tax,
      notes: transaction.notes || null,
      type: transaction.type,
    };

    console.log("Attempting to insert transaction with data:", newTransactionData); // Added debug log

    const { data, error } = await supabase
      .from("transactions")
      .insert(newTransactionData)
      .select()
      .single();

    if (error) {
      // Enhanced error logging
      console.error("Error adding transaction:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        originalError: error // Log the full error object as well
      });
      toast.error(`Failed to add transaction: ${error.message || "Unknown error"}`);
      throw error;
    } else if (data) {
      setTransactions((prev) => [data as Transaction, ...prev]);
    }
  };

  const updateTransaction = async (id: string, data: Omit<Transaction, "id" | "amount" | "date" | "payment_method"> & { amount: number, date: Date, paymentMethod: string }) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update a transaction.");
      return;
    }

    const updatedTransactionData = {
      amount: data.type === 'expense' ? -Math.abs(data.amount) : Math.abs(data.amount),
      date: data.date.toISOString(),
      description: data.description,
      category: data.category,
      payment_method: data.paymentMethod, // Corrected: map camelCase to snake_case
      customer: data.customer || null,
      vendor: data.vendor || null,
      tax: data.tax === 0 ? null : data.tax,
      notes: data.notes || null,
      type: data.type,
    };

    console.log("Attempting to update transaction with data:", updatedTransactionData); // Added debug log

    const { data: updatedData, error } = await supabase
      .from("transactions")
      .update(updatedTransactionData)
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select()
      .single();

    if (error) {
      // Enhanced error logging
      console.error("Error updating transaction:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        originalError: error
      });
      toast.error(`Failed to update transaction: ${error.message || "Unknown error"}`);
      throw error;
    } else if (updatedData) {
      setTransactions(prev => prev.map(t => t.id === id ? updatedData as Transaction : t));
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to delete a transaction.");
      return;
    }

    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error deleting transaction:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        originalError: error
      });
      toast.error(`Failed to delete transaction: ${error.message || "Unknown error"}`);
      throw error;
    } else {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction, isLoadingTransactions }}>
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