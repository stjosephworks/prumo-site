import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  heading: string
  children: ReactNode
  id?: string
  className?: string
  split?: boolean
}

export function Section({ heading, children, id, className, split = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative border-t border-rule py-14',
        split && 'lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12 lg:py-20',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-[-1px] hidden h-px w-10 bg-brass md:block"
      />
      <h2
        className={cn(
          'font-serif text-2xl font-semibold tracking-tight text-navy sm:text-[1.7rem]',
          split && 'lg:max-w-[12ch] lg:text-[1.55rem] lg:leading-snug',
        )}
      >
        {heading}
      </h2>
      <div className={cn('mt-6', split && 'lg:mt-1')}>{children}</div>
    </section>
  )
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('max-w-[62ch] font-serif text-[1.0625rem] leading-relaxed', className)}>
      {children}
    </p>
  )
}
