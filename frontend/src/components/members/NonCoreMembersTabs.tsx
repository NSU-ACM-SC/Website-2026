"use client";

import { useState, useEffect } from "react";
import { MemberDirectory } from "./MemberDirectory";
import { PublicMember, getMappedNonCoreTeamMembers } from "@/data/memberGroups";
import { fetchChapterMembers } from "@/lib/supabaseMembers";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Props = {
  membersData: PublicMember[];
  teams: string[];
};

export function NonCoreMembersTabs({ membersData, teams }: Props) {
  const [liveData, setLiveData] = useState<PublicMember[]>(membersData);
  const [positionFilter, setPositionFilter] = useState<string>("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");

  useEffect(() => {
    async function load() {
      const { members, isLiveSupabase } = await fetchChapterMembers();
      if (isLiveSupabase && members && members.length > 0) {
        setLiveData(getMappedNonCoreTeamMembers(members));
      }
    }
    load();
  }, []);

  const filterMember = (member: PublicMember, role: string, team: string) => {
    return member.teamRole && member.teamRole.includes(role) && member.team === team;
  };

  const showSeniors = positionFilter === "All" || positionFilter === "Senior Member";
  const showGenerals = positionFilter === "All" || positionFilter === "General Member";
  const showProbationary = positionFilter === "All" || positionFilter === "Probationary Member";

  const renderSection = (title: string, role: string, number: string) => {
    const teamsToRender = teamFilter === "All" ? teams : [teamFilter];
    
    // Check if there are any members in this entire section based on current filters
    const hasMembers = teamsToRender.some(team => 
      liveData.some(m => filterMember(m, role, team))
    );

    if (!hasMembers) return null;

    return (
      <section className="mb-16">
        <SectionTitle number={number} title={title} centered={true} />
        
        <div className="flex flex-col gap-12 mt-12">
          {teamsToRender.map(team => {
            const teamMembers = liveData.filter(m => filterMember(m, role, team));
            
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
            <option value="Senior Member">Senior Members</option>
            <option value="General Member">General Members</option>
            <option value="Probationary Member">Probationary Members</option>
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
        {showSeniors && renderSection("Senior Members", "Senior Member", "01 / Teams")}
        {showGenerals && renderSection("General Members", "General Member", "02 / Teams")}
        {showProbationary && renderSection("Probationary Members", "Probationary Member", "03 / Teams")}
        
        {(!showSeniors && !showGenerals && !showProbationary) || (showSeniors && renderSection("Senior Members", "Senior Member", "01 / Teams") === null && showGenerals && renderSection("General Members", "General Member", "02 / Teams") === null && showProbationary && renderSection("Probationary Members", "Probationary Member", "03 / Teams") === null) ? (
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
