import type { MetadataRoute } from 'next'
import { documents } from '@/features/docs/documents'
import { locales } from '@/features/i18n/locales'
import { alternates } from '@/lib/routes'
import { site } from '@/lib/site'

const pages = [[], ['start'], ['concepts'], ['commands'], ['desktop'], ['docs']]

function absolute(languages: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(languages).map(([lang, url]) => [lang, `${site.url}${url}`]),
  )
}

function entry(locale: (typeof locales)[number], segments: string[], priority: number) {
  const page = alternates(locale, ...segments)

  return {
    url: `${site.url}${page.canonical}`,
    changeFrequency: 'weekly' as const,
    priority,
    alternates: { languages: absolute(page.languages) },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...pages.map((segments) => entry(locale, segments, segments.length === 0 ? 1 : 0.8)),
    ...documents.map((document) => entry(locale, ['docs', document.slug], 0.6)),
  ])
}
