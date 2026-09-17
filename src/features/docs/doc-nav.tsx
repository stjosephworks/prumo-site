'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/features/i18n/locales'
import { path } from '@/lib/routes'
import { cn } from '@/lib/utils'
import type { DocumentEntry } from './documents'

interface DocNavProps {
  locale: Locale
  groups: { label: string; documents: DocumentEntry[] }[]
}

export function DocNav({ locale, groups }: DocNavProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-7 text-sm">
      {groups.map((group) => (
        <div key={group.label}>
          <h2 className="font-serif text-sm font-semibold text-ink">{group.label}</h2>
          <ul className="mt-2 border-l border-rule">
            {group.documents.map((document) => {
              const href = path(locale, 'docs', document.slug)
              const current = pathname === href

              return (
                <li key={document.slug}>
                  <Link
                    href={href}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      '-ml-px block border-l py-1.5 pl-3',
                      current
                        ? 'border-brass font-medium text-navy'
                        : 'border-transparent text-muted-foreground hover:border-rule hover:text-ink',
                    )}
                  >
                    {document.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
