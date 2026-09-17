import type { Metadata } from 'next'
import Link from 'next/link'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { Prose, Section } from '@/features/site/section'
import { path } from '@/lib/routes'

const areas = [
  { name: 'core', always: true },
  { name: 'api', always: false },
  { name: 'database', always: false },
  { name: 'client', always: false },
  { name: 'web', always: false },
  { name: 'mobile', always: false },
  { name: 'site', always: false },
  { name: 'monorepo', always: false },
  { name: 'multi-tenancy', always: false },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary((await lang()) as Locale)

  return { title: t.concepts.title, description: t.concepts.description }
}

export default async function ConceptsPage() {
  const locale = (await lang()) as Locale
  const t = getDictionary(locale)

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <h1 className="max-w-[20ch] font-serif text-4xl font-semibold tracking-tight text-navy">
        {t.concepts.heading}
      </h1>
      <Prose className="mt-6 text-lg text-ink/85">{t.concepts.standfirst}</Prose>

      <Section heading={t.concepts.areas.heading} className="mt-12">
        <Prose className="text-ink/85">{t.concepts.areas.body}</Prose>
        <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {areas.map((area) => (
            <li key={area.name} className="bg-card px-4 py-3">
              <span className="font-mono text-sm text-navy">{area.name}/</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {area.always ? t.concepts.areas.always : t.concepts.areas.conditional}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href={path(locale, 'docs', 'structure')}
          className="mt-6 inline-block border-b border-brass pb-0.5 text-sm text-navy"
        >
          {t.home.readDocuments}
        </Link>
      </Section>

      <Section heading={t.concepts.assistants.heading}>
        <Prose className="text-ink/85">{t.concepts.assistants.body}</Prose>
      </Section>

      <Section heading={t.concepts.ownership.heading}>
        <Prose className="text-ink/85">{t.concepts.ownership.body}</Prose>
      </Section>
    </div>
  )
}
