import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  heading: string
  children: ReactNode
  id?: string
  className?: string
}

export function Section({ heading, children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative border-t border-rule py-14', className)}>
      <span
        aria-hidden="true"
        className="absolute left-0 top-[-1px] hidden h-px w-10 bg-brass md:block"
      />
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-navy sm:text-[1.7rem]">
        {heading}
      </h2>
      <div className="mt-6">{children}</div>
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
