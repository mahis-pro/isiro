"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransactions, Transaction } from "@/contexts/transactions-context";
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
import { toast } from "sonner";
import { EditTransactionDialog } from "./edit-transaction-dialog";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const { deleteTransaction } = useTransactions();
  const [transactionToDelete, setTransactionToDelete] =
    React.useState<Transaction | null>(null);
  const [editingTransaction, setEditingTransaction] =
    React.useState<Transaction | null>(null);

  const handleDelete = async () => {
    if (transactionToDelete) {
      try {
        await deleteTransaction(transactionToDelete.id);
        toast.success("Transaction deleted successfully!");
        setTransactionToDelete(null);
      } catch (error) {
        // Error handled in context, just close dialog
      }
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium max-w-[150px] sm:max-w-xs truncate">
                {transaction.description}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.type === "income" ? "default" : "destructive"
                  }
                  className="capitalize"
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {transaction.category}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right",
                  transaction.type === "income"
                    ? "text-primary"
                    : "text-destructive"
                )}
              >
                {Math.abs(transaction.amount).toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => setEditingTransaction(transaction)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setTransactionToDelete(transaction)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!transactionToDelete}
        onOpenChange={(isOpen) => !isOpen && setTransactionToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditTransactionDialog
        transaction={editingTransaction}
        onOpenChange={(isOpen) => !isOpen && setEditingTransaction(null)}
      />
    </>
  );
}