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
import { signUpSchema, SignUpFormValues } from "@/lib/schemas";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./password-input";
import { SocialAuthButtons } from "./social-auth-buttons";
import { User, Lock } from "lucide-react"; // Import icons
import Link from "next/link"; // Import Link

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Success! Please check your email to confirm your account.");
      router.push("/auth/sign-in?message=check_email");
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
                  <Input placeholder="Email" {...field} className="pl-10 input-auth-bg rounded-lg h-12" />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <PasswordInput placeholder="Confirm Password" {...field} className="pl-10 input-auth-bg rounded-lg h-12" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full btn-gradient-primary h-12 text-lg" disabled={form.formState.isSubmitting}>
          Create Account
        </Button>
      </form>
      <div className="flex items-center my-6 justify-center">
        <span className="mx-2 text-sm text-muted-foreground">Sign Up with Others</span>
      </div>
      <SocialAuthButtons />
      <div className="text-center text-sm mt-4">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="underline text-primary hover:text-primary/80 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </Form>
  );
}