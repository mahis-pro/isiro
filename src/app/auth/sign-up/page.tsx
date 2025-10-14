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
import { SignUpForm } from "@/components/auth/sign-up-form"; // Import the new custom form

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
          <SignUpForm /> {/* Use the custom SignUpForm */}
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