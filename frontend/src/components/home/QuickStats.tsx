"use client";

import React from "react";
import { statsData } from "@/data/statsData";
import { NeoBadge } from "../ui/NeoBadge";
import { Users, Calendar, BookOpen, Trophy, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const iconMap = {
  "stat-members": Users,
  "stat-events": Calendar,
  "stat-papers": BookOpen,
  "stat-alumni": Trophy,
};

export const QuickStats: React.FC = () => {
  return (
    <section id="stats" className="py-12 border-y-[3px] border-black bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <NeoBadge variant="blue" size="sm">
              REAL-TIME IMPACT METRICS
            </NeoBadge>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase text-black mt-2">
              NUMBERS THAT DEFINE OUR <span className="bg-[#f47b2b] text-white px-2 py-0.5">SCALE</span>
            </h2>
          </div>
          <Link
            href="/members"
            className="text-xs font-display font-black uppercase text-black hover:text-[#5227FF] flex items-center gap-1 self-start md:self-auto border-b-2 border-black pb-0.5"
          >
            Explore Public Roster <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => {
            const Icon = iconMap[stat.id as keyof typeof iconMap] || Users;
            return (
              <div
                key={stat.id}
                className="bg-[#f1eee7] border-[3px] border-black p-6 shadow-[5px_5px_0px_0px_#000000] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000000] transition-all"
              >
                {/* Decorative Top Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-black text-white border-2 border-black group-hover:bg-[#5227FF] transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="bg-white text-black border-2 border-black px-2 py-0.5 text-[10px] font-display font-black uppercase shadow-[2px_2px_0px_0px_#000]">
                    {stat.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-heading text-4xl sm:text-5xl font-black text-black tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-display text-sm font-black uppercase text-black tracking-wide">
                    {stat.label}
                  </div>
                  <p className="text-xs text-black/70 font-medium font-body pt-1">
                    {stat.sublabel}
                  </p>
                </div>

                {/* Subtle bottom stripe accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
