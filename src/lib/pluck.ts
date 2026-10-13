export interface Oscillator {
  position: number
  velocity: number
}

export interface Spring {
  frequency: number
  damping: number
}

export const swing: Spring = { frequency: 1.1, damping: 0.16 }
export const vibration: Spring = { frequency: 6.5, damping: 0.11 }

export const still: Oscillator = { position: 0, velocity: 0 }

const substep = 1 / 240
const restAmplitude = 0.1

function omega(spring: Spring): number {
  return 2 * Math.PI * spring.frequency
}

export function amplitude(state: Oscillator, spring: Spring): number {
  return Math.hypot(state.position, state.velocity / omega(spring))
}

export function atRest(state: Oscillator, spring: Spring): boolean {
  return amplitude(state, spring) < restAmplitude
}

// Damped harmonic motion, x'' = -w^2 x - 2 zeta w x', stepped with semi-implicit Euler in fixed substeps so a
// slow frame does not gain energy.
export function advance(state: Oscillator, spring: Spring, seconds: number): Oscillator {
  const w = omega(spring)
  let { position, velocity } = state

  for (let left = seconds; left > 1e-9; left -= substep) {
    const dt = Math.min(substep, left)
    velocity += (-w * w * position - 2 * spring.damping * w * velocity) * dt
    position += velocity * dt
  }

  return { position, velocity }
}

// A pluck adds velocity, so a second one in phase builds on the first; the amplitude is then capped, so a run of
// plucks never swings further than one strong one.
export function pluck(state: Oscillator, spring: Spring, reach: number, cap: number): Oscillator {
  const next = { position: state.position, velocity: state.velocity + reach * omega(spring) }
  const size = amplitude(next, spring)
  if (size <= cap) return next

  const scale = cap / size
  return { position: next.position * scale, velocity: next.velocity * scale }
}

// How far the string sits from plumb at `height` px above the bob. The swing tilts the whole string about its pin;
// the vibration is the first mode of the stretch nearest the bob, `node` px long, with the far end held still.
export function offset(
  height: number,
  length: number,
  node: number,
  swung: number,
  vibrating: number,
): number {
  const tilt = swung * (1 - height / length)
  return height < node ? tilt + vibrating * Math.sin((Math.PI * height) / node) : tilt
}

export function strength(speed: number): number {
  return Math.min(1, Math.max(0.5, Math.abs(speed) / 1.2))
}
