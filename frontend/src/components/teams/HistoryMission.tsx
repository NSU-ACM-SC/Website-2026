"use client";

import React from "react";
import { clubMilestones } from "@/data/teamsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { Flag, Sparkles, Target, Compass, Award } from "lucide-react";

export const HistoryMission: React.FC = () => {
  return (
    <section id="history" className="py-16 bg-[#f1eee7] border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="DECADE OF EXCELLENCE"
          badgeVariant="orange"
          title="OUR MISSION &"
          highlightText="LEGACY (2014–2026)"
          highlightColor="purple"
          subtitle="How an undergraduate student chapter evolved into one of South Asia’s most prolific student computing organizations."
          alignment="center"
        />

        {/* Mission & Vision Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <NeoCard
            variant="default"
            shadow="lg"
            className="p-8 border-[3px] border-black bg-white space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#5227FF] text-white border-2 border-black">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <NeoBadge variant="purple" size="sm">CORE PURPOSE</NeoBadge>
                <h3 className="font-heading font-black text-2xl uppercase text-black mt-1">
                  Our Mission
                </h3>
              </div>
            </div>
            <p className="text-base text-black/85 font-body leading-relaxed">
              To cultivate an uncompromising engineering ecosystem at North South University that bridges theoretical academia with breakthrough industry practice. We empower every student to build open-source tools, conduct ethical scientific inquiry, and represent Bangladesh in global computational frontiers.
            </p>
          </NeoCard>

          <NeoCard
            variant="default"
            shadow="lg"
            className="p-8 border-[3px] border-black bg-white space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#f47b2b] text-white border-2 border-black">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <NeoBadge variant="orange" size="sm">THE 2030 HORIZON</NeoBadge>
                <h3 className="font-heading font-black text-2xl uppercase text-black mt-1">
                  Our Vision
                </h3>
              </div>
            </div>
            <p className="text-base text-black/85 font-body leading-relaxed">
              To stand as a globally recognized student research hub and innovation incubator producing world-class systems engineers, ICPC champions, and high-impact technology founders who engineer solutions for societal challenges.
            </p>
          </NeoCard>
        </div>

        {/* Timeline Breakdown */}
        <div id="achievements" className="relative scroll-mt-28">
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-6 w-6 text-[#f47b2b]" />
            <h3 className="font-heading font-black text-2xl uppercase text-black">
              Key Chapter Milestones
            </h3>
          </div>

          <div className="space-y-6">
            {clubMilestones.map((milestone, idx) => (
              <div
                key={milestone.year}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-white border-[3px] border-black p-6 shadow-[5px_5px_0px_0px_#000000] hover:-translate-y-0.5 transition-transform"
              >
                <div className="md:col-span-3 flex items-center gap-3">
                  <div className="h-10 w-10 bg-black text-white flex items-center justify-center font-display font-black text-sm border-2 border-black">
                    0{idx + 1}
                  </div>
                  <span className="font-heading font-black text-3xl uppercase text-[#f47b2b]">
                    {milestone.year}
                  </span>
                </div>

                <div className="md:col-span-9 space-y-2">
                  <h4 className="font-heading font-black text-xl uppercase text-black">
                    {milestone.title}
                  </h4>
                  <p className="text-sm font-body text-black/80 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
