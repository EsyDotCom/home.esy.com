"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AUTHOR_SOCIALS } from "./authorSocials";
import { BookACallButton } from "@/components/BookACallButton";

// Operator band for the /agentic index — the recruiter-grade "who's behind
// this" surface. Dark and bold to match the hero, with hard proof points from
// the resume rather than reader-tuned bio copy (that lives in the post-page
// AuthorCard).
const PROOF_POINTS = [
  {
    stat: "10+ yrs",
    label: "Shipping production web products at fuboTV, Vroom, and Esy",
  },
  // Counts the consolidation, not the providers: naming a number of providers
  // caps a set that keeps growing and reads as a limit rather than the
  // achievement. Don't reintroduce a provider or model count here.
  {
    stat: "1 gateway",
    label: "Every model in one place, with the cost of each run tracked",
  },
  {
    stat: "2,000+/wk",
    label: "Product images clip.art publishes, every one of them reviewed",
  },
];

export function AgenticOperator({
  isMobile,
  isTablet,
}: {
  isMobile: boolean;
  isTablet: boolean;
}) {
  const isCompact = isMobile || isTablet;

  return (
    <section
      aria-label="About the engineer behind Esy"
      style={{
        position: "relative",
        overflow: "hidden",
        // Flat navy. The stacked radial "stage lighting" that used to sit here
        // added glow without adding meaning, and it fought the portrait.
        background: "#0A2540",
        borderTop: "1px solid rgba(0, 212, 170, 0.12)",
        borderBottom: "1px solid rgba(0, 212, 170, 0.12)",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "3.5rem 1rem"
            : isTablet
              ? "4rem 1.5rem"
              : "5rem 2rem",
          display: "grid",
          gridTemplateColumns: isCompact ? "1fr" : "auto minmax(0, 1fr)",
          gap: isCompact ? "2rem" : "3.5rem",
          alignItems: "center",
        }}
      >
        {/* Portrait — larger and bolder than the byline avatar */}
        <div
          style={{
            justifySelf: isCompact ? "start" : "center",
            padding: 5,
            borderRadius: "50%",
            border: "2px solid rgba(0, 212, 170, 0.4)",
            boxShadow: "0 0 60px rgba(0, 212, 170, 0.15)",
          }}
        >
          <div
            className="zev-about-avatar"
            style={{
              width: isMobile ? 120 : 160,
              height: isMobile ? 120 : 160,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/zev-uhuru.png"
              alt="Zev Uhuru"
              width={160}
              height={160}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: "0 0 0.875rem",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#2dd4bf",
            }}
          >
            The Engineer Behind Esy
          </p>

          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-literata)",
              fontSize: isMobile ? "1.75rem" : "clamp(1.875rem, 3vw, 2.375rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            Zev Uhuru
          </h2>

          <p
            style={{
              margin: "0.5rem 0 0",
              fontSize: isMobile ? "0.875rem" : "0.9375rem",
              fontWeight: 500,
              color: "#2dd4bf",
            }}
          >
            Agentic Engineer. Content pipelines, quality review, and cost
            control for teams that publish on a schedule.
          </p>

          <p
            style={{
              margin: "1rem 0 0",
              fontSize: isMobile ? "0.9375rem" : "1rem",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.72)",
              maxWidth: 640,
            }}
          >
            A decade shipping production web products, from fuboTV&apos;s
            streaming apps to Vroom&apos;s online car storefront. The last two
            years I&apos;ve spent building Esy: software that turns content
            production into repeatable jobs. Write the brief once, run it,
            review what comes back, and see what the run cost. It&apos;s how
            clip.art publishes thousands of product images a week without a
            content team. Every issue here comes out of that work.
          </p>

          {/* Proof points — hard numbers for the ten-second recruiter scan */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "0.875rem" : "1.25rem",
              marginTop: "1.75rem",
            }}
          >
            {PROOF_POINTS.map(({ stat, label }) => (
              <div
                key={stat}
                style={{
                  padding: isMobile ? "0.875rem 1rem" : "1rem 1.125rem",
                  borderRadius: 12,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.04)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: isMobile ? "1.125rem" : "1.25rem",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {stat}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: "0.75rem",
                    lineHeight: 1.5,
                    color: "rgba(255, 255, 255, 0.55)",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              marginTop: "1.75rem",
            }}
          >
            {/* The band's payoff — the proof points above have made the case,
                so this is where a recruiter converts. */}
            <BookACallButton />

            <div
              role="group"
              aria-label="Zev Uhuru social links"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {AUTHOR_SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="agentic-operator-social-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    color: "rgba(255, 255, 255, 0.75)",
                    background: "rgba(255, 255, 255, 0.05)",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 6,
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#2dd4bf",
                textDecoration: "none",
              }}
            >
              More about me
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
