import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getClipArtSlugs } from '@/data/clip-art-artifacts'
import { getAllTemplates } from '@/lib/templates'
import { courses } from '@/lib/learn/mockData'
import {
  getAllResearchArticles,
  getAllSchoolArticles,
} from '@/lib/published-articles'
import {
  getAllPatternSlugs,
  getAllTermSlugs,
  getAllWorkflowSlugs,
} from '@/content/agents/content'

// Sitemap stays CDN-fast but can be refreshed when Compose publishes or
// unpublishes a research/school article.
export const revalidate = 300

// Recursively find all page files in a directory
function findPageFiles(dir: string, baseDir: string = dir): string[] {
  const results: string[] = []
  
  try {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        // Skip special Next.js directories, components, and archived pages
        if (['api', 'components', '_components', '_archive'].includes(file)) continue
        
        results.push(...findPageFiles(filePath, baseDir))
      } else if (file.match(/^page\.(js|jsx|ts|tsx)$/)) {
        // Convert file path to route
        let route = path.dirname(filePath)
          .replace(baseDir, '')
          .replace(/\\/g, '/') // Windows compatibility
        
        // Skip dynamic routes (containing [])
        if (route.includes('[')) continue
        
        // Skip variant build directories (/v/ under essays)
        if (route.includes('/v/')) continue
        
        results.push(route || '/')
      }
    }
  } catch (error) {
    console.warn(`Could not read directory: ${dir}`)
  }
  
  return results
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://esy.com'
  
  // Routes to exclude from sitemap (disabled pages)
  const excludedRoutes = [
    '/essays/visual',
    '/blog',
  ]
  
  // Automatically discover all static routes from the app directory
  const appDir = path.join(process.cwd(), 'src/app')
  const discoveredRoutes = findPageFiles(appDir)
    .map(route => route === '/' ? '' : route)
    .filter(route => !excludedRoutes.some(excluded => route === excluded || route.startsWith(excluded + '/')))
    .sort((a, b) => {
      if (a === '') return -1
      if (b === '') return 1
      return a.localeCompare(b)
    })

  // Get infographic slugs from data registry
  let infographicSlugs: string[] = []
  try {
    const infographicsModule = require('@/data/infographics')
    infographicSlugs = infographicsModule.getInfographicSlugs?.() || []
  } catch {
    // Infographics module may not be available during build
  }

  // Get dynamic routes from content directories
  const essaysDir = path.join(process.cwd(), 'src/content/essays')
  const glossaryDir = path.join(process.cwd(), 'src/content/glossary')

  // Helper function to get markdown files from directory
  const getMarkdownFiles = (dir: string): string[] => {
    try {
      if (!fs.existsSync(dir)) return []
      return fs.readdirSync(dir)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => file.replace(/\.(md|mdx)$/, ''))
    } catch (error) {
      console.warn(`Could not read directory: ${dir}`)
      return []
    }
  }

  // Get dynamic content. School articles are intentionally absent: the
  // /learn/articles/[slug] route is retired (only .old/.backup files remain),
  // so emitting them produced 404s in the sitemap.
  const essays = getMarkdownFiles(essaysDir)
  const glossaryTerms = getMarkdownFiles(glossaryDir)

  // Build sitemap entries
  const sitemap: MetadataRoute.Sitemap = []

  // Add automatically discovered static routes
  // Note: Homepage (route === '') gets NO trailing slash; all others get trailing slash
  discoveredRoutes.forEach(route => {
    const url = route === '' 
      ? baseUrl  // Homepage: https://esy.com (no trailing slash)
      : `${baseUrl}${route}/`  // All other routes: https://esy.com/about/
    
    sitemap.push({
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    })
  })

  // Add essay routes (all with trailing slashes)
  essays.forEach(essay => {
    sitemap.push({
      url: `${baseUrl}/essays/${essay}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add glossary routes (all with trailing slashes)
  glossaryTerms.forEach(term => {
    sitemap.push({
      url: `${baseUrl}/glossary/${term}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // Add infographic routes (all with trailing slashes)
  infographicSlugs.forEach(slug => {
    sitemap.push({
      url: `${baseUrl}/infographics/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // ── Registry-backed dynamic routes ──────────────────────────────────────
  // The auto-discovery above skips [slug] routes, and these sections keep
  // their content in TS data registries (not content directories), so each
  // must be enumerated explicitly. prompt-library is intentionally excluded.

  // Research video pages (lastModified from real publish dates)
  const researchVideos = await getAllResearchArticles()
  researchVideos.forEach(video => {
    sitemap.push({
      url: `${baseUrl}/research/${video.slug}/`,
      lastModified: new Date(video.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // School video pages (articles are covered via the content dir above)
  const schoolVideos = await getAllSchoolArticles()
  schoolVideos.forEach(video => {
    sitemap.push({
      url: `${baseUrl}/learn/${video.slug}/`,
      lastModified: new Date(video.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Workflow template detail pages — core product surface, so higher priority
  const workflowTemplates = getAllTemplates()
  workflowTemplates.forEach(template => {
    sitemap.push({
      url: `${baseUrl}/workflows/${template.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Clip art artifact pages
  const clipArtSlugs = getClipArtSlugs()
  clipArtSlugs.forEach(slug => {
    sitemap.push({
      url: `${baseUrl}/clip-art/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Course detail + lesson pages
  let courseRouteCount = 0
  courses.forEach(course => {
    sitemap.push({
      url: `${baseUrl}/courses/${course.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    courseRouteCount++
    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        sitemap.push({
          url: `${baseUrl}/courses/${course.slug}/${lesson.slug}/`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
        courseRouteCount++
      })
    })
  })

  // Agents reference pages (patterns, terms, workflows)
  const agentRoutes = [
    ...getAllPatternSlugs().map(slug => `/agents/patterns/${slug}`),
    ...getAllTermSlugs().map(slug => `/agents/terms/${slug}`),
    ...getAllWorkflowSlugs().map(slug => `/agents/workflows/${slug}`),
  ]
  agentRoutes.forEach(route => {
    sitemap.push({
      url: `${baseUrl}${route}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // Model pages — mirrors the hardcoded list in models/[...slug]/page.tsx;
  // keep in sync until those pages get a data registry.
  const modelSlugs = ['claude-opus', 'gpt', 'gpt/5-2']
  modelSlugs.forEach(slug => {
    sitemap.push({
      url: `${baseUrl}/models/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // Log discovered routes for debugging
  console.log(`Sitemap generated with ${sitemap.length} total routes:`)
  console.log(`- ${discoveredRoutes.length} static routes (auto-discovered)`)
  console.log(`- ${essays.length} essay routes`)
  console.log(`- ${glossaryTerms.length} glossary routes`)
  console.log(`- ${infographicSlugs.length} infographic routes`)
  console.log(`- ${researchVideos.length} research video routes`)
  console.log(`- ${schoolVideos.length} learn video routes`)
  console.log(`- ${workflowTemplates.length} workflow template routes`)
  console.log(`- ${clipArtSlugs.length} clip art routes`)
  console.log(`- ${courseRouteCount} course routes`)
  console.log(`- ${agentRoutes.length} agents reference routes`)
  console.log(`- ${modelSlugs.length} model routes`)

  return sitemap
}