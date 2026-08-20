"use client"
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { defaultEssay } from './essayUtils';
import styles from './EssayMetadata.module.css';

const EssayMetadata = ({
  essay,
  theme,
  currentTheme
}) => {
  const essayData = essay || defaultEssay;

  const relatedEssays = [
    { title: "Critical Minerals and the New Resource Competition", author: "Zev Uhuru", readTime: 25 },
{ title: "Energy Storage: The Missing Link in Renewable Geopolitics", author: "Han Thi Htet", readTime: 30 },
{ title: "Digital Infrastructure and Energy Sovereignty", author: "Zev Uhuru", readTime: 20 }
  ];

  const authorSectionClass = `${styles.authorSection} ${theme === 'dark' ? styles.authorSectionDark : styles.authorSectionLight}`;
  const relatedSectionClass = `${styles.relatedSection} ${theme === 'dark' ? styles.relatedSectionDark : styles.relatedSectionLight}`;
  const sectionTitleClass = `${styles.sectionTitle} ${theme === 'dark' ? styles.sectionTitleDark : styles.sectionTitleLight}`;
  const relatedTitleClass = `${styles.relatedTitle} ${theme === 'dark' ? styles.relatedTitleDark : styles.relatedTitleLight}`;
  const authorNameClass = `${styles.authorName} ${theme === 'dark' ? styles.authorNameDark : styles.authorNameLight}`;
  const authorBioClass = `${styles.authorBio} ${theme === 'dark' ? styles.authorBioDark : styles.authorBioLight}`;
  const relatedItemClass = `${styles.relatedItem} ${theme === 'dark' ? styles.relatedItemDark : styles.relatedItemLight}`;
  const relatedItemTitleClass = `${styles.relatedTitle} ${theme === 'dark' ? styles.relatedTitleDark : styles.relatedTitleLight}`;
  const relatedMetaClass = `${styles.relatedMeta} ${theme === 'dark' ? styles.relatedMetaDark : styles.relatedMetaLight}`;

  return (
    <>
      {/* Author Bio */}
      <section className={authorSectionClass}>
        <h3 className={sectionTitleClass}>
          About the Authors
        </h3>
        <div className={styles.authorsList}>
          <div className={styles.authorItem}>
            <h4 className={authorNameClass}>Zev Uhuru</h4>
            <p className={authorBioClass}>
              Agentic Engineer. Specializes in the 
              intersection of renewable energy technology and international relations, with a focus on 
              Asia-Pacific energy markets.
            </p>
          </div>
          <div className={styles.authorItem}>
            <h4 className={authorNameClass}>Han Thi Htet</h4>
            <p className={authorBioClass}>
              Quality Assurance, Esy. She specializes in ensuring the highest quality standards for AI-powered educational tools and academic writing assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Related Essays */}
      <section className={relatedSectionClass}>
        <h3 className={relatedTitleClass}>
          Related Essays
        </h3>
        <div className={styles.relatedList}>
          {relatedEssays.map((related, index) => (
            <a
              key={index}
              href="#"
              className={relatedItemClass}
            >
              <div className={styles.relatedContent}>
                <h4 className={relatedItemTitleClass}>
                  {related.title}
                </h4>
                <p className={relatedMetaClass}>
                  {related.author} · {related.readTime} min read
                </p>
              </div>
              <ChevronRight size={18} className={styles.relatedArrow} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default EssayMetadata; 