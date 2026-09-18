"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/assets";
import { useEffect, useState } from "react";

const DEFAULT_WORDS = [
  { text: "Join.", lang: "English" },
  { text: "Collaborate.", lang: "English" },
  { text: "Build.", lang: "English" },
  { text: "Repeat.", lang: "English" },
];

export interface WordsPreloaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
  duration?: number;
  words?: { text: string; lang: string }[];
}

export function WordsPreloader({
  isLoading = false,
  onComplete,
  duration = 300,
  words = DEFAULT_WORDS,
}: WordsPreloaderProps) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  // Lock body scroll while preloader is active
  useEffect(() => {
    if (!finished && !unmounted) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [finished, unmounted]);

  // Words cycling timer - coordinates with backend data fetching
  useEffect(() => {
    if (finished || unmounted) return;

    if (index < words.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      // Reached the final state (Logo)
      // If backend data is still loading, wait until isLoading becomes false
      if (isLoading) {
        return;
      }

      const exitTimer = setTimeout(() => {
        setFinished(true);
        onComplete?.();
      }, 1500); // Give the final reveal animation time to play out

      return () => clearTimeout(exitTimer);
    }
  }, [index, duration, onComplete, finished, unmounted, words.length, isLoading]);

  // Completely unmount from DOM 1.1s after exit slide-up finishes
  useEffect(() => {
    if (!finished) return;

    const unmountTimer = setTimeout(() => {
      setUnmounted(true);
    }, 1100);

    return () => clearTimeout(unmountTimer);
  }, [finished]);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-[#f1eee7] text-[#111111] transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${finished ? "-translate-y-full pointer-events-none" : "translate-y-0"
        }`}
      aria-hidden="true"
    >
      <div className="overflow-hidden h-24 md:h-32 flex items-center justify-center w-full px-4">
        {index < words.length ? (
          <span
            key={index}
            className="text-4xl md:text-6xl font-medium tracking-tight animate-word-slide select-none whitespace-nowrap"
          >
            {words[index]?.text ?? ""}
          </span>
        ) : (
          <div className="flex items-center justify-center h-20 md:h-28">
            <div className="overflow-hidden flex items-center justify-end pr-5 md:pr-6 h-full">
              <Image
                key="logo"
                src={withBasePath("/assets/brand/acm-logo.webp")}
                alt="ACM Logo"
                width={400}
                height={400}
                priority
                className="h-16 md:h-24 w-auto object-contain shrink-0 animate-logo-reveal"
              />
            </div>
            
            <div className="w-[3px] md:w-[4px] h-[70%] bg-[#111111] shrink-0 animate-divider-scale rounded-full"></div>
            
            <div className="overflow-hidden flex items-center justify-start pl-5 md:pl-6 h-full">
              <p className="text-3xl md:text-5xl font-bold tracking-tight select-none whitespace-nowrap animate-text-reveal">
                NSU ACM SC
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WordsPreloader;
