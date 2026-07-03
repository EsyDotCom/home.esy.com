import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared social share card (LinkedIn, X, Slack, iMessage) for section
// landing pages. Rendered at build time from the same navy/teal palette
// as the site (navyCalmLightTheme), using the real brand wordmark: "esy"
// in Black Ops One with the teal "e" (see components/Logo, header/footer).
//
// Layout: masthead brand row up top, one short headline as the hero
// (keep it under ~8 words — og:title renders beside the image, so the
// card should complement it, not repeat it), topic chips + URL along
// the bottom.

export const OG_SIZE = { width: 1200, height: 630 };

type ShareCardProps = {
  /** Section label after the wordmark, e.g. "RESEARCH". Omit for the homepage. */
  label?: string;
  headline: string;
  topics: string[];
  /** Display URL, e.g. "esy.com/learn" */
  url: string;
};

export async function renderShareCard({
  label,
  headline,
  topics,
  url,
}: ShareCardProps) {
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
          background:
            "linear-gradient(135deg, #061527 0%, #0A2540 58%, #0F3460 100%)",
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
              "radial-gradient(circle, rgba(0,168,150,0.10) 0%, rgba(0,168,150,0) 68%)",
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
              "radial-gradient(circle, rgba(0,212,170,0.05) 0%, rgba(0,212,170,0) 66%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 76px 60px 76px",
          }}
        >
          {/* Brand wordmark row — header/footer Logo treatment */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                fontSize: 48,
                fontFamily: "BlackOpsOne",
                letterSpacing: "0.03em",
              }}
            >
              <span style={{ color: "#00A896" }}>e</span>
              <span style={{ color: "rgba(255,255,255,0.92)" }}>sy</span>
            </div>
            {label && (
              <div
                style={{
                  display: "flex",
                  marginLeft: 24,
                  paddingLeft: 24,
                  borderLeft: "2px solid rgba(255,255,255,0.22)",
                  color: "rgba(45,212,191,0.85)",
                  fontSize: 26,
                  letterSpacing: 6,
                }}
              >
                {label}
              </div>
            )}
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                maxWidth: 960,
                color: "#F8FAFC",
                fontSize: 66,
                lineHeight: 1.35,
              }}
            >
              {headline}
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
              {topics.map((topic) => (
                <div
                  key={topic}
                  style={{
                    display: "flex",
                    marginRight: 16,
                    padding: "12px 26px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.78)",
                    fontSize: 26,
                  }}
                >
                  {topic}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                color: "rgba(45,212,191,0.95)",
                fontSize: 32,
              }}
            >
              {url}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
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
