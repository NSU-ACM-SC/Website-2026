import { cn } from "@/lib/utils";
import React from "react";

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "orange" | "blue" | "purple" | "yellow" | "dark";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  className?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  variant = "default",
  shadow = "md",
  interactive = false,
  className,
  ...props
}) => {
  const variantStyles = {
    default: "bg-white text-black border-2 border-black",
    orange: "bg-[#fff6f0] text-black border-2 border-[#f47b2b]",
    blue: "bg-[#f0f7fc] text-black border-2 border-[#3392cc]",
    purple: "bg-[#f4f0ff] text-black border-2 border-[#5227FF]",
    yellow: "bg-[#fffde6] text-black border-2 border-black",
    dark: "bg-black text-white border-2 border-black",
  };

  const shadowStyles = {
    none: "shadow-none",
    sm: "shadow-[3px_3px_0px_0px_#000000]",
    md: "shadow-[5px_5px_0px_0px_#000000]",
    lg: "shadow-[8px_8px_0px_0px_#000000]",
    xl: "shadow-[12px_12px_0px_0px_#000000]",
  };

  const interactiveStyles = interactive
    ? "transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px_0px_#000000]"
    : "";

  return (
    <div
      className={cn(
        "rounded-none",
        variantStyles[variant],
        shadowStyles[shadow],
        interactiveStyles,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
