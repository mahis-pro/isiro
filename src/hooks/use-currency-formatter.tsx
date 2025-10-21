"use client";

import { useSession } from "@/contexts/session-context";
import { useMemo } from "react";

export function useCurrencyFormatter() {
  const { profile } = useSession();
  const userCurrency = profile?.currency || "ngn"; // Default to NGN if not set

  const formatCurrency = useMemo(() => {
    return (value: number) => {
      return new Intl.NumberFormat("en-US", { // Using en-US locale for general formatting, currency symbol will be correct
        style: "currency",
        currency: userCurrency.toUpperCase(),
        minimumFractionDigits: 0, // Adjust as needed, e.g., 2 for cents/kobo
      }).format(value);
    };
  }, [userCurrency]);

  return { formatCurrency, userCurrency };
}