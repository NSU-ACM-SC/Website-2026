import { WhyNSUACM } from "@/components/home/WhyNSUACM";
import { CampusLocationMap } from "@/components/home/CampusLocationMap";
import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickStats } from "@/components/home/QuickStats";
import { VideoFeature } from "@/components/home/VideoFeature";
import { CardGrid } from "@/components/ui/CardGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { galleryMedia } from "@/data/eventsData";
import {
  achievementItems,
  eventItems,
  membersData,
  teamItems,
} from "@/data/siteContent";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Home | NSU ACM SC" };

export default function HomePage() {
  return (
    <div className="site-container">
      <HeroSection />
      <QuickStats />
      <section className="statement">
        <div>
          <p className="eyebrow">01 / What is NSU ACM?</p>
          <h2>
            Big ideas.
            <br />
            Shared beginnings.
          </h2>
        </div>
        <div>
          <p>
            NSU ACM Student Chapter brings students together through computing,
            research, and community projects. Whether you are writing your first
            program or exploring a research question, there is room to learn and
            contribute.
          </p>
          <p>
            Our vision is a student community that shares knowledge openly,
            supports one another, and turns curiosity into useful work.
          </p>
          <Link href="/about" className="text-link">
            Get to know the chapter <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <SectionTitle
        number="02 / On the calendar"
        title="Make room for what’s next."
        href="/activities/events"
      />
      <CardGrid items={eventItems.slice(0, 3)} />
      <SectionTitle
        number="03 / Learn by doing"
        title="Workshops & conversations."
        href="/activities/calender"
      />
      <CardGrid
        items={eventItems
          .filter(
            (e) => e.category === "Workshop" || e.category === "Tech Talk",
          )
          .slice(0, 3)}
      />
      <SectionTitle
        number="04 / Find your people"
        title="Different skills. Shared purpose."
        href="/teams&sig"
      />
      <CardGrid items={teamItems.slice(0, 3)} />
      <SectionTitle
        number="05 / The people"
        title="Meet the community."
        href="/members"
      />
      <div className="profile-grid">
        {membersData.slice(0, 3).map((m) => (
          <Link className="profile-card" href={`/members/${m.id}`} key={m.id}>
            <div className="profile-monogram">
              {m.name
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")}
            </div>
            <p className="eyebrow">Preview / {m.position}</p>
            <h3>{m.name}</h3>
            <p>{m.team}</p>
          </Link>
        ))}
      </div>
      <SectionTitle
        number="06 / In good company"
        title="Moments worth keeping."
        href="/publications/gallery"
      />
      <div className="editorial-grid">
        {galleryMedia.slice(0, 3).map((g) => (
          <Link
            className="gallery-tile"
            href="/publications/gallery"
            key={g.id}
          >
            <Image
              src={g.imageUrl}
              alt={g.title}
              width={600}
              height={400}
              unoptimized
            />
            <span>{g.title} ↗</span>
          </Link>
        ))}
      </div>
      <SectionTitle
        number="07 / Moving forward"
        title="Small steps. Lasting impact."
        href="/activities/achievements"
      />
      <CardGrid items={achievementItems.slice(-3)} />
      <WhyNSUACM />
      <VideoFeature />
      <CampusLocationMap />
      <NewsletterSubscribe />
    </div>
  );
}
