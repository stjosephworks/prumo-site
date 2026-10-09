import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// A note that must be read before acting on what sits beside it. The brass rule is the site's accent, kept for
// the one thing on a page that is a warning rather than prose.
export function Callout({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <aside
      aria-label={label}
      className={cn('border border-rule border-l-4 border-l-brass bg-card px-5 py-4', className)}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-brass-ink">{label}</p>
      <div className="mt-2 space-y-3 font-serif text-[0.975rem] leading-relaxed text-ink/90">
        {children}
      </div>
    </aside>
  )
}
