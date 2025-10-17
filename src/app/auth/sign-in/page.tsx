"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthPageContainer } from "@/components/auth/auth-page-container";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message === "check_email") {
      toast.success("Email confirmed! Please sign in.");
    }
  }, [message]);

  return (
    <AuthPageContainer
      title="Sign In"
      description="Access your account."
      form={<SignInForm />}
      rightPanelTitle="Hello, Friend!"
      rightPanelDescription="Enter your personal details and start journey with us."
      rightPanelButtonText="Sign Up"
      rightPanelButtonHref="/auth/sign-up"
      isSignInPage={true}
    />
  );
}