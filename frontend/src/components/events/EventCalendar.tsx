"use client";
import { eventsData } from "@/data/eventsData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function EventCalendar() {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("month");
  const [day, setDay] = useState<number | null>(null);
  const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
  const events = eventsData.filter(
    (e) =>
      e.date.startsWith(monthKey) &&
      (category === "All" || e.category === category),
  );
  const visible = events.filter(
    (e) => day === null || Number(e.date.slice(8)) === day,
  );
  const shift = (n: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
    setDay(null);
  };
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const download = () => {
    const escape = (s: string) =>
      s
        .replaceAll("\\", "\\\\")
        .replaceAll("\n", "\\n")
        .replaceAll(",", "\\,")
        .replaceAll(";", "\\;");
    const text = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//NSU ACM SC//Preview Calendar//EN",
      ...visible.flatMap((e) => [
        "BEGIN:VEVENT",
        `UID:${e.id}@nsuacmsc.org`,
        `DTSTAMP:${new Date()
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}Z$/, "Z")}`,
        `DTSTART;VALUE=DATE:${e.date.replaceAll("-", "")}`,
        `SUMMARY:${escape("Preview: " + e.title)}`,
        `LOCATION:${escape(e.location)}`,
        `DESCRIPTION:${escape("Sample event; confirm with the chapter. " + e.time)}`,
        "END:VEVENT",
      ]),
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/calendar" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `chapter-${monthKey}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <p className="notice">
        Preview schedule from the existing dataset. Confirm dates with the
        chapter before attending.
      </p>
      <div className="collection-controls">
        <div className="calendar-heading">
          <button
            className="icon-button"
            aria-label="Previous month"
            onClick={() => shift(-1)}
          >
            <ChevronLeft />
          </button>
          <h2 aria-live="polite">
            {month.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            className="icon-button"
            aria-label="Next month"
            onClick={() => shift(1)}
          >
            <ChevronRight />
          </button>
        </div>
        <label className="select-field">
          Activity
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {[
              "All",
              "Workshop",
              "Hackathon",
              "Contest",
              "Seminar",
              "Tech Talk",
              "Recruitment",
              "GBM",
              "Meeting",
              "Social",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="calendar-toolbar">
        <div className="filter-tabs">
          <button
            aria-pressed={view === "month"}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            aria-pressed={view === "agenda"}
            onClick={() => {
              setView("agenda");
              setDay(null);
            }}
          >
            Agenda
          </button>
        </div>
        <label className="select-field">
          Jump to month
          <input
            type="month"
            aria-label="Jump to month"
            value={monthKey}
            onChange={(event) => {
              if (/^\d{4}-\d{2}$/.test(event.target.value)) {
                const [year, value] = event.target.value.split("-").map(Number);
                setMonth(new Date(year, value - 1, 1));
                setDay(null);
              }
            }}
          />
        </label>
        <button
          className="outline-button"
          onClick={() => {
            const now = new Date();
            setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
            setDay(null);
            setCategory("All");
          }}
        >
          Today
        </button>
        {day !== null && (
          <button className="text-link" onClick={() => setDay(null)}>
            Show whole month
          </button>
        )}
      </div>
      {view === "month" && (
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div className="weekday" key={d}>
              {d}
            </div>
          ))}
          {Array.from({ length: month.getDay() }, (_, i) => (
            <div className="calendar-blank" key={`blank-${i}`} />
          ))}
          {Array.from({ length: days }, (_, i) => {
            const date = i + 1;
            const count = events.filter(
              (e) => Number(e.date.slice(8)) === date,
            ).length;
            return (
              <button
                key={date}
                className={day === date ? "selected" : ""}
                aria-pressed={day === date}
                aria-label={`${monthKey}-${date}, ${count} events`}
                onClick={() => setDay(day === date ? null : date)}
              >
                <span>{date}</span>
                {count > 0 && (
                  <span className="event-dot">
                    {count}
                    <span className="desktop-label"> event</span>
                  </span>
                )}
              </button>
            );
          })}
          {Array.from(
            { length: (7 - ((month.getDay() + days) % 7)) % 7 },
            (_, index) => (
              <div className="calendar-blank" key={`end-${index}`} />
            ),
          )}
        </div>
      )}
      <div className="section-title">
        <h2>
          {day
            ? month.toLocaleDateString("en-US", { month: "long" }) + ` ${day}`
            : "This month"}
        </h2>
        <button
          className="outline-button"
          disabled={!visible.length}
          onClick={download}
        >
          Export calendar (.ics)
        </button>
      </div>
      <div className="agenda">
        {visible.map((e) => (
          <Link key={e.id} href={`/activities/events/${e.id}`}>
            <span>{e.date.slice(8)}</span>
            <div>
              <p className="eyebrow">
                {e.category} / {e.time}
              </p>
              <h3>{e.title}</h3>
              <p>{e.location}</p>
            </div>
            <span>↗</span>
          </Link>
        ))}
        {!visible.length && (
          <p className="empty-state">
            No activities listed for this selection. Try another month or
            category.
          </p>
        )}
      </div>
    </>
  );
}
