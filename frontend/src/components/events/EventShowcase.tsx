"use client";

import { eventsData } from "@/data/eventsData";
import {
  eventFilterCategories,
  getEventDisplayCategory,
  type EventFilterCategory,
} from "@/lib/events";
import { useMemo, useState } from "react";
import { EventCard } from "./EventCard";
import { FeaturedEvent } from "./FeaturedEvent";

export function EventShowcase() {
  const [category, setCategory] = useState<EventFilterCategory>("All");
  const featured = eventsData[0];
  const filteredEvents = useMemo(
    () =>
      eventsData.filter(
        (event) =>
          category === "All" || getEventDisplayCategory(event) === category,
      ),
    [category],
  );

  return (
    <section className="events-showcase" aria-label="Event showcase">
      <FeaturedEvent event={featured} />
      <div className="event-list-heading">
        <div
          className="event-filters"
          role="tablist"
          aria-label="Event categories"
        >
          {eventFilterCategories.map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={category === item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span>Showing {filteredEvents.length} events</span>
      </div>
      <div className="event-grid">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
