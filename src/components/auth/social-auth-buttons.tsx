"use client";

import { Button } from "@/components/ui/button";
import { Chrome, Facebook, Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SocialAuthButtons() {
  async function handleGoogleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  }

  // Placeholder functions for other social providers
  const handleFacebookSignIn = () => {
    toast.info("Facebook sign-in is not yet implemented.");
  };

  const handleLinkedInSignIn = () => {
    toast.info("LinkedIn sign-in is not yet implemented.");
  };

  return (
    <div className="flex justify-center space-x-3">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={handleFacebookSignIn}
        type="button"
      >
        <Facebook className="h-5 w-5 text-blue-600" />
        <span className="sr-only">Sign in with Facebook</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={handleGoogleSignIn}
        type="button"
      >
        <Chrome className="h-5 w-5 text-red-500" />
        <span className="sr-only">Sign in with Google</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={handleLinkedInSignIn}
        type="button"
      >
        <Linkedin className="h-5 w-5 text-blue-700" />
        <span className="sr-only">Sign in with LinkedIn</span>
      </Button>
    </div>
  );
}