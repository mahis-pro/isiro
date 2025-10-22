"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface AuthFormContainerProps {
  title: string;
  description: string;
  form: React.ReactNode;
}

export function AuthFormContainer({
  title,
  description,
  form,
}: AuthFormContainerProps) {
  return (
    <div className="w-full max-w-sm space-y-6 z-10">
      <div className="text-center">
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
      <Card className="shadow-xl">
        <CardHeader className="text-center p-6 pb-0">
          <CardTitle className="text-3xl font-poppins font-bold">{title}</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          {form}
        </CardContent>
      </Card>
    </div>
  );
}