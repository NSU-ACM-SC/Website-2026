import { CollectionBrowser } from "@/components/ui/CollectionBrowser";
import { collections } from "@/data/siteContent";

export function PressCoverage() {
  return <CollectionBrowser items={collections["publications/news"].items} />;
}
