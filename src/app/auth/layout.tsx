import React from "react";
import { AuthBackground } from "@/components/auth/auth-background"; // Import the new component

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthBackground> {/* Use the new AuthBackground component */}
      {children}
    </AuthBackground>
  );
}