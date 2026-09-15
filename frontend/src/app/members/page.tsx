import { AlumniGrid } from "@/components/members/AlumniGrid";
import { MemberDirectory } from "@/components/members/MemberDirectory";
import { MemberStats } from "@/components/members/MemberStats";
import { PublicMemberTable } from "@/components/members/PublicMemberTable";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { memberSections, publicMembers } from "@/data/memberGroups";
import { membersData } from "@/data/membersData";

export const metadata = { title: "Members | NSU ACM SC" };

export default function MembersPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="People / Directory"
        title="The people behind the work."
        description="Explore members by year, team, role, and special interest. Open a profile to see their public contributions."
      />
      <SectionNav label="Member categories" items={memberSections} />
      <MemberDirectory membersData={publicMembers} />
      <SectionTitle
        number="Public record"
        title="The directory, at a glance."
      />
      <PublicMemberTable members={publicMembers} />
      <SectionTitle
        number="02 / Directory statistics"
        title="A snapshot of this community."
      />
      <p className="notice">
        Counts reflect the preview directory, not official chapter totals.
        Gender ratios and admissions statistics require verified data.
      </p>
      <MemberStats members={membersData} />
      <SectionTitle number="03 / Alumni" title="Beyond campus." />
      <AlumniGrid members={membersData} />
    </div>
  );
}
