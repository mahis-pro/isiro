"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Landmark, TrendingUp, TrendingDown } from "lucide-react";
import { useSession } from "@/contexts/session-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AccountFormDialog } from "./account-form-dialog";
import { cn } from "@/lib/utils";

export type Account = {
  id: string;
  account_name: string;
  account_type: "Asset" | "Liability" | "Equity" | "Revenue" | "Expense";
  is_default: boolean;
};

export function AccountManagementTab() {
  const { session } = useSession();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'income' | 'expense' | null>(null);

  const fetchAccounts = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", session.user.id)
      .order("account_name", { ascending: true });

    if (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Failed to load categories.");
    } else {
      setAccounts(data as Account[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAccounts();
  }, [session?.user?.id]);

  const handleSuccess = () => {
    fetchAccounts();
    setIsDialogOpen(false);
    setEditingAccount(null);
  };

  const handleDelete = async () => {
    if (!accountToDelete) return;

    try {
      const { error } = await supabase
        .from("accounts")
        .delete()
        .eq("id", accountToDelete.id);

      if (error) {
        console.error("Error deleting account:", error);
        toast.error(`Failed to delete category: ${error.message}`);
      } else {
        toast.success("Category deleted successfully.");
        setAccounts(prev => prev.filter(a => a.id !== accountToDelete.id));
        setAccountToDelete(null);
      }
    } catch (e) {
      toast.error("An unexpected error occurred during deletion.");
    }
  };

  const { incomeAccounts, expenseAccounts } = useMemo(() => {
    const income = accounts.filter(a => a.account_type === "Revenue");
    const expense = accounts.filter(a => a.account_type === "Expense");
    return { incomeAccounts: income, expenseAccounts: expense };
  }, [accounts]);

  const renderAccountList = (list: Account[], type: 'income' | 'expense') => (
    <div className="space-y-2">
      {list.map(account => (
        <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg bg-background">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-full",
              type === 'income' ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            )}>
              {type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
            <span className="font-medium">{account.account_name}</span>
            {account.is_default && (
              <span className="text-xs text-muted-foreground border rounded-full px-2 py-0.5">Default</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingAccount(account);
                setDialogType(type);
                setIsDialogOpen(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            {!account.is_default && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAccountToDelete(account)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        </div>
      ))}
      {list.length === 0 && !isLoading && (
        <p className="text-sm text-muted-foreground p-4 text-center border rounded-lg">
          No {type} categories found. Click 'Add New' to create one.
        </p>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>
            Customize the categories you use to track your income and expenses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Income Categories (Revenue) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Income Categories (Revenue)
              </h3>
              <Button
                size="sm"
                onClick={() => {
                  setEditingAccount(null);
                  setDialogType('income');
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            {renderAccountList(incomeAccounts, 'income')}
          </div>

          {/* Expense Categories (Expense) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                Expense Categories (Expense)
              </h3>
              <Button
                size="sm"
                onClick={() => {
                  setEditingAccount(null);
                  setDialogType('expense');
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            {renderAccountList(expenseAccounts, 'expense')}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!accountToDelete}
        onOpenChange={(isOpen) => !isOpen && setAccountToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the category:{" "}
              <span className="font-semibold text-foreground">
                {accountToDelete?.account_name}
              </span>
              . Any transactions currently using this category will become uncategorized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add/Edit Dialog */}
      <AccountFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialAccount={editingAccount}
        accountType={dialogType}
        onSuccess={handleSuccess}
      />
    </>
  );
}