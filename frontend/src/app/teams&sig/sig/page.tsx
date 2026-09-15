import { SIGCardGrid } from "@/components/teams/SIGCardGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { organizationSections, sigRoles } from "@/data/teamsData";

export const metadata = {
  title: "Special Interest Groups | NSU ACM SC",
  description:
    "Explore the six optional SIGs: R&D, Web, Admin, M&D, D&D, and Cultural. Join multiple SIGs alongside your one required team.",
};

export default function SIGPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Teams & SIGs / SIG"
        title="Six groups. More ways to contribute."
        description="Explore Research and Development, Web, Admin, Media and Documentation, Design and Decor, and Cultural. After joining one team, you can optionally join any number of these SIGs."
      />
      <SectionNav
        label="Teams and SIGs"
        items={organizationSections}
        className="organization-switcher"
      />
      <SectionTitle
        number="01 / Explore your interests"
        title="Find your SIGs."
      />
      <SIGCardGrid category="SIG" />
      <SectionTitle
        number="02 / SIG roles"
        title="A separate role in each group."
      />
      <p className="notice">
        SIGs operate in parallel with teams. Membership is optional, and your
        role can differ between SIGs.
      </p>
      <ol className="role-list">
        {sigRoles.map((role, index) => (
          <li key={role}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {role}
          </li>
        ))}
      </ol>
    </div>
  );
}
