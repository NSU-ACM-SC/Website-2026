"use client";

import { primaryNavigation } from "@/data/navigationData";
import { isHrefActive, isRouterLink } from "@/lib/navigation";
import type { NavigationItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const linkBase =
  "relative inline-flex h-10 items-center justify-center whitespace-nowrap border-2 border-black bg-black px-3 text-xs font-black uppercase tracking-[0.12em] text-[#f1eee7] no-underline shadow-[3px_3px_0_#3392cc] transition-[background-color,color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:bg-[#f47b2b] hover:text-black focus-visible:bg-[#f47b2b] focus-visible:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5227FF]";

function NavLink({
  item,
  active,
  className = "",
  onClick,
}: {
  item: Pick<NavigationItem, "href" | "label" | "ariaLabel">;
  active: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const props = {
    href: item.href,
    onClick,
    "aria-current": active ? ("page" as const) : undefined,
    "aria-label": item.ariaLabel || item.label,
    className: `${linkBase} ${active ? "shadow-[3px_3px_0_#5227FF]" : ""} ${className}`,
    children: item.label,
  };

  return isRouterLink(item.href) ? <Link {...props} /> : <a {...props} />;
}

function LogoLink() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="group flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden border-2 border-black bg-[#f1eee7] p-1.5 shadow-[3px_3px_0_#3392cc] outline-none focus-visible:ring-2 focus-visible:ring-[#5227FF]"
    >
      <Image
        src="/assets/brand/acm-logo.webp"
        alt="NSU ACM Student Chapter"
        width={330}
        height={280}
        sizes="42px"
        preload
        className="block max-h-full w-full object-contain transition-transform duration-300 group-hover:rotate-[360deg]"
        style={{ height: "auto" }}
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const [desktopSection, setDesktopSection] = useState<number | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  const renderDesktopItem = (item: NavigationItem, index: number) => {
    const hasChildren = Boolean(item.children?.length);
    const active = isHrefActive(pathname, item.href);
    let content: ReactNode = <NavLink item={item} active={active} />;

    if (hasChildren) {
      content = (
        <>
          <NavLink
            item={item}
            active={active}
            className="after:ml-1.5 after:text-[9px] after:content-['▼']"
          />
          {desktopSection === index && (
            <div className="absolute left-1/2 top-full z-10 min-w-[17rem] -translate-x-1/2 pt-[0.55rem]">
              <div className="border-[3px] border-black bg-[#f1eee7] p-2 shadow-[6px_6px_0_#000]">
                <div className="flex max-h-[calc(100dvh-7rem)] flex-col gap-2 overflow-y-auto">
                  {item.children?.map((child) => (
                    <NavLink
                      key={child.href}
                      item={child}
                      active={isHrefActive(pathname, child.href)}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

    return (
      <li
        key={item.href}
        className="relative flex h-full"
        onMouseEnter={() => hasChildren && setDesktopSection(index)}
        onMouseLeave={() => hasChildren && setDesktopSection(null)}
        onFocus={() => hasChildren && setDesktopSection(index)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setDesktopSection(null);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setDesktopSection(null);
        }}
      >
        {content}
      </li>
    );
  };

  return (
    <header className="fixed inset-x-0 top-2 z-[1000] flex justify-center px-3 sm:top-3 sm:px-4 [padding-left:max(0.75rem,env(safe-area-inset-left))] [padding-right:max(0.75rem,env(safe-area-inset-right))]">
      <div className="relative w-full max-w-7xl">
        <div className="relative z-[999] mx-auto flex w-full items-center justify-between gap-3 border-[3px] border-black bg-[#f1eee7] p-3 font-display shadow-[6px_6px_0_#000] xl:w-max xl:justify-start">
          <LogoLink />

          <nav aria-label="Primary" className="hidden h-[50px] items-center bg-[#f1eee7] p-1 xl:flex">
            <ul className="m-0 flex h-full list-none items-stretch gap-2 p-0">
              {primaryNavigation.map(renderDesktopItem)}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="primary-mobile-menu"
            className="flex h-[50px] w-[50px] cursor-pointer flex-col items-center justify-center gap-1 border-2 border-black bg-black shadow-[3px_3px_0_#f47b2b] outline-none focus-visible:ring-2 focus-visible:ring-[#5227FF] xl:hidden"
          >
            <span className={`h-0.5 w-4 bg-[#f1eee7] transition-transform ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-[#f1eee7] transition-transform ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu overlay"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[997] bg-black/60 xl:hidden"
            />
            <nav
              id="primary-mobile-menu"
              aria-label="Mobile primary"
              className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[998] max-h-[calc(100dvh-5.5rem)] overflow-y-auto border-[3px] border-black bg-[#f1eee7] p-3 font-display shadow-[6px_6px_0_#000] xl:hidden"
            >
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {primaryNavigation.map((item, index) => {
                  const hasChildren = Boolean(item.children?.length);
                  const active = isHrefActive(pathname, item.href);

                  return (
                    <li key={item.href} className={hasChildren ? "border-2 border-black p-2" : ""}>
                      {hasChildren ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={mobileSection === index}
                            onClick={() => setMobileSection((open) => (open === index ? null : index))}
                            className={`${linkBase} w-full justify-between ${active ? "shadow-[3px_3px_0_#5227FF]" : ""}`}
                          >
                            <span>{item.label}</span>
                            <span className={`text-[10px] transition-transform ${mobileSection === index ? "rotate-180" : ""}`}>
                              ▼
                            </span>
                          </button>
                          {mobileSection === index && (
                            <div className="mt-3 flex flex-col gap-2">
                              {item.children?.map((child) => (
                                <NavLink
                                  key={child.href}
                                  item={child}
                                  active={isHrefActive(pathname, child.href)}
                                  className="w-full"
                                  onClick={() => setMobileOpen(false)}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <NavLink
                          item={item}
                          active={active}
                          className="w-full"
                          onClick={() => setMobileOpen(false)}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
