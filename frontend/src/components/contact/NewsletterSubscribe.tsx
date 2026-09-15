import { chapterEmail } from "@/data/contactData";
import { ArrowUpRight } from "lucide-react";

export function NewsletterSubscribe() {
  return (
    <section className="newsletter-bar">
      <div>
        <p className="eyebrow">The chapter dispatch</p>
        <h2>Good things. In your inbox.</h2>
        <p>
          Ask to receive chapter news, learning opportunities, and event
          announcements.
        </p>
      </div>
      <a
        className="outline-button"
        href={`mailto:${chapterEmail}?subject=Newsletter%20subscription%20request`}
      >
        Request subscription <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
