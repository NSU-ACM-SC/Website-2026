"use client";

import React from "react";
import { techBlogs } from "@/data/publicationsData";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoCard } from "../ui/NeoCard";
import { NeoBadge } from "../ui/NeoBadge";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";

export const TechBlogGrid: React.FC = () => {
  return (
    <section id="blogs" className="py-16 bg-white border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="ENGINEERING DISPATCHES"
          badgeVariant="blue"
          title="TECH BLOGS &"
          highlightText="TUTORIALS"
          highlightColor="orange"
          subtitle="Deep-dive architectural breakdowns, competitive algorithm strategies, and reverse engineering walk-throughs."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techBlogs.map((blog) => (
            <NeoCard
              key={blog.id}
              variant="default"
              shadow="md"
              interactive
              className="overflow-hidden flex flex-col justify-between border-[3px] border-black bg-white"
            >
              <div>
                <div className="relative aspect-[16/10] bg-black border-b-2 border-black overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute top-3 left-3">
                    <NeoBadge variant="yellow" size="sm">
                      {blog.tags[0]}
                    </NeoBadge>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black text-white px-2 py-0.5 text-[10px] font-mono">
                    {blog.readTime}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-black/60 font-bold">
                    <Calendar className="h-3.5 w-3.5 text-[#f47b2b]" />
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="font-heading font-black text-xl uppercase text-black leading-tight line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs font-body text-black/80 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/10">
                    <div className="text-xs font-display font-bold text-black">
                      By <span className="font-black">{blog.author.name}</span> ({blog.author.role})
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t-2 border-black/10 mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {blog.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] font-mono text-black/70">
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Opening blog: "${blog.title}"`)}
                  className="text-xs font-display font-black uppercase text-black hover:text-[#5227FF] flex items-center gap-1 cursor-pointer underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
