import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SectionTitle({
  number,
  title,
  href,
}: {
  number: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{number}</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          Explore all <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
