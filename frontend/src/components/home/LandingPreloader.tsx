"use client";

import { useEffect, useState } from "react";
import WordsPreloader from "@/components/loader/WordsPreloader";
import { fetchChapterMembers } from "@/lib/supabaseMembers";

export function LandingPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // Fetch live data from backend (Supabase) while preloader plays
    const fetchBackend = async () => {
      try {
        // Race against a safety timeout (4s) so slow connection never hangs
        await Promise.race([
          fetchChapterMembers(),
          new Promise((resolve) => setTimeout(resolve, 4000)),
        ]);
      } catch (err) {
        console.error("Backend fetch error in landing preloader:", err);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchBackend();

    return () => {
      active = false;
    };
  }, []);

  return <WordsPreloader isLoading={isLoading} />;
}

export default LandingPreloader;
