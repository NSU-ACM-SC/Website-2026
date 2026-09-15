"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Original, CSS-based interpretation of the word-preloader reference.
export function ChapterIntro() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("chapter-intro-seen")) return;
      sessionStorage.setItem("chapter-intro-seen", "true");
    } catch {
      return;
    }
    const frame = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);
  if (!visible) return null;
  return (
    <div className="chapter-intro" aria-hidden="true">
      <Image
        src="/assets/brand/acm-logo.webp"
        alt=""
        width={58}
        height={58}
        style={{ width: "auto", height: "auto" }}
      />
      <div className="intro-words">
        <span>Join.</span>
        <span>Collaborate.</span>
        <span>Build.</span>
        <span>Repeat.</span>
      </div>
    </div>
  );
}
