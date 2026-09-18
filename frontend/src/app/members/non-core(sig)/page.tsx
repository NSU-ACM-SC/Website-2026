import { NonCoreSigTabs } from "@/components/members/NonCoreSigTabs";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { getMappedNonCoreSigMembers, nonCoreSections } from "@/data/memberGroups";
import { fetchChapterMembers } from "@/lib/supabaseMembers";
import Link from "next/link";

export const metadata = {
  title: "Non-Core Members (SIGs) | NSU ACM SC",
  description:
    "Discover active contributors learning, building, and collaborating across the chapter.",
};

export default async function Page() {
  const { members } = await fetchChapterMembers();
  const nonCoreMembers = getMappedNonCoreSigMembers(members);

  const sigs = ["Admin", "R&D", "Web", "M&D", "D&D", "Cultural"];

  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Non-Core Members"
        title="Every contribution counts."
        description="Discover active contributors learning, building, and collaborating across the chapter."
      />

      <SectionNav label="Non-Core categories" items={nonCoreSections} />

      <div className="mb-12">
        <NonCoreSigTabs membersData={nonCoreMembers} sigs={sigs} />
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
