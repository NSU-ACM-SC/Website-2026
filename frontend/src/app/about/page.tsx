import { HistoryMission } from "@/components/teams/HistoryMission";
import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About | NSU ACM SC" };

export default function AboutPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="About / NSU ACM SC"
        title="Computing connects us."
        description="A student chapter built around curiosity, collaboration, and the people who turn ideas into work."
      />
      <div className="statement">
        <Image
          src="/assets/brand/acm-logo.webp"
          width={330}
          height={280}
          sizes="260px"
          style={{ width: 260, height: "auto" }}
          alt="NSU ACM Student Chapter logo"
        />
        <div>
          <h2>
            A local chapter.
            <br />A wider community.
          </h2>
          <p>
            NSU ACM SC is the ACM student community at North South University.
            Our activities bring together students interested in computing,
            research, technology, and service.
          </p>
          <p>
            Explore the global association, regional communities, and the
            chapter’s place in Bangladesh.
          </p>
        </div>
      </div>
      <div className="editorial-grid">
        {[
          [
            "ACM",
            "The Association for Computing Machinery brings together the computing community.",
            "https://www.acm.org/",
          ],
          [
            "Regional communities",
            "Explore ACM's regional councils and computing communities.",
            "https://www.acm.org/chapters",
          ],
          [
            "ACM in Bangladesh",
            "Find student and professional chapters through ACM’s chapter directory.",
            "https://www.acm.org/chapters/find-a-chapter",
          ],
        ].map(([title, text, href]) => (
          <a
            className="profile-card"
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="eyebrow">Explore ACM</p>
            <h3>{title}</h3>
            <p>{text}</p>
            <ArrowUpRight className="mt-4" />
          </a>
        ))}
      </div>
      <SectionTitle
        number="02 / Our chapter"
        title="Learn. Contribute. Belong."
      />
      <p className="reading-copy leading-8">
        Our mission is to create opportunities for students to develop their
        skills, share knowledge, and work together. Our vision is a supportive
        computing community whose ideas make a meaningful difference.
      </p>
      <div className="hero-actions">
        <Link className="solid-button" href="/teams&sig">
          Explore teams & SIGs
        </Link>
        <Link className="outline-button" href="/contact">
          Contact the chapter
        </Link>
      </div>
      <HistoryMission />
      <NewsletterSubscribe />
    </div>
  );
}
