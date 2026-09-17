import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { lang } from 'next/root-params'
import { DocNav } from '@/features/docs/doc-nav'
import {
  documents,
  documentsInGroup,
  findDocument,
  readDocument,
  sourceUrl,
} from '@/features/docs/documents'
import { renderMarkdown } from '@/features/docs/markdown'
import { TableOfContents } from '@/features/docs/table-of-contents'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'

export function generateStaticParams() {
  return documents.map((document) => ({ slug: document.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/docs/[slug]'>) {
  const { slug } = await params
  const document = findDocument(slug)
  if (document === undefined) return {}

  const locale = (await lang()) as Locale

  return {
    title: document.title,
    description: document.blurb[locale],
  } satisfies Metadata
}

export default async function DocumentPage({ params }: PageProps<'/[lang]/docs/[slug]'>) {
  const { slug } = await params
  const document = findDocument(slug)
  if (document === undefined) notFound()

  const locale = (await lang()) as Locale
  const t = getDictionary(locale)
  const { html, headings } = await renderMarkdown(await readDocument(document.slug))

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[14rem_minmax(0,1fr)_14rem]">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <DocNav
            locale={locale}
            groups={[
              { label: t.documents.groups.prumo, documents: documentsInGroup('prumo') },
              { label: t.documents.groups.desktop, documents: documentsInGroup('desktop') },
            ]}
          />
        </div>
      </aside>

      <article className="min-w-0">
        <div className="border-b border-rule pb-4">
          <p className="font-serif text-sm italic text-muted-foreground">
            {t.documents.englishNotice}
          </p>
          <a
            href={sourceUrl(document)}
            className="mt-2 inline-block font-mono text-xs text-navy underline-offset-4 hover:underline"
          >
            {t.common.readOnGithub}
          </a>
        </div>

        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: the markdown is rendered at build
            from the commit content/documents.json pins, and no part of it comes from a request. */}
        <div className="doc mt-8" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <TableOfContents headings={headings} label={t.common.onThisPage} />
        </div>
      </aside>
    </div>
  )
}
