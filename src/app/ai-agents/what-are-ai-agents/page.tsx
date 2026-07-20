import { Metadata } from "next";
import { Lightbulb } from "lucide-react";
import { 
  AgentsBreadcrumbs, 
  AgentsTableOfContents, 
  AgentsPrevNext,
  AgentsRelatedTerms,
  AgentsAuthorSection,
  AgentsVideoSection,
} from "@/components/agents";
import { 
  getAgentBreadcrumbs, 
  getAdjacentAgentPages 
} from "@/lib/agents-navigation";
import { getCanonicalContent } from "@/content/agents/content";

const pageHref = "/ai-agents/what-are-ai-agents";

export const metadata: Metadata = {
  title: "What are AI Agents? Definition & Overview | Esy AI Agents Reference",
  description: "Understand AI agents: definition, the agentic loop (perceive-reason-act-evaluate), autonomy spectrum, and how agents differ from chatbots and scripts.",
  keywords: "AI agents, what are AI agents, agentic loop, agent definition, LLM agents, autonomous agents, agent capabilities",
  openGraph: {
    title: "What are AI Agents? | Esy AI Agents Reference",
    description: "Definition, capabilities, and the agentic loop that powers AI agent systems.",
    url: `https://esy.com${pageHref}`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What are AI Agents? | Esy",
    description: "Definition, capabilities, and the agentic loop that powers AI agent systems.",
  },
  alternates: {
    canonical: `https://esy.com${pageHref}`,
  },
};

// JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "What are AI Agents?",
  description: "Understand AI agents: definition, the agentic loop (perceive-reason-act-evaluate), autonomy spectrum, and how agents differ from chatbots and scripts.",
  url: `https://esy.com${pageHref}`,
  articleSection: "AI Agents Reference",
  author: {
    "@type": "Person",
    name: "Zev Uhuru",
    url: "https://www.linkedin.com/in/zevuhuru/",
    sameAs: [
      "https://www.linkedin.com/in/zevuhuru/",
      "https://github.com/ZevUhuru",
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "Esy",
    url: "https://esy.com",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://esy.com" },
      { "@type": "ListItem", position: 2, name: "AI Agents", item: "https://esy.com/ai-agents" },
      { "@type": "ListItem", position: 3, name: "What are AI Agents?", item: `https://esy.com${pageHref}` },
    ],
  },
};

export default function AIAgentsPage() {
  const content = getCanonicalContent();
  const breadcrumbs = getAgentBreadcrumbs(pageHref);
  const { prev, next } = getAdjacentAgentPages(pageHref);
  
  // Generate TOC from sections
  const tocItems = content.sections.map(section => ({
    id: section.id,
    title: section.title,
  }));

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
            <h1>{content.title}</h1>
            <p className="agents-lede">{content.lede}</p>
          </header>

          {/* Video Edition — optional companion content */}
          <AgentsVideoSection
            videoId="dQw4w9WgXcQ"
            title="What are AI Agents? — Video Edition"
            duration="12 min"
            description="A visual walkthrough of the concepts covered in this reference entry."
          />

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

          {/* Key Takeaways */}
          {content.keyTakeaways && content.keyTakeaways.length > 0 && (
            <div className="agents-takeaways">
              <h3>
                <Lightbulb className="w-4 h-4" />
                Key Takeaways
              </h3>
              <ul>
                {content.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx}>{takeaway}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Terms */}
          {content.relatedTerms && (
            <AgentsRelatedTerms terms={content.relatedTerms} />
          )}

          {/* Author */}
          <AgentsAuthorSection
            name="Zev Uhuru"
            role="Agentic Engineer"
            image="/images/zev-uhuru.png"
            socials={[
              {
                platform: "linkedin",
                url: "https://www.linkedin.com/in/zevuhuru/",
                label: "LinkedIn",
              },
              {
                platform: "github",
                url: "https://github.com/ZevUhuru",
                label: "GitHub",
              },
            ]}
          />

          {/* Prev/Next Navigation */}
          <AgentsPrevNext prev={prev} next={next} />
        </article>

        {/* Table of Contents */}
        <AgentsTableOfContents items={tocItems} />
      </div>
    </>
  );
}
