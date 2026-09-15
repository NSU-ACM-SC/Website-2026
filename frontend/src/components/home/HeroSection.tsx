import { eventItems } from "@/data/siteContent";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="home-hero">
      <div>
        <p className="eyebrow">
          <span />
          North South University / ACM Student Chapter
        </p>
        <h1>
          Curiosity.
          <br />
          Community.
          <br />
          <em>Creation.</em>
        </h1>
        <p>
          A place for students who ask questions, share what they learn, and
          build things together. Find your people at NSU ACM SC.
        </p>
        <div className="hero-actions">
          <Link className="solid-button" href="/activities">
            Explore the chapter <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href="/join">
            Become a member <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="hero-stack">
        <Image
          className="hero-photo"
          src={eventItems[0].image!}
          width={720}
          height={780}
          priority
          unoptimized
          alt="Collaborative workspace illustrating the chapter community"
        />
        <div className="hero-caption">
          <div>
            <span>JOIN. COLLABORATE. BUILD. REPEAT.</span>
            <strong>A community, made by you.</strong>
          </div>
          <Image src="/assets/brand/acm-logo.webp" alt="NSU ACM SC" width={48} height={48} />
        </div>
      </div>
    </section>
  );
}
