import { EventShowcase } from "@/components/events/EventShowcase";
import { collections } from "@/data/siteContent";

const collection = collections["activities/events"];
export const metadata = {
  title: collection.eyebrow + " | NSU ACM SC",
  description: collection.description,
};

export default function Page() {
  return (
    <div className="site-container">
      <header className="events-hero">
        <p className="events-kicker">Flagship programs &amp; workshops</p>
        <h1>
          EVENT SHOWCASE
          <br />
          <span>&amp; WORKSHOPS</span>
        </h1>
        <p>{collection.description}</p>
      </header>
      <EventShowcase />
    </div>
  );
}
