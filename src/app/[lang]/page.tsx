import type { Metadata } from 'next'
import Link from 'next/link'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { PlumbMark } from '@/features/site/brand'
import { CommandBlock } from '@/features/site/command-block'
import { DesktopDownload } from '@/features/site/desktop-download'
import { RuledTable } from '@/features/site/ruled-table'
import { Prose, Section } from '@/features/site/section'
import { alternates, desktopRelease, external, path } from '@/lib/routes'
import { site } from '@/lib/site'

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
        <span
          aria-hidden="true"
          className="plumb-line absolute left-[1.4rem] top-[7.5rem] hidden w-px bg-rule md:block"
          style={{ bottom: 0 }}
        />
        <PlumbMark
          className="plumb-line-draw absolute left-0 top-2 hidden h-28 w-12 md:block"
          lineLength={34}
        />

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

          <div className="mt-12 grid border border-rule md:grid-cols-2">
            <div className="p-5 sm:p-7">
              <h2 className="font-serif text-lg font-semibold text-navy">
                {t.home.paths.cli.heading}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.home.paths.cli.body}</p>
              <CommandBlock
                className="mt-5"
                command={`npx ${site.cliPackage} new my-app`}
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
              />
            </div>
          </div>
        </section>

        <Section heading={t.home.arrives.heading}>
          <dl className="grid gap-10 md:grid-cols-2">
            <div>
              <dt className="font-serif text-lg font-semibold">{t.home.arrives.code.term}</dt>
              <dd className="mt-2 font-serif leading-relaxed text-ink/85">
                {t.home.arrives.code.detail}
              </dd>
            </div>
            <div>
              <dt className="font-serif text-lg font-semibold">
                {t.home.arrives.conventions.term}
              </dt>
              <dd className="mt-2 font-serif leading-relaxed text-ink/85">
                {t.home.arrives.conventions.detail}
              </dd>
            </div>
          </dl>
        </Section>

        <Section heading={t.home.types.heading}>
          <RuledTable
            columns={{ head: t.home.types.columns.type, body: t.home.types.columns.contents }}
            rows={t.home.types.rows.map((row) => ({ head: row.type, body: row.contents }))}
          />
          <Prose className="mt-6 text-muted-foreground">{t.home.types.note}</Prose>
        </Section>

        <Section heading={t.home.silence.heading}>
          <Prose className="text-ink/85">{t.home.silence.body}</Prose>
          <CommandBlock
            className="mt-6 max-w-2xl"
            command={`npx ${site.cliPackage} new my-app --types api,web --single-tenant`}
            labels={{
              copy: t.common.copy,
              copied: t.common.copied,
              npm: t.common.npm,
              pnpm: t.common.pnpm,
            }}
          />
        </Section>

        <Section heading={t.home.record.heading}>
          <Prose className="text-ink/85">{t.home.record.body}</Prose>
          <Link
            href={path(locale, 'docs', 'stack')}
            className="mt-6 inline-block border-b border-brass pb-0.5 text-navy"
          >
            {t.home.record.link}
          </Link>
        </Section>

        <Section heading={t.home.desktop.heading}>
          <Prose className="text-ink/85">{t.home.desktop.body}</Prose>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Link href={path(locale, 'desktop')} className="border-b border-brass pb-0.5 text-navy">
              {t.home.desktop.link}
            </Link>
            <a href={external.desktopRepository} className="text-muted-foreground hover:text-navy">
              {t.footer.desktopRepository}
            </a>
          </div>
        </Section>
      </div>
    </div>
  )
}
