import { researchPapers } from "@/data/publications";
import { ResearchPaperCard } from "./cards/ResearchPaperCard";

export function ResearchPaperCards() {
  return (
    <section className="research-showcase" aria-label="Research papers">
      <div className="research-list-heading">
        <span>Research archive</span>
        <span>{researchPapers.length} papers</span>
      </div>
      <div className="research-list">
        {researchPapers.map((paper) => (
          <ResearchPaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </section>
  );
}
