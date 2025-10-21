import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionContextProvider } from "@/contexts/session-context";
import { Toaster } from "@/components/ui/sonner"; // Import Toaster

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ÌṢIRÒ - Bookkeeping made simple",
  description: "A minimalist bookkeeping web app for small business owners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontPoppins.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionContextProvider>
            {children}
          </SessionContextProvider>
          <Toaster /> {/* Moved Toaster here */}
        </ThemeProvider>
      </body>
    </html>
  );
}