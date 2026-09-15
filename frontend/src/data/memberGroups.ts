import type { Member } from "@/types";
import { membersData } from "./membersData";

export type PublicMember = Pick<
  Member,
  | "id"
  | "name"
  | "team"
  | "position"
  | "sigs"
  | "teamRole"
  | "chapterRole"
  | "joinYear"
  | "status"
>;
export const publicMembers: PublicMember[] = membersData.map(
  ({
    id,
    name,
    team,
    position,
    sigs,
    teamRole,
    chapterRole,
    joinYear,
    status,
  }) => ({
    id,
    name,
    team,
    position,
    sigs,
    teamRole,
    chapterRole,
    joinYear,
    status,
  }),
);
export const panelMembers = publicMembers.filter(
  (member) => member.status === "Executive" || member.status === "Advisor",
);
export const coreMembers = publicMembers.filter(
  (member) =>
    member.status === "Active" &&
    (member.teamRole === "Sub Executive" ||
      member.teamRole === "InCharge" ||
      member.sigs.some(
        (sig) => sig.role === "Coordinator" || sig.role === "Moderator",
      )),
);
export const nonCoreMembers = publicMembers.filter(
  (member) =>
    member.status === "Active" &&
    !coreMembers.some((core) => core.id === member.id),
);
export const alumniMembers = publicMembers.filter(
  (member) => member.status === "Alumni",
);
export const memberSections = [
  { href: "/members", label: "Overview" },
  { href: "/members/panels", label: "Panel" },
  { href: "/members/core", label: "Core" },
  { href: "/members/members(non-core)", label: "Non-Core" },
  { href: "/members/alumni", label: "Alumni" },
  { href: "/members/allMembers", label: "All Members" },
];
