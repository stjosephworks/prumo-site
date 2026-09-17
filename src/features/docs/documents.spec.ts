import { access } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { locales } from '@/features/i18n/locales'
import { documents, sourceUrl } from './documents'

describe('the document manifest', () => {
  it('gives every document a unique slug', () => {
    const slugs = documents.map((document) => document.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('describes every document in every language', () => {
    for (const document of documents) {
      for (const locale of locales) {
        expect(document.blurb[locale], `${document.slug} in ${locale}`).toBeTruthy()
      }
    }
  })

  it('points every document at a pinned commit, never at a branch', () => {
    for (const document of documents) {
      expect(sourceUrl(document), document.slug).toMatch(/\/blob\/[0-9a-f]{40}\//)
    }
  })

  it('has a fetched file for every document it lists', async () => {
    for (const document of documents) {
      await expect(
        access(join(process.cwd(), 'content', 'fetched', `${document.slug}.md`)),
        document.slug,
      ).resolves.toBeUndefined()
    }
  })
})
