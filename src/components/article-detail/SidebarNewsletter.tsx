"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { EsyLoader } from "@/components/EsyLoader";
import { navyCalmLightTheme as theme } from "@/lib/theme";

// Section-agnostic sidebar newsletter card. Section-specific bits (the POST
// endpoint + copy) come in as props so research and school share one component.
interface SidebarNewsletterProps {
  apiPath: string;
  heading: string;
  blurb: string;
}

export function SidebarNewsletter({ apiPath, heading, blurb }: SidebarNewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "invalid">("idle");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!emailRegex.test(trimmed)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.surfaceElevated,
        padding: "1.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Mail size={16} style={{ color: theme.accent }} />
        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: theme.text, margin: 0 }}>
          {heading}
        </h4>
      </div>
      <p style={{ fontSize: "0.75rem", color: theme.muted, margin: "0 0 12px" }}>{blurb}</p>

      {status === "success" ? (
        <p style={{ fontSize: "0.8125rem", color: theme.success, margin: 0 }}>
          You&apos;re in! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "invalid" || status === "error") setStatus("idle");
            }}
            placeholder="you@example.com"
            disabled={status === "loading"}
            style={{
              width: "100%",
              borderRadius: 8,
              border: `1px solid ${status === "invalid" ? (theme.error || "#ef4444") : theme.border}`,
              backgroundColor: theme.bg,
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              color: theme.text,
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              width: "100%",
              borderRadius: 8,
              border: "none",
              backgroundColor: theme.accent,
              color: "#fff",
              padding: "0.5rem 0",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: status === "loading" ? "default" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontFamily: "inherit",
              transition: "opacity 0.2s ease",
            }}
          >
            {status === "loading" ? <EsyLoader size={14} label="" /> : "Subscribe"}
          </button>
        </form>
      )}

      {status === "invalid" && (
        <p style={{ fontSize: "0.6875rem", color: theme.error || "#ef4444", margin: "6px 0 0" }}>
          Enter a valid email address.
        </p>
      )}
      {status === "error" && (
        <p style={{ fontSize: "0.6875rem", color: theme.error || "#ef4444", margin: "6px 0 0" }}>
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
