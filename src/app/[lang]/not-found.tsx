import Link from 'next/link'
import { lang } from 'next/root-params'
import { getDictionary } from '@/features/i18n/dictionary'
import { defaultLocale, isLocale } from '@/features/i18n/locales'
import { path } from '@/lib/routes'

export default async function NotFound() {
  const raw = await lang()
  const locale = raw !== undefined && isLocale(raw) ? raw : defaultLocale
  const t = getDictionary(locale)

  return (
    <div className="mx-auto max-w-4xl px-5 py-32 sm:px-8">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-navy">
        {t.notFound.heading}
      </h1>
      <p className="mt-4 font-serif text-lg text-ink/85">{t.notFound.body}</p>
      <Link
        href={path(locale, 'docs')}
        className="mt-8 inline-block border-b border-brass pb-0.5 text-navy"
      >
        {t.notFound.link}
      </Link>
    </div>
  )
}
