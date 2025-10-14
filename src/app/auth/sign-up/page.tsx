"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center lg:hidden">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ÌṢIRÒ Logo"
            width={120}
            height={48}
            className="mx-auto"
          />
        </Link>
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-poppins">
            Sign Up
          </CardTitle>
          <CardDescription>Get started with a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={["google"]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "hsl(var(--primary))",
                    brandAccent: "hsl(var(--primary-foreground))",
                    inputBackground: "hsl(var(--input))",
                    inputBorder: "hsl(var(--border))",
                    inputBorderHover: "hsl(var(--ring))",
                    inputBorderFocus: "hsl(var(--ring))",
                    inputText: "hsl(var(--foreground))",
                    inputPlaceholder: "hsl(var(--muted-foreground))",
                    messageText: "hsl(var(--destructive))",
                    messageBackground: "hsl(var(--destructive)/0.1)",
                    anchorTextColor: "hsl(var(--primary))",
                    anchorTextHoverColor: "hsl(var(--primary)/0.8)",
                  },
                },
              },
            }}
            theme={theme === "dark" ? "dark" : "light"}
            redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`}
            magicLink={false}
            view="sign_up"
            localization={{
              variables: {
                sign_up: {
                  // Removed invalid properties
                },
                // The 'providers' object is not a direct child of 'variables' in I18nVariables type.
                // Removing it to fix the TypeScript error.
              },
            }}
          />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}