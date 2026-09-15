"use client";

import { VideoFeature } from "@/components/home/VideoFeature";
import { galleryMedia } from "@/data/eventsData";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function MasonryGallery() {
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");
  const [media, setMedia] = useState("Photos");
  const [selected, setSelected] = useState<
    (typeof galleryMedia)[number] | null
  >(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = galleryMedia.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      (year === "All" || i.year === year) &&
      `${i.title} ${i.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const selectedIndex = filtered.findIndex((item) => item.id === selected?.id);
  function step(direction: number) {
    if (filtered.length)
      setSelected(
        filtered[
          (selectedIndex + direction + filtered.length) % filtered.length
        ],
      );
  }
  return (
    <>
      <div className="filter-tabs">
        {["Photos", "Videos"].map((t) => (
          <button
            key={t}
            aria-pressed={media === t}
            onClick={() => setMedia(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {media === "Photos" ? (
        <>
          <div className="collection-controls">
            <label className="search-field">
              <input
                aria-label="Search gallery"
                placeholder="Search event or caption"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label className="select-field">
              Event
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["All", ...new Set(galleryMedia.map((i) => i.category))].map(
                  (i) => (
                    <option key={i}>{i}</option>
                  ),
                )}
              </select>
            </label>
            <label className="select-field">
              Year
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {["All", ...new Set(galleryMedia.map((i) => i.year))].map(
                  (i) => (
                    <option key={i}>{i}</option>
                  ),
                )}
              </select>
            </label>
          </div>
          <p className="notice">
            Preview gallery using the existing sample photographs. Official
            event media and capture dates have not been supplied.
          </p>
          <p className="result-count" aria-live="polite">
            {filtered.length} photos
          </p>
          <div className="gallery-masonry">
            {filtered.map((item) => (
              <button
                className="gallery-tile"
                key={item.id}
                onClick={() => {
                  setSelected(item);
                  dialog.current?.showModal();
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={
                    item.aspectRatio === "portrait"
                      ? 760
                      : item.aspectRatio === "square"
                        ? 600
                        : 400
                  }
                  unoptimized
                />
                <span>
                  {item.title} ↗
                  <small className="block mt-2">
                    {item.category} / {item.year}
                  </small>
                </span>
              </button>
            ))}
          </div>
          {!filtered.length && (
            <div className="empty-state">
              <p>No photos match your filters.</p>
              <button
                className="outline-button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setYear("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </>
      ) : (
        <VideoFeature />
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="gallery-photo-title"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="lightbox-top">
          <h2 id="gallery-photo-title">{selected?.title}</h2>
          <button
            className="icon-button"
            autoFocus
            aria-label="Close photo"
            onClick={() => dialog.current?.close()}
          >
            <X size={18} />
          </button>
        </div>
        {selected && (
          <>
            <Image
              src={selected.imageUrl}
              width={1100}
              height={800}
              unoptimized
              alt={selected.title}
            />
            <p className="mt-4 text-sm">
              {selected.description || selected.title} / {selected.year}
            </p>
            <div className="pagination">
              <button
                aria-label="Previous photo"
                onClick={() => step(-1)}
                disabled={filtered.length < 2}
              >
                <ChevronLeft size={18} />
              </button>
              <span aria-live="polite">
                {selectedIndex + 1} / {filtered.length}
              </span>
              <button
                aria-label="Next photo"
                onClick={() => step(1)}
                disabled={filtered.length < 2}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
