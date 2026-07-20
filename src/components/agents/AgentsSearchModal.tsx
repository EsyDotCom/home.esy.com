"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen, Sparkles, GitBranch, Workflow } from 'lucide-react';
import { generateSearchIndex, type SearchIndexItem, type PageType } from '@/lib/agents-navigation';

const theme = {
  bg: '#0f0f12',
  surface: '#18181b',
  elevated: '#1f1f24',
  text: '#fafafa',
  muted: 'rgba(250, 250, 250, 0.7)',
  subtle: 'rgba(250, 250, 250, 0.45)',
  border: 'rgba(250, 250, 250, 0.06)',
  accent: '#00A896',
};

const typeIcons: Record<PageType, React.ReactNode> = {
  hub: <BookOpen className="w-4 h-4" />,
  canonical: <Sparkles className="w-4 h-4" />,
  term: <BookOpen className="w-4 h-4" />,
  pattern: <GitBranch className="w-4 h-4" />,
  workflow: <Workflow className="w-4 h-4" />,
  guide: <BookOpen className="w-4 h-4" />,
};

interface AgentsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgentsSearchModal({ isOpen, onClose }: AgentsSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Generate search index once
  const searchIndex = useMemo(() => generateSearchIndex(), []);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.section.toLowerCase().includes(lowerQuery)
    );
  }, [query, searchIndex]);

  // Popular/default pages
  const popularPages = useMemo(() => 
    searchIndex.filter(item => 
      item.type === 'canonical' || 
      item.type === 'hub' ||
      item.href === '/ai-agents/terms/agentic-workflow'
    ).slice(0, 4),
    [searchIndex]
  );

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const maxIndex = (query ? results.length : popularPages.length) - 1;
        setSelectedIndex(prev => Math.min(prev + 1, maxIndex));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const items = query ? results : popularPages;
        if (items[selectedIndex]) {
          window.location.href = items[selectedIndex].href;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, query, results, popularPages, selectedIndex]);

  // Reset on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const displayItems = query ? results : popularPages;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          animation: 'agentsSearchFadeIn 0.2s ease',
        }}
      />
      
      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '580px',
        background: theme.elevated,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
        zIndex: 1001,
        overflow: 'hidden',
        animation: 'agentsSearchSlideDown 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: `1px solid ${theme.border}`,
        }}>
          <Search style={{ width: '18px', height: '18px', color: theme.accent, flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search agents reference..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: theme.text,
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          />
          <kbd style={{
            padding: '0.25rem 0.5rem',
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            fontSize: '0.6875rem',
            color: theme.subtle,
            fontFamily: 'inherit',
          }}>
            esc
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {query && results.length === 0 ? (
            <div style={{
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              color: theme.muted,
            }}>
              <Search style={{
                width: '40px',
                height: '40px',
                margin: '0 auto 0.75rem',
                color: theme.subtle,
                opacity: 0.5,
              }} />
              <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                No results for &ldquo;{query}&rdquo;
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.subtle }}>
                Try a different search term
              </div>
            </div>
          ) : (
            <>
              {!query && (
                <div style={{
                  padding: '0.75rem 1.25rem 0.5rem',
                  fontSize: '0.6875rem',
                  color: theme.subtle,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                }}>
                  Quick Links
                </div>
              )}
              <div style={{ padding: '0.25rem 0.5rem 0.5rem' }}>
                {displayItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      background: selectedIndex === index ? theme.surface : 'transparent',
                      border: `1px solid ${selectedIndex === index ? theme.border : 'transparent'}`,
                      marginBottom: '0.125rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(0, 168, 150, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.accent,
                      flexShrink: 0,
                    }}>
                      {typeIcons[item.type]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: theme.text,
                        marginBottom: '0.125rem',
                        letterSpacing: '-0.01em',
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: theme.subtle,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {item.section} · {item.description}
                      </div>
                    </div>
                    <ArrowRight style={{
                      width: '14px',
                      height: '14px',
                      color: theme.subtle,
                      flexShrink: 0,
                      opacity: selectedIndex === index ? 1 : 0,
                      transition: 'opacity 0.15s ease',
                    }} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.625rem 1rem',
          borderTop: `1px solid ${theme.border}`,
          fontSize: '0.6875rem',
          color: theme.subtle,
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <kbd style={{
                padding: '0.125rem 0.25rem',
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '3px',
                fontSize: '0.625rem',
              }}>↑↓</kbd>
              navigate
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <kbd style={{
                padding: '0.125rem 0.25rem',
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '3px',
                fontSize: '0.625rem',
              }}>↵</kbd>
              select
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes agentsSearchFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes agentsSearchSlideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}

export default AgentsSearchModal;
