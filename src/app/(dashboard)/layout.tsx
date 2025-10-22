"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import { TransactionsProvider, useTransactions } from "@/contexts/transactions-context";
import { LoansProvider, useLoans } from "@/contexts/loans-context";
import { AccountsProvider, useAccounts } from "@/contexts/accounts-context"; // Import AccountsProvider and useAccounts
import { BottomNav } from "@/components/bottom-nav";
import { useSession } from "@/contexts/session-context";
import { useRouter } from "next/navigation";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { session, profile, isLoading: isLoadingSession } = useSession();
  const { isLoadingTransactions } = useTransactions();
  const { isLoadingLoans } = useLoans();
  const { isLoadingAccounts } = useAccounts(); // Get loading state from AccountsContext
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingSession && !session) {
      router.push("/auth/sign-in");
    } else if (!isLoadingSession && session && profile && !profile.onboarded) {
      router.push("/onboarding");
    }
  }, [isLoadingSession, session, profile, router]);

  // Include isLoadingAccounts in the overall loading check
  if (isLoadingSession || !session || (session && profile && !profile.onboarded) || isLoadingTransactions || isLoadingLoans || isLoadingAccounts) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
          <DashboardSkeleton />
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionsProvider>
      <LoansProvider>
        <AccountsProvider> {/* New Provider */}
          <DashboardContent>{children}</DashboardContent>
        </AccountsProvider>
      </LoansProvider>
    </TransactionsProvider>
  );
}