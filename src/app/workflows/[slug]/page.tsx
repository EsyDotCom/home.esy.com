import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import WorkflowLanding from '@/components/workflow-contract/WorkflowLanding';
import { getCatalogEntry, getWorkflowCatalog } from '@/lib/workflow-catalog';
import { getContract } from '@/lib/workflow-contracts';
import Script from 'next/script';
import TemplateDetailClient from './TemplateDetailClient';
import { ArtifactDetailTemplate } from '@/components/ArtifactDetailTemplate';
import {
  getAllTemplates,
  getTemplateBySlug,
  getRelatedTemplates,
  getCategoryInfo,
  getSubcategoryInfo,
  getTemplateBreadcrumbJsonLd,
} from '@/lib/templates';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const templates = getAllTemplates();
  const curated = templates.map((template) => ({ slug: template.slug }));
  // Catalog workflows get first-class landings too (2026-07-21): every public
  // registry template renders /workflows/<id> from its committed snapshot.
  const curatedSlugs = new Set(curated.map((c) => c.slug));
  const catalog = getWorkflowCatalog()
    .filter((e) => !curatedSlugs.has(e.id))
    .map((e) => ({ slug: e.id }));
  return [...curated, ...catalog];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    const entry = getCatalogEntry(slug);
    if (entry) {
      return {
        title: `${entry.name} | Esy Workflows`,
        description: entry.shortDescription || entry.description,
        alternates: { canonical: `https://esy.com/workflows/${entry.id}` },
        openGraph: {
          title: `${entry.name} | Esy Workflows`,
          description: entry.shortDescription || entry.description,
          url: `https://esy.com/workflows/${entry.id}`,
          type: 'article',
        },
      };
    }
    return {
      title: 'Workflow Template Not Found | Esy',
    };
  }

  if (template.isWorkflow) {
    return {
      title: `${template.title} | Esy Workflow Templates`,
      description: template.description,
      keywords: template.tags,
      openGraph: {
        title: `${template.title} | Esy Workflow Templates`,
        description: template.shortDescription,
        url: `https://esy.com/workflows/${template.slug}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${template.title} | Esy Workflow Templates`,
        description: template.shortDescription,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: `${template.title} - AI Prompt | Esy Prompts`,
    description: template.description,
    keywords: template.tags,
    openGraph: {
      title: `${template.title} | Esy Prompts`,
      description: template.shortDescription,
      url: `https://esy.com/workflows/${template.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${template.title} | Esy Prompts`,
      description: template.shortDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    // Catalog workflow (registry-published, no curated page): render the
    // snapshot-driven landing. Deprecated ids 301 to their successor.
    const entry = getCatalogEntry(slug);
    if (entry) {
      const contract = getContract(slug);
      if (contract?.status === 'deprecated' && contract.supersededById) {
        permanentRedirect(`/workflows/${contract.supersededById}`);
      }
      return <WorkflowLanding entry={entry} contract={contract} />;
    }
    notFound();
  }

  const relatedTemplates = getRelatedTemplates(slug, 3);
  const categoryInfo = getCategoryInfo(template.category);
  const subcategoryInfo = getSubcategoryInfo(template.subcategory);
  
  // Generate JSON-LD breadcrumb structured data
  const breadcrumbJsonLd = getTemplateBreadcrumbJsonLd(template);

  // Workflow templates use ArtifactDetailTemplate; prompt templates use legacy TemplateDetailClient
  if (template.isWorkflow) {
    return (
      <>
        <Script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <ArtifactDetailTemplate
          template={template}
          relatedTemplates={relatedTemplates}
        />
      </>
    );
  }

  return (
    <>
      {/* JSON-LD Breadcrumb Structured Data */}
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TemplateDetailClient
        template={template}
        relatedTemplates={relatedTemplates}
        categoryInfo={categoryInfo}
        subcategoryInfo={subcategoryInfo}
      />
    </>
  );
}

