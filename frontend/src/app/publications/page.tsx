import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { collections, publicationSections } from "@/data/siteContent";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Publications | NSU ACM SC" };

export default function PublicationsPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Publications"
        title="Ideas are better shared."
        description="Research, projects, writing, and resources from a community that learns in public."
      />
      <SectionNav label="publications categories" items={publicationSections} />
      <div className="editorial-grid">
        {Object.entries(collections)
          .filter(([key]) => key.startsWith("publications/"))
          .map(([key, c], i) => (
            <Link className="profile-card" href={`/${key}`} key={key}>
              <p className="eyebrow">
                0{i + 1} / {c.items.length} entries
              </p>
              <h3>{c.eyebrow.split(" / ").at(-1)}</h3>
              <p>{c.description}</p>
              <ArrowUpRight className="mt-5" />
            </Link>
          ))}
        <Link className="profile-card" href="/publications/gallery">
          <p className="eyebrow">08 / Media</p>
          <h3>Gallery</h3>
          <p>Photos and videos from chapter events and community moments.</p>
          <ArrowUpRight className="mt-5" />
        </Link>
      </div>
      <NewsletterSubscribe />
    </div>
  );
}
