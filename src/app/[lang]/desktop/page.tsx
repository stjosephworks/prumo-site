import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { Prose, Section } from '@/features/site/section'
import { external } from '@/lib/routes'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary((await lang()) as Locale)

  return { title: t.desktop.title, description: t.desktop.description }
}

export default async function DesktopPage() {
  const t = getDictionary((await lang()) as Locale)
  const stateLabels = {
    done: t.desktop.status.done,
    next: t.desktop.status.next,
    later: t.desktop.status.later,
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-navy">
        {t.desktop.heading}
      </h1>
      <Prose className="mt-6 text-lg text-ink/85">{t.desktop.standfirst}</Prose>

      <Section heading={t.desktop.consumer.heading} className="mt-12">
        <Prose className="text-ink/85">{t.desktop.consumer.body}</Prose>
      </Section>

      <Section heading={t.desktop.status.heading}>
        <Prose className="text-ink/85">{t.desktop.status.body}</Prose>

        <ol className="mt-8 border-t border-rule">
          {t.desktop.status.items.map((item) => (
            <li
              key={item.heading}
              className="grid gap-2 border-b border-rule py-5 md:grid-cols-[9rem_1fr] md:gap-8"
            >
              <span
                className={cn(
                  'h-fit w-fit border px-2 py-0.5 text-xs',
                  item.state === 'done' && 'border-navy text-navy',
                  item.state === 'next' && 'border-brass-ink text-brass-ink',
                  item.state === 'later' && 'border-rule text-muted-foreground',
                )}
              >
                {stateLabels[item.state]}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold">{item.heading}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading={t.desktop.follow.heading}>
        <Prose className="text-ink/85">{t.desktop.follow.body}</Prose>
        <a
          href={external.desktopRepository}
          className="mt-6 inline-block border-b border-brass pb-0.5 text-navy"
        >
          {t.desktop.follow.repository}
        </a>
      </Section>
    </div>
  )
}
