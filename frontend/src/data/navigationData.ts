import type { NavigationItem } from "@/types";

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/activities",
    label: "Activities",
    children: [
      { href: "/activities/events", label: "Events" },
      { href: "/activities/calender", label: "Calendar" },
      { href: "/activities/achievements", label: "Achievements" },
    ],
  },
  {
    href: "/publications",
    label: "Publications",
    children: [
      { href: "/publications/researchs", label: "Research" },
      { href: "/publications/projects", label: "Projects" },
      { href: "/publications/blogs", label: "Blogs" },
      { href: "/publications/news", label: "News" },
      { href: "/publications/megazines", label: "Magazine" },
      { href: "/publications/gallery", label: "Gallery" },
      { href: "/publications/toolkits", label: "Tool Kit" },
      { href: "/publications/learningResources", label: "Learning Resources" },
    ],
  },
  { href: "/teams&sig", label: "Teams & SIGs" },
  {
    href: "/members",
    label: "Members",
    children: [
      { href: "/members/panels", label: "Panel" },
      { href: "/members/core(team)", label: "Core(Team)" },
      { href: "/members/core(sig)", label: "Core(SIG)" },
      { href: "/members/members(non-core)", label: "Member (Non-Core)" },
      { href: "/members/alumni", label: "Alumni" },
      { href: "/members/allMembers", label: "All Members" },
    ],
  },
  { href: "/contact", label: "Contact Us" },
];
