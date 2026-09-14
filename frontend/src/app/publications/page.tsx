import React from "react";
import { Metadata } from "next";
import { ResearchPaperCards } from "@/components/publications/ResearchPaperCards";
import { ProjectPortfolio } from "@/components/publications/ProjectPortfolio";
import { TechBlogGrid } from "@/components/publications/TechBlogGrid";
import { MagazineShowcase } from "@/components/publications/MagazineShowcase";

export const metadata: Metadata = {
  title: "Publications, Projects & Chronicle | NSU ACM Student Chapter",
  description: "Peer-reviewed research papers, open-source project portfolio, technical engineering blogs, and downloadable PDF club magazines.",
};

export default function PublicationsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Research Papers Showcase Card (Title, Author, ResearchGate, Paper Link, GitHub Link) */}
      <ResearchPaperCards />

      {/* 2. Project Portfolio Cards (Category, Tags, Author, GitHub) */}
      <ProjectPortfolio />

      {/* 3. Tech Blogs & Tutorials */}
      <TechBlogGrid />

      {/* 4. Club News & PDF Magazine Cards (Cover, Issue Title, Date, Download Action) */}
      <MagazineShowcase />
    </div>
  );
}
