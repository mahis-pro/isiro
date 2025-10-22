"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthFormContainer } from "@/components/auth/auth-form-container";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for a password reset link!");
      router.push("/auth/check-email");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-auth-bg rounded-lg h-12"
          />
        </div>
        <Button type="submit" className="w-full btn-gradient-primary h-12 text-lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link href="/auth/sign-in" className="underline text-muted-foreground hover:text-foreground">
          Back to Sign In
        </Link>
      </div>
    </>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthFormContainer
      title="Forgot Password?"
      description="Enter your email to receive a password reset link."
      form={<ForgotPasswordForm />}
    />
  );
}