export interface StatItem {
  id: string;
  label: string;
  value: string;
  sublabel: string;
  badge: string;
  color: string;
}

export const statsData: StatItem[] = [
  {
    id: "stat-members",
    label: "Active Members",
    value: "1,250+",
    sublabel: "Engineers, Designers & Researchers",
    badge: "+32% YoY",
    color: "#f47b2b",
  },
  {
    id: "stat-events",
    label: "Events & Workshops",
    value: "180+",
    sublabel: "Hands-on tech bootcamps & hackathons",
    badge: "Since Charter",
    color: "#3392cc",
  },
  {
    id: "stat-papers",
    label: "Research Publications",
    value: "45+",
    sublabel: "Indexed in IEEE Xplore & ACM DL",
    badge: "Peer Reviewed",
    color: "#5227FF",
  },
  {
    id: "stat-alumni",
    label: "Global Alumni Network",
    value: "600+",
    sublabel: "At Google, Meta, Microsoft & Startups",
    badge: "Worldwide",
    color: "#00D084",
  },
];
