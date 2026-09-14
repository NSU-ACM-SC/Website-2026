import React from "react";
import { Metadata } from "next";
import { ExecutiveBoard } from "@/components/teams/ExecutiveBoard";
import { HistoryMission } from "@/components/teams/HistoryMission";
import { SIGCardGrid } from "@/components/teams/SIGCardGrid";
import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "Teams & SIGs | NSU ACM Student Chapter",
  description: "Meet the executive board, chapter history & milestones, and 5 specialized research interest groups (SIGs).",
};

export default function TeamsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Executive Board & Team Roster */}
      <ExecutiveBoard />

      {/* 2. History & Mission */}
      <HistoryMission />

      {/* 3. SIG (Special Interest Group) Cards */}
      <SIGCardGrid />

      {/* Newsletter */}
      <section className="py-16 bg-[#f1eee7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSubscribe />
        </div>
      </section>
    </div>
  );
}
