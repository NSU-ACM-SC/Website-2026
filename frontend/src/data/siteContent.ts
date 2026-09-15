import { eventsData, galleryMedia, pressItems } from "./eventsData";
import { membersData } from "./membersData";
import {
  magazineIssues,
  projectPortfolio,
  researchPapers,
  techBlogs,
} from "./publications";
import { clubMilestones, sigGroups, teamNames } from "./teamsData";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  image?: string;
  authors?: string[];
  tags: string[];
  href: string;
  details?: string[];
  facts?: Record<string, string>;
  sample?: boolean;
  links?: { label: string; href: string; download?: boolean }[];
};
export type Collection = {
  title: string;
  eyebrow: string;
  description: string;
  items: ContentItem[];
};
export const memberHref = (name: string) => {
  const member = membersData.find((m) => m.name === name);
  return member ? `/members/${member.id}` : undefined;
};
export const eventItems: ContentItem[] = eventsData.map((e) => ({
  id: e.id,
  title: e.title,
  description: e.description,
  category: e.category,
  date: e.date,
  image: e.featuredImage,
  tags: e.tags,
  href: `/activities/events/${e.id}`,
  sample: true,
  details: [e.subtitle, e.description],
  authors: e.speakers?.map((s) => s.name),
  facts: {
    Date: e.date,
    Time: e.time,
    Venue: e.location,
    Format: e.venueType,
    Capacity: e.seatLimit ? `${e.seatLimit} participants` : "To be announced",
    Cost: "To be confirmed by the organizer",
  },
  links: [
    {
      label: "View location",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.location + " North South University")}`,
    },
  ],
}));
export const achievementItems: ContentItem[] = clubMilestones.map((m, i) => ({
  id: `milestone-${i + 1}`,
  title: m.title,
  description: m.description,
  category: i === 3 ? "Student" : "Chapter",
  date: m.year,
  tags: ["Milestone"],
  href: `/activities/achievements/milestone-${i + 1}`,
  sample: true,
  details: [m.description],
}));
export const learningItems: ContentItem[] = [
  {
    id: "first-contribution",
    title: "Your first open-source contribution",
    description:
      "A practical checklist for choosing an issue, preparing a branch, and submitting a useful pull request.",
    category: "Development",
    tags: ["Git", "Collaboration"],
    authors: ["NSU ACM SC"],
    href: "/publications/learningResources/first-contribution",
    details: [
      "Choose a small issue with clear acceptance criteria. Read the project's README and contribution instructions before changing files.",
      "Create a branch, make one focused change, and run the relevant checks. Keep unrelated formatting out of the patch.",
      "Explain the problem, the change, and how you tested it in your pull request. Respond to review comments and update your branch.",
    ],
  },
  {
    id: "research-reading",
    title: "A research paper reading worksheet",
    description:
      "Turn a paper into a clear set of questions, methods, evidence, and next steps.",
    category: "Research",
    tags: ["Reading", "Writing"],
    authors: ["NSU ACM SC"],
    href: "/publications/learningResources/research-reading",
    details: [
      "Start with the abstract and conclusion. Write the research question in your own words and identify the problem the authors are trying to solve.",
      "Record the method, datasets, baselines, and evaluation measures. Separate the authors' claims from the evidence shown in the paper.",
      "List limitations, unanswered questions, and one experiment you could reproduce. Keep complete citation details in your notes.",
    ],
  },
  {
    id: "event-planning",
    title: "Student event planning checklist",
    description:
      "Plan a workshop from the first idea through registration, delivery, and follow-up.",
    category: "Community",
    tags: ["Events", "Teamwork"],
    authors: ["NSU ACM SC"],
    href: "/publications/learningResources/event-planning",
    details: [
      "Define an audience, a learning outcome, and a realistic capacity. Assign an organizer and confirm the venue before announcing a date.",
      "Prepare a run sheet, speaker brief, equipment checklist, and participant communications. Confirm accessibility needs and a fallback plan.",
      "Collect feedback, thank contributors, archive approved photos, and document the lessons for the next organizing team.",
    ],
  },
];
export const toolkitItems: ContentItem[] = [
  {
    id: "chapter-logo",
    title: "NSU ACM SC logo",
    description:
      "The supplied chapter logo, ready for approved chapter communications. Preserve its proportions and leave clear space around it.",
    category: "Brand assets",
    image: "/assets/brand/acm-logo.webp",
    tags: ["WEBP", "Logo"],
    href: "/publications/toolkits/chapter-logo",
    links: [
      {
        label: "Download logo",
        href: "/assets/brand/acm-logo.webp",
        download: true,
      },
    ],
  },
  {
    id: "brand-palette",
    title: "Chapter color palette",
    description:
      "Off-white and black lead. Orange, ACM blue, and purple are used sparingly for emphasis.",
    category: "Brand assets",
    tags: ["Colors", "Design"],
    href: "/publications/toolkits/brand-palette",
    facts: {
      "Off-white": "#f1eee7",
      Black: "#000000",
      Orange: "#f47b2b",
      "ACM blue": "#3392cc",
      Purple: "#5227FF",
    },
  },
];
export const collections: Record<string, Collection> = {
  "activities/events": {
    title: "Events & workshops",
    eyebrow: "Activities / 01",
    description:
      "Learn together. Build something worth sharing. Find your next workshop, contest, or conversation.",
    items: eventItems,
  },
  "activities/achievements": {
    title: "A record of progress.",
    eyebrow: "Activities / 03",
    description:
      "Chapter milestones and student achievements, collected in one place.",
    items: achievementItems,
  },
  "publications/researchs": {
    title: "Questions worth asking.",
    eyebrow: "Publications / Research",
    description:
      "Explore student research, the people behind it, and the ideas moving it forward.",
    items: researchPapers.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.abstract,
      category: p.field,
      date: String(p.year),
      authors: p.authors,
      tags: p.tags,
      href: `/publications/researchs/${p.id}`,
      sample: true,
      details: [p.abstract],
      facts: { Venue: p.conference, DOI: p.doi || "Not supplied" },
    })),
  },
  "publications/projects": {
    title: "Built by our community.",
    eyebrow: "Publications / Projects",
    description:
      "Experiments, practical tools, and collaborative software from chapter members.",
    items: projectPortfolio.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      image: p.coverImage,
      authors: p.authors,
      tags: p.tags,
      href: `/publications/projects/${p.id}`,
      sample: true,
      details: [p.description],
      facts: {
        Stars: String(p.stars ?? 0),
        Forks: String(p.forks ?? 0),
        Status: p.featured ? "Flagship project" : "Community project",
      },
      links: [
        { label: "GitHub repository", href: p.githubUrl },
        ...(p.liveUrl ? [{ label: "Live demo", href: p.liveUrl }] : []),
      ],
    })),
  },
  "publications/blogs": {
    title: "Notes from the work.",
    eyebrow: "Publications / Blogs",
    description:
      "Technical writing, lessons learned, and ideas from students who are building and exploring.",
    items: techBlogs.map((p) => ({
      id: p.slug,
      title: p.title,
      description: p.excerpt,
      category: p.tags[0],
      image: p.coverImage,
      date: p.date,
      authors: [p.author.name],
      tags: p.tags,
      href: `/publications/blogs/${p.slug}`,
      sample: true,
      details: [p.excerpt],
      facts: {
        "Reading time": p.readTime,
        "Article status": "Full article awaiting editorial review",
      },
    })),
  },
  "publications/news": {
    title: "From the chapter.",
    eyebrow: "Publications / News",
    description:
      "Announcements, community updates, and stories from the chapter.",
    items: pressItems.map((p) => ({
      id: p.id,
      title: p.headline,
      description: p.snippet,
      category: "News",
      date: p.date,
      image: p.coverImage,
      authors: [p.outlet],
      tags: ["Community"],
      href: `/publications/news/${p.id}`,
      sample: true,
      details: [p.snippet],
    })),
  },
  "publications/megazines": {
    title: "The chapter, in print.",
    eyebrow: "Publications / Magazine",
    description:
      "Long-form ideas and community stories, gathered into each issue of the Chronicle.",
    items: magazineIssues.map((p) => ({
      id: p.id,
      title: p.issueTitle,
      description: p.featuredArticle,
      category: "Chronicle",
      date: p.publishDate,
      image: p.coverImage,
      tags: [p.edition],
      href: `/publications/megazines/${p.id}`,
      sample: true,
      details: p.highlights,
      facts: {
        Edition: p.edition,
        Pages: String(p.pagesCount),
        "PDF availability": "Issue file has not been supplied",
      },
    })),
  },
  "publications/toolkits": {
    title: "Made for the makers.",
    eyebrow: "Publications / Tool Kit",
    description:
      "Chapter assets and practical templates. Download what you need, then make it your own.",
    items: toolkitItems,
  },
  "publications/learningResources": {
    title: "Start curious. Keep going.",
    eyebrow: "Publications / Learning Resources",
    description:
      "Short guides and downloadable worksheets for your next contribution, paper, or event.",
    items: learningItems,
  },
};
export { teamNames, roleHierarchy } from "./teamsData";
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const teamItems: ContentItem[] = [
  ...teamNames.map((name) => ({
    id: slugify(name),
    title: `Team ${name}`,
    description: `Collaborate with the ${name.toLowerCase()} team and help deliver the chapter's work.`,
    category: "Team",
    tags: ["Sub Executive", "InCharge"],
    href: `/teams&sig/${slugify(name)}`,
  })),
  ...sigGroups.map((s) => ({
    id: s.id,
    title: s.name,
    description: s.description,
    category: "SIG",
    tags: ["Coordinator", "Moderator"],
    href: `/teams&sig/${s.id}`,
    details: [
      s.description,
      "SIGs operate alongside teams. Join exactly one team first, then optionally join any number of SIGs. Each SIG membership has its own role.",
    ],
    facts: {
      Membership: "Optional; multiple SIGs allowed",
      Leadership: "Coordinator / Moderator",
    },
  })),
];
export { galleryMedia, membersData, sigGroups };

export const activitySections = [
  { href: "/activities", label: "Overview" },
  { href: "/activities/events", label: "Events" },
  { href: "/activities/calender", label: "Calendar" },
  { href: "/activities/achievements", label: "Achievements" },
];
export const publicationSections = [
  { href: "/publications", label: "Overview" },
  ...Object.entries(collections)
    .filter(([route]) => route.startsWith("publications/"))
    .map(([route, collection]) => ({
      href: "/" + route,
      label: collection.eyebrow.split(" / ").at(-1)!,
    })),
  { href: "/publications/gallery", label: "Gallery" },
];
