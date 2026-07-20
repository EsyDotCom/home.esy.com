"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import {
  agentsNavigation,
  type NavSection,
  type NavItem,
} from "@/lib/agents-navigation";
import {
  Book,
  Bot,
  Workflow,
  RefreshCw,
  Wrench,
  Database,
  Map,
  Network,
  UserCheck,
  GitBranch,
  GitMerge,
  Repeat,
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { navyCalmDarkTheme } from "@/lib/theme";

// Navy Calm Light Theme
const lightTheme = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  elevated: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  borderHover: 'rgba(10, 37, 64, 0.12)',
  accent: '#00A896',
  accentMuted: 'rgba(0, 168, 150, 0.15)',
  accentBorder: 'rgba(0, 168, 150, 0.25)',
};

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  book: <Book className="w-4 h-4" />,
  bot: <Bot className="w-4 h-4" />,
  workflow: <Workflow className="w-4 h-4" />,
  refresh: <RefreshCw className="w-4 h-4" />,
  wrench: <Wrench className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  map: <Map className="w-4 h-4" />,
  network: <Network className="w-4 h-4" />,
  "user-check": <UserCheck className="w-4 h-4" />,
  "git-branch": <GitBranch className="w-4 h-4" />,
  "git-merge": <GitMerge className="w-4 h-4" />,
  repeat: <Repeat className="w-4 h-4" />,
  "shield-check": <ShieldCheck className="w-4 h-4" />,
  search: <Search className="w-4 h-4" />,
};

function NavItemComponent({ item, isActive, theme }: { item: NavItem; isActive: boolean; theme: typeof lightTheme }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link
      href={item.href}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.625rem 0.875rem',
        borderRadius: '8px',
        transition: 'all 0.15s ease',
        background: isActive 
          ? theme.accentMuted
          : isHovered ? theme.elevated : 'transparent',
        border: `1px solid ${isActive ? theme.accentBorder : 'transparent'}`,
        position: 'relative',
        marginLeft: '0.5rem',
      }}>
        {/* Active indicator */}
        {isActive && (
          <div style={{
            position: 'absolute',
            left: '-0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '2px',
            height: '1.25rem',
            background: theme.accent,
            borderRadius: '0 2px 2px 0',
          }} />
        )}
        
        {/* Icon */}
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          background: isActive ? (theme.accentMuted || 'rgba(0, 168, 150, 0.2)') : theme.surface,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isActive ? theme.accent : theme.subtle,
          transition: 'all 0.15s ease',
          flexShrink: 0,
        }}>
          {item.icon && iconMap[item.icon]}
        </div>

        {/* Text */}
        <span style={{
          fontSize: '0.8125rem',
          fontWeight: isActive ? 500 : 400,
          color: isActive ? theme.text : isHovered ? theme.muted : theme.subtle,
          transition: 'color 0.15s ease',
          flex: 1,
          letterSpacing: '-0.01em',
        }}>
          {item.title}
        </span>

        {/* New badge */}
        {item.isNew && (
          <span style={{
            padding: '0.125rem 0.375rem',
            background: 'linear-gradient(135deg, #00A896 0%, #00D4AA 100%)',
            color: '#FFFFFF',
            borderRadius: '4px',
            fontSize: '0.5625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            New
          </span>
        )}
      </div>
    </Link>
  );
}

function NavSectionComponent({ section, theme }: { section: NavSection; theme: typeof lightTheme }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          width: '100%',
          padding: '0.375rem 0.75rem',
          background: 'transparent',
          border: 'none',
          color: isHovered ? theme.muted : theme.subtle,
          fontSize: '0.6875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          cursor: 'pointer',
          transition: 'color 0.15s ease',
        }}
      >
        {isOpen ? (
          <ChevronDown className="w-3 h-3" style={{ opacity: 0.7 }} />
        ) : (
          <ChevronRight className="w-3 h-3" style={{ opacity: 0.7 }} />
        )}
        {section.title}
      </button>
      {isOpen && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.125rem', 
          marginTop: '0.375rem',
        }}>
          {section.items.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isActive={normalizedPath === item.href}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function AgentsSidebar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-agents');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? {
    bg: navyCalmDarkTheme.bg,
    surface: navyCalmDarkTheme.surface,
    elevated: navyCalmDarkTheme.bgElevated,
    text: navyCalmDarkTheme.text,
    muted: navyCalmDarkTheme.muted,
    subtle: navyCalmDarkTheme.subtle,
    border: navyCalmDarkTheme.border,
    borderHover: navyCalmDarkTheme.borderStrong,
    accent: navyCalmDarkTheme.accent,
    accentMuted: navyCalmDarkTheme.accentTint,
    accentBorder: navyCalmDarkTheme.accentBorder,
  } : lightTheme;

  // Close mobile nav on route change
  const pathname = usePathname();
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="agents-mobile-toggle"
        aria-label="Open navigation"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          padding: '0.875rem',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.accent} 0%, #00D4AA 100%)`,
          color: '#FFFFFF',
          border: 'none',
          boxShadow: isDarkMode 
            ? '0 8px 24px rgba(0, 212, 170, 0.4)'
            : '0 8px 24px rgba(0, 168, 150, 0.4)',
          cursor: 'pointer',
          display: 'none',
        }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="agents-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`agents-sidebar ${isMobileOpen ? 'is-open' : ''}`}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          height: '100vh',
          width: '260px',
          backgroundColor: theme.bg,
          borderRight: `1px solid ${theme.border}`,
          overflowY: 'auto',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 101,
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1rem',
          borderBottom: `1px solid ${theme.border}`,
        }}>
          <Logo 
            href="/ai-agents"
            wordmarkOnly
            wordmarkFont="blackops"
            theme={isDarkMode ? "navy-dark" : "light"}
          />
          
          <button
            onClick={() => setIsMobileOpen(false)}
            className="agents-mobile-close"
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              background: theme.surface,
              color: theme.muted,
              border: 'none',
              cursor: 'pointer',
              display: 'none',
            }}
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '0.75rem 1rem', borderBottom: `1px solid ${theme.border}` }}>
          <button
            onClick={onOpenSearch}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: '0.5rem 0.75rem 0.5rem 2.25rem',
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: theme.subtle,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.borderHover;
              e.currentTarget.style.background = theme.elevated;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.background = theme.surface;
            }}
          >
            <Search style={{
              position: 'absolute',
              left: '0.75rem',
              width: '14px',
              height: '14px',
              color: theme.subtle,
            }} />
            <span>Search...</span>
            <kbd style={{
              position: 'absolute',
              right: '0.5rem',
              padding: '0.125rem 0.375rem',
              background: theme.elevated,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              fontSize: '0.625rem',
              color: theme.subtle,
              fontFamily: 'inherit',
            }}>
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem 0.5rem',
        }}>
          {agentsNavigation.map((section) => (
            <NavSectionComponent key={section.title} section={section} theme={theme} />
          ))}
        </nav>

        {/* Footer CTA */}
        <div style={{
          padding: '1rem',
          borderTop: `1px solid ${theme.border}`,
        }}>
          <Link
            href="https://app.esy.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1rem',
              background: `linear-gradient(135deg, ${theme.accent} 0%, ${isDarkMode ? '#00D4AA' : '#00D4AA'} 100%)`,
              color: '#FFFFFF',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: isDarkMode 
                ? '0 4px 12px rgba(0, 212, 170, 0.3)'
                : '0 4px 12px rgba(0, 168, 150, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = isDarkMode
                ? '0 6px 16px rgba(0, 212, 170, 0.4)'
                : '0 6px 16px rgba(0, 168, 150, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isDarkMode
                ? '0 4px 12px rgba(0, 212, 170, 0.3)'
                : '0 4px 12px rgba(0, 168, 150, 0.25)';
            }}
          >
            Try Esy Free →
          </Link>
        </div>
      </aside>

      <style jsx global>{`
        /* Mobile styles */
        @media (max-width: 1023px) {
          .agents-sidebar {
            position: fixed !important;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .agents-sidebar.is-open {
            transform: translateX(0);
          }
          
          .agents-mobile-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          
          .agents-mobile-close {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
        
        /* Scrollbar styling - Light Mode */
        .agents-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        
        .agents-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .agents-sidebar::-webkit-scrollbar-thumb {
          background: rgba(10, 37, 64, 0.12);
          border-radius: 3px;
          border: 1px solid transparent;
          background-clip: padding-box;
        }
        
        .agents-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(10, 37, 64, 0.2);
          background-clip: padding-box;
        }
        
        /* Scrollbar styling - Dark Mode */
        body.agents-dark .agents-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          background-clip: padding-box;
        }
        
        body.agents-dark .agents-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
          background-clip: padding-box;
        }
      `}</style>
    </>
  );
}

export default AgentsSidebar;
