"use client";

import React, { useState } from "react";
import { galleryMedia } from "@/data/eventsData";
import { GalleryMedia } from "@/types";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoBadge } from "../ui/NeoBadge";
import { Sparkles, Maximize2, X, Camera } from "lucide-react";

export const MasonryGallery: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState<GalleryMedia | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "Hackathon", "Workshop", "Contest", "Social", "Hardware"];

  const filteredMedia = galleryMedia.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="gallery" className="py-16 bg-white border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CHAPTER MEMORIES & MOMENTS"
          badgeVariant="purple"
          title="PHOTO & VIDEO"
          highlightText="MASONRY GALLERY"
          highlightColor="yellow"
          subtitle="Glimpses from late-night hackathons, competitive arena podiums, research seminars, and student galas."
          alignment="center"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 text-xs font-display font-black uppercase border-2 border-black transition-all cursor-pointer ${
                selectedFilter === cat
                  ? "bg-black text-white shadow-[3px_3px_0px_0px_#5227FF]"
                  : "bg-white text-black hover:bg-[#f1eee7] shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              onClick={() => setActiveMedia(media)}
              className="group relative bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_0px_#000000] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000000] transition-all"
            >
              <div className="aspect-[4/3] bg-black overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.imageUrl}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                  <div className="self-end">
                    <span className="p-1.5 bg-black text-white border border-white inline-block">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="text-white space-y-1">
                    <span className="bg-[#f47b2b] text-white px-2 py-0.5 text-[10px] font-display font-black uppercase inline-block">
                      {media.category} • {media.year}
                    </span>
                    <h4 className="font-heading font-black text-sm uppercase">
                      {media.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="p-3 bg-white border-t-2 border-black flex items-center justify-between">
                <span className="font-display font-black text-xs uppercase text-black truncate max-w-[200px]">
                  {media.title}
                </span>
                <span className="text-[10px] font-mono text-black/70 font-bold bg-[#f1eee7] px-2 py-0.5 border border-black">
                  {media.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000000] max-w-4xl w-full p-4 relative space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-[#f47b2b]" />
                <h3 className="font-heading font-black text-lg uppercase text-black">
                  {activeMedia.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                className="bg-black text-white px-3 py-1 font-display font-black text-xs uppercase hover:bg-[#f47b2b] cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="aspect-[16/10] bg-black border-2 border-black overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeMedia.imageUrl}
                alt={activeMedia.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 bg-[#f1eee7] border-2 border-black flex flex-wrap items-center justify-between gap-2 text-xs font-display font-bold">
              <span>{activeMedia.description}</span>
              <NeoBadge variant="purple" size="sm">{activeMedia.category}</NeoBadge>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
