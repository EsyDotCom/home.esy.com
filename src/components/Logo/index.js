import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './Logo.module.css';

const Logo = ({ 
  suffix = undefined, 
  href = '', 
  className = '', 
  size = 60,
  showText = true,
  wordmarkOnly = false, // Show only the text wordmark, no image
  wordmarkFont = 'zcool', // 'zcool' | 'noto' — swap to compare typefaces
  theme = 'dark', // Theme options: 'dark', 'light', 'navy-dark'
  priority = false, // Whether this image should be preloaded (for LCP optimization)
  animatedE = false // Render the brand "e" as glyph pieces that play the synthesis motion on hover (header only)
}) => {
  const suffixRef = useRef(null);
  
  // Check if this is a dark theme variant (for suffix styling)
  const isDarkTheme = theme === 'dark' || theme === 'navy-dark';
  
  // Apply theme styles immediately when theme prop changes
  useEffect(() => {
    if (suffixRef.current && suffix) {
      const element = suffixRef.current;
      if (!isDarkTheme) {
        element.style.setProperty('color', 'rgba(30, 41, 59, 0.75)', 'important');
        element.style.setProperty('background', 'rgba(30, 41, 59, 0.03)', 'important');
        element.style.setProperty('border-color', 'rgba(30, 41, 59, 0.08)', 'important');
      } else {
        element.style.setProperty('color', 'rgba(255, 255, 255, 0.75)', 'important');
        element.style.setProperty('background', 'rgba(255, 255, 255, 0.03)', 'important');
        element.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
      }
    }
  }, [theme, suffix, isDarkTheme]);
  
  // Switch logo based on theme for better contrast
  const getLogoPath = () => {
    if (theme === 'light') {
      return '/esy-logos/logo-files/for-web/svg/black-logo-no-bg.svg';  // Black logo for light backgrounds
    } else if (theme === 'navy-dark') {
      return '/esy-logos/logo-files/for-web/png/white-logo-no-bg.png';  // White logo for navy dark
    }
    return '/esy-logos/logo-files/for-web/svg/color-no-bg.svg';         // Color logo for default dark
  };
  
  const logoPath = getLogoPath();

  const wordmarkFontClass =
    wordmarkFont === 'noto'     ? styles.logoWordmark__noto :
    wordmarkFont === 'blackops' ? styles.logoWordmark__blackops :
                                  styles.logoWordmark__zcool;

  const wordmarkColor = isDarkTheme
    ? 'rgba(255, 255, 255, 0.92)'
    : 'rgba(15, 23, 42, 0.88)';

  const logoContent = (
    <div className={`${styles.logo} ${wordmarkOnly ? styles.logoWordmarkOnly : ''} ${className}`}>
      {!wordmarkOnly && (
        <div className={styles.logoIcon}>
          <Image 
            src={logoPath} 
            alt="Esy Logo" 
            width={size} 
            height={size}
            priority={priority}
          />
        </div>
      )}
      {suffix && (
        <span 
          ref={suffixRef}
          className={styles.logoSubtitle}
          style={{
            color: isDarkTheme 
              ? 'rgba(255, 255, 255, 0.75) !important' // White text for dark modes
              : 'rgba(30, 41, 59, 0.75) !important',   // Dark text for light mode
            background: isDarkTheme
              ? 'rgba(255, 255, 255, 0.03) !important' // Dark background for dark modes
              : 'rgba(30, 41, 59, 0.03) !important',   // Light background for light mode
            borderColor: isDarkTheme
              ? 'rgba(255, 255, 255, 0.08) !important' // Light border for dark modes
              : 'rgba(30, 41, 59, 0.08) !important',   // Dark border for light mode
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (isDarkTheme) {
              e.target.style.setProperty('background', 'rgba(255, 255, 255, 0.06)', 'important');
              e.target.style.setProperty('border-color', 'rgba(255, 255, 255, 0.12)', 'important');
              e.target.style.setProperty('color', 'rgba(255, 255, 255, 0.9)', 'important');
            } else {
              e.target.style.setProperty('background', 'rgba(30, 41, 59, 0.06)', 'important');
              e.target.style.setProperty('border-color', 'rgba(30, 41, 59, 0.12)', 'important');
              e.target.style.setProperty('color', 'rgba(30, 41, 59, 0.9)', 'important');
            }
          }}
          onMouseLeave={(e) => {
            if (isDarkTheme) {
              e.target.style.setProperty('background', 'rgba(255, 255, 255, 0.03)', 'important');
              e.target.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
              e.target.style.setProperty('color', 'rgba(255, 255, 255, 0.75)', 'important');
            } else {
              e.target.style.setProperty('background', 'rgba(30, 41, 59, 0.03)', 'important');
              e.target.style.setProperty('border-color', 'rgba(30, 41, 59, 0.08)', 'important');
              e.target.style.setProperty('color', 'rgba(30, 41, 59, 0.75)', 'important');
            }
          }}
        >
          {suffix}
        </span>
      )}
      {(showText || wordmarkOnly) && (
        wordmarkOnly ? (
          <span
            className={`esy-wordmark ${styles.logoWordmark} ${wordmarkFontClass}`}
            style={{ color: wordmarkColor }}
            aria-label="esy"
          >
            {/* Render the brand "e" as the Black Ops One glyph pieces so it can
                play the Esy synthesis motion on logo hover — opt-in via animatedE
                so only the site header gets it. Everywhere else (footer, sidebars)
                keeps a plain teal "e". */}
            {wordmarkFont === 'blackops' && animatedE ? (
              <span className={`esy-loader esy-loader--static ${styles.logoE}`} aria-hidden="true">
                <span className="esy-e-piece esy-e-spine" />
                <span className="esy-e-piece esy-e-bowl" />
                <span className="esy-e-piece esy-e-bar" />
              </span>
            ) : (
              <span style={{ color: '#00A896' }} aria-hidden="true">e</span>
            )}
            <span aria-hidden="true">sy</span>
          </span>
        ) : (
          <span className={styles.logoText}>esy</span>
        )
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={styles.logoLink}>
        {logoContent}
      </a>
    );
  }

  return logoContent;
};

export default Logo;