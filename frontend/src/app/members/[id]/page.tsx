import { CardGrid } from "@/components/ui/CardGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";
import { collections, membersData } from "@/data/siteContent";
import {
  fetchChapterMemberByNsuId,
  fetchChapterMembers,
} from "@/lib/supabaseMembers";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const { members } = await fetchChapterMembers();
    if (members && members.length > 0) {
      return members
        .filter((member) => Boolean(member.nsuId && member.nsuId !== "N/A"))
        .map((member) => ({
          id: String(member.nsuId),
        }));
    }
  } catch (error) {
    console.error("Error generating static params from Supabase:", error);
  }

  // Fallback to static mock members if Supabase is unreachable
  return membersData.map((member) => ({
    id: String(member.nsuId || member.id),
  }));
}

async function getMember(id: string) {
  // 1. Try Supabase first using NSU ID
  const supaMember = await fetchChapterMemberByNsuId(id);
  if (supaMember) {
    const isExecutive = Boolean(supaMember.executivePosition);
    const position = isExecutive
      ? supaMember.executivePosition!
      : supaMember.teamPosition || "General Member";

    const sigs =
      supaMember.sig && supaMember.sig !== "—" && supaMember.sig !== "None"
        ? [{ name: supaMember.sig, role: supaMember.sigPosition || "Member" }]
        : [];

    return {
      id: supaMember.nsuId,
      nsuId: supaMember.nsuId,
      name: supaMember.name,
      team: supaMember.team,
      teamRole: supaMember.teamPosition,
      chapterRole: supaMember.executivePosition || undefined,
      position,
      sigs,
      joinYear: supaMember.semesterJoined || "Member",
      status: isExecutive ? "Executive" : supaMember.status || "Active",
      email: supaMember.email,
      facebook: supaMember.facebook,
      linkedin: supaMember.linkedin,
      github: supaMember.github,
      photoUrl: supaMember.photoUrl,
    };
  }

  // 2. Fallback to local membersData by nsuId or id
  const fallback = membersData.find(
    (member) => member.nsuId === id || member.id === id,
  );
  if (fallback) {
    return {
      id: fallback.nsuId || fallback.id,
      nsuId: fallback.nsuId,
      name: fallback.name,
      team: fallback.team,
      teamRole: fallback.teamRole,
      chapterRole: fallback.chapterRole,
      position: fallback.position,
      sigs: fallback.sigs.map((sig) => ({ name: sig.name, role: sig.role })),
      joinYear: String(fallback.joinYear),
      status: fallback.status,
      email: fallback.nsuEmail || fallback.personalEmail,
      facebook: undefined,
      linkedin: fallback.linkedin,
      github: fallback.github,
      photoUrl: fallback.avatar,
    };
  }

  return null;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const member = await getMember(id);
  return {
    title: (member?.name || "Member") + " | NSU ACM SC",
    description: member
      ? `${member.name} (${member.position}) - Member Profile, NSU ACM Student Chapter.`
      : "Member Profile | NSU ACM Student Chapter",
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();

  const contributions = Object.values(collections)
    .flatMap((c) => c.items)
    .filter((i) => i.authors?.includes(member.name));

  const hasSocials = Boolean(
    member.email || member.facebook || member.linkedin || member.github,
  );

  return (
    <div className="site-container">
      <Link className="text-link" href="/members">
        ← Member directory
      </Link>
      <PageIntro
        eyebrow={`${member.status} / Profile preview`}
        title={member.name}
        description={`${member.position} · ${member.team} · ${member.sigs.map((sig) => sig.name).join(" / ") || "No SIG"}`}
      />
      <div className="detail-columns">
        <article className="reading-copy">
          {member.photoUrl ? (
            <div className="profile-monogram relative overflow-hidden border-2 border-black">
              <Image
                src={member.photoUrl}
                alt={member.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="profile-monogram">
              {member.name
                .split(" ")
                .slice(0, 2)
                .map((s) => s[0])
                .join("")}
            </div>
          )}
          <h2>A member of the community.</h2>
          <p>
            This preview profile connects the member’s role with contributions
            listed in the current archive.
          </p>
          <h3>Role history</h3>
          <p>
            {member.joinYear.toLowerCase().includes("joined")
              ? member.joinYear
              : `${member.joinYear} — Joined the chapter`}
            <br />
            {member.position} / {member.team}
          </p>
          <p className="notice">
            Personal contact details, NSU ID, phone, and blood group are not
            published here.
          </p>
        </article>
        <aside className="detail-aside">
          <h3>Community</h3>
          <dl>
            <div>
              <dt>Team</dt>
              <dd>
                {member.team} · {member.teamRole}
              </dd>
            </div>
            <div>
              <dt>Special interest groups</dt>
              <dd>
                {member.sigs.length ? (
                  <ul>
                    {member.sigs.map((sig) => (
                      <li key={sig.name}>
                        {sig.name} · {sig.role}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No SIG — membership is optional"
                )}
              </dd>
            </div>
            {member.chapterRole && (
              <div>
                <dt>Chapter role</dt>
                <dd>{member.chapterRole}</dd>
              </div>
            )}
            <div>
              <dt>Status</dt>
              <dd>{member.status}</dd>
            </div>
          </dl>

          {hasSocials && (
            <div className="mt-6 pt-4 border-t border-black/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                Connect
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-white hover:bg-[#ffde59] text-black border border-black neo-interactive inline-flex items-center justify-center"
                    title={`Email ${member.name} (${member.email})`}
                  >
                    <Mail size={16} />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white hover:bg-[#3392cc] hover:text-white text-black border border-black neo-interactive inline-flex items-center justify-center"
                    title={`Facebook: ${member.name}`}
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white hover:bg-[#0077b5] hover:text-white text-black border border-black neo-interactive inline-flex items-center justify-center"
                    title={`LinkedIn: ${member.name}`}
                  >
                    <LinkedinIcon size={16} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white hover:bg-black hover:text-white text-black border border-black neo-interactive inline-flex items-center justify-center"
                    title={`GitHub: ${member.name}`}
                  >
                    <GithubIcon size={16} />
                  </a>
                )}
              </div>
            </div>
          )}

          <Link href="/contact" className="outline-button mt-5">
            Contact the chapter
          </Link>
        </aside>
      </div>
      <SectionTitle number="Contributions" title="Ideas and work." />
      {contributions.length ? (
        <CardGrid items={contributions} />
      ) : (
        <p className="empty-state">
          No public contributions have been linked to this profile yet.
        </p>
      )}
    </div>
  );
}
