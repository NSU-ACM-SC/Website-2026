import { SocialDock } from "@/components/contact/SocialDock";
import { chapterEmail } from "@/data/contactData";
import { withBasePath } from "@/lib/assets";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-heading">
          <h2>
            Good people.
            <br />
            Great possibilities.
          </h2>
          <Link className="solid-button" href="/join">
            Join the chapter <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <Image
              src={withBasePath("/assets/brand/acm-logo.webp")}
              width={330}
              height={280}
              sizes="66px"
              style={{ width: 66, height: "auto" }}
              alt="NSU ACM Student Chapter"
            />
            <h3 className="mt-5">NSU ACM Student Chapter</h3>
            <p>
              North South University
              <br />
              Bashundhara, Dhaka, Bangladesh
            </p>
            <a href={"mailto:" + chapterEmail}>{chapterEmail}</a>
            <SocialDock />
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/">Home</Link>
            <Link href="/activities/events">Events</Link>
            <Link href="/activities/calender">Calendar</Link>
            <Link href="/activities/achievements">Achievements</Link>
            <Link href="/about">About</Link>
          </div>
          <div>
            <h3>Ideas & resources</h3>
            <Link href="/publications/researchs">Research</Link>
            <Link href="/publications/projects">Projects</Link>
            <Link href="/publications/blogs">Blogs</Link>
            <Link href="/publications/news">News</Link>
            <Link href="/publications/megazines">Magazine</Link>
            <Link href="/publications/gallery">Gallery</Link>
            <Link href="/publications/toolkits">Tool Kit</Link>
            <Link href="/publications/learningResources">
              Learning Resources
            </Link>
          </div>
          <div>
            <h3>Community</h3>
            <Link href="/teams&sig">Teams & SIGs</Link>
            <Link href="/members">Member directory</Link>
            <Link href="/certificates">Verify a certificate</Link>
            <Link href="/contact">Contact US</Link>
            <a
              href="https://dash.nsuacmsc.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Member portal ?
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NSU ACM Student Chapter</span>
          <span>Join. Collaborate. Build. Repeat.</span>
        </div>
      </div>
    </footer>
  );
}
