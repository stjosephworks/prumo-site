'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale, localeNames, locales } from '@/features/i18n/locales'
import { cn } from '@/lib/utils'

export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname()
  const rest = pathname.split('/').slice(2).join('/')

  return (
    <nav aria-label={label} className="flex items-center gap-1 text-sm">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-muted-foreground">/</span>}
          <Link
            href={`/${locale}${rest === '' ? '' : `/${rest}`}`}
            hrefLang={locale}
            aria-current={locale === current ? 'true' : undefined}
            className={cn(
              'rounded-sm px-1 py-0.5 uppercase',
              locale === current
                ? 'font-semibold text-navy'
                : 'text-muted-foreground hover:text-ink',
            )}
          >
            <span className="sr-only">{localeNames[locale]}</span>
            <span aria-hidden="true">{locale}</span>
          </Link>
        </span>
      ))}
    </nav>
  )
}
