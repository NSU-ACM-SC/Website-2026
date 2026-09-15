import { MemberDirectory } from "@/components/members/MemberDirectory";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { memberSections, publicMembers } from "@/data/memberGroups";

export const metadata = {
  title: "All Members | NSU ACM SC",
  description:
    "Search the public roster, switch between cards and a table, or export your current selection.",
};

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / All Members"
        title="One chapter. Many perspectives."
        description="Search the public roster, switch between cards and a table, or export your current selection."
      />
      <SectionNav label="Member categories" items={memberSections} />
      <MemberDirectory membersData={publicMembers} defaultView="table" />
    </div>
  );
}
