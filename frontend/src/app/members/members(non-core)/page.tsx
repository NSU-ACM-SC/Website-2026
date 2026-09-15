import { MemberDirectory } from "@/components/members/MemberDirectory";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { memberSections, nonCoreMembers } from "@/data/memberGroups";
import Link from "next/link";

export const metadata = {
  title: "Non-Core Members | NSU ACM SC",
  description:
    "Discover active contributors learning, building, and collaborating across the chapter.",
};

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Non-Core Members"
        title="Every contribution counts."
        description="Discover active contributors learning, building, and collaborating across the chapter."
      />
      <SectionNav label="Member categories" items={memberSections} />
      <MemberDirectory membersData={nonCoreMembers} />
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
