import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social share card for /research (LinkedIn, X, Slack, iMessage).
// Rendered at build time from the same navy/teal palette as the page
// (navyCalmLightTheme), using the site's real brand wordmark: "esy" in
// Black Ops One with the teal "e" (see components/Logo, header/footer).

export const alt =
  "Esy Research — Frontier Models, AI Coding Tools & Workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TOPICS = ["Frontier Models", "AI Coding Tools", "Agentic Workflows"];

export default async function Image() {
  const [blackOpsOne, notoSans] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/black-ops-one-regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/noto-sans-regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #061527 0%, #0A2540 58%, #0F3460 100%)",
          fontFamily: "NotoSans",
        }}
      >
        {/* Teal glow, top right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 640,
            height: 640,
            borderRadius: 640,
            background:
              "radial-gradient(circle, rgba(0,168,150,0.30) 0%, rgba(0,168,150,0) 68%)",
          }}
        />
        {/* Faint glow, bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 560,
            background:
              "radial-gradient(circle, rgba(0,212,170,0.14) 0%, rgba(0,212,170,0) 66%)",
          }}
        />
        {/* Accent bar, left edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 12,
            background:
              "linear-gradient(180deg, #00D4AA 0%, #00A896 55%, rgba(0,168,150,0.25) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 76px 60px 84px",
          }}
        >
          {/* Brand wordmark row — mirrors the header/footer Logo component:
              "esy" in Black Ops One, teal "e", white "sy" */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontFamily: "BlackOpsOne",
                letterSpacing: "0.03em",
              }}
            >
              <span style={{ color: "#00A896" }}>e</span>
              <span style={{ color: "rgba(255,255,255,0.92)" }}>sy</span>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: 24,
                paddingLeft: 24,
                borderLeft: "2px solid rgba(255,255,255,0.22)",
                color: "#5EEAD4",
                fontSize: 24,
                letterSpacing: 6,
              }}
            >
              RESEARCH
            </div>
          </div>

          {/* Title + tagline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontFamily: "BlackOpsOne",
                letterSpacing: "0.03em",
                lineHeight: 1.05,
              }}
            >
              <span style={{ color: "#00A896" }}>e</span>
              <span style={{ color: "#FFFFFF" }}>sy&nbsp;</span>
              <span style={{ color: "#FFFFFF" }}>research</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 30,
                maxWidth: 920,
                color: "rgba(255,255,255,0.74)",
                fontSize: 29,
                lineHeight: 1.45,
              }}
            >
              Engineering deep dives on frontier model releases, AI coding
              tools, and agentic workflows — from the team building Esy.
            </div>
          </div>

          {/* Topic chips + URL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex" }}>
              {TOPICS.map((topic) => (
                <div
                  key={topic}
                  style={{
                    display: "flex",
                    marginRight: 16,
                    padding: "10px 22px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,212,170,0.35)",
                    background: "rgba(0,168,150,0.12)",
                    color: "#5EEAD4",
                    fontSize: 21,
                  }}
                >
                  {topic}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", color: "#00D4AA", fontSize: 24 }}>
              esy.com/research
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "BlackOpsOne",
          data: blackOpsOne,
          weight: 400,
          style: "normal",
        },
        {
          name: "NotoSans",
          data: notoSans,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
