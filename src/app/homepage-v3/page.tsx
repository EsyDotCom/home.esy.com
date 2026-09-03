import HomeV3Page from '@/components/HomeV3/HomeV3Page';

export const metadata = {
  title: 'Esy — Put Marketing Production on Autopilot',
  description:
    'One brief becomes a coordinated campaign — research, angles, creative, copy, a landing page — produced by Esy, reviewed by you.',
  // A candidate for the homepage, not a second indexed copy of it.
  robots: { index: false, follow: false },
};

export default function HomepageV3() {
  return <HomeV3Page />;
}
