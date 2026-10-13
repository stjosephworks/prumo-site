import { cn } from '@/lib/utils'

// The geometry is Prumo's logo (icon.png, redrawn in prumo-desktop's build/icon.svg), moved so the cap's top sits
// at y 0 and the base line's left end at x 0. The bob is 181 by 300 in these units.
const center = 101.5
const bobBox = { x: 11, width: 181, height: 300 }

function Bob() {
  return (
    <>
      <rect x="77.3" y="0" width="48.4" height="35" rx="10" fill="currentColor" />
      <polygon
        points="53.06,33.93 149.94,33.93 186.19,101.73 101.5,295.04 16.81,101.73"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="9.69"
        strokeLinejoin="round"
      />
      <polygon points="101.5,65.36 161.99,113.75 101.5,258.98" fill="#fff" opacity="0.2" />
    </>
  )
}

interface PlumbMarkProps {
  className?: string
  lineLength?: number
}

export function PlumbMark({ className, lineLength = 120 }: PlumbMarkProps) {
  const base = lineLength + 324.37

  return (
    <svg
      viewBox={`0 0 203 ${base + 6}`}
      className={cn('text-navy', className)}
      role="presentation"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line
          x1={center}
          y1="0"
          x2={center}
          y2={lineLength + 8}
          vectorEffect="non-scaling-stroke"
        />
        <line x1="4.9" y1={base} x2="198.1" y2={base} vectorEffect="non-scaling-stroke" />
      </g>
      <g transform={`translate(0 ${lineLength})`}>
        <Bob />
      </g>
    </svg>
  )
}

export function PlumbBob({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`${bobBox.x} 0 ${bobBox.width} ${bobBox.height}`}
      className={cn('block text-navy', className)}
      role="presentation"
      aria-hidden="true"
    >
      <Bob />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <PlumbMark className="h-7 w-auto" lineLength={110} />
      <span className="font-serif text-xl font-semibold tracking-tight text-navy">Prumo</span>
    </span>
  )
}
