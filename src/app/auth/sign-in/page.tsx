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
      title="Login"
      description="Welcome back! Access your ÌṢIRÒ account to manage your business finances."
      form={<SignInForm />}
      rightPanelImageSrc="/auth-mockup.png"
    />
  );
}