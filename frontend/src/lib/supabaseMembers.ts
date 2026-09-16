import { createClient } from "@/utils/supabase/client";

export type ExecutivePosition =
  | "Faculty Advisor"
  | "Chair"
  | "Vice-Chair"
  | "Secretary"
  | "Treasurer"
  | "Membership Chair"
  | "Webmaster";

export type TeamPosition =
  | "Sub-Executive"
  | "In-Charge"
  | "Senior Member"
  | "General Member"
  | "Probationary Member";

export type SIGPosition =
  | "Coordinator"
  | "Moderator"
  | "Senior Member"
  | "General Member"
  | "Probationary Member";

export interface ChapterMember {
  id: string; // Database or Member Unique ID
  nsuId: string; // Student ID (e.g. 2011832042)
  name: string;
  executivePosition?: ExecutivePosition | null;
  team: string; // e.g. "Corporate", "Promotion", "Provision", "Publication" or "—"
  teamPosition: TeamPosition | string;
  sig: string; // e.g. "Web Group (Web)", "Research and Development Group (R&D)", etc.
  sigPosition: SIGPosition | string;
  email?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  status?: string;
}

export const EXECUTIVE_POSITIONS_ORDER: ExecutivePosition[] = [
  "Faculty Advisor",
  "Chair",
  "Vice-Chair",
  "Secretary",
  "Treasurer",
  "Membership Chair",
  "Webmaster",
];

export const TEAM_POSITIONS_ORDER: TeamPosition[] = [
  "Sub-Executive",
  "In-Charge",
  "Senior Member",
  "General Member",
  "Probationary Member",
];

export const SIG_POSITIONS_ORDER: SIGPosition[] = [
  "Coordinator",
  "Moderator",
  "Senior Member",
  "General Member",
  "Probationary Member",
];

// Helper to normalize position names (handles variations like "Vice Chair" vs "Vice-Chair")
export function normalizeExecutivePosition(
  pos?: string | null,
): ExecutivePosition | undefined {
  if (!pos) return undefined;
  const clean = pos.trim().toLowerCase();
  if (clean === "faculty advisor" || clean === "advisor") return "Faculty Advisor";
  if (clean === "chair" || clean === "president") return "Chair";
  if (clean === "vice-chair" || clean === "vice chair" || clean === "vice_chair")
    return "Vice-Chair";
  if (clean === "secretary") return "Secretary";
  if (clean === "treasurer") return "Treasurer";
  if (clean === "membership chair" || clean === "membership_chair")
    return "Membership Chair";
  if (clean === "webmaster" || clean === "web master") return "Webmaster";
  return undefined;
}

export function normalizeTeamPosition(pos?: string | null): TeamPosition {
  if (!pos) return "General Member";
  const clean = pos.trim().toLowerCase();
  if (clean === "sub-executive" || clean === "sub executive" || clean === "sub_executive")
    return "Sub-Executive";
  if (clean === "in-charge" || clean === "incharge" || clean === "in charge")
    return "In-Charge";
  if (clean === "senior member" || clean === "senior") return "Senior Member";
  if (clean === "general member" || clean === "general") return "General Member";
  if (clean === "probationary member" || clean === "probationary" || clean === "probation")
    return "Probationary Member";
  return "General Member";
}

export function normalizeSIGPosition(pos?: string | null): SIGPosition {
  if (!pos) return "General Member";
  const clean = pos.trim().toLowerCase();
  if (clean === "coordinator") return "Coordinator";
  if (clean === "moderator") return "Moderator";
  if (clean === "senior member" || clean === "senior") return "Senior Member";
  if (clean === "general member" || clean === "general") return "General Member";
  if (clean === "probationary member" || clean === "probationary")
    return "Probationary Member";
  return "General Member";
}

export interface FetchResult {
  members: ChapterMember[];
  isLiveSupabase: boolean;
  error?: string | null;
}

// Fetch members from Supabase, falling back cleanly if offline or empty
export async function fetchChapterMembers(): Promise<FetchResult> {
  try {
    const supabase = createClient();
    const tableName = "All Member Info";
    
    // Fetch the single table with a timeout
    const fetchPromise = supabase.from(tableName).select("*");

    // Timeout promise (15 seconds)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase connection timed out after 15 seconds.")), 15000)
    );

    // Race the fetch promise against the timeout
    const result = await Promise.race([
      fetchPromise,
      timeoutPromise
    ]) as { data: any[] | null; error: any };

    let fetchedRows: any[] | null = null;
    let queryError: any = null;

    const { data, error } = result;
    if (!error && data && data.length > 0) {
      fetchedRows = data;
    } else if (error) {
      queryError = error;
    }

    if (fetchedRows && fetchedRows.length > 0) {
      const normalized: ChapterMember[] = fetchedRows.map((row, index) => {
        // Map exact columns from the user's schema
        const id = row.NSU_ID || `supa-${index + 1}`;
        const nsuId = row.NSU_ID || "N/A";
        const name = row.Name || "Unknown Member";

        const rawExec = row.Executive_Position;
        const executivePosition = normalizeExecutivePosition(rawExec);

        const team = row.Team_Name || "Corporate";
        const rawTeamPos = row.Team_Position;
        const teamPosition = normalizeTeamPosition(rawTeamPos);

        const sig = row.SIG || "—";
        const rawSigPos = row.SIG_Position;
        const sigPosition = normalizeSIGPosition(rawSigPos);

        const email = row.Email;
        const facebook = row.Facebook_link;
        const linkedin = row.Linkedin_link;
        const github = row.Github_link;

        return {
          id: String(id),
          nsuId: String(nsuId),
          name: String(name),
          executivePosition,
          team: String(team),
          teamPosition,
          sig: String(sig),
          sigPosition,
          email: email ? String(email) : undefined,
          facebook: facebook ? String(facebook) : undefined,
          linkedin: linkedin ? String(linkedin) : undefined,
          github: github ? String(github) : undefined,
          status: "Active",
        };
      });

      return {
        members: normalized,
        isLiveSupabase: true,
        error: null,
      };
    }

    return {
      members: [],
      isLiveSupabase: false,
      error: queryError ? queryError.message : "No records found. If your table has data, please ensure Row Level Security (RLS) is disabled or you have a SELECT policy allowing public reads.",
    };
  } catch (err: any) {
    return {
      members: [],
      isLiveSupabase: false,
      error: err?.message || "Failed to connect to Supabase database.",
    };
  }
}
