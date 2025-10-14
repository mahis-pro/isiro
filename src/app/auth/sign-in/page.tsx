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
import { useTheme } from "next-themes";
import { SignInForm } from "@/components/auth/sign-in-form"; // Import the new custom form

export default function SignInPage() {
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
          <CardTitle className="text-2xl font-poppins">Sign In</CardTitle>
          <CardDescription>
            Access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm /> {/* Use the custom SignInForm */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}