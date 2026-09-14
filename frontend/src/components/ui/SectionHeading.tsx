import React from "react";
import { cn } from "@/lib/utils";
import { NeoBadge } from "./NeoBadge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "orange" | "blue" | "purple" | "yellow" | "green" | "pink" | "black";
  title: string;
  highlightText?: string;
  highlightColor?: "orange" | "blue" | "purple" | "yellow";
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = "black",
  title,
  highlightText,
  highlightColor = "orange",
  subtitle,
  alignment = "center",
  className,
}) => {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const highlightStyles = {
    orange: "bg-[#f47b2b] text-white px-2 py-0.5 inline-block -rotate-1 border-2 border-black shadow-[3px_3px_0px_0px_#000000]",
    blue: "bg-[#3392cc] text-white px-2 py-0.5 inline-block rotate-1 border-2 border-black shadow-[3px_3px_0px_0px_#000000]",
    purple: "bg-[#5227FF] text-white px-2 py-0.5 inline-block -rotate-1 border-2 border-black shadow-[3px_3px_0px_0px_#000000]",
    yellow: "bg-[#FFDE59] text-black px-2 py-0.5 inline-block rotate-1 border-2 border-black shadow-[3px_3px_0px_0px_#000000]",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12", alignStyles[alignment], className)}>
      {badge && (
        <div className="mb-3">
          <NeoBadge variant={badgeVariant} size="md">
            {badge}
          </NeoBadge>
        </div>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black tracking-tight leading-[1.08]">
        {title}{" "}
        {highlightText && (
          <span className={highlightStyles[highlightColor]}>{highlightText}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-black/80 font-medium leading-relaxed max-w-2xl font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
};
