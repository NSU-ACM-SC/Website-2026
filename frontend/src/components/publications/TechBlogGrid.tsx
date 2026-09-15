import { CollectionBrowser } from "@/components/ui/CollectionBrowser";
import { collections } from "@/data/siteContent";

export function TechBlogGrid() {
  return <CollectionBrowser items={collections["publications/blogs"].items} />;
}
