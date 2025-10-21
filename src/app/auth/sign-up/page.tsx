"use client";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthPageContainer } from "@/components/auth/auth-page-container";

export default function SignUpPage() {
  return (
    <AuthPageContainer
      title="Create New Account"
      description="Join ÌṢIRÒ and simplify your bookkeeping. Get started in minutes!"
      form={<SignUpForm />}
      rightPanelImageSrc="/auth-mockup.png"
    />
  );
}