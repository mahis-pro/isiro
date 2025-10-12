"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, absolutely. We prioritize your data's security. All data is encrypted in transit and at rest. We do not share your financial information with third parties.",
  },
  {
    question: "Who is ÌṢIRÒ for?",
    answer:
      "ÌṢIRÒ is designed specifically for small business owners, freelancers, artisans, and vendors who need a simple, no-fuss way to track their finances without complex accounting software.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes. You can export your financial reports as PDFs, allowing you to easily share them with your accountant or keep them for your records.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "While we don't have a native mobile app yet, ÌṢIRÒ is fully responsive and works beautifully on any device, so you can manage your business finances on the go from your phone's web browser.",
  },
];

export function Faq() {
  return (
    <section className="bg-card py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Have questions? We've got answers.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}