import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <div className="text-center px-12">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ÌṢIRÒ Logo"
              width={200}
              height={80}
              className="mx-auto"
            />
          </Link>
          <h1 className="mt-4 text-3xl font-bold font-poppins">
            Welcome to ÌṢIRÒ
          </h1>
          <p className="mt-2 text-muted-foreground">
            The simplest way to manage your business finances.
          </p>
        </div>
      </div>
      <main className="flex items-center justify-center min-h-screen p-4 lg:min-h-0">
        {children}
      </main>
    </div>
  );
}