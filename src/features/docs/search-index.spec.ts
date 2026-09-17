import { describe, expect, it } from 'vitest'
import { readDocument } from './documents'
import { renderMarkdown } from './markdown'
import { buildSearchIndex } from './search-index'

describe('the search index', () => {
  it('finds headings across the documents', async () => {
    const index = await buildSearchIndex()

    expect(index.length).toBeGreaterThan(100)
  })

  it('anchors every record at a heading the rendered page actually has', async () => {
    const index = await buildSearchIndex()
    const { html } = await renderMarkdown(await readDocument('stack'))
    const records = index.filter((record) => record.slug === 'stack')

    expect(records.length).toBeGreaterThan(0)
    for (const record of records) {
      expect(html, record.heading).toContain(`id="${record.anchor}"`)
    }
  })
})
