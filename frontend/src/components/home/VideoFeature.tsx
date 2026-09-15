"use client";

import { chapterSocialLinks } from "@/data/contactData";
import { Play } from "lucide-react";
import { useState } from "react";

export function VideoFeature({
  videoId,
  title = "See the chapter in action.",
}: {
  videoId?: string;
  title?: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="video-feature">
      <div className="type-poster" style={{ minHeight: 260 }}>
        <p className="eyebrow">NSU ACM SC / On screen</p>
        <h2 className="text-3xl font-heading font-bold my-6">{title}</h2>
        {videoId ? (
          playing ? (
            <iframe
              title={title}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
            />
          ) : (
            <button
              className="outline-button w-fit"
              onClick={() => setPlaying(true)}
            >
              <Play size={18} />
              Play video
            </button>
          )
        ) : (
          <a
            className="outline-button w-fit"
            href={chapterSocialLinks.YouTube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Play size={18} />
            Visit our YouTube channel
          </a>
        )}
      </div>
    </div>
  );
}
