import { PageIntro } from "@/components/ui/PageIntro";
import type { ContentItem } from "@/data/siteContent";
import { memberHref } from "@/data/siteContent";
import { withBasePath } from "@/lib/assets";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DetailPage({
  item,
  back,
}: {
  item: ContentItem;
  back: string;
}) {
  return (
    <div className="site-container">
      <Link href={back} className="text-link">
        ← Back to collection
      </Link>
      <PageIntro
        eyebrow={item.category}
        title={item.title}
        description={item.description}
      />
      {item.sample && (
        <p className="notice">
          Preview record from the existing site dataset. Publication details and
          media await chapter review.
        </p>
      )}
      {item.image && (
        <div className="detail-image">
          <Image
            src={withBasePath(item.image)}
            alt={item.title}
            width={1400}
            height={720}
            sizes="(max-width: 1240px) 100vw, 1176px"
          />
        </div>
      )}
      <div className="detail-columns">
        <article className="reading-copy">
          <p className="eyebrow">The details</p>
          <h2>Take a closer look.</h2>
          {(item.details || [item.description]).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {item.authors && (
            <>
              <h3>Contributors</h3>
              <div className="tag-row">
                {item.authors.map((name) => {
                  const href = memberHref(name);
                  return href ? (
                    <Link key={name} href={href}>
                      {name} <ArrowUpRight size={14} />
                    </Link>
                  ) : (
                    <span key={name}>{name}</span>
                  );
                })}
              </div>
            </>
          )}
          {item.sample && (
            <p className="notice">
              Verified source files, full articles, and event registration
              details will appear when supplied by the chapter.
            </p>
          )}
        </article>
        <aside className="detail-aside">
          <h3>At a glance</h3>
          <dl>
            {Object.entries({
              ...(item.date ? { Date: item.date } : {}),
              Category: item.category,
              ...item.facts,
            }).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="action-stack">
            {item.links?.map((link) => (
              <a
                className="solid-button"
                key={link.href}
                href={withBasePath(link.href)}
                download={link.download || undefined}
                target={
                  link.download || link.href.startsWith("/")
                    ? undefined
                    : "_blank"
                }
                rel="noopener noreferrer"
              >
                {link.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
            <Link className="outline-button" href="/contact">
              Ask the chapter
              <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
