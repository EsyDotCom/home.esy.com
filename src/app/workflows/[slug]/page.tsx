import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: 'Template Not Found | Esy',
    };
  }

  return {
    title: `${template.title} - AI Prompt | Esy Templates`,
    description: template.description,
    keywords: template.tags,
    openGraph: {
      title: `${template.title} | Esy Templates`,
      description: template.shortDescription,
      url: `https://esy.com/workflows/${template.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${template.title} | Esy Templates`,
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

