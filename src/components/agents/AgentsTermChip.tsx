"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navyCalmDarkTheme } from '@/lib/theme';

// Light theme
const lightTheme = {
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentBg: 'rgba(0, 168, 150, 0.08)',
  accentBgHover: 'rgba(0, 168, 150, 0.15)',
  accentBorder: 'rgba(0, 168, 150, 0.15)',
  accentBorderHover: 'rgba(0, 168, 150, 0.25)',
};

// Dark theme
const darkTheme = {
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
  accentBg: navyCalmDarkTheme.accentTint,
  accentBgHover: navyCalmDarkTheme.accentGlow,
  accentBorder: navyCalmDarkTheme.accentBorder,
  accentBorderHover: 'rgba(0, 212, 170, 0.35)',
};

interface AgentsTermChipProps {
  slug: string;
  label: string;
}

export function AgentsTermChip({ slug, label }: AgentsTermChipProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-agents');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Link
      href={`/ai-agents/terms/${slug}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.625rem',
        background: theme.accentBg,
        border: `1px solid ${theme.accentBorder}`,
        borderRadius: '6px',
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: theme.accent,
        textDecoration: 'none',
        transition: 'all 0.15s ease',
        letterSpacing: '-0.01em',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme.accentBgHover;
        e.currentTarget.style.borderColor = theme.accentBorderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = theme.accentBg;
        e.currentTarget.style.borderColor = theme.accentBorder;
      }}
    >
      {label}
    </Link>
  );
}

interface AgentsRelatedTermsProps {
  terms: Array<{ slug: string; label: string }>;
}

export function AgentsRelatedTerms({ terms }: AgentsRelatedTermsProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-agents');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (terms.length === 0) return null;

  return (
    <div style={{
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: `1px solid ${theme.border}`,
    }}>
      <h3 style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: theme.subtle,
        marginBottom: '0.875rem',
      }}>
        Related Terms
      </h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        {terms.map((term) => (
          <AgentsTermChip key={term.slug} slug={term.slug} label={term.label} />
        ))}
      </div>
    </div>
  );
}

export default AgentsTermChip;
