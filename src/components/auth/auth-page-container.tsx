import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Image component

interface AuthPageContainerProps {
  title: string;
  description: string;
  form: React.ReactNode;
  rightPanelTitle: string;
  rightPanelDescription: string;
  rightPanelButtonText: string;
  rightPanelButtonHref: string;
  isSignInPage: boolean;
  rightPanelImageSrc?: string; // New prop for an image in the right panel
}

export function AuthPageContainer({
  title,
  description,
  form,
  rightPanelTitle,
  rightPanelDescription,
  rightPanelButtonText,
  rightPanelButtonHref,
  isSignInPage,
  rightPanelImageSrc,
}: AuthPageContainerProps) {
  return (
    <Card className="w-full max-w-4xl overflow-hidden rounded-lg shadow-lg flex flex-col lg:flex-row min-h-[500px]">
      {/* Left Panel (Form) */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="mb-6 text-center">
          <Link href="/">
            <Image src="/logo.png" alt="ÌṢIRÒ Logo" width={100} height={40} className="mx-auto" />
          </Link>
        </div>
        <CardHeader className="text-center p-0 mb-6">
          <CardTitle className="text-3xl font-poppins font-bold">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {form}
        </CardContent>
      </div>

      {/* Right Panel (Welcome/Switch) */}
      <div
        className={cn(
          "w-full lg:w-1/2 p-8 flex flex-col items-center justify-center text-center text-primary-foreground",
          isSignInPage ? "bg-primary" : "bg-secondary" // Use primary for sign-in, secondary for sign-up
        )}
      >
        {rightPanelImageSrc && (
          <Image src={rightPanelImageSrc} alt="Product Value" width={150} height={150} className="mb-6" />
        )}
        <h2 className="text-4xl font-poppins font-bold">{rightPanelTitle}</h2>
        <p className="mt-4 text-lg max-w-xs">{rightPanelDescription}</p>
        <Button asChild variant="outline" className="mt-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
          <Link href={rightPanelButtonHref}>
            {rightPanelButtonText}
          </Link>
        </Button>
      </div>
    </Card>
  );
}