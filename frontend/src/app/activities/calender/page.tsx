import { EventCalendar } from "@/components/events/EventCalendar";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { activitySections } from "@/data/siteContent";

export const metadata = { title: "Calendar | NSU ACM SC" };

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Activities / Calendar"
        title="Make time for discovery."
        description="Browse chapter activities by month and type. Select a date to see what’s on, or export your current selection."
      />
      <SectionNav label="activities categories" items={activitySections} />
      <EventCalendar />
    </div>
  );
}
