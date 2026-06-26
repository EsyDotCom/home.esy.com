import Link from 'next/link';
import styles from './articleCard.module.css';

export default function ArticleCard({ category, title, excerpt, author, date, readTime, slug }) {
  return (
    <Link href={`/learn/articles/${slug}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className={styles.articleCard}>
        <div className={styles.articleImage}>
          <span className={styles.articleCategory}>{category}</span>
        </div>
        <div className={styles.articleContent}>
          <h3 className={styles.articleTitle}>{title}</h3>
          <p className={styles.articleExcerpt}>{excerpt}</p>
          <div className={styles.articleMeta}>
            <div className={styles.articleAuthor}>
              <div className={styles.authorAvatar}></div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{author}</span>
                <span className={styles.articleDate}>{date}</span>
              </div>
            </div>
            <span className={styles.articleReadTime}>{readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
  