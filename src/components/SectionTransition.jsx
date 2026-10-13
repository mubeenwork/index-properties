import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../utils'

/**
 * Wraps a whole section so it eases in when you scroll (or jump from the menu) to it:
 * it rises from below, fades in and a red line sweeps across its top edge.
 *
 * Sections that are already on screen at load are left alone. Sections below the fold start hidden
 * and are revealed just before they enter the viewport, so nothing flashes.
 * With reduced motion (or no IntersectionObserver) the section is simply visible.
 */
export default function SectionTransition({ children, className = '' }) {
  const ref = useRef(null)
  const [state, setState] = useState('idle') // idle -> pre -> in

  // useLayoutEffect: hide it before the first paint, otherwise the section would flash visible first.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
    setState('pre')
  }, [])

  useEffect(() => {
    if (state !== 'pre') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px 10% 0px', threshold: 0.02 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [state])

  return (
    <div ref={ref} className={`ix-sx ${state} ${className}`}>
      {children}
    </div>
  )
}
