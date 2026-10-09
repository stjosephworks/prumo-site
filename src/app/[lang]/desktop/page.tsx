import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { Callout } from '@/features/site/callout'
import { Prose, Section } from '@/features/site/section'
import {
  alternates,
  desktopDownloadUrl,
  desktopRelease,
  external,
  needsOpenAnyway,
} from '@/lib/routes'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  const t = getDictionary(locale)

  return {
    title: t.desktop.title,
    description: t.desktop.description,
    alternates: alternates(locale, 'desktop'),
  }
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

      <Section heading={t.desktop.download.heading} className="mt-12">
        <Prose className="text-ink/85">{t.desktop.download.body}</Prose>
        <ul className="mt-5 space-y-1.5 text-sm">
          {t.desktop.download.builds.map((build) => (
            <li key={build.file}>
              <span className="font-semibold">{build.name}</span>
              <span className="text-muted-foreground"> · </span>
              <code className="font-mono text-xs text-navy">{build.file}</code>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
          <a
            href={desktopDownloadUrl(desktopRelease.channel)}
            className="inline-block w-fit bg-navy px-5 py-3 text-sm font-semibold text-paper hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            {t.desktop.download.button}
          </a>

          {needsOpenAnyway(desktopRelease.channel) && (
            <Callout label={t.desktop.download.warning.label}>
              <p>{t.desktop.download.warning.lead}</p>
              <p className="font-semibold">{t.desktop.download.warning.stepsHeading}</p>
              <ol className="list-decimal space-y-1.5 pl-5">
                {t.desktop.download.warning.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p>
                {t.desktop.download.warning.guideBefore}{' '}
                <a
                  href={t.desktop.download.warning.guideUrl}
                  className="text-navy underline underline-offset-4"
                >
                  {t.desktop.download.warning.guideLink}
                </a>
                .
              </p>
              <p>{t.desktop.download.warning.updates}</p>
            </Callout>
          )}
        </div>
      </Section>

      <Section heading={t.desktop.consumer.heading}>
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
