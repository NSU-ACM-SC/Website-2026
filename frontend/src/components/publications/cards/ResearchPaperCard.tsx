import type { ResearchPaper } from "@/types";
import { ArrowUpRight, BookOpen, Code2, FileText, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ResearchPaperCardProps = {
  paper: ResearchPaper;
};

export function ResearchPaperCard({ paper }: ResearchPaperCardProps) {
  return (
    <article className="research-card">
      <div className="research-card-image">
        <Image
          src={paper.coverImage}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 36vw"
        />
        <span>{paper.field}</span>
        <span>{paper.year}</span>
      </div>
      <div className="research-card-inner">
        <div className="research-card-topline">
          <span className="research-citation">
            {paper.citationsCount ?? 0} citations
          </span>
          <span className="research-doi">
            DOI: {paper.doi || "Not supplied"}
          </span>
        </div>
        <h2>{paper.title}</h2>
        <p className="research-venue">
          <BookOpen size={13} /> {paper.conference}
        </p>
        <div className="research-authors">
          <strong>Authors:</strong>
          {paper.authors.map((author) => (
            <span key={author}>{author}</span>
          ))}
        </div>
        <div className="research-abstract">
          <strong>Abstract &amp; methodology:</strong>
          <p>{paper.abstract}</p>
        </div>
        <div className="research-tags">
          {paper.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="research-actions">
          {paper.paperUrl && (
            <a
              href={paper.paperUrl}
              target="_blank"
              rel="noreferrer"
              className="research-action research-action-dark"
            >
              <FileText size={14} /> Paper PDF / ACM DL{" "}
              <ArrowUpRight size={12} />
            </a>
          )}
          {paper.researchGateUrl && (
            <a
              href={paper.researchGateUrl}
              target="_blank"
              rel="noreferrer"
              className="research-action research-action-green"
            >
              <BookOpen size={14} /> ResearchGate <ArrowUpRight size={12} />
            </a>
          )}
          {paper.githubUrl && (
            <a
              href={paper.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="research-action research-action-light"
            >
              <Code2 size={14} /> Replication code <ArrowUpRight size={12} />
            </a>
          )}
          {paper.doi && (
            <Link
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              className="research-cite-link"
            >
              <Quote size={13} /> Cite paper
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
