"use client";

import React, { useState } from "react";
import {
  MapPin,
  Compass,
  Building2,
  ExternalLink,
  Navigation,
  Clock,
  Mail,
  Phone,
  Layers,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";

const campusSpots = [
  {
    id: "spot-sac402",
    name: "SAC Room 402 (Chapter HQ)",
    building: "South Academic Building (SAC)",
    level: "Level 4",
    purpose: "Executive Office, Member Hub, Weekly SIG Meetings & Advisory Hours",
    hours: "Sunday - Thursday: 10:00 AM - 06:00 PM",
    badge: "Primary HQ",
    color: "#f47b2b",
    coords: { x: "42%", y: "48%" },
  },
  {
    id: "spot-lab605",
    name: "ECE Innovation Lab & Makerspace",
    building: "Civil & ECE Building (NAC)",
    level: "Level 6 & Level 8",
    purpose: "Robotics Hardware Fabrication, IoT Soldering Stations & GPU Compute Cluster",
    hours: "Daily Lab Access for Active Cohorts",
    badge: "Hardware Lab",
    color: "#5227FF",
    coords: { x: "65%", y: "35%" },
  },
  {
    id: "spot-aud801",
    name: "Auditorium 801 & Contest Arena",
    building: "Main Academic Building",
    level: "Level 8",
    purpose: "Flagship Hackathons, Inter-University Contests & International Speaker Seminars",
    hours: "During Scheduled Chapter Events",
    badge: "Event Hall",
    color: "#3392cc",
    coords: { x: "30%", y: "68%" },
  },
];

export const CampusLocationMap: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState(campusSpots[0]);

  return (
    <section id="location" className="py-20 bg-white border-t-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CAMPUS BASE & NAVIGATION"
          badgeVariant="blue"
          title="FIND US ON"
          highlightText="NSU CAMPUS"
          highlightColor="orange"
          subtitle="Explore where we brainstorm, build hardware prototypes, and host national programming contests."
          alignment="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#f1eee7] border-[3px] border-black p-4 shadow-[6px_6px_0px_0px_#000000] relative">
              {/* Map Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-[#f47b2b] animate-spin" />
                  <span className="font-heading font-black text-sm uppercase text-black">
                    NSU BASHUNDHARA CAMPUS GRID
                  </span>
                </div>
                <span className="bg-black text-white font-mono text-xs px-2 py-0.5">
                  23.8151° N, 90.4255° E
                </span>
              </div>

              {/* Stylized Neo-brutalist Map Visualization */}
              <div className="relative aspect-[16/10] bg-[#e4dfd3] border-2 border-black overflow-hidden select-none">
                {/* Grid Lines */}
                <div className="absolute inset-0 bg-neo-grid opacity-60 pointer-events-none" />

                {/* Campus Building Polygons / Blocks */}
                {/* Main Admin Block */}
                <div className="absolute top-[20%] left-[15%] w-[30%] h-[35%] bg-[#d2cbbb] border-2 border-black flex items-center justify-center font-display font-black text-[11px] text-black/70 uppercase">
                  Main Academic Block
                </div>

                {/* SAC Building */}
                <div className="absolute top-[40%] left-[38%] w-[25%] h-[38%] bg-[#c3bcab] border-2 border-black flex items-center justify-center font-display font-black text-[11px] text-black/70 uppercase text-center p-1">
                  SAC Building (HQ)
                </div>

                {/* NAC / ECE Lab Block */}
                <div className="absolute top-[18%] left-[58%] w-[28%] h-[35%] bg-[#b8b09e] border-2 border-black flex items-center justify-center font-display font-black text-[11px] text-black/70 uppercase text-center p-1">
                  NAC (ECE Labs)
                </div>

                {/* Plaza & Courtyard */}
                <div className="absolute bottom-[10%] left-[25%] w-[45%] h-[18%] bg-[#FFDE59]/40 border-2 border-dashed border-black flex items-center justify-center font-display font-black text-[10px] text-black/80 uppercase">
                  Central Plaza / Event Lawn
                </div>

                {/* Interactive Map Markers */}
                {campusSpots.map((spot) => {
                  const isSelected = activeSpot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveSpot(spot)}
                      style={{ top: spot.coords.y, left: spot.coords.x }}
                      aria-label={`Select ${spot.name}`}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-transform ${
                        isSelected ? "scale-125" : "hover:scale-110"
                      }`}
                    >
                      <div
                        className="px-2 py-1 font-display font-black text-[10px] uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000000] text-white whitespace-nowrap flex items-center gap-1"
                        style={{ backgroundColor: spot.color }}
                      >
                        <MapPin className="h-3 w-3 fill-white text-black" />
                        <span>{spot.badge}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Note */}
              <div className="mt-3 flex items-center justify-between text-xs font-display font-bold text-black/80">
                <span>📍 Plot 15, Block B, Bashundhara R/A, Dhaka-1229</span>
                <a
                  href="https://maps.google.com/?q=North+South+University+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-black hover:text-[#f47b2b] uppercase flex items-center gap-1 underline"
                >
                  Open in Google Maps <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Spot Details Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2 mb-2">
              <h3 className="font-heading font-black text-xl uppercase text-black">
                Select Chapter Venue:
              </h3>
              <div className="flex flex-wrap gap-2">
                {campusSpots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveSpot(spot)}
                    className={`px-3 py-1.5 text-xs font-display font-black uppercase border-2 border-black transition-all cursor-pointer ${
                      activeSpot.id === spot.id
                        ? "bg-black text-white shadow-[3px_3px_0px_0px_#f47b2b]"
                        : "bg-white text-black hover:bg-[#f1eee7] shadow-[2px_2px_0px_0px_#000]"
                    }`}
                  >
                    {spot.badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Details Card */}
            <NeoCard
              variant="default"
              shadow="lg"
              className="p-6 border-[3px] border-black bg-white space-y-4"
            >
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <div>
                  <NeoBadge variant="orange" size="sm">
                    {activeSpot.building}
                  </NeoBadge>
                  <h4 className="font-heading font-black text-2xl uppercase text-black mt-1">
                    {activeSpot.name}
                  </h4>
                </div>
                <div className="p-3 bg-black text-white">
                  <Building2 className="h-6 w-6 text-[#FFDE59]" />
                </div>
              </div>

              <div className="space-y-3 font-body text-sm text-black">
                <div>
                  <div className="text-xs font-display font-black uppercase text-black/60 mb-0.5">
                    Floor Level
                  </div>
                  <div className="font-bold">{activeSpot.level}</div>
                </div>

                <div>
                  <div className="text-xs font-display font-black uppercase text-black/60 mb-0.5">
                    Primary Operations
                  </div>
                  <p className="font-medium text-black/85 leading-relaxed">
                    {activeSpot.purpose}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-display font-bold text-black/80 bg-[#f1eee7] p-2.5 border border-black">
                  <Clock className="h-4 w-4 text-[#5227FF] shrink-0" />
                  <span>{activeSpot.hours}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <NeoButton
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                >
                  <span>Book Office Visit</span>
                  <Navigation className="h-4 w-4" />
                </NeoButton>
              </div>
            </NeoCard>
          </div>
        </div>
      </div>
    </section>
  );
};
