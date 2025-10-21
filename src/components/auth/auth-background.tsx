"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthBackgroundProps {
  children: React.ReactNode;
}

export function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 auth-gradient-bg relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-primary/20 blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-secondary/20 blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

      {children}
    </div>
  );
}