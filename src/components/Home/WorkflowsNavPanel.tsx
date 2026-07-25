"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  BarChart3,
  Palette,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { WORKFLOW_NAV_CATEGORIES } from "@/lib/nav/workflowNav";

/**
 * PARKED — not currently rendered by the nav (2026-07-25).
 *
 * A Workflows hover panel in the same navy language as the Artifacts and
 * Agentic panels. Shelved rather than deleted because the design is fine; the
 * data underneath it isn't yet.
 *
 * Why it's parked: the four category rows are driven by the legacy local
 * template dataset (8 workflow templates), so the counts render as
 * Visual Essays 1 / Infographics 1 / Clip Art 1 / Academic Essays 6 — while
 * /workflows itself lists the live platform catalog (21 workflows, faceted by
 * artifact class). Promoting the thinner, stale taxonomy to nav level made the
 * library look emptier than it is.
 *
 * Bring it back when either is true:
 *  - the category routes are rebuilt on the live catalog, so their counts match
 *    the library page, or
 *  - the panel is reworked to list real catalog workflows (name, stages,
 *    runtime) instead of categories.
 *
 * To re-enable, in `Home/navigation.tsx`:
 *  1. restore `const workflowsDropdownRef = useRef<HTMLDivElement>(null);`
 *  2. add that ref to the `containers` array in the dismiss-on-outside effect
 *  3. replace the plain Workflows <Link> with:
 *       <WorkflowsNavPanel
 *         isOpen={openPanel === 'workflows'}
 *         isActive={Boolean(pathname?.startsWith('/workflows'))}
 *         navOnDark={navOnDark}
 *         containerRef={workflowsDropdownRef}
 *         onOpen={(immediate) => openNavPanel('workflows', immediate)}
 *         onClose={closeNavPanel}
 *         onBlur={(e) => handlePanelBlur(workflowsDropdownRef, e)}
 *       />
 *
 * Styles live in globals.css under ".nav-workflows-dropdown" / ".nav-workflow-row__*".
 */

// Icon per category row. Lives here rather than in the data module so the lib
// stays framework-free.
const WORKFLOW_NAV_ICONS: Record<string, LucideIcon> = {
  'visual-essays': FileText,
  infographics: BarChart3,
  'clip-art': Palette,
  'academic-essays': GraduationCap,
};

type WorkflowsNavPanelProps = {
  isOpen: boolean;
  isActive: boolean;
  /** Nav is sitting over a dark surface, so the trigger uses light text. */
  navOnDark: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onOpen: (immediate?: boolean) => void;
  onClose: (immediate?: boolean) => void;
  onBlur: (e: React.FocusEvent) => void;
};

export default function WorkflowsNavPanel({
  isOpen,
  isActive,
  navOnDark,
  containerRef,
  onOpen,
  onClose,
  onBlur,
}: WorkflowsNavPanelProps) {
  return (
    <div
      className="nav-dropdown-container"
      ref={containerRef}
      onMouseEnter={() => onOpen()}
      onMouseLeave={() => onClose()}
      onBlur={onBlur}
    >
      <Link
        href="/workflows/"
        className={`nav-dropdown-trigger ${isOpen ? 'active' : ''} ${isActive ? 'active' : ''}`}
        aria-expanded={isOpen}
        onFocus={() => onOpen(true)}
        onClick={() => onClose(true)}
        style={{
          color: !navOnDark ? '#475569' : 'rgba(255, 255, 255, 0.85)',
          textDecoration: 'none',
        }}
      >
        <span>Workflows</span>
      </Link>

      <div
        className={`nav-panel nav-workflows-dropdown ${isOpen ? 'open' : ''}`}
        aria-label="Workflows"
      >
        <div className="nav-panel-rail">
          <span className="nav-panel-eyebrow">Workflow Library</span>
          <p className="nav-panel-tagline">
            Declared, versioned workflows — intake, steps, quality gates, and a
            declared output. Run one and keep the record of how it ran.
          </p>
          <Link href="/workflows/" className="nav-panel-cta" onClick={() => onClose(true)}>
            Browse the library
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <div className="nav-panel-column">
          <span className="nav-panel-label">By output</span>
          {WORKFLOW_NAV_CATEGORIES.map((category, i) => {
            const Icon = WORKFLOW_NAV_ICONS[category.id];
            return (
              <Link
                key={category.id}
                href={category.href}
                className="nav-panel-row nav-workflow-row"
                style={{ transitionDelay: isOpen ? `${60 + i * 40}ms` : '0ms' }}
                onClick={() => onClose(true)}
              >
                <span className="nav-workflow-row__icon">
                  {Icon && <Icon size={15} aria-hidden="true" />}
                </span>
                <span className="nav-workflow-row__body">
                  <span className="nav-workflow-row__title">{category.label}</span>
                  <span className="nav-workflow-row__desc">{category.desc}</span>
                </span>
                <span className="nav-workflow-row__count">{category.count}</span>
              </Link>
            );
          })}
          <Link href="/workflows/" className="nav-panel-all" onClick={() => onClose(true)}>
            All workflows
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
