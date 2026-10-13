import { describe, expect, it } from 'vitest'
import {
  advance,
  amplitude,
  atRest,
  offset,
  pluck,
  still,
  strength,
  swing,
  vibration,
} from './pluck'

describe('a plucked plumb', () => {
  it('swings to the side it was plucked towards, then settles', () => {
    const plucked = pluck(still, swing, 10, 14)
    const soon = advance(plucked, swing, 0.2)

    expect(soon.position).toBeGreaterThan(0)
    expect(atRest(soon, swing)).toBe(false)
    expect(atRest(advance(plucked, swing, 8), swing)).toBe(true)
    expect(atRest(advance(pluck(still, vibration, 6, 8), vibration, 3), vibration)).toBe(true)
  })

  it('loses energy on every swing rather than looping', () => {
    let state = pluck(still, swing, 10, 14)
    let previous = amplitude(state, swing)

    for (let step = 0; step < 10; step++) {
      state = advance(state, swing, 0.25)
      const now = amplitude(state, swing)
      expect(now).toBeLessThan(previous)
      previous = now
    }
  })

  it('never swings further than the cap, however many times it is plucked', () => {
    let state = still
    for (let step = 0; step < 50; step++) state = advance(pluck(state, swing, 10, 14), swing, 0.016)

    expect(amplitude(state, swing)).toBeLessThanOrEqual(14 + 1e-9)
  })

  it('keeps the string pinned at the top and at the vibration node', () => {
    expect(offset(500, 500, 200, 8, 5)).toBeCloseTo(0)
    expect(offset(0, 500, 200, 8, 5)).toBeCloseTo(8)
    expect(offset(200, 500, 200, 0, 5)).toBeCloseTo(0)
    expect(offset(100, 500, 200, 0, 5)).toBeCloseTo(5)
  })

  it('plucks harder the faster the pointer crosses, within bounds', () => {
    expect(strength(0)).toBe(0.5)
    expect(strength(-0.9)).toBeCloseTo(0.75)
    expect(strength(9)).toBe(1)
  })
})
