import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const Navigation = ({ scrolled }) => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            {/* Simplified Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                background: '#8b5cf6', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <BookOpen size={18} color="white" />
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.02em' }}>esy</span>
            </Link>

            {/* Clean Navigation */}
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/essays/" style={{ 
                color: 'white', 
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderBottom: '2px solid #8b5cf6',
                paddingBottom: '2px'
              }}>
                Essays
              </Link>
              <Link href="/research/" style={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}>
                Research
              </Link>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              padding: '0.5rem 1.25rem',
              background: '#8b5cf6',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              Write Essay
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 