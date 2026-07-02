import React from 'react';
import Link from 'next/link';

export type Crumb = { label: string; href?: string };

// Shared immersive "library hero" used by the artifact catalog pages
// (/artifacts, /clip-art, /essays, /infographics). Renders a light breadcrumb
// above the dark .esy-stage panel (styles in globals.css): a headline + meta
// column on the left and a right-side feature (carousel, card, …) on the right.
// Kept a contained panel below the light nav so nav legibility is intact.
export default function LibraryHero({
  breadcrumb,
  title,
  subhead,
  meta,
  action,
  feature,
}: {
  breadcrumb?: Crumb[];
  title: React.ReactNode;
  subhead: React.ReactNode;
  meta?: React.ReactNode;
  /** Optional slot below the meta row (e.g. newsletter signup on /research) */
  action?: React.ReactNode;
  feature: React.ReactNode;
}) {
  return (
    <section
      className="esy-library-hero"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '5.5rem 2rem 3.5rem' }}
    >
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="esy-stage-crumbs" aria-label="Breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={`${crumb.label}-${i}`}>
              {i > 0 && <span aria-hidden="true">›</span>}
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span className="esy-stage-crumbs__current">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="esy-stage">
        <div className="esy-stage__copy">
          <h1 className="esy-stage__title">{title}</h1>
          <p className="esy-stage__subhead">{subhead}</p>
          {meta && <div className="esy-stage__meta">{meta}</div>}
          {action}
        </div>
        <div className="esy-stage__feature">{feature}</div>
      </div>
    </section>
  );
}
