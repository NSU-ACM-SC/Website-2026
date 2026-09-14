"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Users,
  Calendar,
  BookOpen,
  Mail,
  Home,
  Shield,
  Layers,
  Code2,
  MapPin,
  Flame,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "../ui/NeoButton";
import { NeoBadge } from "../ui/NeoBadge";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  dropdown?: {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    dropdown: [
      {
        title: "Overview & Hero",
        description: "Vision, mission & flagship chapter initiatives",
        href: "/#hero",
        icon: Sparkles,
      },
      {
        title: "Quick Metrics & Impact",
        description: "1,250+ active members and nationwide stats",
        href: "/#stats",
        icon: Flame,
      },
      {
        title: "Why NSU ACM SC",
        description: "Global affiliation, mentorship, and career growth",
        href: "/#why-us",
        icon: Shield,
      },
      {
        title: "Campus Location & Map",
        description: "ECE building, labs and innovation makerspace",
        href: "/#location",
        icon: MapPin,
      },
    ],
  },
  {
    label: "Teams & SIGs",
    href: "/teams",
    icon: Users,
    badge: "5 SIGs",
    dropdown: [
      {
        title: "Executive Board",
        description: "Current panel leaders and operational wings",
        href: "/teams#executives",
        icon: Users,
      },
      {
        title: "History & Milestones",
        description: "Over a decade of computing excellence since 2014",
        href: "/teams#history",
        icon: Layers,
      },
      {
        title: "Special Interest Groups (SIGs)",
        description: "AI/ML, CyberSec, Algorithms, Cloud & Robotics",
        href: "/teams#sigs",
        icon: Code2,
      },
    ],
  },
  {
    label: "Members",
    href: "/members",
    icon: Users,
    dropdown: [
      {
        title: "Public Member Directory",
        description: "Verified member roster with live search & filters",
        href: "/members",
        icon: Users,
      },
      {
        title: "Blood Group Registry",
        description: "Life-saving donor matrix filtered by blood group",
        href: "/members?filter=blood",
        icon: Shield,
      },
    ],
  },
  {
    label: "Events",
    href: "/events",
    icon: Calendar,
    badge: "Live",
    dropdown: [
      {
        title: "Workshops & Hackathons",
        description: "HackStorm 2026 and expert-led bootcamps",
        href: "/events#showcase",
        icon: Calendar,
      },
      {
        title: "Interactive Calendar",
        description: "Live schedule, registration links and timelines",
        href: "/events#calendar",
        icon: Flame,
      },
      {
        title: "Photo & Video Masonry",
        description: "Visual moments from contests and orientation galas",
        href: "/events#gallery",
        icon: Sparkles,
      },
      {
        title: "Press & Media",
        description: "National newspapers and conference recognitions",
        href: "/events#press",
        icon: FileText,
      },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    icon: BookOpen,
    dropdown: [
      {
        title: "Research Papers",
        description: "IEEE & ACM indexed undergraduate publications",
        href: "/publications#research",
        icon: BookOpen,
      },
      {
        title: "Project Portfolio",
        description: "Open-source tools, repositories and platforms",
        href: "/publications#projects",
        icon: Code2,
      },
      {
        title: "Tech Blogs & Tutorials",
        description: "In-depth engineering write-ups by members",
        href: "/publications#blogs",
        icon: FileText,
      },
      {
        title: "Chronicle PDF Magazines",
        description: "Download official biannual club magazines",
        href: "/publications#magazines",
        icon: Layers,
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
    dropdown: [
      {
        title: "FAQ Center",
        description: "Answers to recruitment, eligibility & SIG inquiries",
        href: "/contact#faqs",
        icon: BookOpen,
      },
      {
        title: "Newsletter Dispatch",
        description: "Bi-weekly tech insights and event announcements",
        href: "/contact#newsletter",
        icon: Mail,
      },
      {
        title: "Direct Contact Form",
        description: "Reach the executive committee or sponsorship team",
        href: "/contact#form",
        icon: Sparkles,
      },
    ],
  },
];

export const PillNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top Banner Alert / Ticker */}
      <div className="bg-[#000000] text-white py-1.5 px-4 text-xs font-display font-bold uppercase tracking-wider flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="bg-[#f47b2b] text-white px-2 py-0.2 text-[10px] font-black uppercase inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            REGISTRATION OPEN
          </span>
          <span className="truncate">
            🚀 NSU ACM HackStorm 2026: 36-Hour National Hackathon — Prize Pool BDT 500,000+!
          </span>
        </div>
        <a
          href="https://dash.nsuacmsc.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-[#FFDE59] hover:underline font-black text-xs shrink-0"
        >
          RSVP via Portal <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Floating Pill Nav Container */}
      <header className="sticky top-3 z-50 w-full px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto max-w-7xl mx-auto transition-all duration-300",
            isScrolled ? "translate-y-0" : "translate-y-1"
          )}
        >
          <div className="bg-[#ffffff] border-[3px] border-[#000000] shadow-[5px_5px_0px_0px_#000000] px-3 sm:px-5 py-2.5 flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="h-10 w-10 bg-[#000000] text-white flex items-center justify-center font-heading font-black text-xl border-2 border-black group-hover:bg-[#f47b2b] group-hover:text-white transition-colors">
                ACM
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg sm:text-xl tracking-tighter leading-none text-black">
                  NSU ACM SC
                </span>
                <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-[#5227FF]">
                  Student Chapter
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3.5 py-2 text-xs font-display font-black uppercase tracking-wider flex items-center gap-1.5 transition-all border-2",
                        isActive
                          ? "bg-[#000000] text-white border-[#000000] shadow-[2px_2px_0px_0px_#f47b2b]"
                          : "border-transparent text-black hover:border-black hover:bg-[#f1eee7] hover:shadow-[2px_2px_0px_0px_#000000]"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-200",
                            activeDropdown === item.label ? "rotate-180" : ""
                          )}
                        />
                      )}
                      {item.badge && (
                        <span className="ml-0.5 bg-[#f47b2b] text-white text-[9px] px-1 py-0.2 font-black">
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.dropdown && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                        <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000000] p-2 space-y-1">
                          {item.dropdown.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="flex items-start gap-2.5 p-2 hover:bg-[#f1eee7] border border-transparent hover:border-black transition-colors group"
                              >
                                <div className="p-1.5 bg-black text-white group-hover:bg-[#5227FF] transition-colors shrink-0 mt-0.5">
                                  <SubIcon className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <div className="text-xs font-display font-black uppercase text-black group-hover:text-[#5227FF]">
                                    {subItem.title}
                                  </div>
                                  <div className="text-[11px] text-black/70 font-medium line-clamp-1">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Header Right CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <NeoButton
                href="https://dash.nsuacmsc.org"
                isExternal
                variant="orange"
                size="sm"
                className="shadow-[3px_3px_0px_0px_#000000]"
              >
                <span>Login / Join Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </NeoButton>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="https://dash.nsuacmsc.org"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden bg-[#f47b2b] text-white border-2 border-black px-2 py-1 text-xs font-display font-black uppercase shadow-[2px_2px_0px_0px_#000]"
              >
                Portal
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 bg-[#ffffff] border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:bg-[#f1eee7] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-black" />
                ) : (
                  <Menu className="h-5 w-5 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto lg:hidden max-w-7xl mx-auto mt-2">
            <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] p-4 max-h-[80vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-heading font-black text-sm uppercase">Menu Navigation</span>
                <NeoBadge variant="purple" size="sm">NSU ACM SC</NeoBadge>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.label} className="border-2 border-black bg-[#f1eee7]/50 p-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-display font-black text-sm uppercase text-black flex items-center gap-2 hover:text-[#5227FF]"
                      >
                        <item.icon className="h-4 w-4 text-[#f47b2b]" />
                        <span>{item.label}</span>
                      </Link>
                      {item.badge && (
                        <span className="bg-[#f47b2b] text-white text-[10px] px-1.5 py-0.5 font-black">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {item.dropdown && (
                      <div className="pl-6 space-y-1.5 border-l-2 border-black/30 mt-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs font-bold text-black/80 hover:text-[#5227FF] py-0.5"
                          >
                            → {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t-2 border-black space-y-2">
                <NeoButton
                  href="https://dash.nsuacmsc.org"
                  isExternal
                  variant="orange"
                  size="md"
                  className="w-full text-center"
                >
                  <span>Login / Join Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </NeoButton>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
