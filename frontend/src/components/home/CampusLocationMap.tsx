"use client";
import { useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";

export function CampusLocationMap() {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="campus-map" aria-labelledby="campus-heading">
      <div>
        <p className="eyebrow">Our campus</p>
        <h2 id="campus-heading">Find us at NSU.</h2>
        <p>
          North South University
          <br />
          Bashundhara, Dhaka, Bangladesh
        </p>
        <a
          className="outline-button"
          href="https://www.google.com/maps/search/?api=1&query=North+South+University+Dhaka"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="campus-map-preview">
        {loaded ? (
          <iframe
            title="North South University campus map"
            src="https://maps.google.com/maps?q=North%20South%20University%20Dhaka&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button className="map-load" onClick={() => setLoaded(true)}>
            <MapPin size={44} />
            <strong>North South University</strong>
            <span>Load interactive map</span>
          </button>
        )}
      </div>
    </section>
  );
}
