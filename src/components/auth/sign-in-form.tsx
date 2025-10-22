"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signInSchema, SignInFormValues } from "@/lib/schemas";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./password-input";
import Link from "next/link";
import { SocialAuthButtons } from "./social-auth-buttons";
import { User, Lock } from "lucide-react"; // Import icons
import { Separator } from "@/components/ui/separator"; // Import Separator

export function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signed in successfully!");
      // Redirection is now handled by SessionContextProvider based on onboarding status
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Email Address" {...field} className="pl-10 input-auth-bg rounded-lg h-12" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <PasswordInput placeholder="Password" {...field} className="pl-10 input-auth-bg rounded-lg h-12" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right text-sm">
          <Link href="/auth/forgot-password" className="underline text-muted-foreground hover:text-foreground">
            Forgot your password?
          </Link>
        </div>
        <Button type="submit" className="w-full btn-gradient-primary h-12 text-lg" disabled={form.formState.isSubmitting}>
          Login Now
        </Button>
      </form>
      <div className="relative my-6">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-card px-2 text-sm text-muted-foreground">
            OR
          </span>
        </div>
      </div>
      <SocialAuthButtons />
      <div className="text-center text-sm mt-4">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="underline text-primary hover:text-primary/80 font-medium">
            Create New Account
          </Link>
        </p>
      </div>
    </Form>
  );
}