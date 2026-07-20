"use client";

import { useState, useEffect } from "react";
import { AgentsSidebar, AgentsSearchModal } from "@/components/agents";
import { Sun, Moon } from "lucide-react";
import { navyCalmDarkTheme } from "@/lib/theme";
import "./agents.css";

// Light theme
const lightTheme = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0A2540',
  border: 'rgba(10, 37, 64, 0.1)',
  accent: '#00A896',
};

// Dark theme
const darkTheme = {
  bg: navyCalmDarkTheme.bg,
  surface: navyCalmDarkTheme.surface,
  text: navyCalmDarkTheme.text,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme-agents');
    const isDark = storedTheme === 'dark';
    setIsDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('agents-dark');
      document.body.classList.remove('agents-light');
    } else {
      document.body.classList.add('agents-light');
      document.body.classList.remove('agents-dark');
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    if (newIsDark) {
      document.body.classList.add('agents-dark');
      document.body.classList.remove('agents-light');
      localStorage.setItem('theme-agents', 'dark');
    } else {
      document.body.classList.add('agents-light');
      document.body.classList.remove('agents-dark');
      localStorage.setItem('theme-agents', 'light');
    }
    window.dispatchEvent(new Event('themechange'));
  };

  // Handle Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div className="agents-layout">
      {/* Main container with sidebar */}
      <div className="agents-container">
        {/* Sidebar */}
        <AgentsSidebar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Content Area */}
        <main className="agents-main">
          {children}
        </main>
      </div>

      {/* Search Modal */}
      <AgentsSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Theme Toggle Button - Fixed position bottom right */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: `1px solid ${theme.border}`,
          background: theme.surface,
          color: theme.text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isDarkMode 
            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(10, 37, 64, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
