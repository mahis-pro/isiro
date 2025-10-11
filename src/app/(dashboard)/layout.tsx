import React from "react";
import Header from "@/components/header";
import { TransactionsProvider } from "@/contexts/transactions-context";
import { Toaster } from "@/components/ui/sonner";
import BottomNavigation from "@/components/bottom-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionsProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-8 md:gap-8 mb-16 md:mb-0">
          {children}
        </main>
        <BottomNavigation />
        <Toaster />
      </div>
    </TransactionsProvider>
  );
}