import { MemberDirectory } from "@/components/members/MemberDirectory";
import { publicMembers } from "@/data/memberGroups";
import { DetailPage } from "@/components/ui/ContentDetail";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionNav } from "@/components/ui/SectionNav";
import { teamItems } from "@/data/siteContent";
import { organizationSections, sigGroups, teamNames } from "@/data/teamsData";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return teamItems.map((team) => ({ slug: team.id }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title:
      (teamItems.find((team) => team.id === slug)?.title || "Team") +
      " | NSU ACM SC",
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const team = teamItems.find((team) => team.id === slug);
  if (!team) notFound();
  const teamName = teamNames.find((name) => name.toLowerCase() === slug);
  const sigName = sigGroups.find((sig) => sig.id === slug)?.name;
  const roster = publicMembers.filter((member) =>
    teamName
      ? member.team === teamName
      : member.sigs.some((sig) => sig.name === sigName),
  );
  return (
    <div className="site-container">
      <SectionNav
        label="Teams and SIGs"
        items={organizationSections}
        className="organization-switcher"
        activeHref={
          team.category === "Team" ? "/teams&sig/team" : "/teams&sig/sig"
        }
      />
      <DetailPage
        item={{
          ...team,
          details: team.details || [
            team.description,
            "Members learn through collaboration, chapter activities, and shared projects. Contact the chapter for the current work plan and meeting schedule.",
          ],
          facts: {
            ...team.facts,
            Leadership:
              team.category === "Team"
                ? "Sub Executive / InCharge"
                : "Coordinator / Moderator",
            Membership:
              team.category === "Team"
                ? "Required: exactly one team per member"
                : "Optional: multiple SIGs allowed after joining a team",
            Recruitment: "Apply through the member portal",
          },
          links: [{ label: "Membership & recruitment", href: "/join" }],
        }}
        back={team.category === "Team" ? "/teams&sig/team" : "/teams&sig/sig"}
      />
      <SectionTitle
        number="Community"
        title="People & contributions"
        href="/members"
      />
      <MemberDirectory 
        membersData={roster} 
        fetchCategory="roster" 
        rosterTeamName={teamName} 
        rosterSigName={sigName} 
      />
      <p className="notice">
        Current team-specific leaders, rosters, tenure history, and event
        assignments await verified chapter data.
      </p>
    </div>
  );
}
