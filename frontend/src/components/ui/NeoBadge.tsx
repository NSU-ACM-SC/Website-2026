import React from "react";
import { cn } from "@/lib/utils";

interface NeoBadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "blue" | "purple" | "yellow" | "green" | "pink" | "black" | "white";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const NeoBadge: React.FC<NeoBadgeProps> = ({
  children,
  variant = "black",
  size = "sm",
  className,
  icon,
}) => {
  const variantStyles = {
    orange: "bg-[#f47b2b] text-white border-black",
    blue: "bg-[#3392cc] text-white border-black",
    purple: "bg-[#5227FF] text-white border-black",
    yellow: "bg-[#FFDE59] text-black border-black",
    green: "bg-[#00D084] text-black border-black",
    pink: "bg-[#FF66C4] text-black border-black",
    black: "bg-black text-white border-black",
    white: "bg-white text-black border-black",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-bold font-display uppercase tracking-wider border-2 shadow-[2px_2px_0px_0px_#000000]",
    md: "px-3.5 py-1 text-xs font-black font-display uppercase tracking-widest border-2 shadow-[3px_3px_0px_0px_#000000]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-none select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
};
