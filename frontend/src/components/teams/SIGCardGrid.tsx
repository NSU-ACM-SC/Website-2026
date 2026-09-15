import { teamItems } from "@/data/siteContent";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SIGCardGrid({ category }: { category: "Team" | "SIG" }) {
  return (
    <div className="profile-grid">
      {teamItems
        .filter((item) => item.category === category)
        .map((item) => (
          <Link href={item.href} key={item.id} className="profile-card">
            <p className="eyebrow">{category}</p>
            <div className="profile-card-top">
              <h3>{item.title}</h3>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
            <p>{item.description}</p>
            <div className="tag-row">
              {item.tags.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </Link>
        ))}
    </div>
  );
}
