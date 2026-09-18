import { EventManager, Event as CalendarEvent } from "@/components/events/Calendar";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { activitySections } from "@/data/siteContent";
import { eventsData } from "@/data/eventsData";

export const metadata = { title: "Calendar | NSU ACM SC" };

export default function Page() {
  // Map eventsData to the format expected by the EventManager
  const calendarEvents: CalendarEvent[] = eventsData.map((e, index) => {
    // Generate a color based on category or index
    const colors = ["blue", "green", "purple", "orange", "yellow", "red"];
    const assignedColor = colors[index % colors.length];
    
    // Parse the date "YYYY-MM-DD"
    const [year, month, day] = e.date.split("-").map(Number);
    // Rough estimate for startTime if no precise parsing is needed, we just use the date.
    // The previous calendar just used the date, let's set it to 10:00 AM by default.
    const startDate = new Date(year, month - 1, day, 10, 0);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // +2 hours

    return {
      id: e.id,
      title: e.title,
      description: e.description,
      startTime: startDate,
      endTime: endDate,
      color: assignedColor,
      category: e.category,
      tags: e.tags,
    };
  });

  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Activities / Calendar"
        title="Make time for discovery."
        description="Browse chapter activities by month and type. Select a date to see what’s on."
      />
      <SectionNav label="activities categories" items={activitySections} />
      <div className="mt-8 mb-16">
        <EventManager events={calendarEvents} />
      </div>
    </div>
  );
}
