"use client";

import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { chapterEmail, chapterSocialLinks } from "@/data/contactData";
import { Mail } from "lucide-react";
import { useState } from "react";

export function SocialDock() {
  const [active, setActive] = useState<number | null>(null);
  const icons = {
    YouTube: YoutubeIcon,
    Facebook: FacebookIcon,
    LinkedIn: LinkedinIcon,
    GitHub: GithubIcon,
  };
  return (
    <nav
      className="social-dock"
      aria-label="Chapter social links"
      onMouseLeave={() => setActive(null)}
    >
      {Object.entries(chapterSocialLinks).map(([label, href], index) => {
        const Icon = icons[label as keyof typeof icons];
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            data-proximity={
              active === index
                ? "active"
                : active !== null && Math.abs(active - index) === 1
                  ? "near"
                  : undefined
            }
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
      <a
        href={`mailto:${chapterEmail}`}
        aria-label="Email the chapter"
        title="Email"
        onMouseEnter={() => setActive(4)}
        onFocus={() => setActive(4)}
        onBlur={() => setActive(null)}
        data-proximity={
          active === 4 ? "active" : active === 3 ? "near" : undefined
        }
      >
        <Mail size={20} />
      </a>
    </nav>
  );
}
