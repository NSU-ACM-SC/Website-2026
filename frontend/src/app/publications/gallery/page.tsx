import { MasonryGallery } from "@/components/events/MasonryGallery";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { publicationSections } from "@/data/siteContent";

export const metadata = { title: "Gallery | NSU ACM SC" };

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Publications / Gallery"
        title="A chapter in moments."
        description="Explore the photo archive by event and year, or follow our video channel."
      />
      <SectionNav label="publications categories" items={publicationSections} />
      <MasonryGallery />
    </div>
  );
}
