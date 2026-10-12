import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'
import { prefersReducedMotion } from '../utils'

/** Counts from `from` to `to` when scrolled into view. Shows the final number if motion is reduced. */
export default function CountUp({ to, from = 0, duration = 1300 }) {
  const [ref, inView] = useInView()
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return
    let raf
    const t0 = performance.now()
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, from, duration])

  return <span ref={ref}>{value}</span>
}
