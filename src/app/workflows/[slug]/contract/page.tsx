import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ContractPage from '@/components/workflow-contract/ContractPage';
import { getContract, getContractIds } from '@/lib/workflow-contracts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getContractIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const contract = getContract(slug);
  if (!contract) return { title: 'Workflow Contract Not Found | Esy' };
  return {
    title: `${contract.id} — Workflow Contract | Esy`,
    description: `The public contract of ${contract.name}: intake schema, step topology, gates, and version lineage — rendered from Esy's immutable template registry.`,
    alternates: { canonical: `https://esy.com/workflows/${contract.id}/contract` },
    openGraph: {
      title: `${contract.id} — Workflow Contract`,
      description: contract.shortDescription,
      url: `https://esy.com/workflows/${contract.id}/contract`,
      type: 'article',
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const contract = getContract(slug);
  if (!contract) notFound();
  // Deprecated ids 301 to their successor (ratified 2026-07-21): the registry
  // carries supersededById exactly so retired public URLs never dead-end.
  if (contract.status === 'deprecated' && contract.supersededById) {
    permanentRedirect(`/workflows/${contract.supersededById}/contract`);
  }
  return <ContractPage contract={contract} />;
}
