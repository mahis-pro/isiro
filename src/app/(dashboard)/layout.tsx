import React from "react";
import Header from "@/components/header";
import { TransactionsProvider } from "@/contexts/transactions-context";
import { LoansProvider } from "@/contexts/loans-context";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionsProvider>
      <LoansProvider>
        <div className="flex min-h-screen w-full flex-col bg-background">
          <Header />
          <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
            {children}
          </main>
          <BottomNav />
          <Toaster />
        </div>
      </LoansProvider>
    </TransactionsProvider>
  );
}