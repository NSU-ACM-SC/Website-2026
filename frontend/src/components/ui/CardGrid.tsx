import { ContentCard } from "@/components/ui/ContentCard";
import type { ContentItem } from "@/data/siteContent";

export function CardGrid({ items }: { items: ContentItem[] }) {
  return (
    <div className="editorial-grid">
      {items.map((item, i) => (
        <ContentCard key={item.href} item={item} index={i} />
      ))}
    </div>
  );
}
