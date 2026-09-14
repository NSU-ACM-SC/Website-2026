"use client";

import React, { useState } from "react";
import { eventsData } from "@/data/eventsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  Flame,
} from "lucide-react";

export const EventCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("October 2026");
  const [selectedEventId, setSelectedEventId] = useState<string>(eventsData[0].id);

  const months = ["September 2026", "October 2026", "November 2026"];

  const activeEvent = eventsData.find((e) => e.id === selectedEventId) || eventsData[0];

  return (
    <section id="calendar" className="py-16 bg-[#f1eee7] border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="EVENT MANAGER & SCHEDULE"
          badgeVariant="blue"
          title="INTERACTIVE EVENT"
          highlightText="CALENDAR"
          highlightColor="orange"
          subtitle="Sync your schedule with our upcoming research workshops, contests, and coding camps."
          alignment="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Month Selector & Schedule List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#000000] space-y-6">
              {/* Calendar Header / Month Toggle */}
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-[#5227FF]" />
                  <span className="font-heading font-black text-lg uppercase text-black">
                    {selectedMonth}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {months.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMonth(m)}
                      className={`px-2.5 py-1 text-[11px] font-display font-black uppercase border border-black transition-colors ${
                        selectedMonth === m
                          ? "bg-black text-white"
                          : "bg-[#f1eee7] text-black hover:bg-black/10"
                      }`}
                    >
                      {m.split(" ")[0].slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Timeline List */}
              <div className="space-y-3">
                {eventsData.map((evt) => {
                  const isSelected = selectedEventId === evt.id;
                  return (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => setSelectedEventId(evt.id)}
                      className={`w-full text-left p-4 border-2 border-black transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? "bg-[#FFDE59] shadow-[4px_4px_0px_0px_#000000] -translate-y-0.5"
                          : "bg-white hover:bg-[#f1eee7] shadow-[2px_2px_0px_0px_#000000]"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-black/80">
                            {evt.date}
                          </span>
                          <span className="bg-black text-white text-[9px] font-display font-black px-1.5 py-0.2 uppercase">
                            {evt.category}
                          </span>
                        </div>
                        <h4 className="font-heading font-black text-base uppercase text-black line-clamp-1">
                          {evt.title}
                        </h4>
                        <div className="text-xs text-black/70 font-display font-bold flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-black" />
                          <span>{evt.time}</span>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-display font-black uppercase border border-black ${
                            evt.status === "Upcoming"
                              ? "bg-[#00D084] text-black"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          {evt.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Event Detailed Dossier */}
          <div className="lg:col-span-6">
            <NeoCard
              variant="default"
              shadow="lg"
              className="p-6 sm:p-8 border-[3px] border-black bg-white space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-4">
                <div className="flex items-center gap-2">
                  <NeoBadge variant="orange" size="sm">
                    {activeEvent.category}
                  </NeoBadge>
                  <span className="text-xs font-mono font-bold text-black/70">
                    ID: {activeEvent.id}
                  </span>
                </div>
                <NeoBadge variant="yellow" size="sm">
                  {activeEvent.status}
                </NeoBadge>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-black text-2xl uppercase text-black leading-tight">
                  {activeEvent.title}
                </h3>
                <p className="text-xs font-display font-extrabold uppercase text-[#5227FF]">
                  {activeEvent.subtitle}
                </p>
                <p className="text-sm font-body text-black/85 leading-relaxed">
                  {activeEvent.description}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#f1eee7] p-4 border-2 border-black text-xs font-display font-bold">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-[#f47b2b]" />
                  <span>Date: {activeEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#5227FF]" />
                  <span>Time: {activeEvent.time}</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#3392cc]" />
                  <span>Venue: {activeEvent.location} ({activeEvent.venueType})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <NeoButton
                  href="https://dash.nsuacmsc.org"
                  isExternal
                  variant="orange"
                  size="md"
                  className="flex-1 text-center"
                >
                  <span>RSVP Seat via Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </NeoButton>

                <button
                  type="button"
                  onClick={() => alert(`Added "${activeEvent.title}" to calendar queue!`)}
                  className="px-4 py-3 bg-white border-2 border-black text-xs font-display font-black uppercase shadow-[3px_3px_0px_0px_#000] hover:bg-[#f1eee7] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>.ICS Sync</span>
                </button>
              </div>
            </NeoCard>
          </div>
        </div>
      </div>
    </section>
  );
};
