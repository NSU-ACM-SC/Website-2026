"use client";

import React, { useState } from "react";
import { projectPortfolio } from "@/data/publicationsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  FolderGit2,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "../ui/SocialIcons";

export const ProjectPortfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Web & Cloud",
    "AI & ML",
    "CyberSec & Systems",
    "Robotics & IoT",
  ];

  const filteredProjects = projectPortfolio.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-16 bg-[#f1eee7] border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OPEN SOURCE & SYSTEMS"
          badgeVariant="orange"
          title="PROJECT PORTFOLIO"
          highlightText="CARDS"
          highlightColor="blue"
          subtitle="Software utilities, decentralized protocols, and embedded hardware tools engineered by chapter cohorts."
          alignment="center"
        />

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <NeoCard
              key={project.id}
              variant="default"
              shadow="lg"
              interactive
              className="p-6 sm:p-8 border-[3px] border-black bg-white flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <NeoBadge
                      variant={
                        project.category === "AI & ML"
                          ? "purple"
                          : project.category === "CyberSec & Systems"
                          ? "orange"
                          : project.category === "Robotics & IoT"
                          ? "green"
                          : "blue"
                      }
                      size="sm"
                    >
                      {project.category}
                    </NeoBadge>
                    {project.featured && (
                      <span className="bg-[#FFDE59] text-black border border-black px-2 py-0.5 text-[10px] font-display font-black uppercase">
                        ★ Flagship
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono font-bold text-black/70">
                    {project.stars && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-[#f47b2b] text-[#f47b2b]" />
                        {project.stars}
                      </span>
                    )}
                    {project.forks && (
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {project.forks}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-heading font-black text-2xl uppercase text-black leading-tight">
                  {project.title}
                </h3>

                <p className="text-sm font-body text-black/85 leading-relaxed">
                  {project.description}
                </p>

                {/* Authors */}
                <div className="text-xs font-display font-bold text-black/80 flex items-center gap-1.5 bg-[#f1eee7] p-2 border border-black">
                  <span className="text-black/60 uppercase">Engineers:</span>
                  <span>{project.authors.join(" • ")}</span>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black text-white px-2 py-0.5 text-[10px] font-display font-black uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-6 mt-6 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black text-white hover:bg-[#5227FF] text-xs font-display font-black uppercase flex items-center gap-1.5 border border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-[#FFDE59]" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FFDE59] text-black hover:bg-white text-xs font-display font-black uppercase flex items-center gap-1.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
