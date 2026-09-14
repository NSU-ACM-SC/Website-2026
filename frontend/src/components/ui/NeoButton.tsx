"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "orange" | "blue" | "purple" | "yellow" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  href,
  variant = "primary",
  size = "md",
  isExternal = false,
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-[#000000] text-white hover:bg-[#1f1f1f] shadow-[4px_4px_0px_0px_#f47b2b]",
    secondary: "bg-[#ffffff] text-[#000000] border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#f8f6f0]",
    orange: "bg-[#f47b2b] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#e06c1e]",
    blue: "bg-[#3392cc] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#287ab0]",
    purple: "bg-[#5227FF] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#431dd6]",
    yellow: "bg-[#FFDE59] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-[#ebd048]",
    outline: "bg-transparent text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:bg-black hover:text-white",
    ghost: "bg-transparent text-black hover:bg-black/5 border border-transparent shadow-none",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-bold font-display uppercase tracking-wider",
    md: "px-5 py-2.5 text-sm font-extrabold font-display uppercase tracking-wide",
    lg: "px-7 py-3.5 text-base font-black font-display uppercase tracking-wider",
    xl: "px-9 py-4 text-lg font-black font-display uppercase tracking-wider",
  };

  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-none transition-all duration-150 active:translate-x-0 active:translate-y-0 active:shadow-none hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer select-none";

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
