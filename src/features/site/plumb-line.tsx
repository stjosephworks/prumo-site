'use client'

import { useEffect, useRef } from 'react'
import { PlumbBob } from './brand'

// The string is drawn in a 48px-wide SVG with no viewBox, so its units are pixels and x 24 is its centre. It runs
// far past the pin and the track's clip-path cuts it there, which keeps the static path the same on the server and
// at any length.
const centre = 24
const straight = `M${centre} 0V100000`

interface Rig {
  track: HTMLDivElement
  bob: HTMLDivElement
  string: SVGPathElement
}

function follow({ track }: Rig): () => void {
  let scrollMax = 1
  let frame = 0

  const measure = () => {
    scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  }
  const write = () => {
    frame = 0
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollMax))
    track.style.setProperty('--plumb-p', progress.toFixed(4))
  }
  const onScroll = () => {
    if (frame === 0) frame = requestAnimationFrame(write)
  }

  const resize = new ResizeObserver(() => {
    measure()
    onScroll()
  })
  resize.observe(document.documentElement)
  window.addEventListener('scroll', onScroll, { passive: true })
  measure()
  onScroll()

  return () => {
    resize.disconnect()
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(frame)
    track.style.removeProperty('--plumb-p')
  }
}

export function PlumbLine() {
  const trackRef = useRef<HTMLDivElement>(null)
  const bobRef = useRef<HTMLDivElement>(null)
  const stringRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const bob = bobRef.current
    const string = stringRef.current
    if (!track || !bob || !string) return

    const rig = { track, bob, string }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scrollDriven = CSS.supports('animation-timeline: scroll()')
    let stop: (() => void) | undefined

    const apply = () => {
      stop?.()
      stop = reduced.matches || scrollDriven ? undefined : follow(rig)
    }

    apply()
    reduced.addEventListener('change', apply)
    return () => {
      reduced.removeEventListener('change', apply)
      stop?.()
    }
  }, [])

  return (
    <div ref={trackRef} aria-hidden="true" className="plumb-track">
      <span className="plumb-pin" />
      <div className="plumb-carriage">
        <div className="plumb-rig">
          <svg className="plumb-string" role="presentation" aria-hidden="true">
            <path ref={stringRef} d={straight} />
          </svg>
          <div ref={bobRef} className="plumb-bob">
            <PlumbBob className="w-full" />
          </div>
        </div>
      </div>
      <span className="plumb-base" />
    </div>
  )
}
