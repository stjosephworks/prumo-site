'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { type DesktopSystem, detectSystem } from '@/lib/desktop'
import { cn } from '@/lib/utils'

interface NavigatorWithHints extends Navigator {
  userAgentData?: { platform?: string }
}

// Marks the visitor's system on a wrapper, as data-visitor, once the page runs in a browser. The static HTML carries
// no mark, so without JavaScript every system reads the same, and the children style themselves with
// group-data-[visitor=…]/downloads.
export function VisitorSystem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [system, setSystem] = useState<DesktopSystem>()

  useEffect(() => {
    const hints = (navigator as NavigatorWithHints).userAgentData?.platform
    setSystem(detectSystem(hints || navigator.userAgent))
  }, [])

  return (
    <div data-visitor={system} className={cn('group/downloads', className)}>
      {children}
    </div>
  )
}
