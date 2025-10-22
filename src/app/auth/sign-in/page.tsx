"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthFormContainer } from "@/components/auth/auth-form-container";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

function SignInContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <AuthFormContainer
      title="Login"
      description="Welcome back! Access your ÌṢIRÒ account."
      form={<SignInForm />}
    />
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <SignInContent />
    </Suspense>
  );
}