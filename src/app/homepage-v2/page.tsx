import HomeV2Page from '@/components/HomeV2/HomeV2Page';

export const metadata = {
  title: 'Esy — Put Marketing Production on Autopilot',
  description:
    'One brief becomes a coordinated campaign — research, angles, creative, copy, a landing page — produced by Esy, reviewed by you.',
  // v2 is a side-by-side candidate for the homepage, not a second indexed
  // copy of it — keep crawlers out until it either replaces / or dies.
  robots: { index: false, follow: false },
};

export default function HomepageV2() {
  return <HomeV2Page />;
}
