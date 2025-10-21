"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthPageContainer } from "@/components/auth/auth-page-container";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Import Suspense
import { toast } from "sonner";

function SignInContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  // Removed the useEffect that was prematurely showing "Email confirmed!" toast.
  // The initial sign-up toast already instructs the user to check their email.

  return (
    <AuthPageContainer
      title="Login"
      description="Welcome back! Access your ÌṢIRÒ account to manage your business finances."
      form={<SignInForm />}
      rightPanelImageSrc="/auth-mockup.png"
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