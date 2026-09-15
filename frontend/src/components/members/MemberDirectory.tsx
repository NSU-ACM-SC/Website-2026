"use client";

import type { PublicMember } from "@/data/memberGroups";
import { roleOrder } from "@/data/teamsData";
import {
  ArrowUpRight,
  Download,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PublicMemberTable } from "./PublicMemberTable";

type Props = { membersData: PublicMember[]; defaultView?: "cards" | "table" };

function valuesFor(
  member: PublicMember,
  key: "team" | "joinYear" | "position" | "sigs" | "status",
) {
  if (key === "sigs")
    return member.sigs.length ? member.sigs.map((sig) => sig.name) : ["No SIG"];
  if (key === "position")
    return [
      member.chapterRole,
      member.teamRole,
      ...member.sigs.map((sig) => sig.role),
    ].filter((role): role is NonNullable<typeof role> => Boolean(role));
  return [String(member[key])];
}

export function MemberDirectory({ membersData, defaultView = "cards" }: Props) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [view, setView] = useState(defaultView);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("role");
  const fields = [
    { key: "team", label: "Team" },
    { key: "joinYear", label: "Year" },
    { key: "position", label: "Role" },
    { key: "sigs", label: "SIG" },
    { key: "status", label: "Status" },
  ] as const;
  const filtered = membersData
    .filter(
      (member) =>
        [
          member.name,
          member.team,
          ...valuesFor(member, "position"),
          member.sigs.map((sig) => sig.name).join(" / "),
          member.joinYear,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase()) &&
        fields.every(
          ({ key }) =>
            !filters[key] || valuesFor(member, key).includes(filters[key]),
        ),
    )
    .sort((a, b) =>
      sort === "role"
        ? roleOrder.indexOf(a.position) - roleOrder.indexOf(b.position) ||
          a.name.localeCompare(b.name)
        : sort === "year"
          ? b.joinYear - a.joinYear || a.name.localeCompare(b.name)
          : a.name.localeCompare(b.name),
    );
  const pages = Math.max(1, Math.ceil(filtered.length / 9));
  const visible = filtered.slice((page - 1) * 9, page * 9);
  function reset() {
    setQuery("");
    setFilters({});
    setSort("role");
    setPage(1);
  }
  function exportCsv() {
    const cell = (value: string | number) =>
      `"${String(value)
        .replace(/^[=+@-]/, "'$&")
        .replaceAll('"', '""')}"`;
    const rows = [
      [
        "Name",
        "Joined",
        "Team",
        "Chapter role",
        "Team role",
        "SIG roles",
        "Status",
      ],
      ...filtered.map((member) => [
        member.name,
        member.joinYear,
        member.team,
        member.chapterRole || "",
        member.teamRole,
        member.sigs.map((sig) => `${sig.name}: ${sig.role}`).join(" / "),
        member.status,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob(
        ["\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n")],
        { type: "text/csv;charset=utf-8" },
      ),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "chapter-public-members.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section aria-label="Member directory">
      <p className="notice">
        Preview roster. Roles and group assignments await chapter confirmation.
      </p>
      <div className="directory-toolbar">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            aria-label="Search members"
            placeholder="Search names, teams, roles or interests"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </label>
        <button className="outline-button" onClick={reset}>
          <RotateCcw size={16} />
          Reset
        </button>
        <button
          className="outline-button"
          onClick={exportCsv}
          disabled={!filtered.length}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
      <div className="directory-filters">
        {fields.map(({ key, label }) => (
          <label className="select-field" key={key}>
            {label}
            <select
              value={filters[key] || ""}
              onChange={(event) => {
                setFilters({ ...filters, [key]: event.target.value });
                setPage(1);
              }}
            >
              <option value="">All</option>
              {[
                ...new Set(
                  membersData.flatMap((member) => valuesFor(member, key)),
                ),
              ]
                .sort()
                .map((value) => (
                  <option key={value}>{value}</option>
                ))}
            </select>
          </label>
        ))}
        <label className="select-field">
          Sort
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
          >
            <option value="name">Name A–Z</option>
            <option value="year">Newest joined</option>
            <option value="role">Role hierarchy</option>
          </select>
        </label>
      </div>
      <div className="directory-toolbar">
        <p className="result-count" aria-live="polite">
          {filtered.length} members · Page {page} of {pages}
        </p>
        <div className="filter-tabs">
          <button
            aria-label="Card view"
            aria-pressed={view === "cards"}
            onClick={() => setView("cards")}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            aria-label="Table view"
            aria-pressed={view === "table"}
            onClick={() => setView("table")}
          >
            <List size={18} />
          </button>
        </div>
      </div>
      {!visible.length ? (
        <div className="empty-state">
          <h2>No members found.</h2>
          <p>Try another name or clear your filters.</p>
          <button className="outline-button" onClick={reset}>
            Reset filters
          </button>
        </div>
      ) : view === "table" ? (
        <PublicMemberTable members={visible} />
      ) : (
        <div className="profile-grid">
          {visible.map((member) => (
            <Link
              href={`/members/${member.id}`}
              className="profile-card"
              key={member.id}
            >
              <div className="profile-card-top">
                <div className="profile-monogram">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((name) => name[0])
                    .join("")}
                </div>
                <ArrowUpRight size={20} />
              </div>
              <p className="eyebrow">
                {member.status} / {member.joinYear}
              </p>
              <h3>{member.name}</h3>
              <p>
                {member.position}
                <br />
                {member.team} · {member.teamRole}
              </p>
              <div className="tag-row">
                {member.sigs.length ? (
                  member.sigs.map((sig) => (
                    <span key={sig.name}>
                      {sig.name} · {sig.role}
                    </span>
                  ))
                ) : (
                  <span>No SIG</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
      <nav className="pagination" aria-label="Member pages">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          {page} / {pages}
        </span>
        <button disabled={page >= pages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </nav>
    </section>
  );
}
