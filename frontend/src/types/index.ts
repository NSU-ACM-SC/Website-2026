export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface Member {
  id: string;
  slNo: number;
  ieeeId: string;
  nsuId: string;
  name: string;
  nsuEmail: string;
  personalEmail?: string;
  bloodGroup: BloodGroup;
  team: string;
  position: string;
  sig: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  joinYear: number;
  status: "Active" | "Alumni" | "Executive" | "Advisor";
}

export interface ExecutiveMember {
  id: string;
  name: string;
  role: string;
  nsuId: string;
  email: string;
  image: string;
  quote?: string;
  linkedin?: string;
  github?: string;
  department: string;
  tenure: string;
  order: number;
}

export interface SIGGroup {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  leadName: string;
  leadRole: string;
  leadImage: string;
  meetingDay: string;
  projectsCount: number;
  membersCount: number;
  topics: string[];
  bannerGradient: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Workshop" | "Hackathon" | "Seminar" | "Tech Talk" | "Contest" | "Social";
  status: "Upcoming" | "Happening Now" | "Completed";
  date: string;
  time: string;
  location: string;
  venueType: "Physical" | "Online" | "Hybrid";
  featuredImage: string;
  description: string;
  speakers?: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  }[];
  registrationUrl?: string;
  seatLimit?: number;
  registeredCount?: number;
  tags: string[];
}

export interface GalleryMedia {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  aspectRatio: "portrait" | "landscape" | "square";
  description?: string;
}

export interface PressItem {
  id: string;
  headline: string;
  outlet: string;
  date: string;
  link: string;
  coverImage: string;
  snippet: string;
  featured: boolean;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  year: number;
  abstract: string;
  researchGateUrl?: string;
  paperUrl?: string;
  githubUrl?: string;
  doi?: string;
  tags: string[];
  field: string;
  citationsCount?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "Web & Cloud" | "AI & ML" | "CyberSec & Systems" | "Robotics & IoT" | "Mobile & Tools";
  tags: string[];
  authors: string[];
  githubUrl: string;
  liveUrl?: string;
  coverImage: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
}

export interface TechBlog {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  slug: string;
}

export interface MagazineIssue {
  id: string;
  issueTitle: string;
  edition: string;
  publishDate: string;
  coverImage: string;
  downloadUrl: string;
  fileSize: string;
  pagesCount: number;
  highlights: string[];
  featuredArticle: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Membership" | "SIGs & Projects" | "Events & Workshops" | "Research";
}
