"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

export type PillNavChild = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  children?: PillNavChild[];
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const navItems: PillNavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/activities",
    label: "Activities",
    children: [
      { href: "/activities#showcase", label: "Events" },
      { href: "/activities#calendar", label: "Calendar" },
      { href: "/teams&sig#achievements", label: "Achievements" },
    ],
  },
  {
    href: "/publications",
    label: "Publications",
    children: [
      { href: "/publications#research", label: "Research" },
      { href: "/publications#projects", label: "Projects" },
      { href: "/publications#blogs", label: "Blogs" },
      { href: "/activities#press", label: "News" },
      { href: "/publications#magazines", label: "Magazine" },
      { href: "/activities#gallery", label: "Gallery" },
      { href: "/publications#projects", label: "Tool Kit" },
      { href: "/publications#blogs", label: "Learning Resources" },
    ],
  },
  { href: "/teams&sig", label: "Teams & SIGs" },
  { href: "/contact", label: "Contact US" },
  { href: "/teams&sig#history", label: "About" },
  { href: "https://dash.nsuacmsc.org", label: "Join" },
];
const isExternalLink = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("//") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

const isRouterLink = (href?: string) => Boolean(href && !isExternalLink(href));

const getPathFromHref = (href: string) => href.split("?")[0].split("#")[0];

const isHrefActive = (pathname: string, href: string) => {
  const path = getPathFromHref(href);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "#f1eee7",
  pillColor = "#000000",
  hoveredPillTextColor = "#000000",
  pillTextColor = "#f1eee7",
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopChildIndex, setOpenDesktopChildIndex] = useState<number | null>(null);
  const [openMobileChildIndex, setOpenMobileChildIndex] = useState<number | null>(null);

  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const childCircleRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const childTlRefs = useRef<Record<string, gsap.core.Timeline | null>>({});
  const childActiveTweenRefs = useRef<Record<string, gsap.core.Tween | null>>({});
  const mobileCircleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const mobileTlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const mobileActiveTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const mobileChildCircleRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const mobileChildTlRefs = useRef<Record<string, gsap.core.Timeline | null>>({});
  const mobileChildActiveTweenRefs = useRef<Record<string, gsap.core.Tween | null>>({});
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dropdownTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const closeDropdownTimerRef = useRef<number | null>(null);

  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const mobileMenuId = "primary-mobile-menu";
  const mobileToggleTimestampRef = useRef(0);

  const createPillTimeline = (
    circle: HTMLSpanElement,
    existingTimeline: gsap.core.Timeline | null | undefined,
  ) => {
    if (!circle.parentElement) return null;

    const pill = circle.parentElement as HTMLElement;
    const rect = pill.getBoundingClientRect();
    const { width: w, height: h } = rect;
    if (w <= 0 || h <= 0) return null;

    const R = (w * w / 4 + h * h) / (2 * h);
    const D = Math.ceil(2 * R) + 2;
    const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - w * w / 4))) + 1;
    const originY = D - delta;

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`,
    });

    const label = pill.querySelector<HTMLElement>(".pill-label");
    const hoverLabel = pill.querySelector<HTMLElement>(".pill-label-hover");

    if (label) gsap.set(label, { y: 0 });
    if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

    existingTimeline?.kill();
    const tl = gsap.timeline({ paused: true });
    tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

    if (label) {
      tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
    }

    if (hoverLabel) {
      gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
      tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
    }

    return tl;
  };

  const layoutParentPills = () => {
    circleRefs.current.forEach((circle, index) => {
      if (!circle) return;
      const tl = createPillTimeline(circle, tlRefs.current[index]);
      if (tl) tlRefs.current[index] = tl;
    });
  };

  const layoutChildPills = (menu?: HTMLElement) => {
    Object.entries(childCircleRefs.current).forEach(([key, circle]) => {
      if (!circle) return;
      if (menu && !menu.contains(circle)) return;
      const tl = createPillTimeline(circle, childTlRefs.current[key]);
      if (tl) childTlRefs.current[key] = tl;
    });
  };

  const layoutMobilePills = () => {
    mobileCircleRefs.current.forEach((circle, index) => {
      if (!circle) return;
      const tl = createPillTimeline(circle, mobileTlRefs.current[index]);
      if (tl) mobileTlRefs.current[index] = tl;
    });
  };

  const layoutMobileChildPills = () => {
    Object.entries(mobileChildCircleRefs.current).forEach(([key, circle]) => {
      if (!circle) return;
      const tl = createPillTimeline(circle, mobileChildTlRefs.current[key]);
      if (tl) mobileChildTlRefs.current[key] = tl;
    });
  };

  const clearDropdownCloseTimer = () => {
    if (closeDropdownTimerRef.current !== null) {
      window.clearTimeout(closeDropdownTimerRef.current);
      closeDropdownTimerRef.current = null;
    }
  };

  const closeDesktopDropdown = (index?: number) => {
    const closeIndex = (i: number) => {
      const menu = dropdownRefs.current[i];
      if (!menu) return;
      dropdownTweenRefs.current[i]?.kill();
      dropdownTweenRefs.current[i] = gsap.to(menu, {
        autoAlpha: 0,
        y: 10,
        scale: 0.96,
        duration: 0.2,
        ease,
        overwrite: "auto",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    };

    if (typeof index === "number") {
      closeIndex(index);
      if (openDesktopChildIndex === index) setOpenDesktopChildIndex(null);
      return;
    }

    dropdownRefs.current.forEach((_, i) => closeIndex(i));
    setOpenDesktopChildIndex(null);
  };

  const openDesktopDropdown = (index: number) => {
    const menu = dropdownRefs.current[index];
    if (!menu) return;

    clearDropdownCloseTimer();
    dropdownRefs.current.forEach((_, i) => {
      if (i !== index) closeDesktopDropdown(i);
    });

    setOpenDesktopChildIndex(index);
    dropdownTweenRefs.current[index]?.kill();
    gsap.set(menu, { display: "block" });
    layoutChildPills(menu);
    requestAnimationFrame(() => {
      layoutChildPills(menu);
    });
    dropdownTweenRefs.current[index] = gsap.fromTo(
      menu,
      { autoAlpha: 0, y: 12, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.25, ease, overwrite: "auto" },
    );

    const childItems = menu.querySelectorAll(".pill-dropdown-item");
    gsap.fromTo(
      childItems,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, stagger: 0.04, ease: "power2.out", overwrite: "auto" },
    );
  };

  const scheduleCloseDesktopDropdown = () => {
    clearDropdownCloseTimer();
    closeDropdownTimerRef.current = window.setTimeout(() => {
      closeDesktopDropdown();
    }, 140);
  };

  useEffect(() => {
    const layout = () => {
      layoutParentPills();
      layoutChildPills();
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if ("fonts" in document) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    dropdownRefs.current.forEach((menu) => {
      if (!menu) return;
      gsap.set(menu, { display: "none", autoAlpha: 0, y: 10, scale: 0.96 });
    });

    if (initialLoadAnimation) {
      const logoNode = logoRef.current;
      const navItemsNode = navItemsRef.current;

      if (logoNode) {
        gsap.set(logoNode, { scale: 0, transformOrigin: "50% 50%" });
        gsap.to(logoNode, { scale: 1, duration: 0.6, ease });
      }

      if (navItemsNode) {
        gsap.set(navItemsNode, { width: 0, overflow: "hidden" });
        gsap.to(navItemsNode, {
          width: "auto",
          duration: 0.6,
          ease,
          onComplete: () => {
            gsap.set(navItemsNode, { overflow: "visible" });
          },
        });
      }
    }

    return () => {
      window.removeEventListener("resize", onResize);
      clearDropdownCloseTimer();
      tlRefs.current.forEach((tl) => tl?.kill());
      activeTweenRefs.current.forEach((tween) => tween?.kill());
      Object.values(childTlRefs.current).forEach((tl) => tl?.kill());
      Object.values(childActiveTweenRefs.current).forEach((tween) => tween?.kill());
      mobileTlRefs.current.forEach((tl) => tl?.kill());
      mobileActiveTweenRefs.current.forEach((tween) => tween?.kill());
      Object.values(mobileChildTlRefs.current).forEach((tl) => tl?.kill());
      Object.values(mobileChildActiveTweenRefs.current).forEach((tween) => tween?.kill());
      dropdownTweenRefs.current.forEach((tween) => tween?.kill());
      logoTweenRef.current?.kill();
    };
  }, [ease, initialLoadAnimation, items]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileChildIndex(null);
  }, []);

  useEffect(() => {
    const hamburger = hamburgerRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (isMobileMenuOpen) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease, overwrite: "auto" });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease, overwrite: "auto" });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease, overwrite: "auto" });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease, overwrite: "auto" });
      }
    }
  }, [ease, isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    const onResize = () => {
      if (window.innerWidth >= 1280) closeMobileMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [closeMobileMenu]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const rafId = window.requestAnimationFrame(() => {
      layoutMobilePills();
      layoutMobileChildPills();
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [isMobileMenuOpen, openMobileChildIndex, items]);

  const handleEnter = (index: number) => {
    const tl = tlRefs.current[index];
    if (!tl) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });

    if (items[index]?.children?.length) {
      openDesktopDropdown(index);
    } else {
      closeDesktopDropdown();
    }
  };

  const handleLeave = (index: number) => {
    const tl = tlRefs.current[index];
    if (!tl) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });

    if (items[index]?.children?.length) {
      scheduleCloseDesktopDropdown();
    }
  };

  const handleChildEnter = (key: string) => {
    const tl = childTlRefs.current[key];
    if (!tl) return;
    childActiveTweenRefs.current[key]?.kill();
    childActiveTweenRefs.current[key] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleChildLeave = (key: string) => {
    const tl = childTlRefs.current[key];
    if (!tl) return;
    childActiveTweenRefs.current[key]?.kill();
    childActiveTweenRefs.current[key] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleMobileEnter = (index: number) => {
    const tl = mobileTlRefs.current[index];
    if (!tl) return;
    mobileActiveTweenRefs.current[index]?.kill();
    mobileActiveTweenRefs.current[index] = tl.tweenTo(tl.duration(), {
      duration: 0.28,
      ease,
      overwrite: "auto",
    });
  };

  const handleMobileLeave = (index: number) => {
    const tl = mobileTlRefs.current[index];
    if (!tl) return;
    mobileActiveTweenRefs.current[index]?.kill();
    mobileActiveTweenRefs.current[index] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleMobileChildEnter = (key: string) => {
    const tl = mobileChildTlRefs.current[key];
    if (!tl) return;
    mobileChildActiveTweenRefs.current[key]?.kill();
    mobileChildActiveTweenRefs.current[key] = tl.tweenTo(tl.duration(), {
      duration: 0.28,
      ease,
      overwrite: "auto",
    });
  };

  const handleMobileChildLeave = (key: string) => {
    const tl = mobileChildTlRefs.current[key];
    if (!tl) return;
    mobileChildActiveTweenRefs.current[key]?.kill();
    mobileChildActiveTweenRefs.current[key] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.24,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    mobileToggleTimestampRef.current = Date.now();
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) setOpenMobileChildIndex(null);
      return next;
    });
    onMobileMenuClick?.();
  };

  const handleHamburgerClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleMobileMenu();
  };

  const handleMobileOverlayClick = () => {
    if (Date.now() - mobileToggleTimestampRef.current < 240) return;
    closeMobileMenu();
  };

  const resolvedActiveHref = activeHref ?? pathname;

  const cssVars: CSSProperties = {
    ["--base" as string]: baseColor,
    ["--pill-bg" as string]: pillColor,
    ["--hover-text" as string]: hoveredPillTextColor,
    ["--pill-text" as string]: pillTextColor,
    ["--nav-h" as string]: "42px",
    ["--pill-pad-x" as string]: "14px",
    ["--pill-gap" as string]: "8px",
  };

  return (
    <header className="fixed inset-x-0 top-2 z-[1000] flex justify-center px-3 sm:top-3 sm:px-4 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
      <div className="relative w-full max-w-7xl">
        <div
          className={`relative z-[999] mx-auto flex w-full items-center justify-between gap-3 rounded-none border-[3px] border-black bg-[var(--base)] p-3 font-display shadow-[6px_6px_0_#000000] xl:w-max xl:justify-start ${className}`}
          style={cssVars}
        >
          {isRouterLink(items?.[0]?.href) ? (
            <Link
              href={items[0].href}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={logoRef}
              className="flex shrink-0 items-center justify-center overflow-hidden rounded-none border-2 border-black bg-[#f1eee7] p-1.5 shadow-[3px_3px_0_#3392cc] outline-none focus-visible:ring-2 focus-visible:ring-[#5227FF]"
              style={{
                width: "calc(var(--nav-h) + 8px)",
                height: "calc(var(--nav-h) + 8px)",
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="block h-full w-full rounded-none object-contain" />
            </Link>
          ) : (
            <a
              href={items?.[0]?.href || "#"}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={logoRef}
              className="flex shrink-0 items-center justify-center overflow-hidden rounded-none border-2 border-black bg-[#f1eee7] p-1.5 shadow-[3px_3px_0_#3392cc] outline-none focus-visible:ring-2 focus-visible:ring-[#5227FF]"
              style={{
                width: "calc(var(--nav-h) + 8px)",
                height: "calc(var(--nav-h) + 8px)",
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="block h-full w-full rounded-none object-contain" />
            </a>
          )}

          <nav
            ref={navItemsRef}
            aria-label="Primary"
            className="relative hidden items-center rounded-none bg-[#f1eee7] p-1 xl:flex"
            style={{
              height: "calc(var(--nav-h) + 8px)",
            }}
          >
            <ul role="menubar" className="list-none flex items-stretch m-0 p-0 h-full" style={{ gap: "var(--pill-gap)" }}>
              {items.map((item, index) => {
                const isActive = isHrefActive(resolvedActiveHref, item.href);
                const hasChildren = Boolean(item.children?.length);

                const pillStyle: CSSProperties = {
                  background: "var(--pill-bg, #000000)",
                  color: isActive ? "#f1eee7" : "var(--pill-text, #f1eee7)",
                  paddingLeft: "var(--pill-pad-x)",
                  paddingRight: "var(--pill-pad-x)",
                  boxShadow: isActive
                    ? "3px 3px 0 #5227FF"
                    : "3px 3px 0 #3392cc",
                };

                const pillContent = (
                  <>
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{
                        background: "#f47b2b",
                        willChange: "transform",
                      }}
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[index] = el;
                      }}
                    />
                    <span className="label-stack relative inline-flex items-center gap-1.5 leading-[1] z-[2]">
                      <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: "transform" }}>
                        {item.label}
                      </span>
                      {hasChildren && <span className="text-[10px] opacity-80">▾</span>}
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: "var(--hover-text, #000000)",
                          willChange: "transform, opacity",
                        }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                  </>
                );

                const basePillClasses =
                  "relative box-border inline-flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-none border-2 border-black px-0 text-[13px] font-black uppercase leading-[0] tracking-[0.14em] no-underline whitespace-nowrap outline-none transition-[box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-[#5227FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1eee7] sm:text-[14px] sm:tracking-[0.16em]";

                return (
                  <li
                    key={item.href}
                    role="none"
                    className="relative flex h-full"
                    onMouseEnter={() => {
                      clearDropdownCloseTimer();
                      handleEnter(index);
                    }}
                    onMouseLeave={() => handleLeave(index)}
                  >
                    {isRouterLink(item.href) ? (
                      <Link
                        role="menuitem"
                        href={item.href}
                        onClick={() => closeDesktopDropdown()}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                      >
                        {pillContent}
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        onClick={() => closeDesktopDropdown()}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                      >
                        {pillContent}
                      </a>
                    )}

                    {hasChildren && (
                      <div
                        ref={(el) => {
                          dropdownRefs.current[index] = el;
                        }}
                        className="absolute left-1/2 top-[calc(100%+0.55rem)] z-10 min-w-[17rem] max-h-[calc(100dvh-7rem)] overflow-y-auto -translate-x-1/2 rounded-none border-[3px] border-black bg-[#f1eee7] p-2 shadow-[6px_6px_0_#000000]"
                        onMouseEnter={() => {
                          clearDropdownCloseTimer();
                          openDesktopDropdown(index);
                        }}
                        onMouseLeave={scheduleCloseDesktopDropdown}
                      >
                        <div className="relative flex flex-col gap-2">
                          {item.children?.map((child, childIndex) => {
                            const childAnimKey = `${index}-${childIndex}-${child.href}`;
                            const childIsActive = isHrefActive(pathname, child.href);
                            const childPillStyle: CSSProperties = {
                              background: "var(--pill-bg, #000000)",
                              color: childIsActive ? "#f1eee7" : "var(--pill-text, #f1eee7)",
                              boxShadow: childIsActive
                                ? "3px 3px 0 #5227FF"
                                : "3px 3px 0 #3392cc",
                            };

                            return (
                              <Link
                                key={child.label + child.href}
                                href={child.href}
                                onClick={() => closeDesktopDropdown()}
                                className="pill-dropdown-item relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-none border-2 border-black px-4 text-xs font-black uppercase tracking-[0.14em] sm:text-sm sm:tracking-[0.15em]"
                                style={childPillStyle}
                                onMouseEnter={() => handleChildEnter(childAnimKey)}
                                onMouseLeave={() => handleChildLeave(childAnimKey)}
                              >
                                <span
                                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                  style={{
                                    background:
                                      "#f47b2b",
                                    willChange: "transform",
                                  }}
                                  aria-hidden="true"
                                  ref={(el) => {
                                    childCircleRefs.current[childAnimKey] = el;
                                  }}
                                />
                                <span className="label-stack relative inline-block leading-[1] z-[2]">
                                  <span className="pill-label relative z-[2] inline-block leading-[1]">
                                    {child.label}
                                  </span>
                                  <span
                                    className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                    style={{
                                      color: "var(--hover-text, #000000)",
                                      willChange: "transform, opacity",
                                    }}
                                    aria-hidden="true"
                                  >
                                    {child.label}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
        </nav>

        <button
          type="button"
            ref={hamburgerRef}
            onClick={handleHamburgerClick}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-none border-2 border-black bg-black p-0 shadow-[3px_3px_0_#f47b2b] outline-none focus-visible:ring-2 focus-visible:ring-[#5227FF] xl:hidden"
            style={{
              width: "calc(var(--nav-h) + 8px)",
              height: "calc(var(--nav-h) + 8px)",
            }}
          >
            <span className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-none bg-black">
              <span className="hamburger-line h-0.5 w-4 origin-center rounded-none bg-[#f1eee7]" />
              <span className="hamburger-line h-0.5 w-4 origin-center rounded-none bg-[#f1eee7]" />
          </span>
        </button>
      </div>

        {isMobileMenuOpen && (
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={handleMobileOverlayClick}
            className="fixed inset-0 z-[997] bg-black/60 xl:hidden"
          />
        )}

        {isMobileMenuOpen && (
          <div
            id={mobileMenuId}
            className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[998] max-h-[calc(100dvh-5.5rem)] origin-top overflow-y-auto overscroll-contain rounded-none border-[3px] border-black bg-[#f1eee7] p-3 font-display shadow-[6px_6px_0_#000000] xl:hidden"
            style={{
              ...cssVars,
            }}
          >
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {items.map((item, index) => {
                const hasChildren = Boolean(item.children?.length);
                const activeParent = isHrefActive(pathname, item.href);

                if (hasChildren) {
                  const isOpen = openMobileChildIndex === index;
                  return (
                    <li key={item.href} className="rounded-none border-2 border-black bg-[#f1eee7]">
                      <button
                        type="button"
                        onClick={() => setOpenMobileChildIndex((prev) => (prev === index ? null : index))}
                        onTouchStart={() => handleMobileEnter(index)}
                        onTouchEnd={() => handleMobileLeave(index)}
                        onTouchCancel={() => handleMobileLeave(index)}
                        onMouseEnter={() => handleMobileEnter(index)}
                        onMouseLeave={() => handleMobileLeave(index)}
                        className="relative overflow-hidden w-full flex items-center justify-between rounded-none border-2 border-black px-4 py-3 text-sm font-black tracking-[0.15em] uppercase"
                        style={{
                          color: activeParent ? "#f1eee7" : "var(--pill-text, #f1eee7)",
                          background: "var(--pill-bg, #000000)",
                          boxShadow: activeParent
                            ? "3px 3px 0 #5227FF"
                            : "3px 3px 0 #3392cc",
                        }}
                      >
                        <span
                          className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                          style={{
                            background: "#f47b2b",
                            willChange: "transform",
                          }}
                          aria-hidden="true"
                          ref={(el) => {
                            mobileCircleRefs.current[index] = el;
                          }}
                        />
                        <span className="label-stack relative inline-flex items-center gap-1.5 leading-[1] z-[2]">
                          <span className="pill-label relative z-[2] inline-block leading-[1]">{item.label}</span>
                          <span
                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                            style={{
                              color: "var(--hover-text, #000000)",
                              willChange: "transform, opacity",
                            }}
                            aria-hidden="true"
                          >
                            {item.label}
                          </span>
                        </span>
                        <span className={`relative z-[3] text-[11px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                      </button>
                      <div className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          <div className="pb-2 px-2 space-y-2">
                            {item.children?.map((child, childIndex) => {
                              const mobileChildAnimKey = `mobile-${index}-${childIndex}-${child.href}`;
                              const childIsActive = isHrefActive(pathname, child.href);
                              return (
                                <Link
                                  key={child.label + child.href}
                                  href={child.href}
                                  onClick={closeMobileMenu}
                                  onTouchStart={() => handleMobileChildEnter(mobileChildAnimKey)}
                                  onTouchEnd={() => handleMobileChildLeave(mobileChildAnimKey)}
                                  onTouchCancel={() => handleMobileChildLeave(mobileChildAnimKey)}
                                  onMouseEnter={() => handleMobileChildEnter(mobileChildAnimKey)}
                                  onMouseLeave={() => handleMobileChildLeave(mobileChildAnimKey)}
                                  className="relative overflow-hidden block rounded-none border-2 border-black px-3 py-2.5 text-sm font-black uppercase tracking-[0.14em]"
                                  style={{
                                    color: childIsActive ? "#f1eee7" : "var(--pill-text, #f1eee7)",
                                    background: "var(--pill-bg, #000000)",
                                    boxShadow: childIsActive
                                      ? "3px 3px 0 #5227FF"
                                      : "3px 3px 0 #3392cc",
                                  }}
                                >
                                  <span
                                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                    style={{
                                      background: "#f47b2b",
                                      willChange: "transform",
                                    }}
                                    aria-hidden="true"
                                    ref={(el) => {
                                      mobileChildCircleRefs.current[mobileChildAnimKey] = el;
                                    }}
                                  />
                                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                                    <span className="pill-label relative z-[2] inline-block leading-[1]">
                                      {child.label}
                                    </span>
                                    <span
                                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                      style={{
                                        color: "var(--hover-text, #000000)",
                                        willChange: "transform, opacity",
                                      }}
                                      aria-hidden="true"
                                    >
                                      {child.label}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                if (isRouterLink(item.href)) {
                  return (
                    <li key={item.href}>
              <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        onTouchStart={() => handleMobileEnter(index)}
                        onTouchEnd={() => handleMobileLeave(index)}
                        onTouchCancel={() => handleMobileLeave(index)}
                        onMouseEnter={() => handleMobileEnter(index)}
                        onMouseLeave={() => handleMobileLeave(index)}
                        className="relative overflow-hidden block rounded-none border-2 border-black px-4 py-3 text-sm font-black tracking-[0.15em] uppercase"
                        style={{
                          color: isHrefActive(pathname, item.href) ? "#f1eee7" : "var(--pill-text, #f1eee7)",
                          background: "var(--pill-bg, #000000)",
                          boxShadow: isHrefActive(pathname, item.href)
                            ? "3px 3px 0 #5227FF"
                            : "3px 3px 0 #3392cc",
                        }}
                      >
                        <span
                          className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                          style={{
                            background: "#f47b2b",
                            willChange: "transform",
                          }}
                          aria-hidden="true"
                          ref={(el) => {
                            mobileCircleRefs.current[index] = el;
                          }}
                        />
                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                          <span className="pill-label relative z-[2] inline-block leading-[1]">{item.label}</span>
                          <span
                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                            style={{
                              color: "var(--hover-text, #000000)",
                              willChange: "transform, opacity",
                            }}
                            aria-hidden="true"
                          >
                            {item.label}
                          </span>
                        </span>
              </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      onTouchStart={() => handleMobileEnter(index)}
                      onTouchEnd={() => handleMobileLeave(index)}
                      onTouchCancel={() => handleMobileLeave(index)}
                      onMouseEnter={() => handleMobileEnter(index)}
                      onMouseLeave={() => handleMobileLeave(index)}
                      className="relative overflow-hidden block rounded-none border-2 border-black px-4 py-3 text-sm font-black tracking-[0.15em] uppercase"
                      style={{
                        color: isHrefActive(pathname, item.href) ? "#f1eee7" : "var(--pill-text, #f1eee7)",
                        background: "var(--pill-bg, #000000)",
                        boxShadow: isHrefActive(pathname, item.href)
                          ? "3px 3px 0 #5227FF"
                          : "3px 3px 0 #3392cc",
                      }}
                    >
                      <span
                        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                        style={{
                          background: "#f47b2b",
                          willChange: "transform",
                        }}
                        aria-hidden="true"
                        ref={(el) => {
                          mobileCircleRefs.current[index] = el;
                        }}
                      />
                      <span className="label-stack relative inline-block leading-[1] z-[2]">
                        <span className="pill-label relative z-[2] inline-block leading-[1]">{item.label}</span>
                        <span
                          className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                          style={{
                            color: "var(--hover-text, #000000)",
                            willChange: "transform, opacity",
                          }}
                          aria-hidden="true"
                        >
                          {item.label}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
      )}
      </div>
    </header>
  );
};

export function Navbar() {
  return (
    <PillNav
      logo="/ACM.webp"
      logoAlt="NSU ACM Student Chapter"
      items={navItems}
      baseColor="#f1eee7"
      pillColor="#000000"
      hoveredPillTextColor="#000000"
      pillTextColor="#f1eee7"
      ease="power3.out"
      initialLoadAnimation
    />
  );
}
