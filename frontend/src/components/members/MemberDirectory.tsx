"use client";

import type { PublicMember } from "@/data/memberGroups";
import { roleOrder } from "@/data/teamsData";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";
import {
  ArrowUpRight,
  Download,
  RotateCcw,
  Search,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Props = {
  membersData: PublicMember[];
  defaultView?: "cards" | "table";
  showControls?: boolean;
  centerCardContent?: boolean;
  overrideTeamName?: string;
  activeSigContext?: string;
};

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

export function MemberDirectory({
  membersData,
  defaultView = "cards",
  showControls = true,
  centerCardContent = false,
  overrideTeamName,
  activeSigContext,
}: Props) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
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
  const visible = filtered;
  function reset() {
    setQuery("");
    setFilters({});
    setSort("role");
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
      {showControls && (
        <>
          <div className="directory-toolbar">
            <label className="search-field">
              <Search size={18} aria-hidden="true" />
              <input
                aria-label="Search members"
                placeholder="Search names, teams, roles or interests"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </label>
            <button className="outline-button" onClick={reset}>
              <RotateCcw size={16} />
              Reset
            </button>
            {/* <button
              className="outline-button"
              onClick={exportCsv}
              disabled={!filtered.length}
            >
              <Download size={16} />
              Export CSV
            </button> */}
          </div>
          <div className="directory-filters">
            {fields.map(({ key, label }) => (
              <label className="select-field" key={key}>
                {label}
                <select
                  value={filters[key] || ""}
                  onChange={(event) => {
                    setFilters({ ...filters, [key]: event.target.value });
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
                }}
              >
                <option value="name">Name A–Z</option>
                <option value="year">Newest joined</option>
                <option value="role">Role hierarchy</option>
              </select>
            </label>
          </div>
        </>
      )}
      <div 
        className={`directory-toolbar ${centerCardContent ? 'border-none mb-6' : ''}`}
        style={centerCardContent ? { justifyContent: 'center' } : undefined}
      >
        <p className={`result-count ${centerCardContent ? 'text-center w-full' : ''}`} aria-live="polite">
          {filtered.length} members
        </p>
      </div>
      {!visible.length ? (
        <div className="empty-state">
          <h2>No members found.</h2>
          <p>Try another name or clear your filters.</p>
          <button className="outline-button" onClick={reset}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6 mx-auto w-full">
          {visible.map((member, index) => {
            const total = visible.length;
            const isLastItemMd = total % 2 === 1 && index === total - 1;
            const isLastRowSingleXl = total % 3 === 1 && index === total - 1;
            const isLastRowDoubleFirstXl = total % 3 === 2 && index === total - 2;

            let colClasses = "col-span-12 md:col-span-6 xl:col-span-4";

            if (isLastItemMd) colClasses += " md:col-start-4";
            
            if (isLastRowSingleXl) {
              colClasses += " xl:col-start-5";
            } else if (isLastRowDoubleFirstXl) {
              colClasses += " xl:col-start-3";
            } else if (isLastItemMd) {
              colClasses += " xl:col-start-auto";
            }

            return (
              <div
                key={member.id}
                className={`${colClasses} group relative flex flex-col h-full bg-[#f1eee7] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-hidden hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] transition-all duration-200`}
              >
                <Link href={`/members/${member.id}`} className="absolute inset-0 z-10" aria-label={`View ${member.name}'s profile`} />
                {/* Top Image Section */}
              <div className="relative w-full aspect-[1/1] border-b-[3px] border-black bg-gray-200 shrink-0">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-black">
                    {member.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </div>
                )}

                {/* Floating Pill Tag removed as requested */}
              </div>

              {/* Bottom Content Section */}
              <div className={`flex flex-col flex-1 p-6 ${centerCardContent ? 'items-center text-center' : 'items-start'}`}>
                {/* Name */}
                <h3 className="text-2xl md:text-[26px] font-black uppercase leading-tight tracking-tighter mb-4 text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {member.name}
                </h3>
                
                {/* Roles (Neo-brutalist Badges) */}
                <div className={`flex flex-wrap gap-2.5 mb-6 ${centerCardContent ? 'justify-center' : ''}`}>
                  {activeSigContext ? (
                    <>
                      {/* Priority SIG context */}
                      {member.sigs
                        .filter((sig) => sig.name === activeSigContext)
                        .map((sig, idx) => (
                          <div key={`primary-${idx}`} className="bg-[#f47b2b] text-white border-2 border-black rounded-md shadow-[2px_2px_0px_#000] px-2.5 py-1 text-xs font-black uppercase tracking-wider">
                            {sig.role}, {sig.name}
                          </div>
                        ))}
                      {/* Show other SIGs if any */}
                      {member.sigs
                        .filter((sig) => sig.name !== activeSigContext)
                        .map((sig, idx) => (
                          <div key={`other-${idx}`} className="bg-[#3392cc] text-white border-2 border-black rounded-md shadow-[2px_2px_0px_#000] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                            {sig.role}, {sig.name}
                          </div>
                        ))}
                      {/* Show Team role underneath */}
                      <div className="bg-[#ffde59] text-black border-2 border-black rounded-md shadow-[2px_2px_0px_#000] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                        {member.chapterRole || member.teamRole || "Member"}
                        {overrideTeamName
                          ? `, ${overrideTeamName}`
                          : member.team && (member.team as string) !== "—"
                          ? `, ${member.team}`
                          : ""}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Default layout: Match the active SIG layout style */}
                      {member.sigs.length > 0 && (
                        <>
                          <div className="bg-[#f47b2b] text-white border-2 border-black rounded-md shadow-[2px_2px_0px_#000] px-2.5 py-1 text-xs font-black uppercase tracking-wider">
                            {member.sigs[0].role}, {member.sigs[0].name}
                          </div>
                          {member.sigs.slice(1).map((sig, idx) => (
                            <div key={`other-${idx}`} className="bg-[#3392cc] text-white border-2 border-black rounded-md shadow-[2px_2px_0px_#000] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                              {sig.role}, {sig.name}
                            </div>
                          ))}
                        </>
                      )}
                      
                      {/* Team / Chapter Role */}
                      <div className="bg-[#ffde59] text-black border-2 border-black rounded-md shadow-[2px_2px_0px_#000] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                        {member.chapterRole || member.teamRole || "Member"}
                        {overrideTeamName
                          ? `, ${overrideTeamName}`
                          : member.team && (member.team as string) !== "—"
                          ? `, ${member.team}`
                          : ""}
                      </div>
                    </>
                  )}
                </div>

                {/* Spacer to push footer to bottom */}
                <div className="mt-auto w-full relative z-20">
                  {/* Heavy Brutalist Divider */}
                  <div className="h-[3px] bg-black w-full mb-5"></div>

                  {/* Social Links Row in Footer (Brutalist Press Buttons) */}
                  <div className={`flex gap-3 min-h-[36px] ${centerCardContent ? 'justify-center' : ''}`}>
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white border-[2.5px] border-black rounded-md text-black shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:bg-[#ffde59] transition-all duration-75" title="GitHub">
                        <GithubIcon size={18} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white border-[2.5px] border-black rounded-md text-black shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:bg-[#3392cc] hover:text-white transition-all duration-75" title="LinkedIn">
                        <LinkedinIcon size={18} />
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white border-[2.5px] border-black rounded-md text-black shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:bg-[#1877F2] hover:text-white transition-all duration-75" title="Facebook">
                        <FacebookIcon size={18} />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="w-10 h-10 flex items-center justify-center bg-white border-[2.5px] border-black rounded-md text-black shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:bg-[#f47b2b] hover:text-white transition-all duration-75" title="Email">
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </section>
  );
}
