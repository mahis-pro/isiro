"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import { TransactionsProvider } from "@/contexts/transactions-context";
import { LoansProvider } from "@/contexts/loans-context";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/bottom-nav";
import { useSession } from "@/contexts/session-context"; // Import the new context
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, profile, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/auth/sign-in");
    } else if (!isLoading && session && profile && !profile.onboarded) {
      router.push("/onboarding");
    }
  }, [isLoading, session, profile, router]);

  if (isLoading || !session || (session && profile && !profile.onboarded)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading dashboard...
      </div>
    );
  }

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