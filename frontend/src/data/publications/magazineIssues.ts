import type { MagazineIssue } from "@/types";

export const magazineIssues: MagazineIssue[] = [
  {
    id: "mag-vol-08",
    issueTitle: "NSU ACM SC Chronicle: The Agentic Future",
    edition: "Volume 08, Issue 01 (Fall 2026)",
    publishDate: "August 2026",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    downloadUrl: "#download-chronicle-v8",
    fileSize: "18.4 MB",
    pagesCount: 48,
    highlights: [
      "Special Interview with Global ACM Distinguished Speaker",
      "Comprehensive Retrospective: HackStorm 2025 Winning Architecture",
      "Undergraduate Guide to Publishing in IEEE/ACM Top Venues",
      "Alumni Spotlight: From NSU ACM SC to Silicon Valley Tech Giants",
    ],
    featuredArticle:
      "Autonomous AI Agents in High-Stakes Computational Science",
  },
  {
    id: "mag-vol-07",
    issueTitle: "NSU ACM SC Chronicle: Quantum & Edge Computing",
    edition: "Volume 07, Issue 02 (Spring 2026)",
    publishDate: "March 2026",
    coverImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
    downloadUrl: "#download-chronicle-v7",
    fileSize: "14.2 MB",
    pagesCount: 40,
    highlights: [
      "Quantum Annealing vs Gate-based Algorithms",
      "Securing Smart Microgrids in Bangladesh",
      "ACM-W Inspiring Women in Tech Feature",
    ],
    featuredArticle:
      "Is Post-Quantum Cryptography Ready for Public Infrastructure?",
  },
  {
    id: "mag-vol-06",
    issueTitle: "NSU ACM SC Chronicle: Decade of Computing Excellence",
    edition: "Volume 06 (10th Anniversary Commemorative Edition)",
    publishDate: "December 2025",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    downloadUrl: "#download-chronicle-v6",
    fileSize: "26.8 MB",
    pagesCount: 64,
    highlights: [
      "10-Year Timeline of NSU ACM SC Milestones",
      "Messages from ACM HQ & NSU Faculty Deans",
      "Hall of Fame: 100 Influential Chapter Alumni",
    ],
    featuredArticle: "10 Years of Transforming Bangladeshi Tech Leaders",
  },
];
