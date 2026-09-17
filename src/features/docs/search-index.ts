import { documents, readDocument } from './documents'
import { extractHeadings } from './markdown'

export interface SearchRecord {
  slug: string
  document: string
  heading: string
  anchor: string
  lead: string
}

export async function buildSearchIndex(): Promise<SearchRecord[]> {
  const perDocument = await Promise.all(
    documents.map(async (document) => {
      const headings = await extractHeadings(await readDocument(document.slug))

      return headings
        .filter((heading) => heading.depth <= 3)
        .map((heading) => ({
          slug: document.slug,
          document: document.title,
          heading: heading.text,
          anchor: heading.id,
          lead: heading.lead.slice(0, 180),
        }))
    }),
  )

  return perDocument.flat()
}
