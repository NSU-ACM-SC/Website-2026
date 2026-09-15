"use client";

import { gsap } from "gsap";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

export interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
  cursorColor?: string;
  cursorColorOnTarget?: string;
}

const pointerQuery =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const subscribeToPointer = (onChange: () => void) => {
  const query = window.matchMedia(pointerQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const TargetCursor = ({
  targetSelector = [
    ".cursor-target",
    "a",
    "button",
    "[role='button']",
    "input:not([type='hidden'])",
    "textarea",
    "select",
    "summary",
  ].join(", "),
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = "#000000",
  cursorColorOnTarget,
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const spinTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const tickerRef = useRef<(() => void) | null>(null);
  const targetPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
  const activeStrengthRef = useRef({ current: 0 });

  const enabled = useSyncExternalStore(
    subscribeToPointer,
    () => window.matchMedia(pointerQuery).matches,
    () => false,
  );
  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!enabled || !cursor) return;
    const dot = dotRef.current;

    const originalBodyCursor = document.body.style.cursor;
    const originalHtmlCursor = document.documentElement.style.cursor;
    let cursorStyle: HTMLStyleElement | null = null;

    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
      document.documentElement.style.cursor = "none";
      cursorStyle = document.createElement("style");
      cursorStyle.dataset.targetCursor = "true";
      cursorStyle.textContent =
        "*, *::before, *::after { cursor: none !important; }";
      document.head.appendChild(cursorStyle);
    }

    cornersRef.current =
      cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner");
    const corners = Array.from(cornersRef.current);
    const activeStrength = activeStrengthRef.current;
    let activeTarget: Element | null = null;
    let targetLeaveHandler: (() => void) | null = null;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const startSpin = () => {
      spinTimelineRef.current?.kill();
      spinTimelineRef.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, {
          rotation: "+=360",
          duration: spinDuration,
          ease: "none",
        });
    };
    startSpin();

    const ticker = () => {
      if (!targetPositionsRef.current || !cornersRef.current) return;
      const strength = activeStrength.current;
      if (strength === 0) return;
      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;

      Array.from(cornersRef.current).forEach((corner, index) => {
        const currentX = gsap.getProperty(corner, "x") as number;
        const currentY = gsap.getProperty(corner, "y") as number;
        const targetX = targetPositionsRef.current![index].x - cursorX;
        const targetY = targetPositionsRef.current![index].y - cursorY;
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: currentX + (targetX - currentX) * strength,
          y: currentY + (targetY - currentY) * strength,
          duration,
          ease: duration === 0 ? "none" : "power1.out",
          overwrite: "auto",
        });
      });
    };
    tickerRef.current = ticker;

    const resetTarget = () => {
      if (!activeTarget) return;
      if (targetLeaveHandler) {
        activeTarget.removeEventListener("mouseleave", targetLeaveHandler);
      }
      gsap.ticker.remove(ticker);
      targetPositionsRef.current = null;
      gsap.set(activeStrength, { current: 0, overwrite: true });

      if (cursorColorOnTarget) {
        gsap.to(corners, { borderColor: cursorColor, duration: 0.15 });
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: cursorColor,
            duration: 0.15,
          });
        }
      }

      const { cornerSize } = constants;
      const restingPositions = [
        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
        { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
      ];
      corners.forEach((corner, index) => {
        gsap.to(corner, {
          ...restingPositions[index],
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      });

      activeTarget = null;
      targetLeaveHandler = null;
      resumeTimer = setTimeout(() => {
        if (!activeTarget) startSpin();
        resumeTimer = null;
      }, 50);
    };

    const handleMouseMove = (event: MouseEvent) => {
      moveCursor(event.clientX, event.clientY);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const directTarget = event.target;
      if (!(directTarget instanceof Element)) return;
      const target = directTarget.closest(targetSelector);
      if (!target || target === activeTarget) return;

      resetTarget();
      if (resumeTimer) {
        clearTimeout(resumeTimer);
        resumeTimer = null;
      }

      activeTarget = target;
      spinTimelineRef.current?.pause();
      gsap.killTweensOf(cursor, "rotation");
      gsap.set(cursor, { rotation: 0 });

      if (cursorColorOnTarget) {
        gsap.to(corners, {
          borderColor: cursorColorOnTarget,
          duration: 0.15,
        });
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: cursorColorOnTarget,
            duration: 0.15,
          });
        }
      }

      const rect = target.getBoundingClientRect();
      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;
      const { borderWidth, cornerSize } = constants;
      targetPositionsRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        {
          x: rect.right + borderWidth - cornerSize,
          y: rect.top - borderWidth,
        },
        {
          x: rect.right + borderWidth - cornerSize,
          y: rect.bottom + borderWidth - cornerSize,
        },
        {
          x: rect.left - borderWidth,
          y: rect.bottom + borderWidth - cornerSize,
        },
      ];

      gsap.ticker.add(ticker);
      gsap.to(activeStrength, {
        current: 1,
        duration: hoverDuration,
        ease: "power2.out",
      });
      corners.forEach((corner, index) => {
        gsap.to(corner, {
          x: targetPositionsRef.current![index].x - cursorX,
          y: targetPositionsRef.current![index].y - cursorY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      targetLeaveHandler = resetTarget;
      target.addEventListener("mouseleave", targetLeaveHandler);
    };

    const handleScroll = () => {
      if (!activeTarget) return;
      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;
      const elementUnderPointer = document.elementFromPoint(cursorX, cursorY);
      if (
        !elementUnderPointer ||
        (elementUnderPointer !== activeTarget &&
          elementUnderPointer.closest(targetSelector) !== activeTarget)
      ) {
        resetTarget();
      }
    };

    const handleMouseDown = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 0.7, duration: 0.2 });
      gsap.to(cursor, { scale: 0.9, duration: 0.2 });
    };
    const handleMouseUp = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      gsap.ticker.remove(ticker);
      if (resumeTimer) clearTimeout(resumeTimer);
      if (activeTarget && targetLeaveHandler) {
        activeTarget.removeEventListener("mouseleave", targetLeaveHandler);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      spinTimelineRef.current?.kill();
      gsap.killTweensOf([cursor, dot, corners, activeStrength]);
      cursorStyle?.remove();
      document.body.style.cursor = originalBodyCursor;
      document.documentElement.style.cursor = originalHtmlCursor;
    };
  }, [
    constants,
    cursorColor,
    cursorColorOnTarget,
    enabled,
    hideDefaultCursor,
    hoverDuration,
    moveCursor,
    parallaxOn,
    spinDuration,
    targetSelector,
  ]);

  return (
    <div
      ref={cursorRef}
      className="target-cursor-root pointer-events-none fixed left-0 top-0 z-[2147483647] h-0 w-0"
      style={{
        willChange: "transform",
        transform: "translate3d(50vw, 50vh, 0)",
      }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ willChange: "transform", backgroundColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 -translate-x-[150%] -translate-y-[150%] border-[3px] border-b-0 border-r-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-[150%] border-[3px] border-b-0 border-l-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 translate-x-1/2 translate-y-1/2 border-[3px] border-l-0 border-t-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 -translate-x-[150%] translate-y-1/2 border-[3px] border-r-0 border-t-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
    </div>
  );
};

export default TargetCursor;
