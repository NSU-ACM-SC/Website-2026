"use client";

import { useState } from "react";
import { MemberDirectory } from "./MemberDirectory";
import type { PublicMember } from "@/data/memberGroups";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Props = {
  membersData: PublicMember[];
  teams: string[];
};

export function CoreMembersTabs({ membersData, teams }: Props) {
  const [positionFilter, setPositionFilter] = useState<string>("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");

  const filterMember = (member: PublicMember, role: string, team: string) => {
    return member.teamRole === role && member.team === team;
  };

  const showSubExecutives = positionFilter === "All" || positionFilter === "Sub Executive";
  const showInCharges = positionFilter === "All" || positionFilter === "InCharge";

  const renderSection = (title: string, role: string, number: string) => {
    const teamsToRender = teamFilter === "All" ? teams : [teamFilter];
    
    // Check if there are any members in this entire section based on current filters
    const hasMembers = teamsToRender.some(team => 
      membersData.some(m => filterMember(m, role, team))
    );

    if (!hasMembers) return null;

    return (
      <section className="mb-16">
        <SectionTitle number={number} title={title} centered={true} />
        
        <div className="flex flex-col gap-12 mt-12">
          {teamsToRender.map(team => {
            const teamMembers = membersData.filter(m => filterMember(m, role, team));
            
            if (teamMembers.length === 0) return null;
            
            return (
              <div key={team}>
                <h3 className="text-2xl font-black mb-6 text-center uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{team}</h3>
                <MemberDirectory 
                  membersData={teamMembers}
                  showControls={false}
                  centerCardContent={true}
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        <label className="select-field">
          Position
          <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
            <option value="All">All Positions</option>
            <option value="Sub Executive">Sub-Executives</option>
            <option value="InCharge">In-Charges</option>
          </select>
        </label>
        
        <label className="select-field">
          Team
          <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
            <option value="All">All Teams</option>
            {teams.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4">
        {showSubExecutives && renderSection("Sub-Executives", "Sub Executive", "01 / Leadership")}
        {showInCharges && renderSection("In-Charges", "InCharge", "02 / Leadership")}
        
        {(!showSubExecutives && !showInCharges) || (showSubExecutives && renderSection("Sub-Executives", "Sub Executive", "01 / Leadership") === null && showInCharges && renderSection("In-Charges", "InCharge", "02 / Leadership") === null) ? (
          <div className="empty-state text-center py-12">
            <h2>No members found.</h2>
            <p>Try clearing your filters.</p>
            <button 
              className="outline-button mx-auto mt-4" 
              onClick={() => { setPositionFilter("All"); setTeamFilter("All"); }}
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
