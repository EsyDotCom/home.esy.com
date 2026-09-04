import HomeV3Page from "../components/HomeV3/HomeV3Page";

// Previous homepage metadata (Automate & Audit era):
// title: "Esy — Automate & Audit. Agentic Workflows."
// description:
//   "Automate research, verify citations, and produce publishable artifacts — all through agentic workflow templates. Structured, auditable output by default."

const HOME_META_DESCRIPTION =
  "Write one brief. Esy produces the campaign — Pinterest pins, Instagram and Facebook posts, and landing pages — and nothing ships until you approve it.";

export const metadata = {
  title: "Esy — Put Marketing Production on Autopilot",
  description: HOME_META_DESCRIPTION,
  keywords: [
    "agentic workflow templates",
    "digital products",
    "agentic workflows",
    "workflow templates",
    "token cost tracking",
    "AI budget management",
    "workflow automation",
    "verified artifacts",
    "human in the loop",
    "auditable artifacts",
    "batch generation",
  ],
  // og:image / twitter:image come from src/app/opengraph-image.tsx —
  // don't pin images here or they override the generated card.
  openGraph: {
    title: "Esy — Put Marketing Production on Autopilot",
    description: HOME_META_DESCRIPTION,
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esy — Put Marketing Production on Autopilot",
    description: HOME_META_DESCRIPTION,
    site: "@EsyDotCom",
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

export default HomeV3Page;
