import { Download } from 'lucide-react'
import Link from 'next/link'
import type { Dictionary } from '@/features/i18n/dictionaries/en'
import type { Locale } from '@/features/i18n/locales'
import {
  type DesktopSystem,
  desktopAssetUrl,
  desktopBuilds,
  desktopSystems,
  isUnsigned,
} from '@/lib/desktop'
import { type DesktopChannel, needsOpenAnyway, path } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { VisitorSystem } from './visitor-system'
import { visitorTone } from './visitor-tone'

interface DesktopDownloadProps {
  channel: DesktopChannel
  locale: Locale
  labels: Dictionary['home']['paths']['desktop']
  builds: Pick<Dictionary['desktop']['download'], 'systems' | 'short'>
  className?: string
}

const noteId = 'desktop-download-note'

function hint(
  system: DesktopSystem,
  channel: DesktopChannel,
  hints: DesktopDownloadProps['labels']['hints'],
) {
  if (system === 'macos')
    return isUnsigned(system, channel) ? hints.macosUnsigned : hints.macosSigned
  return hints[system]
}

export function DesktopDownload({
  channel,
  locale,
  labels,
  builds,
  className,
}: DesktopDownloadProps) {
  const preview = needsOpenAnyway(channel)

  return (
    <div className={className}>
      <VisitorSystem>
        <ul className="border-t border-rule">
          {desktopSystems.map((system) => (
            <li
              key={system}
              data-system={system}
              className={cn(
                'border-b border-l-2 border-b-rule border-l-transparent py-3 pl-3',
                visitorTone[system].row,
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <p className="text-sm">
                  <span className="font-serif text-base font-semibold text-ink">
                    {builds.systems[system].name}
                  </span>
                  <span className="text-muted-foreground"> · {builds.systems[system].arch}</span>
                  <span
                    className={cn(
                      'ml-2 hidden border border-brass px-1.5 align-middle text-[0.7rem] text-brass-ink',
                      visitorTone[system].tag,
                    )}
                  >
                    {labels.yourSystem}
                  </span>
                </p>
                <span className="flex flex-wrap gap-2">
                  {desktopBuilds(system).map((build) => (
                    <a
                      key={build.file}
                      href={desktopAssetUrl(build.file)}
                      aria-describedby={noteId}
                      className={cn(
                        'inline-flex items-center gap-1.5 border border-navy px-2.5 py-1 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-primary-foreground',
                        visitorTone[system].link,
                      )}
                    >
                      <Download className="size-3.5" aria-hidden="true" />
                      {builds.short[build.kind]}
                    </a>
                  ))}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {hint(system, channel, labels.hints)}
              </p>
            </li>
          ))}
        </ul>
      </VisitorSystem>
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
