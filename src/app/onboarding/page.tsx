"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "../../components/onboarding/progress-indicator";
import { BusinessTypeStep } from "../../components/onboarding/business-type-step";
import { CurrencyStep } from "../../components/onboarding/currency-step";
import { AllSetStep } from "../../components/onboarding/all-set-step";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useSession } from "@/contexts/session-context";
import { toast } from "sonner";

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { session, profile, updateProfile, isLoading } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    businessType: profile?.business_type || "",
    currency: profile?.currency || "ngn",
  });

  // Handle redirection if already onboarded
  useEffect(() => {
    if (!isLoading && profile?.onboarded) {
      router.push("/dashboard");
    }
  }, [isLoading, profile, router]);

  // If profile is loading or already onboarded, show a loading state or nothing
  if (isLoading || (profile && profile.onboarded)) {
    return <div>Loading onboarding data...</div>;
  }

  const updateData = (data: Partial<typeof onboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finish onboarding
      try {
        await updateProfile({
          onboarded: true,
          business_type: onboardingData.businessType,
          currency: onboardingData.currency,
        });
        toast.success("Onboarding complete! Welcome to ÌṢIRÒ.");
        // Redirection will be handled by the useEffect above or SessionContextProvider
      } catch (error) {
        console.error("Failed to complete onboarding:", error);
        toast.error("Failed to complete onboarding. Please try again.");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isContinueDisabled = () => {
    if (currentStep === 1 && !onboardingData.businessType) {
      return true;
    }
    if (currentStep === 2 && !onboardingData.currency) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full max-w-md space-y-8 p-4">
      <ProgressIndicator totalSteps={TOTAL_STEPS} currentStep={currentStep} />

      <div className="min-h-[350px] flex items-center">
        {currentStep === 1 && (
          <BusinessTypeStep
            value={onboardingData.businessType}
            onSelect={(value: string) => updateData({ businessType: value })}
          />
        )}
        {currentStep === 2 && (
          <CurrencyStep
            value={onboardingData.currency}
            onSelect={(value: string) => updateData({ currency: value })}
          />
        )}
        {currentStep === 3 && <AllSetStep />}
      </div>

      <div className="flex items-center justify-between">
        {currentStep > 1 ? (
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        <Button onClick={nextStep} disabled={isContinueDisabled()}>
          {currentStep === TOTAL_STEPS ? "Get Started" : "Continue"}
          {currentStep < TOTAL_STEPS && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}