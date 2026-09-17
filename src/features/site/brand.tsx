import { cn } from '@/lib/utils'

interface PlumbMarkProps {
  className?: string
  lineLength?: number
}

export function PlumbMark({ className, lineLength = 30 }: PlumbMarkProps) {
  const bobTop = lineLength + 4

  return (
    <svg
      viewBox={`0 0 24 ${bobTop + 40}`}
      className={cn('text-navy', className)}
      role="presentation"
      aria-hidden="true"
    >
      <line x1="12" y1="0" x2="12" y2={lineLength} stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y={lineLength} width="6" height="4" rx="1" fill="currentColor" />
      <polygon
        points={`12,${bobTop} 2,${bobTop + 12} 12,${bobTop + 36} 22,${bobTop + 12}`}
        fill="currentColor"
      />
      <polygon
        points={`12,${bobTop} 12,${bobTop + 36} 22,${bobTop + 12}`}
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <PlumbMark className="h-7 w-auto" lineLength={16} />
      <span className="font-serif text-xl font-semibold tracking-tight text-navy">Prumo</span>
    </span>
  )
}
