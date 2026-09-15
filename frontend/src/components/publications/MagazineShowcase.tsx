import { magazineIssues } from "@/data/publications";
import { MagazineCard } from "./cards/MagazineCard";

export function MagazineShowcase() {
  return (
    <section className="magazine-showcase" aria-label="Magazine editions">
      <div className="magazine-list-heading">
        <span>Latest editions</span>
        <span>{magazineIssues.length} publications</span>
      </div>
      <div className="magazine-list">
        {magazineIssues.map((issue) => (
          <MagazineCard key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
}
