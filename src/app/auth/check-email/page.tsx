import { MailCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthFormContainer } from "@/components/auth/auth-form-container";

function CheckEmailContent() {
  return (
    <>
      <div className="text-center">
        <MailCheck className="mx-auto h-12 w-12 text-primary" />
        <h2 className="text-2xl font-poppins font-bold mt-4">Check Your Email</h2>
        <p className="text-muted-foreground mt-2">
          We've sent a confirmation link to your email address. Please click the link to verify your account.
        </p>
      </div>
      <div className="mt-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or{" "}
          <Link href="/auth/sign-up" className="underline">
            try signing up again
          </Link>
          .
        </p>
        <Button asChild variant="link" className="w-full">
          <Link href="/auth/sign-in">Back to Sign In</Link>
        </Button>
      </div>
    </>
  );
}

export default function CheckEmailPage() {
  return (
    <AuthFormContainer
      title="Email Sent"
      description="Verify your account to continue."
      form={<CheckEmailContent />}
    />
  );
}