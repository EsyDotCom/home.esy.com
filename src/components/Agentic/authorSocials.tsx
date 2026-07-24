import { Linkedin, Github } from "lucide-react";

// Lucide doesn't ship the X brand mark — inline SVG matches other Esy surfaces.
export function XSocialIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Single source for Zev's social links across the agentic surfaces (post
// byline, end-of-post author card, index operator band) so they never drift.
export const AUTHOR_SOCIALS = [
  {
    href: "https://www.linkedin.com/in/zevuhuru/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://x.com/EsyDotCom",
    label: "X",
    Icon: XSocialIcon,
  },
  {
    href: "https://github.com/ZevUhuru",
    label: "GitHub",
    Icon: Github,
  },
];
