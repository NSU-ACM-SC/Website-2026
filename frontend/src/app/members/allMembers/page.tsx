import { AllMembersTable } from "@/components/members/AllMembersTable";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { memberSections } from "@/data/memberGroups";

export const metadata = {
  title: "All Members Directory | NSU ACM SC",
  description:
    "Explore the complete chapter roster of North South University ACM Student Chapter, featuring executive leadership, teams, special interest groups, and contact links.",
};

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Master Directory"
        title="One chapter. Many perspectives."
        description="Explore the complete verified chapter roster with live search, multi-criteria filtering, role hierarchy sorting, and instant social connections."
      />
      {/* <SectionNav label="Member categories" items={memberSections} /> */}
      <div className="mt-8">
        <AllMembersTable />
      </div>
    </div>
  );
}

