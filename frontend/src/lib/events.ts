import type { EventItem } from "@/types";

export const eventFilterCategories = [
  "All",
  "Competitions",
  "Workshops",
  "Seminars",
] as const;

export type EventFilterCategory = (typeof eventFilterCategories)[number];
export type EventDisplayCategory = Exclude<EventFilterCategory, "All">;

export function getEventDisplayCategory(
  event: EventItem,
): EventDisplayCategory {
  if (event.category === "Workshop") return "Workshops";
  if (event.category === "Hackathon" || event.category === "Contest") {
    return "Competitions";
  }
  return "Seminars";
}
