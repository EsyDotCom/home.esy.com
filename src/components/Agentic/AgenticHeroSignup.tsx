"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { EsyLoader } from "@/components/EsyLoader";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";

// Compact newsletter capture for the dark .esy-stage hero panel on /agentic.
// Posts to the default Beehiiv-backed endpoint (the surviving publication for
// The Agentic Engineer) — same list the detail-page bar and sidebar use.
export function AgenticHeroSignup() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [buttonHover, setButtonHover] = useState(false);
  const { subscribe, status, errorMessage, reset } = useNewsletterSubscribe();

  const isLoading = status === "loading";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(inputRef.current?.value || "");
  };

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginTop: "1.75rem",
          padding: "0.875rem 1.125rem",
          borderRadius: 12,
          border: "1px solid rgba(45, 212, 191, 0.35)",
          background: "rgba(0, 168, 150, 0.12)",
          maxWidth: 480,
        }}
      >
        <CheckCircle2 size={18} color="#2dd4bf" aria-hidden="true" />
        <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>
          You&apos;re in — check your inbox to confirm.
        </p>
      </div>
    );
  }

  return (
    // No label here — the hero h1 already names the newsletter; repeating it
    // made the fold feel stuffed.
    <div style={{ marginTop: "2rem", maxWidth: 480 }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}
      >
        <input
          ref={inputRef}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          disabled={isLoading}
          onChange={() => {
            if (status === "error") reset();
          }}
          style={{
            flex: "1 1 220px",
            minWidth: 0,
            padding: "0.75rem 1rem",
            fontSize: "0.9375rem",
            fontFamily: "inherit",
            color: "#f8fafc",
            background: "rgba(255, 255, 255, 0.07)",
            border: `1px solid ${
              status === "error"
                ? "rgba(239, 68, 68, 0.6)"
                : "rgba(255, 255, 255, 0.16)"
            }`,
            borderRadius: 10,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "0.75rem 1.5rem",
            fontSize: "0.9375rem",
            fontWeight: 600,
            fontFamily: "inherit",
            color: "#fff",
            background: buttonHover && !isLoading ? "#00D4AA" : "#00A896",
            border: "none",
            borderRadius: 10,
            cursor: isLoading ? "default" : "pointer",
            opacity: isLoading ? 0.75 : 1,
            transition: "background 0.2s ease, opacity 0.2s ease",
          }}
        >
          {isLoading ? <EsyLoader size={16} label="" /> : "Subscribe"}
        </button>
      </form>
      <p
        style={{
          margin: "0.6rem 0 0",
          fontSize: "0.75rem",
          color:
            status === "error" && errorMessage
              ? "#f87171"
              : "rgba(255, 255, 255, 0.45)",
        }}
      >
        {status === "error" && errorMessage
          ? errorMessage
          : "One issue per week · video + full transcript"}
      </p>
    </div>
  );
}
