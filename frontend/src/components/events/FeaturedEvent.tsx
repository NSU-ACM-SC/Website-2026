import type { EventItem } from "@/types";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Trophy,
} from "lucide-react";
import Image from "next/image";

export function FeaturedEvent({ event }: { event: EventItem }) {
  return (
    <div className="featured-event">
      <div className="featured-topline">
        <span>Flagship annual symposium</span>
        <span>
          Status: {event.status} · {event.registeredCount} / {event.seatLimit}{" "}
          registered
        </span>
      </div>
      <div className="featured-content">
        <div className="featured-image">
          <Image
            src={event.featuredImage}
            alt={event.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            preload
          />
          <span className="featured-label">{event.category}</span>
          <span className="featured-prize">
            <Trophy size={13} /> Prize pool: BDT 500,000+ &amp; seed grants
          </span>
        </div>
        <div className="featured-copy">
          <div className="featured-badges">
            <span>36 hours sprint</span>
            <span>Hybrid arena</span>
          </div>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <div className="featured-facts">
            <span>
              <CalendarDays size={14} /> {event.date}
            </span>
            <span>
              <Clock3 size={14} /> {event.time}
            </span>
            <span>
              <MapPin size={14} /> {event.location}
            </span>
          </div>
          <div className="featured-footer">
            <small>Host: NSU ACM SC Technical Wing</small>
            {event.registrationUrl && (
              <a href={event.registrationUrl} target="_blank" rel="noreferrer">
                Register team via portal <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
