"use client";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthPageContainer } from "@/components/auth/auth-page-container";

export default function SignUpPage() {
  return (
    <AuthPageContainer
      title="Sign Up"
      description="Get started with a new account."
      form={<SignUpForm />}
      rightPanelTitle="Already have an account?"
      rightPanelDescription="Welcome back! Log in to continue managing your finances with ÌṢIRÒ. Your business insights are waiting."
      rightPanelButtonText="Sign In"
      rightPanelButtonHref="/auth/sign-in"
      isSignInPage={false}
      rightPanelImageSrc="/logo.png" // Using the existing logo for now
    />
  );
}