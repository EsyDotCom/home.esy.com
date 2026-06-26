"use client"

import { useState } from 'react';
import styles from './SchoolArticleHeader.module.css';
import Navigation from '@/components/Home/navigation';
import SchoolArticleActions from './SchoolArticleActions';
import Image from 'next/image';

export default function SchoolArticleHeader({ article }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Background Effects */}
        <div className={styles.backgroundEffects}>
          <div className={styles.backgroundEffect1} />
          <div className={styles.backgroundEffect2} />
        </div>

        <div className={styles.heroContent}>
          {/* Back to School Link */}
          <div className={styles.backLink}>
            <a href="/learn/">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Back to School
            </a>
          </div>

          {/* Category Badge */}
          <div className={styles.categoryContainer}>
            <span className={styles.categoryBadge}>
              <div className={styles.categoryDot} />
              {article.category}
            </span>
            <span className={styles.featuredLabel}>Featured Article</span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            {article.subtitle}
          </p>

          {/* Meta Info */}
          <div className={styles.metaContainer}>
            <div className={styles.authorInfo}>
              <Image 
                src={article.author.avatar}
                alt={article.author.name}
                width={48}
                height={48}
                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #2a2a3a' }}
              />
              <div className={styles.authorDetails}>
                <h4>{article.author.name}</h4>
                <p className={styles.authorTitle}>{article.author.title}</p>
              </div>
            </div>
            <div className={styles.metaStats}>
              <span className={styles.metaStat}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {article.date}
              </span>
              <span className={styles.metaStat}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {article.readTime}
              </span>
              <span className={styles.metaStat}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                {article.readCount}
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className={styles.actionBar}>
            <SchoolArticleActions article={article} />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={styles.listenButton}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
              {isPlaying ? 'Stop' : 'Listen'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
} 