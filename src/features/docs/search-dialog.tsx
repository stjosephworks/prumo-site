'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Locale } from '@/features/i18n/locales'
import { path } from '@/lib/routes'
import type { SearchRecord } from './search-index'

interface SearchDialogProps {
  locale: Locale
  labels: {
    open: string
    placeholder: string
    empty: string
    hint: string
    close: string
    resultsOne: string
    resultsMany: string
  }
}

function matches(records: SearchRecord[], query: string): SearchRecord[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  return records
    .filter((record) => {
      const haystack = `${record.document} ${record.heading} ${record.lead}`.toLowerCase()
      return terms.every((term) => haystack.includes(term))
    })
    .slice(0, 40)
}

function resultsLabel(count: number, labels: { resultsOne: string; resultsMany: string }): string {
  return count === 1 ? labels.resultsOne : labels.resultsMany.replace('{count}', String(count))
}

export function SearchDialog({ locale, labels }: SearchDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [records, setRecords] = useState<SearchRecord[]>([])
  const [query, setQuery] = useState('')

  const open = useCallback(async () => {
    dialog.current?.showModal()
    if (records.length > 0) return
    const response = await fetch('/search-index.json')
    if (response.ok) setRecords((await response.json()) as SearchRecord[])
  }, [records.length])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault()
        void open()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const found = useMemo(() => matches(records, query), [records, query])

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex items-center gap-2 rounded-sm border border-rule px-2 py-1 text-sm text-muted-foreground hover:border-brass hover:text-ink"
      >
        <Search className="size-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">{labels.open}</span>
        <kbd className="hidden font-mono text-xs text-muted-foreground sm:inline">/</kbd>
      </button>

      <dialog
        ref={dialog}
        onClose={() => setQuery('')}
        className="m-auto w-[min(42rem,92vw)] border border-ink bg-paper p-0 text-ink backdrop:bg-ink/25"
      >
        <div className="border-b border-rule p-3">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.placeholder}
            aria-label={labels.placeholder}
            className="w-full bg-transparent font-sans text-base outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query !== '' && found.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">{labels.empty}</p>
          )}

          <ul>
            {found.map((record) => (
              <li key={`${record.slug}-${record.anchor}`} className="border-b border-rule">
                <Link
                  href={`${path(locale, 'docs', record.slug)}#${record.anchor}`}
                  onClick={() => dialog.current?.close()}
                  className="block px-4 py-3 hover:bg-secondary"
                >
                  <span className="block text-sm font-medium text-navy">{record.heading}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {record.document}
                  </span>
                  {record.lead !== '' && (
                    <span className="mt-1 block line-clamp-2 font-serif text-sm text-muted-foreground">
                      {record.lead}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-rule px-4 py-2 text-xs text-muted-foreground">
          <span>{query === '' ? labels.hint : resultsLabel(found.length, labels)}</span>
          <button type="button" onClick={() => dialog.current?.close()} className="hover:text-ink">
            {labels.close}
          </button>
        </div>
      </dialog>
    </>
  )
}
