"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Sparkles,
  ShieldCheck,
  Zap,
  Play,
  Flame,
  Globe2,
  Code2,
} from "lucide-react";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";

export const HeroSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-16 overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-neo-dots opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Floating Badge Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b-2 border-black/20">
          <div className="flex items-center gap-2">
            <NeoBadge variant="orange" size="md" icon={<Flame className="h-3.5 w-3.5" />}>
              CHAPTER CHARTER #92841
            </NeoBadge>
            <span className="hidden sm:inline-block font-display text-xs font-black uppercase text-black/60">
              // ASSOCIATION FOR COMPUTING MACHINERY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-1 text-xs font-display font-black uppercase shadow-[2px_2px_0px_0px_#f47b2b]">
              <span className="h-2 w-2 rounded-full bg-[#00D084] animate-ping" />
              PORTAL LIVE: 2026 EDITION
            </span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-block bg-[#FFDE59] border-2 border-black px-3 py-1 text-xs font-display font-black uppercase shadow-[3px_3px_0px_0px_#000000] rotate-[-1deg]">
                ⚡ NORTH SOUTH UNIVERSITY’S PREMIER TECH CHAPTER
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-black leading-[0.98]">
                CODE. <span className="bg-[#5227FF] text-white px-2 py-0.5 shadow-[4px_4px_0px_0px_#000000] inline-block -rotate-1">RESEARCH.</span> <br />
                <span className="text-[#f47b2b]">DOMINATE.</span> SCALE.
              </h1>
            </div>

            <p className="text-base sm:text-xl text-black font-medium leading-relaxed max-w-2xl font-body">
              NSU ACM Student Chapter is an elite collective of software engineers, AI researchers, competitive algorithmists, and builders. We turn raw curiosity into world-class breakthroughs and international accolades.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <NeoButton
                href="https://dash.nsuacmsc.org"
                isExternal
                variant="orange"
                size="lg"
                className="shadow-[5px_5px_0px_0px_#000000]"
              >
                <span>Join / Login Portal</span>
                <ArrowRight className="h-4 w-4" />
              </NeoButton>

              <NeoButton
                href="/events#showcase"
                variant="secondary"
                size="lg"
                className="shadow-[5px_5px_0px_0px_#000000]"
              >
                <span>Explore Events & HackStorm</span>
                <Zap className="h-4 w-4 text-[#f47b2b]" />
              </NeoButton>
            </div>

            {/* Micro Highlights Pill */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t-2 border-black">
              <div className="p-2.5 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                <div className="font-heading font-black text-xl text-black">1,250+</div>
                <div className="text-[11px] font-display font-extrabold uppercase text-black/70">Engineers</div>
              </div>
              <div className="p-2.5 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                <div className="font-heading font-black text-xl text-[#3392cc]">45+</div>
                <div className="text-[11px] font-display font-extrabold uppercase text-black/70">Papers Published</div>
              </div>
              <div className="p-2.5 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                <div className="font-heading font-black text-xl text-[#5227FF]">5 SIGs</div>
                <div className="text-[11px] font-display font-extrabold uppercase text-black/70">Specialized Wings</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame / Interactive Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Neo-brutalist Window Frame */}
            <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] relative">
              {/* Window Header */}
              <div className="bg-black text-white px-3 py-2 border-b-2 border-black flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#f47b2b] border border-black" />
                  <div className="h-3 w-3 rounded-full bg-[#FFDE59] border border-black" />
                  <div className="h-3 w-3 rounded-full bg-[#00D084] border border-black" />
                </div>
                <div className="text-[11px] font-display font-black tracking-widest text-[#FFDE59] uppercase flex items-center gap-1">
                  <Terminal className="h-3 w-3" />
                  nsu_acm_hero_preview.sh
                </div>
                <div className="text-[10px] text-gray-400 font-mono">LIVE_2026</div>
              </div>

              {/* Window Body with Video / Media Preview */}
              <div className="relative group overflow-hidden bg-black aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80"
                  alt="NSU ACM SC Hackathon and Lab Collaboration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-between p-4">
                  {/* Floating Tag */}
                  <div className="self-start">
                    <span className="bg-[#f47b2b] text-white font-display font-black text-xs px-2 py-1 uppercase border border-black shadow-[2px_2px_0px_0px_#000]">
                      ★ HACKSTORM 2026 KEYNOTE
                    </span>
                  </div>

                  {/* Center Play Indicator */}
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="self-center h-14 w-14 rounded-none bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000000] hover:bg-white hover:scale-110 transition-all cursor-pointer group"
                    aria-label="Play chapter highlight showcase"
                  >
                    <Play className="h-6 w-6 fill-current ml-0.5 text-black" />
                  </button>

                  {/* Bottom Captions */}
                  <div className="bg-black/80 border border-white/20 p-2.5 backdrop-blur-sm">
                    <div className="text-xs font-display font-black uppercase text-white flex items-center justify-between">
                      <span>Inside ECE Makerspace & Lab 402</span>
                      <span className="text-[#00D084] font-mono text-[10px]">● STREAM HD</span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-1">
                      Watch our research leads, competitive coders, and makers build tomorrow.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer status bar */}
              <div className="p-3 bg-[#f1eee7] border-t-2 border-black flex items-center justify-between text-xs font-display font-bold">
                <span className="text-black flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#5227FF]" /> ACM Charter Verified
                </span>
                <Link
                  href="/teams"
                  className="text-black hover:text-[#f47b2b] font-black uppercase flex items-center gap-1 underline"
                >
                  Meet The Board →
                </Link>
              </div>
            </div>

            {/* Decorative Offset Sticker Badge */}
            <div className="absolute -bottom-5 -right-3 hidden sm:block bg-[#5227FF] text-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000000] rotate-3 max-w-[200px]">
              <div className="text-[10px] font-display font-black uppercase tracking-widest text-[#FFDE59]">
                RECOGNITION
              </div>
              <div className="text-xs font-heading font-black">
                Outstanding Chapter Award 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000000] max-w-3xl w-full p-4 relative">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <h3 className="font-heading font-black text-lg uppercase text-black">
                NSU ACM SC Chapter Showcase
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-black text-white px-3 py-1 font-display font-black text-xs uppercase hover:bg-[#f47b2b] cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="aspect-video bg-black border-2 border-black relative overflow-hidden flex items-center justify-center text-white">
              <div className="text-center p-6 space-y-3">
                <Sparkles className="h-12 w-12 text-[#FFDE59] mx-auto animate-bounce" />
                <h4 className="font-heading font-black text-xl uppercase">NSU ACM SC Experience</h4>
                <p className="text-sm text-gray-300 max-w-md font-body">
                  From orientation galas, 36-hour hackathons, to ICPC World Finals training camps. Discover what makes our community unique.
                </p>
                <div className="pt-2">
                  <NeoButton
                    href="/events#gallery"
                    variant="orange"
                    size="sm"
                    onClick={() => setIsVideoModalOpen(false)}
                  >
                    View Photo Gallery
                  </NeoButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
