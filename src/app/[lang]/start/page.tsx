import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { CommandBlock } from '@/features/site/command-block'
import { RuledTable } from '@/features/site/ruled-table'
import { Prose, Section } from '@/features/site/section'

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary((await lang()) as Locale)

  return { title: t.start.title, description: t.start.description }
}

export default async function StartPage() {
  const t = getDictionary((await lang()) as Locale)
  const copyLabels = {
    copy: t.common.copy,
    copied: t.common.copied,
    npm: t.common.npm,
    pnpm: t.common.pnpm,
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-navy">
        {t.start.heading}
      </h1>
      <Prose className="mt-6 text-lg text-ink/85">{t.start.standfirst}</Prose>

      <ol className="mt-14 space-y-12">
        {t.start.steps.map((step, index) => (
          <li key={step.heading} className="relative border-t border-rule pt-6 md:pl-14">
            <span
              aria-hidden="true"
              className="absolute left-0 top-4 hidden font-mono text-sm text-brass-ink md:block"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="font-serif text-xl font-semibold">{step.heading}</h2>
            <Prose className="mt-3 text-ink/85">{step.body}</Prose>
            <CommandBlock className="mt-5 max-w-2xl" command={step.command} labels={copyLabels} />
          </li>
        ))}
      </ol>

      <Section heading={t.start.flags.heading} className="mt-16">
        <RuledTable
          columns={{ head: t.start.flags.columns.flag, body: t.start.flags.columns.answers }}
          rows={t.start.flags.rows.map((row) => ({ head: row.flag, body: row.answers }))}
        />
      </Section>

      <Section heading={t.start.landed.heading}>
        <RuledTable
          columns={{ head: t.start.landed.columns.file, body: t.start.landed.columns.what }}
          rows={t.start.landed.rows.map((row) => ({ head: row.file, body: row.what }))}
        />
      </Section>
    </div>
  )
}
