import { ContactForm } from "@/components/contact/ContactForm";
import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";
import { CardGrid } from "@/components/ui/CardGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { collections, eventItems } from "@/data/siteContent";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Join | NSU ACM SC" };

export default function JoinPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Recruitment / Join"
        title="Your next chapter starts here."
        description="Bring your curiosity. Find collaborators. Take your first step into the NSU ACM community."
      >
        <a href="https://dash.nsuacmsc.org" className="solid-button">
          Open recruitment portal <ArrowUpRight size={18} />
        </a>
      </PageIntro>
      <div className="number-strip">
        {[
          ["01", "Explore teams"],
          ["02", "Choose your interests"],
          ["03", "Apply through the portal"],
          ["04", "Meet the community"],
        ].map(([n, label]) => (
          <div key={n}>
            <strong>{n}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="notice">
        Recruitment dates, fees, eligibility, and available places are confirmed
        through the chapter portal. This website does not collect payments or
        submit membership applications.
      </p>
      <div className="detail-columns">
        <ContactForm kind="recruitment" />
        <aside className="detail-aside">
          <h3>Where will you begin?</h3>
          <p className="text-sm leading-7 mt-4">
            Choose exactly one team first. Then optionally join multiple SIGs.
            Teams and SIGs work in parallel, and your role in each is
            independent.
          </p>
          <div className="action-stack">
            <Link className="outline-button" href="/teams&sig">
              Browse teams
            </Link>
            <Link className="outline-button" href="/contact">
              Ask about recruitment
            </Link>
          </div>
        </aside>
      </div>
      <SectionTitle
        number="Featured / What you can do"
        title="Learn by taking part."
      />
      <CardGrid items={eventItems.slice(0, 3)} />
      <SectionTitle
        number="Featured / Community work"
        title="Build something together."
      />
      <CardGrid
        items={collections["publications/projects"].items.slice(0, 3)}
      />
      <NewsletterSubscribe />
    </div>
  );
}
