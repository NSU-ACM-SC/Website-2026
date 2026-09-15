"use client";

import { chapterEmail } from "@/data/contactData";
import { useState } from "react";

export function CertificateLookup() {
  const [id, setId] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <form
      className="chapter-form max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        setChecked(true);
      }}
    >
      <label>
        Certificate ID
        <input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setChecked(false);
          }}
          required
          pattern="[A-Za-z0-9-]{4,80}"
          placeholder="Enter the ID printed on your certificate"
        />
      </label>
      <button className="solid-button mt-5">Check certificate</button>
      {checked && (
        <div className="notice" role="status">
          <strong>Verification unavailable</strong>
          <p>
            The public certificate registry is not connected. This result does
            not establish whether a certificate is valid or invalid.
          </p>
          <a
            className="text-link mt-3"
            href={`mailto:${chapterEmail}?subject=${encodeURIComponent(`Certificate verification: ${id}`)}`}
          >
            Request manual verification
          </a>
        </div>
      )}
      <p className="text-xs mt-5 leading-6">
        Issued certificates are managed through the member portal. Contact the
        chapter for a verified record.
      </p>
    </form>
  );
}
