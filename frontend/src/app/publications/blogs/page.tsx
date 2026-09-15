import { TechBlogGrid } from "@/components/publications/TechBlogGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { collections, publicationSections } from "@/data/siteContent";

const collection = collections["publications/blogs"];
export const metadata = {
  title: collection.eyebrow + " | NSU ACM SC",
  description: collection.description,
};

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow={collection.eyebrow}
        title={collection.title}
        description={collection.description}
      />
      <SectionNav label="publications categories" items={publicationSections} />
      <TechBlogGrid />
    </div>
  );
}
