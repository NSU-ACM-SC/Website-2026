"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  RotateCcw,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Mail,
  Crown,
  Filter,
  RefreshCw,
  X,
  ShieldCheck,
  AlertCircle,
  Database,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
} from "@/components/ui/SocialIcons";
import {
  ChapterMember,
  ExecutivePosition,
  TeamPosition,
  SIGPosition,
  EXECUTIVE_POSITIONS_ORDER,
  TEAM_POSITIONS_ORDER,
  SIG_POSITIONS_ORDER,
  fetchChapterMembers,
} from "@/lib/supabaseMembers";

type SortField =
  | "name"
  | "id"
  | "hierarchy"
  | "team"
  | "teamPosition"
  | "sig"
  | "sigPosition";

type SortDirection = "asc" | "desc";

export function AllMembersTable() {
  const [members, setMembers] = useState<ChapterMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);
  const [dbStatusMsg, setDbStatusMsg] = useState<string | null>("Connecting to Supabase...");

  // Filter & search states
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "executive" | "core" | "general" | "advisor"
  >("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [teamPositionFilter, setTeamPositionFilter] = useState("all");
  const [sigFilter, setSigFilter] = useState("all");
  const [sigPositionFilter, setSigPositionFilter] = useState("all");
  const [executiveFilter, setExecutiveFilter] = useState("all");

  // Sorting states
  const [sortField, setSortField] = useState<SortField>("hierarchy");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(15);

  // Load data from Supabase
  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchChapterMembers();
      setMembers(result.members);
      setIsLiveSupabase(result.isLiveSupabase);
      setDbStatusMsg(
        result.isLiveSupabase
          ? "Connected to Supabase"
          : result.error || "No data from Supabase"
      );
    } catch (err: any) {
      setDbStatusMsg("Failed to connect to Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute unique teams and SIGs from current dataset for dropdown options
  const availableTeams = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => {
      if (m.team && m.team !== "—" && m.team !== "Advisory" && m.team !== "Executive Body") {
        set.add(m.team);
      }
    });
    return Array.from(set).sort();
  }, [members]);

  const availableSIGs = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => {
      if (m.sig && m.sig !== "—" && m.sig !== "None") {
        set.add(m.sig);
      }
    });
    return Array.from(set).sort();
  }, [members]);

  // Reset all filters
  const handleReset = () => {
    setQuery("");
    setCategoryFilter("all");
    setTeamFilter("all");
    setTeamPositionFilter("all");
    setSigFilter("all");
    setSigPositionFilter("all");
    setExecutiveFilter("all");
    setSortField("hierarchy");
    setSortDirection("asc");
    setPage(1);
  };

  // Header click handler for sorting
  const handleSortToggle = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setPage(1);
  };

  // Hierarchy ranking calculation helper based on exact requirements
  const getHierarchyRank = (m: ChapterMember): number => {
    // 1. Executive Body (Order: Faculty Advisor, Chair, Vice-Chair, Secretary, Treasurer, Membership Chair, Webmaster)
    if (m.executivePosition) {
      const execOrder = [
        "Faculty Advisor",
        "Chair",
        "Vice-Chair",
        "Secretary",
        "Treasurer",
        "Membership Chair",
        "Webmaster",
      ];
      const idx = execOrder.indexOf(m.executivePosition);
      return idx !== -1 ? idx + 1 : 99;
    }

    // Helper for Team Sub-Ordering (Team Provision, Team Publications, Team Corporate, Team Promotions)
    const getTeamWeight = (teamName: string | undefined): number => {
      if (!teamName) return 5;
      const t = teamName.toLowerCase();
      if (t.includes("provision")) return 1;
      if (t.includes("publication")) return 2;
      if (t.includes("corporate")) return 3;
      if (t.includes("promotion")) return 4;
      return 5;
    };

    // Helper for SIG Sub-Ordering (R&D, Web, Admin, M&D, D&D, Cultural)
    const getSigWeight = (sigName: string | undefined): number => {
      if (!sigName) return 7;
      const s = sigName.toLowerCase();
      if (s.includes("r&d") || s.includes("research")) return 1;
      if (s.includes("web")) return 2;
      if (s.includes("admin")) return 3;
      if (s.includes("m&d") || s.includes("media")) return 4;
      if (s.includes("d&d") || s.includes("design")) return 5;
      if (s.includes("cultural")) return 6;
      return 7;
    };

    // 2. Sub-Executive (Team Sub-Ordering)
    if (m.teamPosition === "Sub-Executive") {
      return 100 + getTeamWeight(m.team);
    }

    // 3. Coordinator (SIG Sub-Ordering)
    if (m.sigPosition === "Coordinator") {
      return 200 + getSigWeight(m.sig);
    }

    // 4. In-Charge (Team Sub-Ordering)
    if (m.teamPosition === "In-Charge") {
      return 300 + getTeamWeight(m.team);
    }

    // 5. Moderators (SIG Sub-Ordering)
    if (m.sigPosition === "Moderator") {
      return 400 + getSigWeight(m.sig);
    }

    // 6. Senior Member
    if (m.teamPosition === "Senior Member") {
      return 500 + getTeamWeight(m.team);
    }
    if (m.sigPosition === "Senior Member") {
      return 550 + getSigWeight(m.sig); // Assuming SIG Seniors follow Team Seniors
    }

    // 7. General Member
    if (m.teamPosition === "General Member") {
      return 600 + getTeamWeight(m.team);
    }
    if (m.sigPosition === "General Member") {
      return 650 + getSigWeight(m.sig); // Assuming SIG General Members follow Team General Members
    }

    // 8. Probationary Member
    if (m.teamPosition === "Probationary Member") {
      return 700 + getTeamWeight(m.team);
    }
    if (m.sigPosition === "Probationary Member") {
      return 750 + getSigWeight(m.sig); // Assuming SIG Probationary Members follow Team Probationary Members
    }

    return 1000;
  };

  // Filtering logic
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      // 1. Search query
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchName = m.name.toLowerCase().includes(q);
        const matchId = m.nsuId.toLowerCase().includes(q);
        const matchTeam = m.team?.toLowerCase().includes(q);
        const matchTeamPos = m.teamPosition?.toLowerCase().includes(q);
        const matchSig = m.sig?.toLowerCase().includes(q);
        const matchSigPos = m.sigPosition?.toLowerCase().includes(q);
        const matchExec = m.executivePosition?.toLowerCase().includes(q);
        const matchEmail = m.email?.toLowerCase().includes(q);

        if (
          !matchName &&
          !matchId &&
          !matchTeam &&
          !matchTeamPos &&
          !matchSig &&
          !matchSigPos &&
          !matchExec &&
          !matchEmail
        ) {
          return false;
        }
      }

      // 2. Category Filter
      if (categoryFilter === "executive" && !m.executivePosition) return false;
      if (categoryFilter === "advisor" && m.executivePosition !== "Faculty Advisor") return false;
      if (
        categoryFilter === "core" &&
        !(
          m.teamPosition === "Sub-Executive" ||
          m.teamPosition === "In-Charge" ||
          m.sigPosition === "Coordinator" ||
          m.sigPosition === "Moderator"
        )
      ) {
        return false;
      }
      if (
        categoryFilter === "general" &&
        (m.executivePosition ||
          m.teamPosition === "Sub-Executive" ||
          m.teamPosition === "In-Charge" ||
          m.sigPosition === "Coordinator" ||
          m.sigPosition === "Moderator")
      ) {
        return false;
      }

      // 3. Executive Position dropdown
      if (executiveFilter !== "all" && m.executivePosition !== executiveFilter) {
        return false;
      }

      // 4. Team dropdown
      if (teamFilter !== "all" && m.team !== teamFilter) {
        return false;
      }

      // 5. Team Position dropdown
      if (teamPositionFilter !== "all" && m.teamPosition !== teamPositionFilter) {
        return false;
      }

      // 6. SIG dropdown
      if (sigFilter !== "all" && m.sig !== sigFilter) {
        return false;
      }

      // 7. SIG Position dropdown
      if (sigPositionFilter !== "all" && m.sigPosition !== sigPositionFilter) {
        return false;
      }

      return true;
    });
  }, [
    members,
    query,
    categoryFilter,
    executiveFilter,
    teamFilter,
    teamPositionFilter,
    sigFilter,
    sigPositionFilter,
  ]);

  // Sorting logic
  const sortedMembers = useMemo(() => {
    const list = [...filteredMembers];
    list.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "id":
          comparison = a.nsuId.localeCompare(b.nsuId, undefined, { numeric: true });
          break;
        case "hierarchy":
          comparison = getHierarchyRank(a) - getHierarchyRank(b);
          if (comparison === 0) {
            comparison = a.nsuId.localeCompare(b.nsuId, undefined, { numeric: true });
            if (comparison === 0) {
              comparison = a.name.localeCompare(b.name);
            }
          }
          break;
        case "team":
          comparison = (a.team || "").localeCompare(b.team || "");
          break;
        case "teamPosition": {
          const rankA = TEAM_POSITIONS_ORDER.indexOf(a.teamPosition as TeamPosition);
          const rankB = TEAM_POSITIONS_ORDER.indexOf(b.teamPosition as TeamPosition);
          comparison = (rankA === -1 ? 99 : rankA) - (rankB === -1 ? 99 : rankB);
          break;
        }
        case "sig":
          comparison = (a.sig || "").localeCompare(b.sig || "");
          break;
        case "sigPosition": {
          const rankA = SIG_POSITIONS_ORDER.indexOf(a.sigPosition as SIGPosition);
          const rankB = SIG_POSITIONS_ORDER.indexOf(b.sigPosition as SIGPosition);
          comparison = (rankA === -1 ? 99 : rankA) - (rankB === -1 ? 99 : rankB);
          break;
        }
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
    return list;
  }, [filteredMembers, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(sortedMembers.length / pageSize));
  const currentPageMembers = useMemo(() => {
    if (pageSize >= 1000) return sortedMembers;
    const start = (page - 1) * pageSize;
    return sortedMembers.slice(start, start + pageSize);
  }, [sortedMembers, page, pageSize]);

  // Export CSV
  const handleExportCsv = () => {
    const escapeCsv = (val: any) =>
      `"${String(val ?? "")
        .replace(/^[=+@-]/, "'$&")
        .replaceAll('"', '""')}"`;

    const headers = [
      "Name",
      "ID",
      "Executive Position",
      "Team",
      "Team Position",
      "SIG",
      "SIG Position",
      "Email",
      "Facebook",
      "LinkedIn",
      "GitHub",
    ];

    const rows = sortedMembers.map((m) => {
      const isExec = Boolean(m.executivePosition);
      return [
        m.name,
        m.nsuId,
        m.executivePosition || "",
        isExec ? "Position (Executive Body)" : m.team,
        isExec ? m.executivePosition : m.teamPosition,
        isExec ? "Position (Executive Body)" : m.sig,
        isExec ? m.executivePosition : m.sigPosition,
        m.email || "",
        m.facebook || "",
        m.linkedin || "",
        m.github || "",
      ];
    });

    const csvContent =
      "\uFEFF" +
      [headers.map(escapeCsv).join(","), ...rows.map((r) => r.map(escapeCsv).join(","))].join(
        "\r\n"
      );

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nsu-acm-sc-members-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const hasActiveFilters =
    Boolean(query) ||
    categoryFilter !== "all" ||
    teamFilter !== "all" ||
    teamPositionFilter !== "all" ||
    sigFilter !== "all" ||
    sigPositionFilter !== "all" ||
    executiveFilter !== "all";

  // Sort indicator helper
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={13} className="opacity-40 ml-1 inline-block" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp size={13} className="text-[#f47b2b] ml-1 inline-block" />
    ) : (
      <ArrowDown size={13} className="text-[#f47b2b] ml-1 inline-block" />
    );
  };

  return (
    <section className="w-full space-y-6" aria-label="Master Chapter Member Directory">
      {/* Top Status & Live Indicator Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#fdfbf7] border-2 border-black neo-shadow-sm">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider border border-black ${
              isLiveSupabase
                ? "bg-[#00d084]/20 text-[#007849]"
                : "bg-[#ffde59]/30 text-black"
            }`}
          >
            <Database size={13} />
            <span>{isLiveSupabase ? "Supabase Live Database" : "Offline / No Data"}</span>
          </div>
          <span className="text-xs text-neutral-600 hidden sm:inline">
            {dbStatusMsg}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-100 border border-black transition-colors disabled:opacity-50"
            title="Reload live data from Supabase"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Syncing..." : "Sync DB"}</span>
          </button>
          <button
            onClick={handleExportCsv}
            disabled={sortedMembers.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#3392cc] hover:bg-[#2b7fad] text-white border border-black transition-colors disabled:opacity-50"
            title="Export filtered records as CSV"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Search and Quick Category Filter Row */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by Name, NSU ID, Executive Role, Team, SIG, or Email..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#f47b2b] neo-shadow-sm transition-all"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Hierarchy Sort Button & Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSortToggle("hierarchy")}
              className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider border-2 border-black transition-all flex items-center gap-1.5 ${
                sortField === "hierarchy"
                  ? "bg-black text-white neo-shadow-sm"
                  : "bg-white hover:bg-neutral-100 text-black"
              }`}
              title="Sort by official chapter hierarchy: EB -> Sub-Exec / Coord -> In-Charge / Mod -> Members"
            >
              <Crown size={14} className="text-[#ffde59]" />
              <span>Hierarchy Order</span>
              {sortField === "hierarchy" && renderSortIndicator("hierarchy")}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#ffde59] hover:bg-[#ffd633] text-black border-2 border-black neo-shadow-sm transition-all flex items-center gap-1"
                title="Reset all filters and search"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-1">
            Category:
          </span>
          {[
            { key: "all", label: "All Members" },
            { key: "executive", label: "Executive Body" },
            { key: "advisor", label: "Faculty Advisor" },
            { key: "core", label: "Core Leaders" },
            { key: "general", label: "General Members" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setCategoryFilter(cat.key as any);
                setPage(1);
              }}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                categoryFilter === cat.key
                  ? "bg-[#f47b2b] text-white border-black neo-shadow-sm -translate-y-0.5"
                  : "bg-white text-black border-neutral-300 hover:border-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Multi-Criteria Filters Bar */}
        <div className="p-4 bg-white border-2 border-black neo-shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
            <Filter size={14} className="text-[#f47b2b]" />
            <span>Refine Filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {/* Executive Position Filter */}
            <div className="space-y-1">
              <label className="block font-bold text-neutral-700 uppercase tracking-wider">
                Executive Position
              </label>
              <select
                value={executiveFilter}
                onChange={(e) => {
                  setExecutiveFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 bg-[#f8f6f0] border border-black text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="all">All Executive Roles</option>
                {EXECUTIVE_POSITIONS_ORDER.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Filter */}
            <div className="space-y-1">
              <label className="block font-bold text-neutral-700 uppercase tracking-wider">
                Team
              </label>
              <select
                value={teamFilter}
                onChange={(e) => {
                  setTeamFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 bg-[#f8f6f0] border border-black text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="all">All Teams</option>
                {availableTeams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Position Filter */}
            <div className="space-y-1">
              <label className="block font-bold text-neutral-700 uppercase tracking-wider">
                Team Position (Order)
              </label>
              <select
                value={teamPositionFilter}
                onChange={(e) => {
                  setTeamPositionFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 bg-[#f8f6f0] border border-black text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="all">All Team Positions</option>
                {TEAM_POSITIONS_ORDER.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* SIG Filter */}
            <div className="space-y-1">
              <label className="block font-bold text-neutral-700 uppercase tracking-wider">
                SIG
              </label>
              <select
                value={sigFilter}
                onChange={(e) => {
                  setSigFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 bg-[#f8f6f0] border border-black text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="all">All SIGs</option>
                {availableSIGs.map((sig) => (
                  <option key={sig} value={sig}>
                    {sig}
                  </option>
                ))}
              </select>
            </div>

            {/* SIG Position Filter */}
            <div className="space-y-1">
              <label className="block font-bold text-neutral-700 uppercase tracking-wider">
                SIG Position (Order)
              </label>
              <select
                value={sigPositionFilter}
                onChange={(e) => {
                  setSigPositionFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 bg-[#f8f6f0] border border-black text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="all">All SIG Positions</option>
                {SIG_POSITIONS_ORDER.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Result Count and Page Size Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-neutral-600">
        <div>
          Showing{" "}
          <span className="text-black font-extrabold">{sortedMembers.length}</span> of{" "}
          <span className="text-black font-extrabold">{members.length}</span> members
          {hasActiveFilters && (
            <span className="ml-2 text-[#f47b2b]">(Filtered)</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span>Per Page:</span>
          {[15, 25, 50, 1000].map((size) => (
            <button
              key={size}
              onClick={() => {
                setPageSize(size);
                setPage(1);
              }}
              className={`px-2 py-0.5 border ${
                pageSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-neutral-300 hover:border-black"
              }`}
            >
              {size === 1000 ? "All" : size}
            </button>
          ))}
        </div>
      </div>

      {/* The Master Member Table */}
      <div
        className="w-full overflow-x-auto border-2 border-black neo-shadow bg-white"
        tabIndex={0}
        role="region"
        aria-label="Chapter Member Directory Table"
      >
        <table className="w-full border-collapse text-left text-xs min-w-[840px]">
          <caption className="sr-only">
            NSU ACM SC Master Members Roster Table with Team, SIG, Executive Body, and Contact Links
          </caption>
          <thead>
            <tr className="bg-black text-[#f1eee7] uppercase tracking-wider font-extrabold text-[11px] select-none">
              {/* Column 1: Name */}
              <th
                scope="col"
                className="p-3.5 border-b border-black cursor-pointer hover:bg-neutral-900 transition-colors"
                onClick={() => handleSortToggle("name")}
              >
                <div className="flex items-center justify-between">
                  <span>Name</span>
                  {renderSortIndicator("name")}
                </div>
              </th>

              {/* Column 2: ID */}
              <th
                scope="col"
                className="p-3.5 border-b border-black cursor-pointer hover:bg-neutral-900 transition-colors w-[140px]"
                onClick={() => handleSortToggle("id")}
              >
                <div className="flex items-center justify-between">
                  <span>ID</span>
                  {renderSortIndicator("id")}
                </div>
              </th>

              {/* Column 3: Team */}
              <th
                scope="col"
                className="p-3.5 border-b border-black cursor-pointer hover:bg-neutral-900 transition-colors w-[150px]"
                onClick={() => handleSortToggle("team")}
              >
                <div className="flex items-center justify-between">
                  <span>Team</span>
                  {renderSortIndicator("team")}
                </div>
              </th>

              {/* Column 4: Team Position */}
              <th
                scope="col"
                className="p-3.5 border-b border-black cursor-pointer hover:bg-neutral-900 transition-colors w-[170px]"
                onClick={() => handleSortToggle("teamPosition")}
              >
                <div className="flex items-center justify-between">
                  <span>Team Position</span>
                  {renderSortIndicator("teamPosition")}
                </div>
              </th>

              {/* Column 5: SIG */}
              <th
                scope="col"
                className="p-3.5 border-b border-black cursor-pointer hover:bg-neutral-900 transition-colors w-[190px]"
                onClick={() => handleSortToggle("sig")}
              >
                <div className="flex items-center justify-between">
                  <span>SIG</span>
                  {renderSortIndicator("sig")}
                </div>
              </th>

              {/* Column 6: SIG Position */}
              <th
                scope="col"
                className="p-3.5 border-b border-black cursor-pointer hover:bg-neutral-900 transition-colors w-[160px]"
                onClick={() => handleSortToggle("sigPosition")}
              >
                <div className="flex items-center justify-between">
                  <span>SIG Position</span>
                  {renderSortIndicator("sigPosition")}
                </div>
              </th>

              {/* Column 7: Connect Icons */}
              <th
                scope="col"
                className="p-3.5 border-b border-black text-center w-[150px]"
              >
                <span>Connect</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/20">
            {currentPageMembers.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center bg-[#fdfbf7]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle size={28} className="text-[#f47b2b]" />
                    <p className="font-bold text-sm text-black">No members match your criteria.</p>
                    <p className="text-xs text-neutral-600">Try modifying your search or clearing the active filters.</p>
                    <button
                      onClick={handleReset}
                      className="mt-2 px-3 py-1.5 bg-black text-white text-xs font-bold uppercase border border-black neo-shadow-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              currentPageMembers.map((member) => {
                const isExecutive = Boolean(member.executivePosition);

                return (
                  <tr
                    key={member.id}
                    className={`transition-colors hover:bg-[#fff9e6]/60 ${
                      isExecutive ? "bg-[#fffdf5]" : "bg-white"
                    }`}
                  >
                    {/* 1. Name */}
                    <td className="p-3.5 font-bold text-black border-r border-black/10">
                      <div className="flex items-center gap-2">
                        {isExecutive ? (
                          <span
                            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ffde59] text-black border border-black shrink-0"
                            title={`Executive Body: ${member.executivePosition}`}
                          >
                            <Crown size={12} className="text-[#b25300]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-300 text-[10px] font-bold shrink-0">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                        )}
                        <Link
                          href={`/members/${member.id}`}
                          className="hover:text-[#f47b2b] hover:underline underline-offset-2 transition-colors"
                        >
                          {member.name}
                        </Link>
                      </div>
                    </td>

                    {/* 2. ID */}
                    <td className="p-3.5 font-mono text-neutral-700 border-r border-black/10 whitespace-nowrap">
                      {member.nsuId}
                    </td>

                    {/*
                      EXECUTIVE BODY MERGE RULE:
                      If member has an Executive Position:
                      Merge Team, Team position, Sig, Sig position into 1 cell (colSpan={4})
                      and write "Position (Executive Body)" with the role!
                    */}
                    {isExecutive ? (
                      <td
                        colSpan={4}
                        className="p-3.5 border-r border-black/10 bg-[#fff5db]/80 text-black"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black text-white font-extrabold text-[10px] uppercase tracking-wider border border-black shadow-[2px_2px_0_#f47b2b]">
                            <ShieldCheck size={11} className="text-[#ffde59]" />
                            Position (Executive Body)
                          </span>
                          <span className="font-extrabold text-xs text-[#8a3b00] uppercase tracking-wide">
                            {member.executivePosition}
                          </span>
                        </div>
                      </td>
                    ) : (
                      <>
                        {/* 3. Team */}
                        <td className="p-3.5 border-r border-black/10 whitespace-nowrap font-medium text-black">
                          <span className="inline-block px-2 py-0.5 bg-[#f1eee7] text-neutral-800 border border-black text-[11px] font-semibold">
                            {member.team || "—"}
                          </span>
                        </td>

                        {/* 4. Team Position */}
                        <td className="p-3.5 border-r border-black/10 whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 border text-[11px] font-bold uppercase tracking-wider ${
                              member.teamPosition === "Sub-Executive"
                                ? "bg-[#5227ff]/15 text-[#3b19b8] border-[#5227ff]"
                                : member.teamPosition === "In-Charge"
                                ? "bg-[#3392cc]/15 text-[#1f638d] border-[#3392cc]"
                                : member.teamPosition === "Senior Member"
                                ? "bg-[#00d084]/20 text-[#006e42] border-[#00d084]"
                                : member.teamPosition === "General Member"
                                ? "bg-neutral-100 text-neutral-800 border-neutral-400"
                                : "bg-neutral-50 text-neutral-500 border-neutral-300"
                            }`}
                          >
                            {member.teamPosition}
                          </span>
                        </td>

                        {/* 5. SIG */}
                        <td className="p-3.5 border-r border-black/10 text-neutral-800 font-medium">
                          {member.sig && member.sig !== "—" && member.sig !== "None" ? (
                            <span className="text-xs">{member.sig}</span>
                          ) : (
                            <span className="text-neutral-400 italic">No SIG</span>
                          )}
                        </td>

                        {/* 6. SIG Position */}
                        <td className="p-3.5 border-r border-black/10 whitespace-nowrap">
                          {member.sig && member.sig !== "—" && member.sig !== "None" ? (
                            <span
                              className={`inline-block px-2 py-0.5 border text-[11px] font-bold uppercase tracking-wider ${
                                member.sigPosition === "Coordinator"
                                  ? "bg-[#f47b2b]/15 text-[#b04a07] border-[#f47b2b]"
                                  : member.sigPosition === "Moderator"
                                  ? "bg-[#ffde59]/30 text-[#856b00] border-[#bda000]"
                                  : member.sigPosition === "Senior Member"
                                  ? "bg-[#00d084]/20 text-[#006e42] border-[#00d084]"
                                  : "bg-neutral-100 text-neutral-800 border-neutral-400"
                              }`}
                            >
                              {member.sigPosition}
                            </span>
                          ) : (
                            <span className="text-neutral-400">—</span>
                          )}
                        </td>
                      </>
                    )}

                    {/* 7. Icons (Mail, Facebook, LinkedIn, GitHub) */}
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        {/* Mail */}
                        {member.email ? (
                          <a
                            href={`mailto:${member.email}`}
                            className="p-1.5 bg-white hover:bg-[#ffde59] text-black border border-black neo-interactive rounded-none"
                            title={`Email ${member.name} (${member.email})`}
                          >
                            <Mail size={13} />
                          </a>
                        ) : (
                          <span
                            className="p-1.5 bg-neutral-100 text-neutral-300 border border-neutral-200 cursor-not-allowed"
                            title="Email not available"
                          >
                            <Mail size={13} />
                          </span>
                        )}

                        {/* Facebook */}
                        {member.facebook ? (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-white hover:bg-[#3392cc] hover:text-white text-black border border-black neo-interactive rounded-none"
                            title={`Facebook: ${member.name}`}
                          >
                            <FacebookIcon size={13} />
                          </a>
                        ) : (
                          <span
                            className="p-1.5 bg-neutral-100 text-neutral-300 border border-neutral-200 cursor-not-allowed"
                            title="Facebook not available"
                          >
                            <FacebookIcon size={13} />
                          </span>
                        )}

                        {/* LinkedIn */}
                        {member.linkedin ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-white hover:bg-[#0077b5] hover:text-white text-black border border-black neo-interactive rounded-none"
                            title={`LinkedIn: ${member.name}`}
                          >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span
                            className="p-1.5 bg-neutral-100 text-neutral-300 border border-neutral-200 cursor-not-allowed"
                            title="LinkedIn not available"
                          >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                          </span>
                        )}

                        {/* GitHub */}
                        {member.github ? (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-white hover:bg-black hover:text-white text-black border border-black neo-interactive rounded-none"
                            title={`GitHub: ${member.name}`}
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span
                            className="p-1.5 bg-neutral-100 text-neutral-300 border border-neutral-200 cursor-not-allowed"
                            title="GitHub not available"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Footer summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-neutral-600 font-medium">
          Showing page <span className="font-bold text-black">{page}</span> of{" "}
          <span className="font-bold text-black">{totalPages}</span> · Total{" "}
          <span className="font-bold text-black">{sortedMembers.length}</span> results
        </p>

        <nav
          className="flex items-center gap-1 text-xs font-bold uppercase"
          aria-label="Table pagination"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 bg-white text-black border-2 border-black hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-white neo-shadow-sm transition-all"
          >
            Previous
          </button>

          <div className="flex items-center px-3 py-1.5 bg-black text-white border-2 border-black">
            <span>
              {page} / {totalPages}
            </span>
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3 py-1.5 bg-white text-black border-2 border-black hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-white neo-shadow-sm transition-all"
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
}
