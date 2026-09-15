import { MemberDirectory } from "@/components/members/MemberDirectory";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { coreMembers, memberSections } from "@/data/memberGroups";
import Link from "next/link";

export const metadata = {
  title: "Core | NSU ACM SC",
  description:
    "Meet the operational leads, coordinators, and SIG leads in the preview roster.",
};

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Core"
        title="The people who make it happen."
        description="Meet the operational leads, coordinators, and SIG leads in the preview roster."
      />
      <SectionNav label="Member categories" items={memberSections} />
      <MemberDirectory membersData={coreMembers} />
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
