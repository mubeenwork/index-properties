import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../utils'

/**
 * Returns [ref, inView]. `inView` becomes true once the element scrolls into view (and stays true).
 * With reduced motion it is true straight away.
 */
export default function useInView({ rootMargin = '0px 0px 12% 0px', threshold = 0 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView]
}
