"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export function Palette() {
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="palette">
        {[
          ["Off-white", "#f1eee7"],
          ["Black", "#000000"],
          ["Orange", "#f47b2b"],
          ["ACM blue", "#3392cc"],
          ["Purple", "#5227FF"],
        ].map(([name, hex]) => (
          <button
            key={hex}
            aria-label={`Copy ${name} ${hex}`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(hex);
                setMessage(`Copied ${hex}`);
              } catch {
                setMessage(`Copy this code: ${hex}`);
              }
            }}
          >
            <span className="swatch" style={{ background: hex }} />
            <span className="swatch-label">
              {name}
              <br />
              {hex} <Copy size={12} className="inline" />
            </span>
          </button>
        ))}
      </div>
      <p role="status" className="text-xs min-h-5">
        {message}
      </p>
    </>
  );
}
