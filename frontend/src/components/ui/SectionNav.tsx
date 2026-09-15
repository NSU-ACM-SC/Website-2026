"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SectionNav({
  label,
  items,
  className = "",
  activeHref,
}: {
  label: string;
  items: { href: string; label: string }[];
  className?: string;
  activeHref?: string;
}) {
  const pathname = usePathname();
  return (
    <nav className={`section-nav ${className}`} aria-label={label}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={
            (activeHref || pathname) === item.href ? "page" : undefined
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
