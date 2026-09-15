"use client";
import type { ContentItem } from "@/data/siteContent";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { CardGrid } from "./CardGrid";

export function CollectionBrowser({ items }: { items: ContentItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const filtered = items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      [item.title, item.description, ...(item.authors || []), ...item.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  return (
    <>
      <div className="collection-controls">
        <label className="search-field">
          <Search size={18} />
          <input
            aria-label="Search collection"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search titles, people, or topics"
          />
        </label>
        <label className="select-field">
          Category
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {["All", ...new Set(items.map((i) => i.category))].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>
      {filtered.length ? (
        <CardGrid items={filtered.slice((page - 1) * 6, page * 6)} />
      ) : (
        <div className="empty-state">
          <h2>No matches this time.</h2>
          <p>Try a different term or reset the filters.</p>
          <button
            className="outline-button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setPage(1);
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      <nav aria-label="Collection pages" className="pagination">
        <button
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          <ArrowLeft size={18} />
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          aria-label="Next page"
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
        >
          <ArrowRight size={18} />
        </button>
      </nav>
    </>
  );
}
