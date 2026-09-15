import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Lightbulb,
  Users,
  Mic,
  HeartHandshake,
} from "lucide-react";

const benefits = [
  {
    icon: Code2,
    title: "Build with others",
    text: "Practice your skills through collaborative projects and open-source contributions.",
    href: "/publications/projects",
  },
  {
    icon: Lightbulb,
    title: "Follow a question",
    text: "Explore research ideas, read papers, and share what you discover.",
    href: "/publications/researchs",
  },
  {
    icon: Users,
    title: "Find your people",
    text: "Meet teams and special interest groups that share your curiosity.",
    href: "/teams&sig",
  },
  {
    icon: Mic,
    title: "Learn by showing up",
    text: "Explore workshops, contests, and conversations in the activity archive.",
    href: "/activities/events",
  },
  {
    icon: BookOpen,
    title: "Share what you learn",
    text: "Find technical writing, reading guides, and practical worksheets.",
    href: "/publications/learningResources",
  },
  {
    icon: HeartHandshake,
    title: "Stay connected",
    text: "Meet fellow students and alumni across the chapter community.",
    href: "/members",
  },
];
export function WhyNSUACM() {
  return (
    <section aria-labelledby="why-chapter">
      <div className="section-title">
        <div>
          <p className="eyebrow">Why join?</p>
          <h2 id="why-chapter">Learn more. Build together.</h2>
        </div>
        <Link className="text-link" href="/join">
          Find your starting point <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="editorial-grid">
        {benefits.map(({ icon: Icon, title, text, href }, index) => (
          <Link className="profile-card" key={title} href={href}>
            <div className="profile-card-top">
              <Icon size={28} />
              <span className="eyebrow">0{index + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
