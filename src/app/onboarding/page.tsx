"use client";

import React, { useState } from "react";
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
    businessType: profile?.business_name || "", // Use profile data if available
    currency: profile?.currency || "ngn", // Default currency
  });

  // If profile is loading or not available, we might want to show a loading state
  if (isLoading) {
    return <div>Loading onboarding data...</div>;
  }

  // If user is already onboarded, redirect to dashboard
  if (profile?.onboarded) {
    router.push("/dashboard");
    return null;
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
          business_name: onboardingData.businessType, // Assuming businessType is stored as business_name for simplicity
          currency: onboardingData.currency,
        });
        toast.success("Onboarding complete! Welcome to ÌṢIRÒ.");
        router.push("/dashboard");
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
          <div /> // Placeholder to keep "Continue" on the right
        )}

        <Button onClick={nextStep} disabled={isContinueDisabled()}>
          {currentStep === TOTAL_STEPS ? "Get Started" : "Continue"}
          {currentStep < TOTAL_STEPS && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}