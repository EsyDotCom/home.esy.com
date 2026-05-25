"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModelTemplate } from '@/lib/models/types';
import { navyCalmDarkTheme } from '@/lib/theme';

// Light theme
const lightTheme = {
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  surface: '#F8FAFC',
};

// Dark theme
const darkTheme = {
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
  surface: navyCalmDarkTheme.surface,
};

interface ModelTemplatesSectionProps {
  templates: ModelTemplate[];
}

const agentRoleLabels: Record<string, string> = {
  planning: 'Planning',
  research: 'Research',
  synthesis: 'Synthesis',
  verification: 'Verification',
  'long-context': 'Long-Context',
  'code-generation': 'Code Generation',
  'code-review': 'Code Review',
  'software-architecture': 'Architecture',
};

export default function ModelTemplatesSection({ templates }: ModelTemplatesSectionProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-models');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (templates.length === 0) {
    return (
      <p style={{ color: theme.subtle, fontStyle: 'italic' }}>
        No templates currently use this model.
      </p>
    );
  }

  return (
    <table className="models-table" style={{ marginTop: '1rem' }}>
      <thead>
        <tr>
          <th style={{ width: '35%' }}>Template</th>
          <th style={{ width: '25%' }}>Artifact Type</th>
          <th style={{ width: '25%' }}>Agent Role</th>
          <th style={{ width: '15%' }}>Version</th>
        </tr>
      </thead>
      <tbody>
        {templates.map((template) => (
          <tr key={template.slug}>
            <td>
              <Link
                href={`/workflows/${template.slug}`}
                style={{
                  fontWeight: 500,
                  color: theme.text,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.text;
                }}
              >
                {template.title}
              </Link>
            </td>
            <td style={{ color: theme.muted }}>
              {template.artifactType}
            </td>
            <td style={{ color: theme.muted }}>
              {agentRoleLabels[template.agentRole] || template.agentRole}
            </td>
            <td style={{ color: theme.subtle }}>
              {template.pinnedVersion || '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
