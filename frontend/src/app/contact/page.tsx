import { CampusLocationMap } from "@/components/home/CampusLocationMap";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQAccordion } from "@/components/contact/FAQAccordion";
import { NewsletterSubscribe } from "@/components/contact/NewsletterSubscribe";
import { SocialDock } from "@/components/contact/SocialDock";
import { PageIntro } from "@/components/ui/PageIntro";
import { chapterEmail } from "@/data/contactData";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Contact | NSU ACM SC" };

export default function ContactPage() {
  return (
    <div className="site-container">
      <PageIntro
        eyebrow="Contact US"
        title="Good work starts with a hello."
        description="Have a question, an idea for a collaboration, or an opportunity to share? Get in touch with the chapter."
      />
      <div className="detail-columns">
        <ContactForm />
        <aside className="detail-aside">
          <h3>Find us here.</h3>
          <dl>
            <div>
              <dt>Campus</dt>
              <dd>
                North South University
                <br />
                Bashundhara, Dhaka, Bangladesh
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a className="text-link" href={`mailto:${chapterEmail}`}>
                  {chapterEmail}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            <SocialDock />
          </div>
          <a
            className="text-link mt-6"
            href="https://www.google.com/maps/search/?api=1&query=North+South+University+Dhaka"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open campus map <ArrowUpRight size={16} />
          </a>
        </aside>
      </div>
      <CampusLocationMap />
      <FAQAccordion />
      <ContactForm kind="question" />
      <NewsletterSubscribe />
    </div>
  );
}
