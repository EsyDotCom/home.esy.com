'use client';

import type { ClipArtArtifact } from '@/data/clip-art-artifacts';
import ClipArtArtifactWrapper from '@/components/ClipArtArtifact/ClipArtArtifactWrapper';

interface Props {
  artifact: ClipArtArtifact;
}

export default function ClipArtDetailClient({ artifact }: Props) {
  return <ClipArtArtifactWrapper artifact={artifact} />;
}
