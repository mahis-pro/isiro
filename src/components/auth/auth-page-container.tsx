import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Zap } from "lucide-react"; // For the lightning bolt icon

interface AuthPageContainerProps {
  title: string;
  description: string;
  form: React.ReactNode;
  rightPanelImageSrc?: string; // Path to the image for the right panel
}

export function AuthPageContainer({
  title,
  description,
  form,
  rightPanelImageSrc,
}: AuthPageContainerProps) {
  return (
    <Card className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl flex flex-col lg:flex-row min-h-[500px] z-10"> {/* Added z-10 to ensure it's above background shapes */}
      {/* Left Panel (Form) */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <CardHeader className="text-center p-0 mb-6">
          <CardTitle className="text-4xl font-poppins font-bold uppercase">{title}</CardTitle> {/* Increased size, uppercase */}
          <CardDescription className="mt-2 text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {form}
        </CardContent>
      </div>

      {/* Right Panel (Image) */}
      <div
        className={cn(
          "w-full lg:w-1/2 p-8 flex flex-col items-center justify-center text-center text-primary-foreground relative",
          "bg-[hsl(var(--auth-panel-bg))] rounded-r-xl lg:rounded-l-none rounded-b-xl lg:rounded-b-none" // Apply specific purple background and rounded corners
        )}
      >
        {/* Wavy pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/wavy-pattern.svg')", backgroundSize: 'cover' }}></div>

        <div className="relative w-full max-w-[350px] h-[350px] rounded-2xl overflow-hidden shadow-lg z-10">
          {rightPanelImageSrc && (
            <Image
              src={rightPanelImageSrc}
              alt="Product Value"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          )}
          {/* Lightning bolt icon */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-full shadow-md">
            <Zap className="h-6 w-6 text-accent" /> {/* Using existing accent for yellow */}
          </div>
        </div>
      </div>
    </Card>
  );
}