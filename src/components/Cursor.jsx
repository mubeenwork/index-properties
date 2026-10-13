import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils'

const INTERACTIVE = 'a, button, [role="button"], summary, label'
const NATIVE = 'input, select, textarea, option'

/**
 * Custom cursor: a small dot that follows the mouse exactly, and a ring that trails behind it.
 *  - over links and buttons the ring grows
 *  - over anything with data-cursor="Text" (listing cards, service tiles) it becomes a red circle with that text
 *  - over form fields the normal cursor comes back
 * Only runs with a mouse (not touch) and when the visitor has not asked for reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return

    const root = document.documentElement
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    root.classList.add('ix-cursor-on')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf

    const setState = (state, text = '') => {
      ring.dataset.state = state
      dot.dataset.state = state
      label.textContent = text
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      ring.classList.add('show')
      dot.classList.add('show')
    }
    const onOver = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      if (t.closest(NATIVE)) return setState('native')
      const withText = t.closest('[data-cursor]')
      const nearest = t.closest(`${INTERACTIVE}, [data-cursor]`)
      if (nearest && nearest === withText) return setState('view', withText.dataset.cursor)
      if (nearest) return setState('link')
      setState('default')
    }
    const onDown = () => ring.classList.add('down')
    const onUp = () => ring.classList.remove('down')
    const onLeave = () => { ring.classList.remove('show'); dot.classList.remove('show') }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      root.classList.remove('ix-cursor-on')
    }
  }, [])

  return (
    <>
      <div className="ix-cursor" ref={ringRef} data-state="default" aria-hidden="true">
        <div className="ix-ring"><span className="label" ref={labelRef} /></div>
      </div>
      <div className="ix-dot" ref={dotRef} data-state="default" aria-hidden="true" />
    </>
  )
}
