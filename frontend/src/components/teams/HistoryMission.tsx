import Link from "next/link";
import { achievementItems } from "@/data/siteContent";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function HistoryMission() {
  return (
    <section id="history">
      <SectionTitle
        number="Chapter history"
        title="A community in the making."
        href="/activities/achievements"
      />
      <p className="notice">
        Milestones from the preview archive, awaiting chapter review.
      </p>
      <ol className="chapter-timeline">
        {achievementItems.map((item) => (
          <li key={item.id}>
            <span className="timeline-year">{item.date}</span>
            <div>
              <p className="eyebrow">{item.category} milestone</p>
              <h3>
                <Link href={item.href}>{item.title}</Link>
              </h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
