"use client";

import React from "react";
import { NeoCard } from "@/components/ui/NeoCard";
import { NeoButton } from "@/components/ui/NeoButton";
import { cn } from "@/lib/utils";

export interface NewsLetterSubCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function NewsLetterSubCard({
  title = "STAY IN THE LOOP",
  subtitle = "Subscribe to Newsletter",
  description = "Get the latest updates on our upcoming competitions, exclusive workshops, tech seminars, and more directly to your inbox.",
  placeholder = "example@northsouth.edu",
  buttonText = "Subscribe",
  onSubmit,
  className,
}: NewsLetterSubCardProps) {
  return (
    <NeoCard
      className={cn(
        "p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 w-full",
        className
      )}
    >
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight mb-4 text-black">
          {title}
        </h2>
        <div className="h-1 w-full max-w-[200px] bg-black mb-4"></div>
        <h3 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-[#f47b2b]">
          {subtitle}
        </h3>
        <p className="text-lg text-black/80 font-medium">{description}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
        className="flex-1 flex flex-col sm:flex-row gap-4 w-full"
      >
        <input
          type="email"
          required
          placeholder={placeholder}
          className="flex-1 border-2 border-black p-4 text-base outline-none focus:ring-2 focus:ring-[#f47b2b] placeholder:text-gray-500 font-medium"
        />
        <NeoButton
          type="submit"
          variant="primary"
          size="lg"
          className="whitespace-nowrap"
        >
          {buttonText}
        </NeoButton>
      </form>
    </NeoCard>
  );
}
