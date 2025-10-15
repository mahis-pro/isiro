"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Image component
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

  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={handleGoogleSignIn}
        type="button"
      >
        <Image src="/google.png" alt="Google logo" width={20} height={20} className="mr-2" />
        Sign in with Google
      </Button>
    </div>
  );
}