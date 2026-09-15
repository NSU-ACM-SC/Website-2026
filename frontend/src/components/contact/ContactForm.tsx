"use client";

import { chapterEmail } from "@/data/contactData";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { teamNames, sigGroups } from "@/data/teamsData";

export function ContactForm({
  kind = "contact",
}: {
  kind?: "contact" | "recruitment" | "question";
}) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <form
      className="chapter-form"
      onChange={() => setDraft(null)}
      onSubmit={(e) => {
        e.preventDefault();
        const values = new FormData(e.currentTarget);
        const body = Array.from(values.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        setDraft(
          `mailto:${chapterEmail}?subject=${encodeURIComponent(kind === "recruitment" ? "Membership inquiry" : kind === "question" ? "Chapter question" : "Website inquiry")}&body=${encodeURIComponent(body)}`,
        );
      }}
    >
      <h2 className="font-heading text-2xl font-bold mb-3">
        {kind === "recruitment"
          ? "Introduce yourself."
          : kind === "question"
            ? "Still have a question?"
            : "Let’s talk."}
      </h2>
      <p className="text-sm leading-7 mb-6">
        Prepare an email to the chapter. Your message is sent only when you send
        it in your email app.
      </p>
      <div className="form-grid">
        <label>
          Name
          <input name="Name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="Email" type="email" autoComplete="email" required />
        </label>
        {kind === "contact" && (
          <label className="wide">
            Topic
            <select name="Topic">
              <option>General inquiry</option>
              <option>Membership</option>
              <option>Events and sponsorship</option>
              <option>Research and SIGs</option>
              <option>Member portal support</option>
            </select>
          </label>
        )}
        {kind === "recruitment" && (
          <>
            <label>
              NSU ID
              <input name="NSU ID" inputMode="numeric" required />
            </label>
            <label>
              Team (choose exactly one)
              <select name="Team" required defaultValue="">
                <option value="" disabled>
                  Select your team
                </option>
                {teamNames.map((team) => (
                  <option key={team}>{team}</option>
                ))}
              </select>
            </label>
            <fieldset className="wide sig-options">
              <legend>Optional SIGs — choose any number</legend>
              {sigGroups.map((sig) => (
                <label key={sig.id}>
                  <input type="checkbox" name="SIG" value={sig.name} />
                  {sig.name}
                </label>
              ))}
            </fieldset>
            <label className="wide">
              Why would you like to join?
              <textarea name="Motivation" required />
            </label>
          </>
        )}
        <label className="wide">
          {kind === "question" ? "Your question" : "Message"}
          <textarea name="Message" required />
        </label>
      </div>
      <button type="submit" className="solid-button mt-6">
        Prepare email <ArrowUpRight size={16} />
      </button>
      {draft && (
        <div className="notice" role="status">
          <p>Your draft is ready. Nothing has been submitted yet.</p>
          <a className="text-link mt-3" href={draft}>
            Open email draft
          </a>
        </div>
      )}
    </form>
  );
}
