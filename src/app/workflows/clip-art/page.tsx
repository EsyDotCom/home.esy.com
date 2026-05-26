import { Metadata } from 'next';
import ClipArtClient from './ClipArtClient';

export const metadata: Metadata = {
  title: 'Clip Art Workflow Templates | Image Generation & Background Removal | Esy',
  description:
    'Generate clip art assets with Esy workflow templates. Resolve prompts, generate images with gpt-image-2, remove backgrounds, and store visual artifacts with provenance.',
  keywords: [
    'clip art workflow templates',
    'clip art generation',
    'AI clip art',
    'background removal',
    'visual artifact workflow',
    'gpt-image-2',
    'clip.art',
  ],
  openGraph: {
    title: 'Clip Art Workflow Templates | Esy',
    description:
      'Generate isolated clip art assets with style controls, background removal, and provenance.',
    url: 'https://esy.com/workflows/clip-art',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clip Art Workflow Templates | Esy',
    description:
      'Generate isolated clip art assets with Esy workflow templates.',
  },
  robots: { index: true, follow: true },
};

export default function ClipArtPage() {
  return <ClipArtClient />;
}
