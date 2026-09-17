import type { Metadata } from 'next'
import Link from 'next/link'
import { lang } from 'next/root-params'
import { documentsInGroup } from '@/features/docs/documents'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { Prose } from '@/features/site/section'
import { path } from '@/lib/routes'

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary((await lang()) as Locale)

  return { title: t.documents.title, description: t.documents.description }
}

export default async function DocumentsPage() {
  const locale = (await lang()) as Locale
  const t = getDictionary(locale)

  const groups = [
    { key: 'prumo' as const, label: t.documents.groups.prumo },
    { key: 'desktop' as const, label: t.documents.groups.desktop },
  ]

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-navy">
        {t.documents.heading}
      </h1>
      <Prose className="mt-6 text-lg text-ink/85">{t.documents.standfirst}</Prose>

      {groups.map((group) => (
        <section key={group.key} className="mt-14">
          <h2 className="border-b border-ink pb-2 font-serif text-xl font-semibold">
            {group.label}
          </h2>
          <ul>
            {documentsInGroup(group.key).map((document) => (
              <li key={document.slug} className="border-b border-rule">
                <Link
                  href={path(locale, 'docs', document.slug)}
                  className="group grid gap-1 py-4 md:grid-cols-[16rem_1fr] md:gap-8"
                >
                  <span className="font-serif text-lg font-semibold text-navy group-hover:underline group-hover:decoration-brass group-hover:underline-offset-4">
                    {document.title}
                  </span>
                  <span className="text-sm leading-relaxed text-ink/80">
                    {document.blurb[locale]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
