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
import { useLoans, Loan } from "@/contexts/loans-context";
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
import { EditLoanDialog } from "./edit-loan-dialog";

interface LoansTableProps {
  loans: Loan[];
}

export default function LoansTable({ loans }: LoansTableProps) {
  const { deleteLoan } = useLoans();
  const [loanToDelete, setLoanToDelete] = React.useState<Loan | null>(null);
  const [editingLoan, setEditingLoan] = React.useState<Loan | null>(null);

  const handleDelete = () => {
    if (loanToDelete) {
      deleteLoan(loanToDelete.id);
      toast.success("Loan deleted successfully!");
      setLoanToDelete(null);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Disbursed On</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell className="font-medium max-w-[150px] sm:max-w-xs truncate">
                {loan.lenderName}
              </TableCell>
              <TableCell>
                <Badge
                  variant={loan.status === "Active" ? "secondary" : "outline"}
                  className="capitalize"
                >
                  {loan.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(loan.disbursementDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right text-secondary">
                {loan.loanAmount.toLocaleString("en-NG", {
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
                    <DropdownMenuItem onClick={() => setEditingLoan(loan)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setLoanToDelete(loan)}
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
        open={!!loanToDelete}
        onOpenChange={(isOpen) => !isOpen && setLoanToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              loan record.
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

      <EditLoanDialog
        loan={editingLoan}
        onOpenChange={(isOpen) => !isOpen && setEditingLoan(null)}
      />
    </>
  );
}