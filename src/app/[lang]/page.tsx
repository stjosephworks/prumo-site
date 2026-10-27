import type { Metadata } from 'next'
import Link from 'next/link'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { CommandBlock } from '@/features/site/command-block'
import { DesktopDownload } from '@/features/site/desktop-download'
import { PlumbLine } from '@/features/site/plumb-line'
import { Prose, Section } from '@/features/site/section'
import { commands } from '@/lib/commands'
import { alternates, desktopRelease, external, path } from '@/lib/routes'
import { cn } from '@/lib/utils'

type TreeKind = 'code' | 'conventions' | 'plain'

const projectTree: { line: number; branch: string; name: string; kind: TreeKind }[] = [
  { line: 1, branch: '', name: 'my-app/', kind: 'plain' },
  { line: 2, branch: '├── ', name: 'apps/api/', kind: 'code' },
  { line: 3, branch: '├── ', name: 'apps/web/', kind: 'code' },
  { line: 4, branch: '├── ', name: 'packages/api-contract/', kind: 'code' },
  { line: 5, branch: '├── ', name: '.prumo/', kind: 'conventions' },
  { line: 6, branch: '│   ├── ', name: 'INDEX.md', kind: 'conventions' },
  { line: 7, branch: '│   ├── ', name: 'core/', kind: 'conventions' },
  { line: 8, branch: '│   └── ', name: '…', kind: 'conventions' },
  { line: 9, branch: '├── ', name: 'AGENTS.md', kind: 'conventions' },
  { line: 10, branch: '└── ', name: 'CLAUDE.md', kind: 'conventions' },
]

const treeTone: Record<TreeKind, string> = {
  code: 'text-navy',
  conventions: 'text-brass-ink',
  plain: 'text-ink',
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await lang()) as Locale
  const t = getDictionary(locale)

  return {
    title: t.home.title,
    description: t.home.description,
    alternates: alternates(locale),
  }
}

export default async function HomePage() {
  const locale = (await lang()) as Locale
  const t = getDictionary(locale)

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="relative md:pl-16">
        <PlumbLine />

        <section className="pb-16 pt-14 sm:pb-24 sm:pt-20" aria-labelledby="home-headline">
          <h1
            id="home-headline"
            className="max-w-[17ch] font-serif text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-navy sm:text-[4.1rem]"
          >
            {t.home.headline}
            <br />
            <span className="text-ink">{t.home.headlineSecond}</span>
          </h1>

          <Prose className="mt-8 max-w-[58ch] text-lg text-ink/85 sm:text-[1.2rem]">
            {t.home.standfirst}
          </Prose>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] border border-rule md:grid-cols-2">
            <div className="p-5 sm:p-7">
              <h2 className="font-serif text-lg font-semibold text-navy">
                {t.home.paths.cli.heading}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.home.paths.cli.body}</p>
              <CommandBlock
                className="mt-5"
                command={commands.create}
                runners
                labels={{
                  copy: t.common.copy,
                  copied: t.common.copied,
                  npm: t.common.npm,
                  pnpm: t.common.pnpm,
                }}
              />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t.home.commandCaption}{' '}
                <Link
                  href={path(locale, 'docs')}
                  className="whitespace-nowrap text-navy underline decoration-brass underline-offset-4 hover:decoration-navy"
                >
                  {t.home.readDocuments}
                </Link>
              </p>
            </div>

            <div className="relative border-t border-rule bg-card p-5 sm:p-7 md:border-l md:border-t-0">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border border-rule bg-paper px-2 font-serif text-sm italic text-muted-foreground md:left-0 md:top-1/2"
              >
                {t.home.paths.or}
              </span>
              <h2 className="font-serif text-lg font-semibold text-navy">
                {t.home.paths.desktop.heading}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.home.paths.desktop.body}</p>
              <DesktopDownload
                className="mt-5"
                channel={desktopRelease.channel}
                locale={locale}
                labels={t.home.paths.desktop}
                builds={t.desktop.download}
              />
            </div>
          </div>
        </section>

        <Section heading={t.home.arrives.heading} split>
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-14">
            <dl className="space-y-9">
              <div className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-x-4">
                <span aria-hidden="true" className="mt-2.5 size-2.5 bg-navy" />
                <dt className="font-serif text-xl font-semibold text-ink">
                  {t.home.arrives.code.term}
                </dt>
                <dd className="col-start-2 mt-2 max-w-[60ch] font-serif text-[1.0625rem] leading-relaxed text-ink/85">
                  {t.home.arrives.code.detail}
                </dd>
              </div>
              <div className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-x-4">
                <span aria-hidden="true" className="mt-2.5 size-2.5 bg-brass" />
                <dt className="font-serif text-xl font-semibold text-ink">
                  {t.home.arrives.conventions.term}
                </dt>
                <dd className="col-start-2 mt-2 max-w-[60ch] font-serif text-[1.0625rem] leading-relaxed text-ink/85">
                  {t.home.arrives.conventions.detail}
                </dd>
              </div>
            </dl>

            <figure className="self-start">
              <pre
                aria-hidden="true"
                className="overflow-x-auto border border-rule bg-card px-5 py-4 font-mono text-[0.8rem] leading-7 text-muted-foreground"
              >
                {projectTree.map((entry) => (
                  <span key={entry.line} className="flex items-center justify-between gap-4">
                    <span>
                      {entry.branch}
                      <span className={treeTone[entry.kind]}>{entry.name}</span>
                    </span>
                    {entry.kind !== 'plain' && (
                      <span
                        className={cn(
                          'size-1.5 shrink-0',
                          entry.kind === 'code' ? 'bg-navy' : 'bg-brass',
                        )}
                      />
                    )}
                  </span>
                ))}
              </pre>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                {t.home.arrives.caption}
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section heading={t.home.types.heading}>
          <ul className="grid border-t border-ink sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-6">
            {t.home.types.rows.map((row) => (
              <li
                key={row.type}
                className="border-b border-rule py-6 lg:border-b-0 lg:border-l lg:pb-2 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <h3 className="font-mono text-[1.6rem] font-medium leading-none text-navy">
                  {row.type}
                </h3>
                <p className="mt-2 font-serif italic text-muted-foreground">{row.role}</p>
                <ul className="mt-5 space-y-2 text-sm leading-snug text-ink/85">
                  {row.parts.map((part) => (
                    <li key={part} className="grid grid-cols-[0.9rem_minmax(0,1fr)]">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-2 bg-brass" />
                      {part}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Prose className="mt-8 text-muted-foreground">{t.home.types.note}</Prose>
        </Section>

        <Section heading={t.home.silence.heading} split>
          <Prose className="text-ink/85">{t.home.silence.body}</Prose>
          <CommandBlock
            className="mt-6 max-w-2xl"
            command={commands.unattended}
            labels={{
              copy: t.common.copy,
              copied: t.common.copied,
              npm: t.common.npm,
              pnpm: t.common.pnpm,
            }}
          />
        </Section>

        <div className="grid lg:grid-cols-2 lg:gap-12">
          <Section heading={t.home.record.heading}>
            <Prose className="text-ink/85">{t.home.record.body}</Prose>
            <Link
              href={path(locale, 'docs', 'stack')}
              className="mt-6 inline-block border-b border-brass pb-0.5 text-navy hover:border-navy"
            >
              {t.home.record.link}
            </Link>
          </Section>

          <Section heading={t.home.desktop.heading}>
            <Prose className="text-ink/85">{t.home.desktop.body}</Prose>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href={path(locale, 'desktop')}
                className="border-b border-brass pb-0.5 text-navy hover:border-navy"
              >
                {t.home.desktop.link}
              </Link>
              <a
                href={external.desktopRepository}
                className="text-muted-foreground hover:text-navy"
              >
                {t.footer.desktopRepository}
              </a>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
