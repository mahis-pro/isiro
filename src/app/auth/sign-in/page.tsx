"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthPageContainer } from "@/components/auth/auth-page-container";

export default function SignInPage() {
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