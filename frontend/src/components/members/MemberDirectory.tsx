"use client";

import React, { useState, useMemo } from "react";
import { membersData } from "@/data/membersData";
import { MemberTable } from "./MemberTable";
import { SectionHeading } from "../ui/SectionHeading";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";
import {
  Search,
  Filter,
  Download,
  RotateCcw,
  Users,
  Heart,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export const MemberDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("All");
  const [selectedSig, setSelectedSig] = useState<string>("All");
  const [selectedBlood, setSelectedBlood] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Extract unique options
  const teams = useMemo(() => {
    const set = new Set(membersData.map((m) => m.team));
    return ["All", ...Array.from(set)];
  }, []);

  const sigs = useMemo(() => {
    const set = new Set(membersData.map((m) => m.sig));
    return ["All", ...Array.from(set)];
  }, []);

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Filtered members computation
  const filteredMembers = useMemo(() => {
    return membersData.filter((member) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.nsuId.includes(searchQuery) ||
        member.ieeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.nsuEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.position.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTeam = selectedTeam === "All" || member.team === selectedTeam;
      const matchesSig = selectedSig === "All" || member.sig === selectedSig;
      const matchesBlood = selectedBlood === "All" || member.bloodGroup === selectedBlood;
      const matchesStatus = selectedStatus === "All" || member.status === selectedStatus;

      return matchesSearch && matchesTeam && matchesSig && matchesBlood && matchesStatus;
    });
  }, [searchQuery, selectedTeam, selectedSig, selectedBlood, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTeam("All");
    setSelectedSig("All");
    setSelectedBlood("All");
    setSelectedStatus("All");
  };

  const handleExportCSV = () => {
    const headers = ["SL No", "IEEE ID", "NSUID", "Name", "Team", "Position", "SIG", "NSU Email", "Blood Group"];
    const rows = filteredMembers.map((m, idx) => [
      m.slNo || idx + 1,
      m.ieeeId,
      m.nsuId,
      `"${m.name}"`,
      `"${m.team}"`,
      `"${m.position}"`,
      `"${m.sig}"`,
      m.nsuEmail,
      m.bloodGroup,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NSU_ACM_SC_Members_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-[#f1eee7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="PUBLIC ROSTER & REGISTRY"
          badgeVariant="purple"
          title="PUBLIC MEMBER"
          highlightText="DIRECTORY"
          highlightColor="orange"
          subtitle="Explore the verified directory of undergraduate engineers, executive panels, and SIG researchers representing NSU ACM Student Chapter."
          alignment="center"
        />

        {/* Quick Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000]">
            <div className="text-xs font-display font-black uppercase text-black/60">Total Roster</div>
            <div className="font-heading font-black text-2xl text-black">{membersData.length}</div>
          </div>
          <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000]">
            <div className="text-xs font-display font-black uppercase text-[#f47b2b]">Active Filtered</div>
            <div className="font-heading font-black text-2xl text-[#f47b2b]">{filteredMembers.length}</div>
          </div>
          <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000]">
            <div className="text-xs font-display font-black uppercase text-[#5227FF]">SIG Wings</div>
            <div className="font-heading font-black text-2xl text-[#5227FF]">5 Focus Areas</div>
          </div>
          <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000]">
            <div className="text-xs font-display font-black uppercase text-[#00D084]">Blood Matrix</div>
            <div className="font-heading font-black text-2xl text-black">8 Donor Types</div>
          </div>
        </div>

        {/* Search & Filter Controls Box */}
        <div className="bg-white border-[3px] border-black p-6 shadow-[6px_6px_0px_0px_#000000] mb-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Name, NSUID, IEEE ID, Email, Position..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#f1eee7] border-2 border-black font-body text-sm font-medium placeholder:text-black/50 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_#f47b2b]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3.5 py-2.5 bg-[#f1eee7] border-2 border-black text-xs font-display font-black uppercase shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>

              <NeoButton
                variant="orange"
                size="sm"
                onClick={handleExportCSV}
                className="shadow-[3px_3px_0px_0px_#000]"
              >
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </NeoButton>
            </div>
          </div>

          {/* Filter Dropdown Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t-2 border-black/15">
            {/* Team Filter */}
            <div>
              <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                Filter by Team:
              </label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full py-2 px-3 bg-[#f1eee7] border-2 border-black font-display font-bold text-xs uppercase focus:outline-none focus:bg-white"
              >
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {/* SIG Filter */}
            <div>
              <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                Filter by SIG:
              </label>
              <select
                value={selectedSig}
                onChange={(e) => setSelectedSig(e.target.value)}
                className="w-full py-2 px-3 bg-[#f1eee7] border-2 border-black font-display font-bold text-xs uppercase focus:outline-none focus:bg-white"
              >
                {sigs.map((sig) => (
                  <option key={sig} value={sig}>
                    {sig}
                  </option>
                ))}
              </select>
            </div>

            {/* Blood Group Filter */}
            <div>
              <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                Blood Group Registry:
              </label>
              <select
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.target.value)}
                className="w-full py-2 px-3 bg-[#f1eee7] border-2 border-black font-display font-bold text-xs uppercase focus:outline-none focus:bg-white"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg === "All" ? "All Blood Groups" : `Blood Group ${bg}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-display font-black uppercase text-black mb-1.5">
                Member Status:
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 bg-[#f1eee7] border-2 border-black font-display font-bold text-xs uppercase focus:outline-none focus:bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active Student</option>
                <option value="Executive">Executive Committee</option>
                <option value="Alumni">Alumni Member</option>
                <option value="Advisor">Faculty Advisor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Member Table Component */}
        <MemberTable members={filteredMembers} />
      </div>
    </section>
  );
};
