import { MagazineShowcase } from "@/components/publications/MagazineShowcase";
import { SectionNav } from "@/components/ui/SectionNav";
import { collections, publicationSections } from "@/data/siteContent";

const collection = collections["publications/megazines"];
export const metadata = {
  title: collection.eyebrow + " | NSU ACM SC",
  description: collection.description,
};

export default function Page() {
  return (
    <div className="site-container">
      <header className="magazine-hero">
        <p className="magazine-kicker">Official annual publications</p>
        <h1>
          NSU ACM
          <br />
          CHRONICLE
          <br />
          <span>PDF MAGAZINES</span>
        </h1>
        <p>{collection.description}</p>
      </header>
      <SectionNav label="publications categories" items={publicationSections} />
      <MagazineShowcase />
    </div>
  );
}
