"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthFormContainer } from "@/components/auth/auth-form-container";

function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Your password has been updated successfully!");
      router.push("/auth/sign-in");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="password">New Password</Label>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-auth-bg rounded-lg h-12"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <PasswordInput
          id="confirm-password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-auth-bg rounded-lg h-12"
        />
      </div>
      <Button type="submit" className="w-full btn-gradient-primary h-12 text-lg" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}

export default function UpdatePasswordPage() {
  return (
    <AuthFormContainer
      title="Update Password"
      description="Enter your new password."
      form={<UpdatePasswordForm />}
    />
  );
}