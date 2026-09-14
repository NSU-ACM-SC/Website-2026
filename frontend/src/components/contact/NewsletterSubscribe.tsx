"use client";

import React, { useState } from "react";
import { Mail, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { NeoBadge } from "../ui/NeoBadge";
import { NeoButton } from "../ui/NeoButton";

export const NewsletterSubscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <div className="bg-[#FFDE59] border-[3px] border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_#000000] relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-block">
          <NeoBadge variant="black" size="md">
            THE NSU ACM SC DISPATCH
          </NeoBadge>
        </div>

        <h3 className="font-heading font-black text-3xl sm:text-4xl uppercase text-black">
          SUBSCRIBE TO BI-WEEKLY TECH INSIGHTS
        </h3>

        <p className="text-sm sm:text-base font-body text-black/85 max-w-xl mx-auto">
          Get notified regarding hackathon registrations, SIG paper reading cohorts, open research grants, and speaker events directly in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your NSU or personal email..."
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black font-body text-sm font-bold placeholder:text-black/50 focus:outline-none focus:shadow-[3px_3px_0px_0px_#000]"
            />
          </div>

          <NeoButton
            type="submit"
            variant="primary"
            size="md"
            className="shadow-[3px_3px_0px_0px_#000] shrink-0"
          >
            <span>Subscribe</span>
            <ArrowRight className="h-4 w-4 text-[#FFDE59]" />
          </NeoButton>
        </form>

        {isSubscribed && (
          <div className="mt-3 inline-flex items-center gap-2 bg-[#00D084] text-black px-4 py-2 border-2 border-black font-display font-black text-xs uppercase shadow-[3px_3px_0px_0px_#000] animate-bounce">
            <CheckCircle2 className="h-4 w-4" />
            <span>You have been added to the chapter dispatch queue!</span>
          </div>
        )}

        <div className="pt-2 text-[11px] font-display font-bold text-black/70">
          🔒 Zero spam. Unsubscribe anytime with 1-click.
        </div>
      </div>
    </div>
  );
};
