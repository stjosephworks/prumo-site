import { cn } from '@/lib/utils'
import type { Heading } from './markdown'

export function TableOfContents({ headings, label }: { headings: Heading[]; label: string }) {
  const shown = headings.filter((heading) => heading.depth === 2).slice(0, 60)

  if (shown.length < 3) return null

  return (
    <nav aria-label={label} className="text-sm">
      <h2 className="font-serif text-sm font-semibold text-ink">{label}</h2>
      <ul className="mt-2 border-l border-rule">
        {shown.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                '-ml-px block border-l border-transparent py-1 pl-3 text-muted-foreground',
                'hover:border-brass hover:text-navy',
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
