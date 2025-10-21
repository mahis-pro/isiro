"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import { TransactionsProvider, useTransactions } from "@/contexts/transactions-context"; // Import useTransactions
import { LoansProvider, useLoans } from "@/contexts/loans-context"; // Import useLoans
import { BottomNav } from "@/components/bottom-nav";
import { useSession } from "@/contexts/session-context";
import { useRouter } from "next/navigation";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { session, profile, isLoading: isLoadingSession } = useSession();
  const { isLoadingTransactions } = useTransactions(); // Get loading state from TransactionsContext
  const { isLoadingLoans } = useLoans(); // Get loading state from LoansContext
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingSession && !session) {
      router.push("/auth/sign-in");
    } else if (!isLoadingSession && session && profile && !profile.onboarded) {
      router.push("/onboarding");
    }
  }, [isLoadingSession, session, profile, router]);

  if (isLoadingSession || !session || (session && profile && !profile.onboarded) || isLoadingTransactions || isLoadingLoans) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading dashboard...
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
        <DashboardContent>{children}</DashboardContent>
      </LoansProvider>
    </TransactionsProvider>
  );
}