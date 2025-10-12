import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Book, Settings } from "lucide-react";
import { Testimonials } from "@/components/landing/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Image src="/logo.png" alt="ÌṢIRÒ Logo" width={100} height={40} />
        <Button asChild>
          <Link href="/auth/sign-up">Start for Free</Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-32">
          <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Bookkeeping made simple.
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto">
            ÌṢIRÒ is a minimalist bookkeeping web app for small business
            owners. Track your finances, understand your cash flow, and grow
            your business with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="bg-card py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-poppins text-3xl font-bold tracking-tight">
                Everything you need, nothing you don't.
              </h2>
              <p className="mt-4 text-lg text-foreground/70">
                Focus on what matters most—your business.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Book className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-poppins font-medium">Track</h3>
                <p className="mt-2 text-foreground/70">
                  Effortlessly log your sales and expenses in seconds.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-poppins font-medium">Understand</h3>
                <p className="mt-2 text-foreground/70">
                  Visualize your financial health with simple charts and reports.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-poppins font-medium">Grow</h3>
                <p className="mt-2 text-foreground/70">
                  Make informed decisions to scale your business effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-foreground/60">
        <p>&copy; {new Date().getFullYear()} ÌṢIRÒ. Part of the KudiGuard ecosystem.</p>
      </footer>
    </div>
  );
}