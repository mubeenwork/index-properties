import { useEffect, useRef } from 'react'
import { subscribe } from '../hooks/scrollEngine'
import { prefersReducedMotion } from '../utils'

/**
 * An <img> that drifts up and down inside its parent box as you scroll (parallax).
 * The parent should have overflow hidden. The CSS in styles/scenes.css scales the image up a little
 * so the edges never show; `amount` is the drift in pixels (keep it under ~8% of the box height).
 */
export default function ParallaxImg({ amount = 30, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const img = ref.current
    const box = img.parentElement
    return subscribe((_, vh) => {
      const r = box.getBoundingClientRect()
      const p = (vh - r.top) / (vh + r.height) // 0 entering at the bottom, 1 leaving at the top
      img.style.setProperty('--py', `${(p - 0.5) * 2 * amount}px`)
    })
  }, [amount])

  return <img ref={ref} {...props} />
}
