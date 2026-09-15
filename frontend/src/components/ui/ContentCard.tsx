import type { ContentItem } from "@/data/siteContent";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ContentCard({
  item,
  index = 0,
}: {
  item: ContentItem;
  index?: number;
}) {
  return (
    <article
      className={`cutout-card${item.category === "Chronicle" ? " magazine-card" : ""}`}
    >
      {item.category === "News" && (
        <div className="news-card-heading">
          <Image
            src="/assets/brand/acm-logo.webp"
            width={330}
            height={280}
            sizes="34px"
            style={{ width: 34, height: "auto" }}
            alt=""
          />
          <div>
            <strong>NSU ACM Student Chapter</strong>
            <span>Community news / {item.date}</span>
          </div>
        </div>
      )}
      <Link
        href={item.href}
        className="card-media"
        aria-label={`Read ${item.title}`}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            width={720}
            height={480}
            sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
            className={item.image === "/assets/brand/acm-logo.webp" ? "asset-image" : ""}
          />
        ) : (
          <div className="type-poster">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.category}</strong>
            <span className="poster-cross">+</span>
          </div>
        )}
        <span className="cutout-label">{item.category}</span>
        <span className="card-arrow">
          <ArrowUpRight size={22} />
        </span>
        <span className="card-reveal">
          Explore {item.category === "Chronicle" ? "issue" : "details"}{" "}
          <ArrowUpRight size={16} />
        </span>
      </Link>
      <div className="card-copy">
        <div className="card-meta">
          {item.date || "NSU ACM SC"}
          {item.sample && <span>Preview</span>}
        </div>
        <h3>
          <Link href={item.href}>{item.title}</Link>
        </h3>
        <p>{item.description}</p>
        {item.facts?.Venue && <p className="card-fact">{item.facts.Venue}</p>}
        {item.facts?.["Reading time"] && (
          <p className="card-fact">{item.facts["Reading time"]} read</p>
        )}
        {item.facts?.Pages && (
          <p className="card-fact">
            {item.facts.Pages} pages · {item.facts.Edition}
          </p>
        )}
        <div className="tag-row">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {item.authors && (
          <div className="card-authors">{item.authors.join(" / ")}</div>
        )}
      </div>
    </article>
  );
}
