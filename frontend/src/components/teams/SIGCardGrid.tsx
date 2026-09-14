"use client";

import React from "react";
import { sigGroups } from "@/data/teamsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  BrainCircuit,
  ShieldAlert,
  Code2,
  Server,
  Cpu,
  Users,
  FolderGit2,
  Clock,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  BrainCircuit,
  ShieldAlert,
  Code2,
  Server,
  Cpu,
};

export const SIGCardGrid: React.FC = () => {
  return (
    <section id="sigs" className="py-16 bg-white border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SPECIALIZED RESEARCH & DEV"
          badgeVariant="blue"
          title="SPECIAL INTEREST"
          highlightText="GROUPS (SIGS)"
          highlightColor="orange"
          subtitle="Explore our 5 technical focus wings where members build production open-source systems, publish papers, and compete nationally."
          alignment="center"
        />

        {/* SIG Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sigGroups.map((sig) => {
            const Icon = iconMap[sig.iconName] || Code2;
            return (
              <NeoCard
                key={sig.id}
                variant="default"
                shadow="lg"
                interactive
                className="p-6 sm:p-8 border-[3px] border-black bg-white flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 bg-black text-white border-2 border-black">
                        <Icon className="h-6 w-6 text-[#FFDE59]" />
                      </div>
                      <div>
                        <span className="font-mono font-black text-xs text-black/70 block">
                          CHAPTER WING
                        </span>
                        <span className="font-heading font-black text-xl uppercase text-black">
                          {sig.shortCode}
                        </span>
                      </div>
                    </div>

                    <NeoBadge variant="yellow" size="sm">
                      {sig.meetingDay}
                    </NeoBadge>
                  </div>

                  <h3 className="font-heading font-black text-2xl uppercase text-black mb-1">
                    {sig.name}
                  </h3>
                  <div className="text-xs font-display font-extrabold uppercase text-[#5227FF] mb-3">
                    {sig.tagline}
                  </div>

                  <p className="text-sm font-body text-black/85 leading-relaxed mb-6">
                    {sig.description}
                  </p>

                  {/* Core Topics Badges */}
                  <div className="mb-6 space-y-2">
                    <div className="text-xs font-display font-black uppercase text-black/70">
                      Core Research & Tech Stack:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sig.topics.map((t) => (
                        <span
                          key={t}
                          className="bg-[#f1eee7] text-black border border-black px-2.5 py-1 text-xs font-display font-bold uppercase shadow-[1px_1px_0px_0px_#000]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Meta & Action */}
                <div className="pt-6 border-t-2 border-black space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs font-display font-bold">
                    <div className="flex items-center gap-1.5 bg-[#f1eee7] p-2 border border-black">
                      <Users className="h-4 w-4 text-[#f47b2b]" />
                      <span>{sig.membersCount} Active Members</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#f1eee7] p-2 border border-black">
                      <FolderGit2 className="h-4 w-4 text-[#5227FF]" />
                      <span>{sig.projectsCount} Public Projects</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="text-xs">
                        <div className="font-display font-black uppercase text-black">
                          Lead: {sig.leadName}
                        </div>
                        <div className="text-[11px] text-black/60 font-body">
                          {sig.leadRole}
                        </div>
                      </div>
                    </div>

                    <NeoButton
                      href="https://dash.nsuacmsc.org/sigs"
                      isExternal
                      variant="orange"
                      size="sm"
                    >
                      <span>Join SIG</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </NeoButton>
                  </div>
                </div>
              </NeoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
