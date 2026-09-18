"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/assets";
import { useEffect, useRef, useState } from "react";

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
  maxWaitMs?: number;
}

export function WordsPreloader({
  isLoading = false,
  onComplete,
  duration = 300,
  words = DEFAULT_WORDS,
  maxWaitMs = 8000,
}: WordsPreloaderProps) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /*
   * Reduced motion
   */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mq.addEventListener("change", handler);

    return () => {
      mq.removeEventListener("change", handler);
    };
  }, []);

  /*
   * Lock body scroll while the preloader is active.
   * This is especially important for iOS/mobile Safari.
   */
  useEffect(() => {
    if (finished || unmounted) return;

    const scrollY = window.scrollY;
    const body = document.body;

    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;

      window.scrollTo(0, scrollY);
    };
  }, [finished, unmounted]);

  useEffect(() => {
    let cancelled = false;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let rafId: number | null = null;

    let currentIdx = 0;

    const wordCount = words.length;

    const timeout = (callback: () => void, delay: number) => {
      const id = setTimeout(() => {
        if (!cancelled) {
          callback();
        }
      }, delay);

      timers.push(id);

      return id;
    };

    const finish = () => {
      if (cancelled) return;

      timeout(() => {
        if (cancelled) return;

        setFinished(true);
        onCompleteRef.current?.();
      }, reducedMotion ? 0 : 1500);
    };

    const cycleNext = () => {
      if (cancelled) return;

      currentIdx += 1;

      setIndex(currentIdx);

      if (currentIdx < wordCount) {
        rafId = requestAnimationFrame(() => {
          if (cancelled) return;

          timeout(cycleNext, duration);
        });

        return;
      }
      finish();
    };

    timeout(cycleNext, duration);

    return () => {
      cancelled = true;

      timers.forEach((timer) => clearTimeout(timer));

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };


  }, []);

  useEffect(() => {
    if (!finished) return;

    if (reducedMotion) {
      setUnmounted(true);
      return;
    }

    const timer = setTimeout(() => {
      setUnmounted(true);
    }, 1100);

    return () => clearTimeout(timer);
  }, [finished, reducedMotion]);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-[#f1eee7] text-[#111111] ${reducedMotion
        ? ""
        : "transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
        } ${finished
          ? "-translate-y-full pointer-events-none"
          : "translate-y-0"
        }`}
      aria-hidden="true"
    >
      <div className="overflow-hidden h-20 sm:h-24 md:h-32 flex items-center justify-center w-full px-4">
        {index < words.length ? (
          <span
            key={reducedMotion ? "static" : index}
            className={`text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight select-none whitespace-nowrap ${reducedMotion ? "" : "animate-word-slide"
              }`}
          >
            {words[index]?.text ?? ""}
          </span>
        ) : (
          <div className="flex items-center justify-center h-16 sm:h-20 md:h-28">
            {/* ACM Logo */}
            <div className="overflow-hidden flex items-center justify-end pr-3 sm:pr-5 md:pr-6 h-full">
              <Image
                key="logo"
                src={withBasePath("/assets/brand/acm-logo.webp")}
                alt="ACM Logo"
                width={400}
                height={400}
                priority
                className={`h-12 sm:h-16 md:h-24 w-auto object-contain shrink-0 ${reducedMotion ? "" : "animate-logo-reveal"
                  }`}
              />
            </div>

            {/* Divider */}
            <div
              className={`w-[3px] md:w-[4px] h-[70%] bg-[#111111] shrink-0 rounded-full ${reducedMotion ? "" : "animate-divider-scale"
                }`}
            />

            {/* NSU ACM SC */}
            <div className="overflow-hidden flex items-center justify-start pl-3 sm:pl-5 md:pl-6 h-full">
              <p
                className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight select-none whitespace-nowrap ${reducedMotion ? "" : "animate-text-reveal"
                  }`}
              >
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
