import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { Prose, Section } from '@/features/site/section'

const jsonShapes = [
  '{ "ok": true, "command": "new", "data": { … } }',
  '{ "ok": false, "command": "db", "error": { "code": "…", "message": "…" } }',
]

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary((await lang()) as Locale)

  return { title: t.commands.title, description: t.commands.description }
}

export default async function CommandsPage() {
  const t = getDictionary((await lang()) as Locale)

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-navy">
        {t.commands.heading}
      </h1>
      <Prose className="mt-6 text-lg text-ink/85">{t.commands.standfirst}</Prose>

      <dl className="mt-12 border-t border-ink">
        {t.commands.rows.map((row) => (
          <div
            key={row.command}
            className="grid gap-2 border-b border-rule py-4 md:grid-cols-[18rem_1fr] md:gap-8"
          >
            <dt className="font-mono text-sm font-medium text-navy">{row.command}</dt>
            <dd className="text-sm leading-relaxed text-ink/85">{row.what}</dd>
          </div>
        ))}
      </dl>

      <Section heading={t.commands.json.heading}>
        <Prose className="text-ink/85">{t.commands.json.body}</Prose>
        <div className="mt-6 space-y-2">
          {jsonShapes.map((shape) => (
            <pre
              key={shape}
              className="overflow-x-auto border border-rule bg-card p-3 font-mono text-xs text-ink"
            >
              {shape}
            </pre>
          ))}
        </div>
      </Section>
    </div>
  )
}
