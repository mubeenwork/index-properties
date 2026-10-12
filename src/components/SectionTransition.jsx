import { useLayoutEffect, useRef } from 'react'
import { subscribe } from '../hooks/scrollEngine'
import { revealProgress } from '../hooks/revealProgress'

const TARGETS = '.ix-head-row, .ix-head, .ix-property-cell, .ix-city-index, .ix-city-preview, .ix-more-cities, .ix-concierge-visual, .ix-concierge-content, .ix-pathways > div, .ix-sold-card, .ix-story-art, .ix-story-grid > div:last-child, .ix-people-heading, .ix-person-portrait, .ix-people-list, .ix-quote, .ix-join-grid > div, .ix-join li, .ix-report-image, .ix-report-grid > div:last-child, .ix-cta .row > div'

export default function SectionTransition({ children, className = '' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const root = ref.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tracked = new Map()
    let unsubscribe
    let mutations
    let resizeObserver
    let layoutFrame = 0
    const paint = (_, height = window.innerHeight) => {
      // Read before writing. Remove our previous translation from the measurement
      // so movement cannot feed back into its own scroll progress.
      const positions = [...tracked].map(([el, state]) => [el, state, el.getBoundingClientRect().top - state.offset])
      positions.forEach(([el, state, top]) => {
        const focused = el.contains(document.activeElement)
        const progress = revealProgress({ top, height, previous: state.progress, focused })
        const offset = (1 - progress) * 32
        tracked.set(el, { offset, progress })
        el.style.setProperty('--reveal-progress', progress.toFixed(4))
        el.style.setProperty('--reveal-offset', offset + 'px')
      })
    }
    const stop = () => {
      unsubscribe?.()
      mutations?.disconnect()
      resizeObserver?.disconnect()
      cancelAnimationFrame(layoutFrame)
      tracked.forEach((_, el) => {
        delete el.dataset.reveal
        el.style.removeProperty('--reveal-progress')
        el.style.removeProperty('--reveal-offset')
      })
      tracked.clear()
    }
    const start = () => {
      stop()
      if (preference.matches) return
      const scan = () => {
        const candidates = [...root.querySelectorAll(TARGETS)]
        candidates.filter(el => !candidates.some(parent => parent !== el && parent.contains(el))).forEach(el => {
          if (!tracked.has(el)) { tracked.set(el, { offset: 0, progress: 0 }); el.dataset.reveal = 'scroll' }
        })
        tracked.forEach((_, el) => { if (!root.contains(el)) tracked.delete(el) })
        paint()
      }
      scan()
      unsubscribe = subscribe(paint)
      mutations = new MutationObserver(scan)
      mutations.observe(root, { childList: true, subtree: true })
      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(() => {
          cancelAnimationFrame(layoutFrame)
          layoutFrame = requestAnimationFrame(() => paint())
        })
        resizeObserver.observe(root)
      }
    }
    const focus = () => paint()
    root.addEventListener('focusin', focus)
    preference.addEventListener('change', start)
    start()
    return () => { stop(); root.removeEventListener('focusin', focus); preference.removeEventListener('change', start) }
  }, [])
  return <div ref={ref} className={`ix-sx ${className}`}>{children}</div>
}
