import { CardGrid } from "@/components/ui/CardGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  achievementItems,
  activitySections,
  eventItems,
} from "@/data/siteContent";

export const metadata = { title: "Activities | NSU ACM SC" };

export default function ActivitiesPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Activities"
        title="Show up. Get involved."
        description="From the first workshop to the next milestone: explore what the community is doing together."
      />
      <SectionNav label="activities categories" items={activitySections} />

      <SectionTitle
        number="01 / Featured activities"
        title="Your next shared experience."
      />
      <CardGrid items={eventItems.slice(0, 3)} />
      <SectionTitle
        number="02 / Chapter progress"
        title="Milestones, made together."
        href="/activities/achievements"
      />
      <CardGrid items={achievementItems.slice(0, 3)} />
    </div>
  );
}
