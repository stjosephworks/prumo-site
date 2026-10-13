import { describe, expect, it } from 'vitest'
import { renderMarkdown } from './markdown'

const base =
  'https://github.com/acme/repo/blob/0123456789abcdef0123456789abcdef01234567/docs/guide.md'

describe('renderMarkdown', () => {
  it('points a link relative to the document at its repository', async () => {
    const { html } = await renderMarkdown('[MIT](../LICENSE) and [next](next.md#start)', base)

    expect(html).toContain(
      'href="https://github.com/acme/repo/blob/0123456789abcdef0123456789abcdef01234567/LICENSE"',
    )
    expect(html).toContain(
      'href="https://github.com/acme/repo/blob/0123456789abcdef0123456789abcdef01234567/docs/next.md#start"',
    )
  })

  it('leaves absolute links and anchors alone', async () => {
    const { html } = await renderMarkdown('[a](https://example.com) [b](#rule) [c](/en/docs)', base)

    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('href="#rule"')
    expect(html).toContain('href="/en/docs"')
  })
})
