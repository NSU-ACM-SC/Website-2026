import { ExecutiveMember } from "@/types";

export const executiveMembers: ExecutiveMember[] = [
  {
    id: "exec-01",
    name: "Tanzimul Haque Shafi",
    role: "Chair",
    nsuId: "2011832042",
    email: "tanzimul.haque@northsouth.edu",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    quote:
      "Building a culture of relentless engineering excellence and community empowerment at NSU.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    department: "Dept. of Electrical & Computer Engineering",
    tenure: "2025 - 2026",
    order: 1,
  },
  {
    id: "exec-02",
    name: "Sadia Afrin Chowdhury",
    role: "Vice Chair",
    nsuId: "2021445042",
    email: "sadia.afrin01@northsouth.edu",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    quote:
      "Bridging the gap between cutting-edge academia and real-world technological impact.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    department: "Dept. of Electrical & Computer Engineering",
    tenure: "2025 - 2026",
    order: 2,
  },
  {
    id: "exec-03",
    name: "Mahir Faisal Rahman",
    role: "Secretary",
    nsuId: "2112903042",
    email: "mahir.faisal@northsouth.edu",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    quote:
      "Ensuring structured operational velocity and high-impact member engagement.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    department: "Dept. of Electrical & Computer Engineering",
    tenure: "2025 - 2026",
    order: 3,
  },
  {
    id: "exec-04",
    name: "Nafisa Anjum Tabassum",
    role: "Treasurer",
    nsuId: "2121789042",
    email: "nafisa.anjum02@northsouth.edu",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    quote:
      "Stewarding our resources with transparent fiscal precision to maximize event capabilities.",
    linkedin: "https://linkedin.com",
    department: "School of Business & Economics",
    tenure: "2025 - 2026",
    order: 4,
  },
  {
    id: "exec-05",
    name: "Abrar Hossain Niloy",
    role: "Webmaster",
    nsuId: "2131554042",
    email: "abrar.niloy@northsouth.edu",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    quote:
      "Empowering developers to deploy open-source systems that scale beyond classrooms.",
    github: "https://github.com",
    department: "Dept. of Electrical & Computer Engineering",
    tenure: "2025 - 2026",
    order: 5,
  },
  {
    id: "exec-06",
    name: "Sumaiya Binte Alam",
    role: "Membership Chair",
    nsuId: "2231201042",
    email: "sumaiya.alam03@northsouth.edu",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    quote:
      "Crafting a visual brand language that resonates with global tech aesthetics.",
    linkedin: "https://linkedin.com",
    department: "Dept. of Electrical & Computer Engineering",
    tenure: "2025 - 2026",
    order: 6,
  },
];

export const teamNames = [
  "Corporate",
  "Promotion",
  "Provision",
  "Publication",
] as const;
export const sigGroups = [
  {
    id: "research-and-development",
    name: "Research and Development Group (R&D)",
    shortCode: "R&D",
    description: "Research, experimentation, and development.",
  },
  {
    id: "web",
    name: "Web Group (Web)",
    shortCode: "Web",
    description: "Web development and digital experiences.",
  },
  {
    id: "admin",
    name: "Admin Group",
    shortCode: "Admin",
    description: "Administrative coordination and chapter records.",
  },
  {
    id: "media-and-documentation",
    name: "Media and Documentation Group (M&D)",
    shortCode: "M&D",
    description: "Media coverage and documentation.",
  },
  {
    id: "design-and-decor",
    name: "Design and Decor Group (D&D)",
    shortCode: "D&D",
    description: "Visual design and event decoration.",
  },
  {
    id: "cultural",
    name: "Cultural Group",
    shortCode: "Cultural",
    description: "Cultural activities and creative participation.",
  },
] as const;
export const teamRoles = [
  "Sub Executive",
  "InCharge",
  "Senior Member",
  "General Member",
  "Probationary Member",
] as const;
export const sigRoles = [
  "Coordinator",
  "Moderator",
  "Senior Member",
  "General Member",
  "Probationary Member",
] as const;
export const executiveRoles = [
  "Chair",
  "Vice Chair",
  "Secretary",
  "Treasurer",
  "Membership Chair",
  "Webmaster",
] as const;
export const roleOrder = [
  "Faculty Advisor",
  "Chair",
  "Vice Chair",
  "Secretary",
  "Treasurer",
  "Membership Chair",
  "Webmaster",
  "Sub Executive",
  "Coordinator",
  "InCharge",
  "Moderator",
  "Senior Member",
  "General Member",
  "Probationary Member",
] as const;
export const roleHierarchy = [
  "Faculty Advisor (FA)",
  "Executive Body (EB): Chair, Vice Chair, Secretary, Treasurer, Membership Chair, Webmaster",
  "Sub Executive — Team",
  "Coordinator — SIG",
  "InCharge — Team",
  "Moderator — SIG",
  "Senior Member — Team / SIG",
  "General Member — Team / SIG",
  "Probationary Member — Team / SIG",
];

export const organizationSections = [
  { href: "/teams&sig", label: "Overview" },
  { href: "/teams&sig/team", label: "Team" },
  { href: "/teams&sig/sig", label: "SIG" },
];

export const clubMilestones = [
  {
    year: "2014",
    title: "Official ACM Chapter Chartering",
    description:
      "NSU ACM Student Chapter was chartered by ACM Headquarters (New York), becoming one of the earliest official student chapters in Bangladesh.",
  },
  {
    year: "2017",
    title: "National Tech Carnival Milestone",
    description:
      "Hosted 45+ universities and 2,000+ delegates in Bangladesh's largest student-run ACM tech symposium with 10 parallel competitive tracks.",
  },
  {
    year: "2020",
    title: "Launch of ACM-W & Virtual Innovation Labs",
    description:
      "Expanded ACM-W wing to bridge gender disparity in computing, alongside collaborative learning activities and open curriculum repositories.",
  },
  {
    year: "2023",
    title: "Global ICPC World Finals & Research Output",
    description:
      "NSU ACM SC alumni and teams represented the country at global ICPC stages and published 15+ peer-reviewed papers across IEEE and ACM venues.",
  },
  {
    year: "2025-2026",
    title: "Next-Gen Open Cloud & Student Incubator",
    description:
      "Deployed student-hosted compute clusters, an automated member portal `dash.nsuacmsc.org`, and sponsored over 300+ students in regional hackathons.",
  },
];
