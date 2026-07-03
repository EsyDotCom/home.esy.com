import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_SIZE } from "./shareCard";

// Homepage share card, "shape story" treatment. The homepage is a product
// page, not a publication, so instead of the section-card layout the card
// SHOWS the product metaphor: messy pieces -> template -> finished work.
// The three glyphs are adapted from ShapeSynthesisCanvas (the exact
// vocabulary the landing hero and "How it works" cards use), recolored to
// the navy-dark glyph palette so they read as native on the card gradient.
// They're embedded as SVG data URIs — satori renders <img> SVGs verbatim.

const C = {
  panel: "#123254",
  panelAlt: "#1C436C",
  border: "rgba(0,212,170,0.34)",
  accent: "#00D4AA",
  accent2: "rgba(94,234,212,0.7)",
  accentSoft: "rgba(0,212,170,0.18)",
  line: "rgba(255,255,255,0.16)",
  check: "#2AA98F",
};

const MESS_GLYPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 150">
  <g transform="rotate(-11 50 66)">
    <rect x="20" y="30" width="60" height="72" rx="8" fill="${C.panelAlt}" stroke="${C.border}" stroke-width="1.5"/>
    <rect x="30" y="40" width="26" height="6" rx="3" fill="${C.accent}" opacity="0.8"/>
    <rect x="30" y="56" width="40" height="4" rx="2" fill="${C.line}"/>
    <rect x="30" y="66" width="34" height="4" rx="2" fill="${C.line}"/>
    <rect x="30" y="76" width="40" height="4" rx="2" fill="${C.line}"/>
    <rect x="30" y="86" width="22" height="4" rx="2" fill="${C.line}"/>
  </g>
  <circle cx="125" cy="33" r="15" fill="none" stroke="${C.accent2}" stroke-width="2"/>
  <circle cx="125" cy="33" r="8" fill="none" stroke="${C.accent2}" stroke-width="2"/>
  <circle cx="125" cy="33" r="2.6" fill="${C.accent}"/>
  <g transform="rotate(9 104 86)">
    <rect x="74" y="48" width="62" height="76" rx="8" fill="${C.panel}" stroke="${C.accent}" stroke-width="1.5"/>
    <rect x="84" y="58" width="30" height="7" rx="3.5" fill="${C.accentSoft}"/>
    <rect x="84" y="76" width="42" height="4" rx="2" fill="${C.line}"/>
    <rect x="84" y="86" width="36" height="4" rx="2" fill="${C.line}"/>
    <rect x="84" y="96" width="22" height="4" rx="2" fill="${C.line}"/>
    <rect x="110" y="92.5" width="2.6" height="11" rx="1.3" fill="${C.accent}"/>
  </g>
  <g transform="rotate(-5 62 121)">
    <rect x="26" y="111" width="74" height="20" rx="10" fill="${C.panel}" stroke="${C.border}" stroke-width="1.5"/>
    <circle cx="39" cy="121" r="4" fill="none" stroke="${C.accent}" stroke-width="2"/>
    <rect x="49" y="119" width="44" height="4" rx="2" fill="${C.accent}" opacity="0.7"/>
  </g>
</svg>`;

const TEMPLATE_GLYPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 190">
  <rect x="5" y="5" width="140" height="180" rx="22" fill="${C.panel}" stroke="${C.border}" stroke-width="1.5"/>
  <rect x="20" y="22" width="110" height="24" rx="12" fill="${C.accent}"/>
  <rect x="20" y="66" width="110" height="12" rx="6" fill="${C.line}"/>
  <rect x="20" y="90" width="84" height="12" rx="6" fill="${C.line}"/>
  <rect x="20" y="114" width="100" height="12" rx="6" fill="${C.line}"/>
  <circle cx="122" cy="156" r="13" fill="${C.check}"/>
  <path d="M 116 156 L 120 161 L 129 150" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ARTIFACT_GLYPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="20" y="8" width="86" height="132" rx="12" fill="${C.panelAlt}" stroke="${C.border}" opacity="0.6"/>
  <rect x="6" y="20" width="98" height="132" rx="14" fill="${C.panel}" stroke="${C.border}" stroke-width="1.5"/>
  <rect x="18" y="32" width="74" height="42" rx="8" fill="${C.accentSoft}"/>
  <circle cx="72" cy="45" r="5" fill="${C.accent}"/>
  <path d="M 22 70 L 40 51 L 52 63 L 67 47 L 90 70" fill="none" stroke="${C.accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
  <rect x="18" y="86" width="74" height="8" rx="4" fill="${C.line}"/>
  <rect x="18" y="100" width="56" height="8" rx="4" fill="${C.line}"/>
  <rect x="18" y="114" width="66" height="8" rx="4" fill="${C.line}"/>
  <circle cx="28" cy="135" r="9" fill="${C.check}"/>
  <path d="M 24 135 L 27 138 L 33 131" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const svgSrc = (svg: string) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

function FlowDots() {
  return (
    <div style={{ display: "flex", marginTop: -34 }}>
      {[0.35, 0.6, 0.9].map((opacity) => (
        <div
          key={opacity}
          style={{
            display: "flex",
            width: 9,
            height: 9,
            borderRadius: 9,
            marginLeft: 11,
            marginRight: 11,
            background: C.accent,
            opacity,
          }}
        />
      ))}
    </div>
  );
}

function Step({
  src,
  width,
  height,
  label,
}: {
  src: string;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={width} height={height} alt="" />
      <div
        style={{
          display: "flex",
          marginTop: 20,
          color: "rgba(255,255,255,0.6)",
          fontSize: 20,
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export async function renderHomeShapeStory() {
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
            width: "100%",
            padding: "56px 76px 52px 76px",
          }}
        >
          {/* Brand wordmark — header/footer Logo treatment */}
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

          {/* Pipeline: messy pieces -> template -> finished work */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Step
                src={svgSrc(MESS_GLYPH)}
                width={214}
                height={200}
                label="MESSY PIECES"
              />
              <FlowDots />
              <Step
                src={svgSrc(TEMPLATE_GLYPH)}
                width={174}
                height={220}
                label="TEMPLATE"
              />
              <FlowDots />
              <Step
                src={svgSrc(ARTIFACT_GLYPH)}
                width={158}
                height={210}
                label="FINISHED WORK"
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 44,
                color: "#F8FAFC",
                fontSize: 42,
              }}
            >
              Agentic workflows for the AI solopreneur.
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: "rgba(45,212,191,0.95)",
              fontSize: 32,
            }}
          >
            esy.com
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
