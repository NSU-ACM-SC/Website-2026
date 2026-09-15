import { VideoFeature } from "@/components/home/VideoFeature";
import { SectionNav } from "@/components/ui/SectionNav";
import { organizationSections } from "@/data/teamsData";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { roleHierarchy } from "@/data/siteContent";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Teams & SIGs | NSU ACM SC" };

export default function TeamsPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Teams & SIGs"
        title="Find your kind of people."
        description="Four teams and six SIGs, working in parallel. Every member joins exactly one team, then may optionally join multiple SIGs."
      >
        <Link className="solid-button" href="/members">
          Meet our members <ArrowUpRight size={18} />
        </Link>
      </PageIntro>
      <SectionNav
        label="Teams and SIGs"
        items={organizationSections}
        className="organization-switcher"
      />
      <SectionTitle number="01 / Our structure" title="Ways to contribute." />
      <div className="organization-overview">
        <Link href="/teams&sig/team" className="profile-card">
          <p className="eyebrow">Required / Choose one</p>
          <h3>Four teams.</h3>
          <p>
            Corporate, Promotion, Provision, and Publication. Every member joins
            exactly one team.
          </p>
          <span className="text-link mt-5">
            Explore teams <ArrowUpRight size={18} />
          </span>
        </Link>
        <Link href="/teams&sig/sig" className="profile-card">
          <p className="eyebrow">Optional / Choose multiple</p>
          <h3>Six SIGs.</h3>
          <p>
            R&D, Web, Admin, M&D, D&D, and Cultural. Join the groups that
            interest you alongside your team.
          </p>
          <span className="text-link mt-5">
            Explore SIGs <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>
      <VideoFeature title="Different interests. A shared chapter." />
      <section id="executives" className="statement">
        <div>
          <p className="eyebrow">02 / Chapter structure</p>
          <h2>
            Responsibility.
            <br />
            At every level.
          </h2>
        </div>
        <ol className="space-y-4">
          {roleHierarchy.map((r, i) => (
            <li className="border-b border-black pb-3 text-sm" key={r}>
              <span className="mr-4 font-mono text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              {r}
            </li>
          ))}
        </ol>
      </section>
      <Link href="/members" className="solid-button">
        Explore members & roles <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
