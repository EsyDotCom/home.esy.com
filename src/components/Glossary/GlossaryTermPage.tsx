'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { Bot, GitBranch, ShieldCheck, Server, FileOutput, ArrowRight, Linkedin, Github, type LucideIcon } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import WorkflowCircuit from '@/components/ArtifactDetailTemplate/WorkflowCircuit';
import styles from './GlossaryTermPage.module.css';

interface WorkflowStage {
  id: string;
  label: string;
  sublabel?: string;
  isFinal?: boolean;
}

interface GlossaryTermData {
  slug: string;
  title: string;
  category: string;
  description: string;
  pronunciation?: string;
  tldr?: string;
  inEsy?: string;
  relatedTerms?: string[];
  workflowStages?: WorkflowStage[];
  content: string;
}

interface GlossaryTermPageProps {
  term: GlossaryTermData;
}

const categoryConfig: Record<string, { name: string; icon: LucideIcon; color: string }> = {
  agents: { name: 'Agents', icon: Bot, color: '#00A896' },
  workflows: { name: 'Workflows', icon: GitBranch, color: '#0A2540' },
  verification: { name: 'Verification', icon: ShieldCheck, color: '#2A9D8F' },
  infrastructure: { name: 'Infrastructure', icon: Server, color: '#6C757D' },
  output: { name: 'Output', icon: FileOutput, color: '#F59E0B' },
};

function extractHeadings(markdown: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /^## (.+)$/gm;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const text = match[1].replace(/\*\*/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ id, text });
  }
  return headings;
}

export default function GlossaryTermPage({ term }: GlossaryTermPageProps) {
  const category = categoryConfig[term.category] || categoryConfig.agents;
  const IconComponent = category.icon;

  const headings = useMemo(() => extractHeadings(term.content || ''), [term.content]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.title,
    description: term.description,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Esy AI & Agentic Glossary',
      url: 'https://esy.com/glossary',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.page}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.gridPattern} />

            <div className={styles.heroContent}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Glossary', href: '/glossary' },
                  { label: term.title, isCurrent: true },
                ]}
              />

              <div
                className={styles.badge}
                style={{ '--badge-color': category.color } as React.CSSProperties}
              >
                <IconComponent size={14} />
                {category.name}
              </div>

              <h1 className={styles.title}>{term.title}</h1>

              {term.pronunciation && (
                <p className={styles.pronunciation}>{term.pronunciation}</p>
              )}

              {term.description && (
                <p className={styles.description}>{term.description}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── TL;DR Card ── */}
        {term.tldr && (
          <section className={styles.tldrSection}>
            <div className={styles.tldrCard}>
              <span className={styles.tldrLabel}>TL;DR</span>
              <p className={styles.tldrText}>{term.tldr}</p>
            </div>
          </section>
        )}

        {/* ── Two-Column Body ── */}
        <div className={styles.body}>
          {/* Main Content */}
          <article className={styles.main}>
            {term.workflowStages && term.workflowStages.length > 0 && (
              <div className={styles.workflowViz}>
                <WorkflowCircuit stages={term.workflowStages} />
              </div>
            )}

            {term.content && (
              <div className={styles.prose}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => {
                      const text = typeof children === 'string'
                        ? children
                        : Array.isArray(children)
                          ? children.map(c => (typeof c === 'string' ? c : '')).join('')
                          : '';
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                      return <h2 id={id}>{children}</h2>;
                    },
                  }}
                >
                  {term.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Author */}
            <aside className={styles.author} aria-label="Article author">
              <div className={styles.authorInner}>
                <div className={styles.authorAvatar}>
                  <Image
                    src="/images/zev-uhuru.png"
                    alt="Zev Uhuru"
                    width={72}
                    height={72}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorLabel}>Written by</span>
                  <h4 className={styles.authorName}>Zev Uhuru</h4>
                  <p className={styles.authorRole}>Agentic Engineer</p>
                  <div className={styles.authorSocials}>
                    <a
                      href="https://www.linkedin.com/in/zevuhuru/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.authorSocialLink}
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={14} />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/ZevUhuru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.authorSocialLink}
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <div className={styles.backLink}>
              <Link href="/glossary">
                ← Browse all terms
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Table of Contents */}
            {headings.length > 0 && (
              <nav className={styles.tocCard}>
                <h3 className={styles.sidebarHeading}>On this page</h3>
                <ul className={styles.tocList}>
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={styles.tocLink}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* In Esy Card */}
            {term.inEsy && (
              <div className={styles.inEsyCard}>
                <h3 className={styles.inEsyHeading}>
                  <span className={styles.inEsyDot} />
                  In Esy
                </h3>
                <div className={styles.inEsyBody}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className={styles.inEsyText}>{children}</p>,
                      a: ({ href, children }) => (
                        <Link href={href || '#'} className={styles.inEsyLink}>
                          {children} <ArrowRight size={12} />
                        </Link>
                      ),
                    }}
                  >
                    {term.inEsy}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Related Terms */}
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className={styles.relatedCard}>
                <h3 className={styles.sidebarHeading}>Related terms</h3>
                <nav className={styles.relatedList}>
                  {term.relatedTerms.map((slug) => {
                    const label = slug.replace(/-/g, ' ');
                    return (
                      <Link key={slug} href={`/glossary/${slug}`} className={styles.relatedItem}>
                        <span className={styles.relatedDot} />
                        <span className={styles.relatedLabel}>{label}</span>
                        <ArrowRight size={12} className={styles.relatedArrow} />
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
