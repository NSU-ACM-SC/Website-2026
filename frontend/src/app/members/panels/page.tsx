import { ExecutiveBoard } from "@/components/teams/ExecutiveBoard";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { memberSections } from "@/data/memberGroups";
import { roleHierarchy } from "@/data/siteContent";

export const metadata = {
  title: "Panel | NSU ACM SC",
  description:
    "Meet the executive body and faculty advisors supporting the chapter.",
};

export default function Page() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Panel"
        title="Leadership, with purpose."
        description="Meet the executive body and faculty advisors supporting the chapter."
      />
      <SectionNav label="Member categories" items={memberSections} />
      <ExecutiveBoard />
      <SectionTitle
        number="02 / Responsibility"
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
