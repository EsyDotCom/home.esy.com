import HomeV3Page from '@/components/HomeV3/HomeV3Page';

export const metadata = {
  title: 'Esy — Put Marketing Production on Autopilot',
  description:
    'Write one brief. Esy produces the campaign — pins, posts, and landing pages — and nothing ships until you approve it.',
  // A candidate for the homepage, not a second indexed copy of it.
  robots: { index: false, follow: false },
};

export default function HomepageV3() {
  return <HomeV3Page />;
}
