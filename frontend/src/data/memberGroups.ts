import type { Member } from "@/types";
import { membersData } from "./membersData";
import { ChapterMember } from "@/lib/supabaseMembers";
import { roleOrder } from "@/data/teamsData";

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
> & { photoUrl?: string; email?: string; facebook?: string; linkedin?: string; github?: string; };
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
    photoUrl: undefined, // Add if membersData includes avatars
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
// export const nonCoreMembers = publicMembers.filter(
//   (member) =>
//     member.status === "Active" &&
//     !coreMembers.some((core) => core.id === member.id),
// );
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

export function getMappedCoreMembers(supabaseMembers: ChapterMember[]): PublicMember[] {
  const coreSupabaseMembers = supabaseMembers.filter(
    (m) =>
      m.teamPosition === "Sub-Executive" ||
      m.teamPosition === "In-Charge" ||
      m.sigPosition === "Coordinator" ||
      m.sigPosition === "Moderator"
  );

  return coreSupabaseMembers.map((m) => {
    const teamRole =
      m.teamPosition === "Sub-Executive"
        ? "Sub Executive"
        : m.teamPosition === "In-Charge"
          ? "InCharge"
          : m.teamPosition;

    const sigs =
      m.sig && m.sig !== "—"
        ? m.sig.split(",").map((s) => ({ name: s.trim() as any, role: m.sigPosition as any }))
        : [];

    const possibleRoles = [m.executivePosition, teamRole, m.sigPosition].filter(
      Boolean
    ) as string[];

    const position =
      possibleRoles.sort(
        (a, b) =>
          (roleOrder.indexOf(a as any) !== -1
            ? roleOrder.indexOf(a as any)
            : 999) -
          (roleOrder.indexOf(b as any) !== -1
            ? roleOrder.indexOf(b as any)
            : 999)
      )[0] || "General Member";

    return {
      id: m.id,
      name: m.name,
      team: m.team as any,
      position: position as any,
      sigs: sigs,
      teamRole: teamRole as any,
      chapterRole: m.executivePosition as any,
      joinYear: m.semesterJoined
        ? parseInt(
          m.semesterJoined.match(/\d{4}/)?.[0] ||
          new Date().getFullYear().toString()
        )
        : new Date().getFullYear(),
      status: (m.status as any) || "Active",
      photoUrl: m.photoUrl,
      email: m.email,
      facebook: m.facebook,
      linkedin: m.linkedin,
      github: m.github,
    };
  });
}

export function getMappedNonCoreMembers(supabaseMembers: ChapterMember[]): PublicMember[] {
  const nonCoreSupabaseMembers = supabaseMembers.filter(
    (m) =>
      m.status !== "Executive" &&
      m.status !== "Advisor" &&
      m.status !== "Alumni" &&
      m.teamPosition !== "Sub-Executive" &&
      m.teamPosition !== "In-Charge" &&
      m.sigPosition !== "Coordinator" &&
      m.sigPosition !== "Moderator" &&
      !m.executivePosition
  );

  return nonCoreSupabaseMembers.map((m) => {
    const teamRole = m.teamPosition;

    const sigs =
      m.sig && m.sig !== "—"
        ? m.sig.split(",").map((s) => ({ name: s.trim() as any, role: m.sigPosition as any }))
        : [];

    const possibleRoles = [m.executivePosition, teamRole, m.sigPosition].filter(
      Boolean
    ) as string[];

    const position =
      possibleRoles.sort(
        (a, b) =>
          (roleOrder.indexOf(a as any) !== -1
            ? roleOrder.indexOf(a as any)
            : 999) -
          (roleOrder.indexOf(b as any) !== -1
            ? roleOrder.indexOf(b as any)
            : 999)
      )[0] || "General Member";

    return {
      id: m.id,
      name: m.name,
      team: m.team as any,
      position: position as any,
      sigs: sigs,
      teamRole: teamRole as any,
      chapterRole: m.executivePosition as any,
      joinYear: m.semesterJoined
        ? parseInt(
          m.semesterJoined.match(/\d{4}/)?.[0] ||
          new Date().getFullYear().toString()
        )
        : new Date().getFullYear(),
      status: (m.status as any) || "Active",
      photoUrl: m.photoUrl,
      email: m.email,
      facebook: m.facebook,
      linkedin: m.linkedin,
      github: m.github,
    };
  });
}

export function getMappedPanelMembers(supabaseMembers: ChapterMember[]): PublicMember[] {
  const panelSupabaseMembers = supabaseMembers.filter(
    (m) => m.status === "Executive" || m.status === "Advisor"
  );

  return panelSupabaseMembers.map((m) => {
    let chapterRole = m.executivePosition;

    // Hardcoded normalizations to match exactly with roleOrder in teamsData.ts
    if (chapterRole) {
      const lower = chapterRole.toLowerCase();
      if (lower.includes("faculty advisor")) chapterRole = "Faculty Advisor";
      else if (lower.includes("vice-chair") || lower.includes("vice chair")) chapterRole = "Vice Chair";
      else if (lower.includes("chair") && lower.includes("membership")) chapterRole = "Membership Chair";
      else if (lower.includes("chair")) chapterRole = "Chair";
      else if (lower.includes("secretary")) chapterRole = "Secretary";
      else if (lower.includes("treasurer")) chapterRole = "Treasurer";
      else if (lower.includes("webmaster")) chapterRole = "Webmaster";
    }

    const teamRole =
      m.teamPosition === "Sub-Executive"
        ? "Sub Executive"
        : m.teamPosition === "In-Charge"
          ? "InCharge"
          : m.teamPosition;

    const sigs =
      m.sig && m.sig !== "—"
        ? m.sig.split(",").map((s) => ({ name: s.trim() as any, role: m.sigPosition as any }))
        : [];

    const possibleRoles = [chapterRole, teamRole, m.sigPosition].filter(
      Boolean
    ) as string[];

    const position =
      possibleRoles.sort(
        (a, b) =>
          (roleOrder.indexOf(a as any) !== -1
            ? roleOrder.indexOf(a as any)
            : 999) -
          (roleOrder.indexOf(b as any) !== -1
            ? roleOrder.indexOf(b as any)
            : 999)
      )[0] || "General Member";

    return {
      id: m.id,
      name: m.name,
      team: m.team as any,
      position: position as any,
      sigs: sigs,
      teamRole: teamRole as any,
      chapterRole: chapterRole as any,
      joinYear: m.semesterJoined
        ? parseInt(
          m.semesterJoined.match(/\d{4}/)?.[0] ||
          new Date().getFullYear().toString()
        )
        : new Date().getFullYear(),
      status: (m.status as any) || "Active",
      photoUrl: m.photoUrl,
      email: m.email,
      facebook: m.facebook,
      linkedin: m.linkedin,
      github: m.github,
    };
  });
}
