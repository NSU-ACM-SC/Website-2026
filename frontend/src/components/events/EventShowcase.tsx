"use client";

import React, { useState } from "react";
import { eventsData } from "@/data/eventsData";
import { EventItem } from "@/types";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Sparkles,
  Flame,
  CheckCircle2,
  Trophy,
} from "lucide-react";

export const EventShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Hackathon", "Workshop", "Contest", "Tech Talk"];

  const filteredEvents = eventsData.filter((event) => {
    if (selectedCategory === "All") return true;
    return event.category === selectedCategory;
  });

  const featuredEvent = eventsData.find((e) => e.category === "Hackathon") || eventsData[0];

  return (
    <section id="showcase" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FLAGSHIP PROGRAMS & WORKSHOPS"
          badgeVariant="orange"
          title="EVENT SHOWCASE &"
          highlightText="WORKSHOPS"
          highlightColor="purple"
          subtitle="From 36-hour non-stop national hackathons to specialized weekend cryptography bootcamps."
          alignment="center"
        />

        {/* Featured Flagship Hackathon Banner */}
        {featuredEvent && (
          <div className="mb-16 bg-white border-[4px] border-black shadow-[10px_10px_0px_0px_#000000] overflow-hidden">
            <div className="bg-[#000000] text-white px-4 py-2 border-b-2 border-black flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f47b2b] animate-ping" />
                <span className="font-display font-black text-xs uppercase tracking-widest text-[#FFDE59]">
                  FLAGSHIP ANNUAL SYMPOSIUM
                </span>
              </div>
              <div className="text-xs font-mono text-gray-300">
                STATUS: REGISTRATION OPEN (382 / 450 REGISTERED)
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Media */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto bg-black border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredEvent.featuredImage}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4">
                  <NeoBadge variant="orange" size="md">
                    {featuredEvent.category}
                  </NeoBadge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 p-3 border border-white/20 backdrop-blur-xs">
                  <div className="text-xs font-display font-black uppercase text-[#FFDE59] flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-[#FFDE59]" />
                    <span>PRIZE POOL: BDT 500,000+ & SEED GRANTS</span>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#f1eee7]/50 space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#5227FF] text-white px-2.5 py-0.5 text-xs font-display font-black uppercase">
                      36 HOURS SPRINT
                    </span>
                    <span className="bg-[#00D084] text-black px-2.5 py-0.5 text-xs font-display font-black uppercase border border-black">
                      HYBRID ARENA
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-black leading-tight">
                    {featuredEvent.title}
                  </h3>

                  <p className="text-sm font-body text-black/85 leading-relaxed">
                    {featuredEvent.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-display font-bold">
                    <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black">
                      <Calendar className="h-4 w-4 text-[#f47b2b]" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black">
                      <Clock className="h-4 w-4 text-[#5227FF]" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-2 bg-white p-2.5 border-2 border-black">
                      <MapPin className="h-4 w-4 text-[#3392cc]" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-display font-bold text-black/70">
                    Host: NSU ACM SC Technical Wing
                  </div>
                  <NeoButton
                    href="https://dash.nsuacmsc.org"
                    isExternal
                    variant="orange"
                    size="md"
                    className="shadow-[4px_4px_0px_0px_#000]"
                  >
                    <span>Register Team via Portal</span>
                    <ExternalLink className="h-4 w-4" />
                  </NeoButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-display font-black uppercase border-2 border-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-[3px_3px_0px_0px_#f47b2b]"
                    : "bg-white text-black hover:bg-[#f1eee7] shadow-[2px_2px_0px_0px_#000]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-display font-black uppercase text-black/70">
            Showing {filteredEvents.length} events
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <NeoCard
              key={event.id}
              variant="default"
              shadow="md"
              interactive
              className="overflow-hidden flex flex-col justify-between border-[3px] border-black bg-white"
            >
              <div>
                {/* Event Image */}
                <div className="relative aspect-[16/9] bg-black border-b-2 border-black overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.featuredImage}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute top-3 left-3">
                    <NeoBadge
                      variant={
                        event.category === "Workshop"
                          ? "purple"
                          : event.category === "Contest"
                          ? "blue"
                          : "orange"
                      }
                      size="sm"
                    >
                      {event.category}
                    </NeoBadge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-display font-black uppercase border border-black ${
                        event.status === "Upcoming"
                          ? "bg-[#00D084] text-black"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-display font-black text-[#5227FF] uppercase">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <h4 className="font-heading font-black text-xl uppercase text-black line-clamp-2">
                      {event.title}
                    </h4>
                  </div>

                  <p className="text-xs font-body text-black/80 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-start gap-1.5 text-xs font-display font-bold text-black/70 bg-[#f1eee7] p-2 border border-black">
                    <MapPin className="h-3.5 w-3.5 text-[#f47b2b] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-black/5 text-black border border-black/30 px-2 py-0.5 text-[10px] font-display font-bold uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Footer Action */}
              <div className="p-6 pt-0 border-t-2 border-black/10 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-display font-bold text-black/60">
                  {event.venueType} Session
                </span>
                <NeoButton
                  href="https://dash.nsuacmsc.org"
                  isExternal
                  variant={event.status === "Upcoming" ? "orange" : "secondary"}
                  size="sm"
                >
                  <span>{event.status === "Upcoming" ? "RSVP Pass" : "View Archive"}</span>
                </NeoButton>
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
