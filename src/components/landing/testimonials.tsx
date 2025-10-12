"use client";

import { TestimonialCard } from "@/components/landing/testimonial-card";

const testimonials = [
  {
    name: "Aisha Bello",
    role: "Fashion Designer",
    image: "https://i.pravatar.cc/150?img=1",
    quote:
      "ÌṢIRÒ has been a game-changer for my small boutique. I can finally track my sales and expenses without getting lost in complicated spreadsheets. It's simple, intuitive, and beautiful.",
  },
  {
    name: "Tunde Adebayo",
    role: "Artisan Baker",
    image: "https://i.pravatar.cc/150?img=2",
    quote:
      "As a baker, my focus is on creating delicious pastries, not on complex accounting. This app lets me log my daily sales in seconds, so I can spend more time doing what I love.",
  },
  {
    name: "Chioma Nwosu",
    role: "Online Retailer",
    image: "https://i.pravatar.cc/150?img=3",
    quote:
      "The cash flow reports are incredibly helpful. I can see exactly where my money is going and make smarter decisions for my business. I feel more in control of my finances than ever before.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight">
            Trusted by business owners like you
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            See how ÌṢIRÒ is helping small businesses succeed.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}