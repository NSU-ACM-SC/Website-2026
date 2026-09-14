"use client";

import React from "react";
import Link from "next/link";
import { chapterEmail, chapterSocialLinks } from "@/data/contactData";
import {
  MessageSquare,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Terminal,
} from "lucide-react";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  YoutubeIcon,
} from "../ui/SocialIcons";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t-[4px] border-black bg-black text-white relative">
      {/* Top Graphic Banner */}
      <div className="bg-[#f47b2b] text-black py-3 px-4 border-b-2 border-black flex flex-wrap items-center justify-between gap-4 font-display font-black text-xs uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="bg-black text-white px-2 py-0.5 text-[11px]">AFFILIATION</span>
          <span>Association for Computing Machinery (ACM) • Chapter #92841</span>
        </div>
        <div className="flex items-center gap-4">
          <span>DHAKA, BANGLADESH</span>
          <span>EST. 2014</span>
          <span>DEPT. OF ECE, NSU</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-[#5227FF] text-white flex items-center justify-center font-heading font-black text-2xl border-2 border-white shadow-[3px_3px_0px_0px_#ffffff]">
                ACM
              </div>
              <div>
                <h3 className="font-heading font-black text-2xl tracking-tight text-white">
                  NSU ACM SC
                </h3>
                <p className="text-xs font-display font-bold uppercase tracking-widest text-[#FFDE59]">
                  North South University Student Chapter
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 font-body leading-relaxed max-w-sm">
              The premier student-led computing and engineering community in Bangladesh. Fostering research, open-source innovation, competitive programming, and high-impact industry careers since 2014.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <NeoBadge variant="orange" size="sm">#Innovation</NeoBadge>
              <NeoBadge variant="blue" size="sm">#Research</NeoBadge>
              <NeoBadge variant="purple" size="sm">#OpenSource</NeoBadge>
              <NeoBadge variant="yellow" size="sm">#ICPC</NeoBadge>
            </div>

            {/* Social Matrix */}
            <div className="pt-3">
              <div className="text-xs font-display font-black uppercase text-gray-400 mb-2">Connect Channels</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: GithubIcon, label: "GitHub", href: chapterSocialLinks.GitHub },
                  { icon: LinkedinIcon, label: "LinkedIn", href: chapterSocialLinks.LinkedIn },
                  { icon: FacebookIcon, label: "Facebook", href: chapterSocialLinks.Facebook },
                  { icon: MessageSquare, label: "Discord", href: "https://discord.gg/nsuacmsc" },
                  { icon: YoutubeIcon, label: "YouTube", href: chapterSocialLinks.YouTube },
                  { icon: Mail, label: "Email", href: `mailto:${chapterEmail}` },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="p-2 bg-[#1f1f1f] text-white hover:bg-[#f47b2b] hover:text-black border border-gray-700 hover:border-black transition-all shadow-[2px_2px_0px_0px_#3392cc]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-[#FFDE59] border-b border-gray-800 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm font-display font-bold">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#f47b2b] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#f47b2b]" /> Home Overview
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-gray-300 hover:text-[#f47b2b] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#f47b2b]" /> Executive Board
                </Link>
              </li>
              <li>
                <Link href="/teams#sigs" className="text-gray-300 hover:text-[#f47b2b] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#f47b2b]" /> Special Interest Groups
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-gray-300 hover:text-[#f47b2b] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#f47b2b]" /> Member Directory
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-gray-300 hover:text-[#f47b2b] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#f47b2b]" /> Blood Donors Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Activities */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-[#3392cc] border-b border-gray-800 pb-2">
              Activities
            </h4>
            <ul className="space-y-2 text-sm font-display font-bold">
              <li>
                <Link href="/events#showcase" className="text-gray-300 hover:text-[#3392cc] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#3392cc]" /> HackStorm 2026
                </Link>
              </li>
              <li>
                <Link href="/events#calendar" className="text-gray-300 hover:text-[#3392cc] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#3392cc]" /> Workshop Calendar
                </Link>
              </li>
              <li>
                <Link href="/publications#research" className="text-gray-300 hover:text-[#3392cc] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#3392cc]" /> Research Papers
                </Link>
              </li>
              <li>
                <Link href="/publications#projects" className="text-gray-300 hover:text-[#3392cc] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#3392cc]" /> Project Repositories
                </Link>
              </li>
              <li>
                <Link href="/publications#magazines" className="text-gray-300 hover:text-[#3392cc] flex items-center gap-1.5 transition-colors">
                  <ArrowUpRight className="h-3 w-3 text-[#3392cc]" /> Chronicle Magazine PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Coordinates & Portal */}
          <div className="space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-[#5227FF] border-b border-gray-800 pb-2">
              Campus Base
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300 font-body">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#f47b2b] shrink-0 mt-0.5" />
                <span>Room SAC 402 & ECE Innovation Lab, North South University, Plot 15, Block B, Bashundhara R/A, Dhaka-1229</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#3392cc] shrink-0" />
                <a href={`mailto:${chapterEmail}`} className="break-all hover:underline">{chapterEmail}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#5227FF] shrink-0" />
                <span>+880 2 55668200 (Ext. 1542)</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[#00D084] shrink-0" />
                <span>dash.nsuacmsc.org</span>
              </div>
            </div>

            <div className="pt-2">
              <NeoButton
                href="https://dash.nsuacmsc.org"
                isExternal
                variant="orange"
                size="sm"
                className="w-full text-center"
              >
                Access Portal
              </NeoButton>
            </div>
          </div>
        </div>

        {/* Bottom Matrix */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-display text-gray-400">
          <div>
            © 2014 - 2026 NSU ACM Student Chapter. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact#faqs" className="hover:text-white transition-colors">
              Privacy & Constitution
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Press Inquiries
            </Link>
            <span>•</span>
            <a href="https://acm.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              ACM Global HQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
