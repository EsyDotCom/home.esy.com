"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Elevated Dark Theme
const theme = {
  bg: '#18181b',
  elevated: '#27272a',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#00A896',
};

interface PageLink {
  href: string;
  title: string;
}

interface DocsPageNavProps {
  prev?: PageLink;
  next?: PageLink;
}

export function DocsPageNav({ prev, next }: DocsPageNavProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav style={{
      display: 'grid',
      gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr',
      gap: '1rem',
      marginTop: 'clamp(4rem, 8vh, 6rem)',
      paddingTop: 'clamp(2rem, 4vh, 3rem)',
      borderTop: `1px solid ${theme.border}`,
    }}>
      {prev && (
        <Link
          href={prev.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'rgba(0, 168, 150, 0.3)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 168, 150, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = theme.border;
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          }}
        >
          <ArrowLeft style={{ width: '20px', height: '20px', color: theme.accent, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: theme.muted, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
              Previous
            </div>
            <div style={{ fontSize: '1rem', color: theme.text, fontWeight: 500 }}>
              {prev.title}
            </div>
          </div>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            gridColumn: prev ? 'auto' : '1 / -1'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'rgba(0, 168, 150, 0.3)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 168, 150, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = theme.border;
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: theme.muted, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
              Next
            </div>
            <div style={{ fontSize: '1rem', color: theme.text, fontWeight: 500 }}>
              {next.title}
            </div>
          </div>
          <ArrowRight style={{ width: '20px', height: '20px', color: theme.accent, flexShrink: 0 }} />
        </Link>
      )}
    </nav>
  );
}

export default DocsPageNav;
