import { cn } from '@/lib/utils'

// The geometry is Prumo's logo (icon.png, redrawn in prumo-desktop's build/icon.svg), moved so the cap's top sits
// at y 0. The bob is 181 by 300 in these units.
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

export function Wordmark({ name = 'Prumo', className }: { name?: string; className?: string }) {
  return (
    <span
      className={cn(
        'whitespace-nowrap font-serif text-base font-semibold tracking-tight text-navy sm:text-lg',
        className,
      )}
    >
      {name}
    </span>
  )
}
