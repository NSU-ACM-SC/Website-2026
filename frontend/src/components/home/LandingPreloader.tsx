"use client";

import { useEffect } from "react";
import WordsPreloader from "@/components/loader/WordsPreloader";
import { fetchChapterMembers } from "@/lib/supabaseMembers";

export function LandingPreloader() {
  useEffect(() => {
    // Pre-fetch data in the background to warm up cache
    fetchChapterMembers().catch((err) => {
      console.error(
        "Background fetch error in landing preloader:",
        err
      );
    });
  }, []);

  return (
    <WordsPreloader />
  );
}

export default LandingPreloader;
