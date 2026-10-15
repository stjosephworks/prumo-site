import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { Callout } from '@/features/site/callout'
import { CommandBlock } from '@/features/site/command-block'
import { Prose, Section } from '@/features/site/section'
import { VisitorSystem } from '@/features/site/visitor-system'
import { visitorTone } from '@/features/site/visitor-tone'
import { desktopAssetUrl, desktopBuilds, desktopSystems, isUnsigned } from '@/lib/desktop'
import { alternates, desktopDownloadUrl, desktopRelease, external } from '@/lib/routes'
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
  const download = t.desktop.download
  const copyLabels = {
    copy: t.common.copy,
    copied: t.common.copied,
    npm: t.common.npm,
    pnpm: t.common.pnpm,
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-navy">
        {t.desktop.heading}
      </h1>
      <Prose className="mt-6 text-lg text-ink/85">{t.desktop.standfirst}</Prose>

      <Section id="download" heading={t.desktop.download.heading} className="mt-12">
        <Prose className="text-ink/85">{t.desktop.download.body}</Prose>
        <a
          href={desktopDownloadUrl(desktopRelease.channel)}
          className="mt-6 inline-block w-fit bg-navy px-5 py-3 text-sm font-semibold text-paper hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        >
          {t.desktop.download.button}
        </a>

        <VisitorSystem className="mt-10 space-y-10">
          {desktopSystems.map((system) => (
            <section
              key={system}
              id={system}
              aria-labelledby={`${system}-heading`}
              className={cn(
                'scroll-mt-24 border-l-2 border-l-transparent pl-4',
                visitorTone[system].row,
              )}
            >
              <h3 id={`${system}-heading`} className="font-serif text-xl font-semibold">
                {download.systems[system].name}
                <span className="font-sans text-sm font-normal text-muted-foreground">
                  {' '}
                  · {download.systems[system].arch}
                </span>
                <span
                  className={cn(
                    'ml-2 hidden border border-brass px-1.5 align-middle font-sans text-xs font-normal text-brass-ink',
                    visitorTone[system].tag,
                  )}
                >
                  {download.yourSystem}
                </span>
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {desktopBuilds(system).map((build) => (
                  <li key={build.file}>
                    <span className="font-semibold">{download.builds[build.kind]}</span>
                    <span className="text-muted-foreground"> · </span>
                    <a
                      href={desktopAssetUrl(build.file)}
                      className="font-mono text-xs text-navy underline decoration-brass underline-offset-4 [overflow-wrap:anywhere] hover:decoration-navy"
                    >
                      {build.file}
                    </a>
                  </li>
                ))}
              </ul>

              {system === 'macos' && (
                <div className="mt-4 space-y-4">
                  <Prose className="text-ink/85">{download.macos.install}</Prose>
                  {isUnsigned('macos', desktopRelease.channel) && (
                    <Callout label={download.macos.warning.label}>
                      <p>{download.macos.warning.lead}</p>
                      <p className="font-semibold">{download.macos.warning.stepsHeading}</p>
                      <ol className="list-decimal space-y-1.5 pl-5">
                        {download.macos.warning.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <p>
                        {download.macos.warning.guideBefore}{' '}
                        <a
                          href={download.macos.warning.guideUrl}
                          className="text-navy underline underline-offset-4"
                        >
                          {download.macos.warning.guideLink}
                        </a>
                        .
                      </p>
                    </Callout>
                  )}
                </div>
              )}

              {system === 'linux' && (
                <div className="mt-4 space-y-4">
                  <Prose className="text-ink/85">{download.linux.install}</Prose>
                  {desktopBuilds('linux').map((build) => (
                    <div key={build.file}>
                      <p className="text-sm text-muted-foreground">{download.builds[build.kind]}</p>
                      <CommandBlock
                        className="mt-2 max-w-2xl"
                        command={`sudo ${build.kind === 'deb' ? 'apt' : 'dnf'} install ./${build.file}`}
                        labels={copyLabels}
                      />
                    </div>
                  ))}
                  <Callout label={download.linux.warning.label}>
                    <p>{download.linux.warning.body}</p>
                  </Callout>
                </div>
              )}

              {system === 'windows' && (
                <div className="mt-4 space-y-4">
                  <Prose className="text-ink/85">{download.windows.install}</Prose>
                  <Callout label={download.windows.warning.label}>
                    <p>{download.windows.warning.smartScreen}</p>
                    <p>{download.windows.warning.smartAppControl}</p>
                    <p>
                      {download.windows.warning.guideBefore}{' '}
                      <a
                        href={download.windows.warning.guideUrl}
                        className="text-navy underline underline-offset-4"
                      >
                        {download.windows.warning.guideLink}
                      </a>
                      .
                    </p>
                  </Callout>
                  <Prose className="text-ink/85">{download.windows.tools}</Prose>
                  <Prose className="text-ink/85">{download.windows.channel}</Prose>
                </div>
              )}
            </section>
          ))}
        </VisitorSystem>

        <Prose className="mt-10 text-ink/85">{download.updates}</Prose>
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
