import { CollectionBrowser } from "@/components/ui/CollectionBrowser";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { activitySections, collections } from "@/data/siteContent";

const collection = collections["activities/achievements"];
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
      <SectionNav label="activities categories" items={activitySections} />
      <CollectionBrowser items={collection.items} />
    </div>
  );
}
