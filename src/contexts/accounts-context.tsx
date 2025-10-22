"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "./session-context";
import { toast } from "sonner";

export type Account = {
  id: string;
  account_name: string;
  account_type: "Asset" | "Liability" | "Equity" | "Revenue" | "Expense";
  is_default: boolean;
  user_id: string;
  created_at: string;
};

interface AccountsContextType {
  accounts: Account[];
  incomeCategories: Account[];
  expenseCategories: Account[];
  assetAccounts: Account[];
  liabilityAccounts: Account[];
  equityAccounts: Account[];
  isLoadingAccounts: boolean;
  refreshAccounts: () => Promise<void>;
  addAccount: (name: string, type: "Revenue" | "Expense") => Promise<void>;
  updateAccount: (id: string, name: string) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
}

const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
);

export function AccountsProvider({ children }: { children: ReactNode }) {
  const { session, isLoading: isLoadingSession } = useSession();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  const fetchAccounts = async () => {
    if (!session?.user?.id) {
      setAccounts([]);
      setIsLoadingAccounts(false);
      return;
    }

    setIsLoadingAccounts(true);
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", session.user.id)
      .order("account_type", { ascending: true })
      .order("account_name", { ascending: true });

    if (error) {
      console.error("Error fetching accounts:", JSON.stringify(error, null, 2));
      toast.error("Failed to load financial categories.");
      setAccounts([]);
    } else {
      setAccounts(data as Account[]);
    }
    setIsLoadingAccounts(false);
  };

  useEffect(() => {
    if (!isLoadingSession) {
      fetchAccounts();
    }
  }, [session?.user?.id, isLoadingSession]);

  const addAccount = async (name: string, type: "Revenue" | "Expense") => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to add an account.");
      return;
    }
    const newAccount = {
      user_id: session.user.id,
      account_name: name,
      account_type: type,
      is_default: false,
    };
    const { error } = await supabase.from("accounts").insert(newAccount);
    if (error) throw error;
    await fetchAccounts();
  };

  const updateAccount = async (id: string, name: string) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to update an account.");
      return;
    }
    const { error } = await supabase
      .from("accounts")
      .update({ account_name: name })
      .eq("id", id)
      .eq("user_id", session.user.id);
    if (error) throw error;
    await fetchAccounts();
  };

  const deleteAccount = async (id: string) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to delete an account.");
      return;
    }
    const { error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);
    if (error) throw error;
    await fetchAccounts();
  };


  const categorizedAccounts = useMemo(() => {
    const income = accounts.filter(a => a.account_type === "Revenue");
    const expense = accounts.filter(a => a.account_type === "Expense");
    const asset = accounts.filter(a => a.account_type === "Asset");
    const liability = accounts.filter(a => a.account_type === "Liability");
    const equity = accounts.filter(a => a.account_type === "Equity");

    return {
      incomeCategories: income,
      expenseCategories: expense,
      assetAccounts: asset,
      liabilityAccounts: liability,
      equityAccounts: equity,
    };
  }, [accounts]);

  const refreshAccounts = async () => {
    await fetchAccounts();
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        ...categorizedAccounts,
        isLoadingAccounts,
        refreshAccounts,
        addAccount,
        updateAccount,
        deleteAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error("useAccounts must be used within an AccountsProvider");
  }
  return context;
}