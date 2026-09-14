"use client";

import React, { useState } from "react";
import { magazineIssues } from "@/data/publicationsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  Download,
  BookOpen,
  Calendar,
  Layers,
  FileCheck,
  CheckCircle2,
  Eye,
} from "lucide-react";

export const MagazineShowcase: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (issueTitle: string) => {
    setDownloadSuccess(issueTitle);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="magazines" className="py-16 bg-[#f1eee7] border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OFFICIAL BIANNUAL PUBLICATIONS"
          badgeVariant="purple"
          title="NSU ACM CHRONICLE"
          highlightText="PDF MAGAZINES"
          highlightColor="yellow"
          subtitle="Curated club chronicles featuring faculty keynotes, hackathon retrospectives, research guides, and alumni hall of fame."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {magazineIssues.map((issue) => (
            <NeoCard
              key={issue.id}
              variant="default"
              shadow="lg"
              interactive
              className="p-6 border-[3px] border-black bg-white flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Magazine Visual Cover */}
                <div className="relative aspect-[3/4] bg-black border-2 border-black overflow-hidden group shadow-[4px_4px_0px_0px_#000]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={issue.coverImage}
                    alt={issue.issueTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3">
                    <NeoBadge variant="orange" size="sm">
                      {issue.edition}
                    </NeoBadge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/90 p-3 border border-white/20">
                    <div className="text-[10px] font-mono text-[#FFDE59] uppercase">
                      Featured Cover Story:
                    </div>
                    <div className="text-xs font-heading font-black uppercase text-white line-clamp-1">
                      {issue.featuredArticle}
                    </div>
                  </div>
                </div>

                {/* Title & Metadata */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-black/70">
                    <span>{issue.publishDate}</span>
                    <span>{issue.pagesCount} Pages • {issue.fileSize}</span>
                  </div>
                  <h3 className="font-heading font-black text-xl uppercase text-black leading-tight">
                    {issue.issueTitle}
                  </h3>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-black/15">
                  <div className="text-xs font-display font-black uppercase text-black/70">
                    Edition Highlights:
                  </div>
                  <ul className="space-y-1">
                    {issue.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-xs font-body text-black/85 flex items-start gap-1.5"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00D084] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Download CTA Button */}
              <div className="pt-6 mt-6 border-t-2 border-black space-y-2">
                <button
                  type="button"
                  onClick={() => handleDownload(issue.issueTitle)}
                  className="w-full py-3 bg-[#000000] text-white hover:bg-[#5227FF] text-xs font-display font-black uppercase shadow-[3px_3px_0px_0px_#f47b2b] hover:shadow-[4px_4px_0px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer border border-black"
                >
                  <Download className="h-4 w-4 text-[#FFDE59]" />
                  <span>Download PDF ({issue.fileSize})</span>
                </button>

                {downloadSuccess === issue.issueTitle && (
                  <div className="text-[11px] font-display font-black uppercase text-center text-[#00D084] bg-black p-1 border border-black">
                    ✓ PDF download started successfully!
                  </div>
                )}
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
