import Link from 'next/link'
import { documents } from '@/features/docs/documents'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { external, path } from '@/lib/routes'
import { site } from '@/lib/site'
import manifest from '../../../content/documents.json'
import { PlumbMark } from './brand'

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const pinned = manifest.sources.prumo.commit.slice(0, 7)

  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[auto_1fr_1fr_1fr]">
        <PlumbMark className="h-16 w-6" lineLength={14} />

        <div>
          <h2 className="font-serif text-sm font-semibold">{t.footer.sections.product}</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <Link href={path(locale, 'start')} className="hover:text-navy">
                {t.nav.start}
              </Link>
            </li>
            <li>
              <Link href={path(locale, 'concepts')} className="hover:text-navy">
                {t.nav.concepts}
              </Link>
            </li>
            <li>
              <Link href={path(locale, 'commands')} className="hover:text-navy">
                {t.nav.commands}
              </Link>
            </li>
            <li>
              <Link href={path(locale, 'desktop')} className="hover:text-navy">
                {t.nav.desktop}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-sm font-semibold">{t.footer.sections.documents}</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {documents.slice(0, 5).map((document) => (
              <li key={document.slug}>
                <Link href={path(locale, 'docs', document.slug)} className="hover:text-navy">
                  {document.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-sm font-semibold">{t.footer.sections.elsewhere}</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <a href={external.npm} className="hover:text-navy">
                {t.footer.npm}
              </a>
            </li>
            <li>
              <a href={external.repository} className="hover:text-navy">
                {t.footer.repository}
              </a>
            </li>
            <li>
              <a href={external.desktopRepository} className="hover:text-navy">
                {t.footer.desktopRepository}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-5 py-4 text-xs text-muted-foreground sm:px-8">
          <span>
            {t.footer.describing}{' '}
            <span className="font-mono text-ink">
              {site.cliPackage}@{site.cliVersion}
            </span>{' '}
            <span className="font-mono">({pinned})</span>
          </span>
          <span>{t.footer.license}</span>
          <span className="ml-auto">{t.footer.builtWith}</span>
        </div>
      </div>
    </footer>
  )
}
