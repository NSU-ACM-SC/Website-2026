import { formatDisplayDate } from "@/lib/date";
import { getEventDisplayCategory } from "@/lib/events";
import type { EventItem } from "@/types";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EventCard({ event }: { event: EventItem }) {
  const category = getEventDisplayCategory(event);
  const detailsHref = `/activities/events/${event.id}`;

  return (
    <article className="event-card">
      <Link href={detailsHref} className="event-card-image">
        <Image
          src={event.featuredImage}
          alt={event.title}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
        <span
          className={`event-category event-category-${category.toLowerCase()}`}
        >
          {event.category}
        </span>
        <span className="event-status">{event.status}</span>
      </Link>
      <div className="event-card-body">
        <p className="event-date">
          <CalendarDays size={12} /> {formatDisplayDate(event.date)} ·{" "}
          {event.time}
        </p>
        <h3>
          <Link href={detailsHref}>{event.title}</Link>
        </h3>
        <p className="event-description">{event.description}</p>
        <p className="event-location">
          <MapPin size={13} /> {event.location}
        </p>
        <div className="event-tags">
          {event.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="event-card-footer">
        <span>{event.venueType} session</span>
        <Link
          href={event.registrationUrl || detailsHref}
          className="event-action"
        >
          {event.status === "Completed" ? "View archive" : "RSVP pass"}
          {event.registrationUrl && <ExternalLink size={11} />}
        </Link>
      </div>
    </article>
  );
}
