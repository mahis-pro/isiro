"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export type Profile = {
  id: string;
  full_name: string | null;
  business_name: string | null;
  onboarded: boolean;
  currency: string;
  business_type: string | null;
  updated_at: string | null;
};

interface SessionContextType {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (newProfileData: Partial<Profile>) => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initialized to true
  const router = useRouter();
  const pathname = usePathname();

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } else if (data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadSessionAndProfile = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (!isMounted) return;

      setSession(initialSession);
      if (initialSession) {
        await fetchProfile(initialSession.user.id);
      }
      if (isMounted) setIsLoading(false); // Set to false after initial load
    };

    loadSessionAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, currentSession: Session | null) => {
      if (!isMounted) return;
      // For subsequent auth state changes, just update session/profile,
      // don't toggle the main isLoading state which is for initial app load.
      setSession(currentSession);
      if (currentSession) {
        await fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array for effect to run once on mount

  useEffect(() => {
    if (isLoading) return; // Wait until initial loading is complete

    const isAuthPage = pathname.startsWith("/auth");
    const isOnboardingPage = pathname.startsWith("/onboarding");
    const isLandingPage = pathname === "/";

    if (session) {
      // User is authenticated
      if (!profile) {
        // Profile not yet loaded, wait for it. This can happen right after OAuth callback.
        return;
      }

      if (!profile.onboarded) {
        if (!isOnboardingPage) {
          router.push("/onboarding");
        }
      } else {
        // User is authenticated and onboarded
        if (isAuthPage || isLandingPage) {
          router.push("/dashboard");
        }
      }
    } else {
      // User is not authenticated
      if (!isAuthPage && !isLandingPage) {
        router.push("/auth/sign-in");
      }
    }
  }, [session, profile, isLoading, pathname, router]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out.");
      console.error("Error signing out:", error);
    } else {
      toast.info("You have been signed out.");
      router.push("/auth/sign-in");
    }
  };

  const updateProfile = async (newProfileData: Partial<Profile>) => {
    if (!session) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(newProfileData)
      .eq("id", session.user.id)
      .select()
      .single();

    if (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
      throw error;
    } else if (data) {
      setProfile(data);
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <SessionContext.Provider value={{ session, profile, isLoading, signOut, updateProfile }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionContextProvider");
  }
  return context;
}