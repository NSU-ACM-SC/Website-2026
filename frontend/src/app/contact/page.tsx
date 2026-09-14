import React from "react";
import { Metadata } from "next";
import { FAQAccordion } from "@/components/contact/FAQAccordion";
import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Community | NSU ACM Student Chapter",
  description: "Get in touch with executive officers, explore recruitment FAQs, subscribe to technical dispatches, or book office visits.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Contact Form & Direct Headquarters Base */}
      <ContactForm />

      {/* 2. FAQ Accordion with Search & Category Tabs */}
      <FAQAccordion />

      {/* 3. Newsletter Subscription Component */}
      <section className="py-16 bg-[#f1eee7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSubscribe />
        </div>
      </section>
    </div>
  );
}
