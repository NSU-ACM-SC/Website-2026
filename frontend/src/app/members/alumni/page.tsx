import { MemberDirectory } from "@/components/members/MemberDirectory";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionNav } from "@/components/ui/SectionNav";
import { memberSections, getMappedAlumniMembers } from "@/data/memberGroups";
import { fetchChapterMembers } from "@/lib/supabaseMembers";
import Link from "next/link";

export const metadata = {
  title: "Alumni | NSU ACM SC",
  description:
    "Meet former members and explore the contributions they have shared with this community.",
};

export default async function Page() {
  const { members } = await fetchChapterMembers();
  const alumniMembers = getMappedAlumniMembers(members);

  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Members / Alumni"
        title="The chapter stays with you."
        description="Meet former members and explore the contributions they have shared with this community."
      />
      <SectionNav label="Member categories" items={memberSections} />
      <MemberDirectory membersData={alumniMembers} showControls={false} fetchCategory="alumni" />
      <section className="statement">
        <h2>Stay connected.</h2>
        <div>
          <p>
            Share your next milestone, offer a mentoring conversation, or
            propose a talk for current students.
          </p>
          <Link className="solid-button" href="/contact">
            Connect with the chapter
          </Link>
        </div>
      </section>
    </div>
  );
}
