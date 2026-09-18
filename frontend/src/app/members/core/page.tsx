import { MemberDirectory } from "@/components/members/MemberDirectory";
import { CoreMembersTabs } from "@/components/members/CoreMembersTabs";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { memberSections, getMappedCoreMembers } from "@/data/memberGroups";
import { fetchChapterMembers } from "@/lib/supabaseMembers";
import { TeamName } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "Core | NSU ACM SC",
  description:
    "Meet the operational leads, coordinators, and SIG leads in the preview roster.",
};

export default async function Page() {
  const { members } = await fetchChapterMembers();
  const mappedCoreMembers = getMappedCoreMembers(members);

  const teams = Array.from(
    new Set(
      mappedCoreMembers
        .map((m) => m.team)
        .filter((t): t is TeamName => Boolean(t) && (t as string) !== "—")
    )
  ).sort();

  const sigs = ["Admin", "Web", "R&D", "D&D", "M&D", "Cultural"];

  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Core"
        title="The people who make it happen."
        description="Meet the operational leads, coordinators, and SIG leads in the preview roster."
      />
      <SectionNav label="Member categories" items={memberSections} />

      <SectionTitle number="01 / Leadership" title="Teams" />
      <div className="mb-12">
        <CoreMembersTabs membersData={mappedCoreMembers} teams={teams} sigs={sigs} />
      </div>

      <section className="statement">
        <h2>Ideas into action.</h2>
        <div>
          <p>
            Core members coordinate work across teams, guide contributors, and
            help deliver chapter activities.
          </p>
          <Link className="text-link" href="/teams&sig">
            Explore teams and special interests
          </Link>
        </div>
      </section>
    </div>
  );
}
