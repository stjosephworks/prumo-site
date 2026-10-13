import { Download } from 'lucide-react'
import Link from 'next/link'
import type { Dictionary } from '@/features/i18n/dictionaries/en'
import type { Locale } from '@/features/i18n/locales'
import { type DesktopChannel, desktopDownloadUrl, needsOpenAnyway, path } from '@/lib/routes'
import { cn } from '@/lib/utils'

interface DesktopDownloadProps {
  channel: DesktopChannel
  locale: Locale
  labels: Dictionary['home']['paths']['desktop']
  className?: string
}

const noteId = 'desktop-download-note'

export function DesktopDownload({ channel, locale, labels, className }: DesktopDownloadProps) {
  const preview = needsOpenAnyway(channel)

  return (
    <div className={className}>
      <a
        href={desktopDownloadUrl(channel)}
        aria-describedby={noteId}
        className="inline-flex items-center gap-2.5 border border-navy bg-navy px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:border-ink hover:bg-ink"
      >
        <Download className="size-4" aria-hidden="true" />
        {labels.button}
      </a>
      <p
        id={noteId}
        data-channel={channel}
        className={cn(
          'mt-4 max-w-[46ch] text-sm leading-relaxed',
          preview ? 'border-l-2 border-brass pl-3 text-ink/85' : 'text-muted-foreground',
        )}
      >
        {preview ? labels.previewNote : labels.signedNote}{' '}
        <Link
          href={`${path(locale, 'desktop')}#download`}
          className="whitespace-nowrap text-navy underline decoration-brass underline-offset-4 hover:decoration-navy"
        >
          {preview ? labels.previewLink : labels.signedLink}
        </Link>
      </p>
    </div>
  )
}
