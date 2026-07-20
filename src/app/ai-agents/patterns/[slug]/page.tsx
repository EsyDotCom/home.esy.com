import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { 
  AgentsBreadcrumbs, 
  AgentsTableOfContents, 
  AgentsPrevNext,
  AgentsRelatedTerms,
} from "@/components/agents";
import { 
  getAgentBreadcrumbs, 
  getAdjacentAgentPages 
} from "@/lib/agents-navigation";
import { getPatternContent, getAllPatternSlugs } from "@/content/agents/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all pattern pages
export async function generateStaticParams() {
  const slugs = getAllPatternSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each pattern page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getPatternContent(slug);
  
  if (!content) {
    return {
      title: "Pattern Not Found | Esy AI Agents Reference",
    };
  }

  const pageHref = `/ai-agents/patterns/${slug}`;

  return {
    title: `${content.title} | Esy AI Agents Reference`,
    description: content.metaDescription,
    keywords: `${content.title}, agent pattern, AI architecture, ${slug.replace(/-/g, ' ')}`,
    openGraph: {
      title: `${content.title} | Esy AI Agents Reference`,
      description: content.lede,
      url: `https://esy.com${pageHref}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.title} | Esy AI Agents Reference`,
      description: content.lede,
    },
    alternates: {
      canonical: `https://esy.com${pageHref}`,
    },
  };
}

export default async function PatternPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getPatternContent(slug);
  
  if (!content) {
    notFound();
  }

  const pageHref = `/ai-agents/patterns/${slug}`;
  const breadcrumbs = getAgentBreadcrumbs(pageHref);
  const { prev, next } = getAdjacentAgentPages(pageHref);
  
  // Generate TOC from sections
  const tocItems = content.sections.map(section => ({
    id: section.id,
    title: section.title,
  }));

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: content.title,
    description: content.metaDescription,
    url: `https://esy.com${pageHref}`,
    articleSection: "AI Agents Reference - Patterns",
    publisher: {
      "@type": "Organization",
      name: "Esy",
      url: "https://esy.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.title,
        item: `https://esy.com${crumb.href}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="agents-page">
        <article className="agents-page-content">
          <AgentsBreadcrumbs items={breadcrumbs} />
          
          <header>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.25rem 0.625rem',
              background: 'rgba(74, 222, 128, 0.1)',
              border: '1px solid rgba(74, 222, 128, 0.15)',
              borderRadius: '5px',
              marginBottom: '0.875rem',
            }}>
              <span style={{ 
                fontSize: '0.6875rem', 
                fontWeight: 600, 
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#4ade80',
              }}>
                Architecture Pattern
              </span>
            </div>
            <h1>{content.title}</h1>
            <p className="agents-lede">{content.lede}</p>
          </header>

          {/* Content sections */}
          {content.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.content.split('\n\n').map((paragraph, idx) => {
                // Handle bold text
                const processText = (text: string) => {
                  const parts = text.split(/(\*\*[^*]+\*\*)/g);
                  return parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  });
                };

                // Check if it's a list
                if (paragraph.startsWith('- ') || paragraph.match(/^\d+\./)) {
                  const items = paragraph.split('\n').filter(Boolean);
                  const isOrdered = paragraph.match(/^\d+\./);
                  const ListTag = isOrdered ? 'ol' : 'ul';
                  
                  return (
                    <ListTag key={idx}>
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          {processText(item.replace(/^[-\d.]+\s*/, ''))}
                        </li>
                      ))}
                    </ListTag>
                  );
                }
                
                return <p key={idx}>{processText(paragraph)}</p>;
              })}
            </section>
          ))}

          {/* Related Terms */}
          {content.relatedTerms && (
            <AgentsRelatedTerms terms={content.relatedTerms} />
          )}

          {/* Prev/Next Navigation */}
          <AgentsPrevNext prev={prev} next={next} />
        </article>

        {/* Table of Contents */}
        <AgentsTableOfContents items={tocItems} />
      </div>
    </>
  );
}
