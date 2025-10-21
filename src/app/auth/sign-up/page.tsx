"use client";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthPageContainer } from "@/components/auth/auth-page-container";

export default function SignUpPage() {
  return (
    <AuthPageContainer
      title="Sign Up" // Keep as "Sign Up"
      description="Create your account to get started." // Placeholder description
      form={<SignUpForm />}
      rightPanelImageSrc="/auth-mockup.png" // Use the new mockup image
    />
  );
}