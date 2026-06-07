"use client";

import { useState, useEffect } from "react";
import { EsyLoader } from "@/components/EsyLoader";
import { navyCalmLightTheme as theme } from "@/lib/theme";

type Status = "idle" | "loading" | "success" | "error" | "invalid";

export function ResearchNewsletterBar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus("invalid");
      setMessage("Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmed)) {
      setStatus("invalid");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/research/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        backgroundColor: theme.bg,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "1rem" : "1rem 2rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: theme.text,
              margin: 0,
              fontFamily: "var(--font-inter)",
            }}
          >
            Esy Research
          </h3>
          <p style={{ fontSize: "0.75rem", color: theme.muted, margin: "2px 0 0" }}>
            Engineering deep dives and AI tool breakdowns weekly
          </p>
        </div>

        <div style={{ display: "flex", alignItems: isMobile ? "stretch" : "center", gap: "0.5rem", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
          {status === "success" ? (
            <p style={{ fontSize: "0.875rem", color: theme.success, margin: 0 }}>
              You&apos;re in! Check your inbox.
            </p>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "invalid" || status === "error") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder="you@example.com"
                disabled={status === "loading"}
                style={{
                  borderRadius: 8,
                  border: `1px solid ${status === "invalid" ? theme.error : theme.border}`,
                  backgroundColor: theme.surfaceElevated,
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  color: theme.text,
                  outline: "none",
                  minWidth: isMobile ? 0 : 220,
                  width: isMobile ? "100%" : undefined,
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: theme.accent,
                  color: "#fff",
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: status === "loading" ? "default" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "inherit",
                  transition: "opacity 0.2s ease",
                }}
              >
                {status === "loading" ? (
                  <EsyLoader size={16} label="" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </>
          )}
        </div>
      </form>

      {(status === "error" || status === "invalid") && message && (
        <p
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "0 1rem 0.75rem" : "0 2rem 0.75rem",
            fontSize: "0.75rem",
            color: theme.error,
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
