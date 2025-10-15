"use client";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthPageContainer } from "@/components/auth/auth-page-container";

export default function SignUpPage() {
  return (
    <AuthPageContainer
      title="Sign Up"
      description="Get started with a new account."
      form={<SignUpForm />}
      rightPanelTitle="Welcome Back!"
      rightPanelDescription="To keep connected with us please login with your personal info."
      rightPanelButtonText="Sign In"
      rightPanelButtonHref="/auth/sign-in"
      isSignInPage={false}
    />
  );
}