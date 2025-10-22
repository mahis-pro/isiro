"use client";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthFormContainer } from "@/components/auth/auth-form-container";

export default function SignUpPage() {
  return (
    <AuthFormContainer
      title="Create Account"
      description="Join ÌṢIRÒ and simplify your bookkeeping. Get started in minutes!"
      form={<SignUpForm />}
    />
  );
}