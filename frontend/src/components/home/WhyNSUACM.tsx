"use client";

import React from "react";
import {
  Globe,
  Cpu,
  GraduationCap,
  Trophy,
  Rocket,
  Users2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";

const benefits = [
  {
    icon: Globe,
    title: "Global ACM Headquarters Affiliation",
    badge: "International",
    badgeColor: "orange" as const,
    description: "Official chartered status granting unrestricted access to ACM Digital Library, global learning webinars, ACM student research competitions, and international student conferences.",
    metrics: "Access to 700k+ research papers",
  },
  {
    icon: Cpu,
    title: "5 Deep Technical SIG Cohorts",
    badge: "Specialized",
    badgeColor: "purple" as const,
    description: "Hands-on weekly bootcamps in Artificial Intelligence, Cyber Security, Competitive Programming, Distributed Systems & Cloud, and Robotics/IoT.",
    metrics: "50+ open-source repos curated",
  },
  {
    icon: GraduationCap,
    title: "Undergraduate Research Incubation",
    badge: "Peer-Reviewed",
    badgeColor: "blue" as const,
    description: "Direct mentorship with faculty and PhD alumni to author, submit, and present high-impact papers at IEEE, ACM, and ACL indexed global conferences.",
    metrics: "45+ indexed publications",
  },
  {
    icon: Trophy,
    title: "Championship Hackathons & Contests",
    badge: "Nationwide",
    badgeColor: "yellow" as const,
    description: "Organizers of HackStorm, Inter-University Programming Contests, and Capture The Flag tournaments with industry sponsors and six-figure prize pools.",
    metrics: "BDT 1.5M+ total prize grants awarded",
  },
  {
    icon: Rocket,
    title: "Direct Pipeline to Global Tech Giants",
    badge: "Alumni Network",
    badgeColor: "green" as const,
    description: "Our alumni engineer core systems at Google, Meta, Microsoft, Amazon, bKash, Brain Station 23, and pursue fully funded PhDs at top worldwide institutions.",
    metrics: "600+ alumni network in 14 countries",
  },
  {
    icon: Users2,
    title: "Unrivaled Peer Community & Culture",
    badge: "Brotherhood",
    badgeColor: "pink" as const,
    description: "Collaborative, ambitious, and supportive community where hackathon teams form, lifelong friendships ignite, and midnight debugging sessions thrive.",
    metrics: "24/7 active Discord & ECE lab access",
  },
];

export const WhyNSUACM: React.FC = () => {
  return (
    <section id="why-us" className="py-20 relative bg-[#f1eee7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="WHY NSU ACM SC?"
          badgeVariant="orange"
          title="ENGINEERED FOR THE TOP"
          highlightText="1% OF BUILDERS"
          highlightColor="purple"
          subtitle="We don't just study computer science — we build production infrastructure, publish scientific breakthroughs, and dominate national competitions."
          alignment="center"
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <NeoCard
                key={item.title}
                variant="default"
                shadow="md"
                interactive
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-black text-white border-2 border-black">
                      <Icon className="h-6 w-6 text-[#FFDE59]" />
                    </div>
                    <NeoBadge variant={item.badgeColor} size="sm">
                      {item.badge}
                    </NeoBadge>
                  </div>

                  <h3 className="font-heading font-black text-xl uppercase text-black mb-2 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-black/80 font-body leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between">
                  <span className="text-xs font-display font-extrabold text-black/90 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#00D084]" />
                    {item.metrics}
                  </span>
                </div>
              </NeoCard>
            );
          })}
        </div>

        {/* Bottom Banner Box */}
        <div className="mt-12 bg-[#FFDE59] border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-black">
              Ready to elevate your engineering trajectory?
            </h3>
            <p className="text-sm font-body font-medium text-black/80 max-w-xl">
              Membership registration is currently active on our automated student dashboard. Apply for technical or operational wings today.
            </p>
          </div>
          <NeoButton
            href="https://dash.nsuacmsc.org"
            isExternal
            variant="primary"
            size="lg"
            className="shrink-0"
          >
            <span>Launch Student Portal</span>
            <ArrowRight className="h-4 w-4 text-[#FFDE59]" />
          </NeoButton>
        </div>
      </div>
    </section>
  );
};
