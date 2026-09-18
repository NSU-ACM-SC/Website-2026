"use client";

import { useState } from "react";
import { MemberDirectory } from "./MemberDirectory";
import type { PublicMember } from "@/data/memberGroups";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Props = {
  membersData: PublicMember[];
  sigs: string[];
};

export function CoreSigTabs({ membersData, sigs }: Props) {
  const [positionFilter, setPositionFilter] = useState<string>("All");
  const [sigFilter, setSigFilter] = useState<string>("All");

  const filterMember = (member: PublicMember, role: string, sigName: string) => {
    return member.sigs.some(s => s.role === role && s.name === sigName);
  };

  const showCoordinators = positionFilter === "All" || positionFilter === "Coordinator";
  const showModerators = positionFilter === "All" || positionFilter === "Moderator";

  const renderSection = (title: string, role: string, number: string) => {
    const sigsToRender = sigFilter === "All" ? sigs : [sigFilter];
    
    // Check if there are any members in this entire section based on current filters
    const hasMembers = sigsToRender.some(sig => 
      membersData.some(m => filterMember(m, role, sig))
    );

    if (!hasMembers) return null;

    return (
      <section className="mb-16">
        <SectionTitle number={number} title={title} centered={true} />
        
        <div className="flex flex-col gap-12 mt-12">
          {sigsToRender.map(sig => {
            const sigMembers = membersData.filter(m => filterMember(m, role, sig));
            
            if (sigMembers.length === 0) return null;
            
            return (
              <div key={sig}>
                <h3 className="text-2xl font-black mb-6 text-center uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{sig}</h3>
                <MemberDirectory 
                  membersData={sigMembers}
                  showControls={false}
                  centerCardContent={true}
                  activeSigContext={sig}
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
            <option value="Coordinator">Coordinators</option>
            <option value="Moderator">Moderators</option>
          </select>
        </label>
        
        <label className="select-field">
          SIG
          <select value={sigFilter} onChange={(e) => setSigFilter(e.target.value)}>
            <option value="All">All SIGs</option>
            {sigs.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4">
        {showCoordinators && renderSection("Coordinators", "Coordinator", "01 / Leadership")}
        {showModerators && renderSection("Moderators", "Moderator", "02 / Leadership")}
        
        {(!showCoordinators && !showModerators) || (showCoordinators && renderSection("Coordinators", "Coordinator", "01 / Leadership") === null && showModerators && renderSection("Moderators", "Moderator", "02 / Leadership") === null) ? (
          <div className="empty-state text-center py-12">
            <h2>No members found.</h2>
            <p>Try clearing your filters.</p>
            <button 
              className="outline-button mx-auto mt-4" 
              onClick={() => { setPositionFilter("All"); setSigFilter("All"); }}
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
