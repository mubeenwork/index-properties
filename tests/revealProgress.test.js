import test from 'node:test'
import assert from 'node:assert/strict'
import { revealProgress } from '../src/hooks/revealProgress.js'

test('offscreen content waits for entry and fully reveals before the reading area', () => {
  assert.equal(revealProgress({ top: 1100, height: 1000 }), 0)
  assert.equal(revealProgress({ top: 940, height: 1000 }), 0)
  assert.equal(revealProgress({ top: 680, height: 1000 }), 1)
  assert.equal(revealProgress({ top: 0, height: 1000 }), 1)
})
test('a partial reveal does not fade backwards while still visible', () => {
  const previous = revealProgress({ top: 800, height: 1000 })
  assert.ok(previous > 0 && previous < 1)
  assert.equal(revealProgress({ top: 850, height: 1000, previous }), previous)
  assert.equal(revealProgress({ top: 900, height: 1000, previous: 1 }), 1)
})
test('revisiting from below starts a new reveal only after leaving the screen', () => {
  assert.equal(revealProgress({ top: 1030, height: 1000, previous: 1 }), 1)
  assert.equal(revealProgress({ top: 1040, height: 1000, previous: 1 }), 0)
  assert.ok(revealProgress({ top: 850, height: 1000 }) > 0)
})
test('keyboard focus and short mobile viewports stay readable', () => {
  assert.equal(revealProgress({ top: 1200, height: 600, focused: true }), 1)
  assert.equal(revealProgress({ top: 400, height: 600 }), 1)
})
