import { notFound } from 'next/navigation';
import { getMdxContent, getAllMdxSlugs } from '@/lib/mdxUtils';
import MdxClientRenderer from '@/components/SchoolArticle/MdxClientRenderer';

export default async function SchoolArticlePage({ params }) {
  try {
    const { slug } = await params;
    const mdxData = await getMdxContent(slug);
    
    if (!mdxData) {
      notFound();
    }
    
    const { meta, content, isCompiled } = mdxData;

    return (
      <MdxClientRenderer 
        meta={meta} 
        Content={isCompiled ? content : null}
        content={isCompiled ? null : content}
      />
    );
  } catch (error) {
    console.error('Article page error:', error);
    notFound();
  }
}

// For static export: generate all possible slugs
export async function generateStaticParams() {
  const slugs = getAllMdxSlugs();
  return slugs.map(slug => ({ slug }));
} 