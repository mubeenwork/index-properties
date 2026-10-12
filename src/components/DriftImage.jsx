import { useEffect, useRef } from 'react'
import { subscribe } from '../hooks/scrollEngine'

// A few pixels of image drift, only while visible on a desktop pointer device.
export default function DriftImage({ className = '', ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    const img = ref.current
    const frame = img.parentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 900px) and (pointer: fine)')
    let observer
    let unsubscribe
    const stop = () => {
      observer?.disconnect()
      unsubscribe?.()
      unsubscribe = undefined
      img.style.removeProperty('--image-drift')
      img.removeAttribute('data-drift')
    }
    const start = () => {
      stop()
      if (reduced.matches || !desktop.matches || !('IntersectionObserver' in window)) return
      img.dataset.drift = 'on'
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !unsubscribe) {
          unsubscribe = subscribe((_, height) => {
            const rect = frame.getBoundingClientRect()
            const progress = Math.max(0, Math.min(1, (height - rect.top) / (height + rect.height)))
            img.style.setProperty('--image-drift', `${(progress - .5) * 16}px`)
          })
        } else if (!entry.isIntersecting) { unsubscribe?.(); unsubscribe = undefined }
      })
      observer.observe(frame)
    }
    reduced.addEventListener('change', start)
    desktop.addEventListener('change', start)
    start()
    return () => { stop(); reduced.removeEventListener('change', start); desktop.removeEventListener('change', start) }
  }, [])
  return <img ref={ref} className={`ix-drift-image ${className}`} {...props} />
}
