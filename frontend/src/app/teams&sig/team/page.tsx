import { SIGCardGrid } from "@/components/teams/SIGCardGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { organizationSections, teamRoles } from "@/data/teamsData";

export const metadata = {
  title: "Teams | NSU ACM SC",
  description:
    "Explore Corporate, Promotion, Provision, and Publication. Every chapter member joins exactly one team.",
};

export default function TeamPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Teams & SIGs / Team"
        title="Four teams. One shared purpose."
        description="Corporate, Promotion, Provision, and Publication keep the chapter moving. Every member belongs to exactly one team and may also join optional SIGs."
      />
      <SectionNav
        label="Teams and SIGs"
        items={organizationSections}
        className="organization-switcher"
      />
      <SectionTitle number="01 / Choose one" title="Find your team." />
      <SIGCardGrid category="Team" />
      <SectionTitle
        number="02 / Team roles"
        title="Responsibility within your team."
      />
      <p className="notice">
        Your team role is independent of any role you hold in a SIG.
      </p>
      <ol className="role-list">
        {teamRoles.map((role, index) => (
          <li key={role}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {role}
          </li>
        ))}
      </ol>
    </div>
  );
}
