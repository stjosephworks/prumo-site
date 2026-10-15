'use client'

import { Menu } from '@base-ui/react/menu'
import { Check, ChevronDown, Languages } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { rememberLocale } from '@/features/i18n/locale-cookie'
import { type Locale, localeInfo, localeRegistry } from '@/features/i18n/locales'
import { localizedPath, path } from '@/lib/routes'
import { cn } from '@/lib/utils'

interface LanguageMenuProps {
  current: Locale
  pathname: string
  label: string
  defaultOpen?: boolean
}

export function LanguageMenu({ current, pathname, label, defaultOpen }: LanguageMenuProps) {
  const here = localeInfo[current]

  return (
    <Menu.Root defaultOpen={defaultOpen}>
      <Menu.Trigger
        aria-label={`${label}: ${here.nativeName}`}
        className="group flex min-h-9 items-center gap-1.5 rounded-sm border border-rule px-2 text-sm text-ink/80 hover:border-brass hover:text-ink data-[popup-open]:border-brass data-[popup-open]:text-ink sm:min-h-8"
      >
        <Languages className="size-3.5 shrink-0" aria-hidden="true" />
        <span lang={here.lang}>{here.nativeName}</span>
        <ChevronDown
          className="size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[popup-open]:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="z-50 outline-none" sideOffset={6} align="end">
          <Menu.Popup className="min-w-44 origin-[var(--transform-origin)] border border-ink bg-paper py-1 text-sm text-ink shadow-[0.25rem_0.25rem_0] shadow-ink/10 outline-none transition-[scale,opacity] duration-100 ease-out data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 motion-reduce:transition-none">
            {localeRegistry.map((entry) => {
              const selected = entry.code === current

              return (
                <Menu.LinkItem
                  key={entry.code}
                  closeOnClick
                  onClick={() => rememberLocale(entry.code)}
                  render={
                    <Link
                      href={localizedPath(pathname, entry.code)}
                      hrefLang={entry.hreflang}
                      lang={entry.lang}
                      aria-current={selected ? 'page' : undefined}
                    />
                  }
                  className={cn(
                    'flex min-h-10 items-center justify-between gap-6 px-3 outline-none data-[highlighted]:bg-secondary data-[highlighted]:text-navy data-[highlighted]:shadow-[inset_3px_0_0_var(--brass)] sm:min-h-9',
                    selected ? 'font-semibold text-navy' : 'text-ink/85',
                  )}
                >
                  {entry.nativeName}
                  {selected && <Check className="size-3.5 text-brass-ink" aria-hidden="true" />}
                </Menu.LinkItem>
              )
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? path(current)

  return <LanguageMenu current={current} pathname={pathname} label={label} />
}
