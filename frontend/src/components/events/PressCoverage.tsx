"use client";

import React from "react";
import { pressItems } from "@/data/eventsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { Newspaper, ExternalLink, Award } from "lucide-react";

export const PressCoverage: React.FC = () => {
  return (
    <section id="press" className="py-16 bg-[#f1eee7] border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="MEDIA & RECOGNITIONS"
          badgeVariant="orange"
          title="PRESS & MEDIA"
          highlightText="COVERAGE"
          highlightColor="blue"
          subtitle="How leading national newspapers and tech journals chronicle NSU ACM SC’s computational footprint."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressItems.map((item) => (
            <NeoCard
              key={item.id}
              variant="default"
              shadow="md"
              interactive
              className="p-6 border-[3px] border-black bg-white flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Newspaper className="h-4 w-4 text-[#f47b2b]" />
                    <span className="font-display font-black text-xs uppercase text-black">
                      {item.outlet}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-black/60 font-bold">
                    {item.date}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl uppercase text-black leading-tight">
                  {item.headline}
                </h3>

                <p className="text-xs font-body text-black/80 leading-relaxed">
                  {item.snippet}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t-2 border-black flex items-center justify-between">
                <NeoBadge variant="yellow" size="sm">
                  Featured News
                </NeoBadge>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-display font-black uppercase text-black hover:text-[#5227FF] flex items-center gap-1 underline"
                >
                  <span>Read Article</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
