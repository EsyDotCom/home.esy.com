import IntelligenceCircuitryPage from "../components/IntelligenceCircuitry/IntelligenceCircuitryPage";

// Previous homepage metadata (Automate & Audit era):
// title: "Esy — Automate & Audit. Agentic Workflows."
// description:
//   "Automate research, verify citations, and produce publishable artifacts — all through agentic workflow templates. Structured, auditable output by default."

// Meta description (~125 chars): lead with H1/title topic in the first 120 for mobile
// truncation; one factual summary sentence plus a specific capability list (token
// cost tracking, budgets, batch generations, review, audit). Target band: 140–155 desktop.
const HOME_META_DESCRIPTION =
  "Agentic workflow templates for the AI solopreneur. Run batch generations, track token costs, manage budgets, review output, and audit every run.";

export const metadata = {
  title: "Esy — Agentic Workflows for the AI Solopreneur",
  description: HOME_META_DESCRIPTION,
  keywords: [
    "agentic workflows",
    "AI solopreneur",
    "workflow templates",
    "token cost tracking",
    "AI budget management",
    "workflow automation",
    "verified artifacts",
    "human in the loop",
    "auditable artifacts",
    "batch generation",
  ],
  openGraph: {
    title: "Esy — Agentic Workflows for the AI Solopreneur",
    description: HOME_META_DESCRIPTION,
    type: "website",
    url: "https://esy.com",
    siteName: "Esy",
    locale: "en_US",
    images: [{
      url: "https://esy.com/og/homepage.png",
      width: 1200,
      height: 630,
      alt: "Esy — Agentic Workflows for the AI Solopreneur",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Esy — Agentic Workflows for the AI Solopreneur",
    description: HOME_META_DESCRIPTION,
    site: "@EsyDotCom",
    images: ["https://esy.com/og/homepage.png"],
  },
  alternates: {
    canonical: "https://esy.com",
  },
};

export default IntelligenceCircuitryPage;
