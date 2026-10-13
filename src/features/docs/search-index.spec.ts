import { describe, expect, it } from 'vitest'
import { documents, findDocument, readDocument, sourceUrl } from './documents'
import { renderMarkdown } from './markdown'
import { buildSearchIndex } from './search-index'

describe('the search index', () => {
  it('finds headings in every document', async () => {
    const index = await buildSearchIndex()

    for (const document of documents) {
      const records = index.filter((record) => record.slug === document.slug)

      expect(records.length, document.slug).toBeGreaterThan(0)
    }
  })

  it('anchors every record at a heading the rendered page actually has', async () => {
    const index = await buildSearchIndex()
    const stack = findDocument('stack')
    if (stack === undefined) throw new Error('stack is not in the manifest')
    const { html } = await renderMarkdown(await readDocument('stack'), sourceUrl(stack))
    const records = index.filter((record) => record.slug === 'stack')

    expect(records.length).toBeGreaterThan(0)
    for (const record of records) {
      expect(html, record.heading).toContain(`id="${record.anchor}"`)
    }
  })
})
