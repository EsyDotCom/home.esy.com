import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_SIZE } from "./shareCard";

// Homepage share card, "brand poster" treatment: giant esy wordmark dead
// center on a faint circuit grid (the landing hero's ic-hero-grid motif),
// one tagline line beneath. Alternative to homeShapeStory.

const GRID = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <g stroke="rgba(0,212,170,0.06)" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${(i + 1) * 100}" y1="0" x2="${(i + 1) * 100}" y2="630"/>`).join("")}
    ${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${(i + 1) * 100}" x2="1200" y2="${(i + 1) * 100}"/>`).join("")}
  </g>
  <g fill="rgba(0,212,170,0.14)">
    <circle cx="300" cy="100" r="2.5"/>
    <circle cx="900" cy="200" r="2.5"/>
    <circle cx="200" cy="400" r="2.5"/>
    <circle cx="1100" cy="500" r="2.5"/>
    <circle cx="600" cy="600" r="2.5"/>
  </g>
</svg>`;

export async function renderHomeBrandPoster() {
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
        {/* Circuit grid backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${Buffer.from(GRID).toString("base64")}`}
          width={1200}
          height={630}
          alt=""
          style={{ position: "absolute", top: 0, left: 0 }}
        />
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
            width: "100%",
            padding: "56px 76px 52px 76px",
          }}
        >
          {/* Wordmark + tagline, dead center */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 200,
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
                marginTop: 24,
                color: "rgba(255,255,255,0.8)",
                fontSize: 38,
              }}
            >
              Agentic workflows for the AI solopreneur.
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
