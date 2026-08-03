import IntelligenceCircuitryPage from "../components/IntelligenceCircuitry/IntelligenceCircuitryPage";

// Previous homepage metadata (Automate & Audit era):
// title: "Esy — Automate & Audit. Agentic Workflows."
// description:
//   "Automate research, verify citations, and produce publishable artifacts — all through agentic workflow templates. Structured, auditable output by default."

const HOME_META_DESCRIPTION =
  "Build digital products with agentic workflows. Run batch generations, track token costs, manage budgets, review output, and audit every run.";

export const metadata = {
  title: "Esy — Build Digital Products with Agentic Workflows",
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
    title: "Esy — Build Digital Products with Agentic Workflows",
    description: HOME_META_DESCRIPTION,
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esy — Build Digital Products with Agentic Workflows",
    description: HOME_META_DESCRIPTION,
    site: "@EsyDotCom",
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

export default IntelligenceCircuitryPage;
