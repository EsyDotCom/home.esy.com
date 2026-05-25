"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  currentTheme: {
    muted: string;
    subtle: string;
    faint: string;
    border: string;
    accent: string;
  };
}

const Footer: React.FC<FooterProps> = ({ currentTheme }) => {
  return (
    <footer style={{ 
      borderTop: `1px solid ${currentTheme.border}`,
      padding: '4rem 0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '4rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: currentTheme.accent, 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <BookOpen size={18} color="white" strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>esy</span>
            </div>
            <p style={{
              fontSize: '0.938rem',
              lineHeight: 1.7,
              color: currentTheme.subtle,
              maxWidth: '280px'
            }}>
              Transforming academic research through intelligent AI collaboration.
            </p>
          </div>

          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: currentTheme.subtle,
              marginBottom: '1.5rem'
            }}>
              Product
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <Link href="/features/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Features</Link>
              <Link href="/workflows/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Agentic Workflows</Link>
              <Link href="/pricing/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Pricing</Link>
              <Link href="/roadmap/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Roadmap</Link>
            </nav>
          </div>

          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: currentTheme.subtle,
              marginBottom: '1.5rem'
            }}>
              Resources
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <a href="/guide/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Getting Started</a>
              <a href="/best-practices/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Best Practices</a>
              <a href="/examples/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Examples</a>
              <a href="/community/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Community</a>
            </nav>
          </div>

          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: currentTheme.subtle,
              marginBottom: '1.5rem'
            }}>
              Company
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <Link href="/about/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>About</Link>
              <Link href="/privacy/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Privacy</Link>
              <Link href="/terms/" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Terms</Link>
            </nav>
          </div>
        </div>

        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${currentTheme.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: currentTheme.faint
          }}>
            © 2025 Esy. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.875rem',
            color: currentTheme.subtle
          }}>
            Built for researchers, by researchers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 