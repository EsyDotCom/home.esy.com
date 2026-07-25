"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { CAL_BOOKING_URL, isBookingEnabled } from "@/lib/booking";

// The "Let's talk" CTA. Used in two places, both of which frame the ask as a
// professional conversation: the /agentic operator band (after the résumé
// proof points) and the /about sign-off (after the whole story).
//
// Deliberately absent from the /agentic hero and the end-of-post author card.
// The button's meaning comes from what surrounds it — under "WRITTEN BY" on a
// tutorial it reads as "ask me about this post," which spends the calendar on
// support requests rather than the conversations this is for.
//
// Rendered as a real anchor rather than a button so cmd-click, middle-click,
// and "copy link" all behave. A cal.com popup embed can be layered on later as
// progressive enhancement over this same anchor.
export function BookACallButton() {
  const [hovered, setHovered] = useState(false);

  // No configured link means no CTA — better a missing button than a dead one.
  if (!isBookingEnabled()) return null;

  return (
    <a
      href={CAL_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "0.75rem 1.5rem",
        fontSize: "0.9375rem",
        fontWeight: 600,
        fontFamily: "inherit",
        color: "#fff",
        background: hovered ? "#00D4AA" : "#00A896",
        border: "1px solid transparent",
        borderRadius: 10,
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "background 0.2s ease",
      }}
    >
      <CalendarDays size={16} aria-hidden="true" />
      Let&apos;s talk
      <ArrowRight
        size={14}
        aria-hidden="true"
        style={{
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}
      />
    </a>
  );
}
