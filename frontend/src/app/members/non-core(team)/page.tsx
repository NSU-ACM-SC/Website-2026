import { NonCoreMembersTabs } from "@/components/members/NonCoreMembersTabs";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { getMappedNonCoreTeamMembers, nonCoreSections } from "@/data/memberGroups";
import { fetchChapterMembers } from "@/lib/supabaseMembers";
import { TeamName } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "Non-Core Members (Teams) | NSU ACM SC",
  description:
    "Discover active contributors learning, building, and collaborating across the chapter.",
};

export default async function Page() {
  const { members } = await fetchChapterMembers();
  const nonCoreMembers = getMappedNonCoreTeamMembers(members);

  const teams = Array.from(
    new Set(
      nonCoreMembers
        .map((m) => m.team)
        .filter((t): t is TeamName => Boolean(t) && (t as string) !== "—")
    )
  ).sort();

  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Non-Core Members"
        title="Every contribution counts."
        description="Discover active contributors learning, building, and collaborating across the chapter."
      />

      <SectionNav label="Non-Core categories" items={nonCoreSections} />

      <div className="mb-12">
        <NonCoreMembersTabs membersData={nonCoreMembers} teams={teams} />
      </div>

      <section className="statement">
        <h2>Find your next contribution.</h2>
        <div>
          <p>
            Explore a workshop, take part in a project, or find a team that
            shares your interests.
          </p>
          <Link className="solid-button" href="/activities/events">
            Explore activities
          </Link>
        </div>
      </section>
    </div>
  );
}
