import type { MagazineIssue } from "@/types";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MagazineCardProps = {
  issue: MagazineIssue;
};

export function MagazineCard({ issue }: MagazineCardProps) {
  const detailsHref = `/publications/megazines/${issue.id}`;

  return (
    <article className="magazine-row">
      <Link
        href={detailsHref}
        className="magazine-cover"
        aria-label={`Read ${issue.issueTitle}`}
      >
        <Image
          src={issue.coverImage}
          alt={issue.issueTitle}
          fill
          sizes="(max-width: 700px) 100vw, 33vw"
        />
        <span>{issue.edition}</span>
      </Link>
      <div className="magazine-details">
        <div className="magazine-meta">
          <span>{issue.publishDate}</span>
          <span>
            {issue.pagesCount} pages · {issue.fileSize}
          </span>
        </div>
        <h2>
          <Link href={detailsHref}>{issue.issueTitle}</Link>
        </h2>
        <div className="magazine-feature">
          <strong>Featured cover story:</strong>
          <span>{issue.featuredArticle}</span>
        </div>
        <div className="magazine-highlights">
          <p>Edition highlights:</p>
          <ul>
            {issue.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="magazine-actions">
          <Link href={detailsHref} className="magazine-read">
            <FileText size={14} /> Read magazine <ArrowUpRight size={13} />
          </Link>
          <a href={issue.downloadUrl} className="magazine-download">
            <Download size={13} /> Download PDF ({issue.fileSize})
          </a>
        </div>
      </div>
    </article>
  );
}
