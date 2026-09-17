"use client";

import { useState } from "react";
import { MemberDirectory } from "./MemberDirectory";
import type { PublicMember } from "@/data/memberGroups";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Props = {
  membersData: PublicMember[];
  teams: string[];
  sigs: string[];
};

export function CoreMembersTabs({ membersData, teams, sigs }: Props) {
  const [activeTeam, setActiveTeam] = useState<string>(teams[0] || "");
  const [activeSig, setActiveSig] = useState<string>(sigs[0] || "");

  const activeTeamMembers = membersData.filter(
    (m) =>
      m.team === activeTeam &&
      (m.teamRole === "Sub Executive" || m.teamRole === "InCharge")
  );

  const activeSigMembers = membersData.filter((m) =>
    m.sigs.some(
      (s) =>
        s.name === activeSig &&
        (s.role === "Coordinator" || s.role === "Moderator")
    )
  );

  return (
    <div className="flex flex-col gap-12">
      {/* Teams Section */}
      {teams.length > 0 && (
        <section>
          <SectionTitle number="01 / Leadership" title="Teams" />
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex flex-wrap gap-3">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => setActiveTeam(team)}
                  className={`px-4 py-2 rounded-full border-2 border-black font-bold text-sm transition-all ${
                    activeTeam === team
                      ? "bg-[#f47b2b] text-black shadow-[4px_4px_0px_#000]"
                      : "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>

            <MemberDirectory
              key={activeTeam}
              membersData={activeTeamMembers}
              showControls={false}
              centerCardContent={true}
            />
          </div>
        </section>
      )}

      {/* SIGs Section */}
      {sigs.length > 0 && (
        <section>
          <SectionTitle number="02 / Special Interests" title="SIGs" />
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex flex-wrap gap-3">
              {sigs.map((sig) => (
                <button
                  key={sig}
                  onClick={() => setActiveSig(sig)}
                  className={`px-4 py-2 rounded-full border-2 border-black font-bold text-sm transition-all ${
                    activeSig === sig
                      ? "bg-[#f47b2b] text-black shadow-[4px_4px_0px_#000]"
                      : "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  {sig}
                </button>
              ))}
            </div>

            <MemberDirectory
              key={activeSig}
              membersData={activeSigMembers}
              showControls={false}
              centerCardContent={true}
              activeSigContext={activeSig}
            />
          </div>
        </section>
      )}
    </div>
  );
}

