import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SectionTitle({
  number,
  title,
  href,
  centered = false,
}: {
  number: string;
  title: string;
  href?: string;
  centered?: boolean;
}) {
  return (
    <div 
      className={`section-title ${centered ? "flex flex-col text-center" : ""}`}
      style={centered ? { alignItems: 'center', justifyContent: 'center' } : undefined}
    >
      <div className={centered ? "flex flex-col items-center" : ""}>
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
