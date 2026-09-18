import { MemberDirectory } from "@/components/members/MemberDirectory";
import { CoreSigTabs } from "@/components/members/CoreSigTabs";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getMappedCoreMembers } from "@/data/memberGroups";
import { fetchChapterMembers } from "@/lib/supabaseMembers";
import Link from "next/link";

export const metadata = {
  title: "Core (SIG) | NSU ACM SC",
  description:
    "Meet the coordinators and moderators of the Special Interest Groups.",
};

export default async function Page() {
  const { members } = await fetchChapterMembers();
  const mappedCoreMembers = getMappedCoreMembers(members);

  const sigs = ["Admin", "R&D", "Web", "M&D", "D&D", "Cultural"];

  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Core (SIG)"
        title="The people who make it happen."
        description="Meet the coordinators and moderators of the Special Interest Groups."
      />

      <div className="mb-12">
        <CoreSigTabs membersData={mappedCoreMembers} sigs={sigs} />
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
