import { createClient } from "@/utils/supabase/client";

export type ExecutivePosition =
  | "Faculty Advisor"
  | "Chair"
  | "Vice Chair"
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
  semesterJoined?: string;
  photoUrl?: string;
}

export const EXECUTIVE_POSITIONS_ORDER: ExecutivePosition[] = [
  "Faculty Advisor",
  "Chair",
  "Vice Chair",
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
  if (clean === "faculty advisor" || clean === "advisor")
    return "Faculty Advisor";
  if (clean === "chair" || clean === "president") return "Chair";
  if (
    clean === "vice-chair" ||
    clean === "vice chair" ||
    clean === "vice_chair"
  )
    return "Vice Chair";
  if (clean === "secretary") return "Secretary";
  if (clean === "treasurer") return "Treasurer";
  if (clean === "membership chair" || clean === "membership_chair")
    return "Membership Chair";
  if (clean === "webmaster" || clean === "web master") return "Webmaster";
  return undefined;
}

function normalizeSingleTeamPosition(pos: string): TeamPosition {
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

export function normalizeTeamPosition(pos?: string | null): TeamPosition | string {
  if (!pos) return "General Member";
  return pos.split(",").map(normalizeSingleTeamPosition).join(", ");
}

function normalizeSingleSIGPosition(pos: string): SIGPosition {
  const clean = pos.trim().toLowerCase();
  if (clean === "coordinator") return "Coordinator";
  if (clean === "moderator") return "Moderator";
  if (clean === "senior member" || clean === "senior") return "Senior Member";
  if (clean === "general member" || clean === "general") return "General Member";
  if (clean === "probationary member" || clean === "probationary") return "Probationary Member";
  return "General Member";
}

export function normalizeSIGPosition(pos?: string | null): SIGPosition | string {
  if (!pos) return "General Member";
  return pos.split(",").map(normalizeSingleSIGPosition).join(", ");
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
      setTimeout(
        () =>
          reject(new Error("Supabase connection timed out after 15 seconds.")),
        15000,
      ),
    );

    // Race the fetch promise against the timeout
    const result = (await Promise.race([fetchPromise, timeoutPromise])) as {
      data: Record<string, unknown>[] | null;
      error: Error | null;
    };

    let fetchedRows: Record<string, unknown>[] | null = null;
    let queryError: Error | null = null;

    const { data, error } = result;
    if (!error && data && data.length > 0) {
      fetchedRows = data;
    } else if (error) {
      queryError = error;
    }

    if (fetchedRows && fetchedRows.length > 0) {
      const normalized: ChapterMember[] = fetchedRows.map((row, index) =>
        mapRowToChapterMember(row, index),
      );

      return {
        members: normalized,
        isLiveSupabase: true,
        error: null,
      };
    }

    return {
      members: [],
      isLiveSupabase: false,
      error: queryError
        ? queryError.message
        : "No records found. If your table has data, please ensure Row Level Security (RLS) is disabled or you have a SELECT policy allowing public reads.",
    };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to connect to Supabase database.";
    return {
      members: [],
      isLiveSupabase: false,
      error: message,
    };
  }
}

// Convert a single database row into a structured ChapterMember
export function mapRowToChapterMember(
  row: Record<string, unknown>,
  index: number = 0,
): ChapterMember {
  const id = (row.NSU_ID as string) || `supa-${index + 1}`;
  const nsuId = (row.NSU_ID as string) || "N/A";
  const name = (row.Name as string) || "Unknown Member";

  const rawExec = row.Executive_Position as string | null | undefined;
  const executivePosition = normalizeExecutivePosition(rawExec);

  const team = (row.Team_Name as string) || "Corporate";
  const rawTeamPos = row.Team_Position as string | null | undefined;
  const teamPosition = normalizeTeamPosition(rawTeamPos);

  const sig = (row.SIG as string) || "—";
  const rawSigPos = row.SIG_Position as string | null | undefined;
  const sigPosition = normalizeSIGPosition(rawSigPos);

  const email = row.Email;
  const facebook = row.Facebook_link;
  const linkedin = row.Linkedin_link;
  const github = row.Github_link;
  const semesterJoined = row.Semester_Joined;
  const photoUrl = row.Photo_url;

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
    status: executivePosition ? "Executive" : "Active",
    semesterJoined: semesterJoined ? String(semesterJoined) : undefined,
    photoUrl: photoUrl ? String(photoUrl) : undefined,
  };
}

// Fetch a single member by their NSU ID
export async function fetchChapterMemberByNsuId(
  nsuId: string,
): Promise<ChapterMember | null> {
  try {
    const supabase = createClient();
    const tableName = "All Member Info";
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("NSU_ID", nsuId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return mapRowToChapterMember(data as Record<string, unknown>);
  } catch (err) {
    console.error("Error fetching member by NSU_ID:", err);
    return null;
  }
}
