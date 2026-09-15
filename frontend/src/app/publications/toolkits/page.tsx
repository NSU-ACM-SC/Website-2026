import { Palette } from "@/components/publications/Palette";
import { CollectionBrowser } from "@/components/ui/CollectionBrowser";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { collections, publicationSections } from "@/data/siteContent";

const collection = collections["publications/toolkits"];
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
      <Palette />
      <CollectionBrowser items={collection.items} />
    </div>
  );
}
