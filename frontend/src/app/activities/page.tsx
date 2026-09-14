import React from "react";
import { Metadata } from "next";
import { EventShowcase } from "@/components/events/EventShowcase";
import { EventCalendar } from "@/components/events/EventCalendar";
import { MasonryGallery } from "@/components/events/MasonryGallery";
import { PressCoverage } from "@/components/events/PressCoverage";

export const metadata: Metadata = {
  title: "Events & Workshops | NSU ACM Student Chapter",
  description: "Explore flagship hackathons like HackStorm 2026, interactive event calendars, photo galleries, and press recognitions.",
};

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Event Showcase & Workshops */}
      <EventShowcase />

      {/* 2. Interactive Event Manager / Calendar Component */}
      <EventCalendar />

      {/* 3. Photo & Video Masonry Gallery */}
      <MasonryGallery />

      {/* 4. Press & Media Coverage */}
      <PressCoverage />
    </div>
  );
}
