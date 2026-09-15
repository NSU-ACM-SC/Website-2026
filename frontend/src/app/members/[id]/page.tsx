import { CardGrid } from "@/components/ui/CardGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { collections, membersData } from "@/data/siteContent";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return membersData.map((member) => ({ id: member.id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title:
      (membersData.find((member) => member.id === id)?.name || "Member") +
      " | NSU ACM SC",
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const member = membersData.find((member) => member.id === id);
  if (!member) notFound();
  const contributions = Object.values(collections)
    .flatMap((c) => c.items)
    .filter((i) => i.authors?.includes(member.name));
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
          <div className="profile-monogram">
            {member.name
              .split(" ")
              .slice(0, 2)
              .map((s) => s[0])
              .join("")}
          </div>
          <h2>A member of the community.</h2>
          <p>
            This preview profile connects the member’s role with contributions
            listed in the current archive.
          </p>
          <h3>Role history</h3>
          <p>
            {member.joinYear} — Joined the chapter
            <br />
            {member.position} / {member.team}
          </p>
          <p className="notice">
            Photo, biography, tenure dates, and verified social profiles have
            not been supplied. Personal contact details, NSU ID, phone, and
            blood group are not published here.
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
