import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckEmailPage() {
  return (
    <div className="w-full max-w-sm space-y-6 text-center">
      <Card>
        <CardHeader>
          <MailCheck className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-poppins mt-4">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a confirmation link to your email address. Please click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or{" "}
            <Link href="/auth/sign-up" className="underline">
              try signing up again
            </Link>
            .
          </p>
          <Button asChild variant="link" className="mt-4">
            <Link href="/auth/sign-in">Back to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}