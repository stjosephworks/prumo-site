import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Locale } from '@/features/i18n/locales'
import manifest from '../../../content/documents.json'

export type DocumentGroup = 'prumo' | 'desktop'

export interface DocumentEntry {
  slug: string
  source: string
  path: string
  group: DocumentGroup
  title: string
  blurb: Record<Locale, string>
}

export const documents = manifest.documents as DocumentEntry[]

export function findDocument(slug: string): DocumentEntry | undefined {
  return documents.find((document) => document.slug === slug)
}

export function documentsInGroup(group: DocumentGroup): DocumentEntry[] {
  return documents.filter((document) => document.group === group)
}

export function sourceUrl(document: DocumentEntry): string {
  const source = manifest.sources[document.source as keyof typeof manifest.sources]
  return `https://github.com/${source.repo}/blob/${source.commit}/${document.path}`
}

export function readDocument(slug: string): Promise<string> {
  return readFile(join(process.cwd(), 'content', 'fetched', `${slug}.md`), 'utf8')
}
