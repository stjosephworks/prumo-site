import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google'
import { notFound } from 'next/navigation'
import { lang } from 'next/root-params'
import '../globals.css'
import { getDictionary } from '@/features/i18n/dictionary'
import { isLocale, locales } from '@/features/i18n/locales'
import { SiteFooter } from '@/features/site/site-footer'
import { SiteHeader } from '@/features/site/site-header'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const serif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang()
  const t = getDictionary(isLocale(locale ?? '') ? (locale as 'en' | 'pt') : 'en')

  return {
    metadataBase: new URL(site.url),
    title: { default: t.home.title, template: `%s · ${site.name}` },
    description: t.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((one) => [one, `/${one}`])),
    },
    openGraph: {
      title: t.home.title,
      description: t.home.description,
      type: 'website',
      locale,
    },
  }
}

export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const locale = await lang()
  if (locale === undefined || !isLocale(locale)) notFound()

  const t = getDictionary(locale)

  return (
    <html lang={locale} className={cn(serif.variable, sans.variable, mono.variable)}>
      <body className="font-sans antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-ink focus:bg-paper focus:px-3 focus:py-2"
        >
          {t.nav.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="content">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  )
}
