import { MemberDirectory } from "@/components/members/MemberDirectory";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { memberSections, getMappedPanelMembers } from "@/data/memberGroups";
import { roleHierarchy } from "@/data/siteContent";
import { fetchChapterMembers } from "@/lib/supabaseMembers";

export const metadata = {
  title: "Panel | NSU ACM SC",
  description:
    "Meet the executive body and faculty advisors supporting the chapter.",
};

export default async function Page() {
  const { members } = await fetchChapterMembers();
  const mappedPanelMembers = getMappedPanelMembers(members);

  const facultyAdvisors = mappedPanelMembers.filter(
    (m) => m.chapterRole === "Faculty Advisor"
  );
  const executiveBody = mappedPanelMembers.filter(
    (m) => m.chapterRole !== "Faculty Advisor"
  );

  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Panel"
        title="Leadership, with purpose."
        description="Meet the executive body and faculty advisors supporting the chapter."
      />
      <SectionNav label="Member categories" items={memberSections} />

      <SectionTitle number="01 / Mentorship" title="Faculty Advisors" />
      <MemberDirectory membersData={facultyAdvisors} showControls={false} centerCardContent={true} overrideTeamName="NSU ACM SC" />

      <SectionTitle number="02 / Leadership" title="Executive Body" />
      <MemberDirectory membersData={executiveBody} showControls={false} centerCardContent={true} overrideTeamName="NSU ACM SC" />

      <SectionTitle
        number="03 / Responsibility"
        title="How the chapter works."
      />
      <ol className="role-list">
        {roleHierarchy.map((role, index) => (
          <li key={role}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {role}
          </li>
        ))}
      </ol>
    </div>
  );
}
