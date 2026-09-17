import type { MetadataRoute } from 'next'
import { documents } from '@/features/docs/documents'
import { locales } from '@/features/i18n/locales'
import { site } from '@/lib/site'

const pages = ['', 'start', 'concepts', 'commands', 'desktop', 'docs']

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...pages.map((page) => ({
      url: `${site.url}/${locale}${page === '' ? '' : `/${page}`}`,
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    })),
    ...documents.map((document) => ({
      url: `${site.url}/${locale}/docs/${document.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ])
}
