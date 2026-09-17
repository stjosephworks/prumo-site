import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export interface Heading {
  depth: number
  id: string
  text: string
  lead: string
}

interface HastNode {
  type: string
  tagName?: string
  value?: string
  properties?: { id?: string }
  children?: HastNode[]
}

const headingDepths = new Map([
  ['h1', 1],
  ['h2', 2],
  ['h3', 3],
])

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? ''
  return (node.children ?? []).map(textOf).join('')
}

function readHeadings(root: HastNode): Heading[] {
  const headings: Heading[] = []

  for (const node of root.children ?? []) {
    const depth = node.tagName === undefined ? undefined : headingDepths.get(node.tagName)

    if (depth === undefined) {
      const open = headings.at(-1)
      if (open && open.lead === '' && node.tagName === 'p') open.lead = textOf(node)
      continue
    }

    const id = node.properties?.id
    if (id === undefined) continue
    headings.push({ depth, id, text: textOf(node), lead: '' })
  }

  return headings
}

export interface RenderedMarkdown {
  html: string
  headings: Heading[]
}

function pipeline(collect: (headings: Heading[]) => void) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['heading-anchor'] },
    })
    .use(() => (tree: HastNode) => {
      collect(readHeadings(tree))
    })
}

export async function renderMarkdown(markdown: string): Promise<RenderedMarkdown> {
  let headings: Heading[] = []

  const file = await pipeline((found) => {
    headings = found
  })
    .use(rehypeShiki, {
      theme: 'vitesse-light',
      fallbackLanguage: 'text',
      defaultLanguage: 'text',
    })
    .use(rehypeStringify)
    .process(markdown)

  return { html: String(file), headings }
}

// Same chain minus the highlighter: the index needs the anchors rehype-slug produces, and
// highlighting half a megabyte of code to throw the result away is the expensive half.
export async function extractHeadings(markdown: string): Promise<Heading[]> {
  let headings: Heading[] = []

  await pipeline((found) => {
    headings = found
  })
    .use(rehypeStringify)
    .process(markdown)

  return headings
}
