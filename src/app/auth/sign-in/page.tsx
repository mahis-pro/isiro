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
      rightPanelTitle="New Here?"
      rightPanelDescription="Join ÌṢIRÒ today and simplify your bookkeeping. Track sales, manage expenses, and gain insights to grow your business effortlessly."
      rightPanelButtonText="Sign Up"
      rightPanelButtonHref="/auth/sign-up"
      isSignInPage={true}
      rightPanelImageSrc="/logo.png" // Using the existing logo for now
    />
  );
}