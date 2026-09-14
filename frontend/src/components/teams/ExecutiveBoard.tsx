"use client";

import React, { useState } from "react";
import { executiveMembers } from "@/data/teamsData";
import { membersData } from "@/data/membersData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import { Mail, ShieldCheck, Users } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

export const ExecutiveBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"executives" | "subteams">("executives");

  // Subteam leads from member directory
  const subteamMembers = membersData.filter(
    (m) => m.team !== "Executive Body" && m.status === "Active"
  );

  return (
    <section id="executives" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="LEADERSHIP & GOVERNANCE"
          badgeVariant="purple"
          title="EXECUTIVE BOARD &"
          highlightText="TEAM ROSTER"
          highlightColor="orange"
          subtitle="Meet the student leaders driving chapter initiatives, SIG research cohorts, and nationwide hackathons for the 2025–2026 tenure."
          alignment="center"
        />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-white border-[3px] border-black p-1 shadow-[4px_4px_0px_0px_#000000] inline-flex gap-1">
            <button
              onClick={() => setActiveTab("executives")}
              className={`px-5 py-2 text-xs sm:text-sm font-display font-black uppercase transition-all cursor-pointer ${
                activeTab === "executives"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#f47b2b]"
                  : "text-black hover:bg-[#f1eee7]"
              }`}
            >
              ★ Executive Committee (2025–2026)
            </button>
            <button
              onClick={() => setActiveTab("subteams")}
              className={`px-5 py-2 text-xs sm:text-sm font-display font-black uppercase transition-all cursor-pointer ${
                activeTab === "subteams"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#5227FF]"
                  : "text-black hover:bg-[#f1eee7]"
              }`}
            >
              ⚡ Sub-Team Leads & Wings
            </button>
          </div>
        </div>

        {/* Executive Cards Grid */}
        {activeTab === "executives" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveMembers.map((exec) => (
              <NeoCard
                key={exec.id}
                variant="default"
                shadow="lg"
                interactive
                className="overflow-hidden flex flex-col justify-between border-[3px] border-black bg-white"
              >
                {/* Photo & Badge Frame */}
                <div className="relative aspect-[4/3] bg-black border-b-[3px] border-black overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={exec.image}
                    alt={exec.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95"
                  />
                  <div className="absolute top-3 left-3">
                    <NeoBadge variant="orange" size="sm">
                      {exec.tenure}
                    </NeoBadge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-xs p-2 border border-white/20">
                    <div className="text-[11px] font-mono text-[#FFDE59]">
                      NSUID: {exec.nsuId}
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-display font-black uppercase text-[#5227FF] mb-1">
                      {exec.department}
                    </div>
                    <h3 className="font-heading font-black text-2xl uppercase text-black">
                      {exec.name}
                    </h3>
                    <div className="inline-block bg-[#FFDE59] border-2 border-black px-2 py-0.5 text-xs font-display font-black uppercase shadow-[2px_2px_0px_0px_#000] mt-1">
                      {exec.role}
                    </div>

                    {exec.quote && (
                      <p className="mt-4 text-xs italic text-black/80 font-body leading-relaxed bg-[#f1eee7] p-3 border-l-4 border-[#f47b2b]">
                        &quot;{exec.quote}&quot;
                      </p>
                    )}
                  </div>

                  {/* Social & Contact Actions */}
                  <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                    <a
                      href={`mailto:${exec.email}`}
                      className="text-xs font-display font-bold text-black/70 hover:text-[#5227FF] flex items-center gap-1"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>{exec.email.split("@")[0]}</span>
                    </a>

                    <div className="flex items-center gap-1.5">
                      {exec.linkedin && (
                        <a
                          href={exec.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${exec.name}'s LinkedIn`}
                          className="p-1.5 bg-black text-white hover:bg-[#3392cc] transition-colors"
                        >
                          <LinkedinIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {exec.github && (
                        <a
                          href={exec.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${exec.name}'s GitHub`}
                          className="p-1.5 bg-black text-white hover:bg-[#f47b2b] transition-colors"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        )}

        {/* Sub-team Leads Roster */}
        {activeTab === "subteams" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subteamMembers.map((member) => (
              <NeoCard
                key={member.id}
                variant="default"
                shadow="md"
                interactive
                className="p-5 border-[3px] border-black bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <NeoBadge variant="blue" size="sm">
                      {member.team}
                    </NeoBadge>
                    <span className="font-mono text-[11px] font-bold text-black/70">
                      ID: {member.nsuId}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-xl uppercase text-black">
                    {member.name}
                  </h3>
                  <div className="text-xs font-display font-extrabold text-[#f47b2b] uppercase mt-0.5">
                    {member.position}
                  </div>

                  <div className="mt-3 bg-[#f1eee7] p-2.5 border border-black text-xs font-display font-bold text-black flex items-center justify-between">
                    <span>SIG Wing:</span>
                    <span className="bg-black text-white px-2 py-0.5 text-[10px]">
                      {member.sig}
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t-2 border-black/15 flex items-center justify-between text-xs font-display font-bold">
                  <span className="text-black/70">{member.nsuEmail}</span>
                  <span className="bg-[#00D084] text-black px-2 py-0.5 text-[10px] font-black uppercase">
                    Active Lead
                  </span>
                </div>
              </NeoCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
