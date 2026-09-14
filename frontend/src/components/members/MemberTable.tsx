"use client";

import React, { useState } from "react";
import { Member } from "@/types";
import { NeoBadge } from "../ui/NeoBadge";
import { Copy, Check, ExternalLink, Mail, Shield, User } from "lucide-react";

interface MemberTableProps {
  members: Member[];
}

export const MemberTable: React.FC<MemberTableProps> = ({ members }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBloodBadgeColor = (bg: string) => {
    if (bg.includes("-")) return "bg-red-700 text-white";
    return "bg-[#f47b2b] text-white";
  };

  if (members.length === 0) {
    return (
      <div className="bg-white border-[3px] border-black p-12 text-center shadow-[6px_6px_0px_0px_#000000] space-y-3">
        <User className="h-10 w-10 mx-auto text-black/40" />
        <h3 className="font-heading font-black text-xl uppercase text-black">
          No Members Found
        </h3>
        <p className="text-sm font-body text-black/70">
          Try adjusting your search keyword or clearing the applied filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] overflow-hidden">
      {/* Table Container with Horizontal Scroll for responsive mobile devices */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white border-b-2 border-black font-display font-black text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4 text-center w-16">SL No</th>
              <th className="py-3.5 px-4">IEEE / ACM ID</th>
              <th className="py-3.5 px-4">NSUID</th>
              <th className="py-3.5 px-4">Name & Position</th>
              <th className="py-3.5 px-4">NSU Email</th>
              <th className="py-3.5 px-4">SIG Wing</th>
              <th className="py-3.5 px-4 text-center">Blood Group</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black font-body text-sm">
            {members.map((member, idx) => (
              <tr
                key={member.id}
                className="hover:bg-[#f1eee7]/80 transition-colors group"
              >
                {/* SL No */}
                <td className="py-3.5 px-4 text-center font-mono font-black text-xs text-black/80 bg-[#f1eee7]/50 border-r-2 border-black">
                  {String(member.slNo || idx + 1).padStart(2, "0")}
                </td>

                {/* IEEE / ACM ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#5227FF]">
                  {member.ieeeId}
                </td>

                {/* NSUID */}
                <td className="py-3.5 px-4 font-mono font-bold text-xs text-black">
                  {member.nsuId}
                </td>

                {/* Name & Position */}
                <td className="py-3.5 px-4">
                  <div className="font-display font-black text-sm uppercase text-black group-hover:text-[#5227FF] transition-colors">
                    {member.name}
                  </div>
                  <div className="text-xs font-display font-bold text-[#f47b2b] uppercase">
                    {member.position} • {member.team}
                  </div>
                </td>

                {/* NSU Email */}
                <td className="py-3.5 px-4 font-mono text-xs text-black/80">
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-[200px]">{member.nsuEmail}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(member.nsuEmail, `email-${member.id}`)}
                      title="Copy NSU Email"
                      className="p-1 text-black/60 hover:text-black hover:bg-black/10 transition-colors cursor-pointer"
                    >
                      {copiedId === `email-${member.id}` ? (
                        <Check className="h-3.5 w-3.5 text-[#00D084]" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </td>

                {/* SIG Wing */}
                <td className="py-3.5 px-4">
                  <span className="bg-[#f1eee7] text-black border border-black px-2 py-0.5 text-xs font-display font-bold uppercase shadow-[1px_1px_0px_0px_#000]">
                    {member.sig}
                  </span>
                </td>

                {/* Blood Group */}
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-mono font-black border border-black shadow-[2px_2px_0px_0px_#000] ${getBloodBadgeColor(
                      member.bloodGroup
                    )}`}
                  >
                    {member.bloodGroup}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <a
                      href={`mailto:${member.nsuEmail}`}
                      className="p-1.5 bg-black text-white hover:bg-[#5227FF] transition-colors border border-black"
                      title="Send Mail"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary Bar */}
      <div className="p-3.5 bg-[#f1eee7] border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-display font-bold text-black">
        <div>
          Displaying <span className="font-black text-black">{members.length}</span> verified chapter members
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00D084]" />
          <span>Verified via Department of ECE & ACM HQ Records</span>
        </div>
      </div>
    </div>
  );
};
