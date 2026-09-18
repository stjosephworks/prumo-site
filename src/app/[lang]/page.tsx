import type { Metadata } from 'next'
import Link from 'next/link'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { PlumbMark } from '@/features/site/brand'
import { CommandBlock } from '@/features/site/command-block'
import { RuledTable } from '@/features/site/ruled-table'
import { Prose, Section } from '@/features/site/section'
import { external, path } from '@/lib/routes'
import { site } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary((await lang()) as Locale)

  return {
    title: t.home.title,
    description: t.home.description,
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

        <section className="py-16 sm:py-24">
          <h1 className="max-w-[18ch] font-serif text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy sm:text-6xl">
            {t.home.headline}
            <br />
            <span className="text-ink">{t.home.headlineSecond}</span>
          </h1>

          <Prose className="mt-8 text-lg text-ink/85">{t.home.standfirst}</Prose>

          <div className="mt-10 max-w-xl">
            <CommandBlock
              command={`npx ${site.cliPackage} new my-app`}
              runners
              labels={{
                copy: t.common.copy,
                copied: t.common.copied,
                npm: t.common.npm,
                pnpm: t.common.pnpm,
              }}
            />
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span>{t.home.commandCaption}</span>
              <Link
                href={path(locale, 'docs')}
                className="text-navy underline-offset-4 hover:underline"
              >
                {t.home.readDocuments}
              </Link>
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
