import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickStats } from "@/components/home/QuickStats";
import { WhyNSUACM } from "@/components/home/WhyNSUACM";
import { CampusLocationMap } from "@/components/home/CampusLocationMap";
import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Quick Metrics / Stats */}
      <QuickStats />

      {/* 3. Why NSU ACM SC Section */}
      <WhyNSUACM />

      {/* 4. Interactive Map / Campus Location */}
      <CampusLocationMap />

      {/* 5. Newsletter & Call to Action */}
      <section className="py-16 bg-[#f1eee7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSubscribe />
        </div>
      </section>
    </div>
  );
}
