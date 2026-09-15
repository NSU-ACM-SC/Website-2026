"use client";
import Image from "next/image";
import { withBasePath } from "@/lib/assets";
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
        src={withBasePath("/assets/brand/acm-logo.webp")}
        alt=""
        width={330}
        height={280}
        sizes="58px"
        style={{ width: 58, height: "auto" }}
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
