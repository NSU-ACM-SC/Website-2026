"use client";

import React, { useState } from "react";
import { researchPapers } from "@/data/publicationsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Quote,
  Sparkles,
  Share2,
} from "lucide-react";
import { GithubIcon } from "../ui/SocialIcons";

export const ResearchPaperCards: React.FC = () => {
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  const handleCopyCitation = (paperTitle: string, doi?: string) => {
    const citation = `${paperTitle}. DOI: ${doi || "10.1145/nsuacmsc"}`;
    navigator.clipboard.writeText(citation);
    setCopiedDoi(paperTitle);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <section id="research" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="PEER-REVIEWED SCIENTIFIC OUTPUT"
          badgeVariant="purple"
          title="RESEARCH PAPERS"
          highlightText="SHOWCASE"
          highlightColor="orange"
          subtitle="Undergraduate student-led publications accepted in top ACM, IEEE, and international conference proceedings."
          alignment="center"
        />

        <div className="space-y-8">
          {researchPapers.map((paper) => (
            <NeoCard
              key={paper.id}
              variant="default"
              shadow="lg"
              interactive
              className="p-6 sm:p-8 border-[3px] border-black bg-white space-y-6"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <NeoBadge variant="purple" size="sm">
                    {paper.field}
                  </NeoBadge>
                  <span className="bg-[#FFDE59] border border-black px-2 py-0.5 text-xs font-mono font-bold">
                    {paper.year}
                  </span>
                  {paper.citationsCount && (
                    <span className="bg-[#00D084] text-black border border-black px-2 py-0.5 text-[10px] font-display font-black uppercase">
                      {paper.citationsCount} Citations
                    </span>
                  )}
                </div>

                {paper.doi && (
                  <span className="text-xs font-mono text-black/60 font-bold">
                    DOI: {paper.doi}
                  </span>
                )}
              </div>

              {/* Title & Conference */}
              <div className="space-y-2">
                <h3 className="font-heading font-black text-2xl uppercase text-black leading-tight">
                  {paper.title}
                </h3>
                <div className="text-xs font-display font-extrabold uppercase text-[#5227FF]">
                  🏛 {paper.conference}
                </div>
              </div>

              {/* Authors */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-display font-bold text-black/80">
                <span className="text-black/50 uppercase">Authors:</span>
                {paper.authors.map((author, idx) => (
                  <span
                    key={author}
                    className="bg-[#f1eee7] px-2 py-0.5 border border-black text-black"
                  >
                    {author}
                    {idx < paper.authors.length - 1 ? "" : ""}
                  </span>
                ))}
              </div>

              {/* Abstract */}
              <div className="bg-[#f1eee7]/60 p-4 border-2 border-black">
                <div className="text-xs font-display font-black uppercase text-black/70 mb-1">
                  Abstract & Methodology:
                </div>
                <p className="text-sm font-body text-black/90 leading-relaxed">
                  {paper.abstract}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-black text-white px-2 py-0.5 text-[10px] font-display font-black uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Links Matrix: Title, Author, ResearchGate, Paper Link, GitHub Link */}
              <div className="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {paper.paperUrl && (
                    <a
                      href={paper.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-black text-white hover:bg-[#5227FF] text-xs font-display font-black uppercase flex items-center gap-1.5 border border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                    >
                      <FileText className="h-3.5 w-3.5 text-[#FFDE59]" />
                      <span>Paper PDF / IEEE / ACM DL</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  {paper.researchGateUrl && (
                    <a
                      href={paper.researchGateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#00D084] text-black hover:bg-[#00b070] text-xs font-display font-black uppercase flex items-center gap-1.5 border border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>ResearchGate</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  {paper.githubUrl && (
                    <a
                      href={paper.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#f1eee7] text-black hover:bg-black hover:text-white text-xs font-display font-black uppercase flex items-center gap-1.5 border border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Replication Code</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCitation(paper.title, paper.doi)}
                  className="text-xs font-display font-black uppercase text-black hover:text-[#5227FF] flex items-center gap-1 cursor-pointer underline"
                >
                  <Quote className="h-3.5 w-3.5" />
                  <span>{copiedDoi === paper.title ? "Citation Copied!" : "Cite Paper"}</span>
                </button>
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
