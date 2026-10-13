'use client'

import { useEffect, useRef } from 'react'
import { advance, atRest, offset, pluck, still, strength, swing, vibration } from '@/lib/pluck'
import { PlumbBob } from './brand'

// The string is drawn in a 48px-wide SVG with no viewBox, so its units are pixels and x 24 is its centre. It runs
// far past the pin and the track clips it there, which keeps the static path the same on the server and
// at any length.
const centre = 24
const straight = `M${centre} 0V100000`

interface Rig {
  track: HTMLDivElement
  bob: HTMLDivElement
  string: SVGPathElement
  hit: SVGPathElement
}

const samples = 18
const tiltSpan = 40
const cooldown = 90

function progress(scrollMax: number): number {
  return Math.min(1, Math.max(0, window.scrollY / scrollMax))
}

function pluckable({ track, bob, string, hit }: Rig): () => void {
  let height = 0
  let rest = 0
  let travel = 0
  let node = 0
  let reach = 0
  let scrollMax = 1

  const measure = () => {
    height = track.clientHeight
    rest = bob.offsetTop
    const gap = Number.parseFloat(getComputedStyle(track).getPropertyValue('--plumb-gap')) || 0
    travel = height - rest - bob.offsetHeight - gap
    node = window.innerHeight * 0.45
    reach = Math.min(14, Math.max(3, (track.clientWidth - bob.offsetWidth) / 2))
    scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  }

  let swung = still
  let vibrating = still
  let frame = 0
  let last = 0
  let lastPluck = Number.NEGATIVE_INFINITY

  const draw = () => {
    const length = rest + 2 + progress(scrollMax) * travel
    const span = Math.min(node, length)
    const at = (h: number) => offset(h, length, span, swung.position, vibrating.position)
    let d = `M${centre} 0V${(height - length).toFixed(1)}`
    for (let i = samples; i >= 0; i--) {
      const h = (span * i) / samples
      d += `L${(centre + at(h)).toFixed(2)} ${(height - h).toFixed(1)}`
    }
    string.setAttribute('d', d)

    const lean = (Math.atan2(at(tiltSpan) - at(0), tiltSpan) * 180) / Math.PI
    bob.style.transform = `translateX(${at(0).toFixed(2)}px) rotate(${(lean - swung.position * 0.4).toFixed(2)}deg)`
  }

  const settle = () => {
    string.setAttribute('d', straight)
    bob.style.transform = ''
  }

  const tick = (now: number) => {
    const seconds = Math.min(0.05, (now - last) / 1000)
    last = now
    swung = advance(swung, swing, seconds)
    vibrating = advance(vibrating, vibration, seconds)

    if (atRest(swung, swing) && atRest(vibrating, vibration)) {
      frame = 0
      swung = still
      vibrating = still
      settle()
      return
    }

    draw()
    frame = requestAnimationFrame(tick)
  }

  const start = (direction: number, force: number, at: number) => {
    if (at - lastPluck < cooldown) return
    lastPluck = at
    swung = pluck(swung, swing, direction * force * reach, reach)
    vibrating = pluck(vibrating, vibration, direction * force * reach * 0.6, reach * 0.7)
    if (frame === 0) {
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }
  }

  let pointerX = 0
  let pointerAt = 0
  let speed = 0
  const onMove = (event: PointerEvent) => {
    const elapsed = event.timeStamp - pointerAt
    const instant = elapsed > 0 && elapsed < 100 ? (event.clientX - pointerX) / elapsed : 0
    speed = speed * 0.5 + instant * 0.5
    pointerX = event.clientX
    pointerAt = event.timeStamp
  }

  const onEnter = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    start(Math.sign(speed) || 1, strength(speed), event.timeStamp)
  }

  const onDown = (event: PointerEvent) => {
    const box = hit.getBoundingClientRect()
    const away = event.clientX < box.left + box.width / 2 ? 1 : -1
    start(away, 0.7, event.timeStamp)
  }

  const resize = new ResizeObserver(measure)
  resize.observe(track)
  resize.observe(document.documentElement)
  measure()

  window.addEventListener('pointermove', onMove, { passive: true })
  hit.addEventListener('pointerenter', onEnter)
  hit.addEventListener('pointerdown', onDown)
  bob.addEventListener('pointerenter', onEnter)
  bob.addEventListener('pointerdown', onDown)

  return () => {
    resize.disconnect()
    window.removeEventListener('pointermove', onMove)
    hit.removeEventListener('pointerenter', onEnter)
    hit.removeEventListener('pointerdown', onDown)
    bob.removeEventListener('pointerenter', onEnter)
    bob.removeEventListener('pointerdown', onDown)
    cancelAnimationFrame(frame)
    settle()
  }
}

function follow({ track }: Rig): () => void {
  let scrollMax = 1
  let frame = 0

  const measure = () => {
    scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  }
  const write = () => {
    frame = 0
    track.style.setProperty('--plumb-p', progress(scrollMax).toFixed(4))
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
  const hitRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const bob = bobRef.current
    const string = stringRef.current
    const hit = hitRef.current
    if (!track || !bob || !string || !hit) return

    const rig = { track, bob, string, hit }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scrollDriven = CSS.supports('animation-timeline: scroll()')
    let stop: (() => void) | undefined

    const apply = () => {
      stop?.()
      if (reduced.matches) {
        stop = undefined
        return
      }
      const stopFollowing = scrollDriven ? undefined : follow(rig)
      const stopPlucking = pluckable(rig)
      stop = () => {
        stopFollowing?.()
        stopPlucking()
      }
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
            <path ref={hitRef} d={straight} className="plumb-hit" />
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
