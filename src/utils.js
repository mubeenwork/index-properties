const money = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })

export const formatPrice = (n) => money.format(n)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Small maths helpers for scroll-linked animation
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
/** 0 before `a`, 1 after `b`, linear in between */
export const seg = (p, a, b) => clamp((p - a) / (b - a))
/** smooth start and end (smoothstep) */
export const ease = (t) => t * t * (3 - 2 * t)

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
