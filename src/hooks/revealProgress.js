/** Keep revealed content stable until it is completely below the viewport. */
export function revealProgress({ top, height, previous = 0, focused = false }) {
  if (focused) return 1
  if (top >= height + 40) return 0
  const raw = Math.max(0, Math.min(1, (height * .94 - top) / (height * .26)))
  const eased = raw * raw * (3 - 2 * raw)
  return Math.max(previous, eased)
}
